<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/theme', 'Home::theme');
$routes->get('/lorem', 'Lorem::index');
$routes->get('/generator/list', 'Lorem::listGenerator', ['as' => 'generator.list']);
$routes->get('/generator/qrcode', 'Generator::qrcode', ['as' => 'generator.qrcode']);

$routes->get('/converter/text-list', 'Converter::textList', ['as' => 'converter.text-list']);
$routes->get('/converter/list', 'Converter::list', ['as' => 'converter.list']);

$routes->get('/css-tools/css-spacing', 'CssTools::cssSpacing', ['as' => 'css-tools.css-spacing']);
$routes->get('/css-tools/minify-css', 'CssTools::minifyCss', ['as' => 'css-tools.minify-css']);
$routes->post('/css-tools/minify-css', 'CssTools::doMinifyCss', ['as' => 'css-tools.minify-css.post']);
$routes->get('/css-tools/prefix-breakpoint', 'CssTools::prefixBreakpoint', ['as' => 'css-tools.prefix-breakpoint']);
$routes->get('/css-tools/pxrem', 'CssTools::pxrem', ['as' => 'css-tools.pxrem']);
$routes->get('/css-tools/color-types', 'CssTools::colorTypes', ['as' => 'css-tools.color-types']);

$routes->get('/personal/todo', 'Personal::todo', ['as' => 'personal.todo']);

$routes->get('/personal/thu-chi', 'ExpenseManager::index', ['as' => 'expense.index']);
$routes->get('/personal/thu-chi/thong-ke', 'ExpenseManager::stats', ['as' => 'expense.stats']);
$routes->get('/personal/thu-chi/thiet-lap', 'ExpenseManager::settings', ['as' => 'expense.settings']);

$routes->get('/json/convert-php', 'JsonController::convertPhp', ['as' => 'json.convert-php']);
$routes->post('/json/json-php', 'JsonController::handleJsonToPhp', ['as' => 'json.json-php']);
$routes->post('/json/php-json', 'JsonController::handlePhpToJson', ['as' => 'json.php-json']);
$routes->post('/json/sphp-json', 'JsonController::handleSerializedPhpToJson', ['as' => 'json.sphp-json']);

$routes->get('/json/escape', 'JsonController::escapeJson', ['as' => 'json.escape']);

$routes->get('/calc/aspect-ratio', 'CalculatorController::aspectRatio', ['as' => 'calc.aspect-ratio']);

$routes->get('/text/correct-punctuation', 'TextController::correctPunctuation', ['as' => 'text.correct-punctuation']);
$routes->get('/text/cases', 'TextController::textCases', ['as' => 'text.cases']);