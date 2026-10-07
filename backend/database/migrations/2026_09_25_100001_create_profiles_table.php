<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->default('Aïssatou Dia');
            $table->string('titre')->default('Développeuse Web Full Stack');
            $table->text('bio')->nullable();
            $table->string('sous_titre')->nullable();
            $table->string('photo')->nullable();
            $table->string('email')->nullable();
            $table->string('telephone')->nullable();
            $table->string('ville')->nullable();
            $table->string('github')->nullable();
            $table->string('linkedin')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};