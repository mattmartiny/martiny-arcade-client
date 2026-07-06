import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./forum.css";
import type { ForumCategory } from "./forumTypes";

export default function ForumIndex() {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const res = await fetch("/api/forum/categories");
      if (!res.ok) {
        if (!cancelled) setLoading(false);
        return;
      }

      const data: ForumCategory[] = await res.json();
      if (!cancelled) {
        setCategories(data);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page-container forum-page">
      <section className="forum-hero">
        <div className="forum-kicker">Community Hub</div>
        <h1>Forum</h1>
        <p>
          Read public discussions from the community. Sign in to start new
          threads and reply to existing ones.
        </p>
        <div className="forum-badges">
          <span className="forum-badge">Public reading</span>
          <span className="forum-badge">Members can post</span>
          <span className="forum-badge">Categories + replies</span>
        </div>
      </section>

      {loading ? (
        <p className="forum-loading">Loading categories...</p>
      ) : (
        <div className="forum-category-grid">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/forum/${category.slug}`}
              className="forum-category-card"
            >
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <div className="forum-meta">
                <span>{category.threadCount} threads</span>
                <span>
                  {category.lastActivityAt
                    ? `Updated ${new Date(category.lastActivityAt).toLocaleDateString()}`
                    : "No posts yet"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
