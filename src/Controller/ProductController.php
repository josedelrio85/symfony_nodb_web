<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;
use App\Repository\i18nRepository;

class ProductController extends AbstractController {

  private $prodserv;
  private $repo;

  public function __construct(i18nRepository $repo, ProductService $prodserv) {
    $this->prodserv = $prodserv;
    $this->repo = $repo;
  }

  public function index(Request $request, TranslatorInterface $translator) {

    $productid = $request->attributes->get('_route');
    // dump($this->repo->getMessages());
    $bullets = $this->repo->getKeyDataProducts($productid,'bullets');
    $des_with_dropdown = $this->repo->getKeyDataProducts($productid,'des_with_dropdown');
    $desc_with_bullets = $this->repo->getKeyDataProducts($productid,'desc_with_bullets');
    dump($bullets);
    dump($des_with_dropdown);
    dump($desc_with_bullets);die();


    return $this->render("pages/product.html.twig", [
      'landing' => $landing,
      'translator' => $translator,
      'cards' => $cards['cards'],
      // 'product_bullets' => $product_bullets['product']
      'bullets_list' => $bullets['list'],
      'des_with_dropdown_list' => $des_with_dropdown['drop'],
      'desc_with_bullets_list' => $desc_with_bullets['list'],
    ]);
  }
}
