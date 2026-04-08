import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';

export default function ArticleDetail({ articleId }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${articleId}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [articleId]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <h2>Comments</h2>
      <ul>
        {article.comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author_name}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      <CommentForm articleId={article.id} />
    </div>
  );
}