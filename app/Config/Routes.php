<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/theme', 'Home::theme');
$routes->get('/lorem', 'Lorem::index');
$routes->get('/generator/list', 'Lorem::listGenerator', ['as' => 'generator.list']);

$routes->get('/converter/list', 'Converter::list', ['as' => 'converter.list']);
$routes->get('/converter/pxrem', 'Converter::pxrem', ['as' => 'converter.pxrem']);

$routes->get('/css-tools/css-spacing', 'CssTools::cssSpacing', ['as' => 'css-tools.css-spacing']);
$routes->get('/css-tools/minify-css', 'CssTools::minifyCss', ['as' => 'css-tools.minify-css']);
$routes->post('/css-tools/minify-css', 'CssTools::doMinifyCss', ['as' => 'css-tools.minify-css.post']);
$routes->get('/css-tools/prefix-breakpoint', 'CssTools::prefixBreakpoint', ['as' => 'css-tools.prefix-breakpoint']);

$routes->get('/personal/todo', 'Personal::todo', ['as' => 'personal.todo']);

