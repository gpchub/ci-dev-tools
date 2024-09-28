<?php

use CodeIgniter\CodeIgniter;

function public_path($path = '')
{
    return ROOTPATH . 'public' . DIRECTORY_SEPARATOR . $path;
}