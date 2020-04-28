<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ProductService;
use App\Repository\i18nRepository;

class IndexController extends AbstractController {

  private $prodserv;
  private $repo;

  public function __construct(i18nRepository $repo, ProductService $prodserv) {
    $this->prodserv = $prodserv;
    $this->repo = $repo;
  }

  public function index(Request $request, TranslatorInterface $translator) {

    $mainelements = $this->prodserv->getMain();
    $firstchildrens = $this->prodserv->getFirstChildren();
    $secondChildrens = $this->prodserv->getSecondChildren();

    $hero = $this->repo->getSimpleData('hero');
    $cards = $this->repo->getSimpleData('cards');
    // dump($mainelements); dump($firstchildrens); dump($secondChildrens);die();
    
    return $this->render("pages/index.html.twig", [
      'translator' => $translator,
      'mainelements' => $mainelements,
      'firstchildrens' => $firstchildrens,
      'secondChildrens' => $secondChildrens,
      'hero' => $hero,
      'cards' => $cards,
    ]);
  }
}
