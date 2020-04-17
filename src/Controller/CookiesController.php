<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class CookiesController extends AbstractController {

  public function __construct() {}

  public function index(Request $request){
    $route = $request->attributes->get('_route');
    $uri = $request->server->get('REQUEST_URI');

    return $this->render("pages/cookies.html.twig", [
      'route' => $route,
      'uri' => $uri,
    ]);
  }
}
