let app = angular.module('vimsedalenApp', ['ngMaterial']);

app.controller('gameController', function ($scope, $interval, $mdDialog) {
    let pictureCollection = [
        { "picName": '1.png', "id": 1 },
        { "picName": '2.png', "id": 2 },
        { "picName": '3.png', "id": 3 },
        { "picName": '4.png', "id": 4 },
        { "picName": '5.png', "id": 5 },
        { "picName": '6.png', "id": 6 },
        { "picName": '7.png', "id": 7 },
        { "picName": '8.png', "id": 8 },
        { "picName": '9.png', "id": 9 },
        { "picName": '10.png', "id": 10 },
        { "picName": '11.png', "id": 11 },
        { "picName": '12.png', "id": 12 },
        { "picName": '13.png', "id": 13 },
        { "picName": '14.png', "id": 14 },
        { "picName": '15.png', "id": 15 },
        { "picName": '16.png', "id": 16 },
        { "picName": '17.png', "id": 17 },
        { "picName": '18.png', "id": 18 },
        { "picName": '19.png', "id": 19 },
        { "picName": '20.png', "id": 20 },
    ];

    let score = 0;
    let timeLeft = 100;
    let round = 1;
    let playing = false;
    let totalRounds = 10;
    let speed = 50;


    let gameloop = function () {

        if (playing == false) {
            $scope.timeLeft = timeLeft;
            $scope.score = score;
            $scope.round = round;

            let startGame = $mdDialog.confirm()
                .parent(angular.element(document.querySelector('#info')))
                .title('Välkommen till Vimsedalen!')
                .textContent('Tryck på "Spela" när du är redo.')
                .ariaLabel('Spela')
                .ok('Spela')
                .cancel('Nej, tack')

            $mdDialog.show(startGame).then(function () {
                playing = true;
                timer = $interval(function () {
                    if ($scope.timeLeft > 0) {
                        $scope.timeLeft = --$scope.timeLeft;
                    }
                }, speed);
            }, function () {
                window.location.reload();
            });

        }

        $scope.pictures = shuffle(pictureCollection);

        let randomNumber = Math.floor(Math.random() * $scope.pictures.length);
        $scope.rightPicture = $scope.pictures[randomNumber].picName;

        let timer;

        if (playing == true) {
            timer = $interval(function () {
                if ($scope.timeLeft > 0) {
                    $scope.timeLeft = --$scope.timeLeft;
                }
            }, speed);
        }



        $scope.checkIfRightPicture = function (event) {

            if (randomNumber == event.target.id) {

                $interval.cancel(timer);
                timer = undefined;


                $scope.score = $scope.score + $scope.timeLeft;



                removeClassWrong();

                if ($scope.round == totalRounds) {


                    let startGame = $mdDialog.confirm()
                        .parent(angular.element(document.querySelector('#rules')))
                        .title('Bra jobbat!')
                        .textContent('Du har hittat hela skeppets besättning. Du fick ' + $scope.score + ' poäng. Vill du spela igen?')
                        .ariaLabel('Spela igen')
                        .ok('Spela igen!')
                        .cancel('Nej, tack')

                    $mdDialog.show(startGame).then(function () {
                        window.location.reload();
                    }, function () {
                        $mdDialog.show($mdDialog.alert()
                            .parent(angular.element(document.querySelector('#info')))
                            .title('Slutspelat för idag')
                            .textContent('Vi ses snart igen.')
                            .ariaLabel('Tack för idag')
                            .ok('Ses snart.'));
                        window.location.reload();
                    });

                }

                if (playing) {

                    $scope.timeLeft = timeLeft;

                    if ($scope.round < totalRounds) {
                        $scope.round = ++$scope.round;
                    }

                    gameloop();

                }

            } else {
                document.getElementById(event.target.id).classList.add("wrong");
            }

        }


    }
    gameloop();



});


function removeClassWrong() {
    for (let i = 0; i < 20; i++) {
        if (document.getElementById(i).classList.contains("wrong")) {
            document.getElementById(i).classList.remove("wrong");
        }
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
