<?php

use App\Http\Controllers\SuperdAdminController\CreateQuestionController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});


// Route to display the form for adding a new question
Route::get('/super-admin/questions/create', [CreateQuestionController::class, 'create'])->name('questions.create');

// Route to handle the form submission and store the new question
Route::post('/super-admin/questions', [CreateQuestionController::class, 'store'])->name('questions.store');
