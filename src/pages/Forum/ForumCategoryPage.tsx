import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../platform/AuthContext";
import "./forum.css";
import type { ForumCategoryFeed } from "./forumTypes";

export default function ForumCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const page = Math.max(Number(searchParams.get("page") ?? "1") || 1, 1);

  const [feed, setFeed] = useState<ForumCategoryFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!categorySlug) return;

      setLoading(true);
      setError("");

      const res = await fetch(
        `/api/forum/categories/${encodeURIComponent(categorySlug)}/threads?page=${page}`
      );

      if (!res.ok) {
        if (!cancelled) {
          setFeed(null);
          setLoading(false);
        }
        return;
      }

      const data: ForumCategoryFeed = await res.json();
      if (!cancelled) {
        setFeed(data);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [categorySlug, page]);

  async function handleCreateThread(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!categorySlug || !token) return;

    setSubmitting(true);
    setError("");

    const res = await fetch(
      `/api/forum/categories/${encodeURIComponent(categorySlug)}/threads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      }
    );

    if (!res.ok) {
      const message = await res.text();
      setError(message || "Failed to create thread.");
      setSubmitting(false);
      return;
    }

    const data: { threadId: string } = await res.json();
    setTitle("");
    setBody("");
    setSubmitting(false);
    navigate(`/forum/threads/${data.threadId}`);
  }

  if (loading) {
    return <div className="page-container forum-page">Loading forum...</div>;
  }

  if (!feed) {
    return <div className="page-container forum-page">Category not found.</div>;
  }

  return (
    <div className="page-container forum-page">
      <div className="forum-hero">
        <div className="forum-kicker">Forum Category</div>
        <h1>{feed.category.name}</h1>
        <p>{feed.category.description}</p>
        <div className="forum-meta">
          <span>{feed.totalCount} threads</span>
          <span>
            {feed.category.lastActivityAt
              ? `Last activity ${new Date(feed.category.lastActivityAt).toLocaleString()}`
              : "No recent activity"}
          </span>
        </div>
      </div>

      <div className="forum-grid">
        <section className="forum-panel">
          <div className="forum-nav-row">
            <h2>Threads</h2>
            <Link to="/forum" className="forum-link-button secondary">
              Back to categories
            </Link>
          </div>
          <div className="forum-divider" />

          {feed.threads.length === 0 ? (
            <p className="forum-empty">No threads yet. Start the discussion.</p>
          ) : (
            <div className="forum-thread-list">
              {feed.threads.map((thread) => (
                <article key={thread.forumThreadId} className="forum-thread-card">
                  <div className="forum-thread-topline">
                    <div>
                      <div className="forum-kicker">
                        {thread.replyCount} replies
                      </div>
                      <h3>
                        <Link to={`/forum/threads/${thread.forumThreadId}`}>
                          {thread.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="forum-meta">
                      <span>
                        by{" "}
                        <Link to={`/profile/${encodeURIComponent(thread.authorUsername)}`}>
                          {thread.authorUsername}
                        </Link>
                      </span>
                      <span>{new Date(thread.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <p>{thread.bodyPreview}</p>
                </article>
              ))}
            </div>
          )}

          <div className="forum-pager" style={{ marginTop: "18px" }}>
            <button
              className="forum-button secondary"
              disabled={page <= 1}
              onClick={() => setSearchParams({ page: String(page - 1) })}
            >
              Previous
            </button>
            <span className="forum-meta">
              Page {page} of {feed.totalPages || 1}
            </span>
            <button
              className="forum-button secondary"
              disabled={page >= feed.totalPages}
              onClick={() => setSearchParams({ page: String(page + 1) })}
            >
              Next
            </button>
          </div>
        </section>

        <section className="forum-panel">
          <h2>Start a Thread</h2>
          {!user ? (
            <p className="forum-note">
              Sign in to create threads or reply to posts.
            </p>
          ) : (
            <form className="forum-form" onSubmit={handleCreateThread}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Thread title"
                maxLength={140}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the opening post"
                maxLength={8000}
              />
              <button className="forum-button" type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Create Thread"}
              </button>
            </form>
          )}

          {error && <p className="forum-error">{error}</p>}
        </section>
      </div>
    </div>
  );
}
