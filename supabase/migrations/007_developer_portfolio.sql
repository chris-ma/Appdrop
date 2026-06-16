-- Feature: Rich developer profiles (bio, social links, rich portfolio items)

alter table public.developers
  add column if not exists bio text not null default '',
  add column if not exists github_url text,
  add column if not exists linkedin_url text,
  add column if not exists website_url text;

-- Backfill bio from tagline for existing rows
update public.developers set bio = tagline where bio = '';

-- Update seed developers with bio, social links, and rich portfolio_items JSONB
-- portfolio_items JSONB now supports: title, description, url, image_url, tech_stack[], role

update public.developers set
  bio = 'Full-stack engineer with 8 years building production AI/ML products. Ex-Stripe. I ship fast and I ship quality.',
  github_url = 'https://github.com',
  linkedin_url = 'https://linkedin.com',
  website_url = 'https://alexchen.dev',
  portfolio_items = '[
    {"title":"NeuralNote (beta)","description":"AI note-taking app with 12K beta users","url":"#","image_url":"https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80","tech_stack":["Next.js","Python","OpenAI"],"role":"Lead Engineer"},
    {"title":"DataViz Pro","description":"Real-time analytics dashboard processing 2M events/day","url":"#","image_url":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80","tech_stack":["React","D3.js","PostgreSQL"],"role":"Solo Developer"}
  ]'::jsonb
where id = 'd1000000-0000-0000-0000-000000000001';

update public.developers set
  bio = 'Mobile-first developer who has shipped apps with 500K+ downloads. I obsess over UX and performance in equal measure.',
  github_url = 'https://github.com',
  linkedin_url = 'https://linkedin.com',
  portfolio_items = '[
    {"title":"FitTrack Mobile","description":"Health & fitness tracker — #1 in Health on AU App Store","url":"#","image_url":"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80","tech_stack":["React Native","Firebase","HealthKit"],"role":"Solo Developer"},
    {"title":"SpendWise","description":"Personal finance app, 80K monthly active users","url":"#","image_url":"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80","tech_stack":["Swift","Node.js","Stripe"],"role":"Lead Mobile Engineer"}
  ]'::jsonb
where id = 'd2000000-0000-0000-0000-000000000002';

update public.developers set
  bio = 'Blockchain and Web3 specialist. Ex-Coinbase. I build the financial infrastructure for the decentralized future.',
  github_url = 'https://github.com',
  portfolio_items = '[
    {"title":"DeFi Swap Protocol","description":"Decentralized exchange with $40M total value locked","url":"#","image_url":"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80","tech_stack":["Solidity","Rust","Hardhat"],"role":"Protocol Engineer"},
    {"title":"NFT Marketplace","description":"Creator-first NFT platform — 2K+ active creators","url":"#","image_url":"https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80","tech_stack":["Ethereum","IPFS","TypeScript"],"role":"Lead Engineer"}
  ]'::jsonb
where id = 'd3000000-0000-0000-0000-000000000003';

update public.developers set
  bio = 'Backend architect specializing in distributed systems at scale. If it needs to handle 100M requests, I am the person you call.',
  github_url = 'https://github.com',
  linkedin_url = 'https://linkedin.com',
  portfolio_items = '[
    {"title":"ArenaLobby Backend","description":"Real-time gaming matchmaking serving 500K concurrent users","url":"#","image_url":"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80","tech_stack":["Go","Kubernetes","Redis","gRPC"],"role":"Backend Architect"},
    {"title":"PayFlow API","description":"Payment processing microservice — $5M/day transaction volume","url":"#","image_url":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80","tech_stack":["Go","PostgreSQL","Stripe"],"role":"Solo Architect"}
  ]'::jsonb
where id = 'd4000000-0000-0000-0000-000000000004';

update public.developers set
  bio = 'AI/ML engineer with deep NLP expertise. I turn research papers into production systems that actually scale.',
  github_url = 'https://github.com',
  linkedin_url = 'https://linkedin.com',
  website_url = 'https://priyasharma.ml',
  portfolio_items = '[
    {"title":"SentimentIQ","description":"Social media sentiment analyzer — processing 5M posts/day","url":"#","image_url":"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80","tech_stack":["Python","PyTorch","FastAPI","GCP"],"role":"ML Engineer"},
    {"title":"DocScan AI","description":"Document intelligence API used by 200+ enterprise clients","url":"#","image_url":"https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80","tech_stack":["Python","OpenCV","Transformers","Docker"],"role":"Lead ML Engineer"}
  ]'::jsonb
where id = 'd5000000-0000-0000-0000-000000000005';

update public.developers set
  bio = 'Full-stack developer and startup veteran. I have built 10 products from scratch and know what it takes to go from zero to revenue.',
  github_url = 'https://github.com',
  portfolio_items = '[
    {"title":"CourseFlow","description":"E-learning platform with 15K enrolled students","url":"#","image_url":"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80","tech_stack":["Vue.js","Laravel","MySQL","Stripe"],"role":"Solo Developer"},
    {"title":"HireBoard","description":"Job posting and ATS used by 400+ companies","url":"#","image_url":"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80","tech_stack":["Vue.js","Laravel","Redis"],"role":"Lead Developer"}
  ]'::jsonb
where id = 'd6000000-0000-0000-0000-000000000006';
