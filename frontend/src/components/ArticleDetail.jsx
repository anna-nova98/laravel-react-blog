import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";

export default function ArticleDetail({ articleId }) {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${articleId}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
    axios.get(`http://localhost:8000/api/articles/${articleId}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [articleId]);

  if (!article) return <div className="loading" />;

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back</Link>

      <div className="article-detail">
        <h1>{article.title}</h1>
        <div className="article-meta" style={{ marginBottom: "1.5rem" }}>
          <span className="tag">Article</span>
          {new Date(article.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        <div className="article-divider" />
        <div className="body">{article.content}</div>
      </div>

      <div className="comments-section">
        <div className="section-title">Comments · {comments.length}</div>
        {comments.length === 0
          ? <div className="no-comments">No comments yet.</div>
          : comments.map(c => (
            <div className="comment-item" key={c.id}>
              <div className="comment-header">
                <div className="comment-avatar">{c.author_name.charAt(0).toUpperCase()}</div>
                <div className="comment-author">{c.author_name}</div>
              </div>
              <div className="comment-content">{c.content}</div>
            </div>
          ))
        }
      </div>

      <div className="card-form">
        <div className="section-title">Leave a comment</div>
        <CommentForm articleId={articleId} setComments={setComments} />
      </div>
    </div>
  );
}
