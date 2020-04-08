<?php
namespace App\EventListener;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;

class LocaleListener implements EventSubscriberInterface
{

    /**
    * @var routeCollection \Symfony\Component\Routing\RouteCollection
    */
    private $routeCollection;

    /**
    * @var urlMatcher \Symfony\Component\Routing\Matcher\UrlMatcher;
    */
    private $urlMatcher;


    private $oldUrl;
    private $newUrl;
    private $languages;
    private $defaultLanguage;
    
    public function __construct(RouterInterface $router, array $languages, String $defaultLanguage)
    {
        $this->routeCollection = $router->getRouteCollection();
        $this->languages = $languages;
        $this->defaultLanguage = $defaultLanguage;
        $context = new RequestContext("/");
    }

    // To avoid different languages and redirect this routes to /es route
    public function onKernelRequest(GetResponseEvent $event)
    {
      $request = $event->getRequest();       
      $this->newUrl  = $request->getPathInfo();
      $locale = $this->checkLanguage();
      if($locale !== $this->defaultLanguage) {
        // remove last slash if exists
        $url = str_replace($this->newUrl, rtrim($this->newUrl, ' /'), $request->getRequestUri());
        // remove the locale
        $prev = str_replace('/'.$locale, null, $url);
        $pathLocale = empty($prev) ? "/" : $prev;        

        try {
          $event->setResponse(new RedirectResponse($pathLocale));
        } catch (\Symfony\Component\Routing\Exception\ResourceNotFoundException $e) {
        } catch (\Symfony\Component\Routing\Exception\MethodNotAllowedException $e) {  
        }
      }
    }
    
    private function checkLanguage(){ 
      foreach($this->languages as $language){
        if(preg_match_all("/\/$language/", $this->newUrl)){
          return $language;
        }
      }
      return $this->defaultLanguage;
    }

    // Deactivate function getSubscribedEvents() of this Listener 
    // to avoid redirections to /es when another language is matched
    public static function getSubscribedEvents()
    {
      return array(
        // must be registered before the default Locale listener
        // KernelEvents::REQUEST => array(array('onKernelRequest', 17)),
      );
    }
}