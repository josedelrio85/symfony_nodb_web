<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\Translation\TranslatorInterface;

class HeaderController extends AbstractController {

  public function __construct() {}

  public function index(){

    // $menus= [];
    // for ($i = 1; $i < 4; $i++) {
    //   if ($translator->trans("{$provider}.header.item{$i}.text") ==
    //                          "{$provider}.header.item{$i}.text"  ||
    //       $translator->trans("{$provider}.header.item{$i}.text") == ""
    //   ) {
    //     continue;
    //   }
    //   array_push($menus, [
    //     'text' => "{$provider}.header.item{$i}.text",
    //     'url'  => "{$provider}.header.item{$i}.url",
    //   ]);
    // }

    return $this->render('components/header/header.html.twig', [
      // 'header'   => $menus,
    ]);
  }
}
