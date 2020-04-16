<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Yaml\Yaml;
use App\Loader\YamlProductLoader;

class ProductService {
  protected $productConfig;
  protected $requestStack;

  public function __construct(RequestStack $requestStack, string $rootPath) {
    $configDir = $rootPath .DIRECTORY_SEPARATOR.'config';
    $this->productConfig = Yaml::parseFile($configDir.DIRECTORY_SEPARATOR.'product_config.yml');
  }

  public function getProducts() {
    $children = [];
    foreach($this->productConfig['products'] as $i => $data){
      $children[$i] = $data['name'];
    }
    return $children;
  }

  public function getMain() {
    $elements = $this->productConfig['products'];
    $output = [];
    foreach($elements as $el) {
      // $output[] = $el['name'];
      $output[$el['name']]['name'] = $el['name'];
      $output[$el['name']]['steps'] = $el['steps'];

    }
    return $output;
  }

  public function getFirstChildren(){
    $elements = $this->productConfig['products'];
    $output = [];
      foreach($elements as $el) {
        foreach($el['children'] as $ch) {
          // $output[$el['name']][] = $ch['name'];
          $output[$el['name']][$ch['name']]['name'] = $ch['name'];
          if(array_key_exists('path', $ch)){
            $output[$el['name']][$ch['name']]['path'] = $ch['path'];
          }
        }
    }
    return $output;
  }

  public function getSecondChildren(){
    $elements = $this->productConfig['products'];
    $output = [];
      foreach($elements as $el) {
        foreach($el['children'] as $ch) {
          if(!is_null($ch['children'])){
            foreach($ch['children'] as $r){
              // $output[$ch['name']][] = $r['name'];
              $output[$ch['name']][$r['name']]['name'] = $r['name'];
              $output[$ch['name']][$r['name']]['path'] = $r['path'];
            }
          }
        }
    }
    return $output;
  }

  public function getArea($sc) {
    $elements = $this->productConfig['products'];
    $output = [];
    foreach($elements as $el) {
      foreach($el['children'] as $ch) {
        if(!is_null($ch['children'])){
          foreach($ch['children'] as $r){
            // print $sc."<br>"; print $r['name']."<br>"; print "-----<br>";
            if ($sc === $r['name']) {
              return $el['name'];
            }
          }
        } else {
          if ($sc === $el['name']) {
            return $el['name'];
          }
        }
      }
    }
  }
}