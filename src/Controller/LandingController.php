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
    $a = $this->repo->getMessages(); 
    $cards = $this->repo->getKeyDataLandings($area, $landing, 'minicards');
    $product_cards = $this->repo->getKeyDataLandings($area, $landing,'product_bullet');
    $bullets_extra = $this->repo->getKeyDataLandings($area, $landing,'bullets_extra');
    // dump($a); dump($landing); die();
    // dump($cards);
    // dump($product_cards); die();
    // dump($cards); dump($bullets_extra); die();

    return $this->render("pages/landing-product.html.twig", [
      'landing' => $landing,
      'translator' => $translator,
      'cards' => $cards,
      'product_cards' => $product_cards,
      'bullets_extra' => $bullets_extra,
    ]);
  }
}
