<?php

use App\Http\Controllers\ApiBukuController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/bukus', [ApiBukuController::class, 'index']);
Route::post('/bukus', [ApiBukuController::class, 'store']);
Route::get('/bukus/{id}', [ApiBukuController::class, 'show']);
Route::put('/bukus/{id}', [ApiBukuController::class, 'update']);
Route::delete('/bukus/{id}', [ApiBukuController::class, 'destroy']);
Route::get('/bukus/search/{query}', [ApiBukuController::class, 'search']);