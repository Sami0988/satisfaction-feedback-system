<?php

use App\Http\Controllers\ServiceSelector\DepartmentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;


Route::get('/departments', [DepartmentController::class, 'apiIndex']);
Route::put('/departments', [DepartmentController::class, 'create']);
Route::post('/departments', [DepartmentController::class, 'store']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);
Route::put('/departments/{id}', [DepartmentController::class, 'update']);
Route::delete('/departments/{id}', [DepartmentController::class, 'destroy']);
