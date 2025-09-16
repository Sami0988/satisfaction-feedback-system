<?php

use App\Http\Controllers\AuthController\AuthController;
use App\Http\Controllers\ServiceSelector\DepartmentController;
use App\Http\Controllers\ServiceSelector\FeedbackFormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceSelector\ServiceController;
use App\Http\Controllers\ServiceSelector\EmployeeController;
use App\Http\Controllers\SuperAdminController\AddSuperAdminController;
use App\Http\Controllers\SuperAdminController\AddDepartmentController;




use App\Http\Controllers\UserController;


use App\Http\Controllers\Controller;
// use App\Http\Controllers\AddDepartmentController;

Route::get('/feedback-forms', [FeedbackFormController::class, 'index']);
Route::post('/feedback-forms', [FeedbackFormController::class, 'store']);
Route::get('/feedback-forms/{id}', [FeedbackFormController::class, 'show']);
Route::put('/feedback-forms/{id}', [FeedbackFormController::class, 'update']);
Route::delete('/feedback-forms/{id}', [FeedbackFormController::class, 'destroy']);


// Route::post('/login', [UserController::class, 'login']);
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [UserController::class, 'logout']);

//     Route::get('/users', [UserController::class, 'index']);
//     Route::post('/users', [UserController::class, 'store']);
//     Route::get('/users/{user_id}', [UserController::class, 'show']);
//     Route::put('/users/{user_id}', [UserController::class, 'update']);
//     Route::delete('/users/{user_id}', [UserController::class, 'destroy']);
// });



Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



Route::get('/departments/{department_id}/services', [ServiceController::class, 'index']);
Route::apiResource('departments', DepartmentController::class);


Route::prefix('employees')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);      // List + filter
    Route::post('/', [EmployeeController::class, 'store']);     // Create
    Route::get('/{id}', [EmployeeController::class, 'show']);   // Show
    Route::put('/{id}', [EmployeeController::class, 'update']); // Update
    Route::delete('/{id}', [EmployeeController::class, 'destroy']); // Delete
});






Route::post('/super-admin/create', [AddSuperAdminController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/departments/create', [AddDepartmentController::class, 'store']);
    Route::get('/departments', [AddDepartmentController::class, 'index']);
    // full update
Route::put('/departments/{id}', [AddDepartmentController::class, 'putUpdate']);

// partial update
Route::patch('/departments/{id}', [AddDepartmentController::class, 'patchUpdate']);

// delete
Route::delete('/departments/{id}', [AddDepartmentController::class, 'destroy']);
});



