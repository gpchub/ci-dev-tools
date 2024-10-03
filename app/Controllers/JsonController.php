<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;
use battye\array_parser\parser;

class JsonController extends BaseController
{
    use ResponseTrait;

    public function convertPhp()
    {
        $page_title = 'Convert JSON ↔ PHP';

        return view('json/convert_php', compact('page_title'));
    }

    public function handleJsonToPhp()
    {
        $input = $this->request->getJsonVar('input');

        $obj = json_decode($input);

        if (!$obj) {
            return $this->fail('Invalid JSON');
        }

        $json = json_encode($obj, JSON_PRETTY_PRINT);
        $codeString = json_decode($json, true);
        $codeString = var_export($codeString, true);
        $codeString = str_replace('array(', 'array(' . PHP_EOL . '    ', $codeString);
        $codeString = str_replace(')', PHP_EOL . ')', $codeString);

        $data = [
            'php' => "<?php\n " . $codeString,
            'serialized_php' => serialize($obj),
        ];

        return $this->respond($data, ResponseInterface::HTTP_OK);

    }

    public function handlePhpToJson()
    {
        $input = $this->request->getJsonVar('input');
        $obj = parser::parse_simple($input);

        $data = [
            'json' => json_encode($obj, JSON_PRETTY_PRINT),
            'serialized_php' => serialize($obj),
        ];

        return $this->respond($data, ResponseInterface::HTTP_OK);
    }

    public function handleSerializedPhpToJson()
    {
        $input = $this->request->getJsonVar('input');
        $obj = unserialize($input);

        $json = json_encode($obj, JSON_PRETTY_PRINT);
        $codeString = json_decode($json, true);
        $codeString = var_export($codeString, true);
        $codeString = str_replace('array(', 'array(' . PHP_EOL . '    ', $codeString);
        $codeString = str_replace(')', PHP_EOL . ')', $codeString);

        $data = [
            'php' => "<?php\n " . $codeString,
            'json' => $json,
        ];

        return $this->respond($data, ResponseInterface::HTTP_OK);
    }
}
