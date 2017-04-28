# infiniteLoadMore

An improved `<ion-infinite-scroll>` from **ionic-v1**. This loader only load items when drag for a certain distance and won't keep loading when the list does not fill the whole screen.

## Prerequisites
* ionic
* brower

## Setup

#### Install
`bower install 'git://github.com/RenjunZou/infiniteLoadMore.git'`
#### Import
Include the file in your `index.html`

`<script src="bower_components/infiniteLoadMore/dist/load_more.js"></script>`

## Usage
#### Basic Example
`<load-more on-load="MY_LOAD_FUNCTION()"></load-more>`
<p data-height="265" data-theme-id="0" data-slug-hash="RVpbKd" data-default-tab="result" data-user="richardzou" data-embed-version="2" data-pen-title="Ionic Infinite Load" class="codepen">See the Pen <a href="https://codepen.io/richardzou/pen/RVpbKd/">Ionic Infinite Load</a> by RenjunZou (<a href="http://codepen.io/richardzou">@richardzou</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Attributes
|Parameter|Type|Description|
|----|----|-----|
|on-load|`function`|The function that calls to load more items. Either return a promise or `$scope.$broadcast('scroll.loadMoreComplete')` when finish loading will stop the animation of loading|
|distance|`number`|To tell how much distance you should pull to trigger your load function. The default value for this is 60|
|spinner|`string`|Customise the load spinner. [More spinners](https://ionicframework.com/docs/v1/api/directive/ionSpinner/)|
