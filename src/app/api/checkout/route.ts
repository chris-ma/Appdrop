import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder')

export async function POST(req: NextRequest) {
  try {
    const { ideaId, ideaTitle, amount, userId } = await req.json()

    if (!ideaId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const origin = req.headers.get('origin') ?? 'https://appdrop-eight.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Back: ${ideaTitle ?? 'SignalSeed Project'}`,
              description: 'Your pledge helps fund this idea on SignalSeed',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/projects/${ideaId}?paid=1`,
      cancel_url: `${origin}/projects/${ideaId}`,
      metadata: { ideaId, amount: String(amount), userId: userId ?? '' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
