<?php

use Inertia\Inertia;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureStudent;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FakultasController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\AssignedMataKuliahController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [ViewController::class,'welcome'])->middleware('guest');
Route::get('/dashboard', [ViewController::class,'dashboard'])->middleware('auth');
Route::get('/homepage', [ViewController::class,'homepage'])->middleware('auth');

Route::get('/fetchdatamahasiswa', [MahasiswaController::class, 'get'])->middleware(EnsureAdmin::class);
Route::get('/fetchdatamatkul', [AssignedMataKuliahController::class,'get'])->middleware(EnsureAdmin::class);
Route::get('/fetchfakultas', [FakultasController::class,'get'])->middleware(EnsureAdmin::class);
Route::get('/fetchjurusan', [JurusanController::class,'get'])->middleware(EnsureAdmin::class);
Route::get('/fetchmatakuliah/{id}', [MataKuliahController::class,'get'])->middleware(EnsureAdmin::class);
Route::get('/fetchjadwal/{id}', [JadwalController::class,'get'])->middleware(EnsureAdmin::class);

Route::delete('/deletemahasiswa/{id}', [MahasiswaController::class,'destroy'])->middleware(EnsureAdmin::class);
Route::put('/editmahasiswa/{id}', [MahasiswaController::class,'edit'])->middleware(EnsureAdmin::class);
Route::post('/createmahasiswa', [MahasiswaController::class,'store'])->middleware(EnsureAdmin::class);

Route::post('/assignmatkul', [AssignedMataKuliahController::class,'store'])->middleware(EnsureAdmin::class);
Route::delete('/deleterecord/{id}', [AssignedMataKuliahController::class,'destroy'])->middleware(EnsureAdmin::class);
Route::get('/editedassign/{id}', [AssignedMataKuliahController::class,'edit'])->middleware(EnsureAdmin::class);
Route::put('/editassignedmatakuliah/{id}', [AssignedMataKuliahController::class,'update'])->middleware(EnsureAdmin::class);

Route::post('/authentication', [UserController::class,'authentication']);
Route::post('/logout', [UserController::class,'logout'])->middleware('auth');
Route::get('/login', [UserController::class,'show_login_page'])->middleware('guest');

Route::get('/mydata/{id}', [AssignedMataKuliahController::class,'mydata'])->middleware(EnsureStudent::class);
