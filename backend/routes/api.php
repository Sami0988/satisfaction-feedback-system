<?php

use App\Http\Controllers\ServiceSelector\DepartmentController;
use App\Http\Controllers\ServiceSelector\FeedbackFormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceSelector\ServiceController;
use App\Http\Controllers\ServiceSelector\EmployeeController;
use App\Http\Controllers\Controller;

Route::get('/feedback-forms', [FeedbackFormController::class, 'index']);
Route::post('/feedback-forms', [FeedbackFormController::class, 'store']);
Route::get('/feedback-forms/{id}', [FeedbackFormController::class, 'show']);
Route::put('/feedback-forms/{id}', [FeedbackFormController::class, 'update']);
Route::delete('/feedback-forms/{id}', [FeedbackFormController::class, 'destroy']);


Route::get('/departments/{department_id}/services', [ServiceController::class, 'index']);
Route::apiResource('departments', DepartmentController::class);


Route::prefix('employees')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);      // List + filter
    Route::post('/', [EmployeeController::class, 'store']);     // Create
    Route::get('/{id}', [EmployeeController::class, 'show']);   // Show
    Route::put('/{id}', [EmployeeController::class, 'update']); // Update
    Route::delete('/{id}', [EmployeeController::class, 'destroy']); // Delete
});

