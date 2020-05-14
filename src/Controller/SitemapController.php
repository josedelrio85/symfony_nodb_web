<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SitemapController extends AbstractController {

  public function __construct() {
  }

  public function index(Request $request) {
    $router = $this->get('router');
    $routes = $router->getRouteCollection();
    $urls = [];
    foreach ($routes as $k => $route) {
      $path = $route->getPath();
      $exploded = explode('/', $path);
      $candidates = [
        '_error',
        '_wdt',
        '_profiler'
      ];

      if(!in_array($exploded[1], $candidates)){
        $el =['loc' => $path, 'changefreq' => 'weekly', 'priority' => '1.0'];    
        array_push($urls, $el);
      }
    }

    $xml = $this->render('pages/sitemap.xml.twig', [
      'urls' => $urls,
      'hostname' => $request->getHost(),
    ]);
    // dump($xml->getContent());die();

    $response = new Response($xml->getContent());
    $response->headers->set('Content-Type', 'text/xml');
    return $response;
  }
}