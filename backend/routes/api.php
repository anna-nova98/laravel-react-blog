<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;

// List all articles
Route::get('/articles', [ArticleController::class, 'index']);

// Show a single article with comments
Route::get('/articles/{id}', [ArticleController::class, 'show']);

// Create a new article
Route::post('/articles', [ArticleController::class, 'store']);

// Add a comment to an article
Route::post('/articles/{id}/comments', [ArticleController::class, 'addComment']);