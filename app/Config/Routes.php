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

$routes->get('/converter/list', 'Converter::list', ['as' => 'converter.list']);
$routes->get('/converter/pxrem', 'Converter::pxrem', ['as' => 'converter.pxrem']);

$routes->get('/css-tools/css-spacing', 'CssTools::cssSpacing', ['as' => 'css-tools.css-spacing']);
$routes->get('/css-tools/minify-css', 'CssTools::minifyCss', ['as' => 'css-tools.minify-css']);
$routes->post('/css-tools/minify-css', 'CssTools::doMinifyCss', ['as' => 'css-tools.minify-css.post']);
$routes->get('/css-tools/prefix-breakpoint', 'CssTools::prefixBreakpoint', ['as' => 'css-tools.prefix-breakpoint']);

$routes->get('/personal/todo', 'Personal::todo', ['as' => 'personal.todo']);

$routes->get('/personal/thu-chi', 'ExpenseManager::index', ['as' => 'expense.index']);
$routes->get('/personal/thu-chi/thong-ke', 'ExpenseManager::stats', ['as' => 'expense.stats']);
$routes->get('/personal/thu-chi/thiet-lap', 'ExpenseManager::settings', ['as' => 'expense.settings']);

$routes->get('/json/convert-php', 'JsonController::convertPhp', ['as' => 'json.convert-php']);
$routes->post('/json/json-php', 'JsonController::handleJsonToPhp', ['as' => 'json.json-php']);
$routes->post('/json/php-json', 'JsonController::handlePhpToJson', ['as' => 'json.php-json']);
$routes->post('/json/sphp-json', 'JsonController::handleSerializedPhpToJson', ['as' => 'json.sphp-json']);

