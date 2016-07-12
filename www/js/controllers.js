/* global angular, document, window */
'use strict';

var myApp = angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////
    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('AuthCtrl', function($scope, $location, $stateParams, $ionicHistory, $http, $state, $auth, $rootScope, sessionService) {

        $scope.loginData = {}
        $scope.loginError = false;
        $scope.loginErrorText;
 
        $scope.login = function() {
 
            var credentials = {
                email: $scope.loginData.email,
                password: $scope.loginData.password
            }
 
            $auth.login(credentials).then(function() {
                // Return an $http request for the authenticated user
                $http.get('http://jaime.diaspora.cl/api/app/authenticate/user').success(function(response){
                    // Stringify the retured data
                    var user = JSON.stringify(response.user);
 
                    // Set the stringified user data into local storage
                    localStorage.setItem('user', user);
 
                    // Getting current user data from local storage
                    $rootScope.currentUser = response.user;
                    // $rootScope.currentUser = localStorage.setItem('user');;
                    
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });

                    sessionService.store('id_docente', response.user.id);
                    sessionService.store('id_curso', response.user.curso_id);
                    $state.go('app.profile');
                })
                .error(function(){
                    $scope.loginError = true;
                    $scope.loginErrorText = error.data.error;
                    console.log($scope.loginErrorText);
                })
            });
        }
 
})

.controller('ProfileCtrl', function($http, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, sessionService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.init = function() {

            // $http.get(varURL+'/api/app/users/' + id)
            $http.get('http://applectura.tide.cl/api/app/users/' + sessionService.get('id_docente'))
                        .success(function(response) {
                            $scope.user = response.data;
                        });
    };
    $scope.init();
})

.controller('FriendsCtrl', function($http, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, sessionService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    // ionicMaterialMotion.fadeSlideInRight();

    // // Set Ink
    // ionicMaterialInk.displayEffect();

    $scope.init = function() {
        // console.log(sessionService.get('id_curso'));
            // $http.get(varURL+'/api/app/users/' + id)
            // $http.get('http://applectura.tide.cl/api/getUsuariosCurso/' + sessionService.get('id_docente'))
            $http.get('http://applectura.tide.cl/api/getUsuariosCurso/' + $stateParams.id_curso)
                        .success(function(response) {
                            $scope.curso = response.data;
                        });
    };
    $scope.init();
})

.controller('EvaluarCtrl', function($http, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.init = function() {
        // console.log(sessionService.get('id_curso'));
            // $http.get(varURL+'/api/app/users/' + id)
            // $http.get('http://applectura.tide.cl/api/getUsuariosCurso/' + sessionService.get('id_docente'))
            $http.get('http://applectura.tide.cl/api/app/users/' + $stateParams.id_estudiante)
                        .success(function(response) {
                            $scope.estudiante = response.data;
                        });
    };
    $scope.init();
})



// .controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//     $scope.$parent.showHeader();
//     $scope.$parent.clearFabs();
//     $scope.isExpanded = false;
//     $scope.$parent.setExpanded(false);
//     $scope.$parent.setHeaderFab(false);

//     // Set Motion
//     $timeout(function() {
//         ionicMaterialMotion.slideUp({
//             selector: '.slide-up'
//         });
//     }, 300);

//     $timeout(function() {
//         ionicMaterialMotion.fadeSlideInRight({
//             startVelocity: 3000
//         });
//     }, 700);

//     // Set Ink
//     ionicMaterialInk.displayEffect();
// })



// .controller('InformesCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//     $scope.$parent.showHeader();
//     $scope.$parent.clearFabs();
//     $scope.isExpanded = false;
//     $scope.$parent.setExpanded(false);
//     $scope.$parent.setHeaderFab(false);

//     // Set Motion
//     $timeout(function() {
//         ionicMaterialMotion.slideUp({
//             selector: '.slide-up'
//         });
//     }, 300);

//     $timeout(function() {
//         ionicMaterialMotion.fadeSlideInRight({
//             startVelocity: 3000
//         });
//     }, 700);

//     // Set Ink
//     ionicMaterialInk.displayEffect();
// })

// .controller('AlertasCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//     $scope.$parent.showHeader();
//     $scope.$parent.clearFabs();
//     $scope.isExpanded = false;
//     $scope.$parent.setExpanded(false);
//     $scope.$parent.setHeaderFab(false);

//     // Set Motion
//     $timeout(function() {
//         ionicMaterialMotion.slideUp({
//             selector: '.slide-up'
//         });
//     }, 300);

//     $timeout(function() {
//         ionicMaterialMotion.fadeSlideInRight({
//             startVelocity: 3000
//         });
//     }, 700);

//     // Set Ink
//     ionicMaterialInk.displayEffect();
// })

// .controller('TestLetrasACtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasBCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasCCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasDCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasECtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasFCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasGCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasHCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasICtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasJCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasKCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasLCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasMCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasNCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasN2Ctrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasOCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasPCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasQCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasRCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasSCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasTCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// }).controller('TestLetrasUCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasVCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasWCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasXCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasYCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })
// .controller('TestLetrasZCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    $scope.$parent.clearFabs();
//     $timeout(function() {
//         $scope.$parent.hideHeader();
//     }, 0);
//     ionicMaterialInk.displayEffect();
// })


// .controller('HistorialMesCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//     $scope.$parent.showHeader();
//     $scope.$parent.clearFabs();
//     $scope.isExpanded = false;
//     $scope.$parent.setExpanded(false);
//     $scope.$parent.setHeaderFab(false);

//     // Set Motion
//     $timeout(function() {
//         ionicMaterialMotion.slideUp({
//             selector: '.slide-up'
//         });
//     }, 300);

//     $timeout(function() {
//         ionicMaterialMotion.fadeSlideInRight({
//             startVelocity: 3000
//         });
//     }, 700);

//     // Set Ink
//     ionicMaterialInk.displayEffect();
// })

;
