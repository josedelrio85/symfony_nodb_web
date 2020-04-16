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

    $originalRoute = $request->attributes->get('_route');
    $packID = $request->attributes->get('_route_params')['landing'];

    $key = "embarazadas";
    // dump($translator->trans("{$key}.minicards.title"));
    // $messages = $this->repo->getMessages();
    // $cards = $messages['salud'][$key]['minicards'];

    $cards = $this->repo->getKeyData('salud',$key,'minicards');
    $product_bullets = $this->repo->getKeyData('salud',$key,'product_bullet');

    return $this->render("pages/landing-product.html.twig", [
      'key' => $key,
      'translator' => $translator,
      'cards' => $cards['cards'],
      'product_bullets' => $product_bullets['product']
    ]);
  }
}
