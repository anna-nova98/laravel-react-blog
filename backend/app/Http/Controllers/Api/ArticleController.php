<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Comment;

class ArticleController extends Controller
{
    /**
     * List all articles
     */
    public function index()
    {
        return response()->json(Article::all(), 200);
    }

    /**
     * Show a single article with comments
     */
    public function show($id)
    {
        $article = Article::with('comments')->find($id);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        return response()->json($article, 200);
    }

    /**
     * Create a new article
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::create($request->only(['title', 'content']));

        return response()->json($article, 201);
    }

    /**
     * Add a comment to an article
     */
    public function addComment(Request $request, $id)
    {
        $request->validate([
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::find($id);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        $comment = Comment::create([
            'article_id' => $article->id,
            'author_name' => $request->author_name,
            'content' => $request->content,
        ]);

        return response()->json($comment, 201);
    }
}