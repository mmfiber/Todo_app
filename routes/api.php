<?php

use Illuminate\Http\Request;

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

// Route::post('/register', 'Auth\RegisterController@register')->name('register');
// Route::post('/login', 'Auth\LoginController@login')->name('login');
// Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Auth::routes();
Route::post('/tasks', 'TodoController@index')->name('tasks');
Route::post('/edit', 'TodoController@edit')->name('edit');
Route::post('/delete', 'TodoController@delete')->name('delete');
Route::post('/createTodo', 'TodoController@create')->name('createTodo');
Route::get('/user', function () {
  return Auth::user();
})->name('user');