<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Yaml\Yaml;
use App\Loader\YamlProductLoader;
use App\Service\ProviderService;

class ProductService {
  protected $productConfig;
  protected $provider;
  protected $requestStack;

  public function __construct(RequestStack $requestStack, string $rootPath) {   
    $configDir = $rootPath .DIRECTORY_SEPARATOR.'config';
    $this->productConfig = Yaml::parseFile($configDir.DIRECTORY_SEPARATOR.'product_config.yml');
    $this->provider = (new ProviderService($requestStack))->getProvider();
  }

  public function getProducts() {
    $info = [];
    $names = [];
    foreach($this->productConfig[$this->provider] as $name => $data) {
      if($data['active']){
        $names[$data['position']] = $name;
        $info[$data['position']] = $data;
      }
    }
    ksort($names);
    ksort($info);

    foreach($info as $k => $data){
      $output[$names[$k]] = $data;
    }
    return $output;
  }

  public function getConfigProduct($packID) {
    $products = $this->getProducts();
    if(array_key_exists($packID, $products)){
      return $products[$packID];
    }
    return null;
  }

  public function getProductsHomepage() {
    $output = null;
    $products = $this->getProducts();
    foreach($products as $name => $data){
      if($data['homepage']){
        $output[$data['position']] = $name;
      }
    }
    ksort($output);
    return $output;
  }

  public function getProductsFiberMobile() {
    $output = null;
    $products = $this->getProducts();
    foreach($products as $name => $data){
      $output[$data['position']] = $name;
    }
    ksort($output);
    return $output;
  }

  public function getDataProductsFiberMobile() {
    $output = null;
    $products = $this->getProducts();
    foreach($products as $name => $data){
      $output[$data['position']]['path'] = $name;
      $output[$data['position']]['values'] = $data;
    }
    ksort($output);
    return $output;
  }

  public function getRelatedPacks($packID) {
    $output = null;
    $products = $this->getConfigProduct($packID);

    if(!is_null($products)) {
      foreach($products['related_packs'] as $pack => $values){
        $output[] = $values;
      }
    }
    return $output;
  }


  public function getRelatedInfo($packID) {
    $output = null;
    $products = $this->getConfigProduct($packID);

    if(!is_null($products)) {
      foreach($products['related_info'] as $pack => $values){
        $output[] = $values;
      }
    }
    return $output;
  }

  public function getProductsSpecialPortability() {
    $output = null;
    $products = $this->getProducts();
    foreach($products as $name => $data){
      if($data['active'] && $data['fijo'] === 1 && $data['movil'] === 1){
        $output[$data['position']] = $name;
      }
    }
    ksort($output);
    return $output;
  }
}
