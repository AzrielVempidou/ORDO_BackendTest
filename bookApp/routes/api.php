<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiBukuController;

Route::get('/bukus', [ApiBukuController::class, 'index']);
Route::post('/bukus', [ApiBukuController::class, 'store']);
Route::get('/bukus/{id}', [ApiBukuController::class, 'show']);
Route::put('/bukus/{id}', [ApiBukuController::class, 'update']);
Route::delete('/bukus/{id}', [ApiBukuController::class, 'destroy']);
Route::get('/bukus/search', [ApiBukuController::class, 'search']);
