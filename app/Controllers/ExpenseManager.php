<?php

namespace App\Controllers;

class ExpenseManager extends BaseController
{
    public function index()
    {
        $page_title = 'Quản lý thu chi';
        return view('expense/index', compact('page_title'));
    }

    public function stats()
    {
        $page_title = 'Quản lý thu chi';
        return view('expense/stats', compact('page_title'));
    }

    public function settings()
    {
        $page_title = 'Quản lý thu chi';
        return view('expense/settings', compact('page_title'));
    }


}
