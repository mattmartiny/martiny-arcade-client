import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../platform/AuthContext";
import "./forum.css";
import type { ForumThreadDetail } from "./forumTypes";

export default function ForumThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const { token, user } = useAuth();

  const [thread, setThread] = useState<ForumThreadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!threadId) return;

      setLoading(true);
      setError("");

      const res = await fetch(`/api/forum/threads/${encodeURIComponent(threadId)}`);
      if (!res.ok) {
        if (!cancelled) {
          setThread(null);
          setLoading(false);
        }
        return;
      }

      const data: ForumThreadDetail = await res.json();
      if (!cancelled) {
        setThread(data);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [threadId]);

  async function handleReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!threadId || !token) return;

    setSubmitting(true);
    setError("");

    const res = await fetch(
      `/api/forum/threads/${encodeURIComponent(threadId)}/replies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      }
    );

    if (!res.ok) {
      const message = await res.text();
      setError(message || "Failed to post reply.");
      setSubmitting(false);
      return;
    }

    setBody("");
    setSubmitting(false);

    const reload = await fetch(`/api/forum/threads/${encodeURIComponent(threadId)}`);
    if (reload.ok) {
      setThread(await reload.json());
    }
  }

  if (loading) {
    return <div className="page-container forum-page">Loading thread...</div>;
  }

  if (!thread) {
    return <div className="page-container forum-page">Thread not found.</div>;
  }

  return (
    <div className="page-container forum-page">
      <div className="forum-hero">
        <div className="forum-kicker">
          <Link to={`/forum/${thread.categorySlug}`}>{thread.categoryName}</Link>
        </div>
        <h1>{thread.title}</h1>
        <div className="forum-meta">
          <span>
            posted by{" "}
            <Link to={`/profile/${encodeURIComponent(thread.authorUsername)}`}>
              {thread.authorUsername}
            </Link>
          </span>
          <span>{new Date(thread.createdAt).toLocaleString()}</span>
          <span>{thread.replyCount} replies</span>
        </div>
      </div>

      <section className="forum-panel forum-surface">
        <article className="forum-thread-card">
          <div className="forum-thread-body">{thread.body}</div>
        </article>

        <section className="forum-panel">
          <h2>Replies</h2>
          <div className="forum-divider" />

          {thread.replies.length === 0 ? (
            <p className="forum-empty">No replies yet.</p>
          ) : (
            <div>
              {thread.replies.map((reply) => (
                <div key={reply.forumReplyId} className="forum-reply">
                  <div className="forum-meta" style={{ marginBottom: "8px" }}>
                    <span>
                      <Link to={`/profile/${encodeURIComponent(reply.authorUsername)}`}>
                        {reply.authorUsername}
                      </Link>
                    </span>
                    <span>{new Date(reply.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="forum-thread-body">{reply.body}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="forum-panel">
          <h2>Reply</h2>
          {!user ? (
            <p className="forum-note">
              Sign in to join the conversation.
            </p>
          ) : (
            <form className="forum-form" onSubmit={handleReply}>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a reply"
                maxLength={8000}
              />
              <button className="forum-button" type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Post Reply"}
              </button>
            </form>
          )}
          {error && <p className="forum-error">{error}</p>}
        </section>
      </section>
    </div>
  );
}
