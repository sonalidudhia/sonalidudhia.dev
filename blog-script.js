document.addEventListener("DOMContentLoaded", () => {
  const posts = (window.BLOG_POSTS || []).slice().sort((a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const listEl = document.getElementById("post-list");

  if (!listEl) return;

  if (!posts.length) {
    listEl.innerHTML = "<p class='post-card'>No blog posts yet. Check back soon.</p>";
    return;
  }

  listEl.innerHTML = posts.map((post) => createPostCard(post)).join("");
});

function createPostCard(post) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const tags = (post.tags || [])
    .map((tag) => `<span class=\"post-tag\">${escapeHTML(tag)}</span>`)
    .join("");

  const title = escapeHTML(post.title || "Untitled");
  const excerpt = escapeHTML(post.excerpt || "");
  const path = escapeHTML(post.path || "#");
  const readTime = escapeHTML(post.readTime || "5 min read");

  return `
    <a class=\"post-card\" href=\"${path}\" aria-label=\"Read post: ${title}\">
      <div class=\"post-meta\">${date} • ${readTime}</div>
      <h3>${title}</h3>
      <p>${excerpt}</p>
      <div class=\"post-tag-row\">${tags}</div>
    </a>
  `;
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
