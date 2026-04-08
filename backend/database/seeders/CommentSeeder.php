<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Article;

class CommentSeeder extends Seeder {
    /**
     * Run the database seeds
     */
    public function run(): void {
        $articles = Article::all();
        foreach ($articles as $article) {
            \App\Models\Comment::factory()->count(3)->create([
                'article_id' => $article->id, // Assign comments to article
            ]);
        }
    }
}