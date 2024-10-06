<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class TextController extends BaseController
{
    public function textCases()
    {
        $page_title = 'Đổi kiểu chữ';
        return view('text/text-cases', compact('page_title'));
    }

    public function correctPunctuation()
    {
        $page_title = 'Chỉnh sửa dấu câu';
        return view('text/correct-punctuation', compact('page_title'));
    }
}
