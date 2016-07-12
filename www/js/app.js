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

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.estudiantes', {
        url: '/estudiantes/:id_curso',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '',
                // controller: function ($timeout) {
                //     $timeout(function () {
                //         document.getElementById('fab-friends').classList.toggle('on');
                //     }, 900);
                // }
            }
        }
    })

    .state('app.evaluar', {
        url: '/evaluar/:id_estudiante',
        views: {
            'menuContent': {
                templateUrl: 'templates/evaluar.html',
                controller: 'EvaluarCtrl'
             }
        }
    })

    // .state('app.gallery', {
    //     url: '/gallery',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/gallery.html',
    //             controller: 'GalleryCtrl'
    //         }
                        
    //     }
    // })
 

 //            .state('app.dash', {
 //        url: '/dash',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/dash.html',
 //                controller: 'DashCtrl'
 //             }
 //        }
 //    })

 //        .state('app.informes', {
 //        url: '/informes',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/informes.html',
 //                controller: 'InformesCtrl'
 //             }
 //        }
 //    })
 //          .state('app.alertas', {
 //        url: '/alertas',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/alertas.html',
 //                controller: 'AlertasCtrl'
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


 //      .state('app.test-letrasa', {
 //        url: '/test-letrasa',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasa.html',
 //                controller: 'TestLetrasACtrl'
 //             }
 //        }
 //    })
 //        .state('app.test-letrasb', {
 //        url: '/test-letrasb',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasb.html',
 //                controller: 'TestLetrasBCtrl'
 //             }
 //        }
 //    })
 //          .state('app.test-letrasc', {
 //        url: '/test-letrasc',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasc.html',
 //                controller: 'TestLetrasCCtrl'
 //             }
 //        }
 //    })
 //            .state('app.test-letrasd', {
 //        url: '/test-letrasd',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasd.html',
 //                controller: 'TestLetrasDCtrl'
 //             }
 //        }
 //    })
 //              .state('app.test-letrase', {
 //        url: '/test-letrase',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrase.html',
 //                controller: 'TestLetrasECtrl'
 //             }
 //        }
 //    })
 //                .state('app.test-letrasf', {
 //        url: '/test-letrasf',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasf.html',
 //                controller: 'TestLetrasFCtrl'
 //             }
 //        }
 //    })
 //                  .state('app.test-letrasg', {
 //        url: '/test-letrasg',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasg.html',
 //                controller: 'TestLetrasGCtrl'
 //             }
 //        }
 //    })
 //                    .state('app.test-letrash', {
 //        url: '/test-letrash',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrash.html',
 //                controller: 'TestLetrasHCtrl'
 //             }
 //        }
 //    })
 //                      .state('app.test-letrasi', {
 //        url: '/test-letrasi',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasi.html',
 //                controller: 'TestLetrasICtrl'
 //             }
 //        }
 //    })
 //                        .state('app.test-letrasj', {
 //        url: '/test-letrasj',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasj.html',
 //                controller: 'TestLetrasJCtrl'
 //             }
 //        }
 //    })
 //                          .state('app.test-letrask', {
 //        url: '/test-letrask',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrask.html',
 //                controller: 'TestLetrasKCtrl'
 //             }
 //        }
 //    })
 //                            .state('app.test-letrasl', {
 //        url: '/test-letrasl',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasl.html',
 //                controller: 'TestLetrasLCtrl'
 //             }
 //        }
 //    })
 //                              .state('app.test-letrasm', {
 //        url: '/test-letrasm',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasm.html',
 //                controller: 'TestLetrasMCtrl'
 //             }
 //        }
 //    })
 //                                .state('app.test-letrasn', {
 //        url: '/test-letrasn',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasn.html',
 //                controller: 'TestLetrasNCtrl'
 //             }
 //        }
 //    })
 //                                  .state('app.test-letrasn2', {
 //        url: '/test-letrasn2',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasn2.html',
 //                controller: 'TestLetrasN2Ctrl'
 //             }
 //        }
 //    })
 //                                    .state('app.test-letraso', {
 //        url: '/test-letraso',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letraso.html',
 //                controller: 'TestLetrasOCtrl'
 //             }
 //        }
 //    })
 //                                      .state('app.test-letrasp', {
 //        url: '/test-letrasp',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasp.html',
 //                controller: 'TestLetrasPCtrl'
 //             }
 //        }
 //    })
 //                                        .state('app.test-letrasq', {
 //        url: '/test-letrasq',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasq.html',
 //                controller: 'TestLetrasQCtrl'
 //             }
 //        }
 //    })
 //                                          .state('app.test-letrasr', {
 //        url: '/test-letrasr',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasr.html',
 //                controller: 'TestLetrasRCtrl'
 //             }
 //        }
 //    })
 //                                            .state('app.test-letrass', {
 //        url: '/test-letrass',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrass.html',
 //                controller: 'TestLetrasSCtrl'
 //             }
 //        }
 //    })
 //                                              .state('app.test-letrast', {
 //        url: '/test-letrast',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrast.html',
 //                controller: 'TestLetrasTCtrl'
 //             }
 //        }
 //    })
 //                                                .state('app.test-letrasu', {
 //        url: '/test-letrasu',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasu.html',
 //                controller: 'TestLetrasUCtrl'
 //             }
 //        }
 //    })  .state('app.test-letrasv', {
 //        url: '/test-letrasv',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasv.html',
 //                controller: 'TestLetrasVCtrl'
 //             }
 //        }
 //    })
 //      .state('app.test-letrasw', {
 //        url: '/test-letrasw',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasw.html',
 //                controller: 'TestLetrasWCtrl'
 //             }
 //        }
 //    })
 //        .state('app.test-letrasx', {
 //        url: '/test-letrasx',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasx.html',
 //                controller: 'TestLetrasXCtrl'
 //             }
 //        }
 //    })
 //          .state('app.test-letrasy', {
 //        url: '/test-letrasy',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasy.html',
 //                controller: 'TestLetrasYCtrl'
 //             }
 //        }
 //    })
 //            .state('app.test-letrasz', {
 //        url: '/test-letrasz',
 //        views: {
 //            'menuContent': {
 //                templateUrl: 'templates/test-letrasz.html',
 //                controller: 'TestLetrasZCtrl'
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
        console.log(sessionStorage);
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
