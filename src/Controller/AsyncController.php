<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;
use App\Repository\i18nRepository;

class AsyncController extends AbstractController {

  private $prodserv;
  private $repo;

  public function __construct(i18nRepository $repo, ProductService $prodserv) {
    $this->prodserv = $prodserv;
    $this->repo = $repo;
  }

  public function dataSlider(Request $request) {
    $param =  $request->get("slide");

    if(!is_null($param) || !empty($param)) {
      $hero = $this->repo->getSimpleData('hero');

      $slide = [];
      foreach($hero as $k => $h) {
        $cta = $h['cta'];
        $id = str_replace('cta-', '', $cta['id']);
        $position = $cta['position'];
        $sl = [
          'id' => $id,
          'position' => $position,
        ];
        $slide[$cta['id']] = $sl;
      }

      if(array_key_exists($param, $slide)){
        return new JsonResponse($slide[$param]);
      }
    }
    return new JsonResponse(array());
  }

  public function dataConfigurator() {
    $mainelements = $this->prodserv->getMain();

    if(!empty($mainelements)){
      $product = [];
      foreach($mainelements as $k => $m) {
        $prod = [
          'creative' => $m['name'],
          'position' => $m['position'],
        ];
        $product[$k] = $prod;
      }
      return new JsonResponse($product);
    }
    return new JsonResponse(array());
  }
}