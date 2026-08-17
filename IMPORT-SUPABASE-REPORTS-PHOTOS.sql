-- ============================================================
-- Supabase Data Import Migration
-- ============================================================

-- 1. Profiles

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  'eefac9b6-be46-4c14-981f-3403c4ba1277',
  'krish.rushipandit@gmail.com',
  'krish.rushipandit',
  'admin',
  '',
  '',
  '',
  '9768726006',
  '',
  NULL,
  false,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);


INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  'shreya@rushipandit.com',
  'Shreya Sargade',
  'employee',
  'Marketing',
  'Marketing Executive',
  '8169014515',
  '8169014515',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/ru8q3jpc39.jpeg',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/ru8q3jpc39.jpeg' WHERE LOWER(email) = LOWER('shreya@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '98fdccc3-9c13-4d3c-907d-ff437e4370a9',
  'test@gmail.com',
  'TEST',
  'employee',
  '',
  '',
  '9768726006',
  '1234567891',
  '',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);


INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'kedar@rushipandit.com',
  'Kedar Lokhande',
  'employee',
  'Media',
  'Co-Founder - OORRUU Media',
  '9324792360',
  '9324792360',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/qvg5bfdwdrj.png',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/qvg5bfdwdrj.png' WHERE LOWER(email) = LOWER('kedar@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  'e937b4f3-360b-4cc4-a91a-b771ea89af59',
  'krish.agnomatic@gmail.com',
  'Krish',
  'employee',
  'IT',
  '',
  '',
  '9702446345',
  '',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);


INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  'ac514dd5-10d9-4d36-b443-c2799389f61e',
  'rushikesh@rushipandit.com',
  'Rushikesh Pandit',
  'admin',
  '',
  'Founder',
  '8850089289',
  '8850089289',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/yr3hueegfm.png',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/yr3hueegfm.png' WHERE LOWER(email) = LOWER('rushikesh@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '99a0589a-4b5b-4280-ab6d-8cb2e42696b7',
  'shridhar@rushipandit.com',
  'Shridhar Pandit',
  'employee',
  'Sales',
  'HR',
  '7757898267',
  '7757898267',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/32ucyhvj0ch.png',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/32ucyhvj0ch.png' WHERE LOWER(email) = LOWER('shridhar@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  'pooja@rushipandit.com',
  'Pooja Mali',
  'employee',
  'Operations',
  'Operations Manager ',
  '8779668655',
  '8779668655',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/ti5q5aw2t7.png',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/ti5q5aw2t7.png' WHERE LOWER(email) = LOWER('pooja@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'rohan@rushipandit.com',
  'Rohan Solunke',
  'employee',
  'Design',
  'Creative Designer',
  '8369536422',
  '8369536422',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/8rqidp7vmmk.jpeg',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/8rqidp7vmmk.jpeg' WHERE LOWER(email) = LOWER('rohan@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  'poonam@rushipandit.com',
  'Poonam Gaikwad',
  'employee',
  'Sales',
  'Sales Executive',
  '8452074170',
  '8452074170',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/2yrz61m55xy.png',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/2yrz61m55xy.png' WHERE LOWER(email) = LOWER('poonam@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  'swapnil@rushipandit.com',
  'Swapnil Baviskar',
  'employee',
  'Operations',
  'Operations Executive ',
  '9371919222',
  '9371919222',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/oh1irfvuaz.jpeg',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/oh1irfvuaz.jpeg' WHERE LOWER(email) = LOWER('swapnil@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  'suyog@rushipandit.com',
  'Suyog Rane',
  'employee',
  'Business',
  'Video Editor',
  '9221874960',
  '9221874960',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/v8h5sji5nlc.PNG',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/v8h5sji5nlc.PNG' WHERE LOWER(email) = LOWER('suyog@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  'naveen@rushipandit.com',
  'Naveen Sharma',
  'employee',
  'Sales',
  'Sales Executive',
  '9987475537',
  '92843 84859',
  'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/falj6nmulg7.jpg',
  NULL,
  true,
  '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe'
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);

UPDATE profiles SET avatar_url = 'https://musdztcockuvjiaqymva.supabase.co/storage/v1/object/public/avatars/falj6nmulg7.jpg' WHERE LOWER(email) = LOWER('naveen@rushipandit.com') AND (avatar_url IS NULL OR avatar_url = '');

-- 2. Employee Responsibilities

INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'b8b8ed79-5575-45f9-a290-626e95c81445',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  'Daily Calls',
  NULL,
  15,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'dff3e6ba-60bb-475a-b2d5-f12df1e2e114',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  'Daily Follow-up',
  NULL,
  25,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'aa943fda-d5ac-4327-a6e8-160c95b55db8',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  'DM Enrollment',
  NULL,
  15,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '11d0f089-c62c-4c05-883f-7a2fbb4d06a5',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  'Amazon Enrollment',
  NULL,
  10,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '9a93d98f-2580-4365-9ee3-f834a2ac7427',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  'Internal reel editing',
  NULL,
  4,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '0448279c-591b-42f4-babf-12c513253911',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  'Internal YouTube editing',
  NULL,
  1,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '46cb20d9-86b4-4332-8e49-28f5ee9be80c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  'Client posting',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'bcdaec0f-cf23-4271-849b-2e9a9dae1fae',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  'Content scripting',
  NULL,
  3,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '2bdba8aa-e825-4de4-96c6-79e2651e7dfe',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  'Ads reporting',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '4a73d2f4-2e32-4f50-822e-2eca4412ed7a',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  'Tech support',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '89519570-eb99-445b-bde5-c7f1f2a548b8',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'Shoot',
  NULL,
  5,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '537fac4a-9b9e-454b-bb16-87731c0779be',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'Design',
  NULL,
  2,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '08b9cb69-d7cc-44e0-b594-4e63f27dfc9a',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'Daily posting',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'ebe8310b-48e9-4de1-b557-13e38cc58bb2',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'Webinar management',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '9c974107-fde4-48d5-9b5e-7c4cddd5b4ec',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'Reminder management',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'c26acfdf-4553-4e71-a807-de03d71058a8',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'WhatsApp group creation',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '429632f1-f275-4953-8727-3c92cca39b95',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  'Webinar coordination',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'a747f1d0-cba6-4bc2-9e3f-cd704db7d212',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  'Content scripting',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '9274249e-becb-45f3-9c18-0a31abceb3e5',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  'Shooting',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '139aa423-e385-4941-aab3-8416b283dd89',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  'Google posting replies',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'fa33ef42-2be4-4586-8810-d3d689600a05',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  'Internal Posting',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '39533ab6-9afa-4e0e-8981-fb71ce252a72',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  'Leads management',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'e7d15d2c-764b-435b-9d24-a6f6a4cad166',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  'Comments',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '29e4fec3-eba2-48d2-bbd8-cb29d8e6c5cb',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  'Prospects',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'e6a83bb0-217a-4ca4-889c-8aa2b7fdb20b',
  '99a0589a-4b5b-4280-ab6d-8cb2e42696b7',
  'SM calling',
  NULL,
  10,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '0c005cec-d787-469c-9beb-59f6fca78d7b',
  '99a0589a-4b5b-4280-ab6d-8cb2e42696b7',
  'SM follow up',
  NULL,
  20,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'e177140c-7ce8-41fe-ae78-e993b49fdfc9',
  '99a0589a-4b5b-4280-ab6d-8cb2e42696b7',
  'SM Target',
  NULL,
  15,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '1ba1e3af-3a57-44ea-a4b1-6cb2ae6b2da9',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  'Daily Calls',
  NULL,
  15,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'e122dd1e-a520-4b5b-83bf-f82cd14e1c8b',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  'Daily Follow-up',
  NULL,
  25,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '86db8b40-2590-492c-8d9a-1b10993533bc',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  'DM Enrollment',
  NULL,
  15,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'e622062e-955f-4869-b31e-7064b4eb77e1',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  'Amazon Enrollment',
  NULL,
  10,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'f5ad77e7-56df-48b5-b214-65309482ba64',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'CA Suyash Sir',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  'be5fde5a-d52a-4e2f-9d1b-1220f9d88c1b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'Advisor Alpha',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '91484338-f827-4396-a458-27b9b0ec7b07',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'Amicus Claims',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '81dbab2a-fca0-424e-9426-87f3864a203b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'MBC',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '7fa8acdd-e3ed-47f7-b9ad-a629645808d6',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'Karrier',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '7a56933d-18dc-44a1-88df-26b2ea47cf5e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'Shubhash Shrivastav',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  '6e6184d5-01fd-442f-b1be-16afd24c5cc9',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  'Client Management',
  NULL,
  0,
  'daily',
  true
)
ON CONFLICT (id) DO NOTHING;


-- 3. Daily Reports

INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a57c0d57-d2ac-4d3b-aa47-328ac9c00bf0',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-11',
  '[{"count":3,"notes":"Scripts Sarvam AI, Trends in AI in 2026 (2 scripts)","description":"Content scripting"},{"count":0,"notes":"No Shoot today","description":"Shooting"},{"count":12,"notes":"Done","description":"Google posting replies"},{"count":11,"notes":"Agnomatic prospects data collection 11 email id updated","description":"Agnomatic prospects data collection 11 email id updated"}]'::jsonb,
  '',
  '2026-05-11T12:59:22.696745+00:00',
  '2026-05-11T13:44:33.088+00:00',
  false,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '23c7b6a7-abe7-4a41-9c0a-65864018f133',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-11',
  '[{"count":1,"notes":"Oorruu Media ad done","description":"Internal reel editing"},{"count":1,"notes":"SM long video done","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-05-11T12:58:03.178477+00:00',
  '2026-05-11T12:59:24.178+00:00',
  false,
  '10:13:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f5d7817b-69d5-4d88-9db8-b36aa9b46964',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-11',
  '[{"count":1,"notes":"Mbc","description":"Client posting"},{"count":4,"notes":"Lms issues","description":"Tech support"},{"count":1,"notes":"Amicus claims content strategy and content calendar created","description":"Content planning"},{"count":1,"notes":"Post boost done","description":"CA"},{"count":10,"notes":"Amazon calls, welcome calls","description":"Calls"}]'::jsonb,
  '',
  '2026-05-11T12:59:38.718408+00:00',
  '2026-05-11T16:03:42.422+00:00',
  false,
  '10:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '119c0ece-17b5-4718-a721-f836d2829e02',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-11',
  '[{"count":15,"notes":"Made daily calls","description":"Daily Calls"},{"count":33,"notes":"Completed daily follow-ups","description":"Daily Follow-up"},{"count":2,"notes":"Completed DM enrollments","description":"DM Enrollment"},{"count":0,"notes":"Completed Amazon enrollments","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-11T12:33:01.137576+00:00',
  '2026-05-11T13:04:29.248+00:00',
  false,
  '12:00:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '554b603c-57fa-4d97-ae07-8699b758cf0f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-11',
  '[{"count":1,"notes":"Follow up with Hemant sir regarding the content planning meeting, CA suyash sir follow up regarding the post boosting, and follow up with Raunaq sir regarding payment, Meeting With Rutuj Sir About Content Planning","description":"Client management"},{"count":1,"notes":"1 MBC reel done,","description":"Client reel editing"},{"count":1,"notes":"1 Video of Amicus","description":"Client YouTube editing"},{"count":1,"notes":"Ordered 1 Tripod","description":"Ordered 1 Tripod"},{"count":1,"notes":"Report Structure Meeting","description":"Report Structure Meeting"}]'::jsonb,
  '',
  '2026-05-11T11:02:10.810317+00:00',
  '2026-05-11T14:20:22.689+00:00',
  false,
  '10:10:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a5489b1d-d3f8-4427-918b-039b2273897d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-11',
  '[{"count":5,"notes":"","description":"Daily Calls"},{"count":1,"notes":"","description":"Daily Follow-up"},{"count":1,"notes":"","description":"DM Enrollment"},{"count":1,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  ' ',
  '2026-05-11T13:02:13.379299+00:00',
  '2026-05-11T13:07:26.421+00:00',
  false,
  '10:30:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6568d0b0-e1d0-4590-98a4-c0d1c0c29095',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-11',
  '[{"count":2,"notes":"Designed posts for  agnomatic","description":"Design"},{"count":1,"notes":"Did daily posting","description":"Daily posting"},{"count":1,"notes":"Created WhatsApp group","description":"WhatsApp group creation"},{"count":3,"notes":"Created thumbnails for share market","description":"Thumbnail creation"},{"count":2,"notes":"Createdu design posts for Anubhuti yoga","description":"Design"}]'::jsonb,
  '',
  '2026-05-11T13:04:12.871087+00:00',
  '2026-05-11T13:07:30.128+00:00',
  false,
  '11:50:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '043bbb8b-591d-4db3-aa17-bc007242dc69',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-11',
  '[{"count":1,"notes":"Not assigned till now","description":"Internal Posting"},{"count":1,"notes":"Not assigned till now","description":"Leads management"},{"count":1,"notes":"Not assigned till now","description":"Comments"},{"count":15,"notes":"Done","description":"Prospects"}]'::jsonb,
  '',
  '2026-05-11T13:00:39.491331+00:00',
  '2026-05-11T13:26:34.234+00:00',
  false,
  '10:10:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'bbca0d29-2741-4723-bbd5-c78fe534193e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-12',
  '[{"count":37,"notes":"Made daily calls","description":"Daily Calls"},{"count":3,"notes":"Did daily follow-ups","description":"Daily Follow-up"},{"count":0,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-12T12:55:33.255897+00:00',
  '2026-05-12T12:55:32.71+00:00',
  false,
  '10:00:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '59aee330-2e3f-4b3a-9a94-0d437a4401f6',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-12',
  '[{"count":3,"notes":"scripts - data centre in space, paperclip AI tool, DM ad","description":"Content scripting"},{"count":6,"notes":"done","description":"Shooting"},{"count":13,"notes":"Agnomatic prospects data","description":"Agnomatic prospects data"},{"count":3,"notes":"placement agencies data","description":"placement agencies data"}]'::jsonb,
  '',
  '2026-05-12T12:46:07.378447+00:00',
  '2026-05-12T12:50:07.937+00:00',
  false,
  '10:19:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2202ddde-fc73-4112-9b5a-c67bd1e2b5c2',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-12',
  '[{"count":6,"notes":"Completed six shoots","description":"Shoot"},{"count":1,"notes":"Created design for Anubhuti Yoga","description":"Design"},{"count":1,"notes":"Daily posting for RP World Trade","description":"Daily posting"},{"count":0,"notes":"","description":"Webinar management"},{"count":1,"notes":"Sent reminder to webinar group","description":"Reminder management"},{"count":2,"notes":"Created thumbnails for SM and Agnomatic","description":"Design"}]'::jsonb,
  '',
  '2026-05-12T12:45:24.921314+00:00',
  '2026-05-12T12:50:44.36+00:00',
  false,
  '10:50:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f19b3acd-19c0-4447-99af-95ea54c60151',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-12',
  '[{"count":3,"notes":"Suyash sir reel , RP dm reel , making changes in agnomatic reel","description":"Internal reel editing"},{"count":1,"notes":"In progress","description":"Id card design"}]'::jsonb,
  '',
  '2026-05-12T13:37:44.166828+00:00',
  '2026-05-12T13:37:44.058+00:00',
  false,
  '10:10:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4ee1600d-efb9-4da8-92b0-67841f72cd4e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-12',
  '[{"count":1,"notes":"Follow Up with Raunaq About Payment, Rutuj''s Bag Shoot Shoot Scheduling, Meeting Done with Hemant sir regarding the Content planning, Made April Invoice of Content creation For MBC","description":"Client management"},{"count":1,"notes":"1 YT video Of Amicus","description":"Client reel editing"},{"count":1,"notes":"","description":"ID Design Ideation & Alteration"},{"count":1,"notes":"","description":"Researched some ideas for ad shoot of Shubhash sir and Rutuj Sir"}]'::jsonb,
  '',
  '2026-05-12T12:25:59.393779+00:00',
  '2026-05-12T14:40:06.208+00:00',
  false,
  '10:42:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e77ab40b-1d85-4249-a7ec-554cb7c3c90e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-12',
  '[{"count":0,"notes":"not assingned yet","description":"Internal Posting"},{"count":0,"notes":"not assingned yet","description":"Leads management"},{"count":0,"notes":"not assingned yet","description":"Comments"},{"count":0,"notes":"done","description":"Prospects"},{"count":1,"notes":"created and launched facebook campaign","description":"facebook campaign"},{"count":0,"notes":"collected products videos from internet for posting","description":"social media"}]'::jsonb,
  '',
  '2026-05-12T13:36:52.959695+00:00',
  '2026-05-12T13:38:07.525+00:00',
  false,
  '10:10:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c11503b5-c5c6-445a-a2e2-84bf964aed35',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-12',
  '[{"count":2,"notes":"lms issue","description":"Tech support"},{"count":1,"notes":"brochure changes done","description":"canva"},{"count":1,"notes":"upload, replies, fund check","description":"leads"},{"count":20,"notes":"emails sent, new added for next","description":"agnomatic outreach"}]'::jsonb,
  '',
  '2026-05-12T13:53:04.331075+00:00',
  '2026-05-12T14:28:46.03+00:00',
  false,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '542b23b5-041c-4ead-8229-36b1ffe8b89a',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-12',
  '[{"count":10,"notes":"","description":"Daily Calls"},{"count":10,"notes":"","description":"Daily Follow-up"},{"count":2,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"},{"count":1,"notes":"","description":"Today''s Visit 1"},{"count":5,"notes":"","description":"Total Visits"}]'::jsonb,
  '',
  '2026-05-12T16:50:14.4069+00:00',
  '2026-05-12T16:50:14.303+00:00',
  false,
  '10:30:00',
  '18:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ce762af5-e60b-4fc1-a751-fec3fd76c6d7',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-13',
  '[{"count":1,"notes":"Studio setup at his home","description":"Shubhash Shrivastav"},{"count":1,"notes":"Shoot for sesa ayurvedic hair oil done at Malad.","description":"Client Management"}]'::jsonb,
  '',
  '2026-05-13T14:31:21.11116+00:00',
  '2026-05-13T14:31:20.986+00:00',
  false,
  '10:33:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b0ce55c7-b1f9-425f-93a9-5f45e3a8f45e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-14',
  '[{"count":10,"notes":"daily fresh calls made","description":"Daily Calls"},{"count":5,"notes":"daily follow up calls made","description":"Daily Follow-up"},{"count":0,"notes":"dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-14T13:17:45.130447+00:00',
  '2026-05-14T13:17:45.031+00:00',
  false,
  '09:50:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '817cb5d0-1899-4eb7-9944-049b8bc7c3c2',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-14',
  '[{"count":1,"notes":"rushi sir marathi video , Dm lecture cutting","description":"Internal reel editing"},{"count":6,"notes":"5 videos done and 1 in process","description":"Amazon lecture editing"}]'::jsonb,
  '',
  '2026-05-14T13:24:26.919669+00:00',
  '2026-05-14T13:24:26.794+00:00',
  false,
  '10:05:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '14138c20-ee75-4fbf-ba0b-c52829e55b57',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-14',
  '[{"count":1,"notes":"not assigned yet","description":"Internal Posting"},{"count":1,"notes":"not assigned yet","description":"Leads management"},{"count":1,"notes":"not assigned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"posting done( indiamarts)","description":"social media"},{"count":1,"notes":"collected products videso from internet (indiamarts)","description":"social media"},{"count":1,"notes":"created social media post of amicus","description":"creative design"}]'::jsonb,
  '',
  '2026-05-14T13:17:29.239353+00:00',
  '2026-05-14T13:21:59.617+00:00',
  false,
  '10:05:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b31cdb00-4e02-4e72-a730-9ec0f98f3b58',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-14',
  '[{"count":1,"notes":"-","description":"CA Suyash Sir"},{"count":1,"notes":"Changes In 4 Ads","description":"Advisor Alpha"},{"count":1,"notes":"Content Review","description":"Amicus Claims"},{"count":1,"notes":"-","description":"MBC"},{"count":1,"notes":"Meeting With Rutuj Regarding The Content Shoot","description":"Karrier"},{"count":1,"notes":"-","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"Tried To make ID Lanyard On CorelDraw & Canva"}]'::jsonb,
  '',
  '2026-05-14T14:51:05.064824+00:00',
  '2026-05-14T14:51:04.945+00:00',
  false,
  '10:27:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '76d77bec-2d5e-45d3-a8af-579efc981a37',
  '98fdccc3-9c13-4d3c-907d-ff437e4370a9',
  '2026-05-13',
  '[{"count":1,"notes":"test","description":"re"}]'::jsonb,
  '',
  '2026-05-13T09:19:07.460143+00:00',
  '2026-05-13T09:19:07.353+00:00',
  false,
  NULL,
  NULL,
  'test'
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2bc34353-b8b3-4869-ac86-53f659276eeb',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-13',
  '[{"count":1,"notes":"not assingned yet","description":"Internal Posting"},{"count":1,"notes":"not assingned yet","description":"Leads management"},{"count":1,"notes":"not assingned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"collected products videos from intrenet for posting","description":"social media"}]'::jsonb,
  '',
  '2026-05-13T13:23:47.941535+00:00',
  '2026-05-13T13:23:47.831+00:00',
  false,
  '10:10:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '927bb90d-d219-47d7-a31b-b1d3f639fbd8',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-13',
  '[{"count":4,"notes":"4 Scripts. 1 Openclae AI tool. 2 RPDM ad script. 1 Agnomatic ad script","description":"Content scripting"},{"count":12,"notes":"done","description":"Google posting replies"},{"count":12,"notes":"","description":"Agnomatic prospects"}]'::jsonb,
  '',
  '2026-05-13T13:26:34.98529+00:00',
  '2026-05-13T13:28:26.007+00:00',
  false,
  '10:20:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '83c83680-7eb7-4a31-927a-ea6ba3370667',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-13',
  '[{"count":2,"notes":"mbc, ca","description":"Client posting"},{"count":2,"notes":"lms sususpend","description":"Tech support"},{"count":1,"notes":"yt & IG audit for rp & growth strategy","description":"content strategy"},{"count":1,"notes":"service export research","description":"research"},{"count":1,"notes":"leads, replies, daily posting","description":"other"}]'::jsonb,
  '',
  '2026-05-13T13:29:36.297538+00:00',
  '2026-05-13T13:29:36.191+00:00',
  false,
  '10:00:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8afe1521-3edb-4518-96cd-0ac6a35889ab',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-13',
  '[{"count":37,"notes":"Made fresh calls","description":"Daily Calls"},{"count":30,"notes":"Made follow-up calls","description":"Daily Follow-up"},{"count":0,"notes":"DM enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-13T13:31:19.305436+00:00',
  '2026-05-13T13:31:18.766+00:00',
  false,
  '11:10:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b0182011-f5d3-4698-873e-75cefa67f43f',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-13',
  '[{"count":1,"notes":"Created design for RPDM","description":"Design"},{"count":1,"notes":"Did daily posting on RP World Trade","description":"Daily posting"},{"count":1,"notes":"Created festival post design","description":"Design"},{"count":1,"notes":"Created design for Yoga","description":"Design"},{"count":1,"notes":"Did daily posting on Agnomatic","description":"Daily posting"},{"count":1,"notes":"Created thumbnail for SM","description":"Design"}]'::jsonb,
  '',
  '2026-05-13T13:34:28.062306+00:00',
  '2026-05-13T13:34:27.946+00:00',
  false,
  '11:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c1dee440-e7bd-4bc7-8708-f63db301cf3d',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-15',
  '[{"count":1,"notes":"1 Clone AI for DM","description":"Content scripting"},{"count":15,"notes":"Done","description":"Google posting replies"},{"count":12,"notes":"Agnomatic prospects data","description":"Agnomatic prospects"}]'::jsonb,
  '',
  '2026-05-15T10:35:52.389236+00:00',
  '2026-05-15T12:00:39.267+00:00',
  false,
  '10:20:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '08346af1-1827-4f75-8f55-b77e90dd0deb',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-15',
  '[{"count":15,"notes":"Made daily calls","description":"Daily Calls"},{"count":15,"notes":"Completed daily follow-ups","description":"Daily Follow-up"},{"count":0,"notes":"dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-15T13:22:17.403253+00:00',
  '2026-05-15T13:22:17.277+00:00',
  false,
  '09:50:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dda49818-9199-44f3-aecb-900ba69a6514',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-15',
  '[{"count":5,"notes":"Agnomatic info , 4 amazon lecture done","description":"Internal reel editing"},{"count":1,"notes":"ID design changes , taking photos for id card","description":"other"}]'::jsonb,
  '',
  '2026-05-15T13:25:28.713568+00:00',
  '2026-05-15T13:25:28.114+00:00',
  false,
  '10:00:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a131a457-0b41-4bbf-979d-ea4e3c8e56d4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-15',
  '[{"count":1,"notes":"Completed office ID card","description":"Design"},{"count":1,"notes":"Daily posting for RP world trade","description":"Daily posting"},{"count":1,"notes":"Sent message for webinar","description":"Webinar management"},{"count":1,"notes":"Sent reminder for webinar","description":"Reminder management"},{"count":1,"notes":"Daily posting for Agnomatic","description":"Daily posting"},{"count":1,"notes":"Posted video on Agnomatic","description":"Daily posting"},{"count":2,"notes":"Created thumbnails For Agnomatic","description":"Design"}]'::jsonb,
  '',
  '2026-05-15T13:29:00.441749+00:00',
  '2026-05-15T13:29:00.318+00:00',
  false,
  '11:12:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5d0966ee-2025-4045-a800-7e78c92c5744',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-15',
  '[{"count":1,"notes":"not assingned yet","description":"Internal Posting"},{"count":1,"notes":"not assingned yet","description":"Leads management"},{"count":1,"notes":"not assingned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"collected product videos from internet","description":"social media"},{"count":1,"notes":"collecteddetails about the software as per instructed and booked and scheduled the demo of it","description":"gokwik"}]'::jsonb,
  '',
  '2026-05-15T13:29:00.43485+00:00',
  '2026-05-15T13:29:00.315+00:00',
  false,
  '10:00:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b7e40170-f467-41db-bfc6-7e70f1e1e6e8',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-16',
  '[{"count":1,"notes":"Not assigned yet","description":"Internal Posting"},{"count":1,"notes":"Not assigned yet","description":"Leads management"},{"count":1,"notes":"Not assigned yet","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"Collected product video''s from  internet","description":"Social media"}]'::jsonb,
  '',
  '2026-05-16T13:28:57.028418+00:00',
  '2026-05-16T13:28:56.9+00:00',
  false,
  '10:15:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1484f9ae-b9dd-4859-82d6-cec6dbdffa39',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-16',
  '[{"count":15,"notes":"Made daily calls","description":"Daily Calls"},{"count":15,"notes":"made follow ups","description":"Daily Follow-up"},{"count":1,"notes":"dm enrollment","description":"DM Enrollment"},{"count":1,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-16T13:39:05.521477+00:00',
  '2026-05-16T13:39:05.381+00:00',
  false,
  '09:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7912cd27-d89c-4e34-a531-0793a4d0966f',
  '98fdccc3-9c13-4d3c-907d-ff437e4370a9',
  '2026-05-15',
  '[{"count":1,"notes":"","description":"test"}]'::jsonb,
  '',
  '2026-05-15T12:13:39.875397+00:00',
  '2026-05-15T12:13:40.55+00:00',
  false,
  '20:58:00',
  '16:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ab5af195-4ed3-4ea4-8d52-a5f4c086d316',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-15',
  '[{"count":1,"notes":"Follow Up regarding Next Shoot","description":"CA Suyash Sir"},{"count":1,"notes":"Edited 3 Reels & Done Follow Up of Payment","description":"Advisor Alpha"},{"count":1,"notes":"Made Content Creation Proposal And sent to Hemant sir","description":"Amicus Claims"},{"count":1,"notes":"1 Reel In Progress","description":"MBC"},{"count":1,"notes":"Todays Shoot Rescheduled On Sunday","description":"Karrier"},{"count":1,"notes":"","description":"Changes In Id cards Of RPIB"}]'::jsonb,
  '',
  '2026-05-15T13:41:19.01674+00:00',
  '2026-05-15T16:15:17.47+00:00',
  false,
  '10:50:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '14eb34b5-3b58-4e80-880a-6ea53e2b5d24',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-16',
  '[{"count":1,"notes":"Changes in 2 Ads","description":"Advisor Alpha"},{"count":1,"notes":"2 Reels Done","description":"MBC"},{"count":1,"notes":"Meeting regarding the ads shoot.","description":"Karrier"},{"count":1,"notes":"Leads Calling - 4, Sent details to 2 leads","description":"Client Management"},{"count":1,"notes":"","description":"Mage One welcome message to send to the leads, and collected some smple reels to send them"}]'::jsonb,
  '',
  '2026-05-16T07:34:32.23558+00:00',
  '2026-05-16T14:50:39.657+00:00',
  false,
  '10:40:00',
  '22:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c226dab9-8f41-46b7-951f-ea56847a7c07',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-16',
  '[{"count":3,"notes":"3 scripts","description":"Content scripting"},{"count":4,"notes":"done","description":"Shooting"},{"count":10,"notes":"done","description":"Google posting replies"},{"count":14,"notes":"data collected","description":"Agnomatic prospects"}]'::jsonb,
  '',
  '2026-05-16T10:31:47.588699+00:00',
  '2026-05-16T11:53:39.846+00:00',
  false,
  '10:15:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '528ffc81-a5cb-4974-a897-1e1062ee2407',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-16',
  '[{"count":4,"notes":"1 informative Agnomatic, 3 amazon lecture","description":"Internal reel editing"}]'::jsonb,
  'facing issue of storage ',
  '2026-05-16T13:17:10.162003+00:00',
  '2026-05-16T13:17:10.032+00:00',
  false,
  '10:15:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '44dfc991-7195-4f4c-b9e2-e3ae1e5d8747',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-16',
  '[{"count":5,"notes":"Taken shoots for agnomatic, DM","description":"Shoot"},{"count":1,"notes":"Created design for agnomatic","description":"Design"},{"count":1,"notes":"Done posting for RP World trade","description":"Daily posting"},{"count":1,"notes":"Sent reminder in webinar group","description":"Reminder management"},{"count":1,"notes":"Created group for next webinar","description":"WhatsApp group creation"},{"count":1,"notes":"Completed ID card design","description":"Design"}]'::jsonb,
  '',
  '2026-05-16T13:24:38.431264+00:00',
  '2026-05-16T13:24:38.305+00:00',
  false,
  '12:00:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9af76320-fb72-40f3-a703-71d4a0080731',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-22',
  '[{"count":4,"notes":"done","description":"Content scripting"},{"count":1,"notes":"done","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-05-22T13:41:00.949812+00:00',
  '2026-05-22T13:41:00.832+00:00',
  false,
  '10:45:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9737cc8f-f18e-4071-b478-85a5ffb15a8d',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-16',
  '[{"count":7,"notes":"lms issue, lms access, suspend","description":"Tech support"},{"count":3,"notes":"lms issue, welcome call, amazon call","description":"calls"},{"count":1,"notes":"done","description":"sales ppt"},{"count":1,"notes":"dm brochure changes done","description":"brochure"},{"count":1,"notes":"record","description":"webinar recording"},{"count":1,"notes":"for new batch dates","description":"meeting"}]'::jsonb,
  '',
  '2026-05-16T15:02:14.201067+00:00',
  '2026-05-16T15:04:27.928+00:00',
  false,
  '14:00:00',
  '22:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1b0cf0ed-8feb-406e-a577-f470c64dfd5e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-17',
  '[{"count":6,"notes":"Amazon ads shoot at parel and office","description":"Shoot"}]'::jsonb,
  '',
  '2026-05-17T11:05:31.168889+00:00',
  '2026-05-17T11:05:31.08+00:00',
  false,
  '08:30:00',
  '16:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2b18bc05-6cd2-4e86-b993-03ec453c9115',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-18',
  '[{"count":5,"notes":"4 scripts done. Future updtaes of whatsapp(4), Nvidia small data centres","description":"Content scripting"},{"count":3,"notes":"done","description":"Shooting"},{"count":6,"notes":"done","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-05-18T13:28:09.683749+00:00',
  '2026-05-18T13:28:09.564+00:00',
  false,
  '10:18:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fb6156a7-886c-4196-a63c-cd2c530b749f',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-18',
  '[{"count":1,"notes":"Not assigned yet","description":"Internal Posting"},{"count":1,"notes":"Not assigned yet","description":"Leads management"},{"count":1,"notes":"Not assigned yet","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"DM ad shoot done","description":"Shooting"}]'::jsonb,
  '',
  '2026-05-18T13:28:45.811723+00:00',
  '2026-05-18T13:28:45.696+00:00',
  false,
  '22:12:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dad770e9-c45d-4559-9809-4b8212d2eb16',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-18',
  '[{"count":3,"notes":"1DM ad done , i dm informative , changes in agnomtic reel","description":"Internal reel editing"},{"count":1,"notes":"Ad shoot (DM), Camera arrengement","description":"shoot"}]'::jsonb,
  '',
  '2026-05-18T13:30:28.088618+00:00',
  '2026-05-18T13:30:27.544+00:00',
  false,
  '10:10:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5ddd3620-348c-4b2d-96e9-cfa06ef10969',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-18',
  '[{"count":3,"notes":"daily calls made today","description":"Daily Calls"},{"count":30,"notes":"Follow up calls made today","description":"Daily Follow-up"},{"count":1,"notes":"dm enrollment made today","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment made today","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-18T13:30:35.201299+00:00',
  '2026-05-18T13:30:35.079+00:00',
  false,
  '09:45:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '92f920e1-319d-4d8f-ae87-92667914f3f1',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-18',
  '[{"count":15,"notes":"","description":"Daily Calls"},{"count":23,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-18T14:23:41.598387+00:00',
  '2026-05-18T14:23:41.438+00:00',
  false,
  '12:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e85b4aad-0bb0-4f55-8495-4905f1e1ab90',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-18',
  '[{"count":1,"notes":"mbc","description":"Client posting"},{"count":1,"notes":"amicus","description":"Content scripting"},{"count":7,"notes":"lms access, lims issue, unsuspend","description":"Tech support"},{"count":6,"notes":"enrollment calls, amazon calls","description":"calls"},{"count":1,"notes":"sales ppt WIP","description":"ppt"},{"count":1,"notes":"amicus content cal changes","description":"content cal"},{"count":1,"notes":"dm posting, leads, replies","description":"regular work"},{"count":3,"notes":"webinar recordings upload","description":"yt uploads"}]'::jsonb,
  '',
  '2026-05-18T14:26:06.194176+00:00',
  '2026-05-18T14:26:47.316+00:00',
  false,
  '10:25:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '523bfc81-c8c6-4728-ac7c-e4ce3abf7425',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-18',
  '[{"count":1,"notes":"Follow Up regarding payment, shoot scheduled  on 19 May 2026","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"MBC"},{"count":1,"notes":"Meeting with Rutuj regarding ads","description":"Karrier"},{"count":1,"notes":"Lead calling - 4","description":"Client Management"},{"count":1,"notes":"Exhaust fan fitting assitance","description":"Exhaust fan fitting assitance"}]'::jsonb,
  '',
  '2026-05-18T14:27:16.505643+00:00',
  '2026-05-18T14:27:16.395+00:00',
  false,
  '10:25:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7e82c66a-b2be-45ed-ac84-9b870c7a6c85',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-19',
  '[{"count":3,"notes":"3 scripting DM ad, GPU, GPT 5","description":"Content scripting"},{"count":2,"notes":"done","description":"Shooting"},{"count":20,"notes":"done","description":"Google posting replies"},{"count":15,"notes":"agnomatic prospects","description":"agnomatic prospects"}]'::jsonb,
  '',
  '2026-05-19T12:40:32.452688+00:00',
  '2026-05-19T13:09:52.315+00:00',
  false,
  '10:20:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '73f25e88-eb3f-4e03-8d9e-69808e7db110',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-19',
  '[{"count":8,"notes":"made daily calls today","description":"Daily Calls"},{"count":24,"notes":"made followup calls today","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-19T13:16:08.239218+00:00',
  '2026-05-19T13:16:07.702+00:00',
  false,
  '09:50:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0fefedac-330e-4126-b203-b36422594374',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-19',
  '[{"count":1,"notes":"not assingned yet","description":"Internal Posting"},{"count":1,"notes":"not assingned yet","description":"Leads management"},{"count":1,"notes":"not assingned yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"products reels posting done","description":"social media"}]'::jsonb,
  '',
  '2026-05-19T13:15:45.658664+00:00',
  '2026-05-19T13:16:24.017+00:00',
  false,
  '10:10:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '02a2e39a-d6d2-4e65-978c-e94c7585cef8',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-19',
  '[{"count":8,"notes":"amicus claims ai","description":"Content scripting"},{"count":11,"notes":"lms access to batch, batch access, lms issue","description":"Tech support"},{"count":1,"notes":"oorruu media ig created","description":"Social media account"},{"count":3,"notes":"ganpati, dm","description":"posting"},{"count":2,"notes":"exam related msg in rpdm61, shubham konde","description":"student msg"},{"count":1,"notes":"help and handover to rohan","description":"ppt"},{"count":1,"notes":"leads, replies","description":"regular"}]'::jsonb,
  '',
  '2026-05-19T14:01:50.641826+00:00',
  '2026-05-19T14:02:37.762+00:00',
  false,
  '10:18:00',
  '19:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0d9de7f6-6fac-472e-8c74-bf081029e0ec',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-19',
  '[{"count":20,"notes":"","description":"Daily Calls"},{"count":24,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"},{"count":2,"notes":"","description":"Today''s visits"}]'::jsonb,
  '',
  '2026-05-19T14:56:44.904833+00:00',
  '2026-05-19T14:56:44.789+00:00',
  false,
  '10:25:00',
  '20:26:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '13a618ed-d7e1-46e9-a8fa-e2323f934a5e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-19',
  '[{"count":1,"notes":"Ganpati Bappa reel","description":"Internal reel editing"},{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb,
  '',
  '2026-05-19T14:59:28.07846+00:00',
  '2026-05-19T14:59:27.953+00:00',
  false,
  '10:10:00',
  '21:28:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7aab75ec-ad2e-4f7e-a624-45524fdcd938',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-20',
  '[{"count":3,"notes":"Done","description":"Content scripting"},{"count":3,"notes":"Done","description":"Shooting"},{"count":1,"notes":"Done","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-05-20T12:42:46.900102+00:00',
  '2026-05-20T12:42:46.336+00:00',
  false,
  '10:35:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f6ba45eb-bd05-430e-b6bb-a4f6af9a9ba9',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-20',
  '[{"count":8,"notes":"i made daily calls","description":"Daily Calls"},{"count":25,"notes":"i made daily calls","description":"Daily Follow-up"},{"count":1,"notes":"DM Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-20T13:19:38.422143+00:00',
  '2026-05-20T13:19:38.295+00:00',
  false,
  '09:45:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '19d8ced1-18ed-4343-8c62-c7cd3c0d1af5',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-20',
  '[{"count":1,"notes":"NOT ASSIGNED YET","description":"Internal Posting"},{"count":1,"notes":"NOT ASSIGNED YET","description":"Leads management"},{"count":1,"notes":"NOT ASSIGNED YET","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"product reel posting done","description":"social media"}]'::jsonb,
  '',
  '2026-05-20T13:23:27.340963+00:00',
  '2026-05-20T13:23:27.219+00:00',
  false,
  '10:15:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5c1c7010-2d2b-4087-9fd8-003157dcca0a',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-20',
  '[{"count":2,"notes":"Completed two shoots","description":"Shoot"},{"count":1,"notes":"Created design for Agnomatic","description":"Design"},{"count":1,"notes":"Sent reminder for webinar","description":"Reminder management"},{"count":1,"notes":"Design in progress for RPDM","description":"Design"}]'::jsonb,
  '',
  '2026-05-20T13:33:54.013357+00:00',
  '2026-05-20T13:33:53.89+00:00',
  false,
  '11:50:00',
  '17:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8cd9e396-ba3b-4e04-8eea-082b59140be4',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-20',
  '[{"count":3,"notes":"1 Dm Ad, 1 Amazon Ad,1 DM informative reel","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-05-20T14:01:45.344399+00:00',
  '2026-05-20T14:01:45.214+00:00',
  false,
  '10:15:00',
  '07:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9122ab6e-ab05-46c2-9624-13d7bf63b640',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-20',
  '[{"count":1,"notes":"Follow up regarding shoot","description":"CA Suyash Sir"},{"count":1,"notes":"Sent them 2 files for review, one thumbnail done.","description":"Advisor Alpha"},{"count":1,"notes":"1 Ad done","description":"Karrier"},{"count":1,"notes":"MAde changes In the ad commercial and made the invoice.","description":"Shubhash Shrivastav"},{"count":1,"notes":"Oorruu leads calling - 5","description":"Client Management"}]'::jsonb,
  '',
  '2026-05-20T14:17:43.003165+00:00',
  '2026-05-20T14:17:42.871+00:00',
  false,
  '10:25:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b23180c6-f9b8-4baa-a54f-75a3c505e0b2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-20',
  '[{"count":1,"notes":"mbc","description":"Client posting"},{"count":6,"notes":"reels, yt amicus claims","description":"Content scripting"},{"count":10,"notes":"lms issue, lms access, amazon issue","description":"Tech support"},{"count":1,"notes":"Leads, replies, emails, dm posting","description":"Regular"},{"count":1,"notes":"oorruu email psword recover, ig yt pages created","description":"social media handles"}]'::jsonb,
  '',
  '2026-05-20T14:40:21.561358+00:00',
  '2026-05-20T14:40:21.006+00:00',
  false,
  '10:25:00',
  '20:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ae473b5a-3225-4e95-a69d-c1d6ae2921d4',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-20',
  '[{"count":1,"notes":"4","description":"Daily Calls"},{"count":1,"notes":"25","description":"Daily Follow-up"},{"count":1,"notes":"6","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-20T14:57:43.156301+00:00',
  '2026-05-20T14:57:42.59+00:00',
  false,
  '10:18:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3880e8b5-0c80-4cb6-bf49-5d43e58ccd02',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-21',
  '[{"count":20,"notes":"made daily fresh calls","description":"Daily Calls"},{"count":35,"notes":"made follow up calls","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazion Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-21T13:24:37.081309+00:00',
  '2026-05-21T13:24:36.959+00:00',
  false,
  '09:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9939e743-8955-4134-96a6-4714a6220d07',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-21',
  '[{"count":1,"notes":"not assinged yet","description":"Internal Posting"},{"count":1,"notes":"not assinged yet","description":"Leads management"},{"count":1,"notes":"not assinged yet","description":"Comments"},{"count":1,"notes":"done","description":"Prospects"},{"count":1,"notes":"product reel posting done","description":"social media"}]'::jsonb,
  '',
  '2026-05-21T13:27:56.199469+00:00',
  '2026-05-21T13:27:56.08+00:00',
  false,
  '10:12:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0efa6909-3b64-4160-9a5f-ab0b511fff00',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-21',
  '[{"count":4,"notes":"make changes in 4 ads and reels","description":"Internal reel editing"},{"count":1,"notes":"1 SM yt done","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-05-21T13:34:03.61193+00:00',
  '2026-05-21T13:34:03.032+00:00',
  false,
  '10:14:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '010a41af-40a7-478d-9d18-14dce3514aa1',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-21',
  '[{"count":1,"notes":"Follow Up - not responded","description":"CA Suyash Sir"},{"count":1,"notes":"Made 1 Reel, and 1 Ad, Discussed the payment confusion with raunaq.","description":"Advisor Alpha"},{"count":1,"notes":"1 ad in progress","description":"Karrier"},{"count":1,"notes":"Sent invoice of sesa hair oil reel","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"Amazon Hindi Course in progress"}]'::jsonb,
  '',
  '2026-05-21T13:38:22.201505+00:00',
  '2026-05-21T13:38:22.077+00:00',
  false,
  '10:10:00',
  '19:25:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7fb1c40a-aa46-418b-8095-c027a2f1f19c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-21',
  '[{"count":1,"notes":"Mbc post schedule","description":"Client posting"},{"count":3,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Sm","description":"Yt posting"},{"count":1,"notes":"Lead, reply","description":"Regular"},{"count":1,"notes":"Rp website changes wip","description":"Website"}]'::jsonb,
  '',
  '2026-05-21T14:12:49.889968+00:00',
  '2026-05-21T14:12:49.734+00:00',
  false,
  '10:10:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '524c241f-03df-4454-a22f-f8eac8c1e4cd',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-21',
  '[{"count":1,"notes":"25","description":"Daily Calls"},{"count":1,"notes":"23","description":"Daily Follow-up"},{"count":1,"notes":"06","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-21T15:02:26.883793+00:00',
  '2026-05-21T15:02:26.756+00:00',
  false,
  '10:18:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c1bd1162-836c-4aa5-84e0-8e3dd39a04ed',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-21',
  '[{"count":3,"notes":"Done","description":"Content scripting"}]'::jsonb,
  '',
  '2026-05-21T14:10:39.918955+00:00',
  '2026-05-21T14:10:39.793+00:00',
  false,
  '10:50:00',
  NULL,
  'How many scripts created?
Also add shooting in the reporting.'
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c1fd0aab-5c44-4f3c-b651-c67be9306102',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-22',
  '[{"count":8,"notes":"i made fresh calls today","description":"Daily Calls"},{"count":20,"notes":"i made follow up calls today","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-22T13:21:24.604513+00:00',
  '2026-05-22T13:21:24.476+00:00',
  false,
  '09:55:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8f795fdd-8208-4bcd-b07d-b1d7fb9baa73',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-22',
  '[{"count":1,"notes":"Made 2 ads and 1 Thumbnail","description":"Advisor Alpha"},{"count":1,"notes":"Follow up regarding scripts","description":"Amicus Claims"},{"count":1,"notes":"1 ad in progess","description":"Karrier"},{"count":1,"notes":"Meeting with Bharat Vishe","description":"Client Management"},{"count":1,"notes":"","description":"Follow Up with Hardika regarding payment"}]'::jsonb,
  '',
  '2026-05-22T14:09:50.005739+00:00',
  '2026-05-22T14:09:49.879+00:00',
  false,
  '10:06:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '55235203-a585-428d-a432-4ad984f9e2df',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-22',
  '[{"count":3,"notes":"Lms issues, lms suspension","description":"Tech support"},{"count":1,"notes":"Bharat vishe","description":"Content analyze"},{"count":1,"notes":"Client meeting Bharat vishe","description":"Meeting"},{"count":1,"notes":"Changes wip","description":"Website"}]'::jsonb,
  '',
  '2026-05-22T17:39:21.399679+00:00',
  '2026-05-22T17:39:20.772+00:00',
  false,
  '10:06:00',
  '20:28:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f06df9bd-3ebd-4c89-be3b-d599a9623468',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-23',
  '[{"count":2,"notes":"2 agnomatic video done","description":"Internal reel editing"},{"count":1,"notes":"Sm long in progress","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-05-23T10:51:36.120348+00:00',
  '2026-05-23T10:51:35.999+00:00',
  false,
  '10:10:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cd987972-4ce1-42c9-abc1-c9633079575f',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-26',
  '[{"count":1,"notes":"Products reel posted","description":"Social media"},{"count":1,"notes":"1campaing created and published","description":"Facebook ads"},{"count":1,"notes":"Course video watched and worked on it","description":"AI tool"}]'::jsonb,
  '',
  '2026-05-26T15:29:48.315244+00:00',
  '2026-05-26T15:29:47.738+00:00',
  false,
  '22:23:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8c5e07eb-2711-4a31-ba62-35ceb164957a',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-23',
  '[{"count":3,"notes":"Done","description":"Content scripting"},{"count":1,"notes":"Done","description":"Google posting replies"},{"count":10,"notes":"","description":"Agnomatic prospects"}]'::jsonb,
  '',
  '2026-05-23T12:15:02.096706+00:00',
  '2026-05-23T12:50:17.078+00:00',
  false,
  '10:30:00',
  '18:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '291b1966-6fe9-428b-82c1-096cb0818be7',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-23',
  '[{"count":1,"notes":"1Reel Done","description":"Advisor Alpha"},{"count":1,"notes":"3 Ads Done","description":"Karrier"}]'::jsonb,
  '',
  '2026-05-23T14:25:23.617122+00:00',
  '2026-05-23T14:25:23.051+00:00',
  false,
  '10:20:00',
  '20:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f0956294-ff4f-4be3-baa6-d6047d2d4e02',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-23',
  '[{"count":4,"notes":"Lms issue, lms access, amazon issue","description":"Tech support"},{"count":2,"notes":"Issue calls","description":"Amazon calls"},{"count":1,"notes":"Changes","description":"Website"},{"count":1,"notes":"Swapnil sir","description":"Client follow up"},{"count":1,"notes":"Leads, replies,","description":"Regular work"}]'::jsonb,
  '',
  '2026-05-23T18:22:26.688008+00:00',
  '2026-05-23T18:22:26.11+00:00',
  false,
  '10:20:00',
  '20:12:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9a10d331-503d-4983-9937-110c675c5330',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-25',
  '[{"count":1,"notes":"Follow up done - wednesday shoot","description":"CA Suyash Sir"},{"count":1,"notes":"2 reels done, made a drive to keep all the reels and shared them","description":"Advisor Alpha"},{"count":1,"notes":"","description":"watched some editing tutorials"}]'::jsonb,
  '',
  '2026-05-25T13:11:22.437495+00:00',
  '2026-05-25T13:11:22.303+00:00',
  false,
  '10:33:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'daa0b6a8-c674-4811-acdc-dbdb4e0c60a2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-25',
  '[{"count":23,"notes":"i made today","description":"Daily Calls"},{"count":20,"notes":"follow up calls","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-25T13:14:36.631744+00:00',
  '2026-05-25T13:14:36.505+00:00',
  false,
  '09:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2e4fb066-8c92-48c5-98d2-55557d108989',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-25',
  '[{"count":3,"notes":"done","description":"Content scripting"},{"count":5,"notes":"","description":"agnomatic prospects"}]'::jsonb,
  '',
  '2026-05-25T13:27:08.720759+00:00',
  '2026-05-25T13:27:08.195+00:00',
  false,
  '10:25:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9e02968c-2387-4d70-908a-b29bc78a618e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-25',
  '[{"count":1,"notes":"Not assigned yet","description":"Internal Posting"},{"count":1,"notes":"Not assigned yet","description":"Leads management"},{"count":1,"notes":"Not assigned yet","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"Lms assignments checked and alloted marks","description":"Lms"}]'::jsonb,
  '',
  '2026-05-25T17:42:46.506181+00:00',
  '2026-05-25T17:42:45.913+00:00',
  false,
  '22:20:00',
  '18:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2148111d-d9a2-4115-bb2d-b28770f666ba',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-26',
  '[{"count":1,"notes":"Follow Up Regarding Shoot","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"},{"count":3,"notes":"3 Reels Done","description":"MBC"},{"count":1,"notes":"Follow Up with Rutuj Regarding Shoot","description":"Karrier"},{"count":1,"notes":"Follow With Saliesh Shukla, Meeting at 08:30 Pm","description":"Client Management"}]'::jsonb,
  '',
  '2026-05-26T11:43:58.669708+00:00',
  '2026-05-26T12:01:52.743+00:00',
  false,
  '10:27:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '14d8b2de-260c-4ca8-a26b-c82a2b6f06c1',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-26',
  '[{"count":6,"notes":"done. AI tools.  Doctors using AI. What is an AI agent. Burner email ID. 2 DM","description":"Content scripting"}]'::jsonb,
  '',
  '2026-05-26T13:31:04.650038+00:00',
  '2026-05-26T13:31:04.095+00:00',
  false,
  '10:15:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2069de3c-0d50-425f-a02f-c4b349188afb',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-26',
  '[{"count":10,"notes":"","description":"Daily Calls"},{"count":23,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-26T13:43:13.882516+00:00',
  '2026-05-26T13:43:13.761+00:00',
  false,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ed78cf5d-0e4e-4428-91d2-e1681d4ef30c',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-26',
  '[{"count":1,"notes":"Completed one shoot","description":"Shoot"},{"count":1,"notes":"Designed carousel for agnomatic","description":"Design"},{"count":1,"notes":"Posted for RP World Trade","description":"Daily posting"},{"count":1,"notes":"Sent webinar reminder","description":"Reminder management"},{"count":1,"notes":"Posted for agnomatic","description":"Daily posting"}]'::jsonb,
  '',
  '2026-05-26T13:49:26.868008+00:00',
  '2026-05-26T13:49:26.735+00:00',
  false,
  '11:50:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c4b23708-dcf1-4d89-a21c-825dba528bc9',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-26',
  '[{"count":4,"notes":"lms issue, lecures added,","description":"Tech support"},{"count":1,"notes":"sales ppt done","description":"ppt"},{"count":1,"notes":"brochr changes done","description":"canva"},{"count":1,"notes":"changes","description":"website"},{"count":1,"notes":"content team meeting done","description":"meeting"},{"count":1,"notes":"leads, replies, email","description":"regular"}]'::jsonb,
  '',
  '2026-05-26T16:46:04.682169+00:00',
  '2026-05-26T16:46:04.553+00:00',
  false,
  '10:27:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3942538c-723f-4f6b-8162-648a50143499',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-26',
  '[{"count":1,"notes":"1 info agnomatic","description":"Internal reel editing"},{"count":5,"notes":"Amazon course 4 done 1 half done","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-05-26T16:47:17.589882+00:00',
  '2026-05-26T16:47:17.47+00:00',
  false,
  '10:20:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c0ffdf30-8d5e-4fc9-aa51-de1051d7fb20',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-27',
  '[{"count":8,"notes":"i made today calls","description":"Daily Calls"},{"count":15,"notes":"I made follow up calls","description":"Daily Follow-up"},{"count":2,"notes":"DM Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-27T13:21:39.262307+00:00',
  '2026-05-27T13:21:39.134+00:00',
  false,
  '12:15:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '63157986-44d1-4dc1-82fa-eeed93a0e08d',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-27',
  '[{"count":5,"notes":"done.  Real vs AI generated images. Digital Marketing is changing now.Effective use of ChatGpt. Daily posting vs alternate posting","description":"Content scripting"},{"count":5,"notes":"done","description":"Shooting"}]'::jsonb,
  '',
  '2026-05-27T13:25:09.565007+00:00',
  '2026-05-27T13:25:09.431+00:00',
  false,
  '10:20:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b0f3174f-97de-4649-b933-e5fbdcc38147',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-27',
  '[{"count":1,"notes":"Shoot of 12 Reels and 2 ads Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel Done And Changes In 1 Reels","description":"Advisor Alpha"},{"count":1,"notes":"Made Invoice For April and May month","description":"MBC"}]'::jsonb,
  '',
  '2026-05-27T13:37:32.464994+00:00',
  '2026-05-27T13:37:31.888+00:00',
  false,
  '10:18:00',
  '19:18:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8ae8b1a2-f3d2-4fbc-97a0-9cfd127929be',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-27',
  '[{"count":1,"notes":"1 amazon ad done","description":"Internal reel editing"},{"count":14,"notes":"ca sir shoot , office internal shoot DM","description":"SHOOT"}]'::jsonb,
  '',
  '2026-05-27T13:42:28.290111+00:00',
  '2026-05-27T13:42:28.166+00:00',
  false,
  '10:20:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3edb2850-1ae5-47a0-8fa0-c7871ce9d814',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-27',
  '[{"count":12,"notes":"Completed shoots for CA","description":"Shoot"},{"count":1,"notes":"Banner design in progress","description":"Design"},{"count":1,"notes":"Completed daily posting on Agnomatic","description":"Daily posting"},{"count":5,"notes":"Completed shoots for RPDM","description":"Shoot"},{"count":1,"notes":"Completed daily posting for RP World Trade","description":"Daily posting"}]'::jsonb,
  '',
  '2026-05-27T13:54:02.552605+00:00',
  '2026-05-27T13:54:02.43+00:00',
  false,
  '11:15:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5bb5714b-8a76-4f87-bb2c-f5e2ea9dd354',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-27',
  '[{"count":1,"notes":"Mbc","description":"Client posting"},{"count":4,"notes":"Lms issue, lecture add, lms access","description":"Tech support"},{"count":2,"notes":"Rp content calendar done, bharat vishe content strategy in progress","description":"Content strategy"},{"count":2,"notes":"Leads replies, emails","description":"Regular"}]'::jsonb,
  '',
  '2026-05-27T15:07:16.209031+00:00',
  '2026-05-27T15:07:16.086+00:00',
  false,
  '10:18:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ce4f8bc3-72d4-4659-8646-d406ebb1570b',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-27',
  '[{"count":1,"notes":"Categories finaled & tools of each category listed out","description":"AI course"}]'::jsonb,
  '',
  '2026-05-27T15:08:54.302751+00:00',
  '2026-05-27T15:08:54.168+00:00',
  false,
  '22:27:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ae43a07b-c5cd-4ecc-b819-3ec31d2753fd',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-28',
  '[{"count":1,"notes":"Sent Invoices of all the pending payments","description":"CA Suyash Sir"},{"count":1,"notes":"Sent 2 Ads In reel, Square and YT Format","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done, Reviewed Scripts","description":"Amicus Claims"},{"count":1,"notes":"Ad Shoot Scheduled On Saturday","description":"Karrier"},{"count":1,"notes":"","description":"Reviewed Bharat Sir''s Plan"}]'::jsonb,
  '',
  '2026-05-28T13:25:09.965654+00:00',
  '2026-05-28T13:27:43.185+00:00',
  false,
  '10:31:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '68c23c76-f198-412e-80fb-e94a7d9d8bb3',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-28',
  '[{"count":4,"notes":"done. Meta paid update. Digital Rupee. AI & life decision. Google alerts update.","description":"Content scripting"}]'::jsonb,
  '',
  '2026-05-28T13:30:32.999281+00:00',
  '2026-05-28T13:30:32.874+00:00',
  false,
  '11:45:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9e98997f-9927-4f87-8b77-df4d9f43337e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-28',
  '[{"count":25,"notes":"made fresh calls","description":"Daily Calls"},{"count":20,"notes":"made follow up calls","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-28T13:33:04.978688+00:00',
  '2026-05-28T13:33:04.855+00:00',
  false,
  '09:53:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '371dff6f-1fc8-4387-9aee-defcc737a45c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-28',
  '[{"count":1,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Bharat vishe content strategy done","description":"Content Strategy"},{"count":1,"notes":"Dm posting, leads, replies, emails","description":"Regular"},{"count":1,"notes":"Shreya leads replies & dm posting","description":"Team training"},{"count":1,"notes":"Rp website changes","description":"Website"},{"count":4,"notes":"Calls for razor pay verification instructions","description":"Calls"}]'::jsonb,
  '',
  '2026-05-28T13:56:43.682298+00:00',
  '2026-05-28T13:56:43.55+00:00',
  false,
  '10:31:00',
  '19:07:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd0567e37-1494-44a2-8fb5-20242567e5a8',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-28',
  '[{"count":3,"notes":"2 ganpati reel , 1 DM reel","description":"Internal reel editing"},{"count":1,"notes":"1 Amazon lecture","description":"Internal YouTube editing"},{"count":1,"notes":"DM youtube banner","description":"other"}]'::jsonb,
  '',
  '2026-05-28T13:59:45.203347+00:00',
  '2026-05-28T13:59:45.081+00:00',
  false,
  '10:13:00',
  '07:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd59dd378-a535-4003-b0e5-1b67ce957e28',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-28',
  '[{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progress","description":"AI course"},{"count":1,"notes":"collected product videos for socila media from internet( cipher X Media)","description":"social media"},{"count":1,"notes":"assignment checked","description":"LMS"}]'::jsonb,
  '',
  '2026-05-28T14:00:32.832445+00:00',
  '2026-05-28T14:01:56.515+00:00',
  false,
  '10:13:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c782457c-7612-4e51-a043-ade9d7d8a22b',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-28',
  '[{"count":2,"notes":"Designed thumbnails for agnomatic","description":"Design"},{"count":1,"notes":"Posted on RP world trade","description":"Daily posting"},{"count":1,"notes":"Sent webinar reminder","description":"Reminder management"},{"count":1,"notes":"Designed thumbnails for RPDM","description":"Design"},{"count":1,"notes":"Completed banner design","description":"Design"},{"count":1,"notes":"Posted on Agnomatic","description":"Daily posting"}]'::jsonb,
  '',
  '2026-05-28T14:31:46.290483+00:00',
  '2026-05-28T14:31:45.714+00:00',
  false,
  '12:15:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c35d9c40-4a1c-4405-83d0-9e0d564b447e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-29',
  '[{"count":1,"notes":"1 Reel Done","description":"Amicus Claims"},{"count":1,"notes":"Oorruu Leads Calling","description":"Client Management"},{"count":1,"notes":"","description":"Amazon hindi course 1 Ep in progress"}]'::jsonb,
  '',
  '2026-05-29T09:59:28.368093+00:00',
  '2026-05-29T09:59:27.817+00:00',
  false,
  '10:21:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fb2b02a3-aa38-42fa-8fd8-df3605c966b5',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-29',
  '[{"count":5,"notes":"made fresh calls","description":"Daily Calls"},{"count":18,"notes":"follow up calls","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-29T13:21:16.072636+00:00',
  '2026-05-29T13:21:15.934+00:00',
  false,
  '09:55:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c4a56338-4553-4e4f-99a6-e0328ad0a051',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-29',
  '[{"count":7,"notes":"done. Youtube AI video tag. Ads on OTT. Jiohotstar Ads. No Leads. Zomato case study. Followers increase but no conversion.  3 AI tools for business","description":"Content scripting"}]'::jsonb,
  '',
  '2026-05-29T10:45:31.278067+00:00',
  '2026-05-29T13:21:43.788+00:00',
  false,
  '10:20:00',
  '19:06:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '79cf0ffb-731e-42ee-9dce-aa9f0b84c5ea',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-29',
  '[{"count":2,"notes":"2 DM informative","description":"Internal reel editing"},{"count":3,"notes":"3 Amazon lecture","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-05-29T14:26:06.493444+00:00',
  '2026-05-29T14:26:06.371+00:00',
  false,
  '10:25:00',
  '08:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e91c6e41-787d-4803-be15-20f4759522fe',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-29',
  '[{"count":5,"notes":"","description":"Daily Calls"},{"count":15,"notes":"","description":"Daily Follow-up"},{"count":6,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-29T14:28:17.776741+00:00',
  '2026-05-29T14:28:17.208+00:00',
  false,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a00fef22-39d5-4510-abb5-417a5c3923c7',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-29',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"tools tested ( work in progress)","description":"AI course"}]'::jsonb,
  '',
  '2026-05-29T14:51:56.103152+00:00',
  '2026-05-29T14:51:55.98+00:00',
  false,
  '10:25:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8ab9a3cb-733b-4511-bd31-665b8d156e9b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-30',
  '[{"count":1,"notes":"POst Boosting folloe up","description":"CA Suyash Sir"},{"count":1,"notes":"Folloe Up regarding scripts","description":"Amicus Claims"},{"count":1,"notes":"Shoot- 8 ads at Dombivli","description":"Karrier"}]'::jsonb,
  '',
  '2026-05-30T12:33:38.977778+00:00',
  '2026-05-30T12:33:38.834+00:00',
  false,
  '10:45:00',
  '18:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '715631ae-1e82-401c-aea4-51c382431379',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-30',
  '[{"count":3,"notes":"Fresh calls done","description":"Daily Calls"},{"count":15,"notes":"Follow Up calls done","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-05-30T13:00:52.954644+00:00',
  '2026-05-30T13:01:07+00:00',
  false,
  '09:53:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c763622f-9a00-4563-87a4-5ad56ba0732d',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-30',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"tools tested","description":"AI"}]'::jsonb,
  '',
  '2026-05-30T13:25:05.269542+00:00',
  '2026-05-30T13:25:05.153+00:00',
  false,
  '10:18:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '510f7361-f38e-4e1e-bd05-9e984ce67ba3',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-30',
  '[{"count":3,"notes":"Designed thumbnails for SM","description":"Design"},{"count":1,"notes":"Sent reminder for webinar groups","description":"Reminder management"},{"count":1,"notes":"Created WhatsApp group","description":"WhatsApp group creation"},{"count":1,"notes":"Created Zoom link for webinar","description":"Webinar coordination"}]'::jsonb,
  '',
  '2026-05-30T14:31:31.105658+00:00',
  '2026-05-30T14:32:52.335+00:00',
  false,
  '12:25:00',
  '20:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0c8e4497-4f13-4cc2-a9f7-5b4c2fb8dac5',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-30',
  '[{"count":1,"notes":"Client shoot at dombivli","description":"Shoot"},{"count":1,"notes":"Curtain fitting","description":"Internal work"}]'::jsonb,
  '',
  '2026-05-30T14:39:47.867654+00:00',
  '2026-05-30T14:39:47.352+00:00',
  false,
  '10:20:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '21808cbd-99e7-4576-b6f8-5eabaeb9fbd2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-30',
  '[{"count":1,"notes":"Lms issue","description":"Tech support"},{"count":2,"notes":"Lead replies, emails, yt upload","description":"Regular"},{"count":1,"notes":"Updated, content discussion","description":"Content calendar"}]'::jsonb,
  '',
  '2026-05-30T16:57:34.457258+00:00',
  '2026-05-30T16:57:34.329+00:00',
  false,
  '10:45:00',
  '18:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '62fd3c2c-fe8a-4c17-858f-628dce9593a6',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-01',
  '[{"count":1,"notes":"fresh calls made","description":"Daily Calls"},{"count":15,"notes":"Follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-01T13:23:00.558448+00:00',
  '2026-06-01T13:23:00.426+00:00',
  false,
  '09:55:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5581c271-cf1b-49b2-b666-3af6ccf7b44f',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-01',
  '[{"count":1,"notes":"1 dm reel done","description":"Internal reel editing"},{"count":2,"notes":"2 amzon lecture done","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-06-01T14:54:51.150223+00:00',
  '2026-06-01T14:54:51.027+00:00',
  false,
  '10:11:00',
  '18:44:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e2e774c7-cc57-45a8-be64-997f8ee8ebbb',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-01',
  '[{"count":1,"notes":"0","description":"Daily Calls"},{"count":1,"notes":"23","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-01T15:10:20.317397+00:00',
  '2026-06-01T15:10:20.195+00:00',
  false,
  '10:17:00',
  '19:06:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '814e7a49-bc60-4b09-8faf-7996b9471311',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-01',
  '[{"count":1,"notes":"Completed design for agnomatic","description":"Design"},{"count":1,"notes":"Completed daily posting for Rp World Trade","description":"Daily posting"},{"count":1,"notes":"Designed one thumbnail","description":"Design"},{"count":1,"notes":"Daily posting done on agnomatic","description":"Daily posting"}]'::jsonb,
  '',
  '2026-06-01T15:10:56.967589+00:00',
  '2026-06-01T15:10:56.856+00:00',
  false,
  '11:50:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'bf3d841a-2ff1-4178-ac5a-2c94c16749b8',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-01',
  '[{"count":16,"notes":"Lms access, lms issues, Amazon access, msg","description":"Tech support"},{"count":15,"notes":"Amazon calls, lms issue","description":"Calls"},{"count":1,"notes":"Cv shared","description":"Cv shared"},{"count":1,"notes":"Discussion with shreya","description":"Content"},{"count":1,"notes":"Lead reply, ad fund monitor","description":"Regular"}]'::jsonb,
  '',
  '2026-06-01T07:55:36.421674+00:00',
  '2026-06-01T15:33:52.802+00:00',
  false,
  '10:22:00',
  '16:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '74f53da9-9f1f-408d-86d8-2454b237987d',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-01',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI course"}]'::jsonb,
  '',
  '2026-06-01T17:21:45.437511+00:00',
  '2026-06-01T17:21:45.31+00:00',
  false,
  '10:11:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '774cc9a7-8b78-4a32-98c1-68e52fe6094b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-02',
  '[{"count":1,"notes":"Follow up Regarding Post Boosting","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up For Shoot","description":"Advisor Alpha"},{"count":2,"notes":"","description":"2 Episodes Of amazon Hindi Course"},{"count":1,"notes":"","description":"Office Cabin Arrangements"},{"count":1,"notes":"","description":"Edited 1 Ad Of Amazon"}]'::jsonb,
  '',
  '2026-06-02T14:07:40.03335+00:00',
  '2026-06-02T14:27:58.469+00:00',
  false,
  '10:51:00',
  '20:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '75441389-cf34-4394-a577-706b282887da',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-02',
  '[{"count":1,"notes":"5","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-02T14:47:40.928723+00:00',
  '2026-06-02T14:47:40.801+00:00',
  false,
  '10:30:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c25c8f4a-f23a-4c27-a6de-588d578dd655',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-02',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI"},{"count":1,"notes":"Assignment check","description":"LMS"}]'::jsonb,
  '',
  '2026-06-02T14:48:42.723791+00:00',
  '2026-06-02T14:48:42.61+00:00',
  false,
  '10:20:00',
  '20:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3454a38f-bbae-4bc2-860f-09ff858aa025',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-02',
  '[{"count":4,"notes":"Shoot has done for Amazon and RPDM","description":"Shoot"},{"count":1,"notes":"Agnomatic design completed","description":"Design"},{"count":2,"notes":"Posting has done","description":"Daily posting"},{"count":1,"notes":"Sent one reminder","description":"Reminder management"}]'::jsonb,
  '',
  '2026-06-02T15:31:08.85273+00:00',
  '2026-06-02T15:31:08.207+00:00',
  false,
  '11:50:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9eaf5ca8-4ed0-4244-916c-91ede7a9ede6',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-02',
  '[{"count":1,"notes":"1 dm","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issue, exam reminders","description":"Tech support"},{"count":1,"notes":"Dm content shoot, content research","description":"Content"},{"count":1,"notes":"Students list","description":"New batch"},{"count":1,"notes":"Leads replies,","description":"Regular"}]'::jsonb,
  '',
  '2026-06-02T17:38:04.011234+00:00',
  '2026-06-02T17:38:03.879+00:00',
  false,
  '10:51:00',
  '20:06:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b20f63d7-f759-464e-ada9-cfc1ece06265',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-02',
  '[{"count":3,"notes":"1 amazon ad done, 1 cultural reel done, changes in old Amazon ads","description":"Internal reel editing"},{"count":3,"notes":"2 amazon lecture done , SM long video in progress","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-06-02T18:13:23.863622+00:00',
  '2026-06-02T18:13:23.729+00:00',
  false,
  '10:20:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5b40aa6e-43f7-4310-b24d-01f7e50de22c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-03',
  '[{"count":1,"notes":"Shoot scheduled on 5th June","description":"Advisor Alpha"},{"count":1,"notes":"Ads in progress","description":"Karrier"},{"count":1,"notes":"","description":"Cabin arrangement & Curtain Fitting"},{"count":1,"notes":"","description":"Video Editing and Lighting Tutorials"}]'::jsonb,
  '',
  '2026-06-03T14:17:54.907903+00:00',
  '2026-06-03T14:17:54.772+00:00',
  false,
  '10:17:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4eb4da55-a448-4d59-b262-c9e2f48ca9cf',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-03',
  '[{"count":7,"notes":"ganpati reel 1, dm reel 1, changes in amazon ad 5","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-06-03T14:17:11.4553+00:00',
  '2026-06-03T14:21:07.901+00:00',
  true,
  '10:15:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '02e620da-1726-41d8-af43-8259810aac0b',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-03',
  '[{"count":1,"notes":"1 dm","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issue, amazon issues","description":"Tech support"},{"count":1,"notes":"Calls, mail, certificate with rohan","description":"Razor pay verification"},{"count":1,"notes":"Leads replies, dm posting, dm shoot","description":"Regular"},{"count":1,"notes":"New batch created, lms & whatsapp, confirmation calls done","description":"Batch new"},{"count":1,"notes":"Question paper count","description":"Exam"},{"count":1,"notes":"With Rishi sir for content n all","description":"Meeting"}]'::jsonb,
  '',
  '2026-06-03T14:21:37.051481+00:00',
  '2026-06-03T14:21:36.921+00:00',
  false,
  '10:17:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a62a5501-4aab-4513-8fd8-8866a9f56d5e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-03',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Assignment Checked","description":"LMS"},{"count":1,"notes":"Work in progress","description":"AI Course"}]'::jsonb,
  '',
  '2026-06-03T14:34:09.011834+00:00',
  '2026-06-03T14:34:08.844+00:00',
  false,
  '10:15:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dc37c10a-65e9-4b42-8084-277a255d7be8',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-03',
  '[{"count":2,"notes":"Completed two shoots","description":"Shoot"},{"count":2,"notes":"Designed thumbnail, carousel for RPDM","description":"Design"},{"count":1,"notes":"Daily posting done for Agnomatic","description":"Daily posting"},{"count":1,"notes":"Designed static post for Agnomatic","description":"Design"},{"count":1,"notes":"''Office cleaning has done''","description":"Misc Task"}]'::jsonb,
  '',
  '2026-06-03T15:03:10.156881+00:00',
  '2026-06-03T15:03:10.03+00:00',
  false,
  '12:10:00',
  '20:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3fedada7-ff65-4d31-af77-82bcdb2f10a8',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-04',
  '[{"count":7,"notes":"fresh calls made today","description":"Daily Calls"},{"count":20,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-04T13:20:59.569255+00:00',
  '2026-06-04T13:20:58.936+00:00',
  false,
  '09:48:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6de9a287-554b-442d-807f-69fd733546b5',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-04',
  '[{"count":4,"notes":"Done. Animal voice decoding with AI. Wifi radio waves act as Cam.  RGA - RoleGoal Audience.","description":"Content scripting"},{"count":3,"notes":"Done","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-04T13:39:30.290537+00:00',
  '2026-06-04T13:39:30.161+00:00',
  false,
  '10:30:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '74503f2c-8324-47b2-8ec9-702d4f003e4d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-04',
  '[{"count":4,"notes":"Completed shoots for RPDM","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Completed daily posting for Agnomatic","description":"Daily posting"},{"count":1,"notes":"Sent webinar reminder","description":"Reminder management"},{"count":2,"notes":"Completed shoots for Agnomatic","description":"Shoot"},{"count":1,"notes":"Designed carousel post for RPDM","description":"Design"},{"count":1,"notes":"carousel post in progress","description":"Design"}]'::jsonb,
  '',
  '2026-06-04T14:07:02.511794+00:00',
  '2026-06-04T14:07:02.388+00:00',
  false,
  '11:40:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5e3ab783-27bd-4293-af73-403529aab091',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-04',
  '[{"count":1,"notes":"Given 2 Ads with changes","description":"Advisor Alpha"},{"count":1,"notes":"4 Ads Done","description":"Karrier"},{"count":1,"notes":"","description":"Cabin Cupboard Trashing"},{"count":2,"notes":"","description":"Cultural shoot"}]'::jsonb,
  '',
  '2026-06-04T14:08:03.80847+00:00',
  '2026-06-04T14:08:26.679+00:00',
  false,
  '10:29:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '316d6eaf-defa-4fd0-8fbc-7320daa1f904',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-04',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"32","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"},{"count":1,"notes":"6","description":"Today''s visit + online                    6"}]'::jsonb,
  '',
  '2026-06-04T16:16:08.524065+00:00',
  '2026-06-04T16:16:08.383+00:00',
  false,
  '10:15:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '587ab7eb-01b4-4aba-adff-b781e681b1ac',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-04',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI COURSE"}]'::jsonb,
  '',
  '2026-06-04T16:27:17.776403+00:00',
  '2026-06-04T16:27:17.651+00:00',
  false,
  '10:15:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '953e16b1-53c1-4f5f-9464-faec792d4902',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-04',
  '[{"count":4,"notes":"2 amazon ad changed , 1 cultural reel done and 1 in progress, 1 dm informative done","description":"Internal reel editing"},{"count":1,"notes":"1 sm yt in progress","description":"Internal YouTube editing"},{"count":1,"notes":"2 cultural reel, 4 informative","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-04T18:16:14.871469+00:00',
  '2026-06-04T18:16:14.738+00:00',
  false,
  '10:15:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '926ed709-9d81-413b-98f2-81f6407094c6',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-04',
  '[{"count":2,"notes":"2 dm","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issues","description":"Tech support"},{"count":1,"notes":"Lead reply","description":"Regular"},{"count":1,"notes":"1 glass door","description":"Poster"},{"count":2,"notes":"Content calendar changes, content shoot","description":"Content"}]'::jsonb,
  '',
  '2026-06-04T18:19:00.455789+00:00',
  '2026-06-04T18:19:00.303+00:00',
  false,
  '10:29:00',
  '20:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '82b16789-8df1-43e7-b5a2-d55ac7c781e4',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-05',
  '[{"count":7,"notes":"Daily calls","description":"Daily Calls"},{"count":15,"notes":"Follow Up Calls","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-05T13:30:20.716945+00:00',
  '2026-06-05T13:30:20.114+00:00',
  false,
  '09:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c3211999-307e-4a25-af96-0093693802dc',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-05',
  '[{"count":7,"notes":"Shoot At  Andheri","description":"Advisor Alpha"}]'::jsonb,
  '',
  '2026-06-05T14:57:12.685278+00:00',
  '2026-06-05T14:57:12.035+00:00',
  false,
  '10:15:00',
  '20:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '938166ec-e7fa-4ffa-b933-6371f4ce450b',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-05',
  '[{"count":1,"notes":"7","description":"Daily Calls"},{"count":1,"notes":"32","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"},{"count":1,"notes":"Said: ''Good''","description":"Misc Task"}]'::jsonb,
  '',
  '2026-06-05T15:36:57.262739+00:00',
  '2026-06-05T15:36:56.663+00:00',
  false,
  '11:49:00',
  '19:16:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5beaf6c0-6457-4657-9dc4-165c974858a0',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-05',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Work in progress","description":"AI course"}]'::jsonb,
  '',
  '2026-06-05T16:00:29.764688+00:00',
  '2026-06-05T16:00:29.631+00:00',
  false,
  '22:20:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c0d9da89-8eae-42b1-b168-6be9e706a663',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-05',
  '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issue, lms access","description":"Tech support"},{"count":1,"notes":"Course Framework","description":"Ai course"},{"count":4,"notes":"","description":"Poster designs"}]'::jsonb,
  '',
  '2026-06-05T16:03:10.42034+00:00',
  '2026-06-05T16:03:10.291+00:00',
  false,
  '10:15:00',
  '20:38:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '194fb820-680c-4f96-a35b-e0bc236946ed',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-05',
  '[{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-05T16:47:03.948129+00:00',
  '2026-06-05T16:47:03.817+00:00',
  false,
  '10:16:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '426b2b6d-fcbe-4f20-829f-d1b6bf3ef262',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-06',
  '[{"count":5,"notes":"Done. When AI buidls itself. Don’t use word Shouldn’t and Won’t . Promptoptimizer.tools. Views vs Followers vs Sales. Google marketing update","description":"Content scripting"},{"count":2,"notes":"Done","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-06T13:13:58.676927+00:00',
  '2026-06-06T13:13:58.551+00:00',
  false,
  '10:20:00',
  '21:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f33e3fef-031d-4610-9728-0945baca9e9e',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-06',
  '[{"count":4,"notes":"completed shoot for AI course","description":"Shoot"},{"count":1,"notes":"completed carousel post","description":"Design"},{"count":1,"notes":"created link for tomorrow''s Webinar","description":"Webinar management"},{"count":1,"notes":"1 reminder has sent on all may groups and june groups","description":"Reminder management"},{"count":1,"notes":"group has created","description":"WhatsApp group creation"},{"count":1,"notes":"webinar coordination gas done","description":"Webinar coordination"},{"count":1,"notes":"created thumbnail for RPDM","description":"Design"},{"count":1,"notes":"completed Certificates for RPDM Course","description":"Design"}]'::jsonb,
  '',
  '2026-06-06T13:16:48.552481+00:00',
  '2026-06-06T13:16:48.036+00:00',
  false,
  '12:45:00',
  '21:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1d501a97-60d4-4914-8c02-50968f3febb4',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-06',
  '[{"count":10,"notes":"Daily calls","description":"Daily Calls"},{"count":40,"notes":"Follow up calls","description":"Daily Follow-up"},{"count":0,"notes":"Dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-06T13:59:38.178017+00:00',
  '2026-06-06T13:59:38.047+00:00',
  false,
  '09:45:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'aab69e53-82c4-4c99-b3f6-64ca5b6c853a',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-20',
  '[{"count":1,"notes":"1 reel done","description":"Advisor Alpha"},{"count":1,"notes":"1 reel in progress","description":"Shubhash Shrivastav"}]'::jsonb,
  '',
  '2026-06-20T15:18:39.765621+00:00',
  '2026-06-20T15:18:39.654+00:00',
  false,
  '10:15:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9871a387-61ef-4ff6-80f6-c842e5047c5f',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-06',
  '[{"count":1,"notes":"Done","description":"Content scripting"},{"count":16,"notes":"Done. 1 post about Instructor teaching and solving doubts.","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-06T13:35:51.643025+00:00',
  '2026-07-06T13:35:51.514+00:00',
  false,
  '10:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '681125ec-7184-4c05-9e9b-6c18a381ff8e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-06',
  '[{"count":1,"notes":"1 Reel Done, Sorted All the data, Sent Inoive Of May Month, Sheet Updated","description":"Advisor Alpha"},{"count":1,"notes":"Sent Invoice Of April- May Month","description":"MBC"},{"count":1,"notes":"Ads in progress","description":"Karrier"},{"count":1,"notes":"Follow Up with Hardika regarding the Payemnt","description":"Client Management"},{"count":1,"notes":"2 Reels","description":"DM Shoot"},{"count":1,"notes":"","description":"Helped Pooja in the Banner Design"}]'::jsonb,
  '',
  '2026-06-06T14:04:35.913061+00:00',
  '2026-06-06T14:23:46.651+00:00',
  false,
  '10:50:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd49be707-042b-4b6c-b934-6466097161ce',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-06',
  '[{"count":1,"notes":"Dm - not completed","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":6,"notes":"Lms issue, lms access, suspension","description":"Tech support"},{"count":4,"notes":"3 done , 1 in progress","description":"Poster"},{"count":2,"notes":"Dm Exam, testimonials questioners","description":"Exam"},{"count":3,"notes":"Checking, framing","description":"Certificate"}]'::jsonb,
  '',
  '2026-06-06T17:46:33.52982+00:00',
  '2026-06-06T17:46:33.001+00:00',
  false,
  '10:45:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2cc85f9f-e98e-4a38-a647-72ac959fb69e',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-08',
  '[{"count":5,"notes":"Done. Meta’s new Device - Chest pendant. AI in Sports. Send email from Chatgpt. Ollie AI family manager. Time vs Task.","description":"Content scripting"}]'::jsonb,
  '',
  '2026-06-08T13:43:14.209246+00:00',
  '2026-06-08T13:43:14.071+00:00',
  false,
  '10:50:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '727842af-6bbc-4b30-a12a-f6289f0780c3',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-08',
  '[{"count":16,"notes":"fresh daily calls done","description":"Daily Calls"},{"count":40,"notes":"follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"DM Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-08T13:54:49.76667+00:00',
  '2026-06-08T13:54:49.632+00:00',
  false,
  '09:46:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3c037b22-88c3-43d5-85ba-bf9291160869',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-08',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progress","description":"AI course"}]'::jsonb,
  '',
  '2026-06-08T13:58:11.355662+00:00',
  '2026-06-08T13:58:11.217+00:00',
  false,
  '10:25:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '93bb9366-4570-427a-9c96-035b3473a4b1',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-08',
  '[{"count":2,"notes":"2 informative reel done","description":"Internal reel editing"},{"count":5,"notes":"Client shoot , cultural shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-06-08T14:02:11.447199+00:00',
  '2026-06-08T14:02:22.789+00:00',
  false,
  '10:18:00',
  '07:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '89f2070f-de39-484b-af87-531f1e7c77c1',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-08',
  '[{"count":1,"notes":"1 ad Done.","description":"Advisor Alpha"},{"count":1,"notes":"Payment Follow Up Done","description":"MBC"},{"count":1,"notes":"4 Ads Done","description":"Karrier"},{"count":1,"notes":"Follow Up done","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"Cultural Shoot"}]'::jsonb,
  '',
  '2026-06-08T14:27:33.307527+00:00',
  '2026-06-08T14:27:32.711+00:00',
  false,
  '10:38:00',
  '20:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7826e35c-80eb-4cb3-be40-7eab6de6c7a9',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-08',
  '[{"count":5,"notes":"completed shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Carousel design is in progress","description":"Design"},{"count":2,"notes":"banners Design in progress","description":"Design"}]'::jsonb,
  '',
  '2026-06-08T14:35:53.569933+00:00',
  '2026-06-08T14:35:52.991+00:00',
  false,
  '12:15:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '281849ea-7506-49c5-8c96-5b3ad7280e05',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-09',
  '[{"count":4,"notes":"AI + ML + DL + DS. Your own reflection. Customer Hesitation Retention. Meta’s new Series feature.","description":"Content scripting"},{"count":4,"notes":"Delta ad campaign","description":"Delta ad campaign"},{"count":10,"notes":"Thinking of a new reel Series based on Questions Soch ka Test","description":"Reel Series"}]'::jsonb,
  '',
  '2026-06-09T12:39:27.176686+00:00',
  '2026-06-09T12:39:26.586+00:00',
  false,
  '10:50:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3bd1cb4b-a3b0-4c2a-8ac0-c2084875ebc3',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-09',
  '[{"count":7,"notes":"daily fresh calls done","description":"Daily Calls"},{"count":25,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-09T13:26:33.740198+00:00',
  '2026-06-09T13:26:33.61+00:00',
  false,
  '10:00:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f353e9b9-89be-4b02-8ce0-965470aec47c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-09',
  '[{"count":2,"notes":"Payment Follow up, 1 Reel Done.","description":"CA Suyash Sir"},{"count":2,"notes":"1 Ad Done, Changes in Pankaj Sir Ad","description":"Advisor Alpha"},{"count":1,"notes":"Payment Follow up","description":"MBC"},{"count":1,"notes":"Remaining 2 Ads Done, also Provided Raw file to Rutuj","description":"Karrier"},{"count":1,"notes":"Report Meeting","description":"Report Meeting"}]'::jsonb,
  '',
  '2026-06-09T13:39:48.216461+00:00',
  '2026-06-09T13:39:48.055+00:00',
  false,
  '11:02:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '65a5c763-dae1-43a0-8217-0754e793621c',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-09',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progress","description":"AI Course"},{"count":1,"notes":"done","description":"script"}]'::jsonb,
  '',
  '2026-06-09T13:40:05.422853+00:00',
  '2026-06-09T13:40:04.853+00:00',
  false,
  '10:15:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1339a38c-289b-43c1-abf4-2286837a1315',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-09',
  '[{"count":4,"notes":"2 cultural reel , 1 informative reel , 1 DM ad in process 1 cultural reel in process","description":"Internal reel editing"},{"count":1,"notes":"AI course video","description":"Internal YouTube editing"},{"count":1,"notes":"cultural reel ideas","description":"shoot"}]'::jsonb,
  '',
  '2026-06-09T13:39:09.262558+00:00',
  '2026-06-09T13:40:43.431+00:00',
  false,
  '10:15:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd4f54250-7faf-4905-87bf-53713b44de7a',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-09',
  '[{"count":1,"notes":"3","description":"Content scripting"},{"count":1,"notes":"Fund check, meta ads meeting","description":"Ads reporting"},{"count":6,"notes":"Lms issue, hosting space issue checked","description":"Tech support"},{"count":1,"notes":"Content research for yt","description":"Content"},{"count":2,"notes":"Research for posters, poster finalization","description":"Poster"},{"count":1,"notes":"Ig Bio update, linktree links created","description":"Rp"},{"count":1,"notes":"Tried to create ig account bt unable to create there is a issue, fb page created","description":"Delta grp"},{"count":1,"notes":"Hosting space management","description":"Hostinger"}]'::jsonb,
  '',
  '2026-06-09T13:47:35.145915+00:00',
  '2026-06-09T13:47:34.356+00:00',
  false,
  '10:20:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f233ad04-8f57-4e44-9c91-a18c28ecdf06',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-09',
  '[{"count":1,"notes":"4","description":"Daily Calls"},{"count":1,"notes":"30","description":"Daily Follow-up"},{"count":1,"notes":"2","description":"DM Enrollment"},{"count":1,"notes":"2","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-09T14:27:58.638685+00:00',
  '2026-06-09T14:27:57.999+00:00',
  false,
  '10:10:00',
  '19:16:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '92817a0f-b469-43d0-bb04-3bc997444160',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-09',
  '[{"count":1,"notes":"RPDM carousel in progress","description":"Design"},{"count":1,"notes":"Webinar remainder has gone","description":"Reminder management"},{"count":1,"notes":"Ai ad creative in progress","description":"Design"},{"count":1,"notes":"Delta ad creative","description":"Design"}]'::jsonb,
  '',
  '2026-06-09T15:12:12.721079+00:00',
  '2026-06-09T15:12:12.118+00:00',
  false,
  '11:30:00',
  '16:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5382be34-2006-4641-93f8-56f0cc986df1',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-10',
  '[{"count":6,"notes":"Google is releasing 3 crore Mosquitos. Apple’s Siri update with Google Gemini.India outpaces developing countries in AI race. The Rise of \"Agentic AI\": Biosecurity Governance:","description":"Content scripting"},{"count":3,"notes":"","description":"research on Delta project"}]'::jsonb,
  '',
  '2026-06-10T12:31:08.644318+00:00',
  '2026-06-10T12:31:08.517+00:00',
  false,
  '10:05:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '58c2db23-06f5-41ea-8d64-e57a17376221',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-10',
  '[{"count":1,"notes":"Recieved Payment From Suyash sir","description":"CA Suyash Sir"},{"count":1,"notes":"1 Ads Changes and 1 Reel Done","description":"Advisor Alpha"},{"count":3,"notes":"3 Cultural reels shoot","description":"Cultural reel Shoot"},{"count":1,"notes":"","description":"Amaozn Lec in progress"}]'::jsonb,
  '',
  '2026-06-10T13:37:03.19631+00:00',
  '2026-06-10T13:37:03.066+00:00',
  false,
  '10:22:00',
  '19:22:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '41580275-f8e2-4b80-a68c-519bd972c397',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-10',
  '[{"count":3,"notes":"2 CULTURAL DONE , 1 OORRUU MEDIA REEL IN PROCESS","description":"Internal reel editing"},{"count":9,"notes":"4 cultural reel , 5 DM informative reel shoot","description":"SHOOT"}]'::jsonb,
  '',
  '2026-06-10T13:38:05.604619+00:00',
  '2026-06-10T13:38:05.469+00:00',
  false,
  '10:20:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fcbef983-225e-4b47-bff5-10791566ad5c',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-10',
  '[{"count":7,"notes":"completed DM & cultural shoots","description":"Shoot"},{"count":2,"notes":"designed thumbnails For DM & agnomatic","description":"Design"},{"count":1,"notes":"daily posting done on agnomatic","description":"Daily posting"},{"count":1,"notes":"Designed carousel for Dm","description":"Design"}]'::jsonb,
  '',
  '2026-06-10T13:39:14.069824+00:00',
  '2026-06-10T13:39:13.939+00:00',
  false,
  '12:26:00',
  '19:14:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e9e723ef-672e-4735-b11f-7851bc97be3e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-10',
  '[{"count":6,"notes":"fresh daily calls","description":"Daily Calls"},{"count":40,"notes":"follow up calls","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-10T13:44:17.580373+00:00',
  '2026-06-10T13:44:16.948+00:00',
  false,
  '09:50:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '358bab71-9eb5-4e86-a8d1-21c947a94ead',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-10',
  '[{"count":1,"notes":"Dm ig update","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":3,"notes":"Lms issue, lms access,","description":"Tech support"},{"count":7,"notes":"Calls done, lms access, WhatsApp group add","description":"New batch"},{"count":1,"notes":"Leads replies","description":"Regular"},{"count":1,"notes":"Content research, content shoot, cultural shoot","description":"Content"},{"count":1,"notes":"3","description":"Poster"}]'::jsonb,
  '',
  '2026-06-10T13:58:27.448365+00:00',
  '2026-06-10T13:58:27.324+00:00',
  false,
  '10:22:00',
  '19:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '07275b39-1ed5-42a7-9fa9-3004767d9e2a',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-10',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"Cultural reel shoot (4)","description":"Shoot"},{"count":1,"notes":"work in progress","description":"AI course"},{"count":1,"notes":"reels collected from main page","description":"The Delta Group"}]'::jsonb,
  '',
  '2026-06-10T14:05:10.441358+00:00',
  '2026-06-10T14:05:09.875+00:00',
  false,
  '10:20:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5e59383a-c419-4271-9bb9-7edbcc9d7b04',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-10',
  '[{"count":1,"notes":"4","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-10T15:05:31.760328+00:00',
  '2026-06-10T15:05:31.198+00:00',
  false,
  '10:25:00',
  '19:16:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5ddb9ae1-106b-436d-9351-7cea857b0bce',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-11',
  '[{"count":5,"notes":"Saloon Automation. Use AI wisely. SEO vs AEO vs GEO in jobs .  Chatgpt vs Gemini vs Claude - role of each AI tool. RGA framework.","description":"Content scripting"},{"count":4,"notes":"done","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-11T13:07:04.063928+00:00',
  '2026-06-11T13:07:03.377+00:00',
  false,
  '09:55:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6255c5a5-dd9f-45ea-9da0-5c3dbec80d93',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-11',
  '[{"count":15,"notes":"Daily fresh calls done","description":"Daily Calls"},{"count":40,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-11T13:35:23.579464+00:00',
  '2026-06-11T13:35:23.452+00:00',
  false,
  '09:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dac7e9fd-704c-4506-8ba5-ff3967f74253',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-11',
  '[{"count":4,"notes":"completed Shoots for Agnomatic & RPDM","description":"Shoot"},{"count":1,"notes":"Completed design of thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Daily posting has done on Agnomatic","description":"Daily posting"},{"count":1,"notes":"Reminder has gone on webinar group","description":"Reminder management"},{"count":4,"notes":"Designed Ad creatives for RPDM","description":"Design"},{"count":1,"notes":"Designed thumbnail for Agnomatic","description":"Design"}]'::jsonb,
  '',
  '2026-06-11T13:37:00.551849+00:00',
  '2026-06-11T13:37:00.434+00:00',
  false,
  '10:55:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '88446008-8f1b-47e9-a583-33082fb81591',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-11',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work in progrees","description":"AI course"},{"count":1,"notes":"video posting","description":"The Delta Group"},{"count":1,"notes":"1 script","description":"script"}]'::jsonb,
  '',
  '2026-06-11T14:02:25.713278+00:00',
  '2026-06-11T14:02:25.071+00:00',
  false,
  '10:20:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'aaa6333a-e014-4279-bf37-b08828a85de8',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-16',
  '[{"count":1,"notes":"form changes, fund check","description":"Ads reporting"},{"count":1,"notes":"lms issues, lms access, access call","description":"Tech support"},{"count":2,"notes":"2, research","description":"poster"},{"count":1,"notes":"content research","description":"content"}]'::jsonb,
  '',
  '2026-06-16T14:22:57.772083+00:00',
  '2026-06-16T14:22:57.101+00:00',
  false,
  '10:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1cf67c0a-8113-44a6-9fa9-314994196d6e',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-12',
  '[{"count":6,"notes":"Agnomatic: Stop doing work manually. What Happens After a Lead Fills a Form? Why Businesses Lose Leads in the First 5 Minutes. AI Agent. vs Virtual Assistant. Digital Marketing cultural.","description":"Content scripting"},{"count":2,"notes":"done","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-12T13:00:04.89493+00:00',
  '2026-06-12T13:00:04.724+00:00',
  false,
  '10:35:00',
  '18:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a3ae15f8-487c-4282-97ad-3a51f22b72a2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-12',
  '[{"count":1,"notes":"1 reel in progress","description":"CA Suyash Sir"},{"count":2,"notes":"1 Reel done, 1 Ad Done, and changes in previous ad","description":"Advisor Alpha"},{"count":1,"notes":"Raunaq given my no. to one of his friend. So she called me of enquiry","description":"One enquiry about our service."}]'::jsonb,
  '',
  '2026-06-12T14:24:40.86588+00:00',
  '2026-06-12T14:24:40.228+00:00',
  false,
  '10:14:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4f333a64-1ece-41fc-af96-46bcce212ea4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-12',
  '[{"count":3,"notes":"completed Cultural Shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for agnomatic","description":"Design"},{"count":1,"notes":"Daily posting has done on agnomatic","description":"Daily posting"},{"count":1,"notes":"reminder gone on webinar group","description":"Reminder management"},{"count":1,"notes":"group created for next sunday","description":"WhatsApp group creation"},{"count":1,"notes":"Doubt solving reminder gone on both groups","description":"Reminder"},{"count":2,"notes":"made zoom links for Webinar & doubt solving Session","description":"ZOOM Links"},{"count":4,"notes":"designed Delta creatives","description":"Design"},{"count":1,"notes":"Designed creatives for Ai audit","description":"Design"},{"count":1,"notes":"Static post of agnomatic is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-06-12T14:30:17.518981+00:00',
  '2026-06-12T14:30:17.381+00:00',
  false,
  '12:17:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b3e0d773-3562-4abf-952f-3c0ba2c9ccae',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-11',
  '[{"count":1,"notes":"4 Ads And 2 Reels Shooting Done at Andheri","description":"Advisor Alpha"},{"count":1,"notes":"","description":"1 ad of Prashant Salvi Done"}]'::jsonb,
  '',
  '2026-06-11T15:22:53.455371+00:00',
  '2026-06-11T15:22:52.87+00:00',
  false,
  '09:50:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '90f7111f-31ed-47c0-9ae6-1d68c7388af5',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-11',
  '[{"count":1,"notes":"1 info for dm","description":"Internal reel editing"},{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-11T16:26:29.831255+00:00',
  '2026-06-11T16:26:29.201+00:00',
  false,
  '10:20:00',
  '20:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e2969a72-9b9d-4398-b956-f9a693b8e496',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-11',
  '[{"count":2,"notes":"2 yt dm","description":"Content scripting"},{"count":1,"notes":"fund check, meta-ads meeting","description":"Ads reporting"},{"count":8,"notes":"lms issue, lms access, website backup msg in 2 grps","description":"Tech support"},{"count":6,"notes":"mtw new batch created (lms & whats app grp), access created","description":"new batch"},{"count":12,"notes":"Placement sheet created, resumes added","description":"placement sheet"},{"count":3,"notes":"lead replies, rushi sir''s shoot, paper check, content research","description":"regular"},{"count":2,"notes":"amazon calls, welcome call","description":"calls"},{"count":1,"notes":"Sushma''s website creation explains to Rohan","description":"website"},{"count":1,"notes":"drive folder created, all files added","description":"Delta grp"},{"count":1,"notes":"Dm master sheet update","description":"Master Sheet"},{"count":1,"notes":"poster Tried but Canva was not working properly","description":"canva"}]'::jsonb,
  '',
  '2026-06-11T14:42:02.11226+00:00',
  '2026-06-11T18:08:06.244+00:00',
  false,
  '09:50:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd7e24c90-2e6f-45b9-aa0f-1201cd53d60e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-12',
  '[{"count":4,"notes":"Fresh Daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-12T12:43:26.964478+00:00',
  '2026-06-12T12:43:26.833+00:00',
  false,
  '09:55:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '380406f4-c730-41aa-9ced-cb39063433ee',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-12',
  '[{"count":1,"notes":"ca suyash","description":"Client posting"},{"count":3,"notes":"yt long, ig","description":"Content scripting"},{"count":1,"notes":"fund check, delta ad structure","description":"Ads reporting"},{"count":4,"notes":"lms issues","description":"Tech support"},{"count":2,"notes":"oorruu posting","description":"posting"},{"count":5,"notes":"2 finalize, 2 changes, 1 new start","description":"poster"},{"count":1,"notes":"lead replies, script check","description":"regular"}]'::jsonb,
  '',
  '2026-06-12T14:34:10.527945+00:00',
  '2026-06-12T14:34:10.409+00:00',
  false,
  '10:14:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '443e36c7-a16f-48bf-9e70-672118103f19',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-12',
  '[{"count":0,"notes":"Made daily calls","description":"Daily Calls"},{"count":0,"notes":"Made follow-up calls","description":"Daily Follow-up"},{"count":0,"notes":"Completed DM enrollments","description":"DM Enrollment"},{"count":0,"notes":"Completed Amazon enrollments","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-12T16:21:49.184382+00:00',
  '2026-06-12T16:21:49.063+00:00',
  false,
  '10:25:00',
  '18:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a142d3d2-423b-4bf6-b02a-d75897ee160e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-12',
  '[{"count":4,"notes":"3 informative reel 2 dm and 1 agnomatic, 1 cultural reel done","description":"Internal reel editing"},{"count":3,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-12T16:40:48.695817+00:00',
  '2026-06-12T16:40:48.013+00:00',
  false,
  '10:18:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '51761617-bd98-49e5-9b4b-a9b6fa2c61a2',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-12',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"}]'::jsonb,
  '',
  '2026-06-12T17:16:29.372334+00:00',
  '2026-06-12T17:16:29.235+00:00',
  false,
  '10:18:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '11535f99-9a80-44e2-8045-4ccf724f4148',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-13',
  '[{"count":5,"notes":"Vive coding Vs Hard Coding. Future of Small Businesses with Automation.. Your Next Employee is a Workflow. Save 20 Hours/Week Using Automation.  CRM Mistakes Costing Revenue","description":"Content scripting"}]'::jsonb,
  '',
  '2026-06-13T11:53:15.22726+00:00',
  '2026-06-13T11:53:15.099+00:00',
  false,
  '10:15:00',
  '17:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'afdde26b-525e-463d-926c-85a3bc810241',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-13',
  '[{"count":4,"notes":"fresh daily calls done","description":"Daily Calls"},{"count":20,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-13T12:58:30.014363+00:00',
  '2026-06-13T12:58:29.896+00:00',
  false,
  '09:55:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dba055b5-d054-4dd2-b77b-42de22543aa2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-06',
  '[{"count":2,"notes":"1 Amazon Ad, 1 Dm Ad","description":"Ads"},{"count":6,"notes":"6 Episodes done","description":"Amazon Hindi Course"}]'::jsonb,
  '',
  '2026-07-06T14:23:13.890785+00:00',
  '2026-07-06T14:23:13.767+00:00',
  false,
  '10:34:00',
  '20:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5a4cb3e6-b2bb-4b86-9c2b-e19b8e052a0b',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-13',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"assignment cheacked","description":"LMS"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"posting","description":"The Delta Group"}]'::jsonb,
  '',
  '2026-06-13T12:59:49.568636+00:00',
  '2026-06-13T12:59:49.458+00:00',
  false,
  '11:00:00',
  '18:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6e0ebf49-704f-4ab5-b7c8-ba0e31399641',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-13',
  '[{"count":1,"notes":"1 reel done","description":"CA Suyash Sir"},{"count":1,"notes":"1 reel done","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up regarding the videos","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"1 Ad of Prashant Salvi Done"},{"count":1,"notes":"watched 2 editing tutorials","description":"Video Editin Tutorials"},{"count":1,"notes":"","description":"Bought New Keyboard for PC"}]'::jsonb,
  '',
  '2026-06-13T13:23:20.660496+00:00',
  '2026-06-13T13:23:20.534+00:00',
  false,
  '10:18:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7839b160-6822-4107-a12b-1e7411dfc5ba',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-13',
  '[{"count":4,"notes":"1 dm ad, 2 dm informative , 1 oorruu media reel","description":"Internal reel editing"},{"count":1,"notes":"1 oorruu reel in process","description":"in process"}]'::jsonb,
  '',
  '2026-06-13T14:16:41.643267+00:00',
  '2026-06-13T14:16:41.522+00:00',
  false,
  '10:15:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ea97d242-55ee-4adc-b910-44ce245e51a9',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-13',
  '[{"count":1,"notes":"ca suyash","description":"Client posting"},{"count":1,"notes":"Yt","description":"Content scripting"},{"count":1,"notes":"Delta campaign live","description":"Ads reporting"},{"count":3,"notes":"Lms issue, instructor change done, lms access","description":"Tech support"},{"count":1,"notes":"Ad creatives changes, ca thumbnail","description":"Canva"},{"count":3,"notes":"Access to rpdm69","description":"Canva pro"},{"count":1,"notes":"Posting schedule","description":"Oorruu"},{"count":1,"notes":"2 post schedule","description":"Shubhvandan"}]'::jsonb,
  '',
  '2026-06-13T15:52:47.277331+00:00',
  '2026-06-13T15:52:46.69+00:00',
  false,
  '10:18:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '741e1d32-bcbe-465b-bf1b-740c57b57121',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-15',
  '[{"count":25,"notes":"daily calls done","description":"Daily Calls"},{"count":40,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-15T13:28:14.080094+00:00',
  '2026-06-15T13:28:13.474+00:00',
  false,
  '09:55:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd6f8a71c-c9a7-4711-a5a7-1064f630c63c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-15',
  '[{"count":1,"notes":"1 reel in progress","description":"CA Suyash Sir"},{"count":1,"notes":"1 ad done, 2 ads given in different formats","description":"Advisor Alpha"},{"count":1,"notes":"","description":"1 Ad of Prashant Salvi Done"},{"count":1,"notes":"","description":"Video editing Tutorials"}]'::jsonb,
  '',
  '2026-06-15T13:32:19.635801+00:00',
  '2026-06-15T13:32:18.995+00:00',
  false,
  '10:38:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8fb476aa-e7a6-4c33-95d5-4befd06f726a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-15',
  '[{"count":4,"notes":"2 cultural reel , 1 dm informative , dm ad changes","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-06-15T13:34:11.76923+00:00',
  '2026-06-15T13:34:11.647+00:00',
  false,
  '10:22:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '91c000eb-0ba4-447e-9256-557de31ad08c',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-15',
  '[{"count":8,"notes":"Claude अब Video भी बना सकता है. ChatGPT अब Interactive Charts बना सकता है. Kimi Work: एक साथ 300 AI Agents. Jeff Bezos का नया AI Startup. US Government ने दुनिया के सबसे Powerful AI को Ban कर दिया. Post करने का सबसे सही समय कौन सा है?. Hashtags अभी भी काम करते हैं या नहीं?. Instagram Algorithm आखिर काम कैसे करता है?.","description":"Content scripting"}]'::jsonb,
  '',
  '2026-06-15T13:35:55.318714+00:00',
  '2026-06-15T13:35:55.191+00:00',
  false,
  '10:30:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c87e292d-40c0-42cf-8f1f-0b74d3df5c91',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-15',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"posting","description":"The Delta Group"}]'::jsonb,
  '',
  '2026-06-15T13:46:53.329997+00:00',
  '2026-06-15T13:48:05.178+00:00',
  false,
  '10:22:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f418fd0f-eb2a-402b-b6c8-56b516a19160',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-15',
  '[{"count":1,"notes":"shreya script training","description":"Content scripting"},{"count":1,"notes":"delta ad, leads, fund","description":"Ads reporting"},{"count":22,"notes":"lms access, amazon access, amazon msgs, added to WA grp, lms issue","description":"Tech support"},{"count":17,"notes":"enrollment calls, amazon calls","description":"calls"},{"count":1,"notes":"list of students for new batches, gave them access","description":"operations"},{"count":1,"notes":"1","description":"poster"},{"count":1,"notes":"leads replies, amazon webinar leads issues","description":"regular"}]'::jsonb,
  '',
  '2026-06-15T13:50:03.348505+00:00',
  '2026-06-15T13:50:02.675+00:00',
  false,
  '10:38:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3312b239-d1f7-4082-97c2-32d66a1433d0',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-15',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-15T15:21:19.793723+00:00',
  '2026-06-15T15:21:19.194+00:00',
  false,
  '10:25:00',
  '18:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9473fcbc-b8a2-4bc8-a14b-5cf641b4956d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-15',
  '[{"count":1,"notes":"completed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"posting done on Agnomatic","description":"Daily posting"}]'::jsonb,
  '',
  '2026-06-15T13:53:37.259+00:00',
  '2026-06-15T17:18:01.403+00:00',
  false,
  '13:42:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ae2fba81-9df8-4ee2-a295-928f5b682001',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-16',
  '[{"count":6,"notes":"Brain Chip.  Youtube AI video tag. Ads on OTT. Jiohotstar Ads. No Leads. Zomato case study. Followers increase but no conversion. 3 AI tools for business","description":"Content scripting"}]'::jsonb,
  '',
  '2026-06-16T13:15:42.753561+00:00',
  '2026-06-16T13:40:06.566+00:00',
  false,
  '11:25:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6af0e915-d830-43c8-a06a-49f25c880f60',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-16',
  '[{"count":1,"notes":"1 Reel In Progress","description":"CA Suyash Sir"},{"count":2,"notes":"1 Reel Done, 1 Ad in progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Regarding Payment, Invoice Revisions","description":"MBC"},{"count":1,"notes":"","description":"Made Banner Design On Corel Draw"}]'::jsonb,
  '',
  '2026-06-16T13:51:31.91074+00:00',
  '2026-06-16T13:51:31.792+00:00',
  false,
  '10:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '86107406-8ac9-4b9f-9deb-b72015226d66',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-06',
  '[{"count":1,"notes":"16","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-06T17:45:50.903902+00:00',
  '2026-07-06T17:45:50.784+00:00',
  false,
  '11:49:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5e10559b-df3d-407e-b2d7-0cc9d273c5e9',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-16',
  '[{"count":3,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Completed thumbnail design","description":"Design"},{"count":1,"notes":"Reminder has gone","description":"Reminder management"},{"count":1,"notes":"Completed banner design","description":"Design"},{"count":1,"notes":"Completed Ad creative","description":"Design"}]'::jsonb,
  '',
  '2026-06-16T15:07:58.415443+00:00',
  '2026-06-16T15:07:57.817+00:00',
  false,
  '12:15:00',
  '20:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ce9154e2-ef99-48ed-8b8e-374048627296',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-16',
  '[{"count":1,"notes":"12","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-16T15:53:38.245966+00:00',
  '2026-06-16T15:53:38.1+00:00',
  false,
  '09:25:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'de520960-6fbc-451b-aee3-f1025e8d72dd',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-16',
  '[{"count":3,"notes":"Cultural reel,","description":"Internal reel editing"},{"count":1,"notes":"Ai course shoot","description":"Shoot"},{"count":1,"notes":"Help rohan for banner making","description":"Other"}]'::jsonb,
  '',
  '2026-06-16T18:27:13.174832+00:00',
  '2026-06-16T18:27:13.04+00:00',
  false,
  '10:12:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2ff5dc97-f81d-4f78-afaf-bae574231d62',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-17',
  '[{"count":3,"notes":"3 Ads Done","description":"Advisor Alpha"},{"count":1,"notes":"Meeting with Shubhash Sir Regarding Editing Service.","description":"Shubhash Shrivastav"}]'::jsonb,
  '',
  '2026-06-17T13:27:47.132632+00:00',
  '2026-06-17T13:27:46.994+00:00',
  false,
  '10:07:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cfdb75d1-913a-4a19-8209-be4a947c50c1',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-17',
  '[{"count":35,"notes":"Dialy fresh calls done`","description":"Daily Calls"},{"count":20,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":20,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-17T13:36:20.417366+00:00',
  '2026-06-17T13:36:20.307+00:00',
  false,
  '10:00:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f52c6249-8243-47f8-88bc-bfe721e75bf7',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-17',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-17T17:08:33.574441+00:00',
  '2026-06-17T17:08:32.987+00:00',
  false,
  '11:47:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cf5b4671-f465-418e-952e-6f1ae5c0ba72',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-17',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"}]'::jsonb,
  '',
  '2026-06-17T17:40:53.08741+00:00',
  '2026-06-17T17:40:52.978+00:00',
  false,
  '10:18:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ac4a5edd-d9bd-49c1-82fe-78c91cb15f4d',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-17',
  '[{"count":3,"notes":"3 cultural reel","description":"Internal reel editing"},{"count":1,"notes":"1 sm long video in progress","description":"Internal YouTube editing"},{"count":2,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-17T17:43:49.222485+00:00',
  '2026-06-17T17:43:48.576+00:00',
  false,
  '10:18:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '89fea389-6f18-4ba9-b05e-a30960f15363',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-17',
  '[{"count":1,"notes":"Ca suyash","description":"Client posting"},{"count":1,"notes":"Form changes","description":"Ads reporting"},{"count":1,"notes":"Lms issue, lms access","description":"Tech support"},{"count":1,"notes":"Meeting with sir, attendance sheets update","description":"Placement"},{"count":1,"notes":"Leads replies, content shoot, content research","description":"Regular"}]'::jsonb,
  '',
  '2026-06-17T17:45:17.375766+00:00',
  '2026-06-17T17:45:17.263+00:00',
  false,
  '10:07:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b7c3c6d1-347d-4a4f-8ed7-3fa7d643b9dc',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-17',
  '[{"count":2,"notes":"Completed cultural shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Designed carousel for RPDM","description":"Design"}]'::jsonb,
  '',
  '2026-06-17T18:01:17.059519+00:00',
  '2026-06-17T18:01:16.919+00:00',
  false,
  '12:15:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '65bb17e3-09c1-4f97-9704-a3ac1933bdf9',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-18',
  '[{"count":10,"notes":"daily fresh calls done","description":"Daily Calls"},{"count":20,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-18T13:32:48.802202+00:00',
  '2026-06-18T13:32:48.208+00:00',
  false,
  '09:58:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a6899401-4dca-4185-894e-ed41b2eb9405',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-18',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"work in progress","description":"AI course"}]'::jsonb,
  '',
  '2026-06-18T13:38:19.434294+00:00',
  '2026-06-18T13:38:19.297+00:00',
  false,
  '10:20:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a7998b52-b459-4207-a9b8-ca1b3f8338da',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-18',
  '[{"count":2,"notes":"2 cultural reel","description":"Internal reel editing"},{"count":1,"notes":"sm yt in process","description":"Internal YouTube editing"},{"count":1,"notes":"DM, Agnomatic, Ai course shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-06-18T13:41:50.226318+00:00',
  '2026-06-18T13:41:49.575+00:00',
  false,
  '10:20:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '406a6606-94a0-4b51-8e15-3a623644a7ef',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-18',
  '[{"count":1,"notes":"1 Reel In Progress","description":"CA Suyash Sir"},{"count":2,"notes":"2 Ads Modifications, 1 ad done.","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up, reel in progress","description":"Shubhash Shrivastav"}]'::jsonb,
  '',
  '2026-06-18T13:55:01.294648+00:00',
  '2026-06-18T13:55:01.16+00:00',
  false,
  '10:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '934f3f06-04ef-459e-9f0a-4e09b32b8d04',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-20',
  '[{"count":4,"notes":"Completed shoots for RPDM and Agnomatic","description":"Shoot"},{"count":1,"notes":"Designed static post for RPDM","description":"Design"},{"count":1,"notes":"reminder has sent on whatsapp group","description":"Reminder management"},{"count":1,"notes":"Whatsapp group has created","description":"WhatsApp group creation"},{"count":1,"notes":"zoom link has created for tomorrow''s Webinar","description":"zoom link"},{"count":1,"notes":"completed design of thumbnail","description":"Design"},{"count":1,"notes":"Designed Festival post","description":"Design"}]'::jsonb,
  '',
  '2026-06-20T14:13:56.68804+00:00',
  '2026-06-20T14:15:50.939+00:00',
  false,
  '12:11:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd47dd170-9095-4abc-affb-422fdd52b070',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-20',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"}]'::jsonb,
  '',
  '2026-06-20T14:36:11.256897+00:00',
  '2026-06-20T14:36:11.131+00:00',
  false,
  '10:20:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dad74447-dffd-4257-a32c-0e28133b2e92',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-18',
  '[{"count":1,"notes":"Yt script changes","description":"Content scripting"},{"count":2,"notes":"Delta Leads, fund check","description":"Ads reporting"},{"count":4,"notes":"Lms suspension, lms unsuspend, lms access","description":"Tech support"},{"count":5,"notes":"Morning batch reminder calls","description":"New batch"},{"count":2,"notes":"Shubham, pooja lokhande","description":"Student follow up"},{"count":1,"notes":"Shri sir yt video download","description":"Video download"},{"count":1,"notes":"","description":"Oorruu posting"},{"count":1,"notes":"","description":"Ganpati posting"},{"count":3,"notes":"Attendance sheet update, attendance mark 2 batch complete, 1 half","description":"Attendance sheet"},{"count":1,"notes":"Created","description":"Placement sheet"},{"count":12,"notes":"Seo requirement cvs sent","description":"Cv shared"},{"count":1,"notes":"Lead replies, content monitor,","description":"Regular"},{"count":1,"notes":"Swapnil sir call done, insta login","description":"Client follow up"}]'::jsonb,
  '',
  '2026-06-18T14:01:44.914065+00:00',
  '2026-06-18T14:01:44.789+00:00',
  false,
  '10:30:00',
  '19:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '24f0389c-7cd8-4520-828f-9dea189f1f40',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-18',
  '[{"count":1,"notes":"completed shoot for agnomatic","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"podting has done on Agnomatic","description":"Daily posting"},{"count":1,"notes":"reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"completed carousel design for RPDM","description":"Design"},{"count":1,"notes":"Designed post for agnomatic","description":"Design"}]'::jsonb,
  '',
  '2026-06-18T14:46:00.22392+00:00',
  '2026-06-18T14:45:59.573+00:00',
  false,
  '12:50:00',
  '20:31:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f3c7614c-34bd-4635-8b1d-0083b385b306',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-18',
  '[{"count":1,"notes":"20","description":"Daily Calls"},{"count":1,"notes":"20","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-18T17:54:31.468411+00:00',
  '2026-06-18T17:54:31.336+00:00',
  false,
  '10:40:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c5eb3d68-45d4-4060-a7f9-5eea0ed7d6b6',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-19',
  '[{"count":5,"notes":"daily calls fresh done","description":"Daily Calls"},{"count":15,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-19T12:20:40.709365+00:00',
  '2026-06-19T12:24:41.947+00:00',
  false,
  '09:55:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a47a04cd-4eaa-4537-a9ee-bd2fc7277633',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-19',
  '[{"count":6,"notes":"Order Sunlight from Space. Paid for daily work. “AI Overviews में rank करना चाहते हो? First AI city. China has created Digital paper using AI.","description":"Content scripting"},{"count":2,"notes":"Done","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-19T13:15:16.426746+00:00',
  '2026-06-19T13:15:16.3+00:00',
  false,
  '10:55:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3cb73692-34d8-4248-a1bb-dc5cbf98c941',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-19',
  '[{"count":3,"notes":"1 CA reel , 2 cultural reel","description":"Internal reel editing"},{"count":1,"notes":"1 in process","description":"Internal YouTube editing"},{"count":3,"notes":"cultural reel shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-06-19T13:44:50.712214+00:00',
  '2026-06-19T13:44:50.142+00:00',
  false,
  '10:15:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b706981d-e84f-4ae3-aeee-08826336eddb',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-19',
  '[{"count":3,"notes":"1 reel adn 1 ad done, 1 ad changes","description":"Advisor Alpha"},{"count":1,"notes":"1 reel in progress","description":"Shubhash Shrivastav"},{"count":1,"notes":"","description":"2 cultural shoots"}]'::jsonb,
  '',
  '2026-06-19T16:27:10.464565+00:00',
  '2026-06-19T16:27:09.894+00:00',
  false,
  '10:09:00',
  '21:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '09992c1a-d1b5-4417-acf3-b38e4c31b5b6',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-19',
  '[{"count":4,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Design static post for RPDM","description":"Design"},{"count":1,"notes":"Sent reminder","description":"Reminder management"},{"count":1,"notes":"Design static post for oorruu media","description":"Design"}]'::jsonb,
  '',
  '2026-06-19T17:16:54.854518+00:00',
  '2026-06-19T17:16:54.274+00:00',
  false,
  '11:40:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b5081ecf-7ba3-49fe-a44f-2ee3ea9c8747',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-19',
  '[{"count":4,"notes":"Ig","description":"Content scripting"},{"count":4,"notes":"Delta Leads, funds checking, delta ad creative changes","description":"Ads reporting"},{"count":5,"notes":"Lms access, Lms issue, amzon webinar issue","description":"Tech support"},{"count":1,"notes":"Done, changes told to shreya and rohan","description":"Ig audit"},{"count":1,"notes":"Oorruu","description":"Posting"},{"count":1,"notes":"Enquiry email done","description":"Wise app"},{"count":10,"notes":"Monday new batch calls done","description":"New batch"},{"count":1,"notes":"Welcome call","description":"Calls"},{"count":1,"notes":"Dm content calendar update, insights and captions added","description":"Content sheet"},{"count":1,"notes":"Lead replies, content shoot, content ideas","description":"Regular"}]'::jsonb,
  '',
  '2026-06-19T17:32:08.482356+00:00',
  '2026-06-19T17:32:08.374+00:00',
  false,
  '10:09:00',
  '21:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f2943fb0-a6cf-4bf5-acbd-74edef4059aa',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-19',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"},{"count":1,"notes":"Work in progress","description":"Ai course"},{"count":1,"notes":"Done","description":"Content calendar update"}]'::jsonb,
  '',
  '2026-06-19T17:41:40.872722+00:00',
  '2026-06-19T17:41:40.77+00:00',
  false,
  '10:15:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '017ab688-d0c5-4dd4-b14f-ac5da711d67e',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-20',
  '[{"count":5,"notes":"Midjourney has created an AI Machine that detects cancer in just 60 minutes. Stop thinking start building.FIFA Football Has AI Chips Inside! Fake Courier scam. Real Estate में Agnomatic.","description":"Content scripting"},{"count":1,"notes":"done","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-20T12:45:33.577117+00:00',
  '2026-06-20T12:45:52.459+00:00',
  false,
  '10:55:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4b6e54c1-ecb7-4a56-be16-81723df98a18',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-20',
  '[{"count":25,"notes":"Daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-20T13:14:35.11711+00:00',
  '2026-06-20T13:14:34.992+00:00',
  false,
  '09:55:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '78513c81-b72c-4974-a3bb-c9ce10f8e835',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-20',
  '[{"count":2,"notes":"1 dm informative , 1 cultural reel","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-06-20T14:06:42.622703+00:00',
  '2026-06-20T14:06:42.038+00:00',
  false,
  '10:20:00',
  '07:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '56792ae1-c9dd-41aa-8e82-0fa65e1664ab',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-20',
  '[{"count":1,"notes":"12","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"},{"count":1,"notes":"3","description":"Councelling"}]'::jsonb,
  '',
  '2026-06-20T16:48:29.828416+00:00',
  '2026-06-20T16:48:29.158+00:00',
  false,
  '10:25:00',
  '18:49:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2fc7315f-febe-4715-b962-7fe5e25fa0fc',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-22',
  '[{"count":5,"notes":"Water is for AI not for Humans.  ChatGPT Camera Feature (iOS).  ChatGPT Scheduled Tasks.  Claude Design Update. Perplexity Brain Memory.","description":"Content scripting"},{"count":2,"notes":"DOne","description":"Shooting"}]'::jsonb,
  '',
  '2026-06-22T13:20:36.461335+00:00',
  '2026-06-22T13:20:35.818+00:00',
  false,
  '10:30:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6746473e-2925-4ad2-8e53-6dfee41caffe',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-22',
  '[{"count":3,"notes":"2 info (dm,Agno), 1 ganpati bappa reel","description":"Internal reel editing"},{"count":1,"notes":"SM yt in process","description":"Internal YouTube editing"},{"count":1,"notes":"culutral reel shoot (dm, oorruu )","description":"shoot"}]'::jsonb,
  '',
  '2026-06-22T13:47:52.807347+00:00',
  '2026-06-22T13:47:52.687+00:00',
  false,
  '10:12:00',
  '07:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e617d67e-3519-4dff-bb1c-33d7683ecf9f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-22',
  '[{"count":1,"notes":"Follow Up regarding FB Issue","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel In progress, Shoot Scheduled Tommorow","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Shubhash Shrivastav"},{"count":1,"notes":"1 DM Cultural Shoot","description":"1 Cultural Shoot"}]'::jsonb,
  '',
  '2026-06-22T13:49:24.4782+00:00',
  '2026-06-22T13:49:23.855+00:00',
  false,
  '10:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3be4a812-8176-4c26-b80e-5e9c1b770953',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-22',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"work in progress","description":"AI course"},{"count":1,"notes":"cultural shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-06-22T13:49:27.89955+00:00',
  '2026-06-22T13:49:27.771+00:00',
  false,
  '10:12:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e5543127-a433-4677-97d8-3636432956e8',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-22',
  '[{"count":3,"notes":"completed shoots","description":"Shoot"},{"count":1,"notes":"designed carousel post","description":"Design"},{"count":1,"notes":"posting has done","description":"Daily posting"},{"count":2,"notes":"designed static post","description":"Design"}]'::jsonb,
  '',
  '2026-06-22T14:47:23.13501+00:00',
  '2026-06-22T14:47:23.005+00:00',
  false,
  '12:21:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a6bb7aa6-b599-416e-b2c0-d3136cc0fcfb',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-23',
  '[{"count":5,"notes":"Insta New feature: we can post any picture from our phone gallery on anyone’s comment section . AI in Farms. (Use of AI by a Farmer in Japan). UGC ads statics . Instagram update: Caption for each corousels. Claude Design Update.","description":"Content scripting"},{"count":5,"notes":"Done","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-06-23T13:23:57.343657+00:00',
  '2026-06-23T13:23:57.216+00:00',
  false,
  '10:30:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f3e6f2de-4828-4d8e-a840-5207906897cf',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-23',
  '[{"count":1,"notes":"Ad fund check","description":"Ads reporting"},{"count":32,"notes":"Lms issue, hindi amazon course lms access","description":"Tech support"},{"count":10,"notes":"Msg for community, domain names, cvs to all groups","description":"Msgs"},{"count":1,"notes":"Sheet update","description":"Attendance"},{"count":1,"notes":"Hosting space management","description":"Hostinger"},{"count":11,"notes":"Access share","description":"Canva"},{"count":1,"notes":"Done","description":"Dm portfolio"},{"count":1,"notes":"Wi-Fi Bill chnages","description":"Shri sir"}]'::jsonb,
  '',
  '2026-06-23T15:09:58.261334+00:00',
  '2026-06-23T15:09:58.135+00:00',
  false,
  '10:10:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8ac86a95-bbc1-4f97-8cb4-a8de088d8cd1',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-23',
  '[{"count":1,"notes":"7","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-23T17:19:27.457976+00:00',
  '2026-06-23T17:19:27.329+00:00',
  false,
  '10:49:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ed8d6324-7263-4653-993d-a6221dae9fcd',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-24',
  '[{"count":4,"notes":"How to clean whatsapp data? How to get more views on Instagram.   How to check Insta chat Screenshot is taken or not.  Want to view someone''s Instagram story without them knowing?","description":"Content scripting"}]'::jsonb,
  '',
  '2026-06-24T12:08:17.588914+00:00',
  '2026-06-24T12:08:17.468+00:00',
  false,
  '10:55:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e1ac2e04-21fd-4fec-80b2-77187258af8b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-24',
  '[{"count":1,"notes":"1 reel & Thumbnail done, 1 ad in progress","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Changes","description":"Shubhash Shrivastav"},{"count":1,"notes":"Follow Up with Raunaq regarding payments","description":"Client Management"},{"count":1,"notes":"","description":"Made June Invoice Of Advisor Alpha"},{"count":1,"notes":"","description":"Updated OORRUU Media Billing Sheet"}]'::jsonb,
  '',
  '2026-06-24T12:54:36.641413+00:00',
  '2026-06-24T12:54:36.062+00:00',
  false,
  '11:10:00',
  '18:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '139ae391-ddda-4e38-b9f5-7568ff969784',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-24',
  '[{"count":10,"notes":"Daily Calls Done","description":"Daily Calls"},{"count":10,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":10,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-24T13:04:14.241615+00:00',
  '2026-06-24T13:06:22.276+00:00',
  false,
  '09:50:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3858bc1e-a935-4389-9a81-711dbdbec825',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-24',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"doen","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"attendence marked","description":"lms"},{"count":1,"notes":"work in progress","description":"AI course"}]'::jsonb,
  '',
  '2026-06-24T13:33:29.206464+00:00',
  '2026-06-24T13:33:28.579+00:00',
  false,
  '10:25:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '521673e0-4185-4ff0-8259-bd66b566dd40',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-24',
  '[{"count":4,"notes":"CA reel done , ganpati bappa reel, 2 cultural , agnomatic reel in process","description":"Internal reel editing"},{"count":1,"notes":"sm yt in process","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-06-24T13:27:53.225048+00:00',
  '2026-06-24T13:27:53.106+00:00',
  false,
  '10:25:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e8839261-d951-4d6f-8c7f-b2ff09b90364',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-24',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"20","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-24T17:36:50.123974+00:00',
  '2026-06-24T17:36:49.487+00:00',
  false,
  '10:25:00',
  '19:16:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9ce5a2f0-3ad6-4fbb-a8f5-af03dd328049',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-24',
  '[{"count":1,"notes":"Ca suyash","description":"Client posting"},{"count":4,"notes":"Ig scripts","description":"Content scripting"},{"count":1,"notes":"Delta ad check, leads added, meta ads meeting with Rushi sir","description":"Ads reporting"},{"count":1,"notes":"Sheet update dates 3 months , shreya training","description":"Dm attendance"},{"count":1,"notes":"Profiles update linkedin naukri","description":"Placement"},{"count":1,"notes":"Lead replies","description":"Regular"},{"count":1,"notes":"1 done","description":"Oorruu posting"},{"count":1,"notes":"Shreya content, scripts , attendance","description":"Trainings"}]'::jsonb,
  '',
  '2026-06-24T17:52:08.594896+00:00',
  '2026-06-24T17:52:08.462+00:00',
  false,
  '10:15:00',
  '19:06:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '23bcb339-5b25-4dd4-b084-c559043fd26f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-25',
  '[{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"}]'::jsonb,
  '',
  '2026-06-25T10:06:59.044249+00:00',
  '2026-06-25T10:07:08.23+00:00',
  false,
  '11:00:00',
  '15:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7fc43f91-f8d4-4e46-a441-b6e24f3f97f7',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-25',
  '[{"count":14,"notes":"Fresh daily Calls done","description":"Daily Calls"},{"count":25,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-25T13:22:14.436566+00:00',
  '2026-06-25T13:22:14.293+00:00',
  false,
  '11:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4ea502f8-978c-41d1-b47c-c5d4365d4846',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-25',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"work inprogress","description":"AI cpurse"},{"count":1,"notes":"attendence marked","description":"LMS"},{"count":1,"notes":"research done","description":"Youtube"},{"count":1,"notes":"done","description":"script"}]'::jsonb,
  '',
  '2026-06-25T14:01:31.535636+00:00',
  '2026-06-25T14:01:30.865+00:00',
  false,
  '10:20:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'de58d92c-1339-4272-bdb3-c7168b8d8189',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-25',
  '[{"count":1,"notes":"Completed the banner design","description":"Design"},{"count":1,"notes":"reminder has sent on whatsapp group","description":"Reminder management"},{"count":2,"notes":"completed carousel design","description":"Design"},{"count":1,"notes":"completed static post for RPDM","description":"Design"}]'::jsonb,
  '',
  '2026-06-25T14:31:09.701157+00:00',
  '2026-06-25T14:31:09.556+00:00',
  false,
  '12:17:00',
  '20:17:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8b478c77-464e-4951-8262-b2f3973c8f66',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-25',
  '[{"count":1,"notes":"Delta Leads , funds checking","description":"Ads reporting"},{"count":2,"notes":"Lms access, Canva issue","description":"Tech support"},{"count":1,"notes":"","description":"Hosting space"},{"count":1,"notes":"Research done","description":"Ott ads"},{"count":3,"notes":"3 companies","description":"Cv shared"},{"count":1,"notes":"Follow up Mail","description":"Wise"},{"count":1,"notes":"1","description":"Oorruu posting"},{"count":1,"notes":"Leads reply","description":"Regular"},{"count":10,"notes":"Certificates email to students","description":"Certificates email"},{"count":1,"notes":"In progress","description":"Poster"}]'::jsonb,
  '',
  '2026-06-25T16:29:48.589281+00:00',
  '2026-06-25T16:29:47.949+00:00',
  false,
  '10:11:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '26998c70-7589-4b7e-9dae-acf5e571858a',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-26',
  '[{"count":15,"notes":"fresh daily Calls Done","description":"Daily Calls"},{"count":20,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":5,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-26T13:24:29.086451+00:00',
  '2026-06-26T13:24:28.948+00:00',
  false,
  '09:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a620d289-7051-42b1-b1df-120a0bb0702d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-26',
  '[{"count":1,"notes":"Completed static post for agnomatic","description":"Design"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Zoom link has created for Doubt solving session","description":"Link Creation"},{"count":1,"notes":"Banner Design Completed","description":"Design"},{"count":1,"notes":"Website Designing is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-06-26T14:55:46.865646+00:00',
  '2026-06-26T14:55:46.745+00:00',
  false,
  '12:58:00',
  '20:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1fafeadc-258c-4ead-9347-cc5db603253a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-26',
  '[{"count":1,"notes":"Client shoot at bandra","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-26T17:23:36.215914+00:00',
  '2026-06-26T17:23:36.085+00:00',
  false,
  '10:25:00',
  '20:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd6926e73-f899-4ae4-8e52-b20b30021d8b',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-26',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Dm script"},{"count":1,"notes":"Done","description":"Yt script"},{"count":1,"notes":"Practiced with the help of rohans login I''d","description":"Website practice"}]'::jsonb,
  '',
  '2026-06-26T17:22:28.607781+00:00',
  '2026-06-26T17:25:39.832+00:00',
  false,
  '10:25:00',
  '20:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a7741672-6c7f-4e81-a2d8-91ffe5101e5c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-26',
  '[{"count":1,"notes":"Dm ad form change, delta leads","description":"Ads reporting"},{"count":3,"notes":"Lms access, lms issue","description":"Tech support"},{"count":2,"notes":"Wlcm call","description":"Calls"},{"count":6,"notes":"2 door creatives final, kitchen posters ideation, finalization, measurement done, creatives in progress","description":"Posters"},{"count":2,"notes":"","description":"Cv shared"},{"count":1,"notes":"Lead replies","description":"Regular"}]'::jsonb,
  '',
  '2026-06-26T17:42:58.338486+00:00',
  '2026-06-26T17:43:27.959+00:00',
  false,
  '10:13:00',
  '21:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '352814b4-ae95-48fb-800d-08f61b03e671',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-27',
  '[{"count":3,"notes":"Daily fresh calls done","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":5,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-27T12:34:35.94733+00:00',
  '2026-06-27T12:34:35.815+00:00',
  false,
  '10:00:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f021e0e5-faca-4128-b57e-359c0f450e35',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-27',
  '[{"count":1,"notes":"","description":"MSME Summit And awards Function Shoot"},{"count":1,"notes":"","description":"Data Sorting And storage"}]'::jsonb,
  '',
  '2026-06-27T13:30:56.453496+00:00',
  '2026-06-27T13:30:56.332+00:00',
  false,
  '09:00:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2cc14f58-2a6f-4416-9cac-b7506a5d8737',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-27',
  '[{"count":3,"notes":"CA reel, Dm informative, agnomatic informative","description":"Internal reel editing"},{"count":1,"notes":"Rushi sir photo shoot & content shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-06-27T13:52:15.972422+00:00',
  '2026-06-27T13:52:15.851+00:00',
  false,
  '10:00:00',
  '07:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8214e4ab-98e6-4256-9995-41faff0ec002',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-27',
  '[{"count":2,"notes":"COMPLETED  SHOOT","description":"Shoot"},{"count":2,"notes":"DESIGNED BANNER","description":"Design"},{"count":2,"notes":"REMINDER HAS SENT ON WEBINAR GROUP","description":"Reminder management"},{"count":1,"notes":"WEBINAR GROUP HAS CREATED","description":"WhatsApp group creation"},{"count":1,"notes":"ZOOM LINK CREATION","description":"LINK CREATION"}]'::jsonb,
  '',
  '2026-06-27T13:57:28.942972+00:00',
  '2026-06-27T13:57:28.835+00:00',
  false,
  '13:16:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a733b61c-870e-4344-a4f0-456b220cc746',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-27',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Lms attendance"},{"count":1,"notes":"Learned and practiced","description":"Website"}]'::jsonb,
  '',
  '2026-06-27T17:40:57.112836+00:00',
  '2026-06-27T17:43:23.434+00:00',
  false,
  '10:00:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'eebc1e90-dad7-4f54-85f3-c3b234c08053',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-27',
  '[{"count":1,"notes":"Ca","description":"Client posting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":5,"notes":"Lms issue, lms suspension, lms access","description":"Tech support"},{"count":2,"notes":"Wlcm call","description":"Calls"},{"count":2,"notes":"","description":"Cv share"},{"count":1,"notes":"Attendance sheet update","description":"Sheet update"},{"count":6,"notes":"6 poster kitchen","description":"Poster"},{"count":1,"notes":"From and msg created","description":"Amazon"}]'::jsonb,
  '',
  '2026-06-27T18:10:24.686424+00:00',
  '2026-06-27T18:10:24.065+00:00',
  false,
  '10:15:00',
  '19:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '085669a9-f0fe-42f0-b08b-e53b4a453db0',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-04',
  '[{"count":10,"notes":"Daily fresh calls done","description":"Daily Calls"},{"count":20,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-04T13:30:05.82167+00:00',
  '2026-07-04T13:30:05.184+00:00',
  false,
  '10:00:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ee8bce06-c441-440f-a821-5711240ecf66',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-29',
  '[{"count":42,"notes":"Fresh daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-29T13:19:29.090176+00:00',
  '2026-06-29T13:19:28.954+00:00',
  false,
  '09:55:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1e72e15a-fc9f-4bee-91e7-fd44c22662ef',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-29',
  '[{"count":1,"notes":"500000 followers will be celebrities said SEBI.","description":"Content scripting"},{"count":8,"notes":"Done. Google post- MSME summit attended","description":"Google posting replies"},{"count":25,"notes":"","description":"Sell on Amazon course"}]'::jsonb,
  '',
  '2026-06-29T13:37:22.399409+00:00',
  '2026-06-29T13:37:22.275+00:00',
  false,
  '10:35:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'eb3f6ab7-9243-49f8-aa03-1d88f53a4ed3',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-29',
  '[{"count":2,"notes":"2 Reels Done, Sheet Updated.","description":"Advisor Alpha"},{"count":1,"notes":"Regarding Oorruu Media, EDITING, Clients, Revenue","description":"Meeting With Rushi sir"},{"count":1,"notes":"09 Ep done on Sunday and 03 Ep today","description":"Amazon Hindi Course"}]'::jsonb,
  '',
  '2026-06-29T13:15:11.438115+00:00',
  '2026-06-29T14:00:32.63+00:00',
  false,
  '10:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '172b6bdc-79cc-4718-9a29-9039991348eb',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-29',
  '[{"count":1,"notes":"completed shoots for cosmetics products","description":"Shoot"},{"count":1,"notes":"Designed static post for agnomatic","description":"Design"},{"count":1,"notes":"posting has done on agnomatic","description":"Daily posting"},{"count":1,"notes":"added new numbers in community group","description":"Webinar management"},{"count":1,"notes":"reminders has sent in all webinar group","description":"Reminder management"},{"count":1,"notes":"Website Designing is in progress","description":"Design"},{"count":1,"notes":"Thumbmbnail design has done for Agnomatic","description":"Design"}]'::jsonb,
  '',
  '2026-06-29T14:10:12.401+00:00',
  '2026-06-29T14:10:12.269+00:00',
  false,
  '12:56:00',
  '19:56:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c054d9ca-fa18-4fc5-91a2-d3e445c0d778',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-29',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Learned and practiced","description":"Website"},{"count":1,"notes":"Assist suyog for product shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-29T15:37:01.394327+00:00',
  '2026-06-29T15:37:00.732+00:00',
  false,
  '10:20:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c2dca58d-4535-4801-924b-4573e458abab',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-29',
  '[{"count":3,"notes":"Agnomatic reel, 2 dm testimonials","description":"Internal reel editing"},{"count":1,"notes":"Dm testimonial","description":"Internal YouTube editing"},{"count":1,"notes":"Beauty product photoshoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-06-29T15:38:46.183879+00:00',
  '2026-06-29T15:38:46.057+00:00',
  false,
  '10:20:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f8343a0e-6f6e-49af-819d-949df6379826',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-29',
  '[{"count":1,"notes":"22","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-29T17:07:30.391518+00:00',
  '2026-06-29T17:07:30.264+00:00',
  false,
  '10:25:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1c801125-451e-4c35-8d19-06e2e9198fcb',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-03',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"new format researched and script done","description":"script"}]'::jsonb,
  '',
  '2026-07-03T14:17:21.366143+00:00',
  '2026-07-03T15:39:47.564+00:00',
  false,
  '10:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5bc311d4-9733-46dc-832a-bc2568bd8318',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-06',
  '[{"count":20,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":3,"notes":"Daily Follow up calls","description":"Daily Follow-up"},{"count":1,"notes":"DM","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-06T13:13:39.654198+00:00',
  '2026-07-06T13:13:39.527+00:00',
  false,
  '11:13:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6159cfbc-bb32-4571-8586-12c1c6c434b0',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-06',
  '[{"count":1,"notes":"Completed agnomatic post design","description":"Design"},{"count":1,"notes":"Daily posting done","description":"Daily posting"},{"count":34,"notes":"Called people’s for access","description":"Webinar management"},{"count":2,"notes":"Reminder of access and GST has ent","description":"Reminder management"},{"count":10,"notes":"Designed client Stickers","description":"Design"},{"count":2,"notes":"Designed and sent seminar designs to sir","description":"Design"}]'::jsonb,
  '',
  '2026-07-06T17:52:06.046683+00:00',
  '2026-07-06T17:52:05.905+00:00',
  false,
  '12:40:00',
  '20:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2e3fd329-8948-49f5-93f0-7e2d2bbf2135',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-29',
  '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":6,"notes":"Lms access, lms issue,","description":"Tech support"},{"count":18,"notes":"Amazon seller sheet, msgs, calls , issues, access done","description":"Amazon"},{"count":22,"notes":"Amazon calls, enrollment calls, issue resolve calls","description":"Calls"},{"count":10,"notes":"","description":"Canva access"},{"count":1,"notes":"Report ready, meeting scheduled","description":"Oil client"},{"count":1,"notes":"Form for course access","description":"Amazon form"},{"count":3,"notes":"For asking Domain name, cv , exam notice","description":"Students msgs"},{"count":6,"notes":"4 done 2 in progress","description":"Kitchen posters"},{"count":1,"notes":"Lead replies, oorruu posting","description":"Regular"}]'::jsonb,
  '',
  '2026-06-29T17:22:11.228701+00:00',
  '2026-06-29T17:23:15.14+00:00',
  false,
  '10:00:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1bc66633-e0c8-4897-98d8-aaf2e6a30115',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-30',
  '[{"count":13,"notes":"done. Google post about Digital marketing practical training.","description":"Google posting replies"},{"count":18,"notes":"","description":"Amazon Selling"}]'::jsonb,
  '',
  '2026-06-30T13:14:11.075964+00:00',
  '2026-06-30T13:14:10.404+00:00',
  false,
  '11:00:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '94d1d806-e7d8-4718-be7e-33bf31a2600d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-30',
  '[{"count":6,"notes":"Fresh Dialy calls done","description":"Daily Calls"},{"count":25,"notes":"Dsily follow ups done","description":"Daily Follow-up"},{"count":9,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-30T13:34:31.848+00:00',
  '2026-06-30T13:34:31.191+00:00',
  false,
  '10:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '986cc647-1f52-444d-9e67-7a98f57562e9',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-30',
  '[{"count":2,"notes":"1 reel changes, 1 ad done","description":"Advisor Alpha"},{"count":1,"notes":"","description":"Amaozn Hindi Course Shoot Follow Up"},{"count":1,"notes":"Discussion about the Goal","description":"Meeting"},{"count":1,"notes":"","description":"Renewal Of Capcut Pro"},{"count":1,"notes":"","description":"made two content Creation Proposals"},{"count":1,"notes":"","description":"Content Ideation For Kaari"}]'::jsonb,
  '',
  '2026-06-30T14:02:36.045256+00:00',
  '2026-06-30T14:02:35.38+00:00',
  false,
  '10:40:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f5429642-da3f-4e04-a563-a324ba4ca9b5',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-30',
  '[{"count":3,"notes":"3 dm testimonial","description":"Internal reel editing"},{"count":1,"notes":"DM long testimonial (swapnil Sir)","description":"Internal YouTube editing"},{"count":1,"notes":"making drive link for beauty products","description":"other"}]'::jsonb,
  '',
  '2026-06-30T14:09:51.355678+00:00',
  '2026-06-30T14:09:51.219+00:00',
  false,
  '09:52:00',
  '07:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2eb06e04-bdac-4fb5-b87b-e59bfc35787b',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-30',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Learned and practiced & practiced","description":"Website"},{"count":1,"notes":"Attendance marked","description":"Lms"},{"count":1,"notes":"Assignment checked","description":"Lms"}]'::jsonb,
  '',
  '2026-06-30T14:15:21.132797+00:00',
  '2026-06-30T14:15:21.013+00:00',
  false,
  '09:52:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8f24081c-0222-49eb-851b-3cb78dc31148',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-30',
  '[{"count":1,"notes":"Completed One thumbnail for Agnomatic","description":"Design"},{"count":1,"notes":"Daily posting has Done on agnomatic","description":"Daily posting"},{"count":1,"notes":"Reminder has gone on webinar group","description":"Reminder management"},{"count":1,"notes":"Website designing is in progress","description":"Design"},{"count":1,"notes":"Carousel designing is in progress","description":"Design"},{"count":15,"notes":"Resized the cosmetic products images","description":"Other"}]'::jsonb,
  '',
  '2026-06-30T17:41:57.936581+00:00',
  '2026-06-30T17:41:57.716+00:00',
  false,
  '13:00:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '11115eaf-7643-4a24-89b4-9a82809dbf34',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-30',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-06-30T18:11:36.90702+00:00',
  '2026-06-30T18:11:36.758+00:00',
  false,
  '10:14:00',
  '19:08:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ae24c78c-ea25-42d1-80a6-77baaaaf2b75',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-01',
  '[{"count":1,"notes":"Done 13 replies.","description":"Google posting replies"},{"count":7,"notes":"Course complete","description":"Amazon Selling"},{"count":1,"notes":"Post about Students completes Digital Marketing course","description":"Google post"}]'::jsonb,
  '',
  '2026-07-01T13:15:59.256562+00:00',
  '2026-07-01T13:16:56.902+00:00',
  false,
  '10:35:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c0614537-2b94-4f32-b125-c8b3a3073f8e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-01',
  '[{"count":8,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":15,"notes":"Follow up calls made","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-01T13:23:09.471472+00:00',
  '2026-07-01T13:23:09.334+00:00',
  false,
  '10:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '667af4ff-cf03-45dd-9f74-a95cf0af6a06',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-01',
  '[{"count":4,"notes":"ca reel , dm testimonials","description":"Internal reel editing"},{"count":1,"notes":"dm long","description":"Internal YouTube editing"},{"count":1,"notes":"photos added in drive folder","description":"other"}]'::jsonb,
  '',
  '2026-07-01T13:37:38.593162+00:00',
  '2026-07-01T13:37:38.454+00:00',
  false,
  '09:56:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2a1bcf20-ac16-4fc7-8bfc-b2c7bb05ff02',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-01',
  '[{"count":3,"notes":"1 Ad Done, 1 Reel in Progress, June Invoice Sent","description":"Advisor Alpha"},{"count":1,"notes":"","description":"Month Start Meeting"},{"count":2,"notes":"2 Eps Done","description":"Amazon Hindi course"}]'::jsonb,
  '',
  '2026-07-01T13:40:00.164773+00:00',
  '2026-07-01T13:39:59.866+00:00',
  false,
  '10:30:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'eb9c60fb-dd05-4da2-b8ea-c09e9c4c41f6',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-01',
  '[{"count":1,"notes":"Ca","description":"Client posting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":4,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Lead replies, content","description":"Regular"},{"count":1,"notes":"Pandit capital done","description":"Profiles creation"},{"count":1,"notes":"Meeting with prajakta joshi","description":"Client call"},{"count":1,"notes":"For prajakta joshi","description":"Content research"},{"count":1,"notes":"Attendance sheet update","description":"Sheet update"},{"count":2,"notes":"Team meeting, bd team meeting","description":"Meeting"},{"count":1,"notes":"Oorruu posting","description":"Posting"},{"count":1,"notes":"Posters placement done","description":"Poster"}]'::jsonb,
  '',
  '2026-07-01T16:15:12.050952+00:00',
  '2026-07-01T16:15:36.338+00:00',
  false,
  '10:30:00',
  '19:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '44f815dc-f1b7-4a30-9060-d6ef507eafbf',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-01',
  '[{"count":9,"notes":"","description":"Daily Calls"},{"count":10,"notes":"","description":"Daily Follow-up"},{"count":0,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-01T16:29:15.124759+00:00',
  '2026-07-01T16:29:14.512+00:00',
  false,
  '10:25:00',
  '18:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'bc07d251-e01a-4fd9-8ee0-113a598a7261',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-01',
  '[{"count":1,"notes":"Completed design of static post","description":"Design"},{"count":1,"notes":"Daily posting has done on agnomau","description":"Daily posting"},{"count":1,"notes":"Design of carousel is in progress","description":"Design"},{"count":1,"notes":"Website design is in progress","description":"Design"},{"count":1,"notes":"Cosmetic product folder making is in progress","description":"Other"}]'::jsonb,
  '',
  '2026-07-01T17:19:07.145053+00:00',
  '2026-07-01T17:19:06.483+00:00',
  false,
  '13:45:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'aef94abf-b25f-4396-8aae-8c20fcb4f153',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-01',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Website learned and practiced and helped rohan in clients website","description":"Website"},{"count":1,"notes":"Attendance nd assignment","description":"Lms"}]'::jsonb,
  '',
  '2026-07-01T18:04:47.039885+00:00',
  '2026-07-01T18:08:31.518+00:00',
  false,
  '09:56:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9b140ec6-2c12-4a90-aaa7-f942181f9db2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-02',
  '[{"count":10,"notes":"fresh calls done today","description":"Daily Calls"},{"count":35,"notes":"follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-02T13:27:20.897627+00:00',
  '2026-07-02T13:27:20.256+00:00',
  false,
  '10:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '595ad3cf-8069-44da-9432-1dee84b44903',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-02',
  '[{"count":2,"notes":"done. Agnomatic 2 scripts","description":"Content scripting"},{"count":4,"notes":"done","description":"Shooting"},{"count":20,"notes":"Done. 1 student testimonial","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-02T13:33:04.396018+00:00',
  '2026-07-02T13:33:04.271+00:00',
  false,
  '11:00:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5557e7a9-a0c1-4331-a108-3192cedb85d9',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-02',
  '[{"count":3,"notes":"1 Reel Done, 1 Ad Done, 1 Ad In Progress, Recovery Follow Up","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Regarding The Edit Work","description":"Shubhash Shrivastav"}]'::jsonb,
  '',
  '2026-07-02T13:42:31.453593+00:00',
  '2026-07-02T13:42:31.318+00:00',
  false,
  '10:23:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2bd3c5e5-d9be-453e-b8bd-c50e961d49c0',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-02',
  '[{"count":1,"notes":"Dm informative, amazon ad in progress","description":"Internal reel editing"},{"count":2,"notes":"Ai course introduction videos","description":"Internal YouTube editing"},{"count":1,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-02T14:53:59.1404+00:00',
  '2026-07-02T14:53:59.021+00:00',
  false,
  '10:05:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '870f9bc3-6e02-4803-bf74-8322b6532cb2',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-02',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"client website","description":"Website"}]'::jsonb,
  '',
  '2026-07-02T14:51:08.821339+00:00',
  '2026-07-02T16:06:43.138+00:00',
  false,
  '10:05:00',
  '19:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '41ca913d-3ce2-48ef-a296-8947ea674141',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-02',
  '[{"count":10,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed Carousel","description":"Design"},{"count":2,"notes":"Designed creatives","description":"Design"},{"count":1,"notes":"Website Design is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-07-02T17:42:01.79359+00:00',
  '2026-07-02T17:42:01.677+00:00',
  false,
  '11:19:00',
  '19:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2630cc54-a0b5-4e2c-8a07-9fb03e2b3c3c',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-03',
  '[{"count":15,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":0,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-03T13:24:15.306987+00:00',
  '2026-07-03T13:24:24.981+00:00',
  false,
  '11:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '26a740c8-1b0f-4f57-85cf-4d4db9ebd205',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-03',
  '[{"count":2,"notes":"Done. 2 scripts for Pandit capital ad.","description":"Content scripting"},{"count":30,"notes":"Done. 1 post about new batch started. 30 google replies for review","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-03T13:26:13.606583+00:00',
  '2026-07-03T13:26:13.497+00:00',
  false,
  '10:50:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3a7d8b12-9e83-4790-8dbd-1b39cbf7d71c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-03',
  '[{"count":2,"notes":"1 Reel Changes, 1Thumbnail Done","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Regarding Editing Work- he said there''s work going on in his home, he will give us work.","description":"Shubhash Shrivastav"},{"count":1,"notes":"Shoot At Goregaon, Rutuj Office","description":"Amazon Hindi Course"},{"count":1,"notes":"","description":"Data Sorting, Sent Raw Files Of his Ad To him"},{"count":1,"notes":"","description":"Made One Content Creation Proposal for Pooja Kadam"}]'::jsonb,
  '',
  '2026-07-03T14:00:10.777306+00:00',
  '2026-07-03T14:00:10.673+00:00',
  false,
  '10:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4fc574f9-29da-4160-b997-a3ae1828cf1e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-03',
  '[{"count":4,"notes":"Amazon ad done , dm ad done, client video cutting done , agnomatic reel in progress","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-07-03T15:39:25.901692+00:00',
  '2026-07-03T15:40:10.2+00:00',
  false,
  '10:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cbbb6507-173a-488a-b6e1-d176b36a50cd',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-03',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-03T16:13:40.404551+00:00',
  '2026-07-03T16:13:40.288+00:00',
  false,
  '10:14:00',
  '19:08:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '90cbfc63-958e-407d-bc68-2c70009184c1',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-07',
  '[{"count":25,"notes":"Fresh Daily calls","description":"Daily Calls"},{"count":20,"notes":"Daily Follow up Calls","description":"Daily Follow-up"},{"count":1,"notes":"Dm","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-07T13:07:36.263877+00:00',
  '2026-07-07T13:07:36.134+00:00',
  false,
  '10:57:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6e407765-8d2a-479f-ba1f-1078261e6d62',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-07',
  '[{"count":2,"notes":"Done. Blinkit & AIrbnb case study","description":"Content scripting"},{"count":5,"notes":"Done. 1 post and 4 replies","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-07T13:14:20.658807+00:00',
  '2026-07-07T13:14:20.083+00:00',
  false,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '297bd0b4-3897-4c93-a3f1-a03d42a91863',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-07',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"attendence & assignment","description":"lms"},{"count":1,"notes":"done","description":"dm script"}]'::jsonb,
  '',
  '2026-07-07T13:29:02.009546+00:00',
  '2026-07-07T13:29:01.413+00:00',
  false,
  '10:13:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6c571f67-b99c-4807-9595-2f3826dddb65',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-07',
  '[{"count":3,"notes":"cultural dm , ca reel , agnomatic reel in process","description":"Internal reel editing"},{"count":1,"notes":"maked drive link for rushi sir photos","description":"other"}]'::jsonb,
  '',
  '2026-07-07T13:29:37.529699+00:00',
  '2026-07-07T13:29:36.943+00:00',
  false,
  '10:13:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f55dace5-93d9-4a6d-89ce-a41d274525c8',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-07',
  '[{"count":3,"notes":"2 Ads Changes, 1 Ad in Progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up Of New Client Pooja Kadam","description":"Client Management"},{"count":3,"notes":"3 Eps Done","description":"Amazon Course"},{"count":1,"notes":"Report Meeting","description":"Meeting"}]'::jsonb,
  '',
  '2026-07-07T14:53:52.955651+00:00',
  '2026-07-07T14:53:52.384+00:00',
  false,
  '10:32:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9a5ee8eb-d7d3-43a6-adba-620822372784',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-07',
  '[{"count":1,"notes":"Fund check, ad monitor","description":"Ads reporting"},{"count":9,"notes":"Lms access, lms issue, lms suspension, lms unsuspend","description":"Tech support"},{"count":2,"notes":"Landing page, thank you page done","description":"Amazon hindi webinar"},{"count":10,"notes":"Canva issue, access","description":"Canva"},{"count":1,"notes":"What''s app api form","description":"Extra"},{"count":1,"notes":"Social media accounts fb, ig, linkedin","description":"Novavita"},{"count":1,"notes":"Client onboarding msg created","description":"Client"},{"count":1,"notes":"Reminders done for tomorrow exam","description":"Exam"},{"count":1,"notes":"Lead reply, amazon leads issue resolve","description":"Regular"}]'::jsonb,
  '',
  '2026-07-07T15:02:46.023435+00:00',
  '2026-07-07T15:02:45.39+00:00',
  false,
  '22:30:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8b978073-1b2a-43ba-b615-f046adf40741',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-07',
  '[{"count":3,"notes":"Designed ad creative","description":"Design"},{"count":1,"notes":"Reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"Arranged all Camera Equipments","description":"Other"},{"count":1,"notes":"Carousel Design is in Progress","description":"Design"}]'::jsonb,
  '',
  '2026-07-07T15:05:14.574943+00:00',
  '2026-07-07T15:25:57.634+00:00',
  false,
  '13:00:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6d5cd33e-35b2-4f9d-bb6b-c1ec8d29d72c',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-07',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-07T17:28:41.152215+00:00',
  '2026-07-07T17:28:41.031+00:00',
  false,
  '10:49:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ca3fd395-2b28-422d-b5a8-80b2e44f8373',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-08',
  '[{"count":20,"notes":"Fresh daily calls done","description":"Daily Calls"},{"count":25,"notes":"Daily follow up calls done","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-08T13:23:16.331225+00:00',
  '2026-07-08T13:23:16.196+00:00',
  false,
  '11:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '74979a50-0249-4567-b37a-5d33f67c4c5a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-08',
  '[{"count":1,"notes":"agnomatic reel","description":"Internal reel editing"},{"count":1,"notes":"client shoot at andheri","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-08T13:31:45.176721+00:00',
  '2026-07-08T13:31:45.036+00:00',
  false,
  '09:15:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '636ec6e9-7af0-4196-9d84-338c6f7d7bb8',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-08',
  '[{"count":1,"notes":"Done. Casestudy Airbnb","description":"Content scripting"},{"count":1,"notes":"Done. Bill gates quote","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-08T13:34:05.574405+00:00',
  '2026-07-08T13:34:05.47+00:00',
  false,
  '10:25:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b150912c-b5ae-4e90-9f37-06a535ca3f0c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-08',
  '[{"count":1,"notes":"1 Ad Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Ep Done","description":"Amazon Hindi Course"},{"count":1,"notes":"","description":"Sorting Of The Amazon Hindi Course Episodes"},{"count":1,"notes":"Shoot of Products at Marol Andheri","description":"Kaari Arts"}]'::jsonb,
  '',
  '2026-07-08T14:30:37.607765+00:00',
  '2026-07-08T14:30:37.483+00:00',
  false,
  '10:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '89a4d2e2-9b1f-45e0-86b2-c80b92caea20',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-08',
  '[{"count":1,"notes":"Ca","description":"Client posting"},{"count":4,"notes":"Lms unsuspend, lms issue","description":"Tech support"},{"count":2,"notes":"2 resolve","description":"Canva issue"},{"count":2,"notes":"2","description":"Dm posting"},{"count":1,"notes":"Lead replies","description":"Regular"}]'::jsonb,
  '',
  '2026-07-08T14:32:08.849404+00:00',
  '2026-07-08T14:32:08.703+00:00',
  false,
  '10:58:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '699b2b50-7661-4590-9439-dc81fb965296',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-08',
  '[{"count":2,"notes":"Designed Ad Post for RPDM","description":"Design"},{"count":1,"notes":"Sent Carousel for Posting","description":"Daily posting"},{"count":1,"notes":"Carousel Design is in progress","description":"Design"},{"count":3,"notes":"Completed Account Setup of Client","description":"Other"},{"count":2,"notes":"Client Design is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-07-08T15:11:17.351396+00:00',
  '2026-07-08T15:11:16.726+00:00',
  false,
  '13:00:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e5ca1845-07a4-4eb1-92f2-64d06c6bc103',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-08',
  '[{"count":1,"notes":"20","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-08T15:24:35.770635+00:00',
  '2026-07-08T15:24:35.644+00:00',
  false,
  '10:49:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '48bf9f08-cbbe-4384-85dd-3fce7c2293e6',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-09',
  '[{"count":23,"notes":"Fresh daily calls done","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-09T13:04:19.18009+00:00',
  '2026-07-09T13:04:18.544+00:00',
  false,
  '09:55:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4377c4f9-3b41-4d3e-9ec4-2b47a51f36fb',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-09',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"done","description":"script"},{"count":1,"notes":"assist in shooting","description":"shoot"}]'::jsonb,
  '',
  '2026-07-09T13:40:51.518021+00:00',
  '2026-07-09T13:40:50.866+00:00',
  false,
  '10:53:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e8a6e568-c7c2-4ca3-9fb3-e935fae7757d',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-09',
  '[{"count":3,"notes":"Amazon ad, agnomatic reel, dm informative","description":"Internal reel editing"},{"count":1,"notes":"Content shoot, client shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-09T13:42:32.278162+00:00',
  '2026-07-09T13:42:31.69+00:00',
  false,
  '10:53:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cb1a9b68-b7f3-4cbf-89c5-73ad4d94202a',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-09',
  '[{"count":3,"notes":"Done. Body scan by Image generator AI. Airbnb & Spotify.","description":"Content scripting"},{"count":4,"notes":"Done1","description":"Shooting"}]'::jsonb,
  '',
  '2026-07-09T13:56:20.078324+00:00',
  '2026-07-09T13:56:19.946+00:00',
  false,
  '10:50:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ec455962-9a6c-4f4e-ba69-68830ff8c66c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-09',
  '[{"count":2,"notes":"2 Ads Done","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up with Pooja Kadam Regarding Meeting","description":"Client Management"},{"count":1,"notes":"2 Episodes Done","description":"Amazon Hindi COurse"},{"count":4,"notes":"CA AJit Shinde 4 Reels","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-09T14:34:50.892827+00:00',
  '2026-07-09T14:34:50.219+00:00',
  false,
  '10:53:00',
  '20:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '83b936e2-a97d-4343-b220-c5e278626f82',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-09',
  '[{"count":5,"notes":"Lms access, LMS issue, amazon access","description":"Tech support"},{"count":2,"notes":"Changes done, gave access to shreya","description":"Pandit capital"},{"count":1,"notes":"Pooja kadam meeting pointers","description":"New client"},{"count":1,"notes":"Content research, ideation, content shoot, research for carousels","description":"Content"},{"count":3,"notes":"","description":"Enrollment calls"},{"count":1,"notes":"Canva issue","description":"Canva"}]'::jsonb,
  '',
  '2026-07-09T14:44:21.682968+00:00',
  '2026-07-09T14:44:21.571+00:00',
  false,
  '10:50:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a4606b87-98c2-4b04-a4c2-393ea5d2fc32',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-09',
  '[{"count":8,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":1,"notes":"Daily posting has done","description":"Daily posting"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Designed thumbnail","description":"Design"},{"count":1,"notes":"Client social media preparing","description":"Other"}]'::jsonb,
  '',
  '2026-07-09T17:43:45.065173+00:00',
  '2026-07-09T17:43:44.395+00:00',
  false,
  '13:10:00',
  '21:04:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9b80a99f-a7db-4f4c-842a-b15555720704',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-10',
  '[{"count":18,"notes":"Fresh calls done today","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups done","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-10T13:17:31.290897+00:00',
  '2026-07-10T13:17:31.178+00:00',
  false,
  '09:55:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2b40699c-16c2-45b2-991e-cf1ae285d341',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-10',
  '[{"count":2,"notes":"Done. Cliphi.com. Meta reads your brain, no surgery It’s called Brain2Qwerty Meta built an AI that sits outside y","description":"Content scripting"},{"count":5,"notes":"Done","description":"Shooting"},{"count":1,"notes":"Done. Testimonial post","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-10T13:28:23.979933+00:00',
  '2026-07-10T13:28:23.447+00:00',
  false,
  '09:50:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f7674a44-5827-4fdc-a02a-1c530da949e6',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-10',
  '[{"count":2,"notes":"cultural , amazon ad in process","description":"Internal reel editing"},{"count":3,"notes":"changes in amazon lecture videos","description":"Internal YouTube editing"},{"count":1,"notes":"cultural, informative and ad shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-07-10T13:52:26.897654+00:00',
  '2026-07-10T13:52:39.754+00:00',
  false,
  '10:03:00',
  '07:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '35770fd8-d2db-4273-be23-922f4fc43ca3',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-10',
  '[{"count":1,"notes":"1 Reel Done","description":"CA Suyash Sir"},{"count":1,"notes":"Meeting with Dr. Pooja Kadam","description":"Client Management"},{"count":1,"notes":"2 Episode Done, Changes in 3 Episode","description":"Amazon Hindi Course"},{"count":1,"notes":"Lanyard Design","description":"ID"}]'::jsonb,
  '',
  '2026-07-10T14:55:28.521174+00:00',
  '2026-07-10T14:55:27.984+00:00',
  false,
  '10:19:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7255313f-5be3-425d-b731-d85d6feafd9c',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-10',
  '[{"count":1,"notes":"18","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-10T15:24:44.257888+00:00',
  '2026-07-10T15:24:44.109+00:00',
  false,
  '10:08:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'bb792d32-0529-4987-9367-d5bca152cabd',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-10',
  '[{"count":1,"notes":"Post boost discuss with Preeti","description":"Client posting"},{"count":5,"notes":"Lms issue, lms suspension, amazon issue","description":"Tech support"},{"count":1,"notes":"Pooja kadam meeting done","description":"Meeting"},{"count":1,"notes":"Course sequence","description":"Amazon"},{"count":1,"notes":"Topic research","description":"Pooja kadam"},{"count":1,"notes":"Access shared oof AgnoChat and pandit capital","description":"Shareya"},{"count":1,"notes":"Changes done","description":"Landing page"},{"count":1,"notes":"Lanyard design","description":"Design"},{"count":1,"notes":"Lead replies","description":"Regular"}]'::jsonb,
  '',
  '2026-07-10T15:25:23.251644+00:00',
  '2026-07-10T15:25:22.712+00:00',
  false,
  '10:19:00',
  '20:49:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8b61a2cc-48bf-4efb-9135-f1549cfd745d',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-10',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Assist in shooting","description":"Shoot"},{"count":1,"notes":"Set up of agnochat on all social media","description":"Account setup"},{"count":1,"notes":"Research for content and searched topics ( approval remaining)","description":"Pandit capital"}]'::jsonb,
  '',
  '2026-07-10T18:09:27.684777+00:00',
  '2026-07-10T18:09:27.146+00:00',
  false,
  '10:03:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0d35c183-0c09-4e3e-bbfe-632f7a90c67b',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-11',
  '[{"count":2,"notes":"Done","description":"Shooting"},{"count":1,"notes":"Done. No AI skills and Red card to career","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-11T13:01:10.877484+00:00',
  '2026-07-11T13:01:10.353+00:00',
  false,
  '10:20:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4785eb63-dee7-46c6-9577-a77eacdff301',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-16',
  '[{"count":1,"notes":"Done. Automation in Ecommerce for Agnomatic)","description":"Content scripting"},{"count":4,"notes":"Done.","description":"Shooting"},{"count":1,"notes":"Done. Puri rath yatra wish post","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-16T13:33:09.618879+00:00',
  '2026-07-16T13:33:09.068+00:00',
  false,
  '10:50:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '10a6f39b-76fe-4603-9129-70c51e17f3a2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-11',
  '[{"count":13,"notes":"Fresh Calls done","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups done","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-11T13:34:59.361118+00:00',
  '2026-07-11T13:34:59.254+00:00',
  false,
  '09:55:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '00c7579c-8106-4e2a-bce5-75fb720024b4',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-11',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"ad script","description":"script"},{"count":1,"notes":"asssisted in shoot","description":"shoot"},{"count":1,"notes":"attendance marked","description":"LMS"}]'::jsonb,
  '',
  '2026-07-11T13:47:11.907471+00:00',
  '2026-07-11T13:47:11.777+00:00',
  false,
  '09:53:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '08c3ab66-c244-47da-aa13-39359b3e1b92',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-11',
  '[{"count":4,"notes":"amazon ad, dm info,agnomatic info, client video in process","description":"Internal reel editing"},{"count":1,"notes":"ad shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-07-11T14:06:14.036234+00:00',
  '2026-07-11T14:06:13.919+00:00',
  false,
  '09:53:00',
  '07:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8298a905-6d5b-4350-8b6a-f53690bd6e8d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-13',
  '[{"count":15,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-13T13:30:48.628094+00:00',
  '2026-07-13T13:37:34.976+00:00',
  false,
  '09:55:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2d51db39-a2b9-465e-9ace-b9ba092f629b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-11',
  '[{"count":1,"notes":"Paymet Follow up","description":"Advisor Alpha"},{"count":1,"notes":"Dr. Pooja Kadam Follow Up","description":"Client Management"},{"count":1,"notes":"Introduction Video","description":"Amazon Course"},{"count":2,"notes":"1 Reel Done and 1 reel In progress","description":"CA Ajit Shinde"},{"count":1,"notes":"Reporting Meeting","description":"Meeting"},{"count":1,"notes":"ID Design Chnages","description":"ID Design"}]'::jsonb,
  '',
  '2026-07-11T14:23:54.813379+00:00',
  '2026-07-11T14:47:45.351+00:00',
  false,
  '10:15:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd7e673e6-aa09-47f7-990d-14d9f838efb1',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-11',
  '[{"count":1,"notes":"CA Posting and Boosting done","description":"Client posting"},{"count":1,"notes":"27 episodes on YT","description":"Amazon Hindi Course Upload"},{"count":1,"notes":"Certificate, Exam Prep, Messages","description":"RPDM 64"},{"count":1,"notes":"Umesh website issue solved","description":"Website issue"},{"count":1,"notes":"Pincode changes","description":"Amazon Seminar Adset"},{"count":1,"notes":"3 Amazon issues resolved","description":"LMS"},{"count":1,"notes":"","description":"Amazon hindi seminar link"},{"count":1,"notes":"Sheet update","description":"Attendance 6"}]'::jsonb,
  '',
  '2026-07-11T14:43:48.78052+00:00',
  '2026-07-11T15:43:13.468+00:00',
  false,
  '09:50:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd41c4ed9-f418-4cc1-b8b4-4689eacc2ad4',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-11',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"0","description":"Daily Follow-up"},{"count":1,"notes":"2","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-11T16:31:03.055324+00:00',
  '2026-07-11T16:31:02.533+00:00',
  false,
  '10:20:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd29afb53-3e22-4b78-9809-7a899af523f0',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-11',
  '[{"count":2,"notes":"completed shoots","description":"Shoot"},{"count":16,"notes":"Designed Certificates","description":"Design"},{"count":1,"notes":"Attended Seminar","description":"Webinar management"},{"count":2,"notes":"Sent reminder on groups","description":"Reminder management"},{"count":1,"notes":"Created group for next webinar","description":"WhatsApp group creation"},{"count":1,"notes":"Designed Thumbnail","description":"Design"},{"count":1,"notes":"Client product designing is in progress","description":"Design"},{"count":6,"notes":"Arranged Certificates","description":"Others"},{"count":3,"notes":"Made links for doubt sloving and webinar and seminar","description":"ZOOM LInks"}]'::jsonb,
  '',
  '2026-07-11T17:31:59.349775+00:00',
  '2026-07-11T17:31:58.857+00:00',
  false,
  '12:45:00',
  '20:43:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '545a3448-3242-4e34-be84-7371d1396cba',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-13',
  '[{"count":1,"notes":"Done. Saturday club visit post","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-13T13:32:40.627933+00:00',
  '2026-07-13T13:32:40.014+00:00',
  false,
  '10:15:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3fe6226b-c32f-4690-adb7-0f86a100a51b',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-13',
  '[{"count":2,"notes":"1 dm info, amazon hindi ad","description":"Internal reel editing"},{"count":1,"notes":"DM dontent shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-13T13:38:42.825927+00:00',
  '2026-07-13T13:38:42.698+00:00',
  false,
  '10:00:00',
  '07:25:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '61c1546c-be2a-4117-9313-850331c5b3ac',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-13',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Script"}]'::jsonb,
  '',
  '2026-07-13T13:46:26.212573+00:00',
  '2026-07-13T13:46:26.071+00:00',
  false,
  '10:00:00',
  '19:25:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5dc6f600-06c2-43a8-b511-429a08984f3e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-13',
  '[{"count":1,"notes":"Rescheduled The Shoot on Wednesday","description":"Advisor Alpha"},{"count":2,"notes":"1.Made Vanttagge Group. 2.Updated the client sheet.","description":"Client Management"},{"count":1,"notes":"Redesigned Lace Design On Corel Draw","description":"ID"},{"count":1,"notes":"1 Ree of CA Ajit Done, 1 Reel Of Tejashri In Progress","description":"Vanttagge CFO"},{"count":1,"notes":"","description":"Given Amazon Access to Swanpil sir"},{"count":1,"notes":"","description":"Given Amazon Hindi Course To Pooja"}]'::jsonb,
  '',
  '2026-07-13T14:13:11.442382+00:00',
  '2026-07-13T14:15:23.109+00:00',
  false,
  '10:15:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3f6c4059-ebb8-47ec-9cc3-9cd37dd894fc',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-13',
  '[{"count":1,"notes":"Ca 1 post archive, ad Stop then posted new one and boost new post","description":"Client posting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":11,"notes":"Lms issue LMS access , access remove","description":"Tech support"},{"count":1,"notes":"1 lecture added to rpdm66","description":"Lecture added"},{"count":7,"notes":"","description":"Enrollment calls"},{"count":40,"notes":"Amazon what''s app grp add, verification of payments","description":"Amazon calls"},{"count":47,"notes":"","description":"Amazon access"},{"count":1,"notes":"Student details to Naveen sir","description":"Attendance report"},{"count":1,"notes":"Mastersheet update dm","description":"Sheet update"},{"count":1,"notes":"Marathi landing page changes done","description":"Landing page changes"}]'::jsonb,
  '',
  '2026-07-13T14:40:59.620176+00:00',
  '2026-07-13T14:42:30.178+00:00',
  false,
  '10:15:00',
  '20:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '23e221b9-b1cd-4954-9d19-09964e8af183',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-13',
  '[{"count":1,"notes":"14","description":"Daily Calls"},{"count":1,"notes":"8","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"1","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-13T16:29:25.092571+00:00',
  '2026-07-13T16:29:24.973+00:00',
  false,
  '10:25:00',
  '19:17:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b6879b8b-49de-48b5-9af5-4e48938da7ab',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-14',
  '[{"count":2,"notes":"Done. 2 script for Pandit capitals","description":"Content scripting"},{"count":1,"notes":"Done. 1 post about students completed DM course.","description":"Google posting replies"}]'::jsonb,
  '',
  '2026-07-14T12:52:21.824157+00:00',
  '2026-07-14T12:52:21.163+00:00',
  false,
  '10:20:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd695c5af-4be7-4949-8de4-ae3ab8e83396',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-14',
  '[{"count":15,"notes":"Daily Fresh Calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups calls","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-14T13:15:39.851052+00:00',
  '2026-07-14T13:15:39.28+00:00',
  false,
  '09:55:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'edcacc8d-6fbb-4a7d-9d35-c0a58c8d8762',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-14',
  '[{"count":5,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Content research for topics","description":"Pooja kadam"},{"count":1,"notes":"Rp banners with kedar","description":"Banner"},{"count":1,"notes":"Content ideation and shoot for rp and oorruu","description":"Content"},{"count":1,"notes":"1 for Course","description":"Amazon payment info"},{"count":1,"notes":"Exam postponed, called riddhi for exam","description":"Exam msg call"},{"count":1,"notes":"Pooja lokhande, Shubham konde for there remaining course","description":"Batch addtion"},{"count":1,"notes":"Updated dates of enrollment","description":"Attendance sheet"}]'::jsonb,
  '',
  '2026-07-14T14:33:54.801287+00:00',
  '2026-07-14T14:33:54.665+00:00',
  false,
  '10:33:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '07797182-c51b-4465-b5da-7d710516be78',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-14',
  '[{"count":1,"notes":"Follow Up","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done, Follow Up","description":"Vanntagge CFO"},{"count":1,"notes":"1 Reel In Progress","description":"Amylua Gems"},{"count":1,"notes":"3 Designs Altered and Making 1 New Design","description":"Banner"},{"count":3,"notes":"3 Cultural Reels","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-14T14:38:29.955872+00:00',
  '2026-07-14T14:38:29.834+00:00',
  false,
  '10:33:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd480b992-3f46-42aa-8090-c796cfded23c',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-14',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-14T16:24:25.049041+00:00',
  '2026-07-14T16:24:24.459+00:00',
  false,
  '10:08:00',
  '18:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '52b00757-e9ab-4c9a-a545-4254cdbd1829',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-15',
  '[{"count":1,"notes":"2 post","description":"Client posting"},{"count":1,"notes":"Content planning for Pooja kadam","description":"Content scripting"},{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":7,"notes":"Lms issue, lms access, enrollment call","description":"Tech support"},{"count":1,"notes":"Instructions for traing Saurabh for designing","description":"Rohan"},{"count":1,"notes":"Accounts setup for ca Ajit","description":"Shreya"},{"count":1,"notes":"New exam date notification","description":"Exam"},{"count":1,"notes":"Client onboarding sop structure","description":"Sop"},{"count":1,"notes":"For rushisir","description":"New ig acc"}]'::jsonb,
  '',
  '2026-07-15T15:42:28.087182+00:00',
  '2026-07-15T15:42:27.967+00:00',
  false,
  '10:15:00',
  '21:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b3ed089c-88ac-457f-8221-7361e8c59f2a',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-15',
  '[{"count":9,"notes":"Shoot At Andheri - 09 Reels","description":"Advisor Alpha"},{"count":2,"notes":"Hardika - New Product Shoot, AdvisorAlpha Sheet Updated","description":"Client Management"}]'::jsonb,
  '',
  '2026-07-15T15:36:39.821492+00:00',
  '2026-07-15T15:44:14.627+00:00',
  false,
  '11:05:00',
  '21:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd34be9df-0818-422b-b723-83e4c82060f8',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-15',
  '[{"count":1,"notes":"Designed festival post","description":"Design"},{"count":1,"notes":"Posting has done","description":"Daily posting"},{"count":2,"notes":"Designed thumbnail for client","description":"Design"},{"count":1,"notes":"Designed thumbnail for agnomatic","description":"Design"},{"count":1,"notes":"Designed thumbnail for RPDM","description":"Design"},{"count":1,"notes":"Training has Done on WhatsApp API","description":"Other"},{"count":1,"notes":"Training has done of student for design","description":"Other"}]'::jsonb,
  '',
  '2026-07-15T16:00:16.193909+00:00',
  '2026-07-15T16:00:15.594+00:00',
  false,
  '13:27:00',
  '21:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5d24f3ca-6a80-4fa4-9dde-13f8eca6bdb9',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-15',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Account creation and setup , posting done","description":"Vanttagge CFO"},{"count":1,"notes":"Calling done for AI course and information collected","description":"Calling"},{"count":1,"notes":"Script and some content ideas","description":"DM"},{"count":1,"notes":"Topics added and generated script,","description":"Pandit capital"},{"count":1,"notes":"Trained by krish with live client setup","description":"Agnochat"}]'::jsonb,
  '',
  '2026-07-15T17:25:28.409097+00:00',
  '2026-07-15T17:25:27.865+00:00',
  false,
  '10:02:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f65dfc3c-8e1f-47a1-bea3-c2d59debe16c',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-15',
  '[{"count":1,"notes":"Client shoot at Andheri","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-15T17:41:38.795503+00:00',
  '2026-07-15T17:41:38.691+00:00',
  false,
  '10:02:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fcdc76e7-840e-4dc5-bf7f-1f08b2210bf1',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-16',
  '[{"count":15,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":35,"notes":"Daily Follow ups calls made","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-16T13:40:46.334736+00:00',
  '2026-07-16T13:40:45.839+00:00',
  false,
  '09:57:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '65840ba5-9fe9-4176-ac7d-55d1b886342f',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-16',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"Attendance marked & assignment","description":"LMS"},{"count":1,"notes":"topics & scripts","description":"Pandit capital"}]'::jsonb,
  '',
  '2026-07-16T13:45:22.849422+00:00',
  '2026-07-16T13:45:22.705+00:00',
  false,
  '10:11:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ff2af122-1b47-4733-9693-93a62af8864c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-16',
  '[{"count":1,"notes":"1 Reel In Progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow up with Hardika Regarding one client","description":"Client Management"},{"count":4,"notes":"4 Designs changes","description":"Banner"},{"count":1,"notes":"Client Content Planning","description":"Team Meeting"},{"count":1,"notes":"1 Reel In Progress","description":"Amulya Gems"}]'::jsonb,
  '',
  '2026-07-16T14:24:07.795767+00:00',
  '2026-07-16T14:24:07.669+00:00',
  false,
  '10:40:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7a1fc5bb-999d-4b07-9362-ba92d317b8ab',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-16',
  '[{"count":12,"notes":"completed shoots","description":"Shoot"},{"count":1,"notes":"Designed thumbnails","description":"Design"},{"count":1,"notes":"Sent reminder on webinar group","description":"Reminder management"},{"count":2,"notes":"Designed Ad creatives","description":"Design"}]'::jsonb,
  '',
  '2026-07-16T14:29:22.729008+00:00',
  '2026-07-16T14:29:22.199+00:00',
  false,
  '11:22:00',
  '20:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6046a003-675a-41e4-947c-f36ebc42484c',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-16',
  '[{"count":3,"notes":"2 cultural reel, 1 reel in progress","description":"Internal reel editing"},{"count":1,"notes":"Discussion with client","description":"Client"},{"count":1,"notes":"Ai course shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-16T14:45:12.32153+00:00',
  '2026-07-16T14:45:11.802+00:00',
  false,
  '10:11:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '122cd08d-117d-4ef1-acef-efca23cbc340',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-16',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-16T15:39:53.249982+00:00',
  '2026-07-16T15:39:52.733+00:00',
  false,
  '10:25:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0c15841f-4c25-42e0-9cfd-bc9ea525d92c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-16',
  '[{"count":1,"notes":"Sakal ad set up","description":"Ads reporting"},{"count":1,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Form created","description":"WhatsApp masterclass"},{"count":1,"notes":"Om sai Ratnakar","description":"Content strategy"},{"count":1,"notes":"Pooja kadam","description":"Content plan"},{"count":1,"notes":"Lead reply","description":"Regular"},{"count":18,"notes":"Amazon course","description":"Yt upload"}]'::jsonb,
  '',
  '2026-07-16T17:55:00.686144+00:00',
  '2026-07-16T18:16:54.283+00:00',
  false,
  '10:40:00',
  '21:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5be97b61-3202-4207-919a-23d9ddb2df9e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-17',
  '[{"count":15,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":7,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-17T13:20:32.565374+00:00',
  '2026-07-17T13:20:32.433+00:00',
  false,
  '10:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '109340af-75c6-4166-be24-bff726ed8087',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-17',
  '[{"count":1,"notes":"1 Reel and 1 Thumbnail Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Amulya Gems"},{"count":1,"notes":"","description":"Shoot Assistance"},{"count":1,"notes":"","description":"Quotation Changes"}]'::jsonb,
  '',
  '2026-07-17T13:45:38.938636+00:00',
  '2026-07-17T13:45:38.28+00:00',
  false,
  '10:13:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e60b641e-d505-4b7c-87ee-420481628bf7',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-17',
  '[{"count":6,"notes":"Amazon ad , amazon testimonial 4 , agnomatic reel in process","description":"Internal reel editing"},{"count":1,"notes":"amazon testimonial, dm ad shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-07-17T13:46:01.819472+00:00',
  '2026-07-17T13:46:01.302+00:00',
  false,
  '09:30:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ac8290be-6c20-4760-b359-6a70abbcb939',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-17',
  '[{"count":7,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed one thumbnail","description":"Design"},{"count":1,"notes":"Reminder sent on group","description":"Reminder management"},{"count":1,"notes":"Carousel designing is in progress","description":"Design"},{"count":1,"notes":"Designing training given","description":"Other"}]'::jsonb,
  '',
  '2026-07-17T18:02:41.746583+00:00',
  '2026-07-17T18:02:41.63+00:00',
  false,
  '12:20:00',
  '20:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '26959181-4495-4a39-82c0-0310625fd1cf',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-17',
  '[{"count":2,"notes":"Sakal ad live , amazon hindi ad done","description":"Ads reporting"},{"count":1,"notes":"Lms issue, lms access, amazon issue","description":"Tech support"},{"count":4,"notes":"Amazon webinar testimonials upload yt","description":"Testimonials"},{"count":1,"notes":"Introduction video","description":"Yt upload"},{"count":1,"notes":"Changes additon done","description":"Landing page"},{"count":1,"notes":"Content finalization meeting done","description":"Pooja kadam"},{"count":2,"notes":"","description":"Amazon issues"},{"count":1,"notes":"4","description":"Cv shared"},{"count":1,"notes":"Msg for cvs","description":"Placement"}]'::jsonb,
  '',
  '2026-07-17T18:20:47.520191+00:00',
  '2026-07-17T18:20:47.388+00:00',
  false,
  '10:15:00',
  '19:22:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '650c3c21-b447-41f2-bb5a-2cfd545482b1',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-18',
  '[{"count":3,"notes":"amazon ad, oorruu cultural, dm informative","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-07-18T12:27:38.646488+00:00',
  '2026-07-18T12:27:38.524+00:00',
  false,
  '09:50:00',
  '06:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9506310b-03c3-4dd1-bd88-6f6711527c48',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-18',
  '[{"count":1,"notes":"1 Reel Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel in Progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up With Raunaq regarding payment","description":"Client Management"},{"count":1,"notes":"1 Reel Done","description":"Amulya Gems"},{"count":1,"notes":"","description":"Meeting With Rushi Sir"}]'::jsonb,
  '',
  '2026-07-18T12:38:24.149956+00:00',
  '2026-07-18T12:38:24.016+00:00',
  false,
  '11:20:00',
  '18:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1c4fc6d7-2a3f-4226-a356-a7471dee7ac5',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-22',
  '[{"count":4,"notes":"Done.","description":"Shooting"},{"count":1,"notes":"Done","description":"Google posting replies"},{"count":4,"notes":"Assignment projects : Classroom & Capstone","description":"Assignment projects : Classroom & Capstone"}]'::jsonb,
  '',
  '2026-07-22T13:55:42.543406+00:00',
  '2026-07-22T13:55:42.011+00:00',
  false,
  NULL,
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7cdd7ad8-4f8f-4b11-bbcb-5ca3721435c5',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-18',
  '[{"count":3,"notes":"Done. How Hospitals Can Automate Appointment Booking. AI Automation for Educational Institutes. AI for Recruitment Agencies.","description":"Content scripting"},{"count":1,"notes":"Done. Rushi Sir explaining how AI is creating job opportunities.","description":"Google posting replies"},{"count":1,"notes":"August Content planner Calendar for Agnomatic","description":"Agnomatic Calender"}]'::jsonb,
  '',
  '2026-07-18T13:15:14.301456+00:00',
  '2026-07-18T13:15:34.668+00:00',
  false,
  '10:20:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '44e856da-2c56-4d0e-a85e-b55cebdc7632',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-18',
  '[{"count":46,"notes":"fresh Daily calls made","description":"Daily Calls"},{"count":35,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-18T13:24:37.046479+00:00',
  '2026-07-18T13:24:36.561+00:00',
  false,
  '09:57:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '65158e78-4a41-4d41-85b1-750906c454dc',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-18',
  '[{"count":1,"notes":"Designed carousel for Client","description":"Design"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Group has created for next webinar","description":"WhatsApp group creation"},{"count":2,"notes":"LInk has created on ZOOM","description":"ZOOM"},{"count":1,"notes":"Designed static post for client","description":"Design"},{"count":2,"notes":"Static and carousel post designing is in progress","description":"Design"},{"count":1,"notes":"Trained intern for Designs","description":"Other"}]'::jsonb,
  '',
  '2026-07-18T13:54:35.174707+00:00',
  '2026-07-18T13:54:35.052+00:00',
  false,
  '12:30:00',
  '19:35:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ae4c0788-5513-414a-b9dc-2de9264b1cce',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-18',
  '[{"count":1,"notes":"16","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-18T14:53:28.726248+00:00',
  '2026-07-18T14:53:28.195+00:00',
  false,
  '09:31:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4fa78343-e8c0-4eab-86d6-a60b042984d8',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-20',
  '[{"count":20,"notes":"fresh daily calls done","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-20T13:17:07.080028+00:00',
  '2026-07-20T13:17:06.603+00:00',
  false,
  '10:03:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '10a0fa0d-893e-48bd-8e32-70ba9ac1fe3e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-20',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"posting and done chnges according to them","description":"Vanntagge"}]'::jsonb,
  '',
  '2026-07-20T15:01:53.356468+00:00',
  '2026-07-20T15:01:52.813+00:00',
  false,
  '10:25:00',
  '20:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e04f6e2b-d22c-4965-bad0-9106b817d904',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-20',
  '[{"count":3,"notes":"1 dm cultural , 1 ganpati reel , changes in oorruu reel, dm ad in process","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-07-20T15:04:55.661057+00:00',
  '2026-07-20T15:04:55.539+00:00',
  false,
  '10:25:00',
  '08:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '66adf7ab-b9c0-469a-a1f3-8a554d607b8d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-20',
  '[{"count":1,"notes":"Completed Shoot of Meeting","description":"Shoot"},{"count":1,"notes":"Designed thumbnail for course","description":"Design"},{"count":20,"notes":"Called people for access","description":"Webinar management"},{"count":1,"notes":"Reminder has sent on group","description":"Reminder management"},{"count":1,"notes":"Attended Meeting","description":"Other"}]'::jsonb,
  '',
  '2026-07-20T15:05:05.868344+00:00',
  '2026-07-20T15:05:05.328+00:00',
  false,
  '12:00:00',
  '20:50:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'df0f561d-7aeb-4519-ae0f-d4c06d9a6e8d',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-20',
  '[{"count":1,"notes":"Hardika and Neha Follow Up","description":"Client Management"},{"count":1,"notes":"","description":"2 Amazon Webinar Videos"},{"count":1,"notes":"","description":"Restructure Meeitng"}]'::jsonb,
  '',
  '2026-07-20T15:24:54.123353+00:00',
  '2026-07-20T15:24:53.572+00:00',
  false,
  '10:20:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fc2e6aaf-44ee-48ce-a11d-b574aa2faa77',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-20',
  '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":32,"notes":"Lms issue, lms suspension, lms unsuspend, amazon access","description":"Tech support"},{"count":6,"notes":"","description":"Amazon calls"},{"count":1,"notes":"","description":"Oorruu posting"},{"count":1,"notes":"","description":"Ganpati posting"},{"count":1,"notes":"Shoot schedule","description":"Pooja kadam"}]'::jsonb,
  '',
  '2026-07-20T15:26:15.659731+00:00',
  '2026-07-20T15:26:15.154+00:00',
  false,
  '10:20:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6d483291-094a-41ae-a594-3f0384d1849b',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-21',
  '[{"count":20,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":8,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-21T13:12:13.981639+00:00',
  '2026-07-21T13:12:29.243+00:00',
  false,
  '10:07:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9742eff6-febb-4de1-b89f-676d543ef64b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-21',
  '[{"count":1,"notes":"1 Reel In Progress","description":"Advisor Alpha"},{"count":2,"notes":"2 Reels Changes, Made 2 Thumbnails","description":"Vanntagge CFO"},{"count":4,"notes":"4 Designs Size Changes Done","description":"RP Baner"}]'::jsonb,
  '',
  '2026-07-21T13:54:08.080141+00:00',
  '2026-07-21T13:54:07.967+00:00',
  false,
  '10:13:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3f9720fc-9cd7-4c28-8968-fd256b69553a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-21',
  '[{"count":2,"notes":"dm ad, cultural dm","description":"Internal reel editing"},{"count":1,"notes":"cultural reel","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-21T14:02:14.68067+00:00',
  '2026-07-21T14:02:14.193+00:00',
  false,
  '10:02:00',
  '07:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e17257ed-47d6-4390-ab4e-9aac22ea2b60',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-21',
  '[{"count":2,"notes":"2 amazon hindi ads , form and audiance changes done","description":"Ads reporting"},{"count":5,"notes":"Lms suspension, unsuspend, amazon access","description":"Tech support"},{"count":2,"notes":"","description":"Hosting space"},{"count":3,"notes":"","description":"Amazon access"},{"count":1,"notes":"Amazon replies, sakali ads","description":"Leads"}]'::jsonb,
  '',
  '2026-07-21T16:34:32.47982+00:00',
  '2026-07-21T16:34:31.949+00:00',
  false,
  '10:13:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fe1cafca-be9f-47a2-8b48-62268066e71f',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-22',
  '[{"count":10,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":40,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":9,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-22T13:38:45.92398+00:00',
  '2026-07-22T13:38:45.415+00:00',
  false,
  '10:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b6732142-4c35-43c8-b572-4a9a830ddedf',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-22',
  '[{"count":3,"notes":"2 informative , dm ad in process","description":"Internal reel editing"},{"count":1,"notes":"CA sir shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-07-22T13:50:44.031106+00:00',
  '2026-07-22T13:50:43.503+00:00',
  false,
  '10:15:00',
  '07:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a3a4afc5-bed8-40a7-96e6-0f1172d988b7',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-22',
  '[{"count":1,"notes":"1 Reel And Thumbnail Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel And Thumbnail Done","description":"Advisor Alpha"},{"count":1,"notes":"Orruu Managemenst Sheet Updated","description":"Client Management"},{"count":1,"notes":"Shoot - 4 Reels","description":"Vanntagge CFO"}]'::jsonb,
  '',
  '2026-07-22T15:07:18.350379+00:00',
  '2026-07-22T15:07:17.81+00:00',
  false,
  '10:30:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e07b21fd-00be-4af9-88c0-bea9dec95466',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-22',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Posting","description":"Vanntagge cfo"},{"count":1,"notes":"Done","description":"Amazon YouTube thumbnail uploading"},{"count":1,"notes":"Modules of the topics done ( to be discussed again with krish)","description":"Agentic Ai course"},{"count":1,"notes":"Assisted in shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-22T16:49:29.354254+00:00',
  '2026-07-22T16:49:28.858+00:00',
  false,
  '10:15:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '319b3540-9ea7-4742-9bf5-564f044d7bd0',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-22',
  '[{"count":1,"notes":"Ca suyash","description":"Client posting"},{"count":2,"notes":"1 sakal ad, 1 dm ad, fund check","description":"Ads reporting"},{"count":5,"notes":"Lms issue, amazon issues, amazon access, payment verification","description":"Tech support"},{"count":2,"notes":"Leads shared, follow up with parveen","description":"Sakal"},{"count":1,"notes":"1 in progress, for 1 banner gave instructions to rohan","description":"Banner"},{"count":6,"notes":"","description":"Hosting space"},{"count":1,"notes":"Assignment chnages to swapnil","description":"Assignment"},{"count":1,"notes":"Meeting done","description":"Ajit Shinde"},{"count":1,"notes":"Changes done","description":"Brochure"},{"count":1,"notes":"Follow up with Akshay, msg to group","description":"Freelance session"},{"count":1,"notes":"MagnovaIQ meeting","description":"Team meeting"},{"count":1,"notes":"Lead replies, content research for carousels","description":"Regular"}]'::jsonb,
  '',
  '2026-07-22T17:37:32.184779+00:00',
  '2026-07-22T17:37:31.652+00:00',
  false,
  '10:30:00',
  '20:53:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ed4232c5-f105-4033-91a3-fb10c2581101',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-23',
  '[{"count":10,"notes":"Fresh calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":9,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-23T13:21:24.964354+00:00',
  '2026-07-23T13:21:24.809+00:00',
  false,
  '10:00:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6d2b9944-b5b6-4e3a-ae93-c00c70c4f62f',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-23',
  '[{"count":1,"notes":"Done.","description":"Google posting replies"},{"count":30,"notes":"Research for Digital Detox products","description":"Digital Detox"}]'::jsonb,
  '',
  '2026-07-23T13:25:20.904384+00:00',
  '2026-07-23T13:25:20.792+00:00',
  false,
  '10:35:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '41818447-7d19-4a2e-baf4-294c7fff6c52',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-23',
  '[{"count":1,"notes":"1 Reel In progress","description":"CA Suyash Sir"},{"count":2,"notes":"2 Ads and 2 Thumbnails Done","description":"Advisor Alpha"},{"count":1,"notes":"Updated Oorruu Management sheet","description":"Client Management"},{"count":1,"notes":"1 Reel In Progress","description":"Vanntagge CFO"},{"count":1,"notes":"","description":"Table Arrangement AND Printer Setup"}]'::jsonb,
  '',
  '2026-07-23T13:44:16.775533+00:00',
  '2026-07-23T13:49:06.313+00:00',
  false,
  '10:16:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e73e0666-4788-4220-916a-6fd185c757e4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-23',
  '[{"count":4,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed static post for client","description":"Design"},{"count":1,"notes":"Reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"Link has created for workshop","description":"Zoom"},{"count":1,"notes":"Designed carousel for RPDM","description":"Design"},{"count":1,"notes":"Carousel design is in progress","description":"Design"},{"count":1,"notes":"Helped in arrangements of workshop","description":"Other"}]'::jsonb,
  '',
  '2026-07-23T17:44:10.528648+00:00',
  '2026-07-23T17:44:10.024+00:00',
  false,
  '11:15:00',
  '19:08:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4ccb0c37-23ae-42de-8f20-4f82677a5dff',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-23',
  '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":1,"notes":"Lms issues","description":"Tech support"},{"count":1,"notes":"Arrangement","description":"Workshop"},{"count":1,"notes":"Batch confirmation calls, batch created","description":"New batch creation"},{"count":1,"notes":"Team meeting for work destribution and plan","description":"MagnovaIQ"},{"count":1,"notes":"Ig login done, other on shoot day","description":"Sharanam"},{"count":1,"notes":"Cultural reel","description":"Shhot"}]'::jsonb,
  '',
  '2026-07-23T18:21:20.340273+00:00',
  '2026-07-23T18:21:20.229+00:00',
  false,
  '10:13:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a2d84792-8ebe-4121-8227-ad87ae981528',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-24',
  '[{"count":1,"notes":"Done. Freelancing session","description":"Google posting replies"},{"count":25,"notes":"Toys research for Digital Detox","description":"Digital Detox"}]'::jsonb,
  '',
  '2026-07-24T13:22:42.32901+00:00',
  '2026-07-24T13:22:41.789+00:00',
  false,
  '10:20:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '47d0eec7-b16c-4b10-be97-7570eb84730f',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-24',
  '[{"count":11,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":10,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-24T13:23:49.995745+00:00',
  '2026-07-24T13:23:49.898+00:00',
  false,
  '09:59:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '486a1b83-25a2-4ae7-9649-69148d46adf7',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-24',
  '[{"count":4,"notes":"changes in dm testimonials, cultural reel dm, dm informative , dm ad in process, ganpati reel ideas","description":"Internal reel editing"}]'::jsonb,
  '',
  '2026-07-24T13:32:26.969122+00:00',
  '2026-07-24T13:32:26.841+00:00',
  false,
  '10:00:00',
  '07:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8a4b79bd-7026-4895-ba9e-0d6f5f1a6962',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-24',
  '[{"count":2,"notes":"1 Reel Done 1 Thumbnail Done","description":"CA Suyash Sir"},{"count":1,"notes":"Payment Follow Up Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Vanntagge CFo"},{"count":1,"notes":"","description":"Krish Bday Celebration"}]'::jsonb,
  '',
  '2026-07-24T14:25:32.390767+00:00',
  '2026-07-24T14:25:31.859+00:00',
  false,
  '10:33:00',
  '20:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'df2fdb55-248d-4679-a0a3-c6896b55af81',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-24',
  '[{"count":1,"notes":"18","description":"Daily Calls"},{"count":1,"notes":"3","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-24T15:00:24.635041+00:00',
  '2026-07-24T15:00:24.131+00:00',
  false,
  '10:50:00',
  '19:02:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2e66a09a-9b22-42fd-b630-ba868a87e97b',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-24',
  '[{"count":1,"notes":"Designed thumbnail","description":"Design"},{"count":1,"notes":"Posting has done","description":"Daily posting"},{"count":1,"notes":"Reminder has sent on webinar group","description":"Reminder management"},{"count":1,"notes":"Carousel design is in progress","description":"Design"},{"count":1,"notes":"Helped saurabh to design carousel of client","description":"Other"}]'::jsonb,
  '',
  '2026-07-24T18:07:49.767+00:00',
  '2026-07-24T18:07:49.654+00:00',
  false,
  '12:15:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b6f7a07b-2637-47e8-b06c-06c6c046dbfb',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-25',
  '[{"count":1,"notes":"Done. Aashadhi Waari post","description":"Google posting replies"},{"count":1,"notes":"Amazon MOU draft","description":"Amazon"}]'::jsonb,
  '',
  '2026-07-25T13:33:48.137716+00:00',
  '2026-07-25T13:33:47.653+00:00',
  false,
  '10:25:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8bec52f6-f0e5-49cb-a3f2-990f33d3bd7e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-25',
  '[{"count":10,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":11,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-25T13:45:28.565804+00:00',
  '2026-07-25T13:45:28.045+00:00',
  false,
  '10:20:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '77ca9f6d-c57f-418a-888b-e8ebdb6d2f42',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-25',
  '[{"count":1,"notes":"Completed shoot of games","description":"Shoot"},{"count":1,"notes":"Designed festival post","description":"Design"},{"count":1,"notes":"Sent link for doubt solving","description":"Webinar management"},{"count":2,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Group was created for next webinar","description":"WhatsApp group creation"},{"count":1,"notes":"Celebrated traditional day","description":"Other"},{"count":2,"notes":"Links prepared for webinar and doubt solving","description":"Zoom"}]'::jsonb,
  '',
  '2026-07-25T18:07:51.747533+00:00',
  '2026-07-25T18:07:51.618+00:00',
  false,
  '10:40:00',
  '20:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cff47940-b451-43c6-bded-5c8516df769e',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-27',
  '[{"count":3,"notes":"3 MOU final","description":"Amazon"}]'::jsonb,
  '',
  '2026-07-27T13:12:48.659401+00:00',
  '2026-07-27T13:12:48.153+00:00',
  false,
  '10:30:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '01d51005-67a1-4f28-a323-6fcac81f5ecc',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-27',
  '[{"count":26,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"daily follow ups","description":"Daily Follow-up"},{"count":11,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-27T13:36:56.497559+00:00',
  '2026-07-27T13:36:56.371+00:00',
  false,
  '10:50:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '83501509-a878-4132-9441-c06ffc18628f',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-27',
  '[{"count":2,"notes":"ganpati reel, making changes in amazon ad","description":"Internal reel editing"},{"count":2,"notes":"changes in dm long, 1 long testimonial dm , agnochat lec in process","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-07-27T13:56:34.03337+00:00',
  '2026-07-27T13:56:33.546+00:00',
  false,
  '10:16:00',
  '07:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fd324146-9e5f-4e38-9529-0ce65ad1e392',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-27',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"worked on scripts for ad","description":"Agentic AI course"},{"count":1,"notes":"worked on script","description":"dm"},{"count":1,"notes":"posting done","description":"vanntagge cfo"},{"count":1,"notes":"assignment  uploaded on lms ( work in progress)","description":"assignment"}]'::jsonb,
  '',
  '2026-07-27T14:09:23.964573+00:00',
  '2026-07-27T14:09:23.854+00:00',
  false,
  '10:16:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1c2be7c0-2d57-4a2c-a7c7-c2a844bf246e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-27',
  '[{"count":1,"notes":"1 Reel In progress","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Amulya Gems"},{"count":1,"notes":"1 Reel And 1 Thumbnail Done","description":"Vanntagge CFO"},{"count":1,"notes":"","description":"Meetiing with shri sir Regarding the DD Games"},{"count":1,"notes":"","description":"Report Meeting"}]'::jsonb,
  '',
  '2026-07-27T14:53:58.655799+00:00',
  '2026-07-27T14:53:58.125+00:00',
  false,
  '11:45:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'a8c75e09-ceee-4ff8-a23b-8e8557225cba',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-27',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-27T15:09:03.119183+00:00',
  '2026-07-27T15:09:02.578+00:00',
  false,
  '10:16:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8b1a66a0-bd38-4ded-82a2-785149136078',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-28',
  '[{"count":1,"notes":"1 reel & 1 Thumbnail Done","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel in progress","description":"Advisor Alpha"},{"count":1,"notes":"Follow Up with Raunaq about payment, Oorruu Media Content sheet Updated","description":"Client Management"},{"count":1,"notes":"1 Reel in Progress","description":"Vanntagge CFO"},{"count":1,"notes":"1 Reel in progress","description":"Rushikesh Sir"},{"count":1,"notes":"Rushi sir ads and reels","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-28T13:17:07.687596+00:00',
  '2026-07-28T13:17:07.143+00:00',
  false,
  '10:13:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '024d6de7-05f6-4fad-a6b9-3821e8eaf7e7',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-28',
  '[{"count":4,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":1,"notes":"posting has done","description":"Daily posting"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":2,"notes":"Design of ad creative has done","description":"Design"},{"count":1,"notes":"Designed thumbnail","description":"Design"}]'::jsonb,
  '',
  '2026-07-28T13:26:25.027489+00:00',
  '2026-07-28T13:26:24.505+00:00',
  false,
  '22:28:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '595ca76b-6f53-44e6-b7a4-861120ab5c9f',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-28',
  '[{"count":1,"notes":"done","description":"Internal Posting"},{"count":1,"notes":"done","description":"Leads management"},{"count":1,"notes":"done","description":"Comments"},{"count":1,"notes":"assigemnts uploaded","description":"LMS"},{"count":1,"notes":"script","description":"dm"},{"count":1,"notes":"Posting","description":"Vanntagge"}]'::jsonb,
  '',
  '2026-07-28T13:25:08.757798+00:00',
  '2026-07-28T13:27:12.269+00:00',
  false,
  '10:05:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3b071f5e-4883-4cee-a9bf-fa868615b5fa',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-28',
  '[{"count":3,"notes":"Done","description":"Shooting"},{"count":3,"notes":"Amazon MOU","description":"Amazon"},{"count":6,"notes":"LMS assignment","description":"Assignment"}]'::jsonb,
  '',
  '2026-07-28T13:33:34.956946+00:00',
  '2026-07-28T13:33:57.529+00:00',
  false,
  '10:25:00',
  NULL,
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '70d9d0d8-d3a3-45c0-a7e0-79d8a2a26da2',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-31',
  '[{"count":3,"notes":"cultural reel, rudhi sir reel, ganpati bappa reel, changes in 2 testimonails","description":"Internal reel editing"},{"count":1,"notes":"changes in 2 long testimonials","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-07-31T13:28:51.416969+00:00',
  '2026-07-31T13:28:51.303+00:00',
  false,
  '10:20:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '41ac8d6e-2d81-41d3-80c9-1f30475e5bdf',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-28',
  '[{"count":15,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":10,"notes":"Dm enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-28T13:47:37.199283+00:00',
  '2026-07-28T13:47:37.07+00:00',
  false,
  '10:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '37d4a5eb-f33f-44ac-a98b-1ac44505259b',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-28',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-28T15:01:11.377087+00:00',
  '2026-07-28T15:01:11.246+00:00',
  false,
  '10:30:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '33006e32-86a7-44d8-9f54-ff90e799d4dc',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-28',
  '[{"count":1,"notes":"Fund check","description":"Ads reporting"},{"count":5,"notes":"Lms access, lms issue, amazon issue amazon access, call","description":"Tech support"},{"count":1,"notes":"Ca content sheet update","description":"Ca sheets"},{"count":1,"notes":"Amazon lead replies, sakal lead share, parveen followup done","description":"Leads"},{"count":1,"notes":"Content creation explain to Saurabh","description":"Agnochat"},{"count":1,"notes":"Amazon learners list who completed the 60% course","description":"List"},{"count":1,"notes":"For rushisir bts","description":"Drive link"}]'::jsonb,
  '',
  '2026-07-28T16:23:01.961853+00:00',
  '2026-07-28T16:23:01.845+00:00',
  false,
  '10:13:00',
  '19:05:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f2628e67-f9d4-4c30-a4ab-3a58bf2b1ec6',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-29',
  '[{"count":10,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily Follow ups","description":"Daily Follow-up"},{"count":11,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-29T13:09:55.963418+00:00',
  '2026-07-29T13:09:55.841+00:00',
  false,
  '12:30:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2bee9c23-5650-49b6-8063-270a978cb54f',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-29',
  '[{"count":1,"notes":"Deigned static post","description":"Design"},{"count":1,"notes":"Carousel Design is in progress","description":"Design"},{"count":1,"notes":"Ad creative Designing is in progress","description":"Design"},{"count":1,"notes":"Link prepared for rutuj sir friend","description":"Zoom"},{"count":1,"notes":"Attended meeting of magnova IQ","description":"Other"}]'::jsonb,
  '',
  '2026-07-29T14:46:01.514718+00:00',
  '2026-07-29T14:46:00.94+00:00',
  false,
  '23:15:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '07230c92-3411-4085-9728-c4887e44ce40',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-29',
  '[{"count":2,"notes":"DM informative, ai ad","description":"Internal reel editing"},{"count":1,"notes":"ai course in process","description":"Internal YouTube editing"}]'::jsonb,
  '',
  '2026-07-29T14:52:18.570755+00:00',
  '2026-07-29T14:52:18.41+00:00',
  false,
  '12:29:00',
  '08:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd42a8686-4c9b-40a3-8765-061ac3352ddc',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-29',
  '[{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Rushi Sir"},{"count":1,"notes":"1 Long YT done","description":"Pandit Capital"},{"count":1,"notes":"1 Epidose of Whp API Done","description":"Agnochat"},{"count":1,"notes":"Content Planning","description":"Meeting with Pooja regarding CA Suyash Planning"}]'::jsonb,
  '',
  '2026-07-29T14:59:50.173361+00:00',
  '2026-07-29T14:59:50.017+00:00',
  false,
  '10:25:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cd89a918-f11d-4d8e-b984-424664d8a3bc',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-30',
  '[{"count":1,"notes":"Shoot Completed","description":"Shoot"},{"count":1,"notes":"Designed Thumbnail","description":"Design"},{"count":2,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Designed Shoot Creative","description":"Design"},{"count":2,"notes":"Designed Ad Creative","description":"Design"}]'::jsonb,
  '',
  '2026-07-30T13:38:46.480365+00:00',
  '2026-07-30T13:38:46.369+00:00',
  false,
  '09:59:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '81fbad3e-5671-4ce9-89b4-31b72bddb3a2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-30',
  '[{"count":8,"notes":"Fresh daily calls","description":"Daily Calls"},{"count":15,"notes":"Daily follow up","description":"Daily Follow-up"},{"count":12,"notes":"Dm","description":"DM Enrollment"},{"count":1,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-30T13:47:04.269461+00:00',
  '2026-07-30T13:47:03.782+00:00',
  false,
  '10:15:00',
  '19:16:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '598cb855-2473-46df-abec-9cacfaeb3c39',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-30',
  '[{"count":1,"notes":"Meeting with Suyash sir Regarding Content Planning","description":"CA Suyash Sir"},{"count":1,"notes":"1 Reel Done","description":"Advisor Alpha"},{"count":1,"notes":"Oorruu Management Sheet Updated","description":"Client Management"},{"count":1,"notes":"1 Episode of Whatsapp API Course Done","description":"Agnochat"},{"count":1,"notes":"","description":"Banner Installation"}]'::jsonb,
  '',
  '2026-07-30T14:23:09.411081+00:00',
  '2026-07-30T14:23:08.937+00:00',
  false,
  '10:02:00',
  '21:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7ab1af4f-a1aa-4ca8-87cf-0ba5a27f92e6',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-30',
  '[{"count":1,"notes":"Suyash sir meeting, pointers, research for ideas as per his needs","description":"Client posting"},{"count":3,"notes":"lms access, lms issue,","description":"Tech support"},{"count":1,"notes":"structure for his system","description":"ca ajit"},{"count":1,"notes":"exam paper count","description":"exam"},{"count":2,"notes":"enrollment call","description":"call"},{"count":3,"notes":"archana, mayuresh, meta issue vikas","description":"hosting & website issue"},{"count":1,"notes":"sakal leads shared, parveen followup call - not received","description":"leads"},{"count":1,"notes":"rushi sir","description":"posting"}]'::jsonb,
  '',
  '2026-07-30T14:28:25.330503+00:00',
  '2026-07-30T14:28:42.645+00:00',
  false,
  '10:02:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '385057d8-78af-4196-9229-cef40c5bbf62',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-30',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Cultural reel ideas and cultural shoot","description":"Other"},{"count":1,"notes":"Ad campaign","description":"Meta ad"}]'::jsonb,
  '',
  '2026-07-30T15:46:43.27045+00:00',
  '2026-07-30T15:46:43.149+00:00',
  false,
  '10:16:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'e978db98-7d7c-4865-874d-067d63acebdc',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-30',
  '[{"count":1,"notes":"1 rushi sir video","description":"Internal reel editing"},{"count":1,"notes":"Ai course in progress","description":"Internal YouTube editing"},{"count":1,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-07-30T16:52:01.169958+00:00',
  '2026-07-30T16:52:01.045+00:00',
  false,
  '10:16:00',
  '23:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '1bf04365-dbd1-4d5e-a0de-6cd7d8e3b6b2',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-30',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-30T17:51:44.647497+00:00',
  '2026-07-30T17:51:44.538+00:00',
  false,
  '10:49:00',
  '19:02:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '10ac7c81-8604-4709-bd9f-0f8e2298d786',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-31',
  '[{"count":10,"notes":"fresh calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":12,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":1,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-31T13:30:44.504584+00:00',
  '2026-07-31T13:30:44.39+00:00',
  false,
  '11:00:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '758aa2fb-30f7-45c9-9ae9-c1f72e3127d9',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-31',
  '[{"count":2,"notes":"Completed shoots","description":"Shoot"},{"count":3,"notes":"Designed ad creatives","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Designed static post for CA","description":"Design"},{"count":1,"notes":"Banner designing is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-07-31T14:53:13.964007+00:00',
  '2026-07-31T14:53:13.852+00:00',
  false,
  '11:40:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '53a69ffd-b7bd-4ddf-a565-4c0a4b39129b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-31',
  '[{"count":1,"notes":"Follow Up For Next shoot","description":"Advisor Alpha"},{"count":1,"notes":"1 Reel Done","description":"Vanntagge CFO"},{"count":1,"notes":"6 Episodes Done","description":"WhatsApp API"},{"count":1,"notes":"","description":"Naveen Sir Bday celebration"},{"count":1,"notes":"RP Baner Installation","description":"Baner Installation"},{"count":1,"notes":"Made A Workflow System With Pooja For Oorruu Media Clients","description":"Made A Workflow System With Pooja For Oorruu Media Clients"}]'::jsonb,
  '',
  '2026-07-31T14:58:02.146081+00:00',
  '2026-07-31T14:58:02.03+00:00',
  false,
  '11:50:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '983e4e0a-f24c-409f-afec-04f351df727d',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-31',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-07-31T15:37:28.523018+00:00',
  '2026-07-31T15:37:28.041+00:00',
  false,
  '11:49:00',
  '19:16:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '61ddf532-625d-4b4c-93f1-9946fd269b0b',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-31',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Posting","description":"vanntaggeCFO"},{"count":1,"notes":"Attended client meeting and made pointers","description":"Meeting"},{"count":1,"notes":"Published lead generation campaign","description":"Saturday club"},{"count":1,"notes":"Assisted pooja for making a formal flowchart of the content which will need for discussion in the meeting","description":"VanntaggeCFO"}]'::jsonb,
  '',
  '2026-07-31T16:03:23.772966+00:00',
  '2026-07-31T16:03:23.235+00:00',
  false,
  '22:20:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '917f743a-57f5-4415-af22-ec0ab9a8ab30',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-31',
  '[{"count":6,"notes":"Lms issue, lms access, amazon issue, amazon access","description":"Tech support"},{"count":1,"notes":"","description":"Enrollment call"},{"count":1,"notes":"Meeting, Email","description":"Cems"},{"count":1,"notes":"Rushi sir","description":"Posting"},{"count":2,"notes":"Yojana koli, vanntagge cfo","description":"Meeting schedule"},{"count":1,"notes":"Structure and follow up with dinesh","description":"MagnovaIQ"},{"count":5,"notes":"Calls for confirmation","description":"New batch"},{"count":1,"notes":"Meeting schedule msg","description":"Sharanam"}]'::jsonb,
  '',
  '2026-07-31T16:25:52.764979+00:00',
  '2026-07-31T16:25:52.149+00:00',
  false,
  '10:00:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd44053a3-41fb-4b72-a6c6-73c044877b70',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-01',
  '[{"count":9,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon Enrollment","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-01T12:57:22.372164+00:00',
  '2026-08-01T12:57:22.246+00:00',
  false,
  '10:40:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'f28a7080-0497-4d69-a3fd-240faecbd87c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-01',
  '[{"count":1,"notes":"June July Invoice Created and sent via mail","description":"CA Suyash Sir"},{"count":1,"notes":"July Invoice Created and sent via mail","description":"Advisor Alpha"},{"count":1,"notes":"Oorruu Media Sheets Updated","description":"Client Management"},{"count":1,"notes":"1 Reel Done","description":"Vanntagge CFO"}]'::jsonb,
  '',
  '2026-08-01T13:26:24.405517+00:00',
  '2026-08-01T13:26:23.868+00:00',
  false,
  '12:00:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2942a6be-1e9f-4ddc-abc5-f30db0fb678c',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-01',
  '[{"count":1,"notes":"1 informative reel dm","description":"Internal reel editing"},{"count":1,"notes":"narhare sir long video , Ai course","description":"Internal YouTube editing"},{"count":1,"notes":"DM info shoot, testimonial shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-08-01T13:40:55.171241+00:00',
  '2026-08-01T13:40:54.685+00:00',
  false,
  '10:20:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '94266b43-825d-4af0-9a11-0457dc6d309e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-01',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"}]'::jsonb,
  '',
  '2026-08-01T14:34:36.346696+00:00',
  '2026-08-01T14:34:36.219+00:00',
  false,
  '10:20:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '883b2f43-ee72-411a-b688-bfad6b6f7465',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-01',
  '[{"count":5,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Completed design creative","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Whatsapp group has created","description":"WhatsApp group creation"},{"count":1,"notes":"Designed one carousel","description":"Design"},{"count":2,"notes":"Designed static post","description":"Design"},{"count":1,"notes":"Link has made for webinar","description":"Zoom"}]'::jsonb,
  '',
  '2026-08-01T16:04:13.32866+00:00',
  '2026-08-01T16:04:13.213+00:00',
  false,
  '11:30:00',
  '19:46:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '18d01010-6701-467b-a56f-d8de339a0a1b',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-03',
  '[{"count":23,"notes":"Fresh daily Calls Made","description":"Daily Calls"},{"count":30,"notes":"Daily Follow Ups calls","description":"Daily Follow-up"},{"count":1,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-03T13:22:55.970469+00:00',
  '2026-08-03T13:22:55.422+00:00',
  false,
  '11:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'd006d0ce-161d-4e6c-bb2c-59775c1287d9',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-03',
  '[{"count":1,"notes":"Testimonials dm","description":"Internal reel editing"},{"count":5,"notes":"Ai course done","description":"Internal YouTube editing"},{"count":1,"notes":"Sharanam client shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-08-03T13:34:37.03933+00:00',
  '2026-08-03T13:34:36.912+00:00',
  false,
  '10:20:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5f5528d1-c75e-4d67-99b3-936e1202d1a6',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-03',
  '[{"count":1,"notes":"Internal posting done","description":"Internal Posting"},{"count":1,"notes":"Leads management done","description":"Leads management"},{"count":1,"notes":"Comments done","description":"Comments"},{"count":1,"notes":"done","description":"Vanntagge CFO"},{"count":1,"notes":"content calender updaed of DM & Vanntagge","description":"content calender"},{"count":1,"notes":"assignement checked & Attendence marked","description":"LMS"}]'::jsonb,
  '',
  '2026-08-03T13:34:39.740074+00:00',
  '2026-08-03T13:34:39.216+00:00',
  false,
  '10:20:00',
  '19:31:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '381ad08d-0edd-44f6-9c10-7097ce2ee890',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-03',
  '[{"count":1,"notes":"Follow Up for shoot","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up for Shoot","description":"Advisor Alpha"},{"count":1,"notes":"Shoot Done","description":"Sharnam Healing Centre"},{"count":1,"notes":"Shobha - Aragabatti and disposable item Manufacturer","description":"One Enquiry"}]'::jsonb,
  '',
  '2026-08-03T15:02:32.029503+00:00',
  '2026-08-03T15:02:31.84+00:00',
  false,
  '12:00:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '05fedcf2-858c-4db6-b9a3-26be954f78c7',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-03',
  '[{"count":1,"notes":"fund added","description":"Ads reporting"},{"count":6,"notes":"lms issue, lms access","description":"Tech support"},{"count":48,"notes":"verification, msgs, access, few calls, amazon issues","description":"amazon"},{"count":1,"notes":"shoot, ad script, account access,","description":"pooja kadam"},{"count":1,"notes":"Strategy for lead gen ads","description":"CEMS"},{"count":1,"notes":"","description":"website issue"},{"count":1,"notes":"1 lecture to rpdm70","description":"lecture added"},{"count":16,"notes":"whatsapp api course upload on yt","description":"yt upload"}]'::jsonb,
  '',
  '2026-08-03T15:06:26.884072+00:00',
  '2026-08-03T15:06:26.709+00:00',
  false,
  '10:00:00',
  '20:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '73582b90-56ff-4cb5-ac86-4730542e6820',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-03',
  '[{"count":3,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":1,"notes":"Posting has done","description":"Daily posting"},{"count":48,"notes":"Called for access","description":"Webinar management"},{"count":1,"notes":"Reminder has sent to some peoples","description":"Reminder management"},{"count":1,"notes":"Added peoples in groups","description":"Webinar management"},{"count":1,"notes":"Design static post","description":"Design"},{"count":1,"notes":"Carousel design is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-08-03T15:38:37.912774+00:00',
  '2026-08-03T15:38:37.338+00:00',
  false,
  '10:53:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'b2201362-9889-4c02-9f89-d6f0e09462f5',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-03',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"10","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-03T18:00:38.039962+00:00',
  '2026-08-03T18:00:37.933+00:00',
  false,
  '10:30:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '490f323c-732d-43ae-94c0-95940cc998d5',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-04',
  '[{"count":11,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":2,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-04T13:28:35.191476+00:00',
  '2026-08-04T13:28:34.649+00:00',
  false,
  '10:40:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ccd06bbb-8996-4e46-8bf5-342c3fbd2770',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-04',
  '[{"count":1,"notes":"Follow Up for shoot rescheduled on thursday","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up about payment","description":"Advisor Alpha"},{"count":1,"notes":"2 Reels Done","description":"Oorruu Media"},{"count":1,"notes":"Done Meeting","description":"CEMS"},{"count":1,"notes":"1 Reel In progress","description":"Vanntagge CFO"}]'::jsonb,
  '',
  '2026-08-04T14:36:39.706243+00:00',
  '2026-08-04T14:36:39.576+00:00',
  false,
  '10:30:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'fdfcbeab-b542-43da-9717-5831ebe3d4be',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-04',
  '[{"count":4,"notes":"Lms issue, amazon issue","description":"Tech support"},{"count":1,"notes":"Meeting","description":"Cems"},{"count":1,"notes":"Cultural 1","description":"Shoot"},{"count":1,"notes":"Co ordination for linkedin access","description":"Pooja kadam"},{"count":1,"notes":"Rohan & saurbh designs destribution","description":"Task assigned"}]'::jsonb,
  '',
  '2026-08-04T14:39:35.240189+00:00',
  '2026-08-04T14:39:34.684+00:00',
  false,
  '10:30:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3272d9bb-a2e8-40b8-ae30-3846e8b283ca',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-04',
  '[{"count":20,"notes":"","description":"Daily Calls"},{"count":7,"notes":"","description":"Daily Follow-up"},{"count":2,"notes":"","description":"DM Enrollment"},{"count":0,"notes":"","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-04T14:55:51.385493+00:00',
  '2026-08-04T14:55:50.833+00:00',
  false,
  '10:09:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '5061d869-b2f3-4ad0-96e4-97956411fefe',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-04',
  '[{"count":2,"notes":"Scgt ad  , one video in progress cultural reel","description":"Internal reel editing"},{"count":4,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-08-04T15:44:48.802656+00:00',
  '2026-08-04T15:44:48.309+00:00',
  false,
  '10:15:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2d9d111a-3863-4df8-8858-fd3346e564a3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-04',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":4,"notes":"Cultural reel shoot","description":"Shoot"},{"count":1,"notes":"Client meeting, team meeting","description":"Other"},{"count":1,"notes":"Dm script done","description":"Script"}]'::jsonb,
  '',
  '2026-08-04T15:47:51.266415+00:00',
  '2026-08-04T15:58:15.929+00:00',
  false,
  '09:15:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2fa6ca18-ad00-4a67-9ee8-22eb1a2ab05a',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-04',
  '[{"count":5,"notes":"Completed cultural shoots","description":"Shoot"},{"count":1,"notes":"Designed banner","description":"Design"},{"count":1,"notes":"Designed ad creative","description":"Design"},{"count":1,"notes":"Attended the cems meeting","description":"Other"}]'::jsonb,
  '',
  '2026-08-04T17:51:53.922732+00:00',
  '2026-08-04T17:51:53.379+00:00',
  false,
  '11:28:00',
  '19:46:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '870701bb-2b73-4080-9796-15a441108c2b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-05',
  '[{"count":1,"notes":"1 Reel Done, Payment Follow Up Done","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up for Shoot Done","description":"Advisor Alpha"},{"count":2,"notes":"Updated Oorruu media Management Sheet, Follow Up with Rohan Ghate","description":"Client Management"},{"count":2,"notes":"2 Reels Done, Made 2 Invoices Of July Month","description":"Vanntagge CFO"}]'::jsonb,
  '',
  '2026-08-05T13:33:02.536813+00:00',
  '2026-08-05T13:35:53.827+00:00',
  false,
  '10:40:00',
  '19:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '7badd528-c709-44e3-b4ac-ce1f9e382c69',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-05',
  '[{"count":3,"notes":"2 cultural reel , 1 dm informative","description":"Internal reel editing"},{"count":1,"notes":"Client shoot, Dm informative shoot","description":"shoot"}]'::jsonb,
  '',
  '2026-08-05T13:37:40.923775+00:00',
  '2026-08-05T13:37:40.411+00:00',
  false,
  '10:04:00',
  '07:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ad00b5b3-a23f-4e25-9cf1-0d3d98b708c2',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-05',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Prospects"},{"count":1,"notes":"Posting","description":"Vanntagge CFO"},{"count":1,"notes":"Ad Scripts","description":"Magnova IQ"},{"count":1,"notes":"Assisted in shoot","description":"Shoot"},{"count":1,"notes":"Ad script","description":"CEMS"},{"count":1,"notes":"Posting","description":"Oorruu media"}]'::jsonb,
  '',
  '2026-08-05T15:51:27.765152+00:00',
  '2026-08-05T15:51:27.241+00:00',
  false,
  '10:05:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '96d1c2d5-491f-4f08-bcce-d2d2d84a5423',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-05',
  '[{"count":2,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed ad creatives for CEMS","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Carousel designing is in progress","description":"Design"}]'::jsonb,
  '',
  '2026-08-05T17:22:46.202807+00:00',
  '2026-08-05T17:22:46.072+00:00',
  false,
  '11:29:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8529af72-7dda-4995-b22a-7bf0118e9068',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-06',
  '[{"count":8,"notes":"Fresh daily calls","description":"Daily Calls"},{"count":15,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":3,"notes":"Dm enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-06T13:41:19.311951+00:00',
  '2026-08-06T13:41:18.788+00:00',
  false,
  '11:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '36ece221-3eda-4e33-a3e1-b170b63dc1ad',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-06',
  '[{"count":3,"notes":"Lms issue, lms access","description":"Tech support"},{"count":2,"notes":"1 issue, 1 access","description":"Amazon"},{"count":1,"notes":"Ad campaign with shreya, account access","description":"CEMS"},{"count":1,"notes":"","description":"Enrollment call"}]'::jsonb,
  '',
  '2026-08-06T14:10:13.32177+00:00',
  '2026-08-06T14:10:13.204+00:00',
  false,
  '10:25:00',
  '20:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4be62108-a16c-480a-ab56-f915d4ad61f5',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-06',
  '[{"count":1,"notes":"Team Meeting","description":"Meeting"},{"count":1,"notes":"","description":"Wifi Issue Mule Kam Zala Nahi"},{"count":1,"notes":"1 Reel In Progress","description":"Vanntagge CFo"}]'::jsonb,
  '',
  '2026-08-06T14:10:56.59599+00:00',
  '2026-08-06T14:10:56.124+00:00',
  false,
  '10:25:00',
  '19:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '74fcf311-2107-4187-b398-4291d4fa37c4',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-06',
  '[{"count":1,"notes":"CEMS meta ad campaign","description":"Meta ad"},{"count":1,"notes":"CEMS wp automation","description":"Automation"}]'::jsonb,
  '',
  '2026-08-06T17:11:26.454956+00:00',
  '2026-08-06T17:11:26.322+00:00',
  false,
  '10:15:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'ab85e0d5-f888-43f4-a46b-4dcc0f3fdb95',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-06',
  '[{"count":1,"notes":"Designed webinar creative","description":"Design"},{"count":1,"notes":"Reminder has sent","description":"Reminder management"}]'::jsonb,
  '',
  '2026-08-06T17:26:24.123953+00:00',
  '2026-08-06T17:26:23.611+00:00',
  false,
  '11:20:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '24059eeb-b675-4080-b9e9-4bcd3fcdce5d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-07',
  '[{"count":2,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-07T13:30:38.954942+00:00',
  '2026-08-07T13:30:38.404+00:00',
  false,
  '11:00:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'abd91bea-1316-4a1a-a1ed-eab950a7874d',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-07',
  '[{"count":1,"notes":"Shoot & Payment Follow Up","description":"CA Suyash Sir"},{"count":1,"notes":"Oorruu Media Bill Sheet Updated","description":"Client Management"},{"count":2,"notes":"1 Reel Done, Payment Cleared","description":"Vanntagge CFO"},{"count":1,"notes":"2 Reels Done","description":"Amulya Gems"}]'::jsonb,
  '',
  '2026-08-07T14:15:56.998393+00:00',
  '2026-08-07T14:15:56.873+00:00',
  false,
  '10:25:00',
  '19:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2e1816b7-eebe-4510-851b-d83b675c68c1',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-07',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"7","description":"Daily Follow-up"},{"count":1,"notes":"1","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-07T15:21:02.877949+00:00',
  '2026-08-07T15:21:02.743+00:00',
  false,
  '10:49:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '69db3f8c-233f-441c-a05b-8c34fa02616a',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-07',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Done","description":"Dm script"},{"count":1,"notes":"Scripting done","description":"Magnova iq"},{"count":1,"notes":"Vanntagge posting","description":"Posting"},{"count":1,"notes":"Leads management and sheet creation and updation","description":"CEMS"}]'::jsonb,
  '',
  '2026-08-07T17:03:21.584556+00:00',
  '2026-08-07T17:03:21.463+00:00',
  false,
  '22:28:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cb2e9bf5-6201-4dc2-82c6-83d337a0aab2',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-07',
  '[{"count":3,"notes":"Dm cultural, dm informative , 1 cultural in progress","description":"Internal reel editing"},{"count":2,"notes":"Cultural reel shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-08-07T17:06:02.685275+00:00',
  '2026-08-07T17:06:02.557+00:00',
  false,
  '10:28:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '12ae9f48-e635-4e94-b6c7-edbbc02148e9',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-08',
  '[{"count":6,"notes":"fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":3,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-08T13:13:40.826391+00:00',
  '2026-08-08T13:13:40.703+00:00',
  false,
  '09:57:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '0fd2ecc9-eed9-4b14-aaf0-f6c6b87ebef8',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-08',
  '[{"count":1,"notes":"Follow Up regarding Shoot","description":"CA Suyash Sir"},{"count":1,"notes":"2 Reels Done","description":"Amulya Gems"},{"count":1,"notes":"Meeting Done","description":"Vanntagge CFO"},{"count":1,"notes":"","description":"Calling New lead For Video Editng Done"},{"count":1,"notes":"7 Ads And 1 Landing Page Video Shoot","description":"Magnova IQ"}]'::jsonb,
  '',
  '2026-08-08T13:50:01.610931+00:00',
  '2026-08-08T13:50:01.493+00:00',
  false,
  '10:25:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'be96a294-da13-41f3-9591-3d8b08641b77',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-08',
  '[{"count":3,"notes":"","description":"LMS Amazon Issue"},{"count":1,"notes":"Meeting Done","description":"Vanntagee CFO"},{"count":1,"notes":"9 Scripts Done","description":"Magnova IQ"},{"count":1,"notes":"Follow up and 1 Script Done","description":"Pooja kadam"}]'::jsonb,
  '',
  '2026-08-08T14:00:35.828157+00:00',
  '2026-08-08T14:01:31.797+00:00',
  false,
  '10:25:00',
  '19:40:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '06dec61d-c2af-4014-9af7-a4265398b36d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-08',
  '[{"count":2,"notes":"Completed shoots","description":"Shoot"},{"count":1,"notes":"Designed carousel","description":"Design"},{"count":3,"notes":"Reminder has sent","description":"Reminder management"},{"count":1,"notes":"Group has created","description":"WhatsApp group creation"},{"count":3,"notes":"Link prepared","description":"Zoom"}]'::jsonb,
  '',
  '2026-08-08T17:55:45.22158+00:00',
  '2026-08-08T17:55:44.698+00:00',
  false,
  '10:04:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '6b2980db-a38d-4afb-a8cb-d6f82048e9bc',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-10',
  '[{"count":12,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":20,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-10T13:22:26.370141+00:00',
  '2026-08-10T13:22:26.247+00:00',
  false,
  '09:51:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '672e43cd-ca38-4e9c-9133-7b6e2d906d69',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-10',
  '[{"count":1,"notes":"Follow Up about shoot and payment","description":"CA Suyash Sir"},{"count":1,"notes":"Follow Up done","description":"Advisor Alpha"},{"count":1,"notes":"CA Prakash Kumavat and Soumitra Chatterjee Follow Up Done","description":"Client Management"},{"count":1,"notes":"Landing page Video Done, 1 eng ad in progress","description":"Magnova IQ"},{"count":1,"notes":"Raigad Trip Planning","description":"Meeting"}]'::jsonb,
  '',
  '2026-08-10T13:23:23.084604+00:00',
  '2026-08-10T13:23:22.967+00:00',
  false,
  '10:20:00',
  '19:10:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '483673ae-87a4-4686-a28b-dea2e010935e',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-10',
  '[{"count":3,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Content for landing page","description":"MagnovaIQ"},{"count":1,"notes":"For sayli","description":"Learners sheet"},{"count":40,"notes":"Verification, course access, sheet, msgs, calls","description":"Amazon"}]'::jsonb,
  '',
  '2026-08-10T13:41:29.649086+00:00',
  '2026-08-10T13:41:29.105+00:00',
  false,
  '10:20:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'afc17788-fa30-49c7-a95b-358bfecf6cbd',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-10',
  '[{"count":1,"notes":"10","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-10T14:31:48.494577+00:00',
  '2026-08-10T14:31:47.957+00:00',
  false,
  '10:16:00',
  '19:55:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '81ecfac1-c8ca-4e68-839f-0c52cf8de99e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-11',
  '[{"count":1,"notes":"Follow up regarding product shoot","description":"Shubhash Shrivastav"},{"count":2,"notes":"Meeting At CEMS, Powai, Soumitra Chatterjjee Meeting Scheduling","description":"Client Management"},{"count":1,"notes":"1 meme reel done","description":"DM"},{"count":1,"notes":"1 meme reel done","description":"Oorruu"},{"count":1,"notes":"1 Ad in progress","description":"MagnovaIQ"},{"count":1,"notes":"Scheduling Shoot at Thursday at Mulund","description":"Vanntagge CFO"}]'::jsonb,
  '',
  '2026-08-11T13:04:17.191766+00:00',
  '2026-08-11T13:04:16.696+00:00',
  false,
  '09:30:00',
  '18:45:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '231d305b-80e8-4653-86e3-af2201cd6d56',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-11',
  '[{"count":22,"notes":"Fresh Daily calls made","description":"Daily Calls"},{"count":25,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-11T13:32:58.353713+00:00',
  '2026-08-11T13:32:58.203+00:00',
  false,
  '09:51:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'cdb172d1-630a-4032-8879-2071038449a5',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-11',
  '[{"count":2,"notes":"2 AI testimonials","description":"Internal reel editing"},{"count":1,"notes":"CEMS meeting powai","description":"Other"}]'::jsonb,
  '',
  '2026-08-11T14:11:11.596644+00:00',
  '2026-08-11T14:11:11.468+00:00',
  false,
  '09:45:00',
  '08:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '9205d076-f935-4a27-ac3e-c256f836b98f',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-11',
  '[{"count":4,"notes":"Designed header and footer","description":"Design"},{"count":2,"notes":"Designed the ad creative","description":"Design"},{"count":1,"notes":"Attended the meeting at CEMS","description":"Other"}]'::jsonb,
  '',
  '2026-08-11T14:26:57.220649+00:00',
  '2026-08-11T14:26:57.112+00:00',
  false,
  '11:00:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '2197eec5-0d81-4f82-acb7-f41b7b87cd1c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-11',
  '[{"count":1,"notes":"1 script from rushi sir","description":"Content scripting"},{"count":1,"notes":"Fund check, ad campaign check for cems","description":"Ads reporting"},{"count":2,"notes":"Lms issue","description":"Tech support"},{"count":1,"notes":"Ringing","description":"Enrollment call"},{"count":1,"notes":"Meeting at cems","description":"CEMS"},{"count":1,"notes":"Ad campaign discussion, details, content followup","description":"Pooja kadam"},{"count":1,"notes":"Landing page changes to Dinesh","description":"MagnovaIQ"}]'::jsonb,
  '',
  '2026-08-11T15:41:04.351514+00:00',
  '2026-08-11T15:41:03.858+00:00',
  false,
  '09:35:00',
  '20:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'dfe8c2d4-e0ec-4e12-8483-0dc638d6a324',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-11',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Campaign setup and published for cems","description":"Meta"},{"count":1,"notes":"CEMS meeting at powai","description":"Other"},{"count":1,"notes":"Documeted the plan and requirements of  cems  discussed in the meeting nd shared with rohan","description":"Other"}]'::jsonb,
  '',
  '2026-08-11T16:28:39.41896+00:00',
  '2026-08-11T16:48:28.266+00:00',
  false,
  '09:45:00',
  '20:46:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '4bc5d9b5-d701-4e41-9be3-a6cc481d67ae',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-12',
  '[{"count":12,"notes":"Fresh daily calls made","description":"Daily Calls"},{"count":30,"notes":"Daily follow ups","description":"Daily Follow-up"},{"count":4,"notes":"Dm Enrollment","description":"DM Enrollment"},{"count":0,"notes":"Amazon","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-12T13:11:21.972493+00:00',
  '2026-08-12T13:11:48.657+00:00',
  false,
  '10:05:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '434de039-6f05-4c38-90b0-47b8de686cec',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-12',
  '[{"count":1,"notes":"Follow Up shoot Scheduled on thursday","description":"Advisor Alpha"},{"count":1,"notes":"Meering with soumitra chatterjee","description":"Client Management"},{"count":2,"notes":"1 AD Done, 1 in progress","description":"MagnovaIQ"}]'::jsonb,
  '',
  '2026-08-12T13:42:28.215927+00:00',
  '2026-08-12T13:42:28.068+00:00',
  false,
  '09:56:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '455a9f14-cfe8-4a2b-b2c9-a98437c41a0a',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-12',
  '[{"count":1,"notes":"whats app ads with ayush and arya, cems ad check with shreya, ad creative instructions to ayush arya rohan","description":"Ads reporting"},{"count":5,"notes":"lms issue, lms suspend,unsuspend","description":"Tech support"},{"count":1,"notes":"lead reply and amazon queries","description":"Regular"},{"count":1,"notes":"for 20 august program","description":"form & msg"},{"count":1,"notes":"research for campaign","description":"pooja kadam"}]'::jsonb,
  '',
  '2026-08-12T13:56:05.214776+00:00',
  '2026-08-12T13:56:04.661+00:00',
  false,
  '09:55:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8f97844e-d322-40f7-b25f-46cb825cf90b',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-12',
  '[{"count":1,"notes":"18","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-12T15:45:39.555697+00:00',
  '2026-08-12T15:45:39.071+00:00',
  false,
  '10:06:00',
  '19:17:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '335386d0-e151-458e-9446-bacccb1cfe7a',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-12',
  '[{"count":1,"notes":"Done","description":"Internal Posting"},{"count":1,"notes":"Done","description":"Leads management"},{"count":1,"notes":"Done","description":"Comments"},{"count":1,"notes":"Campaign updated","description":"Cems"},{"count":1,"notes":"Made creative design and published campaign","description":"Saturday club"},{"count":1,"notes":"Done","description":"Dm script"}]'::jsonb,
  '',
  '2026-08-12T17:58:26.82696+00:00',
  '2026-08-12T17:58:26.322+00:00',
  false,
  '22:12:00',
  '19:20:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '3a35c11f-53a5-4d44-a08f-66556f5e95cb',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-13',
  '[{"count":1,"notes":"Shoot at Marol -01","description":"Advisor Alpha"},{"count":1,"notes":"Shoot at office -08","description":"Vanntagge CFO"}]'::jsonb,
  '',
  '2026-08-13T13:23:19.224243+00:00',
  '2026-08-13T13:23:19.1+00:00',
  false,
  '07:55:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  'c992b672-6279-4537-80bb-06cf34840aad',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-14',
  '[{"count":20,"notes":"fresh daily call made","description":"Daily Calls"},{"count":40,"notes":"Daily follow ups made","description":"Daily Follow-up"},{"count":5,"notes":"Dm Enrollment","description":"DM Enrollment"}]'::jsonb,
  '',
  '2026-08-14T13:24:29.152387+00:00',
  '2026-08-14T13:24:29.029+00:00',
  false,
  '10:00:00',
  '19:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '33c97c4a-9122-4e9b-ba5d-7779edd812f9',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-14',
  '[{"count":1,"notes":"1 ad done","description":"MagnovaIQ"},{"count":1,"notes":"banner setup, staircase vr carpet takala, independance day calebration","description":"extra work"}]'::jsonb,
  '',
  '2026-08-14T14:33:46.095319+00:00',
  '2026-08-14T14:33:45.584+00:00',
  false,
  '10:40:00',
  '20:15:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '8999080c-7c97-49f0-8c5e-cb55fa4eb72f',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-14',
  '[{"count":1,"notes":"15","description":"Daily Calls"},{"count":1,"notes":"5","description":"Daily Follow-up"},{"count":1,"notes":"0","description":"DM Enrollment"},{"count":1,"notes":"0","description":"Amazon Enrollment"}]'::jsonb,
  '',
  '2026-08-14T14:50:05.680277+00:00',
  '2026-08-14T14:50:05.553+00:00',
  false,
  '08:51:00',
  '19:00:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  '06175c4b-dc2a-4052-ac75-9fb925ff0df8',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-14',
  '[{"count":1,"notes":"CEMS reel, independence day reel","description":"Internal reel editing"},{"count":1,"notes":"Dm testimonials in progress","description":"Internal YouTube editing"},{"count":1,"notes":"Prashant sir shoot","description":"Shoot"}]'::jsonb,
  '',
  '2026-08-14T15:29:16.628387+00:00',
  '2026-08-14T15:29:16.501+00:00',
  false,
  '10:00:00',
  '20:30:00',
  NULL
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;


-- 4. Employee Attendance

INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b1129ee1-778e-43c1-b875-c965fb0b1ddd',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '83bed1d5-f7c6-44c1-b522-da60cd7661a8',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5144091a-8f23-48c4-96ee-889aac090b6a',
  '98fdccc3-9c13-4d3c-907d-ff437e4370a9',
  '2026-05-08',
  NULL,
  NULL,
  'leave',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e5a9bea7-ad02-4211-826a-e605098a6769',
  '98fdccc3-9c13-4d3c-907d-ff437e4370a9',
  '2026-05-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd3b3df3d-0a82-4d5b-8d75-6b6daa39728e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1a86aafa-ffc6-450d-82a8-a46578f8a94e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c7dec80f-a973-4342-94a4-992952f60327',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-16',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4abb2989-a9f9-4c68-adf5-c987ec11f6e8',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3d706852-5dea-4220-b335-0548f0b870a5',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '63e17045-dcff-4c22-aaf6-63aefac39f8f',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9b6db57b-d5ef-4eb2-b607-5c936ee50a33',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6acc1b25-7407-46f3-b3f8-72645f4f13e4',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '11941d3a-7916-458f-9e7d-631f29b446ca',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0a044643-28fc-4503-a406-ba3ac504ac98',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6d185a69-26f1-431d-b20d-a7c7d63825b7',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-17',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '144f62c7-8fe9-411b-bd9d-f547592dcfc2',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '55b01847-5741-41f0-8d62-72819fd95404',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '52c16e82-1e17-4caf-b9b3-6d334e954d70',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6d8f5d9c-7ab9-4bf9-9b8b-40c3d045c196',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a0eb580d-6818-45bc-9f4c-11f5e1b56bf2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '40b688e6-51a3-4857-9d52-dd1068173b70',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f6944bf3-0efb-4bf2-a419-d94a6a37253b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd1bb6ec2-c58e-4cae-88f1-71faf4baa870',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-27',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1d971714-40c3-4e39-bcb6-427406e9bdd3',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3e8e27bf-4f62-495d-8b9e-3e7ccd34ce49',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b95dc022-7079-431c-aaa3-a8537ee462f3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e7ee8c09-e3c2-4677-990b-46f9cdb49c6a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-18',
  NULL,
  NULL,
  'wfh',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '834c5e63-1ec9-4cc6-9ff0-fe8898f30c92',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-02',
  NULL,
  NULL,
  'leave_pending',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'adfaeb48-d5aa-404e-81fe-eaecf8005d9f',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4d38391d-95ce-4dd6-a9fc-e726a1107b89',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3f3f2314-eb35-4a48-8563-beaaf72f0dc1',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4861aff0-8eec-42fe-9a89-799e865eaeca',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6941375d-4674-4aec-a4b0-3599efb7767d',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd4f29ae8-cf62-4d62-b62f-59679ebaa992',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f37a7d02-03ff-49a3-944a-4242d25825d6',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c082724a-54ef-4a68-ba2e-6389326deb22',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4c716938-5e9d-426e-95e0-754603cef469',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '91494cce-d56f-42a3-b58f-742e1e7ff4d5',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '421a442b-e2c0-4e72-a7d8-9fb37d755025',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-20',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bcec9b4d-e8ab-44bc-9aac-60558236eaac',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4891e2f0-a2e4-4287-919c-25c54dbbb8fe',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'acb66d3c-4a24-4bb6-9158-ad016cff87e5',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5a6c2158-c328-4845-8fef-d86cdc5efe07',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6fc837dd-b113-48d9-9af4-0954f6615540',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bdd0a8a0-f59c-467f-b0c1-6e944794729d',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-21',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c19d8932-36f6-4d51-8cea-fc1f227688e5',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '911ac611-0ccd-4075-85e2-45ec61cd35f8',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '11ec320a-6c6f-43f4-bd22-9d63c846dd86',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd794638b-5651-4d55-8008-c1bdcbbc0bec',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2b48d775-9ece-4cc4-9003-24e4d8cdf62c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd8e6ba25-18be-4eab-b24c-acc83d70f5af',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '553806a8-a6c5-4b9e-b5c3-086e1a8d5e73',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5464756a-0053-4d17-9d9e-ebed7e81ec92',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-05-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '085732ec-bd42-41c2-92fe-f7f3a250150b',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1e89a8f4-0b4c-4e87-9fe9-71736148c3d8',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c89c3c60-9e25-4ab0-9901-52cbaefbd9c3',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9379f184-4a14-4bdb-b7dd-d49ee62f9507',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0f1a873c-ce95-4e14-abda-25e287399dd8',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dfac422a-3bbf-4f77-b8c3-0e8321231e78',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd7318ea9-13cb-4ea3-804a-7df8fca5980d',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '690985e0-7320-4e36-8b0c-2849f45b2222',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '418c56b8-5e32-422c-8caf-a567fadc7a5c',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7361aef9-a72f-4637-aea9-edc7e49475c7',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9a9b4401-c776-4e3e-a2fb-50c9ceb3e663',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd1d4844f-1e40-491c-a7e3-f4098041f17f',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8d196737-c976-41d2-a084-b5ea3efa4976',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'affacbb9-ecc4-47c4-8a84-8225c21a1f35',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6e62f7d6-d62e-4154-9573-d508a40864c4',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e0a5855f-bac5-4aab-b0b7-eb2754ce94cd',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd86ac5b7-2c9c-4336-be38-caa4b48f35df',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9d3a9d83-e3e2-4844-975e-130c7e038163',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'be6a2a8e-b2ec-4175-adaf-4407a677f5de',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '28a27f64-10be-4166-b21e-d27e13b6f94f',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0d01a604-1d65-4fa0-a299-72f7428e4b30',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-28',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e25f2b84-29cc-470c-8eab-2c8bd69157d9',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'da7c001c-3789-4f46-97df-ff38e75ef37c',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5b645ed1-d57e-4a04-b2d4-e63b4e178033',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5b85200b-c8ea-43df-8ab1-c9dc2691df41',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a902a467-838e-4170-9ab0-4da253271ed3',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-05-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0ced2685-1098-49a3-ab00-162514bc7fcc',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-29',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '62de6a75-46cc-4e40-b178-c761fb2a8b19',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8769a188-5678-47d9-8f44-f5f2ee5b3d6c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-05-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'cfdaff47-4a22-43d4-bbf9-341367ae23b3',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-05-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ed0f5828-8c9b-43e0-8223-a17df3e71153',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-05-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '90e15533-3c10-4c42-89ee-2e8dc1ef9185',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-05-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f0979b6d-b812-4bfe-a1f4-d83a80a75ae0',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-05-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1d163f70-2a47-4ab8-9016-e891f91ccf9e',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-05-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2a2db1d6-02d0-4cda-854b-67ca06f6c781',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0ca6e973-7eee-4931-9055-a5185712e4fc',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '984a1f72-c431-4244-bb5f-a16b8d50cc98',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '50838597-0ca7-4332-b39e-4dd705d4effd',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7bd76cce-1cfb-452a-a855-279ffa3ae6a9',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-01',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2b8fa954-8f07-44c3-a703-f9c05e704e4a',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '922c6886-2f1f-4f9b-901a-8379ef89ec45',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8821ba87-9712-4636-9269-7436e35591f2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1cc35882-98c2-4e6c-bf5f-2baf9e854dc5',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a3580561-6908-4263-a060-6165e45534cb',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '139354e6-c2f6-4984-aea6-990cad58f8c0',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3e2c8392-3987-403b-9813-21e008a3443d',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fc70f008-bf55-43f3-bde2-5dd3f40e8950',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '01de38dc-30ee-4afa-9dd8-b917c7880bd2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '67923398-7a1d-4b73-91b7-1075a2700f21',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '151aa503-c513-4b44-b560-fd9969105dda',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c9f54979-c5cd-41e3-b6a3-1c6c4d252442',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4e46fcbd-1c63-4fb2-9f48-6951ff10af0a',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '34c1e870-93ca-47e1-90a7-b5ec8d9b9f5d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9f2ee634-1024-40e3-90af-8127855f9b43',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '701934d4-6536-4321-9fb4-8e9b470f259c',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5887c96f-eeff-487e-919f-0fad10549113',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '107d6f36-65e3-4269-b2c2-2bcc528a7d68',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dd1e067d-f6a2-4607-ac04-35d6b97411f3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c4301a83-6315-4595-9451-57b68adfd9bf',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b292649b-0659-474e-8546-ae897c243406',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a3ef18bc-4c6d-42a4-a312-95b235cb2e0a',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f259ad09-81ae-4882-b589-7e05d944dc8f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '48845355-e10d-476c-8324-8cd6d3639555',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e6ae20c7-6f5d-478c-b58d-0889fe1235fa',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'aa915b19-ad4c-4594-9a92-0d254ff98526',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c8c2fd0f-6fb5-4628-b747-3fbff4b0bf30',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b09c6d0d-a723-466c-9dac-6b52ce5a19e5',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4a022a64-fef4-4f38-9c91-632ac3cfe773',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f942662c-b4e0-4e3a-8737-1c5113e49676',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b3c5d6c4-3277-4ae2-8dc4-7980524a6b02',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0702bb89-d1bc-4211-9dfb-60e61b826533',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1247e8c7-8e05-494e-b86d-c79adb79dd27',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4bc1363b-c659-4c56-bbb4-f678c9693b4f',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fa6df069-56a7-4b7a-bddb-52cc0d982e76',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd3de0d30-aae4-4ec5-b24c-b3e6856951dc',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-08',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '03e8dd33-99a3-403c-a1b8-e0430ddab0f1',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0c04ff66-a0f0-48a2-936f-c8a7ff04387f',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f0665181-0334-4860-bce0-1d7082e959b2',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '981b2e6c-da8a-451f-9266-aa6cdce35c39',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bbe3d331-d74c-4bed-b0ae-9c2f6c9c8dad',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3b5251d0-0674-490e-806e-e5f1fd981d88',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bf4eaa7b-b830-4534-9abe-518840c0a45c',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-09',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1095eef5-d440-40ae-b328-5032148c1100',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5f8c6da7-3059-4d26-8e93-25c932fa9855',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9bcd766b-55f7-420b-8320-8cf5751948f7',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-09',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '702e12b3-8f92-4691-ae0f-f612d30e6539',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2c81765a-112c-4aa1-853d-17a47489fb8b',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-10',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1e311718-16da-449b-8969-5937e0eaf0df',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5c27ea45-fadf-431f-ad8e-caead241eb40',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c91dbe93-9e0b-4266-8eef-78905c57273c',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '48611fa4-d651-410d-b7a2-4fb78725de3f',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3b55a6c5-cf47-475e-99e8-b9dabf2c2782',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '31999ac0-2e04-4ef8-9b57-ab7c143dfccf',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd252aff5-a487-4025-aa02-fab9d9901ca4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '470e5264-3637-42e4-a41e-3ef95a42b5a3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd0f1513c-61d2-4fcf-8935-1eb7402a03fc',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a8788935-18cd-47b2-bf81-80ebbb6d1d29',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b343f411-b402-46e0-bf9e-4f5cc80545d0',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '74e32093-bfd6-49f9-8967-0d280b7b7eda',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6845ba84-75e1-4259-b7aa-051e7e9ea087',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '52cb4daa-78b6-4453-ba38-95774d99ec31',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'adec1916-431f-4ec4-988d-6fab1115ee52',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'cab3df0f-4eee-4e66-be75-ea722f9bb225',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f25e49ea-e871-4021-b558-9e59017becad',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '48786d7b-907a-4134-acb9-6eda37001cda',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bed9d697-4c64-4691-b423-bb604a651ff3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'eb3bf696-5771-4031-b06a-02d0a36da5c6',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9afa777f-beb3-4afe-b908-30163b6c5f37',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a0833876-6a9a-43ba-9e99-e4d463785246',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bb30aa4a-359a-4963-8d2a-05800e5892e2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '615851fe-8879-4bd4-a481-844e8509bc92',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fd0f30ab-8910-4dfb-a1e6-a97fc369bdc4',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '18d8bded-48b9-490c-9a41-5288a82e3f98',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5b1099ae-3da8-4862-91ad-59595c7a773f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a12243c6-f4e5-4a9b-9583-b285b9d761f3',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-15',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fa290ed9-4dc1-40c5-9aed-9cef7499f8e3',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f7c1b9bd-32d2-4ecc-b3b3-f0b5d2c2973e',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '760803ee-30f9-4705-8687-043618d4e338',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '683830e7-7ccb-4f94-8f11-cae666bbce68',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd90739a0-6f06-45b6-9f65-8333ce355cd9',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '403f97ee-60c4-43f3-ba6f-351bac4e1acd',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '05fea443-6b33-4c4e-9048-01e575e86cea',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7b7967bd-cf9f-4729-8618-84236466ced2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd8d85051-cea4-4940-ad00-6035036f9d9f',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '54d25885-f253-49ec-89d0-92adb1b8f339',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '95383212-d4c2-411b-832c-ac6a81bc4f57',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ad6f2983-04cf-4a48-b517-86447218cd09',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4ee0c72c-35f6-4a28-adbc-f7b247d7a33b',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1ebba253-b85f-43d0-ae16-6e0b701f5ccf',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1e7f952e-f130-495c-b5f4-a58e511be729',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bd3a8ea2-a382-4002-8f24-667c6a597ee8',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd7024574-7e3c-4543-a61f-1475124b0d10',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2ad91b82-b6a3-439d-9adf-f2f74d1f47f0',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7a9d0dc4-4d28-4628-978e-bbe522493404',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1f7324e9-dc95-46b1-851a-d7ef65aec356',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'af636748-9c6d-4a74-b6f7-0a46dfdc6a55',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-18',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0717a88b-f49f-4b34-983e-6a6c7bca4dee',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '54a38746-dce3-4560-9e61-a7fa75495fe5',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '67f2eccc-e557-4963-94cb-226520f5c020',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '71cc016a-0c06-4042-a14f-c20717840076',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6fae49f0-d8f1-485f-8d35-3e3ed4472fec',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3140d2cb-e259-4547-bad4-6dd6b4c4dca3',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '56d303d3-cef5-497a-8ed8-3063b0150c7f',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-19',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a665465b-f669-4e0d-ae5e-344313f2c1cf',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'be42bd26-5465-4843-8388-e7f82748079d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '793ca9fc-f6de-4e4d-a02b-d6a82fc8922b',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '48171910-14e5-4962-af65-c42dae7f8475',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-19',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7f6b9383-5f00-4aa4-8d9f-7d36766bb259',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd9a8a388-6808-4a6c-a9c2-3207d66a3124',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-20',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6c86d2a8-bba8-473b-8efc-fa19f51d0870',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '05810ce6-db65-40e3-a370-646d4f1a6b19',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3fe7c292-d7cc-4899-985d-63f08ae2452b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '33a799be-c782-44ca-8055-3dd680055c95',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f61a6d69-b188-47c2-87ac-fc58264fe8c4',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '71642aaf-458e-4e17-a15d-b84596664e27',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-22',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0f474c6f-9663-4955-8dd1-09c06758dd2a',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '941fc1ab-ed66-4bcf-8e23-d850580204ce',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dd5efba7-a2a1-4c96-940b-8989d88da592',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e1ed7ba9-a188-4202-bd5a-f83c89447ba2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c6edb44e-c4a2-416f-bedf-d182d93ee069',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a0f5a774-7658-43d7-897b-2cad2907376b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '23c830d4-58c0-466f-91ab-f6764ac0ca14',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'aedc2fec-bfbd-4aa2-b029-a83b39ae51ba',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6f0be370-65af-46b7-90ea-8ba765ccc2d2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f1131f0c-2ad8-4dd7-b51d-b17b04667477',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-24',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6370faa1-857d-4c40-8275-10deb374dff5',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5e48634d-e78e-459c-86bb-cbacdb6d0ce8',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c0cd94ba-342c-473a-815e-5433baba6c4b',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '772fa416-063a-4dd3-a3e3-1af2044e6af7',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e6517c50-18ba-497f-9546-cf1c270b6343',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7aeb051b-0b3a-416d-adab-74a32758d6eb',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ce1d574d-5f5b-4cae-9975-94a9dfc17924',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '58287639-35f9-4cd7-a378-2facd45eee7f',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '82005882-9b50-4581-95bc-7af0d2c313dd',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4f13ad96-b7b2-467b-96a0-fe4671efc48b',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '10f5bdb8-6478-4d77-a122-11eb27e85173',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f3dd792a-a11a-451f-bb33-661dc464b591',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f734f137-832d-40df-81e4-d3b8f91332f6',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '77cc0879-898a-4a8f-b67a-0cf4ebd0d328',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3dd89e0a-7bd6-4648-babe-016b90e51863',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-26',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7226717d-ecd6-4a6a-98c6-e6316dbe4f0e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a2267b33-9e1d-49ec-ae70-d328ac978ddf',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0000ddee-689e-478f-a220-20a8de138b21',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4143a8ec-0bd5-415a-9e4b-4d01adefc82e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-27',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'babaaa3f-17d4-46f6-8c0f-b427651cf397',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a5a3ee73-cf7c-435a-87be-e1059f5a302c',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b528b631-ffc8-4c06-a508-c1e34726b836',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-06-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'cf7d968a-0f6f-4021-895a-ee3eb338bdda',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-30',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2b9aeaae-238e-4e35-8fc4-9e6dd34e2a42',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'aae15595-1756-47ad-85d0-e271b03a2dc8',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f8c1abd9-0c2d-42fc-b313-c1151d543d40',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '865d52f4-d77e-4e52-acce-c41c3bfc3486',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e6062949-833b-4794-b92a-e80b60935226',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '40a2bad8-a79d-4b1f-8f36-9939dc1f2c7f',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3395ef43-29b7-48db-89d3-aa261ff79913',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7113783b-3c10-4a58-8bc9-4ee625da9032',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-06-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bfcc3c60-8e81-4bb1-b40c-f08cd4d91d85',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-06-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '56b442db-c52d-484b-9557-1a153e98dc96',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-06-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '89c815e3-3f4c-471a-86d9-53599f623f18',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '28da1c6d-859c-41a2-bdc8-803ed64f7fe6',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-01',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '80f516d5-3df8-49ec-8352-ba4f5be43ca5',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3643b61f-402d-423e-b15a-91a2dba313b2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c1f3ff80-a854-48b1-b18b-4e31b129af08',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6e5de7e7-1776-49fd-84d4-a06a365a92bf',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2cdd7ad6-affd-4f20-9352-1c34cee04749',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ff358d4b-a27e-4691-b505-5b096781d083',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4ca4d1f4-6613-4d65-80ce-718c2ee95663',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'efabfb08-ba85-416d-95b0-b2afcb113dcb',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2a45f0fd-35f7-413e-916b-69f6aea50b7c',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7ea80afc-d331-4ed3-95d1-bb2ea712fbc4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '190dc79c-5eca-456b-ac99-09b9bd515b61',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '603908b8-62d9-409d-8e1a-52a5499146ef',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '935941f8-ba87-4fbd-99a4-56b601e41daf',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bec5e242-b45a-439b-bd5c-fe9ec81c3b36',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ee5c3105-6e66-409e-991f-1574a3b91874',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dfd7eb57-bfae-4c95-8f3f-8003b8103a14',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '920a246b-e077-4cb8-885d-62a3dbcccad1',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4e8111d6-867b-42d5-b25b-21d39f40181e',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8f3b8046-ffae-4c38-91b4-0147d3fcf73b',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '61c3a737-2c4d-4746-8a17-a1e011ed4064',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '622b23e4-af12-4e0a-a810-632d6959044c',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6fec8b8a-e1fb-4a47-936c-9cae7f1a8a94',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6779e793-78ab-4d53-ae64-8ede473666a9',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '441235d2-c68f-474d-a7fc-764edc6c3bb4',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ee2aba55-df19-429a-bb19-461154faff08',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-07',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '721bb401-21cf-4478-b22e-22fd218295a6',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f73b0c2a-61c7-4eab-af49-4b0936ac3c01',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '09ca856c-3be4-4078-bc95-cd29deb2d697',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9062bf8d-7394-48d4-ba69-395df2b4a198',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'cd933099-c60f-43f1-ae51-2fbacdffc246',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dfe3999c-31da-4f32-89da-4e9e85015cd7',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-08',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c4430c54-4468-4c8c-b24e-a372a48805d4',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8ff5b7bb-677f-41ad-89e8-4c3468be38a1',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4c2ddc3a-ebf2-4858-9084-20b867579225',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2d8312f4-41b8-48e6-af9c-f653fa38e46f',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7311d6c5-c12d-41b3-9177-70c6500d6fab',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8d79aba7-fd43-4188-a3f3-17c9ed637118',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dec028e8-8f11-474f-8690-b5e5a9844bef',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3b3ee587-0130-4ed8-b4fa-e5151b2aecd7',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6ae0451a-7123-4d5f-a806-70415ca8ddfe',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f8e2a26e-c4d0-44b7-9587-8d2ceee600d3',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-09',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f4722393-0a30-469a-a71d-92d3c4062a89',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '14412624-94d2-4f83-b610-8eda340bf511',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '14d38ae5-94cc-49ea-8cc4-795a94086f00',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-10',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '33a94e75-27e1-429c-a6f9-72ee5456c21d',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a48679e0-bc15-48a7-8958-51fc253ae7d9',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8f2be675-724b-4a6f-8351-90c3c890da18',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b14ae80d-0c96-4725-a37c-3a628d93b504',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '202d3daf-dfa6-4caf-aeb4-28b7845f5518',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '37db92c9-8962-4bc5-8dbb-b7aa096c4b19',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fa8414a2-a0d6-46fd-b4e6-1bab98c71c7e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-11',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2e28fc73-f62c-4838-aa7f-721b4a1902b3',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3cd9ca21-3599-4344-a1be-31f101676554',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e41345aa-75ea-46ef-b0ac-1ff301f34a67',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8f76ada7-cdb7-41fd-86da-cde69de9c0f0',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7b2db697-54dc-4a25-801d-3906238df457',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bfe8a391-8a71-40db-ad7e-e7580c83ce3d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '247e3243-fc98-4be5-bcb0-22b9bbf200fd',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-13',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f42bf9ee-0993-4828-9767-fc7c3f39b6a1',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c2f18f96-53f1-429b-b8af-9bf6d489aaab',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '540ddee1-d9b5-49ec-9dba-0db642c6bf80',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '450fa143-528e-4d20-a1b3-f1f392e19ccd',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'cd9a7d0e-7a85-4575-98fd-e44efd790516',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '018be843-1545-4e8e-b693-fea43c897158',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b67ec566-77fd-46e0-a909-bf2bf0e63f0f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dfdb9e28-4702-4ad9-ac71-267cabbe651d',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dcbfd7cb-e373-4748-94f4-b5b70cca3060',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1e9f23ed-50c0-4750-a141-03b0e928074f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3ec7be12-6894-44e0-a162-31d42668401f',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2ff06c64-5e17-4b72-bbb2-7cca5efee7e8',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c40b547f-d941-4882-b52d-7019d82a9773',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-15',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5af4103f-ac30-4775-be51-1648f4adcdb0',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e3d2ad8b-9c97-4955-aeaf-4965eded4c17',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b0cc2092-e654-443e-8a75-c2ace5b4825b',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7efcb9e4-4291-4484-a726-c4076e5c49de',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '92955c6a-c922-4203-a7b3-0caa8ff0764a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3fa1fa80-8a93-47e3-ae05-99315fe28798',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '24be00ff-d676-4dbf-bdc3-9fc6a38f3983',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-16',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5b1fd83d-1e8e-41e8-8688-f2e9e13d8045',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd4d20ca7-3df6-41be-996a-43e62c4754f7',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-17',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '32c85d4d-1951-46e2-965c-a77dbf0f95f0',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9fb7e327-af6d-4af6-9ae3-4c4ab462615a',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-17',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '638d6525-c9b8-4868-b428-f22325d086f2',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-18',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fc35a4fe-59b2-49b7-82d1-a6b35f019de7',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '78a169e3-5a30-497d-b063-9d3b9d9348e1',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dbc544ad-bf57-4d02-852d-deac6ff23ec4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '249c911a-6799-4fa2-b671-6d1f4d1230a0',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7469f435-307b-4caf-8e0c-ce4b52b616bc',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ff04e65b-ac58-4723-a400-1fea6367372a',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'eb32bad3-6fb0-4e48-80f6-1c60c296c9ac',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-20',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a2647fa2-10c4-4505-83e5-8372bef481e4',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3c64ecef-0b62-486a-8e2f-8618b2d522ca',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '13aa6149-68fb-41ce-8802-661e2589d182',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-20',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '40a63488-df6c-47b0-9594-df18be1517b5',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '963a7607-e418-40a9-b9d8-6e0289025922',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b4aac6d8-a01c-4d71-b26e-547c01d86e7f',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-21',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e5ff0cd9-251c-41d3-a5d2-52cebf06bea8',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-21',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bd8e0c32-739d-42ae-99a0-4920b9725bbf',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '11d4863b-6d04-4cd6-8abb-0e69fa467f6d',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-22',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0d8de5e9-e60d-4e18-b430-9cbcab41141f',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '44efcce9-6e9d-4299-95a5-47c611a39a38',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '79351838-84c2-4ac9-9125-75e22a0417b2',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '31105bbd-e33a-4f5a-9474-aa6601fa579a',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-22',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2f5e4a4c-6910-4ad9-9b33-87a4a97e6f4c',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2fd71c93-53d7-4f78-83b7-838ef50bdb64',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fa3031e7-bd81-4027-96bb-0066b2816f8f',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9e9070cb-dccc-407a-a986-0975c1747c40',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ebdf4b84-cc6f-45d0-be10-22d1fb4ab5cc',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6f2eb208-7b86-4559-97fc-92f0e768372e',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '68c05612-29ab-47be-a041-614e662e27be',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '530ebc36-e666-49cf-9934-12525070bf56',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-02',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6b7ba8c2-00e2-486a-a7d4-1c445145b118',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '83c348b1-3893-45c1-9360-fa0dfb97c7a4',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-18',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '213c9548-65c0-4415-9f18-b4df377c5685',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-23',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2b1b29cc-c87a-4ce0-90d6-cfdb8b4ae383',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a569429b-b067-4e97-8ddf-381479b7722c',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9df018ff-c468-4290-b225-4e4e02e90be3',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-24',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '18ad843b-3666-4f58-8849-11fc47605be4',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'fbbebde7-cf5a-4fec-8df1-e88384f64891',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5cae193d-58dc-438d-bf6b-0eacc2091c60',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-24',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '37d7f0c6-10ed-4d40-9f73-e564af4c3840',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '70b6571d-398e-4e7d-9e0d-f5ef6c750cc5',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '81c1bb77-142b-4ed1-9956-4040db923183',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c13ed276-744a-4ae6-aee8-ff76b8125a5b',
  '6611ecf1-f68a-4510-9cee-bdcfc16db21c',
  '2026-07-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '20861fd5-c867-48e0-97e5-5f381f9e81e4',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '62c6e715-43bb-40e0-8fce-85afd9a9455e',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-27',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'cd57b334-9302-4259-861f-44e6837948e3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c455e87b-a45a-4cfa-9ea2-5149d5b16fe4',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a3c42a80-2adc-452b-bad0-7ff4d6b32356',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-27',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2625f459-8901-449b-8770-7a8cad6016d2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2943fcd7-e133-4eb1-bf0f-ea460fe55298',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5c6aa46b-3e49-46d3-b3b7-35cb8c3131e3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '29cb7b8b-7c76-475c-bdea-9f2c9374337d',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '361257bc-3339-4133-9ae1-125748388543',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2e3db419-70fe-4e85-abc0-113db5ecc1ab',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-28',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7840fd18-215a-4206-a2da-0ae7f0c99497',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e7782e8e-c1c8-4384-8c89-a47bce83bf88',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '689cb7a8-c25f-4bf0-b345-31f78d44c71b',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-29',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '279e8882-0629-4b9e-9f25-90568b61c290',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-29',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '923280b7-4046-4b60-9b63-cc4e841bdd86',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8649f50b-c431-4631-b0d9-1d315a4aa6bc',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '01588a02-a28b-4bdf-b1a6-ef36466b3371',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3c170906-b171-400e-a522-e1810b3212b4',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9200016b-4707-4d40-9525-cbb4f043dfc3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0aa6cdc2-b258-422d-bd59-7f32fc5d35cc',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '14fde437-b8e4-4eb8-9df8-c8288d40659c',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-30',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '189fea39-c4f2-4f65-a2f5-d9f04379b367',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-07-31',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4869a4c8-33ef-4981-9a19-103ef4b0c299',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-07-31',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9a7c596f-aa39-437c-a41e-b98c92d655a5',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-07-31',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '81537585-a7fa-409c-84c0-4457bd0fff9c',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-31',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e537af77-29ca-40b8-abd7-6ab936d194c6',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-07-31',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '489122f4-0a9a-45ae-ad82-b4d1079cde4a',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-07-31',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '81914f77-51ab-4118-948c-4bde8a85584f',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-07-31',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'efb51511-8034-4967-bdbc-2274874013d5',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'f20b6722-003f-4f4a-8573-ed098b6f422e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '90d0c5cd-1017-4de6-a94d-4238c4162dd2',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-25',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '66a1e6f4-0e88-4837-ac57-16d59e6e16ec',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-07-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '95533f94-cc31-4e96-a2f1-0627cfd92b7a',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-01',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '14b76c47-acbf-40ed-815b-af4fcddcec30',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8bf516ed-dc8c-433f-af1f-1bcd7ef7bc93',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-01',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '27104ae8-ec79-4790-81c5-c5a6c3f922e2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ff6dd5ee-e786-49ec-a4d6-dbe56cb769f6',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9319d989-63b1-4c75-ba17-a1c4ffbdeda1',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '77027838-a873-41a9-998d-fb2ea5c5ee5e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '412b7112-a856-4865-944a-0a85d28dc4b2',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '23946bcb-b746-47ba-b720-ea01c48bc1fa',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '490c0725-f456-4abb-b9f8-43a24549abbd',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-03',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '70fe446e-d957-45ed-bbcd-e114f45e7234',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5c2c7af4-6207-4301-8c38-236ed40c7507',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd59ca2e8-ca61-43d0-9408-7b85bef770a0',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '5817f4ee-6fc0-4f00-832e-743f920d7c26',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8dbb4677-7b8b-4d2d-9db9-5c5d25092aa7',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-04',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a669fab2-8879-45df-9862-b020c333703e',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '1c9bed5a-323c-4bc7-9384-c607b7e0ee15',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-05',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4e6388ce-0e35-4a30-9737-1b9427df3822',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '26964c6e-35d6-4f62-a89e-ccd5ea2c719d',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-05',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3515a377-8c8b-468c-a86f-1fb07d0d52ac',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ac7e1a53-16ea-4e59-b138-1e2141962a43',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7354eb84-68d1-4371-919a-97d7f40381e9',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '8d5304dc-914a-4af6-9575-b3845e9ac1d4',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c2c946f8-ab38-4b58-bf9f-fa7a30aadcbb',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-06',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'faedd12f-73c1-49df-8521-f6c345ff4966',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7a401bc1-76bb-47b5-86f4-249864352e66',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ffcaed97-6785-4d4a-9277-163cb79e992f',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '4ed7a15a-6910-4043-af88-23efbcb05251',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '912cd7e7-7f2b-4274-9b14-25a9a7586616',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-07',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3e103e21-ee95-4afd-940e-d401dfb3b206',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '572876d1-2ebc-454c-a6a4-2d0c74bf81b6',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c3af213b-42b4-41b4-a519-41e6b00e4433',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '798a26b8-9349-407a-b28c-a5b6090ec2a3',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-08',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'dea0b902-8781-444f-9dca-00c7a61120e2',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c4d3c44c-c052-46bb-a801-660dc5ea4a09',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '6d401330-19db-4f6a-9c25-d244d12d183b',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '2efb1d4a-9322-4f56-a1e4-fa77bc59b341',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-10',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'a6c944c8-e1c5-4a0f-aa57-84bbb23f1755',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c2d39496-782d-4dda-9d95-66fd933d5d54',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3f3804ca-038c-4a65-8e86-a14e394e898b',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-11',
  NULL,
  NULL,
  'half_day',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'bc130a0f-06d3-46aa-85e1-a78aeea8c970',
  '123eb2ba-3fc1-4915-9543-a3a414f86922',
  '2026-08-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '89896684-73f7-4b33-80d3-a545a0ef4682',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '220923ed-62ed-49f4-8a8e-04fae7a7ebd3',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-11',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '0e4bdf83-f232-4081-bc23-9b230375b42a',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '7ed49991-46d0-448b-975f-758ac26d70b5',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'ef583aa5-df4b-42e9-9409-ca43f2fb8bef',
  '987b014c-91f2-4d3c-8e01-cacfe3dcbec6',
  '2026-08-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '76f7e810-7b00-4886-9679-10661ace57d6',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '3e2d5872-3b4e-42af-a83a-04ed144df116',
  '46f7682d-e097-4e9e-b5b9-a8f44146f526',
  '2026-08-12',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '352a7d4e-9dde-4888-89b0-bc5a634acda6',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'c535fdcf-a020-484d-acd2-1e6fd24b1a70',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-13',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'b6501e46-0b9d-4758-8b02-59f9f4920d5b',
  'b98cf0b1-a5d0-4009-a756-49b466acdafd',
  '2026-08-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'd8e2d7b1-adb9-4f0c-a8fa-4e2b197fd2e4',
  '62034cb3-c783-4d4b-b1d4-289f05805547',
  '2026-08-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  '9f8742c0-f45c-4a62-8610-8b5002f29ee9',
  '7dc13a1e-c8ac-4bd3-a05a-348e4e49097c',
  '2026-08-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;


INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  'e1a76311-6ebd-4b63-8c0a-9e9d701ea716',
  '02811cbd-7049-4fdd-9945-e373a94168ba',
  '2026-08-14',
  NULL,
  NULL,
  'present',
  NULL
)
ON CONFLICT (employee_id, date) DO NOTHING;
