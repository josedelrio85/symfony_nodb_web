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
    $hero = $this->repo->getKeyDataProducts($productid, 'hero');
    $previous = $this->getPrevious();
    $img = null;

    // dump($previous);
    // dump($hero); 
    // dump($productid); 
    // dump($request->getUri());
    
    // dump(parse_url($this->request->headers->get('referer'), PHP_URL_PATH));
    // die();

    if(is_null($previous)) {
      $hero_image = $hero['images']['image1'];
    } else {
      switch($productid) {
        case 'plena_plus':
          switch($previous) {
            case '/seguros-salud-familias':
              $img = 'image1';
            break;
            case '/seguros-salud-individual':
              $img = 'image2';
            break;
            case '/seguros-salud-embarazadas':
              $img = 'image3';
            break;
          }
        break;
        case 'plena_vital':
          switch($previous) {
            case '/seguros-salud-familias':
              $img = 'image1';
            break;
            case '/seguros-salud-individual':
              $img = 'image2';
            break;
            case '/seguros-salud-embarazadas':
              $img = 'image3';
            break;
          }
        break;
        case 'plena_extra':
        case 'plena':
        case 'go':
          switch($previous) {
            case '/seguros-salud-familias':
              $img = 'image1';
            break;
            case '/seguros-salud-individual':
              $img = 'image2';
            break;
          }
        break;
        break;
        case 'senior':
        case 'dental_familia':
        case 'dental_max':
          $img = 'image1';
        break;
        case 'negocios':
        case 'negocios_extra':
          switch($previous) {
            case '/seguros-salud-empresa':
              $img = 'image1';
            break;
            case '/seguros-salud-autonomos':
              $img = 'image2';
            break;
          }
        break;
        case 'empresa':
        case 'empresa_extra':
          switch($previous) {
            case '/seguros-salud-empresa-extra':
              $img = 'image1';
            break;
            case '/seguros-salud-empresa':
              $img = 'image2';
            break;
          }
        break;
        default:
          $img = 'image1';
      }
      if(is_null($img)){
        $img = "image1";
      }
      $hero_image = $hero['images'][$img];
    }

    $price_bullets = $this->repo->getKeyDataProducts($productid,'price_with_details');
    $bullets = $this->repo->getKeyDataProducts($productid,'bullets');
    $des_with_dropdown = $this->repo->getKeyDataProducts($productid,'des_with_dropdown');
    $desc_with_bullets = $this->repo->getKeyDataProducts($productid,'desc_with_bullets');
    $dropdown = $this->repo->getKeyDataProducts($productid,'dropdown');
    $faq = $this->repo->getKeyDataProducts($productid,'faq');
    $table = $this->repo->getKeyDataProducts($productid,'extra');
    // dump($price_bullets);die();
    // dump($bullets);die();
    // dump($des_with_dropdown);die();
    // dump($desc_with_bullets);die();
    // dump($dropdown);die();
    // dump($faq);die();
    // dump($table);  die();
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
      'table' => !empty($table) ? $table['table'] : null,
      'product_value' => $uri,
      ]);
  }

  private function getPrevious() {
    // $host = $this->request->getScheme(). "://" . $this->request->headers->get('host') .'/';
    $referer = $this->request->headers->get('referer');

    if(!empty($referer)) {
      // $previous = str_replace($host, '', $referer);
      return parse_url($referer, PHP_URL_PATH);
    }
    return null;
  }
}
