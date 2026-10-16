<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cv_entries', function (Blueprint $table) {
            $table->id();
            $table->string('section');
            $table->string('titre');
            $table->string('periode')->nullable();
            $table->text('details')->nullable();
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });

        Schema::table('profiles', function (Blueprint $table) {
            $table->text('cv_intro')->nullable();
            $table->string('cv_lien')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['cv_intro', 'cv_lien']);
        });

        Schema::dropIfExists('cv_entries');
    }
};