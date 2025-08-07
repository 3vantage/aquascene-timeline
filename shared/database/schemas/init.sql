-- AquaScene Content Engine Database Schema
-- PostgreSQL initialization script

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create enum types
CREATE TYPE content_type AS ENUM (
    'scraped_content',
    'newsletter_article',
    'instagram_post',
    'blog_post',
    'product_guide',
    'how_to_guide'
);

CREATE TYPE content_status AS ENUM (
    'draft',
    'processing',
    'review',
    'approved',
    'published',
    'archived',
    'failed'
);

CREATE TYPE subscriber_status AS ENUM (
    'active',
    'inactive',
    'unsubscribed',
    'bounced'
);

CREATE TYPE newsletter_status AS ENUM (
    'draft',
    'scheduled',
    'sending',
    'sent',
    'failed'
);

CREATE TYPE social_platform AS ENUM (
    'instagram',
    'facebook',
    'twitter',
    'youtube'
);

-- Core content tables
CREATE TABLE raw_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_url TEXT NOT NULL,
    source_domain VARCHAR(255) NOT NULL,
    content_type content_type NOT NULL DEFAULT 'scraped_content',
    title TEXT,
    content TEXT,
    images JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed BOOLEAN DEFAULT FALSE,
    quality_score DECIMAL(3,2),
    language VARCHAR(10) DEFAULT 'en',
    
    -- Indexing
    CONSTRAINT raw_content_quality_score_check CHECK (quality_score >= 0 AND quality_score <= 1)
);

CREATE TABLE generated_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type content_type NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    template_used VARCHAR(100),
    source_materials JSONB DEFAULT '[]',
    quality_score DECIMAL(3,2),
    status content_status DEFAULT 'draft',
    ai_model VARCHAR(50),
    generation_parameters JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE NULL,
    created_by UUID,
    
    -- Constraints
    CONSTRAINT generated_content_quality_score_check CHECK (quality_score >= 0 AND quality_score <= 1)
);

-- Content categorization
CREATE TABLE content_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER REFERENCES content_categories(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE content_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#3182CE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many relationships
CREATE TABLE content_category_assignments (
    content_id UUID REFERENCES generated_content(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES content_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, category_id)
);

CREATE TABLE content_tag_assignments (
    content_id UUID REFERENCES generated_content(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES content_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, tag_id)
);

-- Newsletter management
CREATE TABLE newsletter_issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_number INTEGER NOT NULL,
    template_type VARCHAR(50) NOT NULL,
    subject_line TEXT NOT NULL,
    preheader_text TEXT,
    content_ids UUID[] NOT NULL DEFAULT '{}',
    html_content TEXT,
    text_content TEXT,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE NULL,
    status newsletter_status DEFAULT 'draft',
    segment_filters JSONB DEFAULT '{}',
    metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    
    -- Ensure unique issue numbers
    CONSTRAINT newsletter_issues_issue_number_unique UNIQUE (issue_number)
);

-- Subscriber management
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    status subscriber_status DEFAULT 'active',
    preferences JSONB DEFAULT '{}',
    segments JSONB DEFAULT '[]',
    source VARCHAR(50) DEFAULT 'direct',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE NULL,
    last_opened_at TIMESTAMP WITH TIME ZONE NULL,
    last_clicked_at TIMESTAMP WITH TIME ZONE NULL,
    total_opens INTEGER DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    
    -- Email validation
    CONSTRAINT subscribers_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Newsletter tracking
CREATE TABLE newsletter_sends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    newsletter_issue_id UUID REFERENCES newsletter_issues(id) ON DELETE CASCADE,
    subscriber_id UUID REFERENCES subscribers(id) ON DELETE CASCADE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE NULL,
    opened_at TIMESTAMP WITH TIME ZONE NULL,
    clicked_at TIMESTAMP WITH TIME ZONE NULL,
    bounced_at TIMESTAMP WITH TIME ZONE NULL,
    bounce_reason TEXT,
    unsubscribed_at TIMESTAMP WITH TIME ZONE NULL,
    
    -- Unique constraint to prevent duplicate sends
    CONSTRAINT newsletter_sends_unique UNIQUE (newsletter_issue_id, subscriber_id)
);

-- Social media management
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform social_platform NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_id VARCHAR(100) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique platform account
    CONSTRAINT social_accounts_platform_account_unique UNIQUE (platform, account_id)
);

CREATE TABLE social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES generated_content(id),
    social_account_id UUID REFERENCES social_accounts(id),
    platform social_platform NOT NULL,
    post_text TEXT,
    media_urls JSONB DEFAULT '[]',
    hashtags JSONB DEFAULT '[]',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE NULL,
    platform_post_id VARCHAR(255),
    status content_status DEFAULT 'draft',
    metrics JSONB DEFAULT '{}',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics and metrics
CREATE TABLE content_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES generated_content(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    channel VARCHAR(50) NOT NULL, -- newsletter, instagram, blog, etc.
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    engagements INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    conversion_events INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    additional_metrics JSONB DEFAULT '{}',
    
    -- Unique constraint for daily metrics per content per channel
    CONSTRAINT content_analytics_unique UNIQUE (content_id, date, channel)
);

-- Scraping configuration and history
CREATE TABLE scraping_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    base_url TEXT NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    configuration JSONB NOT NULL DEFAULT '{}',
    last_scraped_at TIMESTAMP WITH TIME ZONE NULL,
    success_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE scraping_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_id UUID REFERENCES scraping_targets(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE NULL,
    status VARCHAR(20) DEFAULT 'running',
    pages_scraped INTEGER DEFAULT 0,
    items_found INTEGER DEFAULT 0,
    items_stored INTEGER DEFAULT 0,
    error_message TEXT,
    job_metadata JSONB DEFAULT '{}'
);

-- Content generation queue
CREATE TABLE generation_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    raw_content_id UUID REFERENCES raw_content(id),
    content_type content_type NOT NULL,
    priority INTEGER DEFAULT 5,
    parameters JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending',
    assigned_to VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE NULL,
    completed_at TIMESTAMP WITH TIME ZONE NULL,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0
);

-- User management for admin dashboard
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'editor',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Email validation
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX idx_raw_content_scraped_at ON raw_content(scraped_at DESC);
CREATE INDEX idx_raw_content_processed ON raw_content(processed, scraped_at DESC);
CREATE INDEX idx_raw_content_source_domain ON raw_content(source_domain);
CREATE INDEX idx_raw_content_quality_score ON raw_content(quality_score DESC) WHERE quality_score IS NOT NULL;

CREATE INDEX idx_generated_content_status ON generated_content(status, created_at DESC);
CREATE INDEX idx_generated_content_type ON generated_content(content_type, created_at DESC);
CREATE INDEX idx_generated_content_published ON generated_content(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX idx_generated_content_quality ON generated_content(quality_score DESC) WHERE quality_score IS NOT NULL;

-- Full-text search indexes
CREATE INDEX idx_raw_content_title_search ON raw_content USING gin(to_tsvector('english', COALESCE(title, '')));
CREATE INDEX idx_raw_content_content_search ON raw_content USING gin(to_tsvector('english', COALESCE(content, '')));
CREATE INDEX idx_generated_content_title_search ON generated_content USING gin(to_tsvector('english', title));
CREATE INDEX idx_generated_content_content_search ON generated_content USING gin(to_tsvector('english', content));

-- Newsletter indexes
CREATE INDEX idx_newsletter_issues_status ON newsletter_issues(status, scheduled_for);
CREATE INDEX idx_newsletter_sends_subscriber ON newsletter_sends(subscriber_id, sent_at DESC);
CREATE INDEX idx_newsletter_sends_issue ON newsletter_sends(newsletter_issue_id);

-- Subscriber indexes
CREATE INDEX idx_subscribers_status ON subscribers(status);
CREATE INDEX idx_subscribers_segments ON subscribers USING gin(segments);
CREATE INDEX idx_subscribers_email_lower ON subscribers(lower(email));

-- Social media indexes
CREATE INDEX idx_social_posts_platform ON social_posts(platform, scheduled_for);
CREATE INDEX idx_social_posts_status ON social_posts(status, scheduled_for);

-- Analytics indexes
CREATE INDEX idx_content_analytics_date ON content_analytics(date DESC);
CREATE INDEX idx_content_analytics_content ON content_analytics(content_id, date DESC);
CREATE INDEX idx_content_analytics_channel ON content_analytics(channel, date DESC);

-- Scraping indexes
CREATE INDEX idx_scraping_targets_enabled ON scraping_targets(enabled, last_scraped_at);
CREATE INDEX idx_scraping_jobs_status ON scraping_jobs(status, started_at DESC);
CREATE INDEX idx_generation_queue_status ON generation_queue(status, priority DESC, created_at);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_generated_content_updated_at BEFORE UPDATE ON generated_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_issues_updated_at BEFORE UPDATE ON newsletter_issues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON social_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scraping_targets_updated_at BEFORE UPDATE ON scraping_targets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO content_categories (name, description, sort_order) VALUES
('Aquascaping Techniques', 'Guides and tutorials on aquascaping methods', 1),
('Plant Care', 'Information about aquatic plants and their care', 2),
('Equipment Reviews', 'Reviews and guides for aquascaping equipment', 3),
('Inspiration', 'Beautiful aquascapes and design ideas', 4),
('Maintenance', 'Tank maintenance and troubleshooting guides', 5),
('Beginner Guides', 'Content specifically for aquascaping beginners', 6),
('Advanced Techniques', 'Complex aquascaping methods for experienced users', 7),
('Product Announcements', 'New product launches and partnerships', 8);

INSERT INTO content_tags (name, color) VALUES
('planted-tank', '#48BB78'),
('dutch-style', '#ED8936'),
('nature-aquarium', '#38B2AC'),
('iwagumi', '#4299E1'),
('jungle-style', '#48BB78'),
('co2', '#9F7AEA'),
('lighting', '#F56565'),
('fertilizers', '#38A169'),
('substrates', '#A0AEC0'),
('beginner-friendly', '#4299E1'),
('advanced', '#E53E3E'),
('maintenance', '#718096'),
('equipment', '#2D3748'),
('plants', '#48BB78'),
('design', '#9F7AEA');

-- Insert default scraping targets
INSERT INTO scraping_targets (name, base_url, configuration) VALUES
('Green Aqua', 'https://www.greenaqua.hu', '{
    "categories": ["plants", "substrates", "fertilizers", "equipment", "blog"],
    "frequency": "daily",
    "respect_delay": 3,
    "max_pages": 50
}'),
('Tropica', 'https://tropica.com', '{
    "categories": ["plants", "guides", "inspiration"],
    "frequency": "daily", 
    "respect_delay": 2,
    "max_pages": 40
}'),
('ADA Global', 'https://www.adana.co.jp', '{
    "categories": ["layouts", "techniques", "products"],
    "frequency": "weekly",
    "respect_delay": 5,
    "max_pages": 30
}');

-- Create a view for active content
CREATE VIEW active_content AS
SELECT 
    gc.*,
    COALESCE(array_agg(DISTINCT cc.name) FILTER (WHERE cc.name IS NOT NULL), '{}') as categories,
    COALESCE(array_agg(DISTINCT ct.name) FILTER (WHERE ct.name IS NOT NULL), '{}') as tags
FROM generated_content gc
LEFT JOIN content_category_assignments cca ON gc.id = cca.content_id
LEFT JOIN content_categories cc ON cca.category_id = cc.id
LEFT JOIN content_tag_assignments cta ON gc.id = cta.content_id
LEFT JOIN content_tags ct ON cta.tag_id = ct.id
WHERE gc.status IN ('approved', 'published')
GROUP BY gc.id;

-- Create a view for newsletter analytics
CREATE VIEW newsletter_analytics AS
SELECT 
    ni.id,
    ni.issue_number,
    ni.subject_line,
    ni.sent_at,
    COUNT(ns.id) as total_sent,
    COUNT(ns.delivered_at) as total_delivered,
    COUNT(ns.opened_at) as total_opened,
    COUNT(ns.clicked_at) as total_clicked,
    COUNT(ns.bounced_at) as total_bounced,
    COUNT(ns.unsubscribed_at) as total_unsubscribed,
    CASE 
        WHEN COUNT(ns.id) > 0 THEN 
            ROUND((COUNT(ns.opened_at)::numeric / COUNT(ns.id)::numeric) * 100, 2)
        ELSE 0 
    END as open_rate,
    CASE 
        WHEN COUNT(ns.opened_at) > 0 THEN 
            ROUND((COUNT(ns.clicked_at)::numeric / COUNT(ns.opened_at)::numeric) * 100, 2)
        ELSE 0 
    END as click_rate
FROM newsletter_issues ni
LEFT JOIN newsletter_sends ns ON ni.id = ns.newsletter_issue_id
WHERE ni.status = 'sent'
GROUP BY ni.id, ni.issue_number, ni.subject_line, ni.sent_at;

COMMIT;