/*
Author: Nitin Prakash
Email ID: prakash.nitin63@gmail.com
Github: www.github.com/nitinprakash96
*/

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", "#D91F0B", "#4F0BD9"];
var currentQuote = '', currentAuthor = '';
var appURL = 'http://codepen.io/camperAvengedEndie/full/LNRWpW/';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=0 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",

    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      currentQuote = r.quote;
      currentAuthor = r.author;


if(inIframe())
{
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
}
$(".quote-text").animate({
    opacity: 0
  }, 500,
  function() {
    $(this).animate({
      opacity: 1
    }, 500);
    $('#text').text(r.quote);
  });

  $(".quote-author").animate({
      opacity: 0
    }, 200,
    function() {
      $(this).animate({
        opacity: 1
      }, 200);
      $('#author').html(r.author);
    });

  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate({
    backgroundColor: colors[color],
    color: colors[color]
  }, 1000);
  $(".button").animate({
    backgroundColor: colors[color]
  }, 1000);
}
});
}

      $(document).ready(function() {
        getQuote();
        $('#new-quote').on('click', getQuote);
        $('#tweet-quote').on('click', function() {
          if(!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
          }
        });
        $('#tumblr-quote').on('click', function() {
          if(!inIframe()) {
            openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
          }
        });
        $('#googleplus-quote').on('click', function() {
          if(!inIframe()) {
            openURL('https://plus.google.com/share?url=' + encodeURIComponent( appURL ));
          }
        });
        $('#facebook-quote').on('click', function() {
          if(!inIframe()) {
            openURL('https://www.facebook.com/sharer/sharer.php?display=popup&u=' + encodeURIComponent( appURL ));
          }
        });
      });
