<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;
use App\Repository\i18nRepository;

class IndexController extends AbstractController {

  private $prodserv;
  private $repo;

  public function __construct(i18nRepository $repo, ProductService $prodserv) {
    $this->prodserv = $prodserv;
    $this->repo = $repo;
  }

  public function index(Request $request, TranslatorInterface $translator) {

    $products = $this->prodserv->getProducts();
    $mainelements = $this->prodserv->getMain();
    $firstchildrens = $this->prodserv->getFirstChildren();
    $secondChildrens = $this->prodserv->getSecondChildren();
    // dump($mainelements);
    // dump($firstchildrens);
    // dump($secondChildrens);

    $hero = $this->repo->getSimpleData('hero');
    $cards = $this->repo->getSimpleData('cards');

    $route = $request->attributes->get('_route');
    $uri = $request->server->get('REQUEST_URI');

    return $this->render("pages/index.html.twig", [
      'route'     => $route,
      'uri'       => $uri,
      'translator' => $translator,
      'mainelements' => $mainelements,
      'firstchildrens' => $firstchildrens,
      'secondChildrens' => $secondChildrens,
      'hero' => $hero,
      'cards' => $cards,
    ]);
  }

  // public function getFirstChildren(Request $request) {
  //   $element = $request->request->get('element');
  //   $fc = $this->prodserv->getFirstChildren($element);

  //   $response = array( 
  //     "code" => 200,
  //     "response" => $this->render('components/product-selector/product-card.html.twig', [
  //       'fc' => $fc
  //     ])->getContent() 
  //   );
  //   return new JsonResponse($response);
  // }
}
