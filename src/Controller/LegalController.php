<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class LegalController extends AbstractController {

  public function __construct() {}

  public function index(Request $request){
    $route = $request->attributes->get('_route');
    $uri = $request->server->get('REQUEST_URI');

    return $this->render("pages/legal.html.twig", [
      'route' => $route,
      'uri' => $uri,
    ]);
  }
}
