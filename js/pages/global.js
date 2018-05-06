define(function (require, exports, module){
    'use strict';
    exports.index = function () {
      console.log('global'); 
      //coundown     
    require('bootstrap');
    //Menu mobile
    require('mmenu');
    $('#mainmenu').mmenu({
      // options
      'navbar' : {'title': 'Danh mục'},
      'offCanvas': {'position': 'left'},
      'extensions': [
        'pagedim-black',
        'effect-listitems-drop',
        'shadow-page'
      ],
        },{
          // configuration
        clone: true
    });

    $('#account-menu').mmenu({
      'navbar' : {'title': 'Tài khoản'},
      'offCanvas': {'position': 'right'},
      'extensions': [
        'pagedim-black',
        'effect-listitems-drop',
        'shadow-page'
      ]
      },{
      // configuration
      clone: true
    });

    //date picker
    require('bootstrap-datepicker');
        (function (a) {
        a.fn.datepicker.dates.vi = {
            days: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
            daysShort: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
            daysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            monthsShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
            today: 'Hôm nay', clear: 'Xóa', format: 'dd/mm/yyyy' };
        }(jQuery));

    // $('[data-toggle="tooltip"]').tooltip();
    
    $('[data-toggle="datepicker"]').datepicker({
        format: 'dd/mm/yyyy',
        language: 'vi', 
        autoclose: true
    });
    $(document).ready(function () {
        $('.js-toggle-sidebar').click( function () {
            $('.sidebar').toggleClass('sidebar-deactive');
            // alert('asdas');
        });
        $('.sidebar__link').click(function() {
            $('.sidebar__link').removeClass('active');
            $(this).addClass('active');
        });
    });

    // Select example choose city   

    // jquery back-to-top
    $('.back-to-top').click( function(e){
      e.preventDefault();
      $('html, body').animate({
        scrollTop : 0
      }, 500);
    });

    // jquery Scoll back-to-top 
    $(window).on('scroll', function() {
      var top = $(window).scrollTop();
        if (top > 800 ) {$('.back-to-top').fadeIn();} 
        else { $('.back-to-top').fadeOut(); }
      var top_showOnScroll = $(window).scrollTop();
        if (top > 800 ) {$('.show-on-scroll').show(200);} 
        else { $('.show-on-scroll').hide(200); }
      var top_buttonMobileFixed = $(window).scrollTop();
        if (top > 800 ) {$('.button-mobile-fixed').fadeIn(200);} 
        else { $('.button-mobile-fixed').fadeOut(200); }
    });

    // jquery Scroll to #div
    $('.scroll-target').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 55)
          }, 1000);
          target.focus();
          return false;
        }
      }
    });

    // slider owl-carousel 
    require('owl-carousel'); 
    $('.slider-magic').owlCarousel({
      items: 1,
      nav: true,
      dots: true,
      navText: ['<i class="ion-ios-arrow-left"></i>','<i class="ion-ios-arrow-right"></i>'],
      dotsContainer: '#carousel-custom-dots',
      dotsEach:true,
      dotsData: true,
      autoHeight:true,
      autoplay:true,
      loop:true,
      autoplayTimeout:4000,
      responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        }
      }
    });

    $('.owl-dot').click(function (e) {
      // owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });



    $('.box-active').click(
      
        // if($(this).hasCLass('box-active__hover'))
        function(){
          console.log('here');
          $('.box-active').removeClass('box-actived');
          $(this).addClass("box-actived");
          return false;
      }
    );
    };
});