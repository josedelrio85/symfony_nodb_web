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
    $price_bullets = $this->repo->getKeyDataProducts($productid,'price_with_details');
    $bullets = $this->repo->getKeyDataProducts($productid,'bullets');
    $des_with_dropdown = $this->repo->getKeyDataProducts($productid,'des_with_dropdown');
    $desc_with_bullets = $this->repo->getKeyDataProducts($productid,'desc_with_bullets');
    $dropdown = $this->repo->getKeyDataProducts($productid,'dropdown');
    $faq = $this->repo->getKeyDataProducts($productid,'faq');
    // dump($price_bullets);die();
    // dump($bullets);die();
    // dump($des_with_dropdown);
    // dump($desc_with_bullets);die();
    // dump($dropdown);die();


    return $this->render("pages/single-product.html.twig", [
      'product' => $productid,
      'translator' => $translator,
      // 'cards' => $cards['cards'],
      // 'product_bullets' => $product_bullets['product']
      'price_bullets' => $price_bullets['bullets'],
      'bullets_list' => $bullets,
      'des_with_dropdown_list' => $des_with_dropdown,
      'desc_with_bullets_list' => $desc_with_bullets,
      'dropdown_last' => $dropdown,
      'faq' => $faq,
    ]);
  }
}
