import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewArticleForm from './NewArticleForm';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <NewArticleForm />
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}