<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Todo;
use DateTime;

class DeleteUserInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:deleteUserInfo';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $this->exec();
      echo "called"; 
    }

    private function exec() {
      $now = new DateTime();
      $deleteUsers = $this->findUsers($now->modify('-1 week'));
      foreach ($deleteUsers as $du) {
        $this->deleteTodos($du['id']);
        $this->deleteUser($du['id']);
      }
    }

    private function findUsers($date) {
      return User::where('created_at', '<', $date)->get();
    }

    private function deleteTodos($user_id){
      Todo::where('user_id', $user_id)->delete();
    }

    private function deleteUser($user_id){
      User::where('id', $user_id)->delete();
    }
}
