<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Article;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed articles
        Article::factory()->count(5)->create();

        // Seed comments for each article
        $articles = Article::all();
        foreach ($articles as $article) {
            Comment::factory()->count(3)->create([
                'article_id' => $article->id, // Associate comments with the article
            ]);
        }
    }
}