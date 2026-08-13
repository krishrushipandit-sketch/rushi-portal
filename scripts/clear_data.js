const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnv = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseKey) {
  console.error('Could not find Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function wipe() {
  const tables = [
    'notifications',
    'task_reminder_log',
    'tasks',
    'client_progress_log',
    'daily_reports',
    'employee_points',
    'sales',
    'leads'
  ];

  console.log('Starting DB wipe...');
  for (const table of tables) {
    try {
      console.log(`Clearing ${table}...`);
      // Delete rows by passing an always-true condition using neq
      const { data, error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Assuming UUID. Will fail on int
      
      const { data: d2, error: err2 } = await supabase
        .from(table)
        .delete()
        .not('id', 'is', null);

      if (error && err2) {
        console.error(`Error clearing ${table}:`, error.message, err2.message);
      } else {
        console.log(`✅ Cleared ${table}`);
      }
    } catch (e) {
      console.error(`Exception on ${table}:`, e);
    }
  }
  console.log('Wipe complete!');
}

wipe();
