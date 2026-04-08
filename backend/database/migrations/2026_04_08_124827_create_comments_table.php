<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations
     */
    public function up(): void {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();                              // Primary key
            $table->foreignId('article_id')->constrained()->onDelete('cascade'); // Related Article
            $table->string('author_name');             // Comment author name
            $table->text('content');                   // Comment content
            $table->timestamps();                      // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations
     */
    public function down(): void {
        Schema::dropIfExists('comments');
    }
};