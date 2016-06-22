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