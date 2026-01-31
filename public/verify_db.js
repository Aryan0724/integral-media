
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://kboidwzedoztfaxvptlo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2lkd3plZG96dGZheHZwdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODg4MzIsImV4cCI6MjA4NTI2NDgzMn0.ez_nc1BIoyO548JvmfdAUsaOn4fVTW9CCP6zqhtdnqg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDB() {
    console.log("Checking DB connection...");
    const { data, error } = await supabase.from('portfolio_items').select('*');

    if (error) {
        console.error("DB Error:", error.message);
        return;
    }

    console.log(`Found ${data.length} items in portfolio_items.`);

    if (data.length === 0) {
        console.log("Table is empty. Creating a test item...");
        const { error: insertError } = await supabase.from('portfolio_items').insert({
            title: "Test Project verified",
            slug: "test-project-verified",
            category: "Business",
            tier: "Ultra",
            description: "This is a verify project created by the agent.",
            status: "published",
            tech_stack: ["Node", "Supabase"],
            is_featured: true
        });

        if (insertError) console.error("Insert Error:", insertError.message);
        else console.log("Test item created! You should see it now.");
    } else {
        console.log("Items found:", data.map(d => `${d.title} (${d.status})`));
    }
}

checkDB();
