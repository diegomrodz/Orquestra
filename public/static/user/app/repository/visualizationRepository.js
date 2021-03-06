OrquestraUser.service('VisualizationRepository', ['$http', '$q', 'Visualization', 'VisualizationData',
    function ($http, $q, Visualization, VisualizationData) {
        var repository = {};
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1("visualization/find/" + id)).then(
                function (res) {
                    var visualization = new Visualization();
                        
                    attr(visualization, res.data);
                    
                    deferred.resolve(visualization);
                }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (visualization) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(visualization);
            
            $http.post(api_v1("visualization/create"), data).then(
                function (res) {
                    visualization.id = res.data.id;
                    
                    deferred.resolve(visualization);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        
        repository.byDevice = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1("visualization/byDevice/" + id)).then(
                function (res) {
                    var visualizations = _.map(res.data, function (json) {
                        var visualization = new Visualization();
                        
                        attr(visualization, json);
                        
                        return visualization;
                    });
                    
                    deferred.resolve(visualizations);
                }
            );
            
            return deferred.promise;
        };
        
        repository.dataAll = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1("visualization/data/" + id + "/all")).then(
                function (res) {
                    var data = _.map(res.data, function (json) {
                        var vd = new VisualizationData();
                        
                        attr(vd, json);
                        
                        return vd;
                    });
                    
                    deferred.resolve(data);
                }
            );
            
            return deferred.promise;
        };
        
        return repository;
    }
]);