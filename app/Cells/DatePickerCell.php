<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;

class DatePickerCell extends Cell
{
    public $enableTime = false;
    public $model = '';

    protected string $view = 'components/form/datepicker';
}
