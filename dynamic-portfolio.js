
// Wait for Supabase to load
async function initPortfolio() {
    console.log('Initializing Portfolio Loader...');

    if (typeof supabase === 'undefined') {
        console.error('Supabase client not loaded from CDN.');
        return;
    }

    // Initialize Client
    // Using the global 'supabase' object provided by the CDN
    const { createClient } = supabase;

    const SUPABASE_URL = 'https://kboidwzedoztfaxvptlo.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2lkd3plZG96dGZheHZwdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODg4MzIsImV4cCI6MjA4NTI2NDgzMn0.ez_nc1BIoyO548JvmfdAUsaOn4fVTW9CCP6zqhtdnqg';

    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    try {
        // Fetch Data
        console.log('Fetching items...');
        const { data: items, error } = await client
            .from('portfolio_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase Error:', error);
            return;
        }

        console.log('Items fetched:', items ? items.length : 0, items);

        if (!items || items.length === 0) {
            console.warn('No items found in database.');
            // We do NOT return here, so that if DB is empty we at least clear the loader or static content 
            // if we wanted to show an "empty" state. 
            // But for now let's just leave static content if fetch is empty? 
            // No, user specifically wants dynamic content. If empty, show empty.
            if (items && items.length === 0) {
                // Maybe show a message?
                // document.querySelector('.portfolio-categories').innerHTML = '<div style="text-align:center; padding: 50px;">No published projects yet. Check back soon.</div>';
                return;
            }
        }

        renderPortfolio(items);

    } catch (e) {
        console.error('Crash in portfolio loader:', e);
    }
}

function renderPortfolio(items) {
    const container = document.querySelector('.portfolio-categories');
    if (!container) {
        console.error('Container .portfolio-categories not found in DOM');
        return;
    }

    // Group items by Category
    const grouped = items.reduce((acc, item) => {
        const cat = (item.category || 'Uncategorized').toUpperCase();
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    // Clear existing content
    container.innerHTML = '';

    // Define Order
    const categoryOrder = ['BUSINESS', 'FOOD & RESTAURANT', 'EDUCATION', 'MISCELLANEOUS'];
    const allCategories = [...new Set([...categoryOrder, ...Object.keys(grouped)])];

    let catIndex = 1;

    allCategories.forEach(category => {
        const catItems = grouped[category];
        if (!catItems || catItems.length === 0) return;

        // Create Section
        const section = document.createElement('section');
        section.className = 'category-section';

        const num = catIndex < 10 ? `0${catIndex}` : catIndex;
        section.innerHTML = `
            <div class="category-header">
                <h2>${num} / ${category}</h2>
                <div class="line-separator"></div>
            </div>
            <div class="category-grid"></div>
        `;

        const grid = section.querySelector('.category-grid');

        // Render Items
        catItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.live_url || '#';
            link.target = '_blank';
            link.className = 'work-grid-item';

            // Clean up tier
            const tierStr = (item.tier || '').toLowerCase();
            let tierClass = '';
            if (tierStr.includes('easy') || tierStr.includes('start')) tierClass = 'easy';
            if (tierStr.includes('medium') || tierStr.includes('pro')) tierClass = 'medium';
            if (tierStr.includes('ultra') || tierStr.includes('max')) tierClass = 'ultra';

            const tierLabel = item.tier ? item.tier.split('/')[0].toUpperCase().trim() : 'PROJECT';

            // Image Fallback Logic
            let imgSrc = item.thumbnail_url;
            if (!imgSrc || imgSrc.includes('placeholder')) {
                const catLower = item.category ? item.category.toLowerCase() : '';
                if (catLower.includes('food')) imgSrc = 'assets/food_ultra.png';
                else if (catLower.includes('education')) imgSrc = 'assets/education_ultra.png';
                else if (catLower.includes('business')) imgSrc = 'assets/business_ultra.png';
                else if (catLower.includes('misc')) imgSrc = 'assets/p5.png';
                else imgSrc = 'assets/education_ultra.png'; // Ultimate fallback
            }

            link.innerHTML = `
                <div class="work-thumb">
                    <img src="${imgSrc}" class="site-img" alt="${item.title}" onerror="this.src='assets/education_ultra.png'">
                    <div class="tier-badge ${tierClass}">${tierLabel}</div>
                    <div class="work-overlay"></div>
                </div>
                <div class="work-meta">
                    <h3>${(item.title || 'Untitled').toUpperCase()}</h3>
                    <p>${item.tech_stack ? item.tech_stack.join(' / ').toUpperCase() : 'WEB DEVELOPMENT'}</p>
                    <span class="tier-desc">${item.description || ''}</span>
                </div>
            `;
            grid.appendChild(link);
        });

        container.appendChild(section);
        catIndex++;
    });

    // Refresh ScrollTrigger if present
    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            console.log('Refreshing ScrollTrigger');
            ScrollTrigger.refresh();
        }
    }, 500);
}

// Ensure load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
