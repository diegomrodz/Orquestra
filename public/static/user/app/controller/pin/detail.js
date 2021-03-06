OrquestraUser.controller('PinDetailCtrl', ['$scope', '$stateParams', 'Breadcumb', 'PinRepository', 'PinDataRepository',
    function ($scope, $stateParams, Breadcumb, PinRepository, PinDataRepository) {
        Breadcumb.items = [
            { url: 'home', text: 'Dashboard' },
            { url: 'device_detail({ deviceId: ' + $stateParams.deviceId + '})', text: 'Dispositivo' },
            { text: 'Pino' }
        ];
        
        $scope.chartOptions = {
            legend: {
                show: true,
                container: "#chart-legends"
            },
            
            series: {
                lines: {
                    lineWidth: 1
                }
            },
            
            xaxis: {
                mode: "time",
                timezone: "browser",
                position: "bottom",
                timeFormat: "%H:%M:%S"
            }
        };
        
        PinRepository.find($stateParams.pinId).then(
            function onSuccess (pin) {
                $scope.pin = pin;
                
                Breadcumb.title = pin.name;
                
                PinDataRepository.byPin(pin.id).then(
                    function onSuccess (list) {
                        $scope.chartDataset = [
                            {
                                color: "blue",
                                label: pin.name,
                                shadowSize: 0,
                                data: _.map(list, function (e) {
                                    return [new Date(e.created_at), e.value];
                                })
                            }
                        ];
                    },
                    function onError (res) {
                        alert("Não foi possivel obter os dados do pino.");
                    }
                );
            },
            function onError () {
                alert("Não foi possivel obter informações do pino");
            }
        );
    }
]);
