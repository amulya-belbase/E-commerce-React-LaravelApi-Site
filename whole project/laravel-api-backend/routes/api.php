<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\VendorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [VendorController::class, 'register']);
Route::post('/login', [VendorController::class, 'login']);
Route::post('/addproduct', [ProductController::class, 'addproduct']);
Route::get('/allproducts', [ProductController::class, 'allproducts']);
Route::delete('/delete/{id}', [ProductController::class, 'delete']);
Route::get('/getproduct/{id}', [ProductController::class, 'getProduct']);
Route::put('/updateproduct/{id}', [ProductController::class, 'update']);
Route::get('/search/{key}', [ProductController::class, 'search']);
