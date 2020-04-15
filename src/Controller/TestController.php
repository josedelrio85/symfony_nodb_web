<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\Translation\TranslatorInterface;

class TestController extends AbstractController {

  public function __construct() {}

  public function index(TranslatorInterface $translator){

    // $test = $translator->trans("go");
    // dump($test);die();

    $product = "plena";
    // $product = "go";

    return $this->render('pages/test.html.twig', [
      'translator' => $translator,
      'product' => $product,
      // 'pepe' => $test,
    ]);
  }
}
