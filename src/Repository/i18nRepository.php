<?php

namespace App\Repository;

use Symfony\Component\Translation\Loader\YamlFileLoader;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Finder\Finder;

class i18nRepository{
  protected $productConfig = [];
  protected $z = [];
  protected $rootPath;

  public function __construct(string $rootPath) {
    $this->rootPath = $rootPath;

    $basedir = $rootPath .DIRECTORY_SEPARATOR.'translations';
    // $basedir = $rootPath .DIRECTORY_SEPARATOR.'translations'.DIRECTORY_SEPARATOR.'landings';
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
      $products.'negocios',
      $products.'negocios_menos5',
      $products.'negocios_extra',
      $products.'negocios_extra_menos5',
      $products.'empresa',
      $products.'empresa_extra',
      $products.'dental_familia',
      $products.'dental_max',
    ];

    $iterator = $finder->files()->in($arr);
    foreach ($iterator as $file) {
      $path = $file->getRealpath();
      $key = str_replace($basedir, '', $path);
      $exploded = explode(DIRECTORY_SEPARATOR, $key);

      if(count($exploded) > 2){
        $mf = $exploded[1];
        $sf = $exploded[2];
        $data = Yaml::parseFile($path);
        $fk = array_key_first($data);
        if(count($exploded) > 4){
          $z[$mf][$sf][$fk] = $data[$fk];
        } else {
          $z[$mf][$fk] = $data[$fk];
        }
        $this->productConfig = $z;
      }
    }
  }

  public function getMessages(){
    return $this->productConfig;
  }

  public function getKeyDataLandings($landing, $product, $key){
    $alldata = $this->productConfig['landings'];
    if (array_key_exists($landing, $alldata)){
      if (array_key_exists($product, $alldata[$landing])){
        if (array_key_exists($key, $alldata[$landing][$product])){
          return $alldata[$landing][$product][$key];
        }
      }
    }
    return [];
  }

  public function getKeyDataProducts($product, $key){
    $alldata = $this->productConfig['products'];
    if (array_key_exists($product, $alldata)){
      if (array_key_exists($key, $alldata[$product])){
        return $alldata[$product][$key];
      }
    }
    return [];
  }

  public function getSimpleData($key) {
    $basedir = $this->rootPath .DIRECTORY_SEPARATOR.'translations';
    $dir = $basedir.DIRECTORY_SEPARATOR.$key;
    $finder = new Finder();
    $iterator = $finder->files()->in([$dir]);
    foreach ($iterator as $file) {
      $path = $file->getRealpath();
      $data = Yaml::parseFile($path);
      return $data[$key];
    }
    return [];
  }
}