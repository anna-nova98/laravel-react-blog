import React, { useState } from "react";
import axios from "axios";

export default function CommentForm({ articleId, setComments }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    axios.post(`http://localhost:8000/api/articles/${articleId}/comments`, {
      author_name: author, content,
    }).then(res => {
      setComments(prev => [...prev, res.data]);
      setAuthor(""); setContent("");
    }).catch(err => console.error(err));
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Comment</label>
        <textarea placeholder="Share your thoughts…" value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Post Comment</button>
    </form>
  );
}
