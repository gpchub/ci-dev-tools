<?php

namespace App\Controllers;

class Converter extends BaseController
{
    public function list(): string
    {
        $page_title = 'Chuyển đổi danh sách';
        return view('converter/list', compact('page_title'));
    }

    public function textList()
    {
        $page_title = 'Chuyển đổi dấu phân cách';
        return view('converter/text-list', compact('page_title'));
    }
}
