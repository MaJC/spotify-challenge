

var data;
var baseUrl = 'https://api.spotify.com/v1/search?q=' ;
var myApp = angular.module('myApp', [])
var typesearch;


var myCtrl = myApp.controller('myCtrl', function($scope, $http, $window) {
  $scope.audioObject = {};

  $scope.feed = {};

  $scope.searchtypes = [
    {
      'name': 'Artist',
      'value': 'artists',
      'id': 'artist'
    },
    {
      'name': 'Track',
      'value': 'tracks',
      'id': 'track'
    },
    {
      'name': 'Album',
      'value': 'albums',
      'id': 'album'
    },
  ];

  $scope.typechange = function() {
    $('#searchsong').show();
  }
 
  $scope.tracklistshow = false;
  $scope.toplistshow = false;
  $scope.testtype = '';

  $scope.getSearch = function() {
    $scope.testtype = $scope.feed.searchtype.id;
    $scope.tracklistshow = false;
    $scope.toplistshow = false;
   
    $http.get(baseUrl + $scope.track + "&type=" + $scope.testtype).success(function(response){
      if ($scope.testtype == "track") {
        $scope.data = $scope.chosentype = response.tracks.items;
      } else if ($scope.testtype == "album") {
        $scope.data = $scope.chosentype = response.albums.items;
      } else if ($scope.testtype == "artist") {
        $scope.data = $scope.chosentype = response.artists.items;
      } 
            
    })
  }

  var albumurl = 'https://api.spotify.com/v1/albums/';
  $scope.currentId = "";
 
  $scope.showalbumtracks = function(id) {
    $scope.tracklistshow = true;
    $http.get(albumurl + id + "/tracks").success(function(response){
      $scope.currentId = id;
      $scope.albumtracks = response.items;
     
    })
  }

  var toptracksurl = 'https://api.spotify.com/v1/artists/';
  $scope.artistId = "";
 
  $scope.showtoptracks = function(id) {
    $scope.toplistshow = true;
    $http.get(toptracksurl + id + "/top-tracks?country=US").success(function(response){
      $scope.artistId = id;
      $scope.toptracks = response.tracks;
    });
    
  }


  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});


