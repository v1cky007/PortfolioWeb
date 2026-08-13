-- ============================================
-- Supabase Database Setup for Portfolio Blog
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Career',
  category_color TEXT DEFAULT '#FF6B35',
  image TEXT,
  read_time TEXT DEFAULT '5 min read',
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  slug TEXT,
  author JSONB DEFAULT '{"name": "M. Vigneash", "avatar": "/Profile.jpeg"}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Page views table (analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  ip_hash TEXT
);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_views ON posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_page_views_post_id ON page_views(post_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 5. Public read access for posts (anyone can view blog)
CREATE POLICY "Public can read posts" ON posts
  FOR SELECT USING (true);

-- 6. Public insert for page_views (anyone can record a view)
CREATE POLICY "Public can insert views" ON page_views
  FOR INSERT WITH CHECK (true);

-- 7. Public read for page_views (needed for view counts on blog page)
CREATE POLICY "Public can read views" ON page_views
  FOR SELECT USING (true);

-- 8. Authenticated full access for posts (admin can do everything)
CREATE POLICY "Authenticated can manage posts" ON posts
  FOR ALL USING (true)
  WITH CHECK (true);

-- 9. Migrate existing blog data (run once)
INSERT INTO posts (id, title, excerpt, content, category, category_color, image, read_time, featured, tags, views, slug, author, created_at)
VALUES
  (
    'bpcl-internship-experience',
    'My BPCL Internship — Building Real-World Solutions at Bharat Petroleum',
    'How my internship at Bharat Petroleum Corporation Limited gave me hands-on experience in building enterprise-grade software for one of India''s largest energy companies.',
    E'When I got the opportunity to intern at **Bharat Petroleum Corporation Limited (BPCL)**, I knew it would be different from a typical software company internship.\n\n## Getting In\n\nBPCL''s internship selection process is straightforward but competitive.\n\n## What I Worked On\n\n### Internal Dashboard Application\nMy primary project was building an internal dashboard that aggregated data from multiple sources.\n\n**The stack:** React for the frontend, Spring Boot for the backend, and MySQL for the database.\n\n## What I Learned\n\n- **React** — Building interactive dashboards\n- **Spring Boot** — REST API development\n- **MySQL** — Complex joins, query optimization\n- **Git** — Working in a team with branching workflows',
    'Career',
    '#FF6B35',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop',
    '6 min read',
    false,
    ARRAY['Internship', 'Enterprise Software', 'Career'],
    42,
    'bpcl-internship-experience',
    '{"name": "M. Vigneash", "avatar": "/Profile.jpeg"}',
    '2026-07-15'
  ),
  (
    'building-my-projects',
    'Building Three Full-Stack Projects — From EstateFlow to Vortex Play',
    'A deep dive into the design decisions, technical challenges, and lessons learned while building three full-stack projects.',
    E'Projects are where you learn the most.\n\n## EstateFlow — AI-Powered House Brokerage Platform\n\n### Tech Stack\n- **Frontend:** React with React Router, Tailwind CSS\n- **Backend:** Spring Boot with JPA\n- **Database:** MySQL\n\n## Vortex Play — Cloud-Based Gaming Platform\n\n### Tech Stack\n- **Frontend:** HTML5, CSS3, Vanilla JavaScript\n- **Backend:** Node.js with Socket.io\n\n## Grocery Store Website — E-Commerce Platform\n\n### Tech Stack\n- **Frontend:** React with Context API\n- **Backend:** Node.js with Express\n- **Database:** MongoDB',
    'Projects',
    '#00D4AA',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    '8 min read',
    false,
    ARRAY['Full-Stack', 'React', 'Projects', 'Architecture'],
    63,
    'building-my-projects',
    '{"name": "M. Vigneash", "avatar": "/Profile.jpeg"}',
    '2026-07-10'
  ),
  (
    'my-cognizant-internship',
    'My Cognizant GenC Next Internship — An Honest Account',
    'A first-hand account of my Cognizant GenC Next internship from January to May 2026.',
    E'Getting selected for the Cognizant GenC Next program was a milestone.\n\n## The Selection Process\n\nMulti-layered selection process.\n\n## What the Program Looks Like\n\n### Phase 1: Foundation Training\nThe first month is all about fundamentals.\n\n### Phase 2: Specialization\nI went with **Full-Stack Development** (Angular + Spring Boot).\n\n### Phase 3: Project Work\nThe final phase involves working on a real project.\n\n## What I Learned\n\n- **Angular** — Component architecture, RxJS, TypeScript\n- **Spring Boot** — REST APIs, JPA, security configuration\n- **Git** — Branching strategies, pull requests',
    'Career',
    '#BF00FF',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    '5 min read',
    true,
    ARRAY['Internship', 'Career'],
    86,
    'my-cognizant-internship',
    '{"name": "M. Vigneash", "avatar": "/Profile.jpeg"}',
    '2026-06-18'
  )
ON CONFLICT (id) DO NOTHING;
  