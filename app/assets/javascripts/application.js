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
$(document).on('turbolinks:load', function() {
  $('.main-title').animate({'left':'0'},1000);
  setTimeout(timer1, 1000);
  function timer1() {
        $('.content').fadeIn(1500);
  }
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
  $(document).on('turbolinks:load', function() {
    $(document).on('click', '.modal___bg', function() {
      $('.profile-modal').fadeOut();
    })
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
    var baseSpeed = 50;//0.5; // スピード
    var user_icons = document.getElementsByClassName('user-dots');
    for (var i = 0; i < user_icon.length;i++) {
      var rot = Math.random() * 360;  // ランダムな角度
      var angle = rot * Math.PI / 180;
      user_icons[i].startTime = Date.now(); // 開始時間を覚える

      user_icons[i].vec = {    // 移動方向
          x: Math.cos(angle),
          y: Math.sin(angle)
      };
    }

    var timer = setInterval(function() {

      for (var i = 0; i < user_icons.length;i++) {
        // 開始からの経過時間は？
        var timePassed = Date.now() - user_icons[i].startTime;
        // timePassed 時点のアニメーションを描画
        draw(user_icons[i],timePassed);
      }
    //var start = Date.now(); // 開始時間を覚える
  }, 10);

  // timePassed は 0 から 2000 まで進む
  // なので、left は 0px から 400px になります
  function draw(obj,timePassed) {
    obj.style.top = timePassed / baseSpeed * obj.vec.y + 'px';
    obj.style.left = timePassed / baseSpeed * obj.vec.x + 'px';
    // obj.style.top = Number(obj.style.top.slice(0,-2))+(baseSpeed * obj.vec.x) + 'px';
    // obj.style.left = Number(obj.style.left.slice(0,-2))+(baseSpeed * obj.vec.y) + 'px';
    // 画面外に出たら反対へ再配置
    // console.log(document.getElementById(obj.id));
    if(obj.clientWidth+Number(obj.style.left.slice(0,-2)) > section1.clientWidth + 10) {
        // obj.style.left = -5+"px";
        // console.log(obj.style.left,1);
        // document.getElementById(obj.id).vec.x *= -1;
        document.getElementById(obj.id).startTime = Date.now();
    } else if(obj.clientWidth+Number(obj.style.left.slice(0,-2)) < 0 - 10) {
        // obj.style.left = section1.clientWidth + 5 + "px";
        // console.log(obj.style.left,2);
        // document.getElementById(obj.id).vec.x *= -1;
        document.getElementById(obj.id).startTime = Date.now();
    } else if(obj.clientHeight+Number(obj.style.top.slice(0,-2)) > section1.clientHeight + 10) {
        // obj.style.top = -5+"px";
        // console.log(obj.style.top,3);
        // document.getElementById(obj.id).vec.y *= -1;
        document.getElementById(obj.id).startTime = Date.now();
    } else if(obj.clientHeight+Number(obj.style.top.slice(0,-2)) < 0 - 10) {
        // obj.style.top = section1.clientHeight + 5+"px";
        // console.log(obj.style.top,4);
        // document.getElementById(obj.id).vec.y *= -1;
        document.getElementById(obj.id).startTime = Date.now();
    }
  }




      var canvasWrap = document.querySelector('#canvas-wrap');
      var canvas = document.querySelector('#canvas-container');
      var ctx = canvas.getContext('2d');

      var center = {};    // Canvas中央
      var dots = [];      // パーティクル配列
      var density = 17;  //パーティクルの数
      var baseSize = 60;   // 大きさ

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
              //ctx.drawImage(this, 0, 0);
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
            // console.log(new Dot());
            //   var a = new Dot();
            //   a.src = "/attachments/5c836abf34eec5af1156aaaac0730dcffe623615/store/fill/100/100/f1ad44702e745fd95cb26d185a6cb068b8ed16d2e9ce1a41bb56e378e962/profile_image.jpeg"
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
        $('').on('click',function(event) {
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
  $('#user-edit-slide').animate({left:-850}, 2000);
  $('#audio-edit-slide').animate({right:-850}, 2000);
  $('.return-zone').animate({left: 0}, 2000);
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