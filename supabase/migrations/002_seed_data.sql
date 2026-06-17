-- ============================================================
-- SignalSeed — Seed Data
-- Reflects validation platform positioning.
-- VOTING projects use founder-voice validation copy.
-- FUNDING/IN_DEV/LIVE projects reference their validation signal.
-- ============================================================

-- ── Developers ────────────────────────────────────────────────────────────────
insert into public.developers (id, name, tagline, bio, skills, hourly_rate, rating, review_count, completed_projects, available, avatar_color, initials, github_url, linkedin_url, portfolio_items) values
  (
    'd1000000-0000-0000-0000-000000000001',
    'Alex Chen',
    'Full-stack engineer — ex-Stripe, 12 SignalSeed projects shipped',
    'Ex-Stripe engineer. I specialise in consumer products with real-time requirements. I look for validated SignalSeed ideas with strong waitlist numbers before taking a project.',
    array['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'AWS'],
    180, 4.9, 87, 23, true, '#7C3AED', 'AC',
    'https://github.com', 'https://linkedin.com',
    '[{"title":"PaySync","description":"Real-time payment reconciliation SaaS — $2M ARR. Validated on SignalSeed with 3,400 upvotes before first line of code was written.","image_url":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80","tech_stack":["Next.js","Stripe","PostgreSQL"],"role":"Lead Engineer"},{"title":"FlowBoard","description":"Kanban for solo devs — 50K MAU. Started as a validated SignalSeed idea.","image_url":"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80","tech_stack":["React","Node.js","Redis"],"role":"Solo Developer"}]'
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'Sarah Kim',
    'ML engineer — I only build things the market wants',
    'Former Google Brain researcher. I only claim projects that have cleared STRONG SIGNAL or better on SignalSeed — validation data tells me more than any brief.',
    array['Python', 'PyTorch', 'FastAPI', 'LangChain', 'Docker'],
    220, 4.8, 64, 18, true, '#06B6D4', 'SK',
    'https://github.com', 'https://linkedin.com',
    '[{"title":"DocuMind","description":"AI document analyzer, 1M docs/day. Claimed after the SignalSeed idea hit 2,800 upvotes and 400+ waitlist.","image_url":"https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80","tech_stack":["Python","PyTorch","FastAPI"],"role":"ML Engineer"},{"title":"PriceAI","description":"Dynamic pricing engine for e-commerce. Validated demand before a single API endpoint was written.","image_url":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80","tech_stack":["Python","LangChain","Docker"],"role":"Lead ML Engineer"}]'
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'Marcus Rodriguez',
    'Mobile-first builder — 500K+ downloads across SignalSeed projects',
    'Built apps with 500K+ downloads. I browse SignalSeed weekly — a validated idea with a real waitlist is worth more than any design spec.',
    array['React Native', 'Expo', 'Swift', 'Kotlin', 'Firebase'],
    160, 4.7, 52, 15, false, '#EC4899', 'MR',
    'https://github.com', null,
    '[{"title":"RunTrack Pro","description":"#1 running app in AU App Store. Originated as an SignalSeed validation with 1,900 upvotes.","image_url":"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80","tech_stack":["React Native","Firebase","HealthKit"],"role":"Solo Developer"},{"title":"Mood.io","description":"Mental health app, 200K+ users. Built after community validation confirmed the need.","image_url":"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80","tech_stack":["React Native","Expo","Supabase"],"role":"Lead Mobile Engineer"}]'
  ),
  (
    'd1000000-0000-0000-0000-000000000004',
    'Emma Wilson',
    'Design-engineer hybrid — I make validated ideas beautiful',
    'I blur the line between design and code. I use SignalSeed validation scores to decide which ideas are worth the craft — PROVEN DEMAND gets my full attention.',
    array['Vue.js', 'Nuxt', 'Figma', 'CSS', 'Node.js'],
    140, 4.6, 41, 12, true, '#F97316', 'EW',
    'https://github.com', 'https://linkedin.com',
    '[{"title":"Palette Studio","description":"Design tool used by 30K designers. Community validated, then built beautifully.","image_url":"https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80","tech_stack":["Vue.js","Node.js","Figma API"],"role":"Solo Developer"},{"title":"Spacer","description":"Component spacing tool for Figma — simple idea, high validation signal.","image_url":"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80","tech_stack":["TypeScript","Figma Plugin API"],"role":"Solo Developer"}]'
  ),
  (
    'd1000000-0000-0000-0000-000000000005',
    'Kai Nakamura',
    'Systems engineer — Rust, Go, and validated product requirements',
    'Performance is my baseline. I use SignalSeed''s validation data as my product spec — real user demand signals save months of building the wrong thing.',
    array['Rust', 'Go', 'WebAssembly', 'C++', 'WASM'],
    200, 4.8, 29, 9, true, '#22C55E', 'KN',
    'https://github.com', null,
    '[{"title":"Velo","description":"WASM-powered browser image processor. Claimed after validation confirmed the edge-performance use case.","image_url":"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80","tech_stack":["Rust","WebAssembly","TypeScript"],"role":"Solo Developer"},{"title":"SigmaDB","description":"Edge database in Rust — 400+ developer upvotes before a single commit.","image_url":"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80","tech_stack":["Rust","gRPC","WASM"],"role":"Solo Developer"}]'
  ),
  (
    'd1000000-0000-0000-0000-000000000006',
    'Priya Sharma',
    'Full-stack + DevOps — 5 SignalSeed ideas shipped to LIVE',
    'I''ve shipped 5 SignalSeed projects from validated idea to production. The waitlist data on this platform tells you more about PMF than any user interview.',
    array['React', 'Python', 'Kubernetes', 'Terraform', 'Supabase'],
    190, 4.9, 103, 27, true, '#EAB308', 'PS',
    'https://github.com', 'https://linkedin.com',
    '[{"title":"LaunchKit","description":"Startup boilerplate used by 5K teams. Validated on SignalSeed, built in 8 weeks.","image_url":"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80","tech_stack":["React","Supabase","Terraform"],"role":"Solo Developer"},{"title":"OpsView","description":"Infrastructure monitoring dashboard — claimed after 1,600 dev-tool upvotes confirmed the gap.","image_url":"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80","tech_stack":["React","Python","Kubernetes","Grafana"],"role":"Lead Engineer"}]'
  );


-- ── Ideas / Projects ─────────────────────────────────────────────────────────
-- waitlist_count is populated for VOTING projects to reflect active validation.
-- Upvote distribution shows the full tier range:
--   PROVEN DEMAND  ≥ 2000 pts  (score = upvotes×5 + comments×10 + waitlist×25 + backers×100)
--   STRONG SIGNAL  ≥ 500
--   BUILDING       ≥ 100
--   EARLY SIGNAL   < 100
insert into public.ideas (
  id, title, tagline, description, problem, category, status,
  upvotes, downvotes, funding_goal, funding_current, backer_count,
  waitlist_count, tags, features, target_audience, monetization
) values

  -- 1. FUNDING — validated, now building
  (
    '10000000-0000-0000-0000-000000000001',
    'NeuralNote',
    'Voice → structured notes. Stop typing in meetings.',
    '847 upvotes and 342 waitlist signups confirmed the gap: everyone takes meeting notes but nobody reads them later. NeuralNote uses real-time AI to turn speech into searchable, structured notes with action items extracted automatically. Currently in funding — iOS and Android apps are the next milestone.',
    'Everyone takes meeting notes but nobody reads them later.',
    'AI', 'FUNDING',
    847, 23, 50000, 34200, 342, 0,
    array['ai', 'productivity', 'meetings', 'voice'],
    array['Real-time voice-to-text with AI structuring', 'Action item extraction — no manual tagging', '5-bullet summary, not a transcript wall', 'Integrates with Notion, Linear, and Jira', 'Offline mode with background sync'],
    'Remote teams and knowledge workers', 'Subscription'
  ),

  -- 2. VOTING — PROVEN DEMAND (1203×5 + 2×10 + 280×25 = 13,035 pts)
  (
    '10000000-0000-0000-0000-000000000002',
    'SprintFlow',
    'Project management built for one person, not a team of 20',
    'I''ve tried Jira, Linear, Notion, and Trello for solo work. Every single one assumes you''re part of a team — sprints, standups, story points for a person who ships alone. Testing if solo developers and indie founders want a keyboard-first, zero-ceremony board that gets out of the way.',
    'Every project tool is designed for teams. Solo developers are an afterthought.',
    'PRODUCTIVITY', 'VOTING',
    1203, 41, 30000, 0, 0, 280,
    array['solo-dev', 'kanban', 'productivity', 'keyboard-first'],
    array['Keyboard-first: open laptop and be exactly where you left off', 'Git branch → ticket creation, automatically', 'Single-user velocity (no standup theater)', 'AI task breakdown — paste a goal, get daily subtasks', 'Weekly review built in, not bolted on'],
    'Solo developers and indie founders', 'Subscription'
  ),

  -- 3. IN_DEV — validated and being built
  (
    '10000000-0000-0000-0000-000000000003',
    'DietDrop',
    'Snap a photo. Know your macros. Done.',
    '2,891 upvotes made this SignalSeed''s most-validated health idea. The community insight: generic diet advice fails because it ignores individual biology. DietDrop uses AI photo recognition and optional DNA data to generate nutrition guidance personalised to your metabolism.',
    'Generic diet advice ignores individual biology.',
    'HEALTH', 'IN_DEV',
    2891, 67, 100000, 87300, 567, 0,
    array['health', 'nutrition', 'ai', 'fitness'],
    array['Photo-based food recognition (98% accuracy, 50M+ items)', 'Optional DNA data integration for personalised plans', 'Weekly insights report with actionable changes', 'Apple Health and Fitbit integration', 'Barcode scanner with full nutritional breakdown'],
    'Health-conscious individuals', 'Subscription'
  ),

  -- 4. LIVE — fully shipped
  (
    '10000000-0000-0000-0000-000000000004',
    'ArenaLobby',
    'Skill-matched gaming tournaments with real stakes',
    'Validated by 2,104 upvotes answering one question: would competitive gamers pay to play in skill-matched brackets with real prize money? ArenaLobby is now live with 1,247 backers — cross-game tournament creation, ELO matchmaking, and escrow-backed prize pools.',
    'Skill gaps ruin competitive gaming for anyone outside the top percentile.',
    'GAMING', 'LIVE',
    2104, 89, 75000, 75000, 1247, 0,
    array['gaming', 'esports', 'tournaments', 'competitive'],
    array['ELO-based matchmaking across 15+ games', 'Secure escrow for prize pools', 'Automated bracket management', 'Twitch/YouTube live stream integration', 'Anti-cheat verification layer'],
    'Competitive gamers 18+', 'Transaction fees'
  ),

  -- 5. VOTING — STRONG SIGNAL (185×5 + 1×10 + 12×25 = 1,235 pts)
  (
    '10000000-0000-0000-0000-000000000005',
    'ThreadWeave',
    'What if your newsletter had a real community underneath it?',
    'Published 6 issues of my newsletter — 800 subscribers, 60% open rate, zero public conversation. Email is one-way by design and that limits what writing can become. Testing demand for a platform where long-form content and community live together from day one, not bolted together like Substack retrofitting forums.',
    'Newsletter platforms are stuck in email-first thinking. Public discussion is an afterthought.',
    'SOCIAL', 'VOTING',
    185, 14, 20000, 0, 0, 12,
    array['newsletter', 'community', 'writing', 'creator'],
    array['Rich text editor that doesn''t get in the way', 'Inline paragraph comments — book club on every piece', 'Subscriber tiers with community access gating', 'Discussion threads per issue, not a generic forum', 'Cross-post to X and LinkedIn from one place'],
    'Newsletter writers and content creators', 'Subscription'
  ),

  -- 6. FUNDING — validated, now building
  (
    '10000000-0000-0000-0000-000000000006',
    'StakeTrack',
    'DeFi portfolio tracker that actually handles tax time',
    '445 upvotes from people burned by DeFi tax season confirmed the gap. Tracking yield, impermanent loss, and cost basis across 50+ chains manually is a nightmare — most tools miss chains or can''t produce anything tax authorities accept. Now in funding.',
    'DeFi tax reporting across 50+ chains is a manual nightmare.',
    'FINTECH', 'FUNDING',
    445, 18, 25000, 8700, 187, 0,
    array['defi', 'crypto', 'portfolio', 'tax'],
    array['50+ blockchain support out of the box', 'Real-time DeFi yield tracking', 'Impermanent loss calculator', 'Tax reporting in CSV and TurboTax format', 'Price alerts and rebalance notifications'],
    'DeFi investors and crypto portfolio holders', 'Subscription'
  ),

  -- 7. IN_DEV — validated and being built
  (
    '10000000-0000-0000-0000-000000000007',
    'CodeReview.ai',
    'AI code reviewer trained on your team''s standards',
    '1,543 upvotes from developers who spend 5+ hours a week reviewing PRs confirmed this was worth building. CodeReview.ai is a GitHub App that learns your codebase conventions, flags security issues, and gives inline PR feedback — so senior engineers stop being review bottlenecks.',
    'Code reviews are slow, inconsistent, and don''t scale as teams grow.',
    'DEVELOPER_TOOLS', 'IN_DEV',
    1543, 28, 45000, 40500, 743, 0,
    array['developer-tools', 'ai', 'code-review', 'github'],
    array['Automated PR reviews with inline comments', 'Security vulnerability detection', 'Learns your team''s conventions and style', 'GitHub, GitLab, Bitbucket integration', 'CI/CD pipeline blocking for critical issues'],
    'Software development teams', 'Subscription'
  ),

  -- 8. FUNDING — validated, now building
  (
    '10000000-0000-0000-0000-000000000008',
    'FlashGenius',
    'Upload any doc. Get a perfect flashcard deck in 30 seconds.',
    '892 upvotes from students and lifelong learners confirmed the problem: creating good flashcards takes almost as long as studying. FlashGenius generates spaced-repetition decks from any document, textbook, or video transcript — spend time learning, not formatting cards.',
    'Creating good flashcards takes almost as long as studying.',
    'EDUCATION', 'FUNDING',
    892, 19, 35000, 22100, 521, 0,
    array['education', 'flashcards', 'ai', 'learning'],
    array['AI card generation from PDF, DOCX, or YouTube transcript', 'Spaced repetition using proven SM-2 model', 'Shared deck marketplace', 'Weak-spot detection and focused drilling', 'Offline study mode'],
    'Students and lifelong learners', 'Freemium'
  ),

  -- 9. VOTING — PROVEN DEMAND (320×5 + 1×10 + 45×25 = 2,735 pts)
  (
    '10000000-0000-0000-0000-000000000009',
    'SyncMeetings',
    'Stop taking meeting notes. Let the AI do it.',
    'I have 6-8 meetings a week. I spend 15 minutes in each one half-listening while I type. Tried Otter, Fireflies, and Read.ai — they transcribe but don''t understand. Testing whether people want something that joins your calls, writes a useful summary, and creates real tasks in your project tool automatically.',
    'AI transcription tools produce walls of text, not useful notes.',
    'PRODUCTIVITY', 'VOTING',
    320, 11, 40000, 0, 0, 45,
    array['meetings', 'ai', 'productivity', 'automation'],
    array['Joins Zoom, Meet, and Teams automatically', '5-bullet summary, not a transcript wall', 'Creates tasks in Linear, Jira, or Notion automatically', 'Searches meeting history by topic, not keyword', 'Drafts follow-up emails with assigned action items'],
    'Knowledge workers and product managers', 'Subscription'
  ),

  -- 10. IN_DEV — validated and being built
  (
    '10000000-0000-0000-0000-000000000010',
    'PitchDeck.ai',
    'Describe your startup. Get an investor-ready deck in minutes.',
    '1,102 upvotes from founders who''ve spent 40+ hours on pitch decks proved the pain is real. PitchDeck.ai converts a plain-English description of your startup into a professional deck with real market data, competitor analysis, and financial templates — without hiring a designer or consultant.',
    'Founders waste 40+ hours on pitch decks before they have investor conversations.',
    'AI', 'IN_DEV',
    1102, 45, 45000, 45000, 623, 0,
    array['ai', 'startups', 'fundraising', 'presentations'],
    array['AI slide generation from plain-English description', 'Live market data from Crunchbase and PitchBook', 'Competitor landscape analysis', 'Financial projection templates', 'One-click export to PowerPoint or PDF'],
    'First-time founders and startup teams', 'Pay-per-use'
  ),

  -- 11. FUNDING — validated, now building
  (
    '10000000-0000-0000-0000-000000000011',
    'BeatDrop',
    'Make beats with friends in your browser — no DAW, no install',
    '723 upvotes from music producers confirmed the frustration: collaborative music production requires everyone to own the same expensive software. BeatDrop is a browser-based DAW with real-time collaboration for up to 8 people.',
    'Collaborative music production is locked behind expensive software nobody can agree on.',
    'SOCIAL', 'FUNDING',
    723, 34, 40000, 15000, 298, 0,
    array['music', 'collab', 'audio', 'creator'],
    array['Real-time collaborative sessions, up to 8 people', 'Browser-based — no install, no subscription gatekeeping', '1,000+ professional samples included', 'Export stems and master track', 'Beat marketplace for sharing and monetising'],
    'Music producers and bedroom artists', 'Freemium'
  ),

  -- 12. VOTING — STRONG SIGNAL (94×5 + 1×10 + 8×25 = 680 pts)
  (
    '10000000-0000-0000-0000-000000000012',
    'LegalEasy',
    'Upload any contract. Know what you''re signing in 30 seconds.',
    'Signed a freelance contract last month with a clause I didn''t understand. A lawyer would''ve cost $500 for a $3K project — that math doesn''t work. Testing whether freelancers, renters, and small business owners want an AI tool that analyzes any contract and tells you what you''re actually agreeing to.',
    'Lawyers cost too much for the contracts most people actually sign.',
    'FINTECH', 'VOTING',
    94, 5, 35000, 0, 0, 8,
    array['legal', 'contracts', 'ai', 'freelance'],
    array['Plain-English summary of any contract in 30 seconds', 'Risk flags for clauses that are unusual or unfavorable', 'Comparison against standard contract templates', 'Suggested negotiation points', 'Supports NDAs, freelance agreements, leases, and employment contracts'],
    'Freelancers, renters, and small business owners', 'Pay-per-use'
  ),

  -- 13. LIVE — fully shipped
  (
    '10000000-0000-0000-0000-000000000013',
    'GamePulse',
    'Live esports analytics — every game, one dashboard',
    'Validated by 1,876 upvotes asking "why is there no Bloomberg Terminal for esports?" GamePulse aggregates live match data, player performance, and team analytics across 15 major titles. Now live with a developer API in beta used by betting platforms and content creators.',
    'Esports data is fragmented across game-specific tools with no unified view.',
    'GAMING', 'LIVE',
    1876, 71, 55000, 55000, 1102, 0,
    array['gaming', 'esports', 'analytics', 'data'],
    array['Live match data across 15+ esports titles', 'Player and team performance analytics', '5-year historical data archive', 'Developer API with Discord bot integration', 'Custom alert rules for match events'],
    'Esports fans, analysts, and content creators', 'Freemium + API subscription'
  ),

  -- 14. VOTING — BUILDING (42×5 + 1×10 + 3×25 = 295 pts)
  (
    '10000000-0000-0000-0000-000000000014',
    'DevPulse',
    'One dashboard for your GitHub, Linear, and Jira activity',
    'End-of-quarter review and I spent 3 hours manually compiling what I shipped across 6 tools to write a 10-bullet impact summary. Testing whether developers want a unified activity dashboard that automatically tells the story of what you built — for perf reviews, for your own clarity, or just to know where the week went.',
    'Developer output is scattered across tools nobody aggregates for you.',
    'DEVELOPER_TOOLS', 'VOTING',
    42, 4, 20000, 0, 0, 3,
    array['developer-tools', 'analytics', 'github', 'productivity'],
    array['Pull activity from GitHub, GitLab, Linear, Jira automatically', 'Daily/weekly/monthly summaries in plain English', 'Auto-generate standup updates', 'Context-switch cost analysis (where the day actually went)', 'One-pager export for perf reviews'],
    'Individual contributors and engineering managers', 'Subscription'
  ),

  -- 15. VOTING — BUILDING (18×5 + 1×10 + 1×25 = 125 pts)
  (
    '10000000-0000-0000-0000-000000000015',
    'HealthLedger',
    'Your health records, actually portable',
    'Moved cities last year and had to recreate my entire medical history from scratch — my old GP''s system doesn''t export. Every specialist starts from zero. Testing demand for a personal health record wallet: you aggregate everything, you own it, you share specific pieces with each new doctor.',
    'Health records live in silos across providers. Patients start from scratch every time.',
    'HEALTH', 'VOTING',
    18, 2, 50000, 0, 0, 1,
    array['health', 'privacy', 'records', 'wearables'],
    array['FHIR-compliant import from major hospital systems', 'Connect Apple Health, Fitbit, Garmin wearables', 'Granular sharing — give each doctor only what they need', 'Timeline view of your full health history', 'Emergency access for nominated family members'],
    'Patients who move frequently or see multiple specialists', 'Freemium'
  );


-- ── Milestones ────────────────────────────────────────────────────────────────

-- DietDrop (IN_DEV)
insert into public.milestones (idea_id, title, description, due_date, completed, payout_amount, order_index) values
  ('10000000-0000-0000-0000-000000000003', 'Validation phase', '2,891 upvotes and 567 waitlist signups — demand confirmed', '2025-10-01', true, 0, 0),
  ('10000000-0000-0000-0000-000000000003', 'Food recognition model v1', 'AI photo recognition engine for 50M+ food items', '2026-01-01', true, 25000, 1),
  ('10000000-0000-0000-0000-000000000003', 'iOS beta to waitlist backers', 'Closed beta with tracking and DNA integration', '2026-03-01', true, 30000, 2),
  ('10000000-0000-0000-0000-000000000003', 'Android + public launch', 'Full App Store and Play Store submission', '2026-08-01', false, 32300, 3);

-- CodeReview.ai (IN_DEV)
insert into public.milestones (idea_id, title, description, due_date, completed, payout_amount, order_index) values
  ('10000000-0000-0000-0000-000000000007', 'Validation phase', '1,543 upvotes confirmed developer pain point', '2025-12-01', true, 0, 0),
  ('10000000-0000-0000-0000-000000000007', 'Core review engine + GitHub App', 'Inline PR comments and security scanning', '2026-03-15', true, 15000, 1),
  ('10000000-0000-0000-0000-000000000007', 'Custom rule training', 'Learns team conventions from codebase history', '2026-06-01', false, 15000, 2),
  ('10000000-0000-0000-0000-000000000007', 'GitLab + Bitbucket support', 'Full multi-platform coverage', '2026-08-01', false, 10500, 3);

-- PitchDeck.ai (IN_DEV)
insert into public.milestones (idea_id, title, description, due_date, completed, payout_amount, order_index) values
  ('10000000-0000-0000-0000-000000000010', 'Validation phase', '1,102 upvotes and 623 waitlist — demand confirmed', '2026-01-01', true, 0, 0),
  ('10000000-0000-0000-0000-000000000010', 'Slide generation engine', 'AI slide creation from plain-English description', '2026-02-15', true, 15000, 1),
  ('10000000-0000-0000-0000-000000000010', 'Market data integration', 'Live data from Crunchbase and PitchBook', '2026-04-01', true, 15000, 2),
  ('10000000-0000-0000-0000-000000000010', 'Template library + export', 'PowerPoint and PDF export with design polish', '2026-06-01', false, 15000, 3);


-- ── Sample comments ───────────────────────────────────────────────────────────

-- SprintFlow (VOTING) — validation signal comments
insert into public.comments (idea_id, author, initials, avatar_color, content, likes) values
  ('10000000-0000-0000-0000-000000000002', 'Tim B.', 'TB', '#EC4899', 'I''ve rebuilt my Notion setup 4 times trying to make it work for solo dev. This is exactly the gap I feel every day.', 89),
  ('10000000-0000-0000-0000-000000000002', 'Anna W.', 'AW', '#F97316', 'On the waitlist. Linear is the closest thing but still assumes sprints and planning ceremonies I don''t have.', 55);

-- SyncMeetings (VOTING) — validation signal comments
insert into public.comments (idea_id, author, initials, avatar_color, content, likes) values
  ('10000000-0000-0000-0000-000000000009', 'PM Life', 'PL', '#67E8F9', 'Otter gives me a transcript. That''s not the same as notes. The real problem is turning conversation into action — this gets it.', 44);

-- NeuralNote (FUNDING) — post-validation backing comments
insert into public.comments (idea_id, author, initials, avatar_color, content, likes) values
  ('10000000-0000-0000-0000-000000000001', 'Jake M.', 'JM', '#7C3AED', 'Backed. I spend half my 1:1s typing instead of listening. This fixes that.', 42),
  ('10000000-0000-0000-0000-000000000001', 'Lena Park', 'LP', '#06B6D4', 'The Notion export is the dealbreaker for me — glad it''s in the roadmap.', 28);

-- DietDrop (IN_DEV)
insert into public.comments (idea_id, author, initials, avatar_color, content, likes) values
  ('10000000-0000-0000-0000-000000000003', 'Rachel T.', 'RT', '#22C55E', 'Using the iOS beta. The food recognition is insanely accurate. This is the MyFitnessPal replacement I''ve been waiting for.', 134);

-- LegalEasy (VOTING) — early validation signal
insert into public.comments (idea_id, author, initials, avatar_color, content, likes) values
  ('10000000-0000-0000-0000-000000000012', 'Freelancer', 'FL', '#6EE7B7', 'I''ve signed things I didn''t fully understand because lawyers cost too much for small contracts. This is needed by millions of people.', 91);
