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

    $alldata = $this->repo->getMessages();
    $simple_landing = ['mascotas', 'decesos'];
    if(in_array($landing, $simple_landing)){
      $dl = $alldata['landings'][$landing];
    } else {
      $dl = $alldata['landings'][$area][$landing];
    }

    $cards = $dl['minicards'];
    $product_bullet = $dl['product_bullet'];
    $desc = $dl['desc'];
    $bullets_extra = array_key_exists('bullets_extra', $dl) ? $dl['bullets_extra'] : null;
    $uri = parse_url($request->getUri(), PHP_URL_PATH);
    $des_with_dropdown = array_key_exists('des_with_dropdown', $dl) ? $dl['des_with_dropdown'] : null;
    $desc_extra = array_key_exists('desc_extra', $dl) ? $dl['desc_extra'] : null;
    $des_with_dropdown_extra = array_key_exists('des_with_dropdown_extra', $dl) ? $dl['des_with_dropdown_extra'] : null;
    $table = array_key_exists('extra', $dl) ? $dl['extra']['table'] : null;
    $especial = $landing === "mascotas" ? "-".$landing: null;

    return $this->render("pages/landing-product{$especial}.html.twig", [
      'area' => $area,
      'landing' => $landing,
      'translator' => $translator,
      'cards' => $cards,
      'product_cards' => $product_bullet,
      'bullets_extra' => $bullets_extra,
      'landing_value' => $uri,
      'desc' => $desc,
      'des_with_dropdown' => $des_with_dropdown,
      'desc_extra' => $desc_extra,
      'des_with_dropdown_extra' => $des_with_dropdown_extra,
      'table' => $table,
    ]);
  }
}
