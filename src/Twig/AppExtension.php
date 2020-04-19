<?php
namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Symfony\Component\HttpFoundation\RequestStack;

class AppExtension extends AbstractExtension
{
  private $requestStack;
  private $queryStr;

  public function __construct(RequestStack $requestStack)
  {
    $this->requestStack = $requestStack;
    if (is_object($this->requestStack->getCurrentRequest())) {
      $qarray = $this->requestStack->getCurrentRequest()->query->all();
      if(!empty($qarray)){
        $query = http_build_query($qarray);
        $this->queryStr = (empty($query)) ? null : $query;
      }
    }
  }

  public function getFunctions() {
    return [
      new TwigFunction('custom_routes', [$this, 'getCustomRoute']),
    ];
  }

  public function getCustomRoute(string $route) {
    $request = $this->requestStack->getCurrentRequest();
    $loc = $request->getLocale();
    if (!is_null($this->queryStr)) {
      $newroute = $route."?".$this->queryStr;
    }else{
      $newroute = $route;
    }

    if ($loc == "es"){
      return "href=".$newroute;
    } else {
      return "href=/".$loc.$newroute;
    }
  }
}