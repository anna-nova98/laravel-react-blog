import React, { useState } from "react";
import axios from "axios";

export default function NewArticleForm({ setArticles, onDone }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    axios.post("http://localhost:8000/api/articles", { title, content })
      .then(res => {
        setArticles(prev => [res.data, ...prev]);
        setTitle(""); setContent("");
        onDone?.();
      }).catch(err => console.error(err));
  };

  return (
    <div className="card-form">
      <div className="section-title">New Article</div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" placeholder="Give it a great title…" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea placeholder="Write your article…" value={content} onChange={e => setContent(e.target.value)} style={{ minHeight: "160px" }} />
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="submit" className="btn btn-primary">Publish</button>
          <button type="button" className="btn btn-ghost" onClick={onDone}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
