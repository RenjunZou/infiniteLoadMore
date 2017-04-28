angular.module('ion-load-more')
.directive('loadMore', function loadMore($ionicGesture, $timeout) {
    return {
        restrict: 'E',
        require: '^^$ionicScroll',
        scope: {
            onLoad: '&',
            distance: '=',
            spinner: '='
        },
        template: '<div style="text-align: center; height: 60px; line-height: 60px" ng-if="loadOptions.loading"><ion-spinner icon="{{loadOptions.spinner}}"></ion-spinner></div>',
        link: function (scope, element, attrs, scrollCtrl) {
            scope.loadOptions = {
                reach_load_high: false,
                timeout: null,
                distance: scope.distance || '60',
                loading: false,
                spinner: scope.spinner || 'android'
            };

            var start = function(){
                scope.loadOptions.loading = true;
                var q = scope.onLoad()

                if (q && q.then) {
                    q['finally'](function() {
                        scope.$broadcast('scroll.loadMoreComplete')
                    });
                }
            };

            scope.$on('scroll.loadMoreComplete', function(){
                $timeout(function(){
                    scope.loadOptions.loading = false;
                    scrollCtrl.scrollView.resize();
                }, 500)
            });

            var onDrag = function (e) {
                e.gesture.srcEvent.preventDefault();
                e.gesture.preventDefault();

                switch (e.type) {
                    case 'dragstart':
                        // might do something here
                        break;
                    case 'drag':
                        scope.loadOptions.reach_load_high = scrollCtrl.scrollView.__scrollTop - scrollCtrl.scrollView.__maxScrollTop > scope.loadOptions.distance;
                        break;
                    case 'dragend':
                        if(scope.loadOptions.reach_load_high && !scope.loadOptions.loading && !scope.loadOptions.timeout){
                            scope.loadOptions.reach_load_high = false
                            start()
                        }
                        break;
                }
            };

            $ionicGesture.on('drag dragstart dragend', onDrag, scrollCtrl.$element);
        }
    }
})
