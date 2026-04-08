import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <span className="dot" />
          Inkwell
        </Link>
        <span className="nav-pill">Blog</span>
      </div>
    </nav>
  );
}

function ArticleDetailWrapper() {
  const { id } = useParams();
  return <ArticleDetail articleId={id} />;
}

export default function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetailWrapper />} />
      </Routes>
    </Router>
  );
}
