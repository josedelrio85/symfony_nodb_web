<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class C2CPopupController extends AbstractController {

  public function __construct() {}

  public function index(){

    return $this->render('components/click-to-call-popup/click-to-call-popup.html.twig');
	}
}
