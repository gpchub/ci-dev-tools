<?php
namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class CssTools extends BaseController
{
    use ResponseTrait;

    public function prefixBreakpoint()
    {
        $page_title = 'Tạo code responsive';
        return view('css/prefix-breakpoint', compact('page_title'));
    }

    public function cssSpacing()
    {
        $page_title = 'Tạo CSS Spacing';
        return view('css/css-spacing', compact('page_title'));
    }

    public function pxrem()
    {
        $page_title = 'Đổi px ↔ rem';
        return view('css/pxrem', compact('page_title'));
    }

    public function minifyCss()
    {
        $page_title = 'Minify Css';
        return view('css/minify-css', compact('page_title'));
    }

    public function doMinifyCss()
    {
        $css = $this->request->getJsonVar('input');

        $css = str_replace("\r\n", "\n", $css);

        $css = preg_replace_callback("/((\.|::)?.*){((.|\s)+?)}/", function ($matches) {
        	return $matches[1] . '{' . preg_replace("/\s+(.*?)/", " ", $matches[3]) . '} ';
        }, $css);

        $css = trim($css);

        $data = [
            'output' => $css,
        ];

        return $this->respond($data, 200);
    }
}