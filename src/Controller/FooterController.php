<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\Translation\TranslatorInterface;

class FooterController extends AbstractController {

  public function __construct() {}

  public function index(){

    return $this->render('components/footer/footer.html.twig', [
      // 'translator' => $translator,
    ]);
  }
}
