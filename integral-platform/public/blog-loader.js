
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
                .order('created_at', { ascending: false });

            if (error) throw error;

            container.innerHTML = '';

            if (blogs.length === 0) {
                container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 4rem;">No articles published yet.</div>';
                return;
            }

            blogs.forEach(blog => {
                const card = document.createElement('article');
                card.className = 'blog-card';

                // For now, linking nowhere or to a modal since we don't have dynamic subpages in static HTML yet
                // Ideally, we'd link to blog-post.html?slug=...
                // But for MVP, let's just make it a card.

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
            background: transparent;
            overflow: hidden;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 2rem;
        }
        .blog-card:hover {
            transform: translateX(10px);
        }
        .blog-thumb {
            position: relative;
            padding-bottom: 50%;
            background: #111;
            margin-bottom: 1.5rem;
        }
        .blog-thumb img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(1);
            transition: filter 0.3s;
        }
        .blog-card:hover .blog-thumb img {
            filter: grayscale(0);
        }
        .blog-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .blog-content .date {
            font-size: 0.7rem;
            color: var(--gray, #888);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 0.8rem;
            line-height: 1.2;
            color: #fff;
            font-family: 'Instrument Sans', sans-serif;
        }
        .blog-content p {
            font-size: 0.95rem;
            color: var(--gray, #888);
            margin-bottom: 1.5rem;
            line-height: 1.6;
            flex: 1;
        }
        .read-more {
            font-size: 0.8rem;
            font-weight: 400;
            color: #fff;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            align-self: flex-start;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .read-more:hover {
            background: #fff;
            color: #000;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', initBlogs);
})();
