<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceSelector\ServiceController;
Route::get('/departments/{department_id}/services', [ServiceController::class, 'index']);

