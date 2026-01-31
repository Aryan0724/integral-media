
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
            gap: 2rem;
            padding: 2rem 0;
        }
        .blog-card {
            background: #0a0a0a;
            border: 1px solid #333;
            overflow: hidden;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        .blog-card:hover {
            transform: translateY(-5px);
            border-color: #ff4d4d;
        }
        .blog-thumb {
            position: relative;
            padding-bottom: 60%;
            background: #151515;
            overflow: hidden;
        }
        .blog-thumb img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
            filter: grayscale(100%);
        }
        .blog-card:hover .blog-thumb img {
            transform: scale(1.05);
            filter: grayscale(0%);
        }
        .blog-content {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .blog-content .date {
            font-family: 'Oswald', sans-serif;
            font-size: 0.8rem;
            color: #666;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .blog-content h3 {
            font-family: 'Syne', sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.2;
            color: #fff;
            text-transform: uppercase;
        }
        .blog-content p {
            font-family: sans-serif;
            font-size: 0.95rem;
            color: #ccc;
            margin-bottom: 1.5rem;
            line-height: 1.5;
            flex: 1;
        }
        .read-more {
            font-family: 'Oswald', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            color: #fff;
            text-decoration: none;
            border-bottom: 1px solid #fff;
            align-self: flex-start;
            padding-bottom: 2px;
            text-transform: uppercase;
            transition: color 0.3s, border-color 0.3s;
        }
        .read-more:hover {
            color: #ff4d4d;
            border-color: #ff4d4d;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', initBlogs);
})();
