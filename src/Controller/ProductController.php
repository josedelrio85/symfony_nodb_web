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
  private $request;

  public function __construct(i18nRepository $repo, ProductService $prodserv) {
    $this->prodserv = $prodserv;
    $this->repo = $repo;
  }

  public function index(Request $request, TranslatorInterface $translator) {
    $this->request = $request;
    $productid = $request->attributes->get('_route');
    $previous = $this->getPrevious();
    $img = null;
    $imgnumber = null;

    if ($previous === '/seguros-salud-empresa') {
      if ($productid === "negocios") {
        $productid = 'negocios_menos5';
      }else if($productid === "negocios_extra") {
        $productid = 'negocios_extra_menos5';
      }
      // dump($productid);
    }

    $alldata = $this->repo->getMessages();
    $dp = $alldata['products'][$productid];
    $hero = $dp['hero'];

    if(is_null($previous)) {
      $img = "image1";
      $hero_image = $hero['images'][$img];
    } else {
      switch($productid) {
        case 'plena_plus':
          switch($previous) {
            case '/seguros-salud-familias':
              $imgnumber = '1';
            break;
            case '/seguros-salud-individual':
              $imgnumber = '2';
            break;
            case '/seguros-salud-embarazadas':
              $imgnumber = '3';
            break;
          }
        break;
        case 'plena_vital':
          switch($previous) {
            case '/seguros-salud-familias':
              $imgnumber = '1';
            break;
            case '/seguros-salud-individual':
              $imgnumber = '2';
            break;
            case '/seguros-salud-embarazadas':
              $imgnumber = '3';
            break;
          }
        break;
        case 'plena_extra':
        case 'plena':
        case 'go':
          switch($previous) {
            case '/seguros-salud-familias':
              $imgnumber = '1';
            break;
            case '/seguros-salud-individual':
              $imgnumber = '2';
            break;
          }
        break;
        break;
        case 'senior':
        case 'dental_familia':
        case 'dental_max':
          $imgnumber = '1';
        break;
        case 'negocios':
        case 'negocios_menos5':
        case 'negocios_extra':
        case 'negocios_extra_menos5':
          switch($previous) {
            case '/seguros-salud-empresa':
              $imgnumber = '1';
            break;
            case '/seguros-salud-autonomos':
              $imgnumber = '2';
            break;
          }
        break;
        case 'empresa':
        case 'empresa_extra':
          switch($previous) {
            case '/seguros-salud-empresa-extra':
              $imgnumber = '1';
            break;
            case '/seguros-salud-empresa':
              $imgnumber = '2';
            break;
          }
        break;
        default:
          $imgnumber = '1';
      }
      if(is_null($imgnumber)){
        $imgnumber = 1;
      }
      $img = "image".$imgnumber;
      $hero_image = $hero['images'][$img];
    }


    $price_bullets = $dp['price_with_details'];
    $bullets = $dp['bullets'];
    $des_with_dropdown = $dp['des_with_dropdown'];
    $desc_with_bullets = $dp['desc_with_bullets'];
    $dropdown = $dp['dropdown'];
    $faq = $dp['faq'];
    $table = array_key_exists('extra', $dp) ? $dp['extra']['table'] : null;
    $desc = $dp['desc'];
    $divider = $dp[ 'divider'];
    foreach($divider as $index => $a) {
      $imgdivider[$index] = $a[$img];
    };


    $uri = parse_url($request->getUri(), PHP_URL_PATH);

    return $this->render("pages/single-product.html.twig", [
      'product' => $productid,
      'translator' => $translator,
      'hero_image' => $hero_image,
      'price_bullets' => $price_bullets['bullets'],
      'bullets_extra' => $bullets,
      'des_with_dropdown' => $des_with_dropdown,
      'desc_with_bullets' => $desc_with_bullets,
      'dropdown_last' => $dropdown,
      'faq' => $faq,
      'table' => $table,
      'product_value' => $uri,
      'desc' => $desc,
      'imgdivider' => $imgdivider,
    ]);
  }

  private function getPrevious() {
    $referer = $this->request->headers->get('referer');

    if(!empty($referer)) {
      return parse_url($referer, PHP_URL_PATH);
    }
    return null;
  }
}
