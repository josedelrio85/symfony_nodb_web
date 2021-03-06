<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;

class SingleProductController extends AbstractController {

  private $prodserv;

  public function __construct(ProductService $prodserv) {
    $this->prodserv = $prodserv;
  }

  public function index(Request $request, TranslatorInterface $translator) {

    // $products = $this->prodserv->getProducts();
    // $mainelements = $this->prodserv->getMain();
    // dump($mainelements);
    // $firstchildrens = $this->prodserv->getFirstChildren();
    // dump($firstchildrens);

    // $secondChildrens = $this->prodserv->getSecondChildren();
    // dump($secondChildrens);
    // // die();
    // $route = $request->attributes->get('_route');
    // $uri = $request->server->get('REQUEST_URI');

    return $this->render("pages/single-product.html.twig", [
      // 'route'     => $route,
      // 'uri'       => $uri,
      // 'translator' => $translator,
      // 'mainelements' => $mainelements,
      // 'firstchildrens' => $firstchildrens,
      // 'secondChildrens' => $secondChildrens,
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

  // public function test() {
  //   $products = $this->prodserv->getProducts();
  //   $mainelements = $this->prodserv->getMain();
  //   dump($mainelements);
  //   $firstchildrens = $this->prodserv->getFirstChildren();
  //   dump($firstchildrens);

  //   $secondChildrens = $this->prodserv->getSecondChildren();
  //   dump($secondChildrens);
  //   // die();
  //   $route = $request->attributes->get('_route');
  //   $uri = $request->server->get('REQUEST_URI');

  //   return $this->render("pages/index.html.twig", [
  //     'route'     => $route,
  //     'uri'       => $uri,
  //     'translator' => $translator,
  //     'mainelements' => $mainelements,
  //     'firstchildrens' => $firstchildrens,
  //     'secondChildrens' => $secondChildrens,
  //   ]);

  // }

}
