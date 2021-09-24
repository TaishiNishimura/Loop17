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
// require turbolinks
//= require_tree .
//= require audiojs

//トップページのモーダル
  $(function() {
    $('.main-title').animate({'left':'0'},1000);
    setTimeout(timer1, 1000);
    function timer1() {
          $('.content').fadeIn(1500);
          $('.top-img').animate({'top':'30%'},1500);
          $('.sub-title-box').animate({'left':'30%'},1500);
    }
    $(function(){
      $('.js-modal-open').each(function(){
        $(this).on('click',function(){
          var target = $(this).data('target');
          var modal = document.getElementById(target);
          $('.main-title').slideUp();
          setTimeout(timer1, 500);
          $('.top-img').animate({'top':'100%'},500);
          $('.sub-title-box').animate({'left':'100%'},500);
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
        $('.top-img').animate({'top':'30%'},500);
        $('.sub-title-box').animate({'left':'30%'},500);
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



//indexのアイコンアニメーション
      $(function () {
        $(window).on("load", function() {
            // バウンス呼び出し
            bounce('#container', '.dots1')
            bounce('#container', '.dots2')
            bounce('#container', '.dots3')
            bounce('#container', '.dots4')
            bounce('#container', '.dots5')
            bounce('#container', '.dots6')
            bounce('#container', '.dots7')
            bounce('#container', '.dots8')
            bounce('#container', '.dots9')
            bounce('#container', '.dots10')
            bounce('#container', '.dots11')
            bounce('#container', '.dots12')
            bounce('#container', '.dots13')
            bounce('#container', '.dots14')
            bounce('#container', '.dots15')
            bounce('#container', '.dots16')
            bounce('#container', '.dots17')
        })

        function bounce(container, object) {

            /**
             * 速度をランダムにするための配列
             *  必要に応じて正負の値を追加してください。
             *  複数の数字を入れることでよりランダムな動きになります。
             * @type {number[]}
             */
            const randomSpeed = [-0.2, -0.15, -0.1, 0.1 , 0.15, 0.2]

            // 移動速度
            let speedX = randomSpeed[Math.floor(Math.random() * randomSpeed.length)]
            let speedY = randomSpeed[Math.floor(Math.random() * randomSpeed.length)]

            // jQueryで要素取得
            container = $(container)
            object = $(object)

            // インターバルで描画
            setInterval(function () {
                // コンテナサイズ取得
                let containerSize = {
                    height: container.height(),
                    width: container.width()
                }

                // オブジェクトサイズを取得
                let objectSize = {
                    height: object.height(),
                    width: object.width()
                }

                // 位置情報
                let location = {
                    x: object.offset().left += speedX,
                    y: object.offset().top += speedY
                }

                // CSSで位置を制御
                object.css('left', location['x'] + 'px')
                object.css('top', location['y'] + 'px')

                // 壁判定_X軸
                if (location['x'] < 0 || location['x'] > containerSize['width'] - objectSize['width']) {
                    // リサイズされて範囲外に行った場合範囲内に戻す処理
                    if (location['x'] > containerSize['width'] - objectSize['width']) {
                        object.css('left', containerSize['width'] - objectSize['width'] + 'px')
                    }
                    // 壁判定によりspeedXを反転させる
                    speedX *= -1
                }

                // 壁判定_Y軸
                if (location['y'] < 0 || location['y'] > containerSize['height'] - objectSize['height']) {
                    // リサイズされて範囲外に行った場合範囲内に戻す処理
                    if (location['y'] > containerSize['height'] - objectSize['height']) {
                        object.css('top', containerSize['height'] - objectSize['height'] + 'px')
                    }
                    // 壁判定によりspeedYを反転させる
                    speedY *= -1
                }
            }, 1)
        }
    })



//ユーザーモーダルを閉じる
  $(document).on('click', '.modal___bg', function() {
    $('.profile-modal').fadeOut();
  });



//ハンバーガーメニュー
  $(function() {
      //開く
      $('#hamburger').on('click',function(event) {
          $('#hamburger').fadeOut(500);
          $(this).toggleClass('active');
          setTimeout(timer1, 500);
          function timer1() {
            $('#sp-hamburger').fadeToggle(1000);
          }
          event.preventDefault();
      });
      //閉じる
      $('#sp-hamburger').on('click',function(event) {
          $('#sp-hamburger').fadeOut(500);
          $(this).toggleClass('active');
          setTimeout(timer1, 500);
          function timer1() {
            $('#hamburger').fadeToggle(1000);
          }
          event.preventDefault();
      });
      $('.stop-propagation').on('click', function(event){
        event.stopPropagation()
      })
  });
//ハンバーガーメニューの「ジャンル検索」を押した時
  $(function() {
      $('#genres-menu').on('click',function(){
        $('#genres-menu').fadeOut(500);
        $(this).toggleClass('active');
        setTimeout(timer1, 500);
          function timer1() {
            $('.search-form').fadeToggle(1000);
          }
          event.preventDefault();
      });
  });



//スクロールを促す矢印
  $(function () {
      setTimeout('rect()'); //アニメーションを実行
  });
  function rect() {
      $('.rect').animate({
          marginTop: '-=10px'
      }, 800).animate({
          marginTop: '+=10px'
      }, 800);
      setTimeout('rect()', 1600); //アニメーションを繰り返す間隔
  }


//トップに戻る
  $(function() {
    $('#back a').on('click',function(event){
      $('body, html').animate({
        scrollTop:0
      }, 800);
      event.preventDefault();
    });
  });



//アバウトページのパーティクル
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
      var colors = ['#eeb900', '#6DD0A5', '#f799db'];
      var baseSize = 51;   // 大きさ
      var baseSpeed = 17; // スピード

      var Dot = function () {
          this.size = Math.floor( Math.random() * 6 ) + baseSize; //大きさ
          this.color = colors[~~(Math.random() * 3)]; //色
          this.speed = this.size / baseSpeed; // 大きさによって速度変更
          this.pos = {   // 位置
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height
          };
          var rot = Math.random() * 360;  // ランダムな角度
          var angle = rot * Math.PI / 180;
          this.vec = {    // 移動方向
              x: Math.cos(angle),
              y: Math.sin(angle)
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
  };



//編集ページ
  $(function() {
    $('#user-edit-slide').animate({left:-850}, 2000);
    $('#audio-edit-slide').animate({right:-850}, 2000);
    $('.return-zone').animate({left: 0}, 2000);
    $(function() {
        $('.user-alt').on('mouseover',function() {
          $(this).css({'color':'#7a7c7d'},500);
        });
        $('.user-alt').on('mouseout',function() {
          $(this).css({'color':'#fff'},500);
        });
    });
    $(function() {
        $('.audio-alt').on('mouseover',function() {
          $(this).css({'color':'#7a7c7d'},500);
        });
        $('.audio-alt').on('mouseout',function() {
          $(this).css({'color':'#fff'},500);
        });
    });
//編集ページのuserスライド
    $(function() {
        $('.user-alt').on('click',function() {
        if($('#user-edit-slide').hasClass('off')){
          $('#user-edit-slide').removeClass('off');
          $('#user-edit-slide').animate({'marginLeft':'850px'},500).addClass('on');
        }else{
          $('#user-edit-slide').addClass('off');
          $('#user-edit-slide').animate({'marginLeft':'0px'},500);
        }
        });
    });
//編集ページのaudioスライド
    $(function() {
        $('.audio-alt').on('click',function(){
        if($('#audio-edit-slide').hasClass('off')){
          $('#audio-edit-slide').removeClass('off');
          $('#audio-edit-slide').animate({'marginRight':'850px'},500).addClass('on');
        }else{
          $('#audio-edit-slide').addClass('off');
          $('#audio-edit-slide').animate({'marginRight':'0px'},500);
        }
        });
    });
  });