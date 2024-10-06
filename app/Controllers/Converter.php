<?php

namespace App\Controllers;

class Converter extends BaseController
{
    public function list(): string
    {
        $page_title = 'Chuyển đổi danh sách';
        return view('converter/list', compact('page_title'));
    }

    public function pxrem()
    {
        $page_title = 'Đổi px ↔ rem';
        return view('converter/pxrem', compact('page_title'));
    }

    public function textCase()
    {
        $page_title = 'Đổi kiểu chữ';
        return view('converter/text-case', compact('page_title'));
    }
}
