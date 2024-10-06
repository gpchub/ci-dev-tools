<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class CalculatorController extends BaseController
{
    use ResponseTrait;

    public function aspectRatio()
    {
        $page_title = 'Tính tỷ lệ';
        return view('calculator/aspect-ratio', compact('page_title'));
    }

}
