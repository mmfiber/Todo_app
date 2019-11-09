<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
  public function index(Request $user) {
    return [
      "todo" => Todo::where('user_id', $user['id'])
                      ->where('state', 0)
                      ->orderBy('deadline', 'asc')
                      ->get(),
      "done" => Todo::where('user_id', $user['id'])
                      ->where('state', 1)
                      ->orderBy('updated_at', 'desc')
                      ->get(),
    ];
  }

  public function changeState(Request $req) {
    $task = Todo::find($req['todo_id']);
    $task->state = ($task->state + 1) % 2;
    $task->save();
    return $this->index($req);
  }

  public function edit(Request $req) {
    $task = Todo::find($req['todo']['id']);
    $task->title = $req['todo']['title'];
    $task->content = $req['todo']['content'];
    $task->deadline = $req['todo']['deadline'];
    $task->save();
    return $this->index($req);
  }

  public function delete(Request $req) {
    Todo::destroy($req['todo_id']);
    return $this->index($req);
  }

  public function create(Request $req) {
    $task = Todo::create([
      'user_id' => $req['id'],
      'state' => 0,
      'title' => $req['todo']['title'],
      'content' => $req['todo']['content'],
      'deadline' => $req['todo']['deadline'],
    ]);
    $task->save();
    return $this->index($req);
  }
}
