<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;

class ProductController extends AbstractController {

  private $prodserv;

  public function __construct(ProductService $prodserv) {
    $this->prodserv = $prodserv;
  }

  public function index(Request $request, TranslatorInterface $translator) {

    $key = "embarazadas";
    // dump($translator->trans("{$key}.minicards.title"));

    $cards = [];
    for($i=1; $i <= 2; $i++){
      array_push($cards, [
        'top' => "{$key}.minicards.cards.card{$i}.top",
        'middle' => "{$key}.minicards.cards.card{$i}.middle",
        'bottom' => "{$key}.minicards.cards.card{$i}.bottom",
      ]);
    }

    $product_bullets = [];
    for($i=1; $i <= 2; $i++){
      array_push($product_bullets, [
        'title' => "{$key}.product_bullet.product.product{$i}.title",
        'price_pre' => "{$key}.product_bullet.product.product{$i}.price.pre",
        'price_quantity' => "{$key}.product_bullet.product.product{$i}.price.quantity",
        'price_currency' => "{$key}.product_bullet.product.product{$i}.price.currency",
        'price_period' => "{$key}.product_bullet.product.product{$i}.price.period",
        'cta_text' => "{$key}.product_bullet.product.product{$i}.cta.text",
        'cta_path' => "{$key}.product_bullet.product.product{$i}.cta.path",
        'more_info_text' => "{$key}.product_bullet.product.product{$i}.more_info.text",
        'more_info_path' => "{$key}.product_bullet.product.product{$i}.more_info.path",
        'bullets' => "{$key}.product_bullet.product.product{$i}.bullets",
      ]);
    }

    $dropdown = [];
    for($i=1; $i <= 5; $i++){
      array_push($dropdown, [
        'title' => "{$key}.faq.elems.faq{$i}.title",
        'desc' => "{$key}.faq.elems.faq{$i}.text",
      ]);
    }

    // die(dump($dropdown));


    return $this->render("pages/landing-product.html.twig", [
      'key' => $key,
      'translator' => $translator,
      'cards' => $cards,
      'product_bullets' => $product_bullets,
      'dropdown' => $dropdown,
    ]);
  }
}
