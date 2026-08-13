-- Step 1: Run SETUP-ATTENDANCE.sql first (create attendance table)
-- Step 2: Add biometric_id column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS biometric_id TEXT;

-- Step 3: Map Krish Arvind Tiwari (biometric machine User ID = 3) to their portal account
UPDATE profiles 
SET biometric_id = '3' 
WHERE email = 'krish.rushipandit@gmail.com';

-- Step 4: Verify the mapping was saved
SELECT full_name, email, biometric_id FROM profiles WHERE biometric_id IS NOT NULL;
