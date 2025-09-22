<?php
use App\Http\Controllers\AuthController\ForgotPasswordController;
use App\Http\Controllers\AuthController\PasswordController;
use App\Http\Controllers\AuthController\AuthController;
use App\Http\Controllers\ServiceSelector\DepartmentController;
use App\Http\Controllers\ServiceSelector\FeedbackFormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceSelector\ServiceController;
use App\Http\Controllers\ServiceSelector\EmployeeController;
use App\Http\Controllers\SuperAdminController\AddSuperAdminController;
use App\Http\Controllers\SuperAdminController\AddDepartmentController;
use App\Http\Controllers\AdminController\DepartmentAdminController;






use App\Http\Controllers\UserController;


use App\Http\Controllers\Controller;
// use App\Http\Controllers\AddDepartmentController;

Route::get('/feedback-forms', [FeedbackFormController::class, 'index']);
Route::post('/feedback-forms', [FeedbackFormController::class, 'store']);
Route::get('/feedback-forms/{id}', [FeedbackFormController::class, 'show']);
Route::put('/feedback-forms/{id}', [FeedbackFormController::class, 'update']);
Route::delete('/feedback-forms/{id}', [FeedbackFormController::class, 'destroy']);




//Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



// frontend page service selection
Route::get('/departments/{department_id}/services', [ServiceController::class, 'index']);

// frontend page department selection
Route::apiResource('departments', DepartmentController::class)->only(['index', 'show']); 

 // frontend page employees selection
Route::apiResource('employees', EmployeeController::class);




// Super Admin routes for creating and managing super admins
 Route::post('/super-admin/create', [AddSuperAdminController::class, 'store']);

// Super Admin routes
Route::prefix('super-admin')->middleware('auth:sanctum')->group(function () {
    Route::post('/departments', [AddDepartmentController::class, 'store']);
    Route::get('/departments', [AddDepartmentController::class, 'index']);
    Route::put('/departments/{id}', [AddDepartmentController::class, 'putUpdate']);
    Route::patch('/departments/{id}', [AddDepartmentController::class, 'patchUpdate']);
    Route::delete('/departments/{id}', [AddDepartmentController::class, 'destroy']);
});


// password routes
Route::middleware('auth:sanctum')->post('/password/update', [PasswordController::class, 'update']);


Route::post('/forgot/password', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/reset/password/{token}', [ForgotPasswordController::class, 'resetPassword'])

// Admin routes for managing employees and services in their department
Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {

    // Add employee and/or service
    Route::post('/employee-service', [DepartmentAdminController::class, 'addEmployeeAndService']);

    // Get all employees and services in admin's department
    Route::get('/employee-service', [DepartmentAdminController::class, 'getDepartmentData']);

    // Update employee and optionally linked service
    Route::put('/employee-service/{employeeId}', [DepartmentAdminController::class, 'putUpdateEmployeeService']);
    Route::patch('/employee-service/{employeeId}', [DepartmentAdminController::class, 'patchUpdateEmployeeService']);

    // Delete employee or service by type and id
    Route::delete('/employee-service/{id}', [DepartmentAdminController::class, 'destroy']);
});

