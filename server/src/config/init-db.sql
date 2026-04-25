-- Database Initialization Script for ASAP Kerala Unified Portal

-- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES ('ADMIN'), ('STUDENT'), ('MENTOR'), ('TRAINER'), ('PARTNER_PM'), ('CORPORATE') ON CONFLICT DO NOTHING;

-- 2. Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INT REFERENCES roles(id),
  category VARCHAR(20) DEFAULT 'DIR', -- ALL, TBB, FRR, DIR
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Memberships
CREATE TABLE IF NOT EXISTS memberships (
  id SERIAL PRIMARY KEY,
  tier_name VARCHAR(50) NOT NULL,
  coin_multiplier DECIMAL DEFAULT 1.0,
  initial_coins INT DEFAULT 0
);

INSERT INTO memberships (tier_name, coin_multiplier, initial_coins) VALUES 
('Basic', 1.0, 1),
('Silver', 1.2, 10),
('Gold', 1.5, 100),
('Diamond', 2.0, 1000),
('Platinum', 3.0, 2000) ON CONFLICT DO NOTHING;

-- 4. Students
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  aadhaar_hash TEXT UNIQUE NOT NULL,
  student_tag_id VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(10) NOT NULL, -- DIR, INS, FRR, TBB
  skill_coin_balance DECIMAL DEFAULT 0,
  total_skill_score INT DEFAULT 0,
  membership_id INT REFERENCES memberships(id)
);

-- 5. Courses
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration_hours INT NOT NULL,
  fee DECIMAL NOT NULL,
  min_attendance INT DEFAULT 75
);

-- 6. Batches
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_code VARCHAR(50) UNIQUE NOT NULL,
  course_id UUID REFERENCES courses(id),
  trainer_id UUID,
  start_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'PLANNED',
  mode VARCHAR(20) DEFAULT 'ONLINE'
);

-- SEED DATA (Populating)
-- 7. Lessons (Vertical 4)
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES batches(id),
  topic_name VARCHAR(255) NOT NULL,
  teacher_id UUID,
  scheduled_at TIMESTAMP
);

-- 8. Partners & Corporates (Vertical 1 & FRR)
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  zone_id INT,
  commission_rate DECIMAL DEFAULT 10.0,
  revenue_share_config JSONB
);

CREATE TABLE IF NOT EXISTS corporates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  lead_status VARCHAR(20) DEFAULT 'COLD',
  proposal_url TEXT
);

-- 9. Enrollments & Feedback
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  batch_id UUID REFERENCES batches(id),
  payment_status VARCHAR(20) DEFAULT 'PENDING',
  feedback_progress INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id),
  checkpoint INT NOT NULL,
  rating INT,
  comments TEXT
);

-- 10. Skill Economy (Vertical 1)
CREATE TABLE IF NOT EXISTS skill_coin_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  amount DECIMAL NOT NULL,
  activity_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Mentorship
CREATE TABLE IF NOT EXISTS mentorship_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID,
  student_id UUID REFERENCES students(id),
  scheduled_time TIMESTAMP,
  is_paid BOOLEAN DEFAULT FALSE
);
-- SEED DATA (CORE USERS)
-- Note: password_hash 'psw' for development testing
INSERT INTO roles (name) VALUES ('ADMIN'), ('STUDENT'), ('MENTOR'), ('TRAINER'), ('PARTNER_PM'), ('CORPORATE'), ('FINANCE_OFFICER'), ('VERTICAL_USER') ON CONFLICT DO NOTHING;

-- ... (existing memberships/users/students/courses/batches tables omitted for brevity in instruction, but kept in file) ...

-- 12. Finance Module Tables
-- 12.1 Budgets
CREATE TABLE IF NOT EXISTS finance_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical VARCHAR(50) NOT NULL, -- TRAINING, CSP, SDC, TBB, etc.
  financial_year VARCHAR(20) NOT NULL, -- e.g. "2025-26"
  allocated DECIMAL DEFAULT 0,
  used DECIMAL DEFAULT 0,
  released DECIMAL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(vertical, financial_year)
);

-- 12.2 Requisitions
CREATE TABLE IF NOT EXISTS finance_requisitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical VARCHAR(50) NOT NULL,
  amount DECIMAL NOT NULL,
  purpose TEXT NOT NULL,
  description TEXT,
  financial_year VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, FUNDS_RELEASED
  rejection_note TEXT,
  approved_amount DECIMAL,
  released_amount DECIMAL,
  raised_by_id UUID REFERENCES users(id),
  approved_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12.3 Transactions
CREATE TABLE IF NOT EXISTS finance_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_type VARCHAR(50) NOT NULL, -- STUDENT_PAYMENT, SALARY, EXPENSE, etc.
  source VARCHAR(50) NOT NULL,
  amount DECIMAL NOT NULL,
  description TEXT,
  reference VARCHAR(255),
  status VARCHAR(20) DEFAULT 'SUCCESS',
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12.4 Salaries & Payouts
CREATE TABLE IF NOT EXISTS finance_salaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_type VARCHAR(50) NOT NULL,
  employee_name VARCHAR(255) NOT NULL,
  vertical VARCHAR(50),
  amount DECIMAL NOT NULL,
  month VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING',
  payment_date TIMESTAMP,
  reference VARCHAR(255),
  commission DECIMAL,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12.5 Donor Funds
CREATE TABLE IF NOT EXISTS finance_donor_funds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name VARCHAR(255) NOT NULL,
  donor_type VARCHAR(50) DEFAULT 'INDIVIDUAL',
  amount DECIMAL NOT NULL,
  vertical VARCHAR(50),
  project VARCHAR(255),
  purpose TEXT,
  reference VARCHAR(255),
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12.6 Bank Records (EMD/BG)
CREATE TABLE IF NOT EXISTS finance_bank_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_type VARCHAR(50) NOT NULL, -- STATEMENT, EMD, BG, FD
  bank_name VARCHAR(255),
  account_no VARCHAR(50),
  amount DECIMAL NOT NULL,
  description TEXT,
  reference VARCHAR(255),
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12.7 Utilisation Reports
CREATE TABLE IF NOT EXISTS finance_utilisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requisition_id UUID REFERENCES finance_requisitions(id),
  vertical VARCHAR(50) NOT NULL,
  amount DECIMAL NOT NULL,
  description TEXT,
  bill_no VARCHAR(100),
  status VARCHAR(20) DEFAULT 'PENDING',
  rejection_note TEXT,
  submitted_by_id UUID REFERENCES users(id),
  verified_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12.8 Finance Audit Log
CREATE TABLE IF NOT EXISTS finance_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(50) NOT NULL, -- CREATE, UPDATE, APPROVE
  entity VARCHAR(50) NOT NULL, -- Budget, Requisition, etc.
  entity_id UUID NOT NULL,
  details TEXT, -- JSON string of changes
  performed_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA (CORE USERS)
-- Note: password_hash 'psw' for development testing
INSERT INTO users (email, mobile, password_hash, role_id, category) VALUES 
('admin@asapkerala.org', '0000000000', 'psw', (SELECT id FROM roles WHERE name='ADMIN'), 'ALL'),
('tbb-admin@asap.com', '1111111111', 'psw', (SELECT id FROM roles WHERE name='ADMIN'), 'TBB'),
('frr-admin@asap.com', '2222222222', 'psw', (SELECT id FROM roles WHERE name='ADMIN'), 'FRR'),
('partner1@asap.com', '3333333333', 'psw', (SELECT id FROM roles WHERE name='PARTNER_PM'), 'DIR'),
('partner2@asap.com', '4444444444', 'psw', (SELECT id FROM roles WHERE name='PARTNER_PM'), 'DIR'),
('partner3@asap.com', '5555555555', 'psw', (SELECT id FROM roles WHERE name='PARTNER_PM'), 'DIR'),
('finance@asapkerala.gov.in', '9999999999', 'psw', (SELECT id FROM roles WHERE name='FINANCE_OFFICER'), 'ALL')
ON CONFLICT (email) DO NOTHING;

-- SEED DATA (PARTNERS)
INSERT INTO partners (name, zone_id, commission_rate) VALUES 
('Skill Park Trivandrum', 1, 12.5),
('ASAP Community Park Kochi', 2, 10.0),
('Future Lab Kozhikode', 3, 15.0)
ON CONFLICT DO NOTHING;

-- SEED DATA (FINANCE)
INSERT INTO finance_budgets (vertical, financial_year, allocated, used, released) VALUES 
('TRAINING', '2025-26', 5000000, 1200000, 3000000),
('TBB', '2025-26', 2000000, 450000, 1000000),
('FRR', '2025-26', 3500000, 800000, 2000000)
ON CONFLICT DO NOTHING;

INSERT INTO finance_transactions (transaction_type, source, amount, description, status) VALUES 
('FUND_RELEASE', 'TRAINING', 500000, 'Quarterly fund release for Training Vertical', 'SUCCESS'),
('SALARY', 'TBB', 120000, 'Monthly trainer payouts - April 2026', 'SUCCESS'),
('EXPENSE', 'FRR', 45000, 'Marketing and Corporate Outreach', 'SUCCESS')
ON CONFLICT DO NOTHING;
