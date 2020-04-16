<?php

namespace App\Repository;

use Symfony\Component\Translation\Loader\YamlFileLoader;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Finder\Finder;

class i18nRepository{
  protected $productConfig = [];
  protected $z = [];
  protected $index;

  public function __construct(string $rootPath) {
    $basedir = $rootPath .DIRECTORY_SEPARATOR.'translations';
    $landings = $basedir.DIRECTORY_SEPARATOR.'landings'.DIRECTORY_SEPARATOR;
    $products = $basedir.DIRECTORY_SEPARATOR.'products'.DIRECTORY_SEPARATOR;

    $finder = new Finder();
    $arr = [
      $landings.'salud',
      $landings.'dental',
      $landings.'decesos',
      $landings.'mascotas',

      $products.'adeslas_go',
      $products.'plena',
      $products.'plena_extra',
      $products.'plena_plus',
      $products.'plena_vital',
      $products.'senior',
      $products.'decesos',
      $products.'mascotas',
      // TODO add products for negocio and dental
    ];

    $iterator = $finder->files()->in($arr);
    foreach ($iterator as $file) {
      $path = $file->getRealpath();
      $key = str_replace($basedir, '', $path);
      $exploded = explode(DIRECTORY_SEPARATOR, $key);

      if(count($exploded) > 2){
        $mainfolder = $exploded[1];
        $data = Yaml::parseFile($path);
        $fk = array_key_first($data);
        $z[$mainfolder][$fk] = $data[$fk];
        $this->productConfig = $z;
      }
    }
    // dump($this->productConfig);
    // die();
  }

  public function getMessages(){
    return $this->productConfig;
  }

  public function getKeyData($landing, $product, $key){
    if (array_key_exists($landing, $this->productConfig)){
      if (array_key_exists($product, $this->productConfig[$landing])){
        if (array_key_exists($key, $this->productConfig[$landing][$product])){
          return $this->productConfig[$landing][$product][$key];
        }
      }
    }
    return [];
  }
}