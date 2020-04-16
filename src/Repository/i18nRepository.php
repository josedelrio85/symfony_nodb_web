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
    $basedir = $rootPath .DIRECTORY_SEPARATOR.'translations'.DIRECTORY_SEPARATOR.'landings';
    $finder = new Finder();
    $arr = [
      $basedir.DIRECTORY_SEPARATOR.'salud',
      $basedir.DIRECTORY_SEPARATOR.'dental',
      $basedir.DIRECTORY_SEPARATOR.'decesos',
      $basedir.DIRECTORY_SEPARATOR.'mascotas',
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