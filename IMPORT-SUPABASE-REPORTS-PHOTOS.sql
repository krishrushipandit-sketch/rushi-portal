-- ============================================================
-- Bulletproof Email-Mapped Supabase Data Import
-- ============================================================

-- 1. Update Profiles with Avatars and Details

UPDATE profiles 
SET avatar_url = COALESCE('', avatar_url),
    phone = COALESCE('', phone),
    whatsapp_number = COALESCE('9768726006', whatsapp_number),
    department = COALESCE('', department),
    designation = COALESCE('', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('krish.rushipandit@gmail.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/ru8q3jpc39.jpeg', avatar_url),
    phone = COALESCE('8169014515', phone),
    whatsapp_number = COALESCE('8169014515', whatsapp_number),
    department = COALESCE('Marketing', department),
    designation = COALESCE('Marketing Executive', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('shreya@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('', avatar_url),
    phone = COALESCE('9768726006', phone),
    whatsapp_number = COALESCE('1234567891', whatsapp_number),
    department = COALESCE('', department),
    designation = COALESCE('', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('test@gmail.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/qvg5bfdwdrj.png', avatar_url),
    phone = COALESCE('9324792360', phone),
    whatsapp_number = COALESCE('9324792360', whatsapp_number),
    department = COALESCE('Media', department),
    designation = COALESCE('Co-Founder - OORRUU Media', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('kedar@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('', avatar_url),
    phone = COALESCE('', phone),
    whatsapp_number = COALESCE('9702446345', whatsapp_number),
    department = COALESCE('IT', department),
    designation = COALESCE('', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('krish.agnomatic@gmail.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/yr3hueegfm.png', avatar_url),
    phone = COALESCE('8850089289', phone),
    whatsapp_number = COALESCE('8850089289', whatsapp_number),
    department = COALESCE('', department),
    designation = COALESCE('Founder', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('rushikesh@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/32ucyhvj0ch.png', avatar_url),
    phone = COALESCE('7757898267', phone),
    whatsapp_number = COALESCE('7757898267', whatsapp_number),
    department = COALESCE('Sales', department),
    designation = COALESCE('HR', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('shridhar@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/ti5q5aw2t7.png', avatar_url),
    phone = COALESCE('8779668655', phone),
    whatsapp_number = COALESCE('8779668655', whatsapp_number),
    department = COALESCE('Operations', department),
    designation = COALESCE('Operations Manager ', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('pooja@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/8rqidp7vmmk.jpeg', avatar_url),
    phone = COALESCE('8369536422', phone),
    whatsapp_number = COALESCE('8369536422', whatsapp_number),
    department = COALESCE('Design', department),
    designation = COALESCE('Creative Designer', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('rohan@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/2yrz61m55xy.png', avatar_url),
    phone = COALESCE('8452074170', phone),
    whatsapp_number = COALESCE('8452074170', whatsapp_number),
    department = COALESCE('Sales', department),
    designation = COALESCE('Sales Executive', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('poonam@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/oh1irfvuaz.jpeg', avatar_url),
    phone = COALESCE('9371919222', phone),
    whatsapp_number = COALESCE('9371919222', whatsapp_number),
    department = COALESCE('Operations', department),
    designation = COALESCE('Operations Executive ', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('swapnil@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/v8h5sji5nlc.PNG', avatar_url),
    phone = COALESCE('9221874960', phone),
    whatsapp_number = COALESCE('9221874960', whatsapp_number),
    department = COALESCE('Business', department),
    designation = COALESCE('Video Editor', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('suyog@rushipandit.com');


UPDATE profiles 
SET avatar_url = COALESCE('https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/falj6nmulg7.jpg', avatar_url),
    phone = COALESCE('9987475537', phone),
    whatsapp_number = COALESCE('92843 84859', whatsapp_number),
    department = COALESCE('Sales', department),
    designation = COALESCE('Sales Executive', designation),
    bio = COALESCE(NULL, bio)
WHERE LOWER(email) = LOWER('naveen@rushipandit.com');


-- 2. Employee Responsibilities

INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Daily Calls', NULL, 15, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Daily Follow-up', NULL, 25, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'DM Enrollment', NULL, 15, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Amazon Enrollment', NULL, 10, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Internal reel editing', NULL, 4, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Internal YouTube editing', NULL, 1, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Client posting', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Content scripting', NULL, 3, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Ads reporting', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Tech support', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Shoot', NULL, 5, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Design', NULL, 2, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Daily posting', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Webinar management', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Reminder management', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'WhatsApp group creation', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Webinar coordination', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Content scripting', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Shooting', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Google posting replies', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Internal Posting', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Leads management', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Comments', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Prospects', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'SM calling', NULL, 10, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shridhar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'SM follow up', NULL, 20, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shridhar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'SM Target', NULL, 15, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('shridhar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Daily Calls', NULL, 15, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Daily Follow-up', NULL, 25, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'DM Enrollment', NULL, 15, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Amazon Enrollment', NULL, 10, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'CA Suyash Sir', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Advisor Alpha', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Amicus Claims', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'MBC', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Karrier', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Shubhash Shrivastav', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, 'Client Management', NULL, 0, 'daily', true
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT DO NOTHING;


-- 3. Daily Reports

INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":3,"notes":"Scripts Sarvam AI, Trends in AI in 2026 (2 scripts)","description":"Content scripting"},{"count":0,"notes":"No Shoot today","description":"Shooting"},{"count":12,"notes":"Done","description":"Google posting replies"},{"count":11,"notes":"Agnomatic prospects data collection 11 email id updated","description":"Agnomatic prospects data collection 11 email id updated"}]'::jsonb, '', '2026-05-11T12:59:22.696745+00:00', '2026-05-11T13:44:33.088+00:00', false, NULL, NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":1,"notes":"Oorruu Media ad done","description":"Internal reel editing"},{"count":1,"notes":"SM long video done","description":"Internal YouTube editing"}]'::jsonb, '', '2026-05-11T12:58:03.178477+00:00', '2026-05-11T12:59:24.178+00:00', false, '10:13:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":1,"notes":"Mbc","description":"Client posting"},{"count":4,"notes":"Lms issues","description":"Tech support"},{"count":1,"notes":"Amicus claims content strategy and content calendar created","description":"Content planning"},{"count":1,"notes":"Post boost done","description":"CA"},{"count":10,"notes":"Amazon calls, welcome calls","description":"Calls"}]'::jsonb, '', '2026-05-11T12:59:38.718408+00:00', '2026-05-11T16:03:42.422+00:00', false, '10:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":15,"notes":"Made daily calls","description":"Daily Calls"},{"count":33,"notes":"Completed daily follow-ups","description":"Daily Follow-up"},{"count":2,"notes":"Completed DM enrollments","description":"DM Enrollment"},{"count":0,"notes":"Completed Amazon enrollments","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-11T12:33:01.137576+00:00', '2026-05-11T13:04:29.248+00:00', false, '12:00:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":1,"notes":"Follow up with Hemant sir regarding the content planning meeting, CA suyash sir follow up regarding the post boosting, and follow up with Raunaq sir regarding payment, Meeting With Rutuj Sir About Content Planning","description":"Client management"},{"count":1,"notes":"1 MBC reel done,","description":"Client reel editing"},{"count":1,"notes":"1 Video of Amicus","description":"Client YouTube editing"},{"count":1,"notes":"Ordered 1 Tripod","description":"Ordered 1 Tripod"},{"count":1,"notes":"Report Structure Meeting","description":"Report Structure Meeting"}]'::jsonb, '', '2026-05-11T11:02:10.810317+00:00', '2026-05-11T14:20:22.689+00:00', false, '10:10:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":5,"notes":"","description":"Daily Calls"},{"count":1,"notes":"","description":"Daily Follow-up"},{"count":1,"notes":"","description":"DM Enrollment"},{"count":1,"notes":"","description":"Amazon Enrollment"}]'::jsonb, ' ', '2026-05-11T13:02:13.379299+00:00', '2026-05-11T13:07:26.421+00:00', false, '10:30:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":2,"notes":"Designed posts for  agnomatic","description":"Design"},{"count":1,"notes":"Did daily posting","description":"Daily posting"},{"count":1,"notes":"Created WhatsApp group","description":"WhatsApp group creation"},{"count":3,"notes":"Created thumbnails for share market","description":"Thumbnail creation"},{"count":2,"notes":"Createdu design posts for Anubhuti yoga","description":"Design"}]'::jsonb, '', '2026-05-11T13:04:12.871087+00:00', '2026-05-11T13:07:30.128+00:00', false, '11:50:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-11', '[{"count":1,"notes":"Not assigned till now","description":"Internal Posting"},{"count":1,"notes":"Not assigned till now","description":"Leads management"},{"count":1,"notes":"Not assigned till now","description":"Comments"},{"count":15,"notes":"Done","description":"Prospects"}]'::jsonb, '', '2026-05-11T13:00:39.491331+00:00', '2026-05-11T13:26:34.234+00:00', false, '10:10:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":37,"notes":"Made daily calls","description":"Daily Calls"},{"count":3,"notes":"Did daily follow-ups","description":"Daily Follow-up"},{"count":0,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-12T12:55:33.255897+00:00', '2026-05-12T12:55:32.71+00:00', false, '10:00:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":3,"notes":"scripts - data centre in space, paperclip AI tool, DM ad","description":"Content scripting"},{"count":6,"notes":"done","description":"Shooting"},{"count":13,"notes":"Agnomatic prospects data","description":"Agnomatic prospects data"},{"count":3,"notes":"placement agencies data","description":"placement agencies data"}]'::jsonb, '', '2026-05-12T12:46:07.378447+00:00', '2026-05-12T12:50:07.937+00:00', false, '10:19:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":6,"notes":"Completed six shoots","description":"Shoot"},{"count":1,"notes":"Created design for Anubhuti Yoga","description":"Design"},{"count":1,"notes":"Daily posting for RP World Trade","description":"Daily posting"},{"count":0,"notes":"","description":"Webinar management"},{"count":1,"notes":"Sent reminder to webinar group","description":"Reminder management"},{"count":2,"notes":"Created thumbnails for SM and Agnomatic","description":"Design"}]'::jsonb, '', '2026-05-12T12:45:24.921314+00:00', '2026-05-12T12:50:44.36+00:00', false, '10:50:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":3,"notes":"Suyash sir reel , RP dm reel , making changes in agnomatic reel","description":"Internal reel editing"},{"count":1,"notes":"In progress","description":"Id card design"}]'::jsonb, '', '2026-05-12T13:37:44.166828+00:00', '2026-05-12T13:37:44.058+00:00', false, '10:10:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":1,"notes":"Follow Up with Raunaq About Payment, Rutuj''s Bag Shoot Shoot Scheduling, Meeting Done with Hemant sir regarding the Content planning, Made April Invoice of Content creation For MBC","description":"Client management"},{"count":1,"notes":"1 YT video Of Amicus","description":"Client reel editing"},{"count":1,"notes":"","description":"ID Design Ideation & Alteration"},{"count":1,"notes":"","description":"Researched some ideas for ad shoot of Shubhash sir and Rutuj Sir"}]'::jsonb, '', '2026-05-12T12:25:59.393779+00:00', '2026-05-12T14:40:06.208+00:00', false, '10:42:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":0,"notes":"not assingned yet","description":"Internal Posting"},{"count":0,"notes":"not assingned yet","description":"Leads management"},{"count":0,"notes":"not assingned yet","description":"Comments"},{"count":0,"notes":"done","description":"Prospects"},{"count":1,"notes":"created and launched facebook campaign","description":"facebook campaign"},{"count":0,"notes":"collected products videos from internet for posting","description":"social media"}]'::jsonb, '', '2026-05-12T13:36:52.959695+00:00', '2026-05-12T13:38:07.525+00:00', false, '10:10:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":2,"notes":"lms issue","description":"Tech support"},{"count":1,"notes":"brochure changes done","description":"canva"},{"count":1,"notes":"upload, replies, fund check","description":"leads"},{"count":20,"notes":"emails sent, new added for next","description":"agnomatic outreach"}]'::jsonb, '', '2026-05-12T13:53:04.331075+00:00', '2026-05-12T14:28:46.03+00:00', false, NULL, NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-12', '[{"count":10,"notes":"","description":"Daily Calls"},{"count":10,"notes":"","description":"Daily Follow-up"},{"count":2,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"},{"count":1,"notes":"","description":"Today''s Visit 1"},{"count":5,"notes":"","description":"Total Visits"}]'::jsonb, '', '2026-05-12T16:50:14.4069+00:00', '2026-05-12T16:50:14.303+00:00', false, '10:30:00', '18:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":1,"notes":"Studio setup at his home","description":"Shubhash Shrivastav"},{"count":1,"notes":"Shoot for sesa ayurvedic hair oil done at Malad.","description":"Client Management"}]'::jsonb, '', '2026-05-13T14:31:21.11116+00:00', '2026-05-13T14:31:20.986+00:00', false, '10:33:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-14', '[{"count":10,"notes":"daily fresh calls made","description":"Daily Calls"},{"count":5,"notes":"daily follow up calls made","description":"Daily Follow-up"},{"count":0,"notes":"dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-14T13:17:45.130447+00:00', '2026-05-14T13:17:45.031+00:00', false, '09:50:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-14', '[{"count":1,"notes":"rushi sir marathi video , Dm lecture cutting","description":"Internal reel editing"},{"count":6,"notes":"5 videos done and 1 in process","description":"Amazon lecture editing"}]'::jsonb, '', '2026-05-14T13:24:26.919669+00:00', '2026-05-14T13:24:26.794+00:00', false, '10:05:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-14', '[{"count":1,"notes":"not assigned yet","description":"Internal Posting"},{"count":1,"notes":"not assigned yet","description":"Leads management"},{"count":1,"notes":"not assigned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"posting done( indiamarts)","description":"social media"},{"count":1,"notes":"collected products videso from internet (indiamarts)","description":"social media"},{"count":1,"notes":"created social media post of amicus","description":"creative design"}]'::jsonb, '', '2026-05-14T13:17:29.239353+00:00', '2026-05-14T13:21:59.617+00:00', false, '10:05:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-14', '[{"count":1,"notes":"-","description":"CA Suyash Sir"},{"count":1,"notes":"Changes In 4 Ads","description":"Advisor Alpha"},{"count":1,"notes":"Content Review","description":"Amicus Claims"},{"count":1,"notes":"-","description":"MBC"},{"count":1,"notes":"Meeting With Rutuj Regarding The Content Shoot","description":"Karrier"},{"count":1,"notes":"-","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"Tried To make ID Lanyard On CorelDraw & Canva"}]'::jsonb, '', '2026-05-14T14:51:05.064824+00:00', '2026-05-14T14:51:04.945+00:00', false, '10:27:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":1,"notes":"test","description":"re"}]'::jsonb, '', '2026-05-13T09:19:07.460143+00:00', '2026-05-13T09:19:07.353+00:00', false, NULL, NULL, 'test'
FROM profiles p
WHERE LOWER(p.email) = LOWER('test@gmail.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":1,"notes":"not assingned yet","description":"Internal Posting"},{"count":1,"notes":"not assingned yet","description":"Leads management"},{"count":1,"notes":"not assingned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"collected products videos from intrenet for posting","description":"social media"}]'::jsonb, '', '2026-05-13T13:23:47.941535+00:00', '2026-05-13T13:23:47.831+00:00', false, '10:10:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":4,"notes":"4 Scripts. 1 Openclae AI tool. 2 RPDM ad script. 1 Agnomatic ad script","description":"Content scripting"},{"count":12,"notes":"done","description":"Google posting replies"},{"count":12,"notes":"","description":"Agnomatic prospects"}]'::jsonb, '', '2026-05-13T13:26:34.98529+00:00', '2026-05-13T13:28:26.007+00:00', false, '10:20:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":2,"notes":"mbc, ca","description":"Client posting"},{"count":2,"notes":"lms sususpend","description":"Tech support"},{"count":1,"notes":"yt & IG audit for rp & growth strategy","description":"content strategy"},{"count":1,"notes":"service export research","description":"research"},{"count":1,"notes":"leads, replies, daily posting","description":"other"}]'::jsonb, '', '2026-05-13T13:29:36.297538+00:00', '2026-05-13T13:29:36.191+00:00', false, '10:00:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":37,"notes":"Made fresh calls","description":"Daily Calls"},{"count":30,"notes":"Made follow-up calls","description":"Daily Follow-up"},{"count":0,"notes":"DM enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-13T13:31:19.305436+00:00', '2026-05-13T13:31:18.766+00:00', false, '11:10:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-13', '[{"count":1,"notes":"Created design for RPDM","description":"Design"},{"count":1,"notes":"Did daily posting on RP World Trade","description":"Daily posting"},{"count":1,"notes":"Created festival post design","description":"Design"},{"count":1,"notes":"Created design for Yoga","description":"Design"},{"count":1,"notes":"Did daily posting on Agnomatic","description":"Daily posting"},{"count":1,"notes":"Created thumbnail for SM","description":"Design"}]'::jsonb, '', '2026-05-13T13:34:28.062306+00:00', '2026-05-13T13:34:27.946+00:00', false, '11:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":1,"notes":"1 Clone AI for DM","description":"Content scripting"},{"count":15,"notes":"Done","description":"Google posting replies"},{"count":12,"notes":"Agnomatic prospects data","description":"Agnomatic prospects"}]'::jsonb, '', '2026-05-15T10:35:52.389236+00:00', '2026-05-15T12:00:39.267+00:00', false, '10:20:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":15,"notes":"Made daily calls","description":"Daily Calls"},{"count":15,"notes":"Completed daily follow-ups","description":"Daily Follow-up"},{"count":0,"notes":"dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-15T13:22:17.403253+00:00', '2026-05-15T13:22:17.277+00:00', false, '09:50:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":5,"notes":"Agnomatic info , 4 amazon lecture done","description":"Internal reel editing"},{"count":1,"notes":"ID design changes , taking photos for id card","description":"other"}]'::jsonb, '', '2026-05-15T13:25:28.713568+00:00', '2026-05-15T13:25:28.114+00:00', false, '10:00:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":1,"notes":"Completed office ID card","description":"Design"},{"count":1,"notes":"Daily posting for RP world trade","description":"Daily posting"},{"count":1,"notes":"Sent message for webinar","description":"Webinar management"},{"count":1,"notes":"Sent reminder for webinar","description":"Reminder management"},{"count":1,"notes":"Daily posting for Agnomatic","description":"Daily posting"},{"count":1,"notes":"Posted video on Agnomatic","description":"Daily posting"},{"count":2,"notes":"Created thumbnails For Agnomatic","description":"Design"}]'::jsonb, '', '2026-05-15T13:29:00.441749+00:00', '2026-05-15T13:29:00.318+00:00', false, '11:12:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":1,"notes":"not assingned yet","description":"Internal Posting"},{"count":1,"notes":"not assingned yet","description":"Leads management"},{"count":1,"notes":"not assingned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"collected product videos from internet","description":"social media"},{"count":1,"notes":"collecteddetails about the software as per instructed and booked and scheduled the demo of it","description":"gokwik"}]'::jsonb, '', '2026-05-15T13:29:00.43485+00:00', '2026-05-15T13:29:00.315+00:00', false, '10:00:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":1,"notes":"Not assigned yet","description":"Internal Posting"},{"count":1,"notes":"Not assigned yet","description":"Leads management"},{"count":1,"notes":"Not assigned yet","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"Collected product video''s from  internet","description":"Social media"}]'::jsonb, '', '2026-05-16T13:28:57.028418+00:00', '2026-05-16T13:28:56.9+00:00', false, '10:15:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":15,"notes":"Made daily calls","description":"Daily Calls"},{"count":15,"notes":"made follow ups","description":"Daily Follow-up"},{"count":1,"notes":"dm enrollment","description":"DM Enrollment"},{"count":1,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-16T13:39:05.521477+00:00', '2026-05-16T13:39:05.381+00:00', false, '09:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":1,"notes":"","description":"test"}]'::jsonb, '', '2026-05-15T12:13:39.875397+00:00', '2026-05-15T12:13:40.55+00:00', false, '20:58:00', '16:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('test@gmail.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-15', '[{"count":1,"notes":"Follow Up regarding Next Shoot","description":"CA Suyash Sir"},{"count":1,"notes":"Edited 3 Reels & Done Follow Up of Payment","description":"Advisor Alpha"},{"count":1,"notes":"Made Content Creation Proposal And sent to Hemant sir","description":"Amicus Claims"},{"count":1,"notes":"1 Reel In Progress","description":"MBC"},{"count":1,"notes":"Todays Shoot Rescheduled On Sunday","description":"Karrier"},{"count":1,"notes":"","description":"Changes In Id cards Of RPIB"}]'::jsonb, '', '2026-05-15T13:41:19.01674+00:00', '2026-05-15T16:15:17.47+00:00', false, '10:50:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":1,"notes":"Changes in 2 Ads","description":"Advisor Alpha"},{"count":1,"notes":"2 Reels Done","description":"MBC"},{"count":1,"notes":"Meeting regarding the ads shoot.","description":"Karrier"},{"count":1,"notes":"Leads Calling - 4, Sent details to 2 leads","description":"Client Management"},{"count":1,"notes":"","description":"Mage One welcome message to send to the leads, and collected some smple reels to send them"}]'::jsonb, '', '2026-05-16T07:34:32.23558+00:00', '2026-05-16T14:50:39.657+00:00', false, '10:40:00', '22:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":3,"notes":"3 scripts","description":"Content scripting"},{"count":4,"notes":"done","description":"Shooting"},{"count":10,"notes":"done","description":"Google posting replies"},{"count":14,"notes":"data collected","description":"Agnomatic prospects"}]'::jsonb, '', '2026-05-16T10:31:47.588699+00:00', '2026-05-16T11:53:39.846+00:00', false, '10:15:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":4,"notes":"1 informative Agnomatic, 3 amazon lecture","description":"Internal reel editing"}]'::jsonb, 'facing issue of storage ', '2026-05-16T13:17:10.162003+00:00', '2026-05-16T13:17:10.032+00:00', false, '10:15:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":5,"notes":"Taken shoots for agnomatic, DM","description":"Shoot"},{"count":1,"notes":"Created design for agnomatic","description":"Design"},{"count":1,"notes":"Done posting for RP World trade","description":"Daily posting"},{"count":1,"notes":"Sent reminder in webinar group","description":"Reminder management"},{"count":1,"notes":"Created group for next webinar","description":"WhatsApp group creation"},{"count":1,"notes":"Completed ID card design","description":"Design"}]'::jsonb, '', '2026-05-16T13:24:38.431264+00:00', '2026-05-16T13:24:38.305+00:00', false, '12:00:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-22', '[{"count":4,"notes":"done","description":"Content scripting"},{"count":1,"notes":"done","description":"Google posting replies"}]'::jsonb, '', '2026-05-22T13:41:00.949812+00:00', '2026-05-22T13:41:00.832+00:00', false, '10:45:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-16', '[{"count":7,"notes":"lms issue, lms access, suspend","description":"Tech support"},{"count":3,"notes":"lms issue, welcome call, amazon call","description":"calls"},{"count":1,"notes":"done","description":"sales ppt"},{"count":1,"notes":"dm brochure changes done","description":"brochure"},{"count":1,"notes":"record","description":"webinar recording"},{"count":1,"notes":"for new batch dates","description":"meeting"}]'::jsonb, '', '2026-05-16T15:02:14.201067+00:00', '2026-05-16T15:04:27.928+00:00', false, '14:00:00', '22:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-17', '[{"count":6,"notes":"Amazon ads shoot at parel and office","description":"Shoot"}]'::jsonb, '', '2026-05-17T11:05:31.168889+00:00', '2026-05-17T11:05:31.08+00:00', false, '08:30:00', '16:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":5,"notes":"4 scripts done. Future updtaes of whatsapp(4), Nvidia small data centres","description":"Content scripting"},{"count":3,"notes":"done","description":"Shooting"},{"count":6,"notes":"done","description":"Google posting replies"}]'::jsonb, '', '2026-05-18T13:28:09.683749+00:00', '2026-05-18T13:28:09.564+00:00', false, '10:18:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":1,"notes":"Not assigned yet","description":"Internal Posting"},{"count":1,"notes":"Not assigned yet","description":"Leads management"},{"count":1,"notes":"Not assigned yet","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"DM ad shoot done","description":"Shooting"}]'::jsonb, '', '2026-05-18T13:28:45.811723+00:00', '2026-05-18T13:28:45.696+00:00', false, '22:12:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":3,"notes":"1DM ad done , i dm informative , changes in agnomtic reel","description":"Internal reel editing"},{"count":1,"notes":"Ad shoot (DM), Camera arrengement","description":"shoot"}]'::jsonb, '', '2026-05-18T13:30:28.088618+00:00', '2026-05-18T13:30:27.544+00:00', false, '10:10:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":3,"notes":"daily calls made today","description":"Daily Calls"},{"count":30,"notes":"Follow up calls made today","description":"Daily Follow-up"},{"count":1,"notes":"dm enrollment made today","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment made today","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-18T13:30:35.201299+00:00', '2026-05-18T13:30:35.079+00:00', false, '09:45:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":15,"notes":"","description":"Daily Calls"},{"count":23,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-18T14:23:41.598387+00:00', '2026-05-18T14:23:41.438+00:00', false, '12:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":1,"notes":"mbc","description":"Client posting"},{"count":1,"notes":"amicus","description":"Content scripting"},{"count":7,"notes":"lms access, lims issue, unsuspend","description":"Tech support"},{"count":6,"notes":"enrollment calls, amazon calls","description":"calls"},{"count":1,"notes":"sales ppt WIP","description":"ppt"},{"count":1,"notes":"amicus content cal changes","description":"content cal"},{"count":1,"notes":"dm posting, leads, replies","description":"regular work"},{"count":3,"notes":"webinar recordings upload","description":"yt uploads"}]'::jsonb, '', '2026-05-18T14:26:06.194176+00:00', '2026-05-18T14:26:47.316+00:00', false, '10:25:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-18', '[{"count":1,"notes":"Follow Up regarding payment, shoot scheduled  on 19 May 2026","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"MBC"},{"count":1,"notes":"Meeting with Rutuj regarding ads","description":"Karrier"},{"count":1,"notes":"Lead calling - 4","description":"Client Management"},{"count":1,"notes":"Exhaust fan fitting assitance","description":"Exhaust fan fitting assitance"}]'::jsonb, '', '2026-05-18T14:27:16.505643+00:00', '2026-05-18T14:27:16.395+00:00', false, '10:25:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-19', '[{"count":3,"notes":"3 scripting DM ad, GPU, GPT 5","description":"Content scripting"},{"count":2,"notes":"done","description":"Shooting"},{"count":20,"notes":"done","description":"Google posting replies"},{"count":15,"notes":"agnomatic prospects","description":"agnomatic prospects"}]'::jsonb, '', '2026-05-19T12:40:32.452688+00:00', '2026-05-19T13:09:52.315+00:00', false, '10:20:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-19', '[{"count":8,"notes":"made daily calls today","description":"Daily Calls"},{"count":24,"notes":"made followup calls today","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-19T13:16:08.239218+00:00', '2026-05-19T13:16:07.702+00:00', false, '09:50:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-19', '[{"count":1,"notes":"not assingned yet","description":"Internal Posting"},{"count":1,"notes":"not assingned yet","description":"Leads management"},{"count":1,"notes":"not assingned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"products reels posting done","description":"social media"}]'::jsonb, '', '2026-05-19T13:15:45.658664+00:00', '2026-05-19T13:16:24.017+00:00', false, '10:10:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-19', '[{"count":8,"notes":"amicus claims ai","description":"Content scripting"},{"count":11,"notes":"lms access to batch, batch access, lms issue","description":"Tech support"},{"count":1,"notes":"oorruu media ig created","description":"Social media account"},{"count":3,"notes":"ganpati, dm","description":"posting"},{"count":2,"notes":"exam related msg in rpdm61, shubham konde","description":"student msg"},{"count":1,"notes":"help and handover to rohan","description":"ppt"},{"count":1,"notes":"leads, replies","description":"regular"}]'::jsonb, '', '2026-05-19T14:01:50.641826+00:00', '2026-05-19T14:02:37.762+00:00', false, '10:18:00', '19:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-19', '[{"count":20,"notes":"","description":"Daily Calls"},{"count":24,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"},{"count":2,"notes":"","description":"Today''s visits"}]'::jsonb, '', '2026-05-19T14:56:44.904833+00:00', '2026-05-19T14:56:44.789+00:00', false, '10:25:00', '20:26:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-19', '[{"count":1,"notes":"Ganpati Bappa reel","description":"Internal reel editing"},{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb, '', '2026-05-19T14:59:28.07846+00:00', '2026-05-19T14:59:27.953+00:00', false, '10:10:00', '21:28:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":3,"notes":"Done","description":"Content scripting"},{"count":3,"notes":"Done","description":"Shooting"},{"count":1,"notes":"Done","description":"Google posting replies"}]'::jsonb, '', '2026-05-20T12:42:46.900102+00:00', '2026-05-20T12:42:46.336+00:00', false, '10:35:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":8,"notes":"i made daily calls","description":"Daily Calls"},{"count":25,"notes":"i made daily calls","description":"Daily Follow-up"},{"count":1,"notes":"DM Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-20T13:19:38.422143+00:00', '2026-05-20T13:19:38.295+00:00', false, '09:45:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":1,"notes":"NOT ASSIGNED YET","description":"Internal Posting"},{"count":1,"notes":"NOT ASSIGNED YET","description":"Leads management"},{"count":1,"notes":"NOT ASSIGNED YET","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"product reel posting done","description":"social media"}]'::jsonb, '', '2026-05-20T13:23:27.340963+00:00', '2026-05-20T13:23:27.219+00:00', false, '10:15:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":2,"notes":"Completed two shoots","description":"Shoot"},{"count":1,"notes":"Created design for Agnomatic","description":"Design"},{"count":1,"notes":"Sent reminder for webinar","description":"Reminder management"},{"count":1,"notes":"Design in progress for RPDM","description":"Design"}]'::jsonb, '', '2026-05-20T13:33:54.013357+00:00', '2026-05-20T13:33:53.89+00:00', false, '11:50:00', '17:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":3,"notes":"1 Dm Ad, 1 Amazon Ad,1 DM informative reel","description":"Internal reel editing"}]'::jsonb, '', '2026-05-20T14:01:45.344399+00:00', '2026-05-20T14:01:45.214+00:00', false, '10:15:00', '07:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":1,"notes":"Follow up regarding shoot","description":"CA Suyash Sir"},{"count":1,"notes":"Sent them 2 files for review, one thumbnail done.","description":"Advisor Alpha"},{"count":1,"notes":"1 Ad done","description":"Karrier"},{"count":1,"notes":"MAde changes In the ad commercial and made the invoice.","description":"Shubhash Shrivastav"},{"count":1,"notes":"Oorruu leads calling - 5","description":"Client Management"}]'::jsonb, '', '2026-05-20T14:17:43.003165+00:00', '2026-05-20T14:17:42.871+00:00', false, '10:25:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":1,"notes":"mbc","description":"Client posting"},{"count":6,"notes":"reels, yt amicus claims","description":"Content scripting"},{"count":10,"notes":"lms issue, lms access, amazon issue","description":"Tech support"},{"count":1,"notes":"Leads, replies, emails, dm posting","description":"Regular"},{"count":1,"notes":"oorruu email psword recover, ig yt pages created","description":"social media handles"}]'::jsonb, '', '2026-05-20T14:40:21.561358+00:00', '2026-05-20T14:40:21.006+00:00', false, '10:25:00', '20:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-20', '[{"count":1,"notes":"4","description":"Daily Calls"},{"count":1,"notes":"25","description":"Daily Follow-up"},{"count":1,"notes":"6","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-20T14:57:43.156301+00:00', '2026-05-20T14:57:42.59+00:00', false, '10:18:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":20,"notes":"made daily fresh calls","description":"Daily Calls"},{"count":35,"notes":"made follow up calls","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazion Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-21T13:24:37.081309+00:00', '2026-05-21T13:24:36.959+00:00', false, '09:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":1,"notes":"not assinged yet","description":"Internal Posting"},{"count":1,"notes":"not assinged yet","description":"Leads management"},{"count":1,"notes":"not assinged yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"product reel posting done","description":"social media"}]'::jsonb, '', '2026-05-21T13:27:56.199469+00:00', '2026-05-21T13:27:56.08+00:00', false, '10:12:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":4,"notes":"make changes in 4 ads and reels","description":"Internal reel editing"},{"count":1,"notes":"1 SM yt done","description":"Internal YouTube editing"}]'::jsonb, '', '2026-05-21T13:34:03.61193+00:00', '2026-05-21T13:34:03.032+00:00', false, '10:14:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":1,"notes":"Follow Up - not responded","description":"CA Suyash Sir"},{"count":1,"notes":"Made 1 Reel, and 1 Ad, Discussed the payment confusion with raunaq.","description":"Advisor Alpha"},{"count":1,"notes":"1 ad in progress","description":"Karrier"},{"count":1,"notes":"Sent invoice of sesa hair oil reel","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"Amazon Hindi Course in progress"}]'::jsonb, '', '2026-05-21T13:38:22.201505+00:00', '2026-05-21T13:38:22.077+00:00', false, '10:10:00', '19:25:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":1,"notes":"Mbc post schedule","description":"Client posting"},{"count":3,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Sm","description":"Yt posting"},{"count":1,"notes":"Lead, reply","description":"Regular"},{"count":1,"notes":"Rp website changes wip","description":"Website"}]'::jsonb, '', '2026-05-21T14:12:49.889968+00:00', '2026-05-21T14:12:49.734+00:00', false, '10:10:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":1,"notes":"25","description":"Daily Calls"},{"count":1,"notes":"23","description":"Daily Follow-up"},{"count":1,"notes":"06","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-21T15:02:26.883793+00:00', '2026-05-21T15:02:26.756+00:00', false, '10:18:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-21', '[{"count":3,"notes":"Done","description":"Content scripting"}]'::jsonb, '', '2026-05-21T14:10:39.918955+00:00', '2026-05-21T14:10:39.793+00:00', false, '10:50:00', NULL, 'How many scripts created?
Also add shooting in the reporting.'
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-22', '[{"count":8,"notes":"i made fresh calls today","description":"Daily Calls"},{"count":20,"notes":"i made follow up calls today","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-22T13:21:24.604513+00:00', '2026-05-22T13:21:24.476+00:00', false, '09:55:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-22', '[{"count":1,"notes":"Made 2 ads and 1 Thumbnail","description":"Advisor Alpha"},{"count":1,"notes":"Follow up regarding scripts","description":"Amicus Claims"},{"count":1,"notes":"1 ad in progess","description":"Karrier"},{"count":1,"notes":"Meeting with Bharat Vishe","description":"Client Management"},{"count":1,"notes":"","description":"Follow Up with Hardika regarding payment"}]'::jsonb, '', '2026-05-22T14:09:50.005739+00:00', '2026-05-22T14:09:49.879+00:00', false, '10:06:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-22', '[{"count":3,"notes":"Lms issues, lms suspension","description":"Tech support"},{"count":1,"notes":"Bharat vishe","description":"Content analyze"},{"count":1,"notes":"Client meeting Bharat vishe","description":"Meeting"},{"count":1,"notes":"Changes wip","description":"Website"}]'::jsonb, '', '2026-05-22T17:39:21.399679+00:00', '2026-05-22T17:39:20.772+00:00', false, '10:06:00', '20:28:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-23', '[{"count":2,"notes":"2 agnomatic video done","description":"Internal reel editing"},{"count":1,"notes":"Sm long in progress","description":"Internal YouTube editing"}]'::jsonb, '', '2026-05-23T10:51:36.120348+00:00', '2026-05-23T10:51:35.999+00:00', false, '10:10:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":1,"notes":"Products reel posted","description":"Social media"},{"count":1,"notes":"1campaing created and published","description":"Facebook ads"},{"count":1,"notes":"Course video watched and worked on it","description":"AI tool"}]'::jsonb, '', '2026-05-26T15:29:48.315244+00:00', '2026-05-26T15:29:47.738+00:00', false, '22:23:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-23', '[{"count":3,"notes":"Done","description":"Content scripting"},{"count":1,"notes":"Done","description":"Google posting replies"},{"count":10,"notes":"","description":"Agnomatic prospects"}]'::jsonb, '', '2026-05-23T12:15:02.096706+00:00', '2026-05-23T12:50:17.078+00:00', false, '10:30:00', '18:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-23', '[{"count":1,"notes":"1Reel Done","description":"Advisor Alpha"},{"count":1,"notes":"3 Ads Done","description":"Karrier"}]'::jsonb, '', '2026-05-23T14:25:23.617122+00:00', '2026-05-23T14:25:23.051+00:00', false, '10:20:00', '20:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-23', '[{"count":4,"notes":"Lms issue, lms access, amazon issue","description":"Tech support"},{"count":2,"notes":"Issue calls","description":"Amazon calls"},{"count":1,"notes":"Changes","description":"Website"},{"count":1,"notes":"Swapnil sir","description":"Client follow up"},{"count":1,"notes":"Leads, replies,","description":"Regular work"}]'::jsonb, '', '2026-05-23T18:22:26.688008+00:00', '2026-05-23T18:22:26.11+00:00', false, '10:20:00', '20:12:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-25', '[{"count":1,"notes":"Follow up done - wednesday shoot","description":"CA Suyash Sir"},{"count":1,"notes":"2 reels done, made a drive to keep all the reels and shared them","description":"Advisor Alpha"},{"count":1,"notes":"","description":"watched some editing tutorials"}]'::jsonb, '', '2026-05-25T13:11:22.437495+00:00', '2026-05-25T13:11:22.303+00:00', false, '10:33:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-25', '[{"count":23,"notes":"i made today","description":"Daily Calls"},{"count":20,"notes":"follow up calls","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-25T13:14:36.631744+00:00', '2026-05-25T13:14:36.505+00:00', false, '09:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-25', '[{"count":3,"notes":"done","description":"Content scripting"},{"count":5,"notes":"","description":"agnomatic prospects"}]'::jsonb, '', '2026-05-25T13:27:08.720759+00:00', '2026-05-25T13:27:08.195+00:00', false, '10:25:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-25', '[{"count":1,"notes":"Not assigned yet","description":"Internal Posting"},{"count":1,"notes":"Not assigned yet","description":"Leads management"},{"count":1,"notes":"Not assigned yet","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"Lms assignments checked and alloted marks","description":"Lms"}]'::jsonb, '', '2026-05-25T17:42:46.506181+00:00', '2026-05-25T17:42:45.913+00:00', false, '22:20:00', '18:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":1,"notes":"Follow Up Regarding Shoot","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"},{"count":3,"notes":"3 Reels Done","description":"MBC"},{"count":1,"notes":"Follow Up with Rutuj Regarding Shoot","description":"Karrier"},{"count":1,"notes":"Follow With Saliesh Shukla, Meeting at 08:30 Pm","description":"Client Management"}]'::jsonb, '', '2026-05-26T11:43:58.669708+00:00', '2026-05-26T12:01:52.743+00:00', false, '10:27:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":6,"notes":"done. AI tools.  Doctors using AI. What is an AI agent. Burner email ID. 2 DM","description":"Content scripting"}]'::jsonb, '', '2026-05-26T13:31:04.650038+00:00', '2026-05-26T13:31:04.095+00:00', false, '10:15:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":10,"notes":"","description":"Daily Calls"},{"count":23,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-26T13:43:13.882516+00:00', '2026-05-26T13:43:13.761+00:00', false, NULL, NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":1,"notes":"Completed one shoot","description":"Shoot"},{"count":1,"notes":"Designed carousel for agnomatic","description":"Design"},{"count":1,"notes":"Posted for RP World Trade","description":"Daily posting"},{"count":1,"notes":"Sent webinar reminder","description":"Reminder management"},{"count":1,"notes":"Posted for agnomatic","description":"Daily posting"}]'::jsonb, '', '2026-05-26T13:49:26.868008+00:00', '2026-05-26T13:49:26.735+00:00', false, '11:50:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":4,"notes":"lms issue, lecures added,","description":"Tech support"},{"count":1,"notes":"sales ppt done","description":"ppt"},{"count":1,"notes":"brochr changes done","description":"canva"},{"count":1,"notes":"changes","description":"website"},{"count":1,"notes":"content team meeting done","description":"meeting"},{"count":1,"notes":"leads, replies, email","description":"regular"}]'::jsonb, '', '2026-05-26T16:46:04.682169+00:00', '2026-05-26T16:46:04.553+00:00', false, '10:27:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-26', '[{"count":1,"notes":"1 info agnomatic","description":"Internal reel editing"},{"count":5,"notes":"Amazon course 4 done 1 half done","description":"Internal YouTube editing"}]'::jsonb, '', '2026-05-26T16:47:17.589882+00:00', '2026-05-26T16:47:17.47+00:00', false, '10:20:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":8,"notes":"i made today calls","description":"Daily Calls"},{"count":15,"notes":"I made follow up calls","description":"Daily Follow-up"},{"count":2,"notes":"DM Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-27T13:21:39.262307+00:00', '2026-05-27T13:21:39.134+00:00', false, '12:15:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":5,"notes":"done.  Real vs AI generated images. Digital Marketing is changing now.Effective use of ChatGpt. Daily posting vs alternate posting","description":"Content scripting"},{"count":5,"notes":"done","description":"Shooting"}]'::jsonb, '', '2026-05-27T13:25:09.565007+00:00', '2026-05-27T13:25:09.431+00:00', false, '10:20:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":1,"notes":"Shoot of 12 Reels and 2 ads Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel Done And Changes In 1 Reels","description":"Advisor Alpha"},{"count":1,"notes":"Made Invoice For April and May month","description":"MBC"}]'::jsonb, '', '2026-05-27T13:37:32.464994+00:00', '2026-05-27T13:37:31.888+00:00', false, '10:18:00', '19:18:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":1,"notes":"1 amazon ad done","description":"Internal reel editing"},{"count":14,"notes":"ca sir shoot , office internal shoot DM","description":"SHOOT"}]'::jsonb, '', '2026-05-27T13:42:28.290111+00:00', '2026-05-27T13:42:28.166+00:00', false, '10:20:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":12,"notes":"Completed shoots for CA","description":"Shoot"},{"count":1,"notes":"Banner design in progress","description":"Design"},{"count":1,"notes":"Completed daily posting on Agnomatic","description":"Daily posting"},{"count":5,"notes":"Completed shoots for RPDM","description":"Shoot"},{"count":1,"notes":"Completed daily posting for RP World Trade","description":"Daily posting"}]'::jsonb, '', '2026-05-27T13:54:02.552605+00:00', '2026-05-27T13:54:02.43+00:00', false, '11:15:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":1,"notes":"Mbc","description":"Client posting"},{"count":4,"notes":"Lms issue, lecture add, lms access","description":"Tech support"},{"count":2,"notes":"Rp content calendar done, bharat vishe content strategy in progress","description":"Content strategy"},{"count":2,"notes":"Leads replies, emails","description":"Regular"}]'::jsonb, '', '2026-05-27T15:07:16.209031+00:00', '2026-05-27T15:07:16.086+00:00', false, '10:18:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-27', '[{"count":1,"notes":"Categories finaled & tools of each category listed out","description":"AI course"}]'::jsonb, '', '2026-05-27T15:08:54.302751+00:00', '2026-05-27T15:08:54.168+00:00', false, '22:27:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":1,"notes":"Sent Invoices of all the pending payments","description":"CA Suyash Sir"},{"count":1,"notes":"Sent 2 Ads In reel, Square and YT Format","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done, Reviewed Scripts","description":"Amicus Claims"},{"count":1,"notes":"Ad Shoot Scheduled On Saturday","description":"Karrier"},{"count":1,"notes":"","description":"Reviewed Bharat Sir''s Plan"}]'::jsonb, '', '2026-05-28T13:25:09.965654+00:00', '2026-05-28T13:27:43.185+00:00', false, '10:31:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":4,"notes":"done. Meta paid update. Digital Rupee. AI & life decision. Google alerts update.","description":"Content scripting"}]'::jsonb, '', '2026-05-28T13:30:32.999281+00:00', '2026-05-28T13:30:32.874+00:00', false, '11:45:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":25,"notes":"made fresh calls","description":"Daily Calls"},{"count":20,"notes":"made follow up calls","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-28T13:33:04.978688+00:00', '2026-05-28T13:33:04.855+00:00', false, '09:53:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":1,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Bharat vishe content strategy done","description":"Content Strategy"},{"count":1,"notes":"Dm posting, leads, replies, emails","description":"Regular"},{"count":1,"notes":"Shreya leads replies & dm posting","description":"Team training"},{"count":1,"notes":"Rp website changes","description":"Website"},{"count":4,"notes":"Calls for razor pay verification instructions","description":"Calls"}]'::jsonb, '', '2026-05-28T13:56:43.682298+00:00', '2026-05-28T13:56:43.55+00:00', false, '10:31:00', '19:07:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":3,"notes":"2 ganpati reel , 1 DM reel","description":"Internal reel editing"},{"count":1,"notes":"1 Amazon lecture","description":"Internal YouTube editing"},{"count":1,"notes":"DM youtube banner","description":"other"}]'::jsonb, '', '2026-05-28T13:59:45.203347+00:00', '2026-05-28T13:59:45.081+00:00', false, '10:13:00', '07:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progress","description":"AI course"},{"count":1,"notes":"collected product videos for socila media from internet( cipher X Media)","description":"social media"},{"count":1,"notes":"assignment checked","description":"LMS"}]'::jsonb, '', '2026-05-28T14:00:32.832445+00:00', '2026-05-28T14:01:56.515+00:00', false, '10:13:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-28', '[{"count":2,"notes":"Designed thumbnails for agnomatic","description":"Design"},{"count":1,"notes":"Posted on RP world trade","description":"Daily posting"},{"count":1,"notes":"Sent webinar reminder","description":"Reminder management"},{"count":1,"notes":"Designed thumbnails for RPDM","description":"Design"},{"count":1,"notes":"Completed banner design","description":"Design"},{"count":1,"notes":"Posted on Agnomatic","description":"Daily posting"}]'::jsonb, '', '2026-05-28T14:31:46.290483+00:00', '2026-05-28T14:31:45.714+00:00', false, '12:15:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-29', '[{"count":1,"notes":"1 Reel Done","description":"Amicus Claims"},{"count":1,"notes":"Oorruu Leads Calling","description":"Client Management"},{"count":1,"notes":"","description":"Amazon hindi course 1 Ep in progress"}]'::jsonb, '', '2026-05-29T09:59:28.368093+00:00', '2026-05-29T09:59:27.817+00:00', false, '10:21:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-29', '[{"count":5,"notes":"made fresh calls","description":"Daily Calls"},{"count":18,"notes":"follow up calls","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-29T13:21:16.072636+00:00', '2026-05-29T13:21:15.934+00:00', false, '09:55:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-29', '[{"count":7,"notes":"done. Youtube AI video tag. Ads on OTT. Jiohotstar Ads. No Leads. Zomato case study. Followers increase but no conversion.  3 AI tools for business","description":"Content scripting"}]'::jsonb, '', '2026-05-29T10:45:31.278067+00:00', '2026-05-29T13:21:43.788+00:00', false, '10:20:00', '19:06:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-29', '[{"count":2,"notes":"2 DM informative","description":"Internal reel editing"},{"count":3,"notes":"3 Amazon lecture","description":"Internal YouTube editing"}]'::jsonb, '', '2026-05-29T14:26:06.493444+00:00', '2026-05-29T14:26:06.371+00:00', false, '10:25:00', '08:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-29', '[{"count":5,"notes":"","description":"Daily Calls"},{"count":15,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-29T14:28:17.776741+00:00', '2026-05-29T14:28:17.208+00:00', false, NULL, NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-29', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"tools tested ( work in progress)","description":"AI course"}]'::jsonb, '', '2026-05-29T14:51:56.103152+00:00', '2026-05-29T14:51:55.98+00:00', false, '10:25:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-30', '[{"count":1,"notes":"POst Boosting folloe up","description":"CA Suyash Sir"},{"count":1,"notes":"Folloe Up regarding scripts","description":"Amicus Claims"},{"count":1,"notes":"Shoot- 8 ads at Dombivli","description":"Karrier"}]'::jsonb, '', '2026-05-30T12:33:38.977778+00:00', '2026-05-30T12:33:38.834+00:00', false, '10:45:00', '18:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-30', '[{"count":3,"notes":"Fresh calls done","description":"Daily Calls"},{"count":15,"notes":"Follow Up calls done","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-05-30T13:00:52.954644+00:00', '2026-05-30T13:01:07+00:00', false, '09:53:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-30', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"tools tested","description":"AI"}]'::jsonb, '', '2026-05-30T13:25:05.269542+00:00', '2026-05-30T13:25:05.153+00:00', false, '10:18:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-30', '[{"count":3,"notes":"Designed thumbnails for SM","description":"Design"},{"count":1,"notes":"Sent reminder for webinar groups","description":"Reminder management"},{"count":1,"notes":"Created WhatsApp group","description":"WhatsApp group creation"},{"count":1,"notes":"Created Zoom link for webinar","description":"Webinar coordination"}]'::jsonb, '', '2026-05-30T14:31:31.105658+00:00', '2026-05-30T14:32:52.335+00:00', false, '12:25:00', '20:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-30', '[{"count":1,"notes":"Client shoot at dombivli","description":"Shoot"},{"count":1,"notes":"Curtain fitting","description":"Internal work"}]'::jsonb, '', '2026-05-30T14:39:47.867654+00:00', '2026-05-30T14:39:47.352+00:00', false, '10:20:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-05-30', '[{"count":1,"notes":"Lms issue","description":"Tech support"},{"count":2,"notes":"Lead replies, emails, yt upload","description":"Regular"},{"count":1,"notes":"Updated, content discussion","description":"Content calendar"}]'::jsonb, '', '2026-05-30T16:57:34.457258+00:00', '2026-05-30T16:57:34.329+00:00', false, '10:45:00', '18:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-01', '[{"count":1,"notes":"fresh calls made","description":"Daily Calls"},{"count":15,"notes":"Follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-01T13:23:00.558448+00:00', '2026-06-01T13:23:00.426+00:00', false, '09:55:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-01', '[{"count":1,"notes":"1 dm reel done","description":"Internal reel editing"},{"count":2,"notes":"2 amzon lecture done","description":"Internal YouTube editing"}]'::jsonb, '', '2026-06-01T14:54:51.150223+00:00', '2026-06-01T14:54:51.027+00:00', false, '10:11:00', '18:44:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-01', '[{"count":1,"notes":"0","description":"Daily Calls"},{"count":1,"notes":"23","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-01T15:10:20.317397+00:00', '2026-06-01T15:10:20.195+00:00', false, '10:17:00', '19:06:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-01', '[{"count":1,"notes":"Completed design for agnomatic","description":"Design"},{"count":1,"notes":"Completed daily posting for Rp World Trade","description":"Daily posting"},{"count":1,"notes":"Designed one thumbnail","description":"Design"},{"count":1,"notes":"Daily posting done on agnomatic","description":"Daily posting"}]'::jsonb, '', '2026-06-01T15:10:56.967589+00:00', '2026-06-01T15:10:56.856+00:00', false, '11:50:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-01', '[{"count":16,"notes":"Lms access, lms issues, Amazon access, msg","description":"Tech support"},{"count":15,"notes":"Amazon calls, lms issue","description":"Calls"},{"count":1,"notes":"Cv shared","description":"Cv shared"},{"count":1,"notes":"Discussion with shreya","description":"Content"},{"count":1,"notes":"Lead reply, ad fund monitor","description":"Regular"}]'::jsonb, '', '2026-06-01T07:55:36.421674+00:00', '2026-06-01T15:33:52.802+00:00', false, '10:22:00', '16:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-01', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI course"}]'::jsonb, '', '2026-06-01T17:21:45.437511+00:00', '2026-06-01T17:21:45.31+00:00', false, '10:11:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-02', '[{"count":1,"notes":"Follow up Regarding Post Boosting","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up For Shoot","description":"Advisor Alpha"},{"count":2,"notes":"","description":"2 Episodes Of amazon Hindi Course"},{"count":1,"notes":"","description":"Office Cabin Arrangements"},{"count":1,"notes":"","description":"Edited 1 Ad Of Amazon"}]'::jsonb, '', '2026-06-02T14:07:40.03335+00:00', '2026-06-02T14:27:58.469+00:00', false, '10:51:00', '20:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-02', '[{"count":1,"notes":"5","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-02T14:47:40.928723+00:00', '2026-06-02T14:47:40.801+00:00', false, '10:30:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-02', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI"},{"count":1,"notes":"Assignment check","description":"LMS"}]'::jsonb, '', '2026-06-02T14:48:42.723791+00:00', '2026-06-02T14:48:42.61+00:00', false, '10:20:00', '20:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-02', '[{"count":4,"notes":"Shoot has done for Amazon and RPDM","description":"Shoot"},{"count":1,"notes":"Agnomatic design completed","description":"Design"},{"count":2,"notes":"Posting has done","description":"Daily posting"},{"count":1,"notes":"Sent one reminder","description":"Reminder management"}]'::jsonb, '', '2026-06-02T15:31:08.85273+00:00', '2026-06-02T15:31:08.207+00:00', false, '11:50:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-02', '[{"count":1,"notes":"1 dm","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issue, exam reminders","description":"Tech support"},{"count":1,"notes":"Dm content shoot, content research","description":"Content"},{"count":1,"notes":"Students list","description":"New batch"},{"count":1,"notes":"Leads replies,","description":"Regular"}]'::jsonb, '', '2026-06-02T17:38:04.011234+00:00', '2026-06-02T17:38:03.879+00:00', false, '10:51:00', '20:06:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-02', '[{"count":3,"notes":"1 amazon ad done, 1 cultural reel done, changes in old Amazon ads","description":"Internal reel editing"},{"count":3,"notes":"2 amazon lecture done , SM long video in progress","description":"Internal YouTube editing"}]'::jsonb, '', '2026-06-02T18:13:23.863622+00:00', '2026-06-02T18:13:23.729+00:00', false, '10:20:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-03', '[{"count":1,"notes":"Shoot scheduled on 5th June","description":"Advisor Alpha"},{"count":1,"notes":"Ads in progress","description":"Karrier"},{"count":1,"notes":"","description":"Cabin arrangement & Curtain Fitting"},{"count":1,"notes":"","description":"Video Editing and Lighting Tutorials"}]'::jsonb, '', '2026-06-03T14:17:54.907903+00:00', '2026-06-03T14:17:54.772+00:00', false, '10:17:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-03', '[{"count":7,"notes":"ganpati reel 1, dm reel 1, changes in amazon ad 5","description":"Internal reel editing"}]'::jsonb, '', '2026-06-03T14:17:11.4553+00:00', '2026-06-03T14:21:07.901+00:00', true, '10:15:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-03', '[{"count":1,"notes":"1 dm","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issue, amazon issues","description":"Tech support"},{"count":1,"notes":"Calls, mail, certificate with rohan","description":"Razor pay verification"},{"count":1,"notes":"Leads replies, dm posting, dm shoot","description":"Regular"},{"count":1,"notes":"New batch created, lms & whatsapp, confirmation calls done","description":"Batch new"},{"count":1,"notes":"Question paper count","description":"Exam"},{"count":1,"notes":"With Rishi sir for content n all","description":"Meeting"}]'::jsonb, '', '2026-06-03T14:21:37.051481+00:00', '2026-06-03T14:21:36.921+00:00', false, '10:17:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-03', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Assignment Checked","description":"LMS"},{"count":1,"notes":"Work in progress","description":"AI Course"}]'::jsonb, '', '2026-06-03T14:34:09.011834+00:00', '2026-06-03T14:34:08.844+00:00', false, '10:15:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-03', '[{"count":2,"notes":"Completed two shoots","description":"Shoot"},{"count":2,"notes":"Designed thumbnail, carousel for RPDM","description":"Design"},{"count":1,"notes":"Daily posting done for Agnomatic","description":"Daily posting"},{"count":1,"notes":"Designed static post for Agnomatic","description":"Design"},{"count":1,"notes":"''Office cleaning has done''","description":"Misc Task"}]'::jsonb, '', '2026-06-03T15:03:10.156881+00:00', '2026-06-03T15:03:10.03+00:00', false, '12:10:00', '20:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":7,"notes":"fresh calls made today","description":"Daily Calls"},{"count":20,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-04T13:20:59.569255+00:00', '2026-06-04T13:20:58.936+00:00', false, '09:48:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":4,"notes":"Done. Animal voice decoding with AI. Wifi radio waves act as Cam.  RGA - RoleGoal Audience.","description":"Content scripting"},{"count":3,"notes":"Done","description":"Shooting"}]'::jsonb, '', '2026-06-04T13:39:30.290537+00:00', '2026-06-04T13:39:30.161+00:00', false, '10:30:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":4,"notes":"Completed shoots for RPDM","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Completed daily posting for Agnomatic","description":"Daily posting"},{"count":1,"notes":"Sent webinar reminder","description":"Reminder management"},{"count":2,"notes":"Completed shoots for Agnomatic","description":"Shoot"},{"count":1,"notes":"Designed carousel post for RPDM","description":"Design"},{"count":1,"notes":"carousel post in progress","description":"Design"}]'::jsonb, '', '2026-06-04T14:07:02.511794+00:00', '2026-06-04T14:07:02.388+00:00', false, '11:40:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":1,"notes":"Given 2 Ads with changes","description":"Advisor Alpha"},{"count":1,"notes":"4 Ads Done","description":"Karrier"},{"count":1,"notes":"","description":"Cabin Cupboard Trashing"},{"count":2,"notes":"","description":"Cultural shoot"}]'::jsonb, '', '2026-06-04T14:08:03.80847+00:00', '2026-06-04T14:08:26.679+00:00', false, '10:29:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"32","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"},{"count":1,"notes":"6","description":"Today''s visit + online                    6"}]'::jsonb, '', '2026-06-04T16:16:08.524065+00:00', '2026-06-04T16:16:08.383+00:00', false, '10:15:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI COURSE"}]'::jsonb, '', '2026-06-04T16:27:17.776403+00:00', '2026-06-04T16:27:17.651+00:00', false, '10:15:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":4,"notes":"2 amazon ad changed , 1 cultural reel done and 1 in progress, 1 dm informative done","description":"Internal reel editing"},{"count":1,"notes":"1 sm yt in progress","description":"Internal YouTube editing"},{"count":1,"notes":"2 cultural reel, 4 informative","description":"Shoot"}]'::jsonb, '', '2026-06-04T18:16:14.871469+00:00', '2026-06-04T18:16:14.738+00:00', false, '10:15:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-04', '[{"count":2,"notes":"2 dm","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issues","description":"Tech support"},{"count":1,"notes":"Lead reply","description":"Regular"},{"count":1,"notes":"1 glass door","description":"Poster"},{"count":2,"notes":"Content calendar changes, content shoot","description":"Content"}]'::jsonb, '', '2026-06-04T18:19:00.455789+00:00', '2026-06-04T18:19:00.303+00:00', false, '10:29:00', '20:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-05', '[{"count":7,"notes":"Daily calls","description":"Daily Calls"},{"count":15,"notes":"Follow Up Calls","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-05T13:30:20.716945+00:00', '2026-06-05T13:30:20.114+00:00', false, '09:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-05', '[{"count":7,"notes":"Shoot At  Andheri","description":"Advisor Alpha"}]'::jsonb, '', '2026-06-05T14:57:12.685278+00:00', '2026-06-05T14:57:12.035+00:00', false, '10:15:00', '20:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-05', '[{"count":1,"notes":"7","description":"Daily Calls"},{"count":1,"notes":"32","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"},{"count":1,"notes":"Said: ''Good''","description":"Misc Task"}]'::jsonb, '', '2026-06-05T15:36:57.262739+00:00', '2026-06-05T15:36:56.663+00:00', false, '11:49:00', '19:16:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-05', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI course"}]'::jsonb, '', '2026-06-05T16:00:29.764688+00:00', '2026-06-05T16:00:29.631+00:00', false, '22:20:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-05', '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issue, lms access","description":"Tech support"},{"count":1,"notes":"Course Framework","description":"Ai course"},{"count":4,"notes":"","description":"Poster designs"}]'::jsonb, '', '2026-06-05T16:03:10.42034+00:00', '2026-06-05T16:03:10.291+00:00', false, '10:15:00', '20:38:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-05', '[{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb, '', '2026-06-05T16:47:03.948129+00:00', '2026-06-05T16:47:03.817+00:00', false, '10:16:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-06', '[{"count":5,"notes":"Done. When AI buidls itself. Don’t use word Shouldn’t and Won’t . Promptoptimizer.tools. Views vs Followers vs Sales. Google marketing update","description":"Content scripting"},{"count":2,"notes":"Done","description":"Shooting"}]'::jsonb, '', '2026-06-06T13:13:58.676927+00:00', '2026-06-06T13:13:58.551+00:00', false, '10:20:00', '21:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-06', '[{"count":4,"notes":"completed shoot for AI course","description":"Shoot"},{"count":1,"notes":"completed carousel post","description":"Design"},{"count":1,"notes":"created link for tomorrow''s Webinar","description":"Webinar management"},{"count":1,"notes":"1 reminder has sent on all may groups and june groups","description":"Reminder management"},{"count":1,"notes":"group has created","description":"WhatsApp group creation"},{"count":1,"notes":"webinar coordination gas done","description":"Webinar coordination"},{"count":1,"notes":"created thumbnail for RPDM","description":"Design"},{"count":1,"notes":"completed Certificates for RPDM Course","description":"Design"}]'::jsonb, '', '2026-06-06T13:16:48.552481+00:00', '2026-06-06T13:16:48.036+00:00', false, '12:45:00', '21:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-06', '[{"count":10,"notes":"Daily calls","description":"Daily Calls"},{"count":40,"notes":"Follow up calls","description":"Daily Follow-up"},{"count":0,"notes":"Dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-06T13:59:38.178017+00:00', '2026-06-06T13:59:38.047+00:00', false, '09:45:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":1,"notes":"1 reel done","description":"Advisor Alpha"},{"count":1,"notes":"1 reel in progress","description":"Shubhash Shrivastav"}]'::jsonb, '', '2026-06-20T15:18:39.765621+00:00', '2026-06-20T15:18:39.654+00:00', false, '10:15:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-06', '[{"count":1,"notes":"Done","description":"Content scripting"},{"count":16,"notes":"Done. 1 post about Instructor teaching and solving doubts.","description":"Google posting replies"}]'::jsonb, '', '2026-07-06T13:35:51.643025+00:00', '2026-07-06T13:35:51.514+00:00', false, '10:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-06', '[{"count":1,"notes":"1 Reel Done, Sorted All the data, Sent Inoive Of May Month, Sheet Updated","description":"Advisor Alpha"},{"count":1,"notes":"Sent Invoice Of April- May Month","description":"MBC"},{"count":1,"notes":"Ads in progress","description":"Karrier"},{"count":1,"notes":"Follow Up with Hardika regarding the Payemnt","description":"Client Management"},{"count":1,"notes":"2 Reels","description":"DM Shoot"},{"count":1,"notes":"","description":"Helped Pooja in the Banner Design"}]'::jsonb, '', '2026-06-06T14:04:35.913061+00:00', '2026-06-06T14:23:46.651+00:00', false, '10:50:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-06', '[{"count":1,"notes":"Dm - not completed","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":6,"notes":"Lms issue, lms access, suspension","description":"Tech support"},{"count":4,"notes":"3 done , 1 in progress","description":"Poster"},{"count":2,"notes":"Dm Exam, testimonials questioners","description":"Exam"},{"count":3,"notes":"Checking, framing","description":"Certificate"}]'::jsonb, '', '2026-06-06T17:46:33.52982+00:00', '2026-06-06T17:46:33.001+00:00', false, '10:45:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-08', '[{"count":5,"notes":"Done. Meta’s new Device - Chest pendant. AI in Sports. Send email from Chatgpt. Ollie AI family manager. Time vs Task.","description":"Content scripting"}]'::jsonb, '', '2026-06-08T13:43:14.209246+00:00', '2026-06-08T13:43:14.071+00:00', false, '10:50:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-08', '[{"count":16,"notes":"fresh daily calls done","description":"Daily Calls"},{"count":40,"notes":"follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"DM Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-08T13:54:49.76667+00:00', '2026-06-08T13:54:49.632+00:00', false, '09:46:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-08', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progress","description":"AI course"}]'::jsonb, '', '2026-06-08T13:58:11.355662+00:00', '2026-06-08T13:58:11.217+00:00', false, '10:25:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-08', '[{"count":2,"notes":"2 informative reel done","description":"Internal reel editing"},{"count":5,"notes":"Client shoot , cultural shoot","description":"shoot"}]'::jsonb, '', '2026-06-08T14:02:11.447199+00:00', '2026-06-08T14:02:22.789+00:00', false, '10:18:00', '07:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-08', '[{"count":1,"notes":"1 ad Done.","description":"Advisor Alpha"},{"count":1,"notes":"Payment Follow Up Done","description":"MBC"},{"count":1,"notes":"4 Ads Done","description":"Karrier"},{"count":1,"notes":"Follow Up done","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"Cultural Shoot"}]'::jsonb, '', '2026-06-08T14:27:33.307527+00:00', '2026-06-08T14:27:32.711+00:00', false, '10:38:00', '20:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-08', '[{"count":5,"notes":"completed shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Carousel design is in progress","description":"Design"},{"count":2,"notes":"banners Design in progress","description":"Design"}]'::jsonb, '', '2026-06-08T14:35:53.569933+00:00', '2026-06-08T14:35:52.991+00:00', false, '12:15:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":4,"notes":"AI + ML + DL + DS. Your own reflection. Customer Hesitation Retention. Meta’s new Series feature.","description":"Content scripting"},{"count":4,"notes":"Delta ad campaign","description":"Delta ad campaign"},{"count":10,"notes":"Thinking of a new reel Series based on Questions Soch ka Test","description":"Reel Series"}]'::jsonb, '', '2026-06-09T12:39:27.176686+00:00', '2026-06-09T12:39:26.586+00:00', false, '10:50:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":7,"notes":"daily fresh calls done","description":"Daily Calls"},{"count":25,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-09T13:26:33.740198+00:00', '2026-06-09T13:26:33.61+00:00', false, '10:00:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":2,"notes":"Payment Follow up, 1 Reel Done.","description":"CA Suyash Sir"},{"count":2,"notes":"1 Ad Done, Changes in Pankaj Sir Ad","description":"Advisor Alpha"},{"count":1,"notes":"Payment Follow up","description":"MBC"},{"count":1,"notes":"Remaining 2 Ads Done, also Provided Raw file to Rutuj","description":"Karrier"},{"count":1,"notes":"Report Meeting","description":"Report Meeting"}]'::jsonb, '', '2026-06-09T13:39:48.216461+00:00', '2026-06-09T13:39:48.055+00:00', false, '11:02:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progress","description":"AI Course"},{"count":1,"notes":"done","description":"script"}]'::jsonb, '', '2026-06-09T13:40:05.422853+00:00', '2026-06-09T13:40:04.853+00:00', false, '10:15:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":4,"notes":"2 cultural reel , 1 informative reel , 1 DM ad in process 1 cultural reel in process","description":"Internal reel editing"},{"count":1,"notes":"AI course video","description":"Internal YouTube editing"},{"count":1,"notes":"cultural reel ideas","description":"shoot"}]'::jsonb, '', '2026-06-09T13:39:09.262558+00:00', '2026-06-09T13:40:43.431+00:00', false, '10:15:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":1,"notes":"3","description":"Content scripting"},{"count":1,"notes":"Fund check, meta ads meeting","description":"Ads reporting"},{"count":6,"notes":"Lms issue, hosting space issue checked","description":"Tech support"},{"count":1,"notes":"Content research for yt","description":"Content"},{"count":2,"notes":"Research for posters, poster finalization","description":"Poster"},{"count":1,"notes":"Ig Bio update, linktree links created","description":"Rp"},{"count":1,"notes":"Tried to create ig account bt unable to create there is a issue, fb page created","description":"Delta grp"},{"count":1,"notes":"Hosting space management","description":"Hostinger"}]'::jsonb, '', '2026-06-09T13:47:35.145915+00:00', '2026-06-09T13:47:34.356+00:00', false, '10:20:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":1,"notes":"4","description":"Daily Calls"},{"count":1,"notes":"30","description":"Daily Follow-up"},{"count":1,"notes":"2","description":"DM Enrollment"},{"count":1,"notes":"2","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-09T14:27:58.638685+00:00', '2026-06-09T14:27:57.999+00:00', false, '10:10:00', '19:16:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-09', '[{"count":1,"notes":"RPDM carousel in progress","description":"Design"},{"count":1,"notes":"Webinar remainder has gone","description":"Reminder management"},{"count":1,"notes":"Ai ad creative in progress","description":"Design"},{"count":1,"notes":"Delta ad creative","description":"Design"}]'::jsonb, '', '2026-06-09T15:12:12.721079+00:00', '2026-06-09T15:12:12.118+00:00', false, '11:30:00', '16:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":6,"notes":"Google is releasing 3 crore Mosquitos. Apple’s Siri update with Google Gemini.India outpaces developing countries in AI race. The Rise of \"Agentic AI\": Biosecurity Governance:","description":"Content scripting"},{"count":3,"notes":"","description":"research on Delta project"}]'::jsonb, '', '2026-06-10T12:31:08.644318+00:00', '2026-06-10T12:31:08.517+00:00', false, '10:05:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":1,"notes":"Recieved Payment From Suyash sir","description":"CA Suyash Sir"},{"count":1,"notes":"1 Ads Changes and 1 Reel Done","description":"Advisor Alpha"},{"count":3,"notes":"3 Cultural reels shoot","description":"Cultural reel Shoot"},{"count":1,"notes":"","description":"Amaozn Lec in progress"}]'::jsonb, '', '2026-06-10T13:37:03.19631+00:00', '2026-06-10T13:37:03.066+00:00', false, '10:22:00', '19:22:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":3,"notes":"2 CULTURAL DONE , 1 OORRUU MEDIA REEL IN PROCESS","description":"Internal reel editing"},{"count":9,"notes":"4 cultural reel , 5 DM informative reel shoot","description":"SHOOT"}]'::jsonb, '', '2026-06-10T13:38:05.604619+00:00', '2026-06-10T13:38:05.469+00:00', false, '10:20:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":7,"notes":"completed DM & cultural shoots","description":"Shoot"},{"count":2,"notes":"designed thumbnails For DM & agnomatic","description":"Design"},{"count":1,"notes":"daily posting done on agnomatic","description":"Daily posting"},{"count":1,"notes":"Designed carousel for Dm","description":"Design"}]'::jsonb, '', '2026-06-10T13:39:14.069824+00:00', '2026-06-10T13:39:13.939+00:00', false, '12:26:00', '19:14:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":6,"notes":"fresh daily calls","description":"Daily Calls"},{"count":40,"notes":"follow up calls","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-10T13:44:17.580373+00:00', '2026-06-10T13:44:16.948+00:00', false, '09:50:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":1,"notes":"Dm ig update","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":3,"notes":"Lms issue, lms access,","description":"Tech support"},{"count":7,"notes":"Calls done, lms access, WhatsApp group add","description":"New batch"},{"count":1,"notes":"Leads replies","description":"Regular"},{"count":1,"notes":"Content research, content shoot, cultural shoot","description":"Content"},{"count":1,"notes":"3","description":"Poster"}]'::jsonb, '', '2026-06-10T13:58:27.448365+00:00', '2026-06-10T13:58:27.324+00:00', false, '10:22:00', '19:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"Cultural reel shoot (4)","description":"Shoot"},{"count":1,"notes":"work in progress","description":"AI course"},{"count":1,"notes":"reels collected from main page","description":"The Delta Group"}]'::jsonb, '', '2026-06-10T14:05:10.441358+00:00', '2026-06-10T14:05:09.875+00:00', false, '10:20:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-10', '[{"count":1,"notes":"4","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-10T15:05:31.760328+00:00', '2026-06-10T15:05:31.198+00:00', false, '10:25:00', '19:16:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":5,"notes":"Saloon Automation. Use AI wisely. SEO vs AEO vs GEO in jobs .  Chatgpt vs Gemini vs Claude - role of each AI tool. RGA framework.","description":"Content scripting"},{"count":4,"notes":"done","description":"Shooting"}]'::jsonb, '', '2026-06-11T13:07:04.063928+00:00', '2026-06-11T13:07:03.377+00:00', false, '09:55:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":15,"notes":"Daily fresh calls done","description":"Daily Calls"},{"count":40,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-11T13:35:23.579464+00:00', '2026-06-11T13:35:23.452+00:00', false, '09:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":4,"notes":"completed Shoots for Agnomatic & RPDM","description":"Shoot"},{"count":1,"notes":"Completed design of thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Daily posting has done on Agnomatic","description":"Daily posting"},{"count":1,"notes":"Reminder has gone on webinar group","description":"Reminder management"},{"count":4,"notes":"Designed Ad creatives for RPDM","description":"Design"},{"count":1,"notes":"Designed thumbnail for Agnomatic","description":"Design"}]'::jsonb, '', '2026-06-11T13:37:00.551849+00:00', '2026-06-11T13:37:00.434+00:00', false, '10:55:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progrees","description":"AI course"},{"count":1,"notes":"video posting","description":"The Delta Group"},{"count":1,"notes":"1 script","description":"script"}]'::jsonb, '', '2026-06-11T14:02:25.713278+00:00', '2026-06-11T14:02:25.071+00:00', false, '10:20:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-16', '[{"count":1,"notes":"form changes, fund check","description":"Ads reporting"},{"count":1,"notes":"lms issues, lms access, access call","description":"Tech support"},{"count":2,"notes":"2, research","description":"poster"},{"count":1,"notes":"content research","description":"content"}]'::jsonb, '', '2026-06-16T14:22:57.772083+00:00', '2026-06-16T14:22:57.101+00:00', false, '10:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":6,"notes":"Agnomatic: Stop doing work manually. What Happens After a Lead Fills a Form? Why Businesses Lose Leads in the First 5 Minutes. AI Agent. vs Virtual Assistant. Digital Marketing cultural.","description":"Content scripting"},{"count":2,"notes":"done","description":"Shooting"}]'::jsonb, '', '2026-06-12T13:00:04.89493+00:00', '2026-06-12T13:00:04.724+00:00', false, '10:35:00', '18:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":1,"notes":"1 reel in progress","description":"CA Suyash Sir"},{"count":2,"notes":"1 Reel done, 1 Ad Done, and changes in previous ad","description":"Advisor Alpha"},{"count":1,"notes":"Raunaq given my no. to one of his friend. So she called me of enquiry","description":"One enquiry about our service."}]'::jsonb, '', '2026-06-12T14:24:40.86588+00:00', '2026-06-12T14:24:40.228+00:00', false, '10:14:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":3,"notes":"completed Cultural Shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for agnomatic","description":"Design"},{"count":1,"notes":"Daily posting has done on agnomatic","description":"Daily posting"},{"count":1,"notes":"reminder gone on webinar group","description":"Reminder management"},{"count":1,"notes":"group created for next sunday","description":"WhatsApp group creation"},{"count":1,"notes":"Doubt solving reminder gone on both groups","description":"Reminder"},{"count":2,"notes":"made zoom links for Webinar & doubt solving Session","description":"ZOOM Links"},{"count":4,"notes":"designed Delta creatives","description":"Design"},{"count":1,"notes":"Designed creatives for Ai audit","description":"Design"},{"count":1,"notes":"Static post of agnomatic is in progress","description":"Design"}]'::jsonb, '', '2026-06-12T14:30:17.518981+00:00', '2026-06-12T14:30:17.381+00:00', false, '12:17:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":1,"notes":"4 Ads And 2 Reels Shooting Done at Andheri","description":"Advisor Alpha"},{"count":1,"notes":"","description":"1 ad of Prashant Salvi Done"}]'::jsonb, '', '2026-06-11T15:22:53.455371+00:00', '2026-06-11T15:22:52.87+00:00', false, '09:50:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":1,"notes":"1 info for dm","description":"Internal reel editing"},{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb, '', '2026-06-11T16:26:29.831255+00:00', '2026-06-11T16:26:29.201+00:00', false, '10:20:00', '20:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-11', '[{"count":2,"notes":"2 yt dm","description":"Content scripting"},{"count":1,"notes":"fund check, meta-ads meeting","description":"Ads reporting"},{"count":8,"notes":"lms issue, lms access, website backup msg in 2 grps","description":"Tech support"},{"count":6,"notes":"mtw new batch created (lms & whats app grp), access created","description":"new batch"},{"count":12,"notes":"Placement sheet created, resumes added","description":"placement sheet"},{"count":3,"notes":"lead replies, rushi sir''s shoot, paper check, content research","description":"regular"},{"count":2,"notes":"amazon calls, welcome call","description":"calls"},{"count":1,"notes":"Sushma''s website creation explains to Rohan","description":"website"},{"count":1,"notes":"drive folder created, all files added","description":"Delta grp"},{"count":1,"notes":"Dm master sheet update","description":"Master Sheet"},{"count":1,"notes":"poster Tried but Canva was not working properly","description":"canva"}]'::jsonb, '', '2026-06-11T14:42:02.11226+00:00', '2026-06-11T18:08:06.244+00:00', false, '09:50:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":4,"notes":"Fresh Daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-12T12:43:26.964478+00:00', '2026-06-12T12:43:26.833+00:00', false, '09:55:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":1,"notes":"ca suyash","description":"Client posting"},{"count":3,"notes":"yt long, ig","description":"Content scripting"},{"count":1,"notes":"fund check, delta ad structure","description":"Ads reporting"},{"count":4,"notes":"lms issues","description":"Tech support"},{"count":2,"notes":"oorruu posting","description":"posting"},{"count":5,"notes":"2 finalize, 2 changes, 1 new start","description":"poster"},{"count":1,"notes":"lead replies, script check","description":"regular"}]'::jsonb, '', '2026-06-12T14:34:10.527945+00:00', '2026-06-12T14:34:10.409+00:00', false, '10:14:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":0,"notes":"Made daily calls","description":"Daily Calls"},{"count":0,"notes":"Made follow-up calls","description":"Daily Follow-up"},{"count":0,"notes":"Completed DM enrollments","description":"DM Enrollment"},{"count":0,"notes":"Completed Amazon enrollments","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-12T16:21:49.184382+00:00', '2026-06-12T16:21:49.063+00:00', false, '10:25:00', '18:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":4,"notes":"3 informative reel 2 dm and 1 agnomatic, 1 cultural reel done","description":"Internal reel editing"},{"count":3,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb, '', '2026-06-12T16:40:48.695817+00:00', '2026-06-12T16:40:48.013+00:00', false, '10:18:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-12', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"}]'::jsonb, '', '2026-06-12T17:16:29.372334+00:00', '2026-06-12T17:16:29.235+00:00', false, '10:18:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-13', '[{"count":5,"notes":"Vive coding Vs Hard Coding. Future of Small Businesses with Automation.. Your Next Employee is a Workflow. Save 20 Hours/Week Using Automation.  CRM Mistakes Costing Revenue","description":"Content scripting"}]'::jsonb, '', '2026-06-13T11:53:15.22726+00:00', '2026-06-13T11:53:15.099+00:00', false, '10:15:00', '17:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-13', '[{"count":4,"notes":"fresh daily calls done","description":"Daily Calls"},{"count":20,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-13T12:58:30.014363+00:00', '2026-06-13T12:58:29.896+00:00', false, '09:55:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-06', '[{"count":2,"notes":"1 Amazon Ad, 1 Dm Ad","description":"Ads"},{"count":6,"notes":"6 Episodes done","description":"Amazon Hindi Course"}]'::jsonb, '', '2026-07-06T14:23:13.890785+00:00', '2026-07-06T14:23:13.767+00:00', false, '10:34:00', '20:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-13', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"assignment cheacked","description":"LMS"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"posting","description":"The Delta Group"}]'::jsonb, '', '2026-06-13T12:59:49.568636+00:00', '2026-06-13T12:59:49.458+00:00', false, '11:00:00', '18:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-13', '[{"count":1,"notes":"1 reel done","description":"CA Suyash Sir"},{"count":1,"notes":"1 reel done","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up regarding the videos","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"1 Ad of Prashant Salvi Done"},{"count":1,"notes":"watched 2 editing tutorials","description":"Video Editin Tutorials"},{"count":1,"notes":"","description":"Bought New Keyboard for PC"}]'::jsonb, '', '2026-06-13T13:23:20.660496+00:00', '2026-06-13T13:23:20.534+00:00', false, '10:18:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-13', '[{"count":4,"notes":"1 dm ad, 2 dm informative , 1 oorruu media reel","description":"Internal reel editing"},{"count":1,"notes":"1 oorruu reel in process","description":"in process"}]'::jsonb, '', '2026-06-13T14:16:41.643267+00:00', '2026-06-13T14:16:41.522+00:00', false, '10:15:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-13', '[{"count":1,"notes":"ca suyash","description":"Client posting"},{"count":1,"notes":"Yt","description":"Content scripting"},{"count":1,"notes":"Delta campaign live","description":"Ads reporting"},{"count":3,"notes":"Lms issue, instructor change done, lms access","description":"Tech support"},{"count":1,"notes":"Ad creatives changes, ca thumbnail","description":"Canva"},{"count":3,"notes":"Access to rpdm69","description":"Canva pro"},{"count":1,"notes":"Posting schedule","description":"Oorruu"},{"count":1,"notes":"2 post schedule","description":"Shubhvandan"}]'::jsonb, '', '2026-06-13T15:52:47.277331+00:00', '2026-06-13T15:52:46.69+00:00', false, '10:18:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":25,"notes":"daily calls done","description":"Daily Calls"},{"count":40,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-15T13:28:14.080094+00:00', '2026-06-15T13:28:13.474+00:00', false, '09:55:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":1,"notes":"1 reel in progress","description":"CA Suyash Sir"},{"count":1,"notes":"1 ad done, 2 ads given in different formats","description":"Advisor Alpha"},{"count":1,"notes":"","description":"1 Ad of Prashant Salvi Done"},{"count":1,"notes":"","description":"Video editing Tutorials"}]'::jsonb, '', '2026-06-15T13:32:19.635801+00:00', '2026-06-15T13:32:18.995+00:00', false, '10:38:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":4,"notes":"2 cultural reel , 1 dm informative , dm ad changes","description":"Internal reel editing"}]'::jsonb, '', '2026-06-15T13:34:11.76923+00:00', '2026-06-15T13:34:11.647+00:00', false, '10:22:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":8,"notes":"Claude अब Video भी बना सकता है. ChatGPT अब Interactive Charts बना सकता है. Kimi Work: एक साथ 300 AI Agents. Jeff Bezos का नया AI Startup. US Government ने दुनिया के सबसे Powerful AI को Ban कर दिया. Post करने का सबसे सही समय कौन सा है?. Hashtags अभी भी काम करते हैं या नहीं?. Instagram Algorithm आखिर काम कैसे करता है?.","description":"Content scripting"}]'::jsonb, '', '2026-06-15T13:35:55.318714+00:00', '2026-06-15T13:35:55.191+00:00', false, '10:30:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"posting","description":"The Delta Group"}]'::jsonb, '', '2026-06-15T13:46:53.329997+00:00', '2026-06-15T13:48:05.178+00:00', false, '10:22:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":1,"notes":"shreya script training","description":"Content scripting"},{"count":1,"notes":"delta ad, leads, fund","description":"Ads reporting"},{"count":22,"notes":"lms access, amazon access, amazon msgs, added to WA grp, lms issue","description":"Tech support"},{"count":17,"notes":"enrollment calls, amazon calls","description":"calls"},{"count":1,"notes":"list of students for new batches, gave them access","description":"operations"},{"count":1,"notes":"1","description":"poster"},{"count":1,"notes":"leads replies, amazon webinar leads issues","description":"regular"}]'::jsonb, '', '2026-06-15T13:50:03.348505+00:00', '2026-06-15T13:50:02.675+00:00', false, '10:38:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-15T15:21:19.793723+00:00', '2026-06-15T15:21:19.194+00:00', false, '10:25:00', '18:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-15', '[{"count":1,"notes":"completed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"posting done on Agnomatic","description":"Daily posting"}]'::jsonb, '', '2026-06-15T13:53:37.259+00:00', '2026-06-15T17:18:01.403+00:00', false, '13:42:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-16', '[{"count":6,"notes":"Brain Chip.  Youtube AI video tag. Ads on OTT. Jiohotstar Ads. No Leads. Zomato case study. Followers increase but no conversion. 3 AI tools for business","description":"Content scripting"}]'::jsonb, '', '2026-06-16T13:15:42.753561+00:00', '2026-06-16T13:40:06.566+00:00', false, '11:25:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-16', '[{"count":1,"notes":"1 Reel In Progress","description":"CA Suyash Sir"},{"count":2,"notes":"1 Reel Done, 1 Ad in progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Regarding Payment, Invoice Revisions","description":"MBC"},{"count":1,"notes":"","description":"Made Banner Design On Corel Draw"}]'::jsonb, '', '2026-06-16T13:51:31.91074+00:00', '2026-06-16T13:51:31.792+00:00', false, '10:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-06', '[{"count":1,"notes":"16","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-06T17:45:50.903902+00:00', '2026-07-06T17:45:50.784+00:00', false, '11:49:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-16', '[{"count":3,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Completed thumbnail design","description":"Design"},{"count":1,"notes":"Reminder has gone","description":"Reminder management"},{"count":1,"notes":"Completed banner design","description":"Design"},{"count":1,"notes":"Completed Ad creative","description":"Design"}]'::jsonb, '', '2026-06-16T15:07:58.415443+00:00', '2026-06-16T15:07:57.817+00:00', false, '12:15:00', '20:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-16', '[{"count":1,"notes":"12","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-16T15:53:38.245966+00:00', '2026-06-16T15:53:38.1+00:00', false, '09:25:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-16', '[{"count":3,"notes":"Cultural reel,","description":"Internal reel editing"},{"count":1,"notes":"Ai course shoot","description":"Shoot"},{"count":1,"notes":"Help rohan for banner making","description":"Other"}]'::jsonb, '', '2026-06-16T18:27:13.174832+00:00', '2026-06-16T18:27:13.04+00:00', false, '10:12:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":3,"notes":"3 Ads Done","description":"Advisor Alpha"},{"count":1,"notes":"Meeting with Shubhash Sir Regarding Editing Service.","description":"Shubhash Shrivastav"}]'::jsonb, '', '2026-06-17T13:27:47.132632+00:00', '2026-06-17T13:27:46.994+00:00', false, '10:07:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":35,"notes":"Dialy fresh calls done`","description":"Daily Calls"},{"count":20,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":20,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-17T13:36:20.417366+00:00', '2026-06-17T13:36:20.307+00:00', false, '10:00:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-17T17:08:33.574441+00:00', '2026-06-17T17:08:32.987+00:00', false, '11:47:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"}]'::jsonb, '', '2026-06-17T17:40:53.08741+00:00', '2026-06-17T17:40:52.978+00:00', false, '10:18:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":3,"notes":"3 cultural reel","description":"Internal reel editing"},{"count":1,"notes":"1 sm long video in progress","description":"Internal YouTube editing"},{"count":2,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb, '', '2026-06-17T17:43:49.222485+00:00', '2026-06-17T17:43:48.576+00:00', false, '10:18:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":1,"notes":"Ca suyash","description":"Client posting"},{"count":1,"notes":"Form changes","description":"Ads reporting"},{"count":1,"notes":"Lms issue, lms access","description":"Tech support"},{"count":1,"notes":"Meeting with sir, attendance sheets update","description":"Placement"},{"count":1,"notes":"Leads replies, content shoot, content research","description":"Regular"}]'::jsonb, '', '2026-06-17T17:45:17.375766+00:00', '2026-06-17T17:45:17.263+00:00', false, '10:07:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-17', '[{"count":2,"notes":"Completed cultural shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Designed carousel for RPDM","description":"Design"}]'::jsonb, '', '2026-06-17T18:01:17.059519+00:00', '2026-06-17T18:01:16.919+00:00', false, '12:15:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":10,"notes":"daily fresh calls done","description":"Daily Calls"},{"count":20,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-18T13:32:48.802202+00:00', '2026-06-18T13:32:48.208+00:00', false, '09:58:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"work in progress","description":"AI course"}]'::jsonb, '', '2026-06-18T13:38:19.434294+00:00', '2026-06-18T13:38:19.297+00:00', false, '10:20:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":2,"notes":"2 cultural reel","description":"Internal reel editing"},{"count":1,"notes":"sm yt in process","description":"Internal YouTube editing"},{"count":1,"notes":"DM, Agnomatic, Ai course shoot","description":"shoot"}]'::jsonb, '', '2026-06-18T13:41:50.226318+00:00', '2026-06-18T13:41:49.575+00:00', false, '10:20:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":1,"notes":"1 Reel In Progress","description":"CA Suyash Sir"},{"count":2,"notes":"2 Ads Modifications, 1 ad done.","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up, reel in progress","description":"Shubhash Shrivastav"}]'::jsonb, '', '2026-06-18T13:55:01.294648+00:00', '2026-06-18T13:55:01.16+00:00', false, '10:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":4,"notes":"Completed shoots for RPDM and Agnomatic","description":"Shoot"},{"count":1,"notes":"Designed static post for RPDM","description":"Design"},{"count":1,"notes":"reminder has sent on whatsapp group","description":"Reminder management"},{"count":1,"notes":"Whatsapp group has created","description":"WhatsApp group creation"},{"count":1,"notes":"zoom link has created for tomorrow''s Webinar","description":"zoom link"},{"count":1,"notes":"completed design of thumbnail","description":"Design"},{"count":1,"notes":"Designed Festival post","description":"Design"}]'::jsonb, '', '2026-06-20T14:13:56.68804+00:00', '2026-06-20T14:15:50.939+00:00', false, '12:11:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"}]'::jsonb, '', '2026-06-20T14:36:11.256897+00:00', '2026-06-20T14:36:11.131+00:00', false, '10:20:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":1,"notes":"Yt script changes","description":"Content scripting"},{"count":2,"notes":"Delta Leads, fund check","description":"Ads reporting"},{"count":4,"notes":"Lms suspension, lms unsuspend, lms access","description":"Tech support"},{"count":5,"notes":"Morning batch reminder calls","description":"New batch"},{"count":2,"notes":"Shubham, pooja lokhande","description":"Student follow up"},{"count":1,"notes":"Shri sir yt video download","description":"Video download"},{"count":1,"notes":"","description":"Oorruu posting"},{"count":1,"notes":"","description":"Ganpati posting"},{"count":3,"notes":"Attendance sheet update, attendance mark 2 batch complete, 1 half","description":"Attendance sheet"},{"count":1,"notes":"Created","description":"Placement sheet"},{"count":12,"notes":"Seo requirement cvs sent","description":"Cv shared"},{"count":1,"notes":"Lead replies, content monitor,","description":"Regular"},{"count":1,"notes":"Swapnil sir call done, insta login","description":"Client follow up"}]'::jsonb, '', '2026-06-18T14:01:44.914065+00:00', '2026-06-18T14:01:44.789+00:00', false, '10:30:00', '19:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":1,"notes":"completed shoot for agnomatic","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"podting has done on Agnomatic","description":"Daily posting"},{"count":1,"notes":"reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"completed carousel design for RPDM","description":"Design"},{"count":1,"notes":"Designed post for agnomatic","description":"Design"}]'::jsonb, '', '2026-06-18T14:46:00.22392+00:00', '2026-06-18T14:45:59.573+00:00', false, '12:50:00', '20:31:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-18', '[{"count":1,"notes":"20","description":"Daily Calls"},{"count":1,"notes":"20","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-18T17:54:31.468411+00:00', '2026-06-18T17:54:31.336+00:00', false, '10:40:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":5,"notes":"daily calls fresh done","description":"Daily Calls"},{"count":15,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-19T12:20:40.709365+00:00', '2026-06-19T12:24:41.947+00:00', false, '09:55:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":6,"notes":"Order Sunlight from Space. Paid for daily work. “AI Overviews में rank करना चाहते हो? First AI city. China has created Digital paper using AI.","description":"Content scripting"},{"count":2,"notes":"Done","description":"Shooting"}]'::jsonb, '', '2026-06-19T13:15:16.426746+00:00', '2026-06-19T13:15:16.3+00:00', false, '10:55:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":3,"notes":"1 CA reel , 2 cultural reel","description":"Internal reel editing"},{"count":1,"notes":"1 in process","description":"Internal YouTube editing"},{"count":3,"notes":"cultural reel shoot","description":"shoot"}]'::jsonb, '', '2026-06-19T13:44:50.712214+00:00', '2026-06-19T13:44:50.142+00:00', false, '10:15:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":3,"notes":"1 reel adn 1 ad done, 1 ad changes","description":"Advisor Alpha"},{"count":1,"notes":"1 reel in progress","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"2 cultural shoots"}]'::jsonb, '', '2026-06-19T16:27:10.464565+00:00', '2026-06-19T16:27:09.894+00:00', false, '10:09:00', '21:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":4,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Design static post for RPDM","description":"Design"},{"count":1,"notes":"Sent reminder","description":"Reminder management"},{"count":1,"notes":"Design static post for oorruu media","description":"Design"}]'::jsonb, '', '2026-06-19T17:16:54.854518+00:00', '2026-06-19T17:16:54.274+00:00', false, '11:40:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":4,"notes":"Ig","description":"Content scripting"},{"count":4,"notes":"Delta Leads, funds checking, delta ad creative changes","description":"Ads reporting"},{"count":5,"notes":"Lms access, Lms issue, amzon webinar issue","description":"Tech support"},{"count":1,"notes":"Done, changes told to shreya and rohan","description":"Ig audit"},{"count":1,"notes":"Oorruu","description":"Posting"},{"count":1,"notes":"Enquiry email done","description":"Wise app"},{"count":10,"notes":"Monday new batch calls done","description":"New batch"},{"count":1,"notes":"Welcome call","description":"Calls"},{"count":1,"notes":"Dm content calendar update, insights and captions added","description":"Content sheet"},{"count":1,"notes":"Lead replies, content shoot, content ideas","description":"Regular"}]'::jsonb, '', '2026-06-19T17:32:08.482356+00:00', '2026-06-19T17:32:08.374+00:00', false, '10:09:00', '21:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-19', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"},{"count":1,"notes":"Done","description":"Content calendar update"}]'::jsonb, '', '2026-06-19T17:41:40.872722+00:00', '2026-06-19T17:41:40.77+00:00', false, '10:15:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":5,"notes":"Midjourney has created an AI Machine that detects cancer in just 60 minutes. Stop thinking start building.FIFA Football Has AI Chips Inside! Fake Courier scam. Real Estate में Agnomatic.","description":"Content scripting"},{"count":1,"notes":"done","description":"Shooting"}]'::jsonb, '', '2026-06-20T12:45:33.577117+00:00', '2026-06-20T12:45:52.459+00:00', false, '10:55:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":25,"notes":"Daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-20T13:14:35.11711+00:00', '2026-06-20T13:14:34.992+00:00', false, '09:55:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":2,"notes":"1 dm informative , 1 cultural reel","description":"Internal reel editing"}]'::jsonb, '', '2026-06-20T14:06:42.622703+00:00', '2026-06-20T14:06:42.038+00:00', false, '10:20:00', '07:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-20', '[{"count":1,"notes":"12","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"},{"count":1,"notes":"3","description":"Councelling"}]'::jsonb, '', '2026-06-20T16:48:29.828416+00:00', '2026-06-20T16:48:29.158+00:00', false, '10:25:00', '18:49:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-22', '[{"count":5,"notes":"Water is for AI not for Humans.  ChatGPT Camera Feature (iOS).  ChatGPT Scheduled Tasks.  Claude Design Update. Perplexity Brain Memory.","description":"Content scripting"},{"count":2,"notes":"DOne","description":"Shooting"}]'::jsonb, '', '2026-06-22T13:20:36.461335+00:00', '2026-06-22T13:20:35.818+00:00', false, '10:30:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-22', '[{"count":3,"notes":"2 info (dm,Agno), 1 ganpati bappa reel","description":"Internal reel editing"},{"count":1,"notes":"SM yt in process","description":"Internal YouTube editing"},{"count":1,"notes":"culutral reel shoot (dm, oorruu )","description":"shoot"}]'::jsonb, '', '2026-06-22T13:47:52.807347+00:00', '2026-06-22T13:47:52.687+00:00', false, '10:12:00', '07:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-22', '[{"count":1,"notes":"Follow Up regarding FB Issue","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel In progress, Shoot Scheduled Tommorow","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Shubhash Shrivastav"},{"count":1,"notes":"1 DM Cultural Shoot","description":"1 Cultural Shoot"}]'::jsonb, '', '2026-06-22T13:49:24.4782+00:00', '2026-06-22T13:49:23.855+00:00', false, '10:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-22', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"work in progress","description":"AI course"},{"count":1,"notes":"cultural shoot","description":"shoot"}]'::jsonb, '', '2026-06-22T13:49:27.89955+00:00', '2026-06-22T13:49:27.771+00:00', false, '10:12:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-22', '[{"count":3,"notes":"completed shoots","description":"Shoot"},{"count":1,"notes":"designed carousel post","description":"Design"},{"count":1,"notes":"posting has done","description":"Daily posting"},{"count":2,"notes":"designed static post","description":"Design"}]'::jsonb, '', '2026-06-22T14:47:23.13501+00:00', '2026-06-22T14:47:23.005+00:00', false, '12:21:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-23', '[{"count":5,"notes":"Insta New feature: we can post any picture from our phone gallery on anyone’s comment section . AI in Farms. (Use of AI by a Farmer in Japan). UGC ads statics . Instagram update: Caption for each corousels. Claude Design Update.","description":"Content scripting"},{"count":5,"notes":"Done","description":"Google posting replies"}]'::jsonb, '', '2026-06-23T13:23:57.343657+00:00', '2026-06-23T13:23:57.216+00:00', false, '10:30:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-23', '[{"count":1,"notes":"Ad fund check","description":"Ads reporting"},{"count":32,"notes":"Lms issue, hindi amazon course lms access","description":"Tech support"},{"count":10,"notes":"Msg for community, domain names, cvs to all groups","description":"Msgs"},{"count":1,"notes":"Sheet update","description":"Attendance"},{"count":1,"notes":"Hosting space management","description":"Hostinger"},{"count":11,"notes":"Access share","description":"Canva"},{"count":1,"notes":"Done","description":"Dm portfolio"},{"count":1,"notes":"Wi-Fi Bill chnages","description":"Shri sir"}]'::jsonb, '', '2026-06-23T15:09:58.261334+00:00', '2026-06-23T15:09:58.135+00:00', false, '10:10:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-23', '[{"count":1,"notes":"7","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-23T17:19:27.457976+00:00', '2026-06-23T17:19:27.329+00:00', false, '10:49:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":4,"notes":"How to clean whatsapp data? How to get more views on Instagram.   How to check Insta chat Screenshot is taken or not.  Want to view someone''s Instagram story without them knowing?","description":"Content scripting"}]'::jsonb, '', '2026-06-24T12:08:17.588914+00:00', '2026-06-24T12:08:17.468+00:00', false, '10:55:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":1,"notes":"1 reel & Thumbnail done, 1 ad in progress","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Changes","description":"Shubhash Shrivastav"},{"count":1,"notes":"Follow Up with Raunaq regarding payments","description":"Client Management"},{"count":1,"notes":"","description":"Made June Invoice Of Advisor Alpha"},{"count":1,"notes":"","description":"Updated OORRUU Media Billing Sheet"}]'::jsonb, '', '2026-06-24T12:54:36.641413+00:00', '2026-06-24T12:54:36.062+00:00', false, '11:10:00', '18:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":10,"notes":"Daily Calls Done","description":"Daily Calls"},{"count":10,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":10,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-24T13:04:14.241615+00:00', '2026-06-24T13:06:22.276+00:00', false, '09:50:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"doen","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"attendence marked","description":"lms"},{"count":1,"notes":"work in progress","description":"AI course"}]'::jsonb, '', '2026-06-24T13:33:29.206464+00:00', '2026-06-24T13:33:28.579+00:00', false, '10:25:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":4,"notes":"CA reel done , ganpati bappa reel, 2 cultural , agnomatic reel in process","description":"Internal reel editing"},{"count":1,"notes":"sm yt in process","description":"Internal YouTube editing"}]'::jsonb, '', '2026-06-24T13:27:53.225048+00:00', '2026-06-24T13:27:53.106+00:00', false, '10:25:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"20","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-24T17:36:50.123974+00:00', '2026-06-24T17:36:49.487+00:00', false, '10:25:00', '19:16:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-24', '[{"count":1,"notes":"Ca suyash","description":"Client posting"},{"count":4,"notes":"Ig scripts","description":"Content scripting"},{"count":1,"notes":"Delta ad check, leads added, meta ads meeting with Rushi sir","description":"Ads reporting"},{"count":1,"notes":"Sheet update dates 3 months , shreya training","description":"Dm attendance"},{"count":1,"notes":"Profiles update linkedin naukri","description":"Placement"},{"count":1,"notes":"Lead replies","description":"Regular"},{"count":1,"notes":"1 done","description":"Oorruu posting"},{"count":1,"notes":"Shreya content, scripts , attendance","description":"Trainings"}]'::jsonb, '', '2026-06-24T17:52:08.594896+00:00', '2026-06-24T17:52:08.462+00:00', false, '10:15:00', '19:06:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-25', '[{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"}]'::jsonb, '', '2026-06-25T10:06:59.044249+00:00', '2026-06-25T10:07:08.23+00:00', false, '11:00:00', '15:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-25', '[{"count":14,"notes":"Fresh daily Calls done","description":"Daily Calls"},{"count":25,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-25T13:22:14.436566+00:00', '2026-06-25T13:22:14.293+00:00', false, '11:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-25', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work inprogress","description":"AI cpurse"},{"count":1,"notes":"attendence marked","description":"LMS"},{"count":1,"notes":"research done","description":"Youtube"},{"count":1,"notes":"done","description":"script"}]'::jsonb, '', '2026-06-25T14:01:31.535636+00:00', '2026-06-25T14:01:30.865+00:00', false, '10:20:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-25', '[{"count":1,"notes":"Completed the banner design","description":"Design"},{"count":1,"notes":"reminder has sent on whatsapp group","description":"Reminder management"},{"count":2,"notes":"completed carousel design","description":"Design"},{"count":1,"notes":"completed static post for RPDM","description":"Design"}]'::jsonb, '', '2026-06-25T14:31:09.701157+00:00', '2026-06-25T14:31:09.556+00:00', false, '12:17:00', '20:17:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-25', '[{"count":1,"notes":"Delta Leads , funds checking","description":"Ads reporting"},{"count":2,"notes":"Lms access, Canva issue","description":"Tech support"},{"count":1,"notes":"","description":"Hosting space"},{"count":1,"notes":"Research done","description":"Ott ads"},{"count":3,"notes":"3 companies","description":"Cv shared"},{"count":1,"notes":"Follow up Mail","description":"Wise"},{"count":1,"notes":"1","description":"Oorruu posting"},{"count":1,"notes":"Leads reply","description":"Regular"},{"count":10,"notes":"Certificates email to students","description":"Certificates email"},{"count":1,"notes":"In progress","description":"Poster"}]'::jsonb, '', '2026-06-25T16:29:48.589281+00:00', '2026-06-25T16:29:47.949+00:00', false, '10:11:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-26', '[{"count":15,"notes":"fresh daily Calls Done","description":"Daily Calls"},{"count":20,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":5,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-26T13:24:29.086451+00:00', '2026-06-26T13:24:28.948+00:00', false, '09:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-26', '[{"count":1,"notes":"Completed static post for agnomatic","description":"Design"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Zoom link has created for Doubt solving session","description":"Link Creation"},{"count":1,"notes":"Banner Design Completed","description":"Design"},{"count":1,"notes":"Website Designing is in progress","description":"Design"}]'::jsonb, '', '2026-06-26T14:55:46.865646+00:00', '2026-06-26T14:55:46.745+00:00', false, '12:58:00', '20:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-26', '[{"count":1,"notes":"Client shoot at bandra","description":"Shoot"}]'::jsonb, '', '2026-06-26T17:23:36.215914+00:00', '2026-06-26T17:23:36.085+00:00', false, '10:25:00', '20:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-26', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Dm script"},{"count":1,"notes":"Done","description":"Yt script"},{"count":1,"notes":"Practiced with the help of rohans login I''d","description":"Website practice"}]'::jsonb, '', '2026-06-26T17:22:28.607781+00:00', '2026-06-26T17:25:39.832+00:00', false, '10:25:00', '20:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-26', '[{"count":1,"notes":"Dm ad form change, delta leads","description":"Ads reporting"},{"count":3,"notes":"Lms access, lms issue","description":"Tech support"},{"count":2,"notes":"Wlcm call","description":"Calls"},{"count":6,"notes":"2 door creatives final, kitchen posters ideation, finalization, measurement done, creatives in progress","description":"Posters"},{"count":2,"notes":"","description":"Cv shared"},{"count":1,"notes":"Lead replies","description":"Regular"}]'::jsonb, '', '2026-06-26T17:42:58.338486+00:00', '2026-06-26T17:43:27.959+00:00', false, '10:13:00', '21:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-27', '[{"count":3,"notes":"Daily fresh calls done","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":5,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-27T12:34:35.94733+00:00', '2026-06-27T12:34:35.815+00:00', false, '10:00:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-27', '[{"count":1,"notes":"","description":"MSME Summit And awards Function Shoot"},{"count":1,"notes":"","description":"Data Sorting And storage"}]'::jsonb, '', '2026-06-27T13:30:56.453496+00:00', '2026-06-27T13:30:56.332+00:00', false, '09:00:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-27', '[{"count":3,"notes":"CA reel, Dm informative, agnomatic informative","description":"Internal reel editing"},{"count":1,"notes":"Rushi sir photo shoot & content shoot","description":"shoot"}]'::jsonb, '', '2026-06-27T13:52:15.972422+00:00', '2026-06-27T13:52:15.851+00:00', false, '10:00:00', '07:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-27', '[{"count":2,"notes":"COMPLETED  SHOOT","description":"Shoot"},{"count":2,"notes":"DESIGNED BANNER","description":"Design"},{"count":2,"notes":"REMINDER HAS SENT ON WEBINAR GROUP","description":"Reminder management"},{"count":1,"notes":"WEBINAR GROUP HAS CREATED","description":"WhatsApp group creation"},{"count":1,"notes":"ZOOM LINK CREATION","description":"LINK CREATION"}]'::jsonb, '', '2026-06-27T13:57:28.942972+00:00', '2026-06-27T13:57:28.835+00:00', false, '13:16:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-27', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Lms attendance"},{"count":1,"notes":"Learned and practiced","description":"Website"}]'::jsonb, '', '2026-06-27T17:40:57.112836+00:00', '2026-06-27T17:43:23.434+00:00', false, '10:00:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-27', '[{"count":1,"notes":"Ca","description":"Client posting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":5,"notes":"Lms issue, lms suspension, lms access","description":"Tech support"},{"count":2,"notes":"Wlcm call","description":"Calls"},{"count":2,"notes":"","description":"Cv share"},{"count":1,"notes":"Attendance sheet update","description":"Sheet update"},{"count":6,"notes":"6 poster kitchen","description":"Poster"},{"count":1,"notes":"From and msg created","description":"Amazon"}]'::jsonb, '', '2026-06-27T18:10:24.686424+00:00', '2026-06-27T18:10:24.065+00:00', false, '10:15:00', '19:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-04', '[{"count":10,"notes":"Daily fresh calls done","description":"Daily Calls"},{"count":20,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-04T13:30:05.82167+00:00', '2026-07-04T13:30:05.184+00:00', false, '10:00:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":42,"notes":"Fresh daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-29T13:19:29.090176+00:00', '2026-06-29T13:19:28.954+00:00', false, '09:55:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":1,"notes":"500000 followers will be celebrities said SEBI.","description":"Content scripting"},{"count":8,"notes":"Done. Google post- MSME summit attended","description":"Google posting replies"},{"count":25,"notes":"","description":"Sell on Amazon course"}]'::jsonb, '', '2026-06-29T13:37:22.399409+00:00', '2026-06-29T13:37:22.275+00:00', false, '10:35:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":2,"notes":"2 Reels Done, Sheet Updated.","description":"Advisor Alpha"},{"count":1,"notes":"Regarding Oorruu Media, EDITING, Clients, Revenue","description":"Meeting With Rushi sir"},{"count":1,"notes":"09 Ep done on Sunday and 03 Ep today","description":"Amazon Hindi Course"}]'::jsonb, '', '2026-06-29T13:15:11.438115+00:00', '2026-06-29T14:00:32.63+00:00', false, '10:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":1,"notes":"completed shoots for cosmetics products","description":"Shoot"},{"count":1,"notes":"Designed static post for agnomatic","description":"Design"},{"count":1,"notes":"posting has done on agnomatic","description":"Daily posting"},{"count":1,"notes":"added new numbers in community group","description":"Webinar management"},{"count":1,"notes":"reminders has sent in all webinar group","description":"Reminder management"},{"count":1,"notes":"Website Designing is in progress","description":"Design"},{"count":1,"notes":"Thumbmbnail design has done for Agnomatic","description":"Design"}]'::jsonb, '', '2026-06-29T14:10:12.401+00:00', '2026-06-29T14:10:12.269+00:00', false, '12:56:00', '19:56:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Learned and practiced","description":"Website"},{"count":1,"notes":"Assist suyog for product shoot","description":"Shoot"}]'::jsonb, '', '2026-06-29T15:37:01.394327+00:00', '2026-06-29T15:37:00.732+00:00', false, '10:20:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":3,"notes":"Agnomatic reel, 2 dm testimonials","description":"Internal reel editing"},{"count":1,"notes":"Dm testimonial","description":"Internal YouTube editing"},{"count":1,"notes":"Beauty product photoshoot","description":"Shoot"}]'::jsonb, '', '2026-06-29T15:38:46.183879+00:00', '2026-06-29T15:38:46.057+00:00', false, '10:20:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":1,"notes":"22","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-29T17:07:30.391518+00:00', '2026-06-29T17:07:30.264+00:00', false, '10:25:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-03', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"new format researched and script done","description":"script"}]'::jsonb, '', '2026-07-03T14:17:21.366143+00:00', '2026-07-03T15:39:47.564+00:00', false, '10:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-06', '[{"count":20,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":3,"notes":"Daily Follow up calls","description":"Daily Follow-up"},{"count":1,"notes":"DM","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-06T13:13:39.654198+00:00', '2026-07-06T13:13:39.527+00:00', false, '11:13:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-06', '[{"count":1,"notes":"Completed agnomatic post design","description":"Design"},{"count":1,"notes":"Daily posting done","description":"Daily posting"},{"count":34,"notes":"Called people’s for access","description":"Webinar management"},{"count":2,"notes":"Reminder of access and GST has ent","description":"Reminder management"},{"count":10,"notes":"Designed client Stickers","description":"Design"},{"count":2,"notes":"Designed and sent seminar designs to sir","description":"Design"}]'::jsonb, '', '2026-07-06T17:52:06.046683+00:00', '2026-07-06T17:52:05.905+00:00', false, '12:40:00', '20:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-29', '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":6,"notes":"Lms access, lms issue,","description":"Tech support"},{"count":18,"notes":"Amazon seller sheet, msgs, calls , issues, access done","description":"Amazon"},{"count":22,"notes":"Amazon calls, enrollment calls, issue resolve calls","description":"Calls"},{"count":10,"notes":"","description":"Canva access"},{"count":1,"notes":"Report ready, meeting scheduled","description":"Oil client"},{"count":1,"notes":"Form for course access","description":"Amazon form"},{"count":3,"notes":"For asking Domain name, cv , exam notice","description":"Students msgs"},{"count":6,"notes":"4 done 2 in progress","description":"Kitchen posters"},{"count":1,"notes":"Lead replies, oorruu posting","description":"Regular"}]'::jsonb, '', '2026-06-29T17:22:11.228701+00:00', '2026-06-29T17:23:15.14+00:00', false, '10:00:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":13,"notes":"done. Google post about Digital marketing practical training.","description":"Google posting replies"},{"count":18,"notes":"","description":"Amazon Selling"}]'::jsonb, '', '2026-06-30T13:14:11.075964+00:00', '2026-06-30T13:14:10.404+00:00', false, '11:00:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":6,"notes":"Fresh Dialy calls done","description":"Daily Calls"},{"count":25,"notes":"Dsily follow ups done","description":"Daily Follow-up"},{"count":9,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-30T13:34:31.848+00:00', '2026-06-30T13:34:31.191+00:00', false, '10:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":2,"notes":"1 reel changes, 1 ad done","description":"Advisor Alpha"},{"count":1,"notes":"","description":"Amaozn Hindi Course Shoot Follow Up"},{"count":1,"notes":"Discussion about the Goal","description":"Meeting"},{"count":1,"notes":"","description":"Renewal Of Capcut Pro"},{"count":1,"notes":"","description":"made two content Creation Proposals"},{"count":1,"notes":"","description":"Content Ideation For Kaari"}]'::jsonb, '', '2026-06-30T14:02:36.045256+00:00', '2026-06-30T14:02:35.38+00:00', false, '10:40:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":3,"notes":"3 dm testimonial","description":"Internal reel editing"},{"count":1,"notes":"DM long testimonial (swapnil Sir)","description":"Internal YouTube editing"},{"count":1,"notes":"making drive link for beauty products","description":"other"}]'::jsonb, '', '2026-06-30T14:09:51.355678+00:00', '2026-06-30T14:09:51.219+00:00', false, '09:52:00', '07:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Learned and practiced & practiced","description":"Website"},{"count":1,"notes":"Attendance marked","description":"Lms"},{"count":1,"notes":"Assignment checked","description":"Lms"}]'::jsonb, '', '2026-06-30T14:15:21.132797+00:00', '2026-06-30T14:15:21.013+00:00', false, '09:52:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":1,"notes":"Completed One thumbnail for Agnomatic","description":"Design"},{"count":1,"notes":"Daily posting has Done on agnomatic","description":"Daily posting"},{"count":1,"notes":"Reminder has gone on webinar group","description":"Reminder management"},{"count":1,"notes":"Website designing is in progress","description":"Design"},{"count":1,"notes":"Carousel designing is in progress","description":"Design"},{"count":15,"notes":"Resized the cosmetic products images","description":"Other"}]'::jsonb, '', '2026-06-30T17:41:57.936581+00:00', '2026-06-30T17:41:57.716+00:00', false, '13:00:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-06-30', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-06-30T18:11:36.90702+00:00', '2026-06-30T18:11:36.758+00:00', false, '10:14:00', '19:08:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":1,"notes":"Done 13 replies.","description":"Google posting replies"},{"count":7,"notes":"Course complete","description":"Amazon Selling"},{"count":1,"notes":"Post about Students completes Digital Marketing course","description":"Google post"}]'::jsonb, '', '2026-07-01T13:15:59.256562+00:00', '2026-07-01T13:16:56.902+00:00', false, '10:35:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":8,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":15,"notes":"Follow up calls made","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-01T13:23:09.471472+00:00', '2026-07-01T13:23:09.334+00:00', false, '10:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":4,"notes":"ca reel , dm testimonials","description":"Internal reel editing"},{"count":1,"notes":"dm long","description":"Internal YouTube editing"},{"count":1,"notes":"photos added in drive folder","description":"other"}]'::jsonb, '', '2026-07-01T13:37:38.593162+00:00', '2026-07-01T13:37:38.454+00:00', false, '09:56:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":3,"notes":"1 Ad Done, 1 Reel in Progress, June Invoice Sent","description":"Advisor Alpha"},{"count":1,"notes":"","description":"Month Start Meeting"},{"count":2,"notes":"2 Eps Done","description":"Amazon Hindi course"}]'::jsonb, '', '2026-07-01T13:40:00.164773+00:00', '2026-07-01T13:39:59.866+00:00', false, '10:30:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":1,"notes":"Ca","description":"Client posting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":4,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Lead replies, content","description":"Regular"},{"count":1,"notes":"Pandit capital done","description":"Profiles creation"},{"count":1,"notes":"Meeting with prajakta joshi","description":"Client call"},{"count":1,"notes":"For prajakta joshi","description":"Content research"},{"count":1,"notes":"Attendance sheet update","description":"Sheet update"},{"count":2,"notes":"Team meeting, bd team meeting","description":"Meeting"},{"count":1,"notes":"Oorruu posting","description":"Posting"},{"count":1,"notes":"Posters placement done","description":"Poster"}]'::jsonb, '', '2026-07-01T16:15:12.050952+00:00', '2026-07-01T16:15:36.338+00:00', false, '10:30:00', '19:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":9,"notes":"","description":"Daily Calls"},{"count":10,"notes":"","description":"Daily Follow-up"},{"count":0,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-01T16:29:15.124759+00:00', '2026-07-01T16:29:14.512+00:00', false, '10:25:00', '18:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":1,"notes":"Completed design of static post","description":"Design"},{"count":1,"notes":"Daily posting has done on agnomau","description":"Daily posting"},{"count":1,"notes":"Design of carousel is in progress","description":"Design"},{"count":1,"notes":"Website design is in progress","description":"Design"},{"count":1,"notes":"Cosmetic product folder making is in progress","description":"Other"}]'::jsonb, '', '2026-07-01T17:19:07.145053+00:00', '2026-07-01T17:19:06.483+00:00', false, '13:45:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-01', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Website learned and practiced and helped rohan in clients website","description":"Website"},{"count":1,"notes":"Attendance nd assignment","description":"Lms"}]'::jsonb, '', '2026-07-01T18:04:47.039885+00:00', '2026-07-01T18:08:31.518+00:00', false, '09:56:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-02', '[{"count":10,"notes":"fresh calls done today","description":"Daily Calls"},{"count":35,"notes":"follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-02T13:27:20.897627+00:00', '2026-07-02T13:27:20.256+00:00', false, '10:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-02', '[{"count":2,"notes":"done. Agnomatic 2 scripts","description":"Content scripting"},{"count":4,"notes":"done","description":"Shooting"},{"count":20,"notes":"Done. 1 student testimonial","description":"Google posting replies"}]'::jsonb, '', '2026-07-02T13:33:04.396018+00:00', '2026-07-02T13:33:04.271+00:00', false, '11:00:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-02', '[{"count":3,"notes":"1 Reel Done, 1 Ad Done, 1 Ad In Progress, Recovery Follow Up","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Regarding The Edit Work","description":"Shubhash Shrivastav"}]'::jsonb, '', '2026-07-02T13:42:31.453593+00:00', '2026-07-02T13:42:31.318+00:00', false, '10:23:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-02', '[{"count":1,"notes":"Dm informative, amazon ad in progress","description":"Internal reel editing"},{"count":2,"notes":"Ai course introduction videos","description":"Internal YouTube editing"},{"count":1,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb, '', '2026-07-02T14:53:59.1404+00:00', '2026-07-02T14:53:59.021+00:00', false, '10:05:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-02', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"client website","description":"Website"}]'::jsonb, '', '2026-07-02T14:51:08.821339+00:00', '2026-07-02T16:06:43.138+00:00', false, '10:05:00', '19:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-02', '[{"count":10,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed Carousel","description":"Design"},{"count":2,"notes":"Designed creatives","description":"Design"},{"count":1,"notes":"Website Design is in progress","description":"Design"}]'::jsonb, '', '2026-07-02T17:42:01.79359+00:00', '2026-07-02T17:42:01.677+00:00', false, '11:19:00', '19:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-03', '[{"count":15,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-03T13:24:15.306987+00:00', '2026-07-03T13:24:24.981+00:00', false, '11:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-03', '[{"count":2,"notes":"Done. 2 scripts for Pandit capital ad.","description":"Content scripting"},{"count":30,"notes":"Done. 1 post about new batch started. 30 google replies for review","description":"Google posting replies"}]'::jsonb, '', '2026-07-03T13:26:13.606583+00:00', '2026-07-03T13:26:13.497+00:00', false, '10:50:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-03', '[{"count":2,"notes":"1 Reel Changes, 1Thumbnail Done","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Regarding Editing Work- he said there''s work going on in his home, he will give us work.","description":"Shubhash Shrivastav"},{"count":1,"notes":"Shoot At Goregaon, Rutuj Office","description":"Amazon Hindi Course"},{"count":1,"notes":"","description":"Data Sorting, Sent Raw Files Of his Ad To him"},{"count":1,"notes":"","description":"Made One Content Creation Proposal for Pooja Kadam"}]'::jsonb, '', '2026-07-03T14:00:10.777306+00:00', '2026-07-03T14:00:10.673+00:00', false, '10:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-03', '[{"count":4,"notes":"Amazon ad done , dm ad done, client video cutting done , agnomatic reel in progress","description":"Internal reel editing"}]'::jsonb, '', '2026-07-03T15:39:25.901692+00:00', '2026-07-03T15:40:10.2+00:00', false, '10:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-03', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-03T16:13:40.404551+00:00', '2026-07-03T16:13:40.288+00:00', false, '10:14:00', '19:08:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":25,"notes":"Fresh Daily calls","description":"Daily Calls"},{"count":20,"notes":"Daily Follow up Calls","description":"Daily Follow-up"},{"count":1,"notes":"Dm","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-07T13:07:36.263877+00:00', '2026-07-07T13:07:36.134+00:00', false, '10:57:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":2,"notes":"Done. Blinkit & AIrbnb case study","description":"Content scripting"},{"count":5,"notes":"Done. 1 post and 4 replies","description":"Google posting replies"}]'::jsonb, '', '2026-07-07T13:14:20.658807+00:00', '2026-07-07T13:14:20.083+00:00', false, NULL, NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"attendence & assignment","description":"lms"},{"count":1,"notes":"done","description":"dm script"}]'::jsonb, '', '2026-07-07T13:29:02.009546+00:00', '2026-07-07T13:29:01.413+00:00', false, '10:13:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":3,"notes":"cultural dm , ca reel , agnomatic reel in process","description":"Internal reel editing"},{"count":1,"notes":"maked drive link for rushi sir photos","description":"other"}]'::jsonb, '', '2026-07-07T13:29:37.529699+00:00', '2026-07-07T13:29:36.943+00:00', false, '10:13:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":3,"notes":"2 Ads Changes, 1 Ad in Progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Of New Client Pooja Kadam","description":"Client Management"},{"count":3,"notes":"3 Eps Done","description":"Amazon Course"},{"count":1,"notes":"Report Meeting","description":"Meeting"}]'::jsonb, '', '2026-07-07T14:53:52.955651+00:00', '2026-07-07T14:53:52.384+00:00', false, '10:32:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":1,"notes":"Fund check, ad monitor","description":"Ads reporting"},{"count":9,"notes":"Lms access, lms issue, lms suspension, lms unsuspend","description":"Tech support"},{"count":2,"notes":"Landing page, thank you page done","description":"Amazon hindi webinar"},{"count":10,"notes":"Canva issue, access","description":"Canva"},{"count":1,"notes":"What''s app api form","description":"Extra"},{"count":1,"notes":"Social media accounts fb, ig, linkedin","description":"Novavita"},{"count":1,"notes":"Client onboarding msg created","description":"Client"},{"count":1,"notes":"Reminders done for tomorrow exam","description":"Exam"},{"count":1,"notes":"Lead reply, amazon leads issue resolve","description":"Regular"}]'::jsonb, '', '2026-07-07T15:02:46.023435+00:00', '2026-07-07T15:02:45.39+00:00', false, '22:30:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":3,"notes":"Designed ad creative","description":"Design"},{"count":1,"notes":"Reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"Arranged all Camera Equipments","description":"Other"},{"count":1,"notes":"Carousel Design is in Progress","description":"Design"}]'::jsonb, '', '2026-07-07T15:05:14.574943+00:00', '2026-07-07T15:25:57.634+00:00', false, '13:00:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-07', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-07T17:28:41.152215+00:00', '2026-07-07T17:28:41.031+00:00', false, '10:49:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":20,"notes":"Fresh daily calls done","description":"Daily Calls"},{"count":25,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-08T13:23:16.331225+00:00', '2026-07-08T13:23:16.196+00:00', false, '11:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":1,"notes":"agnomatic reel","description":"Internal reel editing"},{"count":1,"notes":"client shoot at andheri","description":"Shoot"}]'::jsonb, '', '2026-07-08T13:31:45.176721+00:00', '2026-07-08T13:31:45.036+00:00', false, '09:15:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":1,"notes":"Done. Casestudy Airbnb","description":"Content scripting"},{"count":1,"notes":"Done. Bill gates quote","description":"Google posting replies"}]'::jsonb, '', '2026-07-08T13:34:05.574405+00:00', '2026-07-08T13:34:05.47+00:00', false, '10:25:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":1,"notes":"1 Ad Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Ep Done","description":"Amazon Hindi Course"},{"count":1,"notes":"","description":"Sorting Of The Amazon Hindi Course Episodes"},{"count":1,"notes":"Shoot of Products at Marol Andheri","description":"Kaari Arts"}]'::jsonb, '', '2026-07-08T14:30:37.607765+00:00', '2026-07-08T14:30:37.483+00:00', false, '10:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":1,"notes":"Ca","description":"Client posting"},{"count":4,"notes":"Lms unsuspend, lms issue","description":"Tech support"},{"count":2,"notes":"2 resolve","description":"Canva issue"},{"count":2,"notes":"2","description":"Dm posting"},{"count":1,"notes":"Lead replies","description":"Regular"}]'::jsonb, '', '2026-07-08T14:32:08.849404+00:00', '2026-07-08T14:32:08.703+00:00', false, '10:58:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":2,"notes":"Designed Ad Post for RPDM","description":"Design"},{"count":1,"notes":"Sent Carousel for Posting","description":"Daily posting"},{"count":1,"notes":"Carousel Design is in progress","description":"Design"},{"count":3,"notes":"Completed Account Setup of Client","description":"Other"},{"count":2,"notes":"Client Design is in progress","description":"Design"}]'::jsonb, '', '2026-07-08T15:11:17.351396+00:00', '2026-07-08T15:11:16.726+00:00', false, '13:00:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-08', '[{"count":1,"notes":"20","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-08T15:24:35.770635+00:00', '2026-07-08T15:24:35.644+00:00', false, '10:49:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":23,"notes":"Fresh daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-09T13:04:19.18009+00:00', '2026-07-09T13:04:18.544+00:00', false, '09:55:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"assist in shooting","description":"shoot"}]'::jsonb, '', '2026-07-09T13:40:51.518021+00:00', '2026-07-09T13:40:50.866+00:00', false, '10:53:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":3,"notes":"Amazon ad, agnomatic reel, dm informative","description":"Internal reel editing"},{"count":1,"notes":"Content shoot, client shoot","description":"Shoot"}]'::jsonb, '', '2026-07-09T13:42:32.278162+00:00', '2026-07-09T13:42:31.69+00:00', false, '10:53:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":3,"notes":"Done. Body scan by Image generator AI. Airbnb & Spotify.","description":"Content scripting"},{"count":4,"notes":"Done1","description":"Shooting"}]'::jsonb, '', '2026-07-09T13:56:20.078324+00:00', '2026-07-09T13:56:19.946+00:00', false, '10:50:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":2,"notes":"2 Ads Done","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up with Pooja Kadam Regarding Meeting","description":"Client Management"},{"count":1,"notes":"2 Episodes Done","description":"Amazon Hindi COurse"},{"count":4,"notes":"CA AJit Shinde 4 Reels","description":"Shoot"}]'::jsonb, '', '2026-07-09T14:34:50.892827+00:00', '2026-07-09T14:34:50.219+00:00', false, '10:53:00', '20:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":5,"notes":"Lms access, LMS issue, amazon access","description":"Tech support"},{"count":2,"notes":"Changes done, gave access to shreya","description":"Pandit capital"},{"count":1,"notes":"Pooja kadam meeting pointers","description":"New client"},{"count":1,"notes":"Content research, ideation, content shoot, research for carousels","description":"Content"},{"count":3,"notes":"","description":"Enrollment calls"},{"count":1,"notes":"Canva issue","description":"Canva"}]'::jsonb, '', '2026-07-09T14:44:21.682968+00:00', '2026-07-09T14:44:21.571+00:00', false, '10:50:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-09', '[{"count":8,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":1,"notes":"Daily posting has done","description":"Daily posting"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Designed thumbnail","description":"Design"},{"count":1,"notes":"Client social media preparing","description":"Other"}]'::jsonb, '', '2026-07-09T17:43:45.065173+00:00', '2026-07-09T17:43:44.395+00:00', false, '13:10:00', '21:04:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":18,"notes":"Fresh calls done today","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-10T13:17:31.290897+00:00', '2026-07-10T13:17:31.178+00:00', false, '09:55:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":2,"notes":"Done. Cliphi.com. Meta reads your brain, no surgery It’s called Brain2Qwerty Meta built an AI that sits outside y","description":"Content scripting"},{"count":5,"notes":"Done","description":"Shooting"},{"count":1,"notes":"Done. Testimonial post","description":"Google posting replies"}]'::jsonb, '', '2026-07-10T13:28:23.979933+00:00', '2026-07-10T13:28:23.447+00:00', false, '09:50:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":2,"notes":"cultural , amazon ad in process","description":"Internal reel editing"},{"count":3,"notes":"changes in amazon lecture videos","description":"Internal YouTube editing"},{"count":1,"notes":"cultural, informative and ad shoot","description":"shoot"}]'::jsonb, '', '2026-07-10T13:52:26.897654+00:00', '2026-07-10T13:52:39.754+00:00', false, '10:03:00', '07:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":1,"notes":"1 Reel Done","description":"CA Suyash Sir"},{"count":1,"notes":"Meeting with Dr. Pooja Kadam","description":"Client Management"},{"count":1,"notes":"2 Episode Done, Changes in 3 Episode","description":"Amazon Hindi Course"},{"count":1,"notes":"Lanyard Design","description":"ID"}]'::jsonb, '', '2026-07-10T14:55:28.521174+00:00', '2026-07-10T14:55:27.984+00:00', false, '10:19:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":1,"notes":"18","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-10T15:24:44.257888+00:00', '2026-07-10T15:24:44.109+00:00', false, '10:08:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":1,"notes":"Post boost discuss with Preeti","description":"Client posting"},{"count":5,"notes":"Lms issue, lms suspension, amazon issue","description":"Tech support"},{"count":1,"notes":"Pooja kadam meeting done","description":"Meeting"},{"count":1,"notes":"Course sequence","description":"Amazon"},{"count":1,"notes":"Topic research","description":"Pooja kadam"},{"count":1,"notes":"Access shared oof AgnoChat and pandit capital","description":"Shareya"},{"count":1,"notes":"Changes done","description":"Landing page"},{"count":1,"notes":"Lanyard design","description":"Design"},{"count":1,"notes":"Lead replies","description":"Regular"}]'::jsonb, '', '2026-07-10T15:25:23.251644+00:00', '2026-07-10T15:25:22.712+00:00', false, '10:19:00', '20:49:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-10', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Assist in shooting","description":"Shoot"},{"count":1,"notes":"Set up of agnochat on all social media","description":"Account setup"},{"count":1,"notes":"Research for content and searched topics ( approval remaining)","description":"Pandit capital"}]'::jsonb, '', '2026-07-10T18:09:27.684777+00:00', '2026-07-10T18:09:27.146+00:00', false, '10:03:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":2,"notes":"Done","description":"Shooting"},{"count":1,"notes":"Done. No AI skills and Red card to career","description":"Google posting replies"}]'::jsonb, '', '2026-07-11T13:01:10.877484+00:00', '2026-07-11T13:01:10.353+00:00', false, '10:20:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":1,"notes":"Done. Automation in Ecommerce for Agnomatic)","description":"Content scripting"},{"count":4,"notes":"Done.","description":"Shooting"},{"count":1,"notes":"Done. Puri rath yatra wish post","description":"Google posting replies"}]'::jsonb, '', '2026-07-16T13:33:09.618879+00:00', '2026-07-16T13:33:09.068+00:00', false, '10:50:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":13,"notes":"Fresh Calls done","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-11T13:34:59.361118+00:00', '2026-07-11T13:34:59.254+00:00', false, '09:55:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"ad script","description":"script"},{"count":1,"notes":"asssisted in shoot","description":"shoot"},{"count":1,"notes":"attendance marked","description":"LMS"}]'::jsonb, '', '2026-07-11T13:47:11.907471+00:00', '2026-07-11T13:47:11.777+00:00', false, '09:53:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":4,"notes":"amazon ad, dm info,agnomatic info, client video in process","description":"Internal reel editing"},{"count":1,"notes":"ad shoot","description":"shoot"}]'::jsonb, '', '2026-07-11T14:06:14.036234+00:00', '2026-07-11T14:06:13.919+00:00', false, '09:53:00', '07:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":15,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-13T13:30:48.628094+00:00', '2026-07-13T13:37:34.976+00:00', false, '09:55:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":1,"notes":"Paymet Follow up","description":"Advisor Alpha"},{"count":1,"notes":"Dr. Pooja Kadam Follow Up","description":"Client Management"},{"count":1,"notes":"Introduction Video","description":"Amazon Course"},{"count":2,"notes":"1 Reel Done and 1 reel In progress","description":"CA Ajit Shinde"},{"count":1,"notes":"Reporting Meeting","description":"Meeting"},{"count":1,"notes":"ID Design Chnages","description":"ID Design"}]'::jsonb, '', '2026-07-11T14:23:54.813379+00:00', '2026-07-11T14:47:45.351+00:00', false, '10:15:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":1,"notes":"CA Posting and Boosting done","description":"Client posting"},{"count":1,"notes":"27 episodes on YT","description":"Amazon Hindi Course Upload"},{"count":1,"notes":"Certificate, Exam Prep, Messages","description":"RPDM 64"},{"count":1,"notes":"Umesh website issue solved","description":"Website issue"},{"count":1,"notes":"Pincode changes","description":"Amazon Seminar Adset"},{"count":1,"notes":"3 Amazon issues resolved","description":"LMS"},{"count":1,"notes":"","description":"Amazon hindi seminar link"},{"count":1,"notes":"Sheet update","description":"Attendance 6"}]'::jsonb, '', '2026-07-11T14:43:48.78052+00:00', '2026-07-11T15:43:13.468+00:00', false, '09:50:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"0","description":"Daily Follow-up"},{"count":1,"notes":"2","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-11T16:31:03.055324+00:00', '2026-07-11T16:31:02.533+00:00', false, '10:20:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-11', '[{"count":2,"notes":"completed shoots","description":"Shoot"},{"count":16,"notes":"Designed Certificates","description":"Design"},{"count":1,"notes":"Attended Seminar","description":"Webinar management"},{"count":2,"notes":"Sent reminder on groups","description":"Reminder management"},{"count":1,"notes":"Created group for next webinar","description":"WhatsApp group creation"},{"count":1,"notes":"Designed Thumbnail","description":"Design"},{"count":1,"notes":"Client product designing is in progress","description":"Design"},{"count":6,"notes":"Arranged Certificates","description":"Others"},{"count":3,"notes":"Made links for doubt sloving and webinar and seminar","description":"ZOOM LInks"}]'::jsonb, '', '2026-07-11T17:31:59.349775+00:00', '2026-07-11T17:31:58.857+00:00', false, '12:45:00', '20:43:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":1,"notes":"Done. Saturday club visit post","description":"Google posting replies"}]'::jsonb, '', '2026-07-13T13:32:40.627933+00:00', '2026-07-13T13:32:40.014+00:00', false, '10:15:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":2,"notes":"1 dm info, amazon hindi ad","description":"Internal reel editing"},{"count":1,"notes":"DM dontent shoot","description":"Shoot"}]'::jsonb, '', '2026-07-13T13:38:42.825927+00:00', '2026-07-13T13:38:42.698+00:00', false, '10:00:00', '07:25:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"}]'::jsonb, '', '2026-07-13T13:46:26.212573+00:00', '2026-07-13T13:46:26.071+00:00', false, '10:00:00', '19:25:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":1,"notes":"Rescheduled The Shoot on Wednesday","description":"Advisor Alpha"},{"count":2,"notes":"1.Made Vanttagge Group. 2.Updated the client sheet.","description":"Client Management"},{"count":1,"notes":"Redesigned Lace Design On Corel Draw","description":"ID"},{"count":1,"notes":"1 Ree of CA Ajit Done, 1 Reel Of Tejashri In Progress","description":"Vanttagge CFO"},{"count":1,"notes":"","description":"Given Amazon Access to Swanpil sir"},{"count":1,"notes":"","description":"Given Amazon Hindi Course To Pooja"}]'::jsonb, '', '2026-07-13T14:13:11.442382+00:00', '2026-07-13T14:15:23.109+00:00', false, '10:15:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":1,"notes":"Ca 1 post archive, ad Stop then posted new one and boost new post","description":"Client posting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":11,"notes":"Lms issue LMS access , access remove","description":"Tech support"},{"count":1,"notes":"1 lecture added to rpdm66","description":"Lecture added"},{"count":7,"notes":"","description":"Enrollment calls"},{"count":40,"notes":"Amazon what''s app grp add, verification of payments","description":"Amazon calls"},{"count":47,"notes":"","description":"Amazon access"},{"count":1,"notes":"Student details to Naveen sir","description":"Attendance report"},{"count":1,"notes":"Mastersheet update dm","description":"Sheet update"},{"count":1,"notes":"Marathi landing page changes done","description":"Landing page changes"}]'::jsonb, '', '2026-07-13T14:40:59.620176+00:00', '2026-07-13T14:42:30.178+00:00', false, '10:15:00', '20:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-13', '[{"count":1,"notes":"14","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-13T16:29:25.092571+00:00', '2026-07-13T16:29:24.973+00:00', false, '10:25:00', '19:17:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-14', '[{"count":2,"notes":"Done. 2 script for Pandit capitals","description":"Content scripting"},{"count":1,"notes":"Done. 1 post about students completed DM course.","description":"Google posting replies"}]'::jsonb, '', '2026-07-14T12:52:21.824157+00:00', '2026-07-14T12:52:21.163+00:00', false, '10:20:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-14', '[{"count":15,"notes":"Daily Fresh Calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups calls","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-14T13:15:39.851052+00:00', '2026-07-14T13:15:39.28+00:00', false, '09:55:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-14', '[{"count":5,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Content research for topics","description":"Pooja kadam"},{"count":1,"notes":"Rp banners with kedar","description":"Banner"},{"count":1,"notes":"Content ideation and shoot for rp and oorruu","description":"Content"},{"count":1,"notes":"1 for Course","description":"Amazon payment info"},{"count":1,"notes":"Exam postponed, called riddhi for exam","description":"Exam msg call"},{"count":1,"notes":"Pooja lokhande, Shubham konde for there remaining course","description":"Batch addtion"},{"count":1,"notes":"Updated dates of enrollment","description":"Attendance sheet"}]'::jsonb, '', '2026-07-14T14:33:54.801287+00:00', '2026-07-14T14:33:54.665+00:00', false, '10:33:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-14', '[{"count":1,"notes":"Follow Up","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done, Follow Up","description":"Vanntagge CFO"},{"count":1,"notes":"1 Reel In Progress","description":"Amylua Gems"},{"count":1,"notes":"3 Designs Altered and Making 1 New Design","description":"Banner"},{"count":3,"notes":"3 Cultural Reels","description":"Shoot"}]'::jsonb, '', '2026-07-14T14:38:29.955872+00:00', '2026-07-14T14:38:29.834+00:00', false, '10:33:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-14', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-14T16:24:25.049041+00:00', '2026-07-14T16:24:24.459+00:00', false, '10:08:00', '18:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-15', '[{"count":1,"notes":"2 post","description":"Client posting"},{"count":1,"notes":"Content planning for Pooja kadam","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":7,"notes":"Lms issue, lms access, enrollment call","description":"Tech support"},{"count":1,"notes":"Instructions for traing Saurabh for designing","description":"Rohan"},{"count":1,"notes":"Accounts setup for ca Ajit","description":"Shreya"},{"count":1,"notes":"New exam date notification","description":"Exam"},{"count":1,"notes":"Client onboarding sop structure","description":"Sop"},{"count":1,"notes":"For rushisir","description":"New ig acc"}]'::jsonb, '', '2026-07-15T15:42:28.087182+00:00', '2026-07-15T15:42:27.967+00:00', false, '10:15:00', '21:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-15', '[{"count":9,"notes":"Shoot At Andheri - 09 Reels","description":"Advisor Alpha"},{"count":2,"notes":"Hardika - New Product Shoot, AdvisorAlpha Sheet Updated","description":"Client Management"}]'::jsonb, '', '2026-07-15T15:36:39.821492+00:00', '2026-07-15T15:44:14.627+00:00', false, '11:05:00', '21:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-15', '[{"count":1,"notes":"Designed festival post","description":"Design"},{"count":1,"notes":"Posting has done","description":"Daily posting"},{"count":2,"notes":"Designed thumbnail for client","description":"Design"},{"count":1,"notes":"Designed thumbnail for agnomatic","description":"Design"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Training has Done on WhatsApp API","description":"Other"},{"count":1,"notes":"Training has done of student for design","description":"Other"}]'::jsonb, '', '2026-07-15T16:00:16.193909+00:00', '2026-07-15T16:00:15.594+00:00', false, '13:27:00', '21:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-15', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Account creation and setup , posting done","description":"Vanttagge CFO"},{"count":1,"notes":"Calling done for AI course and information collected","description":"Calling"},{"count":1,"notes":"Script and some content ideas","description":"DM"},{"count":1,"notes":"Topics added and generated script,","description":"Pandit capital"},{"count":1,"notes":"Trained by krish with live client setup","description":"Agnochat"}]'::jsonb, '', '2026-07-15T17:25:28.409097+00:00', '2026-07-15T17:25:27.865+00:00', false, '10:02:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-15', '[{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb, '', '2026-07-15T17:41:38.795503+00:00', '2026-07-15T17:41:38.691+00:00', false, '10:02:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":15,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":35,"notes":"Daily Follow ups calls made","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-16T13:40:46.334736+00:00', '2026-07-16T13:40:45.839+00:00', false, '09:57:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"Attendance marked & assignment","description":"LMS"},{"count":1,"notes":"topics & scripts","description":"Pandit capital"}]'::jsonb, '', '2026-07-16T13:45:22.849422+00:00', '2026-07-16T13:45:22.705+00:00', false, '10:11:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":1,"notes":"1 Reel In Progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow up with Hardika Regarding one client","description":"Client Management"},{"count":4,"notes":"4 Designs changes","description":"Banner"},{"count":1,"notes":"Client Content Planning","description":"Team Meeting"},{"count":1,"notes":"1 Reel In Progress","description":"Amulya Gems"}]'::jsonb, '', '2026-07-16T14:24:07.795767+00:00', '2026-07-16T14:24:07.669+00:00', false, '10:40:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":12,"notes":"completed shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnails","description":"Design"},{"count":1,"notes":"Sent reminder on webinar group","description":"Reminder management"},{"count":2,"notes":"Designed Ad creatives","description":"Design"}]'::jsonb, '', '2026-07-16T14:29:22.729008+00:00', '2026-07-16T14:29:22.199+00:00', false, '11:22:00', '20:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":3,"notes":"2 cultural reel, 1 reel in progress","description":"Internal reel editing"},{"count":1,"notes":"Discussion with client","description":"Client"},{"count":1,"notes":"Ai course shoot","description":"Shoot"}]'::jsonb, '', '2026-07-16T14:45:12.32153+00:00', '2026-07-16T14:45:11.802+00:00', false, '10:11:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-16T15:39:53.249982+00:00', '2026-07-16T15:39:52.733+00:00', false, '10:25:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-16', '[{"count":1,"notes":"Sakal ad set up","description":"Ads reporting"},{"count":1,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Form created","description":"WhatsApp masterclass"},{"count":1,"notes":"Om sai Ratnakar","description":"Content strategy"},{"count":1,"notes":"Pooja kadam","description":"Content plan"},{"count":1,"notes":"Lead reply","description":"Regular"},{"count":18,"notes":"Amazon course","description":"Yt upload"}]'::jsonb, '', '2026-07-16T17:55:00.686144+00:00', '2026-07-16T18:16:54.283+00:00', false, '10:40:00', '21:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-17', '[{"count":15,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-17T13:20:32.565374+00:00', '2026-07-17T13:20:32.433+00:00', false, '10:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-17', '[{"count":1,"notes":"1 Reel and 1 Thumbnail Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Amulya Gems"},{"count":1,"notes":"","description":"Shoot Assistance"},{"count":1,"notes":"","description":"Quotation Changes"}]'::jsonb, '', '2026-07-17T13:45:38.938636+00:00', '2026-07-17T13:45:38.28+00:00', false, '10:13:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-17', '[{"count":6,"notes":"Amazon ad , amazon testimonial 4 , agnomatic reel in process","description":"Internal reel editing"},{"count":1,"notes":"amazon testimonial, dm ad shoot","description":"shoot"}]'::jsonb, '', '2026-07-17T13:46:01.819472+00:00', '2026-07-17T13:46:01.302+00:00', false, '09:30:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-17', '[{"count":7,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed one thumbnail","description":"Design"},{"count":1,"notes":"Reminder sent on group","description":"Reminder management"},{"count":1,"notes":"Carousel designing is in progress","description":"Design"},{"count":1,"notes":"Designing training given","description":"Other"}]'::jsonb, '', '2026-07-17T18:02:41.746583+00:00', '2026-07-17T18:02:41.63+00:00', false, '12:20:00', '20:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-17', '[{"count":2,"notes":"Sakal ad live , amazon hindi ad done","description":"Ads reporting"},{"count":1,"notes":"Lms issue, lms access, amazon issue","description":"Tech support"},{"count":4,"notes":"Amazon webinar testimonials upload yt","description":"Testimonials"},{"count":1,"notes":"Introduction video","description":"Yt upload"},{"count":1,"notes":"Changes additon done","description":"Landing page"},{"count":1,"notes":"Content finalization meeting done","description":"Pooja kadam"},{"count":2,"notes":"","description":"Amazon issues"},{"count":1,"notes":"4","description":"Cv shared"},{"count":1,"notes":"Msg for cvs","description":"Placement"}]'::jsonb, '', '2026-07-17T18:20:47.520191+00:00', '2026-07-17T18:20:47.388+00:00', false, '10:15:00', '19:22:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-18', '[{"count":3,"notes":"amazon ad, oorruu cultural, dm informative","description":"Internal reel editing"}]'::jsonb, '', '2026-07-18T12:27:38.646488+00:00', '2026-07-18T12:27:38.524+00:00', false, '09:50:00', '06:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-18', '[{"count":1,"notes":"1 Reel Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel in Progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up With Raunaq regarding payment","description":"Client Management"},{"count":1,"notes":"1 Reel Done","description":"Amulya Gems"},{"count":1,"notes":"","description":"Meeting With Rushi Sir"}]'::jsonb, '', '2026-07-18T12:38:24.149956+00:00', '2026-07-18T12:38:24.016+00:00', false, '11:20:00', '18:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-22', '[{"count":4,"notes":"Done.","description":"Shooting"},{"count":1,"notes":"Done","description":"Google posting replies"},{"count":4,"notes":"Assignment projects : Classroom & Capstone","description":"Assignment projects : Classroom & Capstone"}]'::jsonb, '', '2026-07-22T13:55:42.543406+00:00', '2026-07-22T13:55:42.011+00:00', false, NULL, '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-18', '[{"count":3,"notes":"Done. How Hospitals Can Automate Appointment Booking. AI Automation for Educational Institutes. AI for Recruitment Agencies.","description":"Content scripting"},{"count":1,"notes":"Done. Rushi Sir explaining how AI is creating job opportunities.","description":"Google posting replies"},{"count":1,"notes":"August Content planner Calendar for Agnomatic","description":"Agnomatic Calender"}]'::jsonb, '', '2026-07-18T13:15:14.301456+00:00', '2026-07-18T13:15:34.668+00:00', false, '10:20:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-18', '[{"count":46,"notes":"fresh Daily calls made","description":"Daily Calls"},{"count":35,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-18T13:24:37.046479+00:00', '2026-07-18T13:24:36.561+00:00', false, '09:57:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-18', '[{"count":1,"notes":"Designed carousel for Client","description":"Design"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Group has created for next webinar","description":"WhatsApp group creation"},{"count":2,"notes":"LInk has created on ZOOM","description":"ZOOM"},{"count":1,"notes":"Designed static post for client","description":"Design"},{"count":2,"notes":"Static and carousel post designing is in progress","description":"Design"},{"count":1,"notes":"Trained intern for Designs","description":"Other"}]'::jsonb, '', '2026-07-18T13:54:35.174707+00:00', '2026-07-18T13:54:35.052+00:00', false, '12:30:00', '19:35:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-18', '[{"count":1,"notes":"16","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-18T14:53:28.726248+00:00', '2026-07-18T14:53:28.195+00:00', false, '09:31:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-20', '[{"count":20,"notes":"fresh daily calls done","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-20T13:17:07.080028+00:00', '2026-07-20T13:17:06.603+00:00', false, '10:03:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-20', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"posting and done chnges according to them","description":"Vanntagge"}]'::jsonb, '', '2026-07-20T15:01:53.356468+00:00', '2026-07-20T15:01:52.813+00:00', false, '10:25:00', '20:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-20', '[{"count":3,"notes":"1 dm cultural , 1 ganpati reel , changes in oorruu reel, dm ad in process","description":"Internal reel editing"}]'::jsonb, '', '2026-07-20T15:04:55.661057+00:00', '2026-07-20T15:04:55.539+00:00', false, '10:25:00', '08:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-20', '[{"count":1,"notes":"Completed Shoot of Meeting","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for course","description":"Design"},{"count":20,"notes":"Called people for access","description":"Webinar management"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Attended Meeting","description":"Other"}]'::jsonb, '', '2026-07-20T15:05:05.868344+00:00', '2026-07-20T15:05:05.328+00:00', false, '12:00:00', '20:50:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-20', '[{"count":1,"notes":"Hardika and Neha Follow Up","description":"Client Management"},{"count":1,"notes":"","description":"2 Amazon Webinar Videos"},{"count":1,"notes":"","description":"Restructure Meeitng"}]'::jsonb, '', '2026-07-20T15:24:54.123353+00:00', '2026-07-20T15:24:53.572+00:00', false, '10:20:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-20', '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":32,"notes":"Lms issue, lms suspension, lms unsuspend, amazon access","description":"Tech support"},{"count":6,"notes":"","description":"Amazon calls"},{"count":1,"notes":"","description":"Oorruu posting"},{"count":1,"notes":"","description":"Ganpati posting"},{"count":1,"notes":"Shoot schedule","description":"Pooja kadam"}]'::jsonb, '', '2026-07-20T15:26:15.659731+00:00', '2026-07-20T15:26:15.154+00:00', false, '10:20:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-21', '[{"count":20,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-21T13:12:13.981639+00:00', '2026-07-21T13:12:29.243+00:00', false, '10:07:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-21', '[{"count":1,"notes":"1 Reel In Progress","description":"Advisor Alpha"},{"count":2,"notes":"2 Reels Changes, Made 2 Thumbnails","description":"Vanntagge CFO"},{"count":4,"notes":"4 Designs Size Changes Done","description":"RP Baner"}]'::jsonb, '', '2026-07-21T13:54:08.080141+00:00', '2026-07-21T13:54:07.967+00:00', false, '10:13:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-21', '[{"count":2,"notes":"dm ad, cultural dm","description":"Internal reel editing"},{"count":1,"notes":"cultural reel","description":"Shoot"}]'::jsonb, '', '2026-07-21T14:02:14.68067+00:00', '2026-07-21T14:02:14.193+00:00', false, '10:02:00', '07:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-21', '[{"count":2,"notes":"2 amazon hindi ads , form and audiance changes done","description":"Ads reporting"},{"count":5,"notes":"Lms suspension, unsuspend, amazon access","description":"Tech support"},{"count":2,"notes":"","description":"Hosting space"},{"count":3,"notes":"","description":"Amazon access"},{"count":1,"notes":"Amazon replies, sakali ads","description":"Leads"}]'::jsonb, '', '2026-07-21T16:34:32.47982+00:00', '2026-07-21T16:34:31.949+00:00', false, '10:13:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-22', '[{"count":10,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":40,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":9,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-22T13:38:45.92398+00:00', '2026-07-22T13:38:45.415+00:00', false, '10:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-22', '[{"count":3,"notes":"2 informative , dm ad in process","description":"Internal reel editing"},{"count":1,"notes":"CA sir shoot","description":"shoot"}]'::jsonb, '', '2026-07-22T13:50:44.031106+00:00', '2026-07-22T13:50:43.503+00:00', false, '10:15:00', '07:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-22', '[{"count":1,"notes":"1 Reel And Thumbnail Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel And Thumbnail Done","description":"Advisor Alpha"},{"count":1,"notes":"Orruu Managemenst Sheet Updated","description":"Client Management"},{"count":1,"notes":"Shoot - 4 Reels","description":"Vanntagge CFO"}]'::jsonb, '', '2026-07-22T15:07:18.350379+00:00', '2026-07-22T15:07:17.81+00:00', false, '10:30:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-22', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Posting","description":"Vanntagge cfo"},{"count":1,"notes":"Done","description":"Amazon YouTube thumbnail uploading"},{"count":1,"notes":"Modules of the topics done ( to be discussed again with krish)","description":"Agentic Ai course"},{"count":1,"notes":"Assisted in shoot","description":"Shoot"}]'::jsonb, '', '2026-07-22T16:49:29.354254+00:00', '2026-07-22T16:49:28.858+00:00', false, '10:15:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-22', '[{"count":1,"notes":"Ca suyash","description":"Client posting"},{"count":2,"notes":"1 sakal ad, 1 dm ad, fund check","description":"Ads reporting"},{"count":5,"notes":"Lms issue, amazon issues, amazon access, payment verification","description":"Tech support"},{"count":2,"notes":"Leads shared, follow up with parveen","description":"Sakal"},{"count":1,"notes":"1 in progress, for 1 banner gave instructions to rohan","description":"Banner"},{"count":6,"notes":"","description":"Hosting space"},{"count":1,"notes":"Assignment chnages to swapnil","description":"Assignment"},{"count":1,"notes":"Meeting done","description":"Ajit Shinde"},{"count":1,"notes":"Changes done","description":"Brochure"},{"count":1,"notes":"Follow up with Akshay, msg to group","description":"Freelance session"},{"count":1,"notes":"MagnovaIQ meeting","description":"Team meeting"},{"count":1,"notes":"Lead replies, content research for carousels","description":"Regular"}]'::jsonb, '', '2026-07-22T17:37:32.184779+00:00', '2026-07-22T17:37:31.652+00:00', false, '10:30:00', '20:53:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-23', '[{"count":10,"notes":"Fresh calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":9,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-23T13:21:24.964354+00:00', '2026-07-23T13:21:24.809+00:00', false, '10:00:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-23', '[{"count":1,"notes":"Done.","description":"Google posting replies"},{"count":30,"notes":"Research for Digital Detox products","description":"Digital Detox"}]'::jsonb, '', '2026-07-23T13:25:20.904384+00:00', '2026-07-23T13:25:20.792+00:00', false, '10:35:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-23', '[{"count":1,"notes":"1 Reel In progress","description":"CA Suyash Sir"},{"count":2,"notes":"2 Ads and 2 Thumbnails Done","description":"Advisor Alpha"},{"count":1,"notes":"Updated Oorruu Management sheet","description":"Client Management"},{"count":1,"notes":"1 Reel In Progress","description":"Vanntagge CFO"},{"count":1,"notes":"","description":"Table Arrangement AND Printer Setup"}]'::jsonb, '', '2026-07-23T13:44:16.775533+00:00', '2026-07-23T13:49:06.313+00:00', false, '10:16:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-23', '[{"count":4,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed static post for client","description":"Design"},{"count":1,"notes":"Reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"Link has created for workshop","description":"Zoom"},{"count":1,"notes":"Designed carousel for RPDM","description":"Design"},{"count":1,"notes":"Carousel design is in progress","description":"Design"},{"count":1,"notes":"Helped in arrangements of workshop","description":"Other"}]'::jsonb, '', '2026-07-23T17:44:10.528648+00:00', '2026-07-23T17:44:10.024+00:00', false, '11:15:00', '19:08:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-23', '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issues","description":"Tech support"},{"count":1,"notes":"Arrangement","description":"Workshop"},{"count":1,"notes":"Batch confirmation calls, batch created","description":"New batch creation"},{"count":1,"notes":"Team meeting for work destribution and plan","description":"MagnovaIQ"},{"count":1,"notes":"Ig login done, other on shoot day","description":"Sharanam"},{"count":1,"notes":"Cultural reel","description":"Shhot"}]'::jsonb, '', '2026-07-23T18:21:20.340273+00:00', '2026-07-23T18:21:20.229+00:00', false, '10:13:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-24', '[{"count":1,"notes":"Done. Freelancing session","description":"Google posting replies"},{"count":25,"notes":"Toys research for Digital Detox","description":"Digital Detox"}]'::jsonb, '', '2026-07-24T13:22:42.32901+00:00', '2026-07-24T13:22:41.789+00:00', false, '10:20:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-24', '[{"count":11,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":10,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-24T13:23:49.995745+00:00', '2026-07-24T13:23:49.898+00:00', false, '09:59:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-24', '[{"count":4,"notes":"changes in dm testimonials, cultural reel dm, dm informative , dm ad in process, ganpati reel ideas","description":"Internal reel editing"}]'::jsonb, '', '2026-07-24T13:32:26.969122+00:00', '2026-07-24T13:32:26.841+00:00', false, '10:00:00', '07:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-24', '[{"count":2,"notes":"1 Reel Done 1 Thumbnail Done","description":"CA Suyash Sir"},{"count":1,"notes":"Payment Follow Up Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Vanntagge CFo"},{"count":1,"notes":"","description":"Krish Bday Celebration"}]'::jsonb, '', '2026-07-24T14:25:32.390767+00:00', '2026-07-24T14:25:31.859+00:00', false, '10:33:00', '20:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-24', '[{"count":1,"notes":"18","description":"Daily Calls"},{"count":1,"notes":"3","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-24T15:00:24.635041+00:00', '2026-07-24T15:00:24.131+00:00', false, '10:50:00', '19:02:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-24', '[{"count":1,"notes":"Designed thumbnail","description":"Design"},{"count":1,"notes":"Posting has done","description":"Daily posting"},{"count":1,"notes":"Reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"Carousel design is in progress","description":"Design"},{"count":1,"notes":"Helped saurabh to design carousel of client","description":"Other"}]'::jsonb, '', '2026-07-24T18:07:49.767+00:00', '2026-07-24T18:07:49.654+00:00', false, '12:15:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-25', '[{"count":1,"notes":"Done. Aashadhi Waari post","description":"Google posting replies"},{"count":1,"notes":"Amazon MOU draft","description":"Amazon"}]'::jsonb, '', '2026-07-25T13:33:48.137716+00:00', '2026-07-25T13:33:47.653+00:00', false, '10:25:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-25', '[{"count":10,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":11,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-25T13:45:28.565804+00:00', '2026-07-25T13:45:28.045+00:00', false, '10:20:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-25', '[{"count":1,"notes":"Completed shoot of games","description":"Shoot"},{"count":1,"notes":"Designed festival post","description":"Design"},{"count":1,"notes":"Sent link for doubt solving","description":"Webinar management"},{"count":2,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Group was created for next webinar","description":"WhatsApp group creation"},{"count":1,"notes":"Celebrated traditional day","description":"Other"},{"count":2,"notes":"Links prepared for webinar and doubt solving","description":"Zoom"}]'::jsonb, '', '2026-07-25T18:07:51.747533+00:00', '2026-07-25T18:07:51.618+00:00', false, '10:40:00', '20:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-27', '[{"count":3,"notes":"3 MOU final","description":"Amazon"}]'::jsonb, '', '2026-07-27T13:12:48.659401+00:00', '2026-07-27T13:12:48.153+00:00', false, '10:30:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-27', '[{"count":26,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"daily follow ups","description":"Daily Follow-up"},{"count":11,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-27T13:36:56.497559+00:00', '2026-07-27T13:36:56.371+00:00', false, '10:50:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-27', '[{"count":2,"notes":"ganpati reel, making changes in amazon ad","description":"Internal reel editing"},{"count":2,"notes":"changes in dm long, 1 long testimonial dm , agnochat lec in process","description":"Internal YouTube editing"}]'::jsonb, '', '2026-07-27T13:56:34.03337+00:00', '2026-07-27T13:56:33.546+00:00', false, '10:16:00', '07:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-27', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"worked on scripts for ad","description":"Agentic AI course"},{"count":1,"notes":"worked on script","description":"dm"},{"count":1,"notes":"posting done","description":"vanntagge cfo"},{"count":1,"notes":"assignment  uploaded on lms ( work in progress)","description":"assignment"}]'::jsonb, '', '2026-07-27T14:09:23.964573+00:00', '2026-07-27T14:09:23.854+00:00', false, '10:16:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-27', '[{"count":1,"notes":"1 Reel In progress","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Amulya Gems"},{"count":1,"notes":"1 Reel And 1 Thumbnail Done","description":"Vanntagge CFO"},{"count":1,"notes":"","description":"Meetiing with shri sir Regarding the DD Games"},{"count":1,"notes":"","description":"Report Meeting"}]'::jsonb, '', '2026-07-27T14:53:58.655799+00:00', '2026-07-27T14:53:58.125+00:00', false, '11:45:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-27', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-27T15:09:03.119183+00:00', '2026-07-27T15:09:02.578+00:00', false, '10:16:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":1,"notes":"1 reel & 1 Thumbnail Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel in progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up with Raunaq about payment, Oorruu Media Content sheet Updated","description":"Client Management"},{"count":1,"notes":"1 Reel in Progress","description":"Vanntagge CFO"},{"count":1,"notes":"1 Reel in progress","description":"Rushikesh Sir"},{"count":1,"notes":"Rushi sir ads and reels","description":"Shoot"}]'::jsonb, '', '2026-07-28T13:17:07.687596+00:00', '2026-07-28T13:17:07.143+00:00', false, '10:13:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":4,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":1,"notes":"posting has done","description":"Daily posting"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":2,"notes":"Design of ad creative has done","description":"Design"},{"count":1,"notes":"Designed thumbnail","description":"Design"}]'::jsonb, '', '2026-07-28T13:26:25.027489+00:00', '2026-07-28T13:26:24.505+00:00', false, '22:28:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"assigemnts uploaded","description":"LMS"},{"count":1,"notes":"script","description":"dm"},{"count":1,"notes":"Posting","description":"Vanntagge"}]'::jsonb, '', '2026-07-28T13:25:08.757798+00:00', '2026-07-28T13:27:12.269+00:00', false, '10:05:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":3,"notes":"Done","description":"Shooting"},{"count":3,"notes":"Amazon MOU","description":"Amazon"},{"count":6,"notes":"LMS assignment","description":"Assignment"}]'::jsonb, '', '2026-07-28T13:33:34.956946+00:00', '2026-07-28T13:33:57.529+00:00', false, '10:25:00', NULL, NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":3,"notes":"cultural reel, rudhi sir reel, ganpati bappa reel, changes in 2 testimonails","description":"Internal reel editing"},{"count":1,"notes":"changes in 2 long testimonials","description":"Internal YouTube editing"}]'::jsonb, '', '2026-07-31T13:28:51.416969+00:00', '2026-07-31T13:28:51.303+00:00', false, '10:20:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":15,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":10,"notes":"Dm enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-28T13:47:37.199283+00:00', '2026-07-28T13:47:37.07+00:00', false, '10:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-28T15:01:11.377087+00:00', '2026-07-28T15:01:11.246+00:00', false, '10:30:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-28', '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":5,"notes":"Lms access, lms issue, amazon issue amazon access, call","description":"Tech support"},{"count":1,"notes":"Ca content sheet update","description":"Ca sheets"},{"count":1,"notes":"Amazon lead replies, sakal lead share, parveen followup done","description":"Leads"},{"count":1,"notes":"Content creation explain to Saurabh","description":"Agnochat"},{"count":1,"notes":"Amazon learners list who completed the 60% course","description":"List"},{"count":1,"notes":"For rushisir bts","description":"Drive link"}]'::jsonb, '', '2026-07-28T16:23:01.961853+00:00', '2026-07-28T16:23:01.845+00:00', false, '10:13:00', '19:05:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-29', '[{"count":10,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":11,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-29T13:09:55.963418+00:00', '2026-07-29T13:09:55.841+00:00', false, '12:30:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-29', '[{"count":1,"notes":"Deigned static post","description":"Design"},{"count":1,"notes":"Carousel Design is in progress","description":"Design"},{"count":1,"notes":"Ad creative Designing is in progress","description":"Design"},{"count":1,"notes":"Link prepared for rutuj sir friend","description":"Zoom"},{"count":1,"notes":"Attended meeting of magnova IQ","description":"Other"}]'::jsonb, '', '2026-07-29T14:46:01.514718+00:00', '2026-07-29T14:46:00.94+00:00', false, '23:15:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-29', '[{"count":2,"notes":"DM informative, ai ad","description":"Internal reel editing"},{"count":1,"notes":"ai course in process","description":"Internal YouTube editing"}]'::jsonb, '', '2026-07-29T14:52:18.570755+00:00', '2026-07-29T14:52:18.41+00:00', false, '12:29:00', '08:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-29', '[{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Rushi Sir"},{"count":1,"notes":"1 Long YT done","description":"Pandit Capital"},{"count":1,"notes":"1 Epidose of Whp API Done","description":"Agnochat"},{"count":1,"notes":"Content Planning","description":"Meeting with Pooja regarding CA Suyash Planning"}]'::jsonb, '', '2026-07-29T14:59:50.173361+00:00', '2026-07-29T14:59:50.017+00:00', false, '10:25:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":1,"notes":"Shoot Completed","description":"Shoot"},{"count":1,"notes":"Designed Thumbnail","description":"Design"},{"count":2,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Designed Shoot Creative","description":"Design"},{"count":2,"notes":"Designed Ad Creative","description":"Design"}]'::jsonb, '', '2026-07-30T13:38:46.480365+00:00', '2026-07-30T13:38:46.369+00:00', false, '09:59:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":8,"notes":"Fresh daily calls","description":"Daily Calls"},{"count":15,"notes":"Daily follow up","description":"Daily Follow-up"},{"count":12,"notes":"Dm","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-30T13:47:04.269461+00:00', '2026-07-30T13:47:03.782+00:00', false, '10:15:00', '19:16:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":1,"notes":"Meeting with Suyash sir Regarding Content Planning","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"},{"count":1,"notes":"Oorruu Management Sheet Updated","description":"Client Management"},{"count":1,"notes":"1 Episode of Whatsapp API Course Done","description":"Agnochat"},{"count":1,"notes":"","description":"Banner Installation"}]'::jsonb, '', '2026-07-30T14:23:09.411081+00:00', '2026-07-30T14:23:08.937+00:00', false, '10:02:00', '21:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":1,"notes":"Suyash sir meeting, pointers, research for ideas as per his needs","description":"Client posting"},{"count":3,"notes":"lms access, lms issue,","description":"Tech support"},{"count":1,"notes":"structure for his system","description":"ca ajit"},{"count":1,"notes":"exam paper count","description":"exam"},{"count":2,"notes":"enrollment call","description":"call"},{"count":3,"notes":"archana, mayuresh, meta issue vikas","description":"hosting & website issue"},{"count":1,"notes":"sakal leads shared, parveen followup call - not received","description":"leads"},{"count":1,"notes":"rushi sir","description":"posting"}]'::jsonb, '', '2026-07-30T14:28:25.330503+00:00', '2026-07-30T14:28:42.645+00:00', false, '10:02:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Cultural reel ideas and cultural shoot","description":"Other"},{"count":1,"notes":"Ad campaign","description":"Meta ad"}]'::jsonb, '', '2026-07-30T15:46:43.27045+00:00', '2026-07-30T15:46:43.149+00:00', false, '10:16:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":1,"notes":"1 rushi sir video","description":"Internal reel editing"},{"count":1,"notes":"Ai course in progress","description":"Internal YouTube editing"},{"count":1,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb, '', '2026-07-30T16:52:01.169958+00:00', '2026-07-30T16:52:01.045+00:00', false, '10:16:00', '23:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-30', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-30T17:51:44.647497+00:00', '2026-07-30T17:51:44.538+00:00', false, '10:49:00', '19:02:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":10,"notes":"fresh calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":12,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-31T13:30:44.504584+00:00', '2026-07-31T13:30:44.39+00:00', false, '11:00:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":2,"notes":"Completed shoots","description":"Shoot"},{"count":3,"notes":"Designed ad creatives","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Designed static post for CA","description":"Design"},{"count":1,"notes":"Banner designing is in progress","description":"Design"}]'::jsonb, '', '2026-07-31T14:53:13.964007+00:00', '2026-07-31T14:53:13.852+00:00', false, '11:40:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":1,"notes":"Follow Up For Next shoot","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Vanntagge CFO"},{"count":1,"notes":"6 Episodes Done","description":"WhatsApp API"},{"count":1,"notes":"","description":"Naveen Sir Bday celebration"},{"count":1,"notes":"RP Baner Installation","description":"Baner Installation"},{"count":1,"notes":"Made A Workflow System With Pooja For Oorruu Media Clients","description":"Made A Workflow System With Pooja For Oorruu Media Clients"}]'::jsonb, '', '2026-07-31T14:58:02.146081+00:00', '2026-07-31T14:58:02.03+00:00', false, '11:50:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-07-31T15:37:28.523018+00:00', '2026-07-31T15:37:28.041+00:00', false, '11:49:00', '19:16:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Posting","description":"vanntaggeCFO"},{"count":1,"notes":"Attended client meeting and made pointers","description":"Meeting"},{"count":1,"notes":"Published lead generation campaign","description":"Saturday club"},{"count":1,"notes":"Assisted pooja for making a formal flowchart of the content which will need for discussion in the meeting","description":"VanntaggeCFO"}]'::jsonb, '', '2026-07-31T16:03:23.772966+00:00', '2026-07-31T16:03:23.235+00:00', false, '22:20:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-07-31', '[{"count":6,"notes":"Lms issue, lms access, amazon issue, amazon access","description":"Tech support"},{"count":1,"notes":"","description":"Enrollment call"},{"count":1,"notes":"Meeting, Email","description":"Cems"},{"count":1,"notes":"Rushi sir","description":"Posting"},{"count":2,"notes":"Yojana koli, vanntagge cfo","description":"Meeting schedule"},{"count":1,"notes":"Structure and follow up with dinesh","description":"MagnovaIQ"},{"count":5,"notes":"Calls for confirmation","description":"New batch"},{"count":1,"notes":"Meeting schedule msg","description":"Sharanam"}]'::jsonb, '', '2026-07-31T16:25:52.764979+00:00', '2026-07-31T16:25:52.149+00:00', false, '10:00:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-01', '[{"count":9,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-01T12:57:22.372164+00:00', '2026-08-01T12:57:22.246+00:00', false, '10:40:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-01', '[{"count":1,"notes":"June July Invoice Created and sent via mail","description":"CA Suyash Sir"},{"count":1,"notes":"July Invoice Created and sent via mail","description":"Advisor Alpha"},{"count":1,"notes":"Oorruu Media Sheets Updated","description":"Client Management"},{"count":1,"notes":"1 Reel Done","description":"Vanntagge CFO"}]'::jsonb, '', '2026-08-01T13:26:24.405517+00:00', '2026-08-01T13:26:23.868+00:00', false, '12:00:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-01', '[{"count":1,"notes":"1 informative reel dm","description":"Internal reel editing"},{"count":1,"notes":"narhare sir long video , Ai course","description":"Internal YouTube editing"},{"count":1,"notes":"DM info shoot, testimonial shoot","description":"Shoot"}]'::jsonb, '', '2026-08-01T13:40:55.171241+00:00', '2026-08-01T13:40:54.685+00:00', false, '10:20:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-01', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"}]'::jsonb, '', '2026-08-01T14:34:36.346696+00:00', '2026-08-01T14:34:36.219+00:00', false, '10:20:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-01', '[{"count":5,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Completed design creative","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Whatsapp group has created","description":"WhatsApp group creation"},{"count":1,"notes":"Designed one carousel","description":"Design"},{"count":2,"notes":"Designed static post","description":"Design"},{"count":1,"notes":"Link has made for webinar","description":"Zoom"}]'::jsonb, '', '2026-08-01T16:04:13.32866+00:00', '2026-08-01T16:04:13.213+00:00', false, '11:30:00', '19:46:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":23,"notes":"Fresh daily Calls Made","description":"Daily Calls"},{"count":30,"notes":"Daily Follow Ups calls","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-03T13:22:55.970469+00:00', '2026-08-03T13:22:55.422+00:00', false, '11:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":1,"notes":"Testimonials dm","description":"Internal reel editing"},{"count":5,"notes":"Ai course done","description":"Internal YouTube editing"},{"count":1,"notes":"Sharanam client shoot","description":"Shoot"}]'::jsonb, '', '2026-08-03T13:34:37.03933+00:00', '2026-08-03T13:34:36.912+00:00', false, '10:20:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":1,"notes":"Internal posting done","description":"Internal Posting"},{"count":1,"notes":"Leads management done","description":"Leads management"},{"count":1,"notes":"Comments done","description":"Comments"},{"count":1,"notes":"done","description":"Vanntagge CFO"},{"count":1,"notes":"content calender updaed of DM & Vanntagge","description":"content calender"},{"count":1,"notes":"assignement checked & Attendence marked","description":"LMS"}]'::jsonb, '', '2026-08-03T13:34:39.740074+00:00', '2026-08-03T13:34:39.216+00:00', false, '10:20:00', '19:31:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":1,"notes":"Follow Up for shoot","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up for Shoot","description":"Advisor Alpha"},{"count":1,"notes":"Shoot Done","description":"Sharnam Healing Centre"},{"count":1,"notes":"Shobha - Aragabatti and disposable item Manufacturer","description":"One Enquiry"}]'::jsonb, '', '2026-08-03T15:02:32.029503+00:00', '2026-08-03T15:02:31.84+00:00', false, '12:00:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":1,"notes":"fund added","description":"Ads reporting"},{"count":6,"notes":"lms issue, lms access","description":"Tech support"},{"count":48,"notes":"verification, msgs, access, few calls, amazon issues","description":"amazon"},{"count":1,"notes":"shoot, ad script, account access,","description":"pooja kadam"},{"count":1,"notes":"Strategy for lead gen ads","description":"CEMS"},{"count":1,"notes":"","description":"website issue"},{"count":1,"notes":"1 lecture to rpdm70","description":"lecture added"},{"count":16,"notes":"whatsapp api course upload on yt","description":"yt upload"}]'::jsonb, '', '2026-08-03T15:06:26.884072+00:00', '2026-08-03T15:06:26.709+00:00', false, '10:00:00', '20:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":3,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":1,"notes":"Posting has done","description":"Daily posting"},{"count":48,"notes":"Called for access","description":"Webinar management"},{"count":1,"notes":"Reminder has sent to some peoples","description":"Reminder management"},{"count":1,"notes":"Added peoples in groups","description":"Webinar management"},{"count":1,"notes":"Design static post","description":"Design"},{"count":1,"notes":"Carousel design is in progress","description":"Design"}]'::jsonb, '', '2026-08-03T15:38:37.912774+00:00', '2026-08-03T15:38:37.338+00:00', false, '10:53:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-03', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-03T18:00:38.039962+00:00', '2026-08-03T18:00:37.933+00:00', false, '10:30:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":11,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-04T13:28:35.191476+00:00', '2026-08-04T13:28:34.649+00:00', false, '10:40:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":1,"notes":"Follow Up for shoot rescheduled on thursday","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up about payment","description":"Advisor Alpha"},{"count":1,"notes":"2 Reels Done","description":"Oorruu Media"},{"count":1,"notes":"Done Meeting","description":"CEMS"},{"count":1,"notes":"1 Reel In progress","description":"Vanntagge CFO"}]'::jsonb, '', '2026-08-04T14:36:39.706243+00:00', '2026-08-04T14:36:39.576+00:00', false, '10:30:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":4,"notes":"Lms issue, amazon issue","description":"Tech support"},{"count":1,"notes":"Meeting","description":"Cems"},{"count":1,"notes":"Cultural 1","description":"Shoot"},{"count":1,"notes":"Co ordination for linkedin access","description":"Pooja kadam"},{"count":1,"notes":"Rohan & saurbh designs destribution","description":"Task assigned"}]'::jsonb, '', '2026-08-04T14:39:35.240189+00:00', '2026-08-04T14:39:34.684+00:00', false, '10:30:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":20,"notes":"","description":"Daily Calls"},{"count":7,"notes":"","description":"Daily Follow-up"},{"count":2,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-04T14:55:51.385493+00:00', '2026-08-04T14:55:50.833+00:00', false, '10:09:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":2,"notes":"Scgt ad  , one video in progress cultural reel","description":"Internal reel editing"},{"count":4,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb, '', '2026-08-04T15:44:48.802656+00:00', '2026-08-04T15:44:48.309+00:00', false, '10:15:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":4,"notes":"Cultural reel shoot","description":"Shoot"},{"count":1,"notes":"Client meeting, team meeting","description":"Other"},{"count":1,"notes":"Dm script done","description":"Script"}]'::jsonb, '', '2026-08-04T15:47:51.266415+00:00', '2026-08-04T15:58:15.929+00:00', false, '09:15:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-04', '[{"count":5,"notes":"Completed cultural shoots","description":"Shoot"},{"count":1,"notes":"Designed banner","description":"Design"},{"count":1,"notes":"Designed ad creative","description":"Design"},{"count":1,"notes":"Attended the cems meeting","description":"Other"}]'::jsonb, '', '2026-08-04T17:51:53.922732+00:00', '2026-08-04T17:51:53.379+00:00', false, '11:28:00', '19:46:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-05', '[{"count":1,"notes":"1 Reel Done, Payment Follow Up Done","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up for Shoot Done","description":"Advisor Alpha"},{"count":2,"notes":"Updated Oorruu media Management Sheet, Follow Up with Rohan Ghate","description":"Client Management"},{"count":2,"notes":"2 Reels Done, Made 2 Invoices Of July Month","description":"Vanntagge CFO"}]'::jsonb, '', '2026-08-05T13:33:02.536813+00:00', '2026-08-05T13:35:53.827+00:00', false, '10:40:00', '19:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-05', '[{"count":3,"notes":"2 cultural reel , 1 dm informative","description":"Internal reel editing"},{"count":1,"notes":"Client shoot, Dm informative shoot","description":"shoot"}]'::jsonb, '', '2026-08-05T13:37:40.923775+00:00', '2026-08-05T13:37:40.411+00:00', false, '10:04:00', '07:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-05', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"Posting","description":"Vanntagge CFO"},{"count":1,"notes":"Ad Scripts","description":"Magnova IQ"},{"count":1,"notes":"Assisted in shoot","description":"Shoot"},{"count":1,"notes":"Ad script","description":"CEMS"},{"count":1,"notes":"Posting","description":"Oorruu media"}]'::jsonb, '', '2026-08-05T15:51:27.765152+00:00', '2026-08-05T15:51:27.241+00:00', false, '10:05:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-05', '[{"count":2,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed ad creatives for CEMS","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Carousel designing is in progress","description":"Design"}]'::jsonb, '', '2026-08-05T17:22:46.202807+00:00', '2026-08-05T17:22:46.072+00:00', false, '11:29:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-06', '[{"count":8,"notes":"Fresh daily calls","description":"Daily Calls"},{"count":15,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":3,"notes":"Dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-06T13:41:19.311951+00:00', '2026-08-06T13:41:18.788+00:00', false, '11:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-06', '[{"count":3,"notes":"Lms issue, lms access","description":"Tech support"},{"count":2,"notes":"1 issue, 1 access","description":"Amazon"},{"count":1,"notes":"Ad campaign with shreya, account access","description":"CEMS"},{"count":1,"notes":"","description":"Enrollment call"}]'::jsonb, '', '2026-08-06T14:10:13.32177+00:00', '2026-08-06T14:10:13.204+00:00', false, '10:25:00', '20:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-06', '[{"count":1,"notes":"Team Meeting","description":"Meeting"},{"count":1,"notes":"","description":"Wifi Issue Mule Kam Zala Nahi"},{"count":1,"notes":"1 Reel In Progress","description":"Vanntagge CFo"}]'::jsonb, '', '2026-08-06T14:10:56.59599+00:00', '2026-08-06T14:10:56.124+00:00', false, '10:25:00', '19:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-06', '[{"count":1,"notes":"CEMS meta ad campaign","description":"Meta ad"},{"count":1,"notes":"CEMS wp automation","description":"Automation"}]'::jsonb, '', '2026-08-06T17:11:26.454956+00:00', '2026-08-06T17:11:26.322+00:00', false, '10:15:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-06', '[{"count":1,"notes":"Designed webinar creative","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"}]'::jsonb, '', '2026-08-06T17:26:24.123953+00:00', '2026-08-06T17:26:23.611+00:00', false, '11:20:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-07', '[{"count":2,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-07T13:30:38.954942+00:00', '2026-08-07T13:30:38.404+00:00', false, '11:00:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-07', '[{"count":1,"notes":"Shoot & Payment Follow Up","description":"CA Suyash Sir"},{"count":1,"notes":"Oorruu Media Bill Sheet Updated","description":"Client Management"},{"count":2,"notes":"1 Reel Done, Payment Cleared","description":"Vanntagge CFO"},{"count":1,"notes":"2 Reels Done","description":"Amulya Gems"}]'::jsonb, '', '2026-08-07T14:15:56.998393+00:00', '2026-08-07T14:15:56.873+00:00', false, '10:25:00', '19:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-07', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"7","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-07T15:21:02.877949+00:00', '2026-08-07T15:21:02.743+00:00', false, '10:49:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-07', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Dm script"},{"count":1,"notes":"Scripting done","description":"Magnova iq"},{"count":1,"notes":"Vanntagge posting","description":"Posting"},{"count":1,"notes":"Leads management and sheet creation and updation","description":"CEMS"}]'::jsonb, '', '2026-08-07T17:03:21.584556+00:00', '2026-08-07T17:03:21.463+00:00', false, '22:28:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-07', '[{"count":3,"notes":"Dm cultural, dm informative , 1 cultural in progress","description":"Internal reel editing"},{"count":2,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb, '', '2026-08-07T17:06:02.685275+00:00', '2026-08-07T17:06:02.557+00:00', false, '10:28:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-08', '[{"count":6,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-08T13:13:40.826391+00:00', '2026-08-08T13:13:40.703+00:00', false, '09:57:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-08', '[{"count":1,"notes":"Follow Up regarding Shoot","description":"CA Suyash Sir"},{"count":1,"notes":"2 Reels Done","description":"Amulya Gems"},{"count":1,"notes":"Meeting Done","description":"Vanntagge CFO"},{"count":1,"notes":"","description":"Calling New lead For Video Editng Done"},{"count":1,"notes":"7 Ads And 1 Landing Page Video Shoot","description":"Magnova IQ"}]'::jsonb, '', '2026-08-08T13:50:01.610931+00:00', '2026-08-08T13:50:01.493+00:00', false, '10:25:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-08', '[{"count":3,"notes":"","description":"LMS Amazon Issue"},{"count":1,"notes":"Meeting Done","description":"Vanntagee CFO"},{"count":1,"notes":"9 Scripts Done","description":"Magnova IQ"},{"count":1,"notes":"Follow up and 1 Script Done","description":"Pooja kadam"}]'::jsonb, '', '2026-08-08T14:00:35.828157+00:00', '2026-08-08T14:01:31.797+00:00', false, '10:25:00', '19:40:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-08', '[{"count":2,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":3,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Group has created","description":"WhatsApp group creation"},{"count":3,"notes":"Link prepared","description":"Zoom"}]'::jsonb, '', '2026-08-08T17:55:45.22158+00:00', '2026-08-08T17:55:44.698+00:00', false, '10:04:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-10', '[{"count":12,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":20,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-10T13:22:26.370141+00:00', '2026-08-10T13:22:26.247+00:00', false, '09:51:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-10', '[{"count":1,"notes":"Follow Up about shoot and payment","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up done","description":"Advisor Alpha"},{"count":1,"notes":"CA Prakash Kumavat and Soumitra Chatterjee Follow Up Done","description":"Client Management"},{"count":1,"notes":"Landing page Video Done, 1 eng ad in progress","description":"Magnova IQ"},{"count":1,"notes":"Raigad Trip Planning","description":"Meeting"}]'::jsonb, '', '2026-08-10T13:23:23.084604+00:00', '2026-08-10T13:23:22.967+00:00', false, '10:20:00', '19:10:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-10', '[{"count":3,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Content for landing page","description":"MagnovaIQ"},{"count":1,"notes":"For sayli","description":"Learners sheet"},{"count":40,"notes":"Verification, course access, sheet, msgs, calls","description":"Amazon"}]'::jsonb, '', '2026-08-10T13:41:29.649086+00:00', '2026-08-10T13:41:29.105+00:00', false, '10:20:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-10', '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-10T14:31:48.494577+00:00', '2026-08-10T14:31:47.957+00:00', false, '10:16:00', '19:55:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-11', '[{"count":1,"notes":"Follow up regarding product shoot","description":"Shubhash Shrivastav"},{"count":2,"notes":"Meeting At CEMS, Powai, Soumitra Chatterjjee Meeting Scheduling","description":"Client Management"},{"count":1,"notes":"1 meme reel done","description":"DM"},{"count":1,"notes":"1 meme reel done","description":"Oorruu"},{"count":1,"notes":"1 Ad in progress","description":"MagnovaIQ"},{"count":1,"notes":"Scheduling Shoot at Thursday at Mulund","description":"Vanntagge CFO"}]'::jsonb, '', '2026-08-11T13:04:17.191766+00:00', '2026-08-11T13:04:16.696+00:00', false, '09:30:00', '18:45:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-11', '[{"count":22,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-11T13:32:58.353713+00:00', '2026-08-11T13:32:58.203+00:00', false, '09:51:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-11', '[{"count":2,"notes":"2 AI testimonials","description":"Internal reel editing"},{"count":1,"notes":"CEMS meeting powai","description":"Other"}]'::jsonb, '', '2026-08-11T14:11:11.596644+00:00', '2026-08-11T14:11:11.468+00:00', false, '09:45:00', '08:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-11', '[{"count":4,"notes":"Designed header and footer","description":"Design"},{"count":2,"notes":"Designed the ad creative","description":"Design"},{"count":1,"notes":"Attended the meeting at CEMS","description":"Other"}]'::jsonb, '', '2026-08-11T14:26:57.220649+00:00', '2026-08-11T14:26:57.112+00:00', false, '11:00:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-11', '[{"count":1,"notes":"1 script from rushi sir","description":"Content scripting"},{"count":1,"notes":"Fund check, ad campaign check for cems","description":"Ads reporting"},{"count":2,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Ringing","description":"Enrollment call"},{"count":1,"notes":"Meeting at cems","description":"CEMS"},{"count":1,"notes":"Ad campaign discussion, details, content followup","description":"Pooja kadam"},{"count":1,"notes":"Landing page changes to Dinesh","description":"MagnovaIQ"}]'::jsonb, '', '2026-08-11T15:41:04.351514+00:00', '2026-08-11T15:41:03.858+00:00', false, '09:35:00', '20:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-11', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Campaign setup and published for cems","description":"Meta"},{"count":1,"notes":"CEMS meeting at powai","description":"Other"},{"count":1,"notes":"Documeted the plan and requirements of  cems  discussed in the meeting nd shared with rohan","description":"Other"}]'::jsonb, '', '2026-08-11T16:28:39.41896+00:00', '2026-08-11T16:48:28.266+00:00', false, '09:45:00', '20:46:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-12', '[{"count":12,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-12T13:11:21.972493+00:00', '2026-08-12T13:11:48.657+00:00', false, '10:05:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-12', '[{"count":1,"notes":"Follow Up shoot Scheduled on thursday","description":"Advisor Alpha"},{"count":1,"notes":"Meering with soumitra chatterjee","description":"Client Management"},{"count":2,"notes":"1 AD Done, 1 in progress","description":"MagnovaIQ"}]'::jsonb, '', '2026-08-12T13:42:28.215927+00:00', '2026-08-12T13:42:28.068+00:00', false, '09:56:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-12', '[{"count":1,"notes":"whats app ads with ayush and arya, cems ad check with shreya, ad creative instructions to ayush arya rohan","description":"Ads reporting"},{"count":5,"notes":"lms issue, lms suspend,unsuspend","description":"Tech support"},{"count":1,"notes":"lead reply and amazon queries","description":"Regular"},{"count":1,"notes":"for 20 august program","description":"form & msg"},{"count":1,"notes":"research for campaign","description":"pooja kadam"}]'::jsonb, '', '2026-08-12T13:56:05.214776+00:00', '2026-08-12T13:56:04.661+00:00', false, '09:55:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-12', '[{"count":1,"notes":"18","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-12T15:45:39.555697+00:00', '2026-08-12T15:45:39.071+00:00', false, '10:06:00', '19:17:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-12', '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Campaign updated","description":"Cems"},{"count":1,"notes":"Made creative design and published campaign","description":"Saturday club"},{"count":1,"notes":"Done","description":"Dm script"}]'::jsonb, '', '2026-08-12T17:58:26.82696+00:00', '2026-08-12T17:58:26.322+00:00', false, '22:12:00', '19:20:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-13', '[{"count":1,"notes":"Shoot at Marol -01","description":"Advisor Alpha"},{"count":1,"notes":"Shoot at office -08","description":"Vanntagge CFO"}]'::jsonb, '', '2026-08-13T13:23:19.224243+00:00', '2026-08-13T13:23:19.1+00:00', false, '07:55:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-14', '[{"count":20,"notes":"fresh daily call made","description":"Daily Calls"},{"count":40,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":5,"notes":"Dm Enrollment","description":"DM Enrollment"}]'::jsonb, '', '2026-08-14T13:24:29.152387+00:00', '2026-08-14T13:24:29.029+00:00', false, '10:00:00', '19:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-14', '[{"count":1,"notes":"1 ad done","description":"MagnovaIQ"},{"count":1,"notes":"banner setup, staircase vr carpet takala, independance day calebration","description":"extra work"}]'::jsonb, '', '2026-08-14T14:33:46.095319+00:00', '2026-08-14T14:33:45.584+00:00', false, '10:40:00', '20:15:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-14', '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb, '', '2026-08-14T14:50:05.680277+00:00', '2026-08-14T14:50:05.553+00:00', false, '08:51:00', '19:00:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, '2026-08-14', '[{"count":1,"notes":"CEMS reel, independence day reel","description":"Internal reel editing"},{"count":1,"notes":"Dm testimonials in progress","description":"Internal YouTube editing"},{"count":1,"notes":"Prashant sir shoot","description":"Shoot"}]'::jsonb, '', '2026-08-14T15:29:16.628387+00:00', '2026-08-14T15:29:16.501+00:00', false, '10:00:00', '20:30:00', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


-- 4. Employee Attendance

INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-08', NULL, NULL, 'leave', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('test@gmail.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('test@gmail.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-16', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-17', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-18', NULL, NULL, 'wfh', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-02', NULL, NULL, 'leave_pending', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-21', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-29', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-05-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-08', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-09', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-19', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-20', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-22', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-24', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-26', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-27', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-30', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-06-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-08', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-09', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-13', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-15', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-16', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-17', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-17', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-18', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-20', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-20', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-21', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-21', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-22', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-22', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-02', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-18', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-23', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-24', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-24', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('swapnil@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-27', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-27', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-28', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-29', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-29', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-30', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-31', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-25', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-07-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-01', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-01', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-03', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-04', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-05', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-05', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-06', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-07', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-08', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-10', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-11', NULL, NULL, 'half_day', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('rohan@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-11', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('pooja@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-12', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('shreya@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-13', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('naveen@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('kedar@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('poonam@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, '2026-08-14', NULL, NULL, 'present', NULL
FROM profiles p
WHERE LOWER(p.email) = LOWER('suyog@rushipandit.com')
ON CONFLICT (employee_id, date) DO NOTHING;
