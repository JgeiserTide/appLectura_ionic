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
                    sessionService.destroy('id_docente');
                    sessionService.destroy('id_curso');
                    sessionService.destroy('nombre_curso');
                    sessionService.destroy('id_estudiante_actual');
                    sessionService.store('id_docente', parseInt(response.user.id));
                    sessionService.store('id_curso', parseInt(response.user.curso_id));
                    $state.go('app.home');
                })
                .error(function(){
                    $scope.loginError = true;
                    $scope.loginErrorText = error.data.error;
                    console.log($scope.loginErrorText);
                })
            });
        }
 
})

.controller('HomeCtrl', function($http, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, sessionService) {

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
            $http.get('http://applectura.tide.cl/api/app/users/' + sessionService.get('id_docente'))
                        .success(function(response) {
                            $scope.user = response.data;
                            sessionService.store('nombre_curso', response.data.curso);

                            $http.get('http://localhost:8000/api/getDatosCurso/', {
                                params: { id_docente: sessionService.get('id_docente'), 
                                          id_curso: sessionService.get('id_curso'),
                                        }})
                                .success(function(response) {
                                    $scope.datos_curso = response;
                                });
                        });
    };
    $scope.init();
})

.controller('EstudiantesCtrl', function($http, $scope, $stateParams, $timeout, $state, ionicMaterialInk, ionicMaterialMotion, sessionService) {

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    // ionicMaterialMotion.fadeSlideInRight();

    // // Set Ink
    // ionicMaterialInk.displayEffect();

    $scope.estudiante = parseInt(sessionService.get('id_estudiante_actual'));

    $scope.init = function() {
        // console.log(sessionService.get('id_curso'));
            // $http.get(varURL+'/api/app/users/' + id)
            $http.get('http://applectura.tide.cl/api/getUsuariosCurso/' + sessionService.get('id_curso'))
            // $http.get('http://applectura.tide.cl/api/getUsuariosCurso/' + $stateParams.id_curso)
                        .success(function(response) {
                            $scope.curso = response.data;
                            console.log(response.data);
                            if(sessionService.get('id_estudiante_actual') ){
                                $http.get('http://localhost:8000/api/getEvaluaciones/', {
                                    params: { id_estudiante: sessionService.get('id_estudiante_actual'), 
                                              id_docente: sessionService.get('id_docente'), 
                                              id_curso: sessionService.get('id_curso'),
                                              mes_evaluacion: $scope.mes,
                                            }})
                                                .success(function(response) {
                                                    $scope.evaluaciones = response;
                                                    console.log(response);
                                                });
                            }
                        });
    };




    $scope.cambioEstudiante = function(id_estudiante) {
        $scope.estudiante = id_estudiante;

        for (var i = 0; i < $scope.curso.length; i++) {
                if ($scope.curso[i].id == $scope.estudiante) {
                     $scope.estudiante_Nombre = $scope.curso[i].name;
                    sessionService.store('id_estudiante_actual', id_estudiante)
                }
            }
        $http.get('http://localhost:8000/api/getEvaluaciones/', {
            params: { id_estudiante: sessionService.get('id_estudiante_actual'), 
                      id_docente: sessionService.get('id_docente'), 
                      id_curso: sessionService.get('id_curso'),
                      mes_evaluacion: $scope.mes,
                    }})
                        .success(function(response) {
                            $scope.evaluaciones = response;
                            console.log(response);
                        });
    }

    $scope.init();
})

.controller('EvaluarCtrl', function($http, $scope, $timeout, $state, $ionicPopup, ionicMaterialInk, ionicMaterialMotion, sessionService) {


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

    $scope.mes = 'Marzo';
    $scope.estudiante = null;

    $scope.init = function() {
        $http.get('http://applectura.tide.cl/api/getUsuariosCurso/' + sessionService.get('id_curso'))
            .success(function(response) {
                $scope.curso = response.data;
                console.log(response.data);
            });
        };

    $scope.guardarEstudiante = function(id_estudiante, nombre_estudiante) {
        console.log(nombre_estudiante);
        sessionService.destroy('id_estudiante_actual');
        sessionService.store('id_estudiante_actual', parseInt(id_estudiante));
        sessionService.destroy('nombre_estudiante_actual');
        sessionService.store('nombre_estudiante_actual', nombre_estudiante);
        $state.go('app.evaluar');
    }

    $scope.comenzarEvaluacion = function() {

        // console.log($scope.estudiante);
        if(!$scope.estudiante){
             $scope.data = {};
              var myPopup = $ionicPopup.show({
                title: 'Seleccione un Estudiante',
                buttons: [
                  { text: 'OK' , type: 'button-positive',},
                ]
              });
        }else{
            for (var i = 0; i < $scope.curso.length; i++) {
                if ($scope.curso[i].id == $scope.estudiante) {
                    // console.log($scope.curso[i].name);
                    sessionService.store('id_estudiante_actual', $scope.estudiante)
                }
            }

            // console.log(sessionService.get('id_estudiante_actual'));
            // console.log(sessionService.get('id_docente'));
            // console.log(sessionService.get('id_curso'));

        $http.get('http://localhost:8000/api/getEvaluacion/', {
            params: { id_estudiante: sessionService.get('id_estudiante_actual'), 
                      id_docente: sessionService.get('id_docente'), 
                      id_curso: sessionService.get('id_curso'),
                      mes_evaluacion: $scope.mes,
                    }})
                        .success(function(response) {
                            // $scope.curso = response.data;
                            console.log(Object.keys(response).length);
                            if(Object.keys(response).length == 0){
                                    $http.post('http://localhost:8000/api/app/evaluaciones', {
                                    id_estudiante: sessionService.get('id_estudiante_actual'), 
                                    id_docente: sessionService.get('id_docente'), 
                                    id_curso: sessionService.get('id_curso'),
                                    mes_evaluacion: $scope.mes,
                                    }).success(function(response) {
                                       sessionService.destroy('id_evaluacion')
                                       sessionService.store('id_evaluacion', parseInt(response.data.id));
                                       sessionService.destroy('evaluacion')
                                       sessionService.store('evaluacion', response.data.evaluacion);
                                       $state.go('app.evaluacion');
                                    }).error(function(){
                                      console.log("error");
                                    });
                            }else{
                                console.log(response[0].id + '1111');
                                sessionService.destroy('id_evaluacion')
                                sessionService.store('id_evaluacion', parseInt(response[0].id));
                                $state.go('app.evaluacion');
                            }
                        }).error(function(){
                          console.log("error");
                    });
        }
    };

    $scope.cambioEstudiante = function(id_estudiante) {
        $scope.estudiante = id_estudiante;
    }

    $scope.cambioMes = function(mesSeleccionado) {
        $scope.mes = mesSeleccionado;
    }

    $scope.init();
})

.controller('EvaluacionCtrl', function($scope, $stateParams, $timeout, $http, ionicMaterialInk, ionicMaterialMotion, sessionService) {


    $scope.i = 0;
    $scope.letras = ["a", "b", "c", "ch", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "n2", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    

    $scope.init = function() {
        console.log(sessionService.get('id_evaluacion'));
            $http.get('http://localhost:8000/api/app/evaluaciones/'+sessionService.get('id_evaluacion') )
                        .success(function(response) {
                            $scope.evaluacion = response.data;
                            $scope.detalleEvaluacion =JSON.parse($scope.evaluacion.evaluacion);
                            $scope.imageUrl = "img/letras/"+ $scope.letras[$scope.i] +"-todas.svg";
                            $scope.siguiente = true;
                            if($scope.detalleEvaluacion[$scope.letras[$scope.i]][0] != true && $scope.detalleEvaluacion[$scope.letras[$scope.i]][0] != false){
                                $scope.detalleEvaluacion[$scope.letras[$scope.i]][0] = false;
                            }
                            if($scope.detalleEvaluacion[$scope.letras[$scope.i]][1] != true && $scope.detalleEvaluacion[$scope.letras[$scope.i]][1] != false){
                                $scope.detalleEvaluacion[$scope.letras[$scope.i]][1] = false;
                            }
                            $scope.botones = true;
                        });
    };

    // var letrasRand = shuffle(letras);

    $scope.sgteLetra = function() {
        //ordenadas
        if ($scope.i<=$scope.letras.length-2){
            console.log($scope.detalleEvaluacion[$scope.letras[$scope.i]]);
            
            $scope.i++;

            if($scope.detalleEvaluacion[$scope.letras[$scope.i]][0] != true && $scope.detalleEvaluacion[$scope.letras[$scope.i]][0] != false){
                $scope.detalleEvaluacion[$scope.letras[$scope.i]][0] = false;
            }
            if($scope.detalleEvaluacion[$scope.letras[$scope.i]][1] != true && $scope.detalleEvaluacion[$scope.letras[$scope.i]][1] != false){
                $scope.detalleEvaluacion[$scope.letras[$scope.i]][1] = false;
            }
            $scope.imageUrl = "img/letras/"+ $scope.letras[$scope.i] +"-todas.svg";
        }else{
            $scope.siguiente = false;
            ///guardar
            $http.put('http://localhost:8000/api/app/evaluaciones/'+sessionService.get('id_evaluacion'), {
                                evaluacion: JSON.stringify($scope.detalleEvaluacion), 
                                }).success(function(response) {
                                  console.log('guardddo');
                                }).error(function(){
                                  console.log("error");
                                });
        }

        //Desordenadas

        // if (i<letrasRand.length)
        // {
        //     $scope.detalleEvaluacion[letrasRand[i]][0]=$scope.checkGrafema;
        //     $scope.detalleEvaluacion[letrasRand[i]][1]=$scope.checkFonema;
        //     console.log($scope.detalleEvaluacion[letrasRand[i]]);
        //     i++;
        //     $scope.imageUrl = "img/letras/"+ letrasRand[i] +"-todas.svg";
        // }else{
        //     $scope.siguiente = false;
        // }

    };


    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    $scope.init()
})


.controller('GalleryCtrl', function($http, $scope, $stateParams, $timeout,  ionicMaterialInk, ionicMaterialMotion, sessionService) {
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

    $scope.nombre_curso = sessionService.get('nombre_curso');
    $scope.nombre_estudiante = sessionService.get('nombre_estudiante_actual');
    
    $scope.init = function() {
        $http.get('http://localhost:8000/api/getEvaluaciones/', {
            params: { id_estudiante: sessionService.get('id_estudiante_actual'), 
                      id_docente: sessionService.get('id_docente'), 
                      id_curso: sessionService.get('id_curso'),
                    }})
                        .success(function(response) {
                            // $scope.curso = response.data;
                            console.log(Object.keys(response).length);
                        }).error(function(){
                                      console.log("error");
                                    });
                    }
    $scope.init();
})

.controller('AlertasCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, sessionService) {
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
})

.controller('InformesCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, sessionService) {
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
})

// 

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
