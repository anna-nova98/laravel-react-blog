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
        // Create a test user (skip if already exists)
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        // Seed articles only if none exist
        if (Article::count() === 0) {
            Article::factory()->count(5)->create();

            $articles = Article::all();
            foreach ($articles as $article) {
                Comment::factory()->count(3)->create([
                    'article_id' => $article->id,
                ]);
            }
        }
    }
}