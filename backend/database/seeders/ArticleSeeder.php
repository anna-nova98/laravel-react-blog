<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder {
    /**
     * Run the database seeds
     */
    public function run(): void {
        Article::factory()->count(5)->create(); // Create 5 test articles
    }
}