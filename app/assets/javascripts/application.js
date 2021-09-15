// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require audiojs


//トップページのモーダル
$(function(){
    $('.js-modal-open').each(function(){
      $(this).on('click',function(){
        var target = $(this).data('target');
        var modal = document.getElementById(target);
        $('.main-title').slideUp();
        setTimeout(timer1, 500);
        function timer1() {
        $('.content').fadeOut(1000);
        $(modal).fadeIn(1000);
        }
        return false;
      });
    });
    $('.js-modal-close').on('click',function(){
      $('.js-modal').fadeOut();
      setTimeout(timer1, 1000);
      function timer1() {
      $('.main-title').slideDown();
      $('.content').fadeIn();
      }
      return false;
    });
  });



  // スクロール
  // Intersection Observer
  const sections = document.querySelectorAll(".section");
  const observerRoot = document.querySelector(".fullPageScroll");
  const options = {
    root: observerRoot,
    rootMargin: "-50% 0px",
    threshold: 0
  };
  const observer = new IntersectionObserver(doWhenIntersect, options);
  sections.forEach(section => {
    observer.observe(section);
  });

  // 交差したときに呼び出す関数
  function doWhenIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activatePagination(entry.target);
      }
    });
  }



  //ユーザーアイコンにマウスオーバー・クリックした時
  $(function(){
    $('.user-image').on('click', function(){
      $('.profile-modal').fadeIn();
      return false;
    });
    $('.profile-modal-close').on('click',function(){
        $('.profile-modal').fadeOut();
        return false;
    });
    $('.user-image').mouseover(function(e){
       var btns = $(e.target).parent().children('.play-btn')
       if ( btns.css('display') =='none'){
         btns.show()
       }
    })
    $('.user-image').mouseout(function(e){
      var btns = $(e.target).parent().children('.play-btn')
       if ( btns.css('display') =='block'){
         btns.hide()
       }
    });
  });



  //ランダムに動くユーザーアイコン
  window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
          window.setTimeout(callback, 1000 / 60);
      };
  })();

  window.onload = function() {
      var canvasWrap = document.querySelector('#canvas-wrap');
      var canvas = document.querySelector('#canvas-container');
      var ctx = canvas.getContext('2d');

      var center = {};    // Canvas中央
      var dots = [];      // パーティクル配列
      var density = 17;  //パーティクルの数
      var baseSize = 60;   // 大きさ
      var baseSpeed = 100; // スピード

      var Dot = function () {
          this.size = Math.floor( Math.random() * 6 ) + baseSize; //大きさ
          this.speed = this.size / baseSpeed; // 大きさによって速度変更
          this.pos = {   // 位置
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height
          };
          var rot = Math.random() * 360;  // ランダムな角度
          var angle = rot * Math.PI / 180;

          this.vec = {    // 移動方向
              x: Math.cos(angle) * this.speed,
              y: Math.sin(angle) * this.speed
          };
      };
      Dot.prototype = {
          update: function() {
              this.draw();

              this.pos.x += this.vec.x;
              this.pos.y += this.vec.y;

              // 画面外に出たら反対へ再配置
              if(this.pos.x > canvas.width + 10) {
                  this.pos.x = -5;
              } else if(this.pos.x < 0 - 10) {
                  this.pos.x = canvas.width + 5;
              } else if(this.pos.y > canvas.height + 10) {
                  this.pos.y = -5;
              } else if(this.pos.y < 0 - 10) {
                  this.pos.y = canvas.height + 5;
              }
          },

          draw: function() {
              ctx.fillStyle = this.color;
              ctx.beginPath();
              ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
              ctx.fill();
          }
      };

      function update() {
          requestAnimFrame(update);
          // 描画をクリアー
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          for (var i = 0; i < density; i++) {
              dots[i].update();
          }
      }

      function init() {
          // canvasにコンテンツサイズをセット
          canvas.setAttribute("width", canvasWrap.offsetWidth);
          canvas.setAttribute("height", canvasWrap.offsetHeight);

          // canvas中央をセット
          center.x = canvas.width / 2;
          center.y = canvas.height / 2;

          // densityの数だけパーティクルを生成
          for (var i = 0; i < density; i++) {
              dots.push(new Dot());
          }
          update();
      }
      init();
  }



  //ハンバーガーメニュー
  $(document).on('turbolinks:load', function() {
    $(function() {
        $('#hamburger').on('click',function(event) {
            $('#hamburger').fadeOut(500);
            $(this).toggleClass('active');
            setTimeout(timer1, 500);
            function timer1() {
              $('#sp-hamburger').fadeToggle(1000);
            }
            event.preventDefault();
        });
        $('#bg-content').on('click',function(event) {
            $('#sp-hamburger').fadeOut(500);
            $(this).toggleClass('active');
            setTimeout(timer1, 500);
            function timer1() {
              $('#hamburger').fadeToggle(1000);
            }
            event.preventDefault();
        });
    });
  });



// #トップに戻る
$('#back').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1500);
    return false;
});



//編集ページのuserスライド
$(document).on('turbolinks:load', function() {
$(function() {
      $('#user-edit-slide').hover(
      function(){
        $(this).animate({'marginLeft':'850px'},500);
      },
      function () {
        $(this).animate({'marginLeft':'0'},500);
      }
    );
});
//編集ページのaudioスライド
$(function() {
    $('#audio-edit-slide').hover(
    function(){
      $(this).animate({'marginRight':'850px'},500);
    },
    function () {
      $(this).animate({'marginRight':'0'},500);
    }
  );
});
});