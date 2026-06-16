import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const APP_URL = 'https://appdrop-eight.vercel.app'
const FROM = 'AppDrop <onboarding@resend.dev>'

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Record<string, unknown>
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  })
  if (!res.ok) console.error('Resend error:', await res.text())
}

Deno.serve(async (req: Request) => {
  const payload: WebhookPayload = await req.json()
  const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  try {
    if (payload.table === 'comments' && payload.type === 'INSERT') {
      await handleComment(db, payload.record)
    }
    if (payload.table === 'pledges' && payload.type === 'INSERT') {
      await handlePledge(db, payload.record)
    }
    if (payload.table === 'project_updates' && payload.type === 'INSERT') {
      await handleProjectUpdate(db, payload.record)
    }
  } catch (err) {
    console.error('Notification error:', err)
  }

  return new Response('OK', { status: 200 })
})

async function handleComment(db: ReturnType<typeof createClient>, r: Record<string, unknown>) {
  const { data: idea } = await db
    .from('ideas')
    .select('title, creator_id')
    .eq('id', r.idea_id)
    .single()

  if (!idea?.creator_id) return
  if (String(idea.creator_id) === String(r.user_id)) return // own comment

  const { data } = await db.auth.admin.getUserById(String(idea.creator_id))
  if (!data.user?.email) return

  await sendEmail(
    data.user.email,
    `💬 New comment on "${idea.title}"`,
    commentHtml(String(idea.title), String(r.author), String(r.content), String(r.idea_id))
  )
}

async function handlePledge(db: ReturnType<typeof createClient>, r: Record<string, unknown>) {
  const { data: idea } = await db
    .from('ideas')
    .select('title, creator_id, funding_goal, funding_current')
    .eq('id', r.idea_id)
    .single()

  if (!idea?.creator_id) return

  const { data } = await db.auth.admin.getUserById(String(idea.creator_id))
  if (!data.user?.email) return

  const prevTotal = Number(idea.funding_current)
  const newTotal = prevTotal + Number(r.amount)
  const goal = Number(idea.funding_goal)
  const goalJustReached = newTotal >= goal && prevTotal < goal

  if (goalJustReached) {
    await sendEmail(
      data.user.email,
      `🎉 "${idea.title}" hit its funding goal!`,
      fundingGoalHtml(String(idea.title), goal, String(r.idea_id))
    )
  } else {
    await sendEmail(
      data.user.email,
      `💰 New backer on "${idea.title}"`,
      newBackerHtml(String(idea.title), Number(r.amount), newTotal, goal, String(r.idea_id))
    )
  }
}

async function handleProjectUpdate(db: ReturnType<typeof createClient>, r: Record<string, unknown>) {
  const { data: idea } = await db
    .from('ideas')
    .select('title, creator_id')
    .eq('id', r.idea_id)
    .single()
  if (!idea) return

  // Find all confirmed backers
  const { data: pledges } = await db
    .from('pledges')
    .select('user_id')
    .eq('idea_id', r.idea_id)
    .eq('status', 'confirmed')
  if (!pledges || pledges.length === 0) return

  const backerIds = [...new Set((pledges as Record<string, unknown>[]).map((p) => String(p.user_id)))]

  for (const backerId of backerIds) {
    if (backerId === String(idea.creator_id)) continue
    const { data } = await db.auth.admin.getUserById(backerId)
    if (!data.user?.email) continue
    await sendEmail(
      data.user.email,
      `📢 Update on "${idea.title}"`,
      projectUpdateHtml(String(idea.title), String(r.title), String(r.content), String(r.idea_id))
    )
  }
}

function projectUpdateHtml(ideaTitle: string, updateTitle: string, content: string, ideaId: string) {
  return `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;border:1px solid #222">
  <p style="color:#BF5AF2;font-size:11px;font-weight:bold;letter-spacing:0.15em;margin:0 0 20px">APPDROP UPDATE</p>
  <h1 style="font-size:22px;margin:0 0 4px">New update on <span style="color:#BF5AF2">${ideaTitle}</span></h1>
  <h2 style="font-size:16px;color:#ccc;margin:0 0 16px;font-weight:normal">${updateTitle}</h2>
  <div style="background:#181818;border-left:3px solid #BF5AF2;border-radius:6px;padding:16px;margin-bottom:24px">
    <p style="margin:0;color:#ccc;font-size:14px;line-height:1.6">${content}</p>
  </div>
  <a href="${APP_URL}/projects/${ideaId}" style="display:inline-block;background:#BF5AF2;color:#fff;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:13px">VIEW PROJECT →</a>
  <p style="margin:24px 0 0;color:#444;font-size:12px">AppDrop · You received this because you backed this project</p>
</div>`
}

function commentHtml(title: string, author: string, content: string, ideaId: string) {
  return `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;border:1px solid #222">
  <p style="color:#00D4FF;font-size:11px;font-weight:bold;letter-spacing:0.15em;margin:0 0 20px">APPDROP NOTIFICATION</p>
  <h1 style="font-size:22px;margin:0 0 12px">New comment on <span style="color:#00D4FF">${title}</span></h1>
  <p style="color:#888;margin:0 0 16px"><strong style="color:#ccc">${author}</strong> said:</p>
  <div style="background:#181818;border-left:3px solid #00D4FF;border-radius:6px;padding:16px;margin-bottom:24px">
    <p style="margin:0;color:#ccc;font-size:15px;line-height:1.6">"${content}"</p>
  </div>
  <a href="${APP_URL}/projects/${ideaId}" style="display:inline-block;background:#00D4FF;color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:13px">VIEW YOUR DROP →</a>
  <p style="margin:24px 0 0;color:#444;font-size:12px">AppDrop · You received this because you submitted this idea</p>
</div>`
}

function newBackerHtml(title: string, amount: number, newTotal: number, goal: number, ideaId: string) {
  const pct = Math.min(100, Math.round((newTotal / goal) * 100))
  return `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;border:1px solid #222">
  <p style="color:#00D4FF;font-size:11px;font-weight:bold;letter-spacing:0.15em;margin:0 0 20px">APPDROP NOTIFICATION</p>
  <h1 style="font-size:22px;margin:0 0 12px">New backer on <span style="color:#00D4FF">${title}</span></h1>
  <p style="color:#888;margin:0 0 20px">Someone pledged <strong style="color:#fff">$${amount.toLocaleString()}</strong> to your drop.</p>
  <div style="background:#181818;border:1px solid #333;border-radius:6px;padding:16px;margin-bottom:24px">
    <div style="display:flex;justify-content:space-between;margin-bottom:10px">
      <span style="color:#888;font-size:13px">Total raised</span>
      <span style="font-weight:bold">$${newTotal.toLocaleString()} <span style="color:#555">/ $${goal.toLocaleString()}</span></span>
    </div>
    <div style="background:#2a2a2a;border-radius:999px;height:6px;overflow:hidden">
      <div style="background:#00D4FF;height:100%;width:${pct}%;border-radius:999px"></div>
    </div>
    <p style="margin:8px 0 0;color:#00D4FF;font-size:12px;font-weight:bold">${pct}% funded</p>
  </div>
  <a href="${APP_URL}/projects/${ideaId}" style="display:inline-block;background:#00D4FF;color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:13px">VIEW YOUR DROP →</a>
  <p style="margin:24px 0 0;color:#444;font-size:12px">AppDrop · You received this because you submitted this idea</p>
</div>`
}

function fundingGoalHtml(title: string, goal: number, ideaId: string) {
  return `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;border:1px solid #222">
  <p style="color:#00FF88;font-size:11px;font-weight:bold;letter-spacing:0.15em;margin:0 0 20px">APPDROP NOTIFICATION</p>
  <h1 style="font-size:28px;margin:0 0 8px;color:#00FF88">FULLY FUNDED! 🚀</h1>
  <p style="color:#888;margin:0 0 20px"><strong style="color:#fff">${title}</strong> just hit its goal of <strong style="color:#00FF88">$${goal.toLocaleString()}</strong>!</p>
  <div style="background:#0a1a0a;border:1px solid rgba(0,255,136,0.2);border-radius:6px;padding:16px;margin-bottom:24px">
    <p style="margin:0;color:#00FF88;font-weight:bold;font-size:14px">What's next?</p>
    <p style="margin:8px 0 0;color:#888;font-size:14px;line-height:1.5">Head to your admin panel and move the status to IN_DEV when you're ready to start building.</p>
  </div>
  <a href="${APP_URL}/projects/${ideaId}" style="display:inline-block;background:#00FF88;color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:13px">VIEW YOUR DROP →</a>
  <p style="margin:24px 0 0;color:#444;font-size:12px">AppDrop · You received this because you submitted this idea</p>
</div>`
}
