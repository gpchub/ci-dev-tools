<?php

namespace App\Controllers;

class Personal extends BaseController
{
    public function todo(): string
    {
        $page_title = 'To do list';
        return view('personal/todo', compact('page_title'));
    }

    public function expense()
    {
        $page_title = 'Quản lý thu chi';
        return view('personal/expense', compact('page_title'));
    }
}
