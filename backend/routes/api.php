<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::get('/employees', [EmployeeController::class, 'index']);
