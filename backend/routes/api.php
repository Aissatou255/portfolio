<?php

use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

Route::get('/achievements', [AchievementController::class, 'index']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/profile', [ProfileController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/achievements', [AchievementController::class, 'store']);
    Route::put('/achievements/{achievement}', [AchievementController::class, 'update']);
    Route::delete('/achievements/{achievement}', [AchievementController::class, 'destroy']);

    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);

    Route::put('/profile', [ProfileController::class, 'update']);

    Route::get('/contact-messages', [ContactController::class, 'index']);
    Route::patch('/contact-messages/{contactMessage}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/contact-messages/{contactMessage}', [ContactController::class, 'destroy']);
});