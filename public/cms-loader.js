
// CMS Loader for Static Site
// Connects to Supabase and fetches content for the current page

(function () {
    const SUPABASE_URL = 'https://kboidwzedoztfaxvptlo.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2lkd3plZG96dGZheHZwdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODg4MzIsImV4cCI6MjA4NTI2NDgzMn0.ez_nc1BIoyO548JvmfdAUsaOn4fVTW9CCP6zqhtdnqg';

    // Determine current page slug
    let slug = window.location.pathname.split('/').pop().replace('.html', '');
    if (!slug || slug === 'index' || slug === '') slug = 'home';

    console.log(`[CMS] Initializing for page: ${slug}`);

    async function loadContent() {
        if (typeof supabase === 'undefined') {
            // Wait for CDN
            setTimeout(loadContent, 100);
            return;
        }

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        try {
            // 1. Fetch Page ID
            const { data: page, error: pageError } = await client
                .from('pages')
                .select('id, title, meta_title, meta_description')
                .eq('slug', slug)
                .single();

            if (pageError || !page) {
                console.log('[CMS] No dynamic content found for this page.');
                return;
            }

            // 2. Update SEO
            if (page.meta_title) document.title = page.meta_title;
            if (page.meta_description) {
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = "description";
                    document.head.appendChild(metaDesc);
                }
                metaDesc.content = page.meta_description;
            }

            // 3. Fetch Sections
            const { data: sections, error: secError } = await client
                .from('page_sections')
                .select('section_key, content')
                .eq('page_id', page.id);

            if (sections) {
                applyContent(sections);
            }

        } catch (e) {
            console.error('[CMS] Error loading content:', e);
        }
    }

    function applyContent(sections) {
        sections.forEach(section => {
            const key = section.section_key;
            const content = section.content;

            // Strategy: Look for elements with data-cms-key="{key}"
            // Or look for specific IDs

            // 1. Text Replacement
            const elements = document.querySelectorAll(`[data-cms="${key}"]`);
            elements.forEach(el => {
                if (content.text) {
                    // Split by newlines for formatting if needed, or just text
                    if (content.text.includes('\n')) {
                        el.innerHTML = content.text.replace(/\n/g, '<br/>');
                    } else {
                        el.textContent = content.text;
                    }
                }
                // Handle Image Src
                if (content.image && el.tagName === 'IMG') {
                    el.src = content.image;
                }
                // Handle Background Image
                if (content.bg_image) {
                    el.style.backgroundImage = `url(${content.bg_image})`;
                }
            });
        });
        console.log('[CMS] Content applied.');
    }

    // Start
    document.addEventListener('DOMContentLoaded', loadContent);
})();
