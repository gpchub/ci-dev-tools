<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;

class InputNumberCell extends Cell
{
    public $model = '';
    public $attributes = '';
    public $disabled = '';

    protected string $view = 'components/form/input_number';
}
