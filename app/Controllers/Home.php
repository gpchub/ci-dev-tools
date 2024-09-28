<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('welcome_message');
    }

    public function theme(): string
    {
        $page_title = 'Theme';
        return view('theme', compact('page_title'));
    }
}
