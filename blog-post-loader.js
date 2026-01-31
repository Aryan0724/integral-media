
// Blog Post Loader
// Fetches a single blog post by slug and renders it

(function () {
    const SUPABASE_URL = 'https://kboidwzedoztfaxvptlo.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2lkd3plZG96dGZheHZwdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODg4MzIsImV4cCI6MjA4NTI2NDgzMn0.ez_nc1BIoyO548JvmfdAUsaOn4fVTW9CCP6zqhtdnqg';

    async function initBlogPost() {
        if (typeof supabase === 'undefined') {
            setTimeout(initBlogPost, 100);
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');

        if (!slug) {
            window.location.href = 'blog.html';
            return;
        }

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        try {
            const { data: post, error } = await client
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !post) throw new Error('Post not found');

            // Render Content
            document.title = `${post.title} | Integral Labs`;

            const container = document.getElementById('post-container');
            if (container) {
                // Formatting Date
                const dateStr = new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                // Simple Markdown-ish to HTML (Note: For full markdown support, a library like marked.js is better. 
                // For now, we will treat it as plain text with preserving whitespace/linebreaks)
                // In a real app, you'd use a parser. Here simply wrapping paragraphs.
                const contentHtml = post.content
                    .split('\n\n')
                    .map(para => `<p>${para}</p>`)
                    .join('');

                container.innerHTML = `
                    <div class="post-header">
                        <span class="post-date">${dateStr}</span>
                        <h1 class="post-title">${post.title}</h1>
                    </div>
                    
                    ${post.thumbnail_url ? `
                    <div class="post-hero-image">
                        <img src="${post.thumbnail_url}" alt="${post.title}">
                    </div>
                    ` : ''}

                    <div class="post-content">
                        ${contentHtml}
                    </div>

                    <div class="post-footer">
                        <a href="blog.html" class="back-link">← Back to Articles</a>
                    </div>
                `;
            }

        } catch (e) {
            console.error('Error loading post:', e);
            document.body.innerHTML = '<div style="color:white; text-align:center; padding:5rem;">Article not found. <a href="blog.html" style="color:#aaa;">Go back</a></div>';
        }
    }

    // Add Styles
    const style = document.createElement('style');
    style.textContent = `
        .post-container {
            max-width: 800px;
            margin: 0 auto;
            color: #fff; /* Inherit global text color usually, but ensuring visibility */
        }
        .post-header {
            margin-bottom: 3rem;
            text-align: center;
        }
        .post-date {
            display: block;
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .post-title {
            font-size: clamp(2rem, 5vw, 4rem);
            line-height: 1.1;
            font-weight: 700;
             /* Gradient Text Effect matching homepage */
             background: linear-gradient(to right, #fff, #999);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .post-hero-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 4rem;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .post-hero-image img {
            width: 100%;
            display: block;
        }
        .post-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #ccc;
        }
        .post-content p {
            margin-bottom: 2rem;
        }
        .post-content h2 {
            font-size: 2rem;
            color: #fff;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
        }
        .post-footer {
            margin-top: 5rem;
            padding-top: 3rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .back-link {
            color: #fff;
            text-decoration: none;
            font-size: 1.1rem;
            transition: opacity 0.3s;
        }
        .back-link:hover {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', initBlogPost);
})();
