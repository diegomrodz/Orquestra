var OrquestraUser = angular.module('OrquestraUser', ['ui.router']);

var APP_URL = $("#APP_URL").val();

function view(path) {
    return APP_URL + "/user/" + path;
}

function api_v1(path) {
    return APP_URL + "/api/v1/" + path;
}

function attr(dest, src) {
    for (var e in src) {
        dest[e] = src[e];
    }
}

OrquestraUser.run([
    function () {
        
    }
]);

OrquestraUser.factory('Device', ['PinRepository',
    function (PinRepository) {
        var Device = new Function();
        
        Device.prototype.pins = function () {
            return PinRepository.byDevice(this.id);
        };
        
        return Device;
    }
]);

OrquestraUser.factory('Pin', [
    function () {
        var Pin = new Function();
        
        return Pin;
    }    
]);

OrquestraUser.factory('User', ['DeviceRepository',
    function (DeviceRepository) {
        var User = new Function();
        
        User.prototype.devices = function () {
            return DeviceRepository.byUser(this.id);
        };
        
        return User;
    }
]);

OrquestraUser.service('Breadcumb', [
    function () {
        var service = this;
        
        service.title = "Teste";
        
        service.items = [];
    }
]);

OrquestraUser.service('CurrentUser', ['$http', '$q', 'User',
    function ($http, $q, User) {
        var service = this;
        
        var _user = false;
        
        service.get = function () {
            var deferred = $q.defer();
            
            if ( ! _user) {
                $http.get(api_v1("user")).then(
                    function (res) {
                        var user = new User(res.data.id);
                        
                        _.extend(user, res.data);
                        
                        _user = user;
                        
                        deferred.resolve(_user);
                    }
                );
            } else {
                deferred.resolve(_user);
            }
            
            return deferred.promise;
        };
    }
]);

OrquestraUser.service('DeviceRepository', ['$http', '$q', 'Device',
    function ($http, $q, Device) {
        var repository = {};
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1("device/" + id)).then(
                function (res) {
                    var device = new Device();
                        
                    attr(device, res.data);
                    
                    deferred.resolve(device);
                }
            );
            
            return deferred.promise;
        };
        
        repository.byUser = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1("device/byUser/" + id)).then(
                function (res) {
                    var devices = _.map(res.data, function (json) {
                        var device = new Device();
                        
                        attr(device, json);
                        
                        return device;
                    });
                    
                    deferred.resolve(devices);
                }
            );
            
            return deferred.promise;
        };
        
        return repository;
    }
]);

OrquestraUser.service('PinRepository', ['$q', '$http', 'Pin',
    function ($q, $http, Pin) {
        var repository = {};
        
        repository.byDevice = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1("pin/byDevice/" + id)).then(
                function (res) {
                    var pins = _.map(res.data, function (json) {
                        var pin = new Pin();
                        
                        attr(pin, json);
                        
                        return pin;
                    });
                    
                    deferred.resolve(pins);
                }
            );
            
            return deferred.promise;
        };
        
        return repository;
    }
]);

OrquestraUser.controller('BreadcumbCtrl', ['$scope', 'Breadcumb',
    function ($scope, Breadcumb) {
        $scope.breadcumb = Breadcumb;
    }
])

OrquestraUser.controller('DashboardIndexCtrl', ['$scope', 'Breadcumb',
    function ($scope, Breadcumb) {
        Breadcumb.title = "Dashboard";
        Breadcumb.items = [{ text: 'Dashboard' }];
        
        $scope.test = "User Dashboard Index";
    }
]);

OrquestraUser.controller('DeviceDetailCtrl', [
    '$scope', '$stateParams', 'Breadcumb', 'DeviceRepository', 'PinRepository',
    function ($scope, $stateParams, Breadcumb, DeviceRepository, PinRepository) {
        
        Breadcumb.items = [
            { url: 'home', text: 'Dashboard' },
            { text: 'Dispositivo' }
        ];
        
        DeviceRepository.find($stateParams.deviceId).then(
            function (device) {
                $scope.device = device;
                
                Breadcumb.title = device.nickname;
                
                PinRepository.byDevice(device.id).then(
                    function (pins) {
                        $scope.pins = pins;
                    }
                );
            }
        );
        
    }
]);

OrquestraUser.controller('FixedButtonCtrl', ['$scope',
    function ($scope) {
        
    }
]);

OrquestraUser.controller('LeftNavbarCtrl', ['$scope', 'CurrentUser',
    function ($scope, CurrentUser) {
        
        CurrentUser.get().then(
            function (user) {
                $scope.user = user;
                
                user.devices().then(
                    function (devices) {
                        $scope.devices = devices;
                    }
                );
            }
        );
        
    }
]);

OrquestraUser.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    MainContent: {
                        templateUrl: view('dashboard')
                    }
                }
            })
            
            .state('device_create', {
                url: '/device/create',
                views: {
                    MainContent: {
                        templateUrl: view('device/create')
                    }
                }
            })
            
            .state('device_detail', {
                url: '/device/{deviceId}',
                views: {
                    MainContent: {
                        templateUrl: view('device/detail')
                    }
                }
            });
        
    }
]);