import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetailWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper to extract route params
import { useParams } from 'react-router-dom';
function ArticleDetailWrapper() {
  const { id } = useParams();
  return <ArticleDetail articleId={id} />;
}