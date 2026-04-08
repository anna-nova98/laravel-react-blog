import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewArticleForm from "./NewArticleForm";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/articles")
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Articles</h1>
          <div className="subtitle">{articles.length} published</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(v => !v)}>
          {showForm ? "✕ Cancel" : "+ Write"}
        </button>
      </div>

      {showForm && (
        <div className="new-article-toggle">
          <NewArticleForm setArticles={setArticles} onDone={() => setShowForm(false)} />
        </div>
      )}

      {articles.length === 0 && <div className="empty">No articles yet. Be the first to write one.</div>}

      {articles.map(article => (
        <Link to={`/articles/${article.id}`} key={article.id}>
          <div className="article-card">
            <h2>{article.title}</h2>
            <p>{article.content.substring(0, 130)}…</p>
            <div className="article-meta">
              <span className="tag">Article</span>
              {new Date(article.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
