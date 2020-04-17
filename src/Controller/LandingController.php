<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;
use App\Repository\i18nRepository;

class LandingController extends AbstractController {

  private $prodserv;
  private $repo;

  public function __construct(i18nRepository $repo, ProductService $prodserv) {
    $this->prodserv = $prodserv;
    $this->repo = $repo;
  }

  public function index(Request $request, TranslatorInterface $translator) {

    $landing = $request->attributes->get('_route');
    $area = $this->prodserv->getArea($landing);
    // $a = $this->repo->getMessages(); 
    $cards = $this->repo->getKeyDataLandings($area, $landing, 'minicards');
    // dump($cards); die();¡
    $product_bullets = $this->repo->getKeyDataLandings($area, $landing,'product_bullet');
    // dump($product_bullets); die();

    return $this->render("pages/landing-product.html.twig", [
      'landing' => $landing,
      'translator' => $translator,
      'cards' => $cards['cards'],
      'product_bullets' => $product_bullets['product']
    ]);
  }
}
