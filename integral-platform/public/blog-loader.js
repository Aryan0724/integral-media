
// Blogs Loader
// Fetches published blogs from Supabase and renders them

(function () {
    const SUPABASE_URL = 'https://kboidwzedoztfaxvptlo.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2lkd3plZG96dGZheHZwdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODg4MzIsImV4cCI6MjA4NTI2NDgzMn0.ez_nc1BIoyO548JvmfdAUsaOn4fVTW9CCP6zqhtdnqg';

    async function initBlogs() {
        if (typeof supabase === 'undefined') {
            setTimeout(initBlogs, 100);
            return;
        }

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const container = document.getElementById('blog-grid');

        if (!container) return;

        try {
            const { data: blogs, error } = await client
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false }); // FIXED: published_at -> created_at

            if (error) throw error;

            container.innerHTML = '';

            if (blogs.length === 0) {
                container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 4rem;">No articles published yet.</div>';
                return;
            }

            blogs.forEach(blog => {
                const card = document.createElement('article');
                card.className = 'blog-card';

                card.innerHTML = `
                    <div class="blog-thumb">
                        <img src="${blog.thumbnail_url || 'assets/p1.png'}" alt="${blog.title}" onerror="this.src='assets/p1.png'">
                    </div>
                    <div class="blog-content">
                        <span class="date">${new Date(blog.created_at).toLocaleDateString()}</span>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt || ''}</p>
                        <a href="blog-post.html?slug=${blog.slug}" class="read-more">Read Article →</a>
                    </div>
                `;
                container.appendChild(card);
            });

        } catch (e) {
            console.error('Error loading blogs:', e);
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 4rem;">Error loading articles.</div>';
        }
    }

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 3rem;
            padding: 2rem 0;
        }
        .blog-card {
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .blog-card:hover {
            transform: translateY(-5px);
        }
        .blog-thumb {
            position: relative;
            padding-bottom: 60%;
            background: #f0f0f0;
        }
        .blog-thumb img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .blog-content {
            padding: 1.5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .blog-content .date {
            font-size: 0.8rem;
            color: #999;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            line-height: 1.2;
            color: #000;
        }
        .blog-content p {
            font-size: 1rem;
            color: #555;
            margin-bottom: 1.5rem;
            line-height: 1.6;
            flex: 1;
        }
        .read-more {
            font-size: 0.9rem;
            font-weight: 600;
            color: #000;
            text-decoration: none;
            border-bottom: 1px solid #000;
            align-self: flex-start;
            padding-bottom: 2px;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', initBlogs);
})();
