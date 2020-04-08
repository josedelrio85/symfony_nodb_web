<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;

class IndexController extends AbstractController {

  public function __construct() {}
  // TranslatorInterface $translator
  public function index(Request $request, TranslatorInterface $translator) {
    // $slides = [];
    // for ($i = 1; $i < 2; $i++) {
    //   if ($translator->trans("{$provider}.home.slider.slide{$i}.background_image_name") ==
    //                          "{$provider}.home.slider.slide{$i}.background_image_name"  ||
    //       $translator->trans("{$provider}.home.slider.slide{$i}.background_image_name") == ""
    //   ) {
    //     continue;
    //   }

    //   array_push($slides,[
    //     'background_image_name' => "{$provider}.home.slider.slide{$i}.background_image_name",
    //     'background_image_name_mobile' => "{$provider}.home.slider.slide{$i}.background_image_name_mobile",
    //     'title_text'            => "{$provider}.home.slider.slide{$i}.title_text",
    //     'subtitle_text'         => "{$provider}.home.slider.slide{$i}.subtitle_text",
    //     'megas_text'            => "{$provider}.home.slider.slide{$i}.megas_text",
    //     'phone_text'            => "{$provider}.home.slider.slide{$i}.phone_text",
    //     'tv_text'               => "{$provider}.home.slider.slide{$i}.tv_text",
    //     'mobile_text'           => "{$provider}.home.slider.slide{$i}.mobile_text",
    //     'land_line_text'        => "{$provider}.home.slider.slide{$i}.land_line_text",
    //     'price_integer_text'    => "{$provider}.home.slider.slide{$i}.price_integer_text",
    //     'price_decimals_text'   => "{$provider}.home.slider.slide{$i}.price_decimals_text",
    //     'payment_period_text'   => "{$provider}.home.slider.slide{$i}.payment_period_text",
    //     'promo_duration'        => "{$provider}.home.slider.slide{$i}.promo_duration",
    //     'cta_icon'              => "{$provider}.home.slider.slide{$i}.cta_icon",
    //     'cta_text'              => "{$provider}.home.slider.slide{$i}.cta_text",
    //     'cta_url'               => "{$provider}.home.slider.slide{$i}.cta_url",
    //     'cta_info_text'         => "{$provider}.home.slider.slide{$i}.cta_info_text",
    //     'cta_info_url'          => "{$provider}.home.slider.slide{$i}.cta_info_url",
    //     'nav_item_label'        => "{$provider}.home.slider.slide{$i}.nav_item_label",
    //   ]);
    // }
    
    // $translator = $translator->trans("header");

    
    $route = $request->attributes->get('_route');
    $uri = $request->server->get('REQUEST_URI');

    return $this->render("pages/index.html.twig", [
      'route'     => $route,
      'uri'       => $uri,
      'translator' => $translator,
    ]);
  }
}
