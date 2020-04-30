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
      if ($data['active']){
        $children[$i] = $data['name'];
      }
    }
    return $children;
  }

  public function getMain() {
    $elements = $this->productConfig['products'];
    $output = [];
    foreach($elements as $el) {
      if ($el['active']){
        $output[$el['name']]['name'] = $el['name'];
        $output[$el['name']]['steps'] = $el['steps'];
        $output[$el['name']]['icon'] = $el['icon'];
        $output[$el['name']]['title'] = $el['title'];
        $output[$el['name']]['position'] = $el['position'];
        if(array_key_exists('path', $el)){
          $output[$el['name']]['path'] = $el['path'];
        }
      }
    }
    // dump($output);die();
    return $output;
  }

  public function getFirstChildren(){
    $elements = $this->productConfig['products'];
    $output = [];
    foreach($elements as $el) {
      $suptitle = $el['suptitle'];
      if(!is_null($el['children'])){
        foreach($el['children'] as $ch) {
          $output[$el['name']]['suptitle'] = $suptitle;

          $output[$el['name']][$ch['name']]['name'] = $ch['name'];
          $output[$el['name']][$ch['name']]['icon'] = $ch['icon'];
          $output[$el['name']][$ch['name']]['title'] = $ch['title'];
          $output[$el['name']][$ch['name']]['position'] = $ch['position'];

          if(array_key_exists('path', $ch)){
            $output[$el['name']][$ch['name']]['path'] = $ch['path'];
          }
        }
      }
    }
    return $output;
  }

  public function getSecondChildren(){
    $elements = $this->productConfig['products'];
    $output = [];
    foreach($elements as $el) {
      if(!is_null($el['children'])){
        foreach($el['children'] as $ch) {
          $suptitle = $ch['suptitle'];

          if(!is_null($ch['children'])){
            foreach($ch['children'] as $r){
              $output[$ch['name']]['suptitle'] = $suptitle;

              $output[$ch['name']][$r['name']]['name'] = $r['name'];
              $output[$ch['name']][$r['name']]['path'] = $r['path'];
              $output[$ch['name']][$r['name']]['icon'] = $r['icon'];
              $output[$ch['name']][$r['name']]['title'] = $r['title'];
              $output[$ch['name']][$r['name']]['position'] = $r['position'];
            }
          }
        }
      }
    }
    return $output;
  }

  public function getArea($sc) {
    $elements = $this->productConfig['products'];
    $output = [
      'area' => null,
      'family' => null,
    ];
    foreach($elements as $el) {
      if(!is_null($el['children'])){
        foreach($el['children'] as $ch) {
          if(!is_null($ch['children'])){
            foreach($ch['children'] as $r){
              // print $sc."<br>"; print $r['name']."<br>"; print "-----<br>";
              if ($sc === $r['name']) {                
                $output['area'] = $el['name'];
                $output['family'] = $ch['name'];
              }
            }
          } else {
            if ($sc === $ch['name']) {
              $output['area'] = $el['name'];
              $output['family'] = $el['name'];
            }
          }
        }
      } else {
        if ($sc === $el['name']) {
          $output['area'] = $el['name'];
          $output['family'] = $el['name'];
        }
      }
    }
    return $output;
  }
}