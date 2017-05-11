/*
 ion-load-more v1.0.0

 Copyright 2016 Renjun Zou (https://github.com/RenjunZou/)

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

angular.module('ion-load-more')
.directive('ionLoadMore', function loadMore($ionicGesture, $timeout) {
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
                scope.$apply()
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
                    scope.$apply();
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
