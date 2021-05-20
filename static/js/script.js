$(window).on('load', function () {
  $('.preloader').fadeOut('slow')
})

$(document).ready(function () {
  // Asset Types Menu Active Class----------------
  $('.asset-overview a')
    .filter(function () {
      'use strict'
      return this.href == location.href.replace(/#.*/, '')
    })
    .addClass('active')

  // Main Menu Active Class----------------
  $('.main-menu li a')
    .filter(function () {
      'use strict'
      return this.href == location.href.replace(/#.*/, '')
    })
    .parents('li')
    .addClass('active')

  // Search By Select
  $('.search-by select').select2({
    placeholder: 'Search by',
    minimumResultsForSearch: -1,
    dropdownCssClass: 'search-by-list',
  })

  /* Date Range Calendar ----------------------- */
  // $(".daterange").flatpickr({
  // 	mode: "range",
  // 	dateFormat: "M d, y",
  // 	monthSelectorType: "static"
  // });

  /* DAM Checkbox Check to Bottom Bar Show */
  $('.resource-wrapper ul.tbody li input').change(function () {
    if ($(this).is(':checked')) {
      $(this).parents('.resource-wrapper ul.tbody li').addClass('selected')
      $(this).parents('.categary-selectbar').addClass('selected')
    } else {
      $(this).parents('.resource-wrapper ul.tbody li').removeClass('selected')
      $(this).parents('.categary-selectbar').removeClass('selected')
    }
    if ($('.resource-wrapper ul.tbody li input').is(':checked')) {
      $('body').addClass('selectBaractive')
    } else {
      $('body').removeClass('selectBaractive')
    }
  })

  // Filter Toggle Icon
  // $(document).on('click','.filter-icon, .filter-close',function (){
  // 	$('.filter-menu').toggleClass('show');
  // });
  // $(document).mouseup(function(e) {
  // 	var container = $(".filter-menu");
  // 	if (!container.is(e.target) && container.has(e.target).length === 0) {
  // 		container.removeClass('show');
  // 	}
  // });
  // $(document).on('click','.filter-icon, .filter-close, .body-overlay',function (){
  // 	$('.filter-menu').toggleClass('show');
  // 	$('body').toggleClass('show-overly');
  // });

  // Recent Uploads Mini Title
  /*$('.mini-title .check-label input').change(function () {
		if ($(this).is(":checked")) {
			$(this).parents('.mini-title').addClass('active');
		} else {
			$(this).parents('.mini-title').removeClass('active');
		}
	});*/

  // Owl Carousel
  if ($('.owl-carousel').length > 0) {
    $('.owl-carousel').owlCarousel({
      loop: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
      },
    })
  }

  // Video Hover js
  $('.video').each(function () {
    $(this).on('mouseover', function (e) {
      if ($(this).find('video source').attr('src') == '') {
        var videoLink = $(this).attr('data-src')
        $(this).find('video source').attr('src', videoLink)
        $('.thevideo', this).get(0).load()
        $('.thevideo', this).get(0).play()
      }
      $('.thevideo', this).get(0).play()
    })

    $(this).on('mouseout', function () {
      $('.thevideo', this).get(0).pause()
    })
  })

  // fancybox popup
  if ($('[data-fancybox]').length > 0) {
    $('[data-fancybox]').fancybox({
      video: {
        tpl:
          '<video class="fancybox-video"  controlsList="nodownload" poster="">' +
          '<source src="{{src}}" type="{{format}}" />' +
          'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
          '</video>',
        format: '', // custom video format
        autoStart: true,
      },
    })
  }
})

// Grid and List View----------------
$(document).on('click', '.gried-view span', function () {
  $('.gried-view span').removeClass('active')
  $(this).addClass('active')
})
$(document).on('click', '.gried-view .gridview', function () {
  $('.resource-wrapper').addClass('row-resource')
  $('.resource-wrapper').removeClass('column-resource')
})
$(document).on('click', '.gried-view .listview', function () {
  $('.resource-wrapper').addClass('column-resource')
  $('.resource-wrapper').removeClass('row-resource')
})

/* Table Asc and Desc Order ----------------------- */
// $('.table-list-view .sortarrow span').click(function () {
// 	$(this).parent('.sortarrow').toggleClass('active');
// });

$(document).on(
  'click',
  '.annotation .dropdown-menu .btn, .top-right-fix-btn .dropdown-menu .btn',
  function () {
    $(this).parents('.dropdown-menu').removeClass('show')
  }
)
