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

  public function dataConfiguratorFC() {
    $fc = $this->prodserv->getFirstChildren();

    if(!empty($fc)){
      $fcs = [];
      foreach($fc['salud'] as $k => $f) {
        if(is_array($f)) {
          $arr = [
            'creative' => $f['name'],
            'position' => $f['position'],
          ];
          $fcs[$k] = $arr;
        }
      }
      return new JsonResponse($fcs);
    }
    return new JsonResponse(array());
  }

  public function dataConfiguratorSC(Request $request) {
    $key = $request->get("fc");

    $sc = $this->prodserv->getSecondChildren();
    if(!empty($sc)){
      $scs = [];
      foreach($sc[$key] as $k => $s) {
        if(is_array($s)) {
          $arr = [
            'name' => $key,
            'creative' => $s['name'],
            'position' => $s['position'],
          ];
          $scs[$k] = $arr;
        }
      }
      return new JsonResponse($scs);
    }
    return new JsonResponse(array());
  }

  public function dataProduct(Request $request) {
    $area =  $request->get("area");
    $landing =  $request->get("landing");
    $prod1 =  $request->get("product1");
    $prod2 =  $request->get("product2");
    $output = [];

    $simple_landing = ['mascotas', 'decesos'];
    if(in_array($landing, $simple_landing)){
      $product_bullet = $this->repo->getMessages()['landings'][$landing]['product_bullet'];
    } else {
      $product_bullet = $this->repo->getKeyDataLandings($area, $landing, 'product_bullet');
    }
    $products = $product_bullet['product'];

    $product1 = array_key_exists($prod1, $products) ? $products[$prod1] : null;

    $pd1 = [
      'name' => $landing,
      'creative' => $product1['title'],
      'position' => str_replace('product', '', $prod1),
    ];
    $output["product1"] = $pd1;

    
    if($prod2 !== ""){
      $product2 = array_key_exists($prod2, $products) ? $products[$prod2] : null;
      $pd2 = [
        'name' => $landing,
        'creative' => $product2['title'],
        'position' => str_replace('product', '', $prod2),
      ];
      $output["product2"] = $pd2;
    }

    return new JsonResponse($output);
  }


  function old() {
        // if(!is_null($key) || !empty($key)) {
    //   $simple_landing = ['mascotas', 'decesos'];
    //   if(in_array($landing, $simple_landing)){
    //     $product_bullet = $this->repo->getMessages()['landings'][$landing]['product_bullet'];
    //   } else {
    //     $product_bullet = $this->repo->getKeyDataLandings($area, $landing, 'product_bullet');
    //   }
    //   $products = $product_bullet['product'];
    //   $prod = array_key_exists($key, $products) ? $products[$key] : null;
    //   $pd = [
    //     'name' => $landing,
    //     'creative' => $prod['title'],
    //     'position' => str_replace('product', '', $key),
    //   ];
    //   return new JsonResponse($pd);
    // }
  }
}