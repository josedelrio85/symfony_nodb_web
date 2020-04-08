<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FooterController extends AbstractController {

  public function __construct() {}

  public function index(){

    return $this->render('components/footer/footer.html.twig', [
      'footer'   => [
        'copyright'         => "footer.copyright",
        'cookies_policy'    => "footer.cookies_policy",
        'privacy_policy'    => "footer.privacy_policy",
        'legal_information' => "footer.legal_information",
        'portability'       => "footer.portability",
      ]
    ]);
  }
}
