<?php

use App\Http\Controllers\ServiceSelector\DepartmentController;
use App\Http\Controllers\ServiceSelector\FeedbackFormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceSelector\ServiceController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;

Route::get('/feedback-forms', [FeedbackFormController::class, 'index']);
Route::post('/feedback-forms', [FeedbackFormController::class, 'store']);
Route::get('/feedback-forms/{id}', [FeedbackFormController::class, 'show']);
Route::put('/feedback-forms/{id}', [FeedbackFormController::class, 'update']);
Route::delete('/feedback-forms/{id}', [FeedbackFormController::class, 'destroy']);


Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user_id}', [UserController::class, 'show']);
    Route::put('/users/{user_id}', [UserController::class, 'update']);
    Route::delete('/users/{user_id}', [UserController::class, 'destroy']);
});



Route::get('/departments/{department_id}/services', [ServiceController::class, 'index']);



Route::apiResource('departments', DepartmentController::class);
