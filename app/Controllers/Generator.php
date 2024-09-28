<?php

namespace App\Controllers;

class Generator extends BaseController
{
    public function qrcode(): string
    {
        $page_title = "Tạo QR Code";
        return view('generator/qrcode', compact('page_title'));
    }
}
