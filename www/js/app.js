// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'satellizer', 'permission', 'ngCookies'])

.run(function($ionicPlatform, $rootScope, $auth, $state, Permission) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $authProvider) {
 
  $authProvider.loginUrl = 'http://jaime.diaspora.cl/api/app/authenticate'; //or whatever your api url is

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('auth', {
        url: '/auth',
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            },
        }
    })

    .state('app.estudiantes', {
        url: '/estudiantes',
        views: {
            'tab-estudiantes': {
                templateUrl: 'templates/estudiantes.html',
                controller: 'EstudiantesCtrl'
            },
        }
    })

    .state('app.evaluar', {
        url: '/evaluar',
        views: {
            'tab-evaluar': {
                templateUrl: 'templates/evaluar.html',
                controller: 'EvaluarCtrl'
             }
        }
    })

    .state('app.evaluacion', {
        url: '/evaluacion',
        views: {
            'tab-evaluacion': {
                templateUrl: 'templates/evaluacion.html',
                controller: 'EvaluacionCtrl'
             }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            }
                        
        }
    })

    .state('app.alertas', {
        url: '/alertas',
        views: {
            'menuContent': {
                templateUrl: 'templates/alertas.html',
                controller: 'AlertasCtrl'
             }
        }
    })


    .state('app.informes', {
        url: '/informes',
        views: {
            'menuContent': {
                templateUrl: 'templates/informes.html',
                controller: 'InformesCtrl'
             }
        }
    })


    
 

 //            .state('app.dash', {
 //        url: '/dash',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/dash.html',
 //                controller: 'DashCtrl'
 //             }
 //        }
 //    })

 
 


 // .state('app.historial-mes', {
 //        url: '/historial-mes',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/historial-mes.html',
 //                controller: 'HistorialMesCtrl'
 //             }
 //        }
 //    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/auth');
})

.service('sessionService', ['$cookieStore', function ($cookieStore) {
    var localStoreAvailable = typeof (Storage) !== "undefined";
    this.store = function (name, details) {
        if (localStoreAvailable) {
            if (angular.isUndefined(details)) {
                details = null;
            } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                details = angular.toJson(details);
            };
            sessionStorage.setItem(name, details);
        } else {
            $cookieStore.put(name, details);
        };
    };

    this.persist = function(name, details) {
        if (localStoreAvailable) {
            if (angular.isUndefined(details)) {
                details = null;
            } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                details = angular.toJson(details);
            };
            localStorage.setItem(name, details);
        } else {
            $cookieStore.put(name, details);
        }
    };

    this.get = function (name) {
        if (localStoreAvailable) {
            return getItem(name);
        } else {
            return $cookieStore.get(name);
        }
    };

    this.destroy = function (name) {
        if (localStoreAvailable) {
            localStorage.removeItem(name);
            sessionStorage.removeItem(name);
        } else {
            $cookieStore.remove(name);
        };
    };

    var getItem = function (name) {
        var data;
        var localData = localStorage.getItem(name);
        var sessionData = sessionStorage.getItem(name);

        if (sessionData) {
            data = sessionData;
        } else if (localData) {
            data = localData;
        } else {
            return null;
        }

        if (data === '[object Object]') { return null; };
        if (!data.length || data === 'null') { return null; };

        if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
            return angular.fromJson(data);
        };

        return data;
    };

    return this;
}])


;
