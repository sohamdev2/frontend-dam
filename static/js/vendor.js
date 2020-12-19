// Removed - 08-07-2020 *search in js file*
/* Pratik Chauhan - 30-06-2020 */
$(document).ready(function(){

  $('select.project-select').select2({
    placeholder: "Select Project",
    allowClear: true,
  });
  $('tr.first-tr-time select.project-select').on("select2:select", function (e) {
    $('.project-input-wrapper').addClass('done');
  });
  $('select.project-sub-select').select2({
    placeholder: "Select Task",
    allowClear: true
  });
  $('.time-picker').datetimepicker({
    format: 'LT'
  });
  $(document).on('click','.sidebar-overlay',function(){
    $('[data-sidebar]').removeClass('sidebar-active');
    $('body').removeClass('sidebar-open');
    $('.sidebar-widget').removeClass('show');
  });


  //Today - 03-07-2020
  $('input:not(.type-2)[name="daterange"]').daterangepicker({
    "opens": 'right',
    "parentEl": ".daterange-wrapper",
    locale: {
      format: 'M/DD hh:mm A'
    }
  }).on('show.daterangepicker', function(ev, picker) {
    $(this).addClass('show');
  }).on('hide.daterangepicker', function(ev, picker) {
    $(this).removeClass('show');
  });
  $('input.type-2[name="daterange"]').daterangepicker({
    "opens": 'right',
    "parentEl": ".daterange-wrapper",
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear'
    }
  }).on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('D') + ' - ' + picker.endDate.format('D MMM'));
  }).on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
  }).on('show.daterangepicker', function(ev, picker) {
    $(this).addClass('show');
  }).on('hide.daterangepicker', function(ev, picker) {
    $(this).removeClass('show');
  });


  //Today - 04-07-2020
  $(document).on('click','.action-buttons a, .action-buttons button , .btn-toggle',function(){
    var dataClass = $(this).attr('data-class') || '';
    $(this).toggleClass('active').toggleClass(dataClass)
  });


  /*  custom-time-box-click */
  $(document).on('click','.custom-time-box-click , .custom-time-box-submit-click',function(){
    $(this).parents('.custom-time-box').toggleClass('active');
  });

  /* Pratik - 28-07-2020 */
  $(document).on('click','.btn-reset-filter',function(){
    $(this).parents('.reset-filter-toggle').toggleClass('reset-filter-active');
  });



  /*Vishal 28-07-2020 start*/
  $('.card-carousel').owlCarousel({
    loop: false,
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  });
  $('.recent-carousel').owlCarousel({
    loop: false,
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });
  $(document).ready(function() {
    // Grid And List View Function----------------
    $('#grid').click(function(event) {
      event.preventDefault();
      $('.grid-list-view a').removeClass('active');
      $(this).addClass('active');
      $('#browse-folder').removeClass('list-item');
      $('#browse-folder').addClass('grid-item');
    });
    $('#list').click(function(event) {
      event.preventDefault();
      $('.grid-list-view a').removeClass('active');
      $(this).addClass('active');
      $('#browse-folder').removeClass('grid-item');
      $('#browse-folder').addClass('list-item');
    });
  });
  /*Vishal 28-07-2020 End*/

});


function setFocusElement($focusElArray) {
  if ($focusElArray.length > 0) {
    $focusElArray.eq(0).trigger('focus');
    return true;
  }
  return false;
}

$(function() {
  FastClick.attach(document.body);
});
function fullheight() {
  var wh = $(window).height();
  var ww = $(window).width();
  var hh = $('header').outerHeight();
  var dh = $('.drag-and-drop').outerHeight();
  var heroH = wh - hh;
  $('.hero .item').height(heroH);

  /* Mobile Not Show */
  if(ww < 768){
    $('body .main').hide();
    $('.mobile--not--show').show();
  }else{
    $('body .main').show();
    $('.mobile--not--show').hide();
  }
}
fullheight();
/* Changes - 30-06-2020 */
function headerheight() {
  var hh = $('header').height();
  $('.center-part-view-main').css('paddingTop' , hh + 1);
};
headerheight();
/* Changes End */

$(window).resize(function() {
  setbg();
  headerheight();
  fullheight();
  setFieldWidth();
});
$(window).load(function() {
  setbg();
  headerheight();
  fullheight();
  setFieldWidth();
});

function setFieldWidth() {
  var tts = $('.table-type-structure .thead').outerWidth();
  var cs15 = $('.table-type-structure .thead .col-sm-15').length;
  var csw15 = cs15 * 150;
  var cts = tts - csw15;
  $(".col-sm-auto").css("width",cts);
}
setFieldWidth();

function setbg() {
  $(".img-mask").each(function() {
    var theBg = $(this).find(".bg-img").attr("src");
    $(this).css('background-image', 'url(' + theBg + ')');
    $(this).find("img.bg-img").hide();
  });
}
setbg();

$(document).ready(function() {
  $(window).load(function() {
    $('.workspace-list .worksapce-box').matchHeight();
    $('.checkbox-div .col-sm-12 .col-sm-4').matchHeight();
    $('.assigne-duedate .col-xs-6').matchHeight();
    $('.client-info .row .col-xs-6').matchHeight();
    // $('#manage-project-status .col-sm-6 .form-group').matchHeight();
  })
});

/* 29-07-2020 */
$(function () {
  $("#datepicker, .datepicker").datepicker({
    autoclose: true,
    todayHighlight: true,
  }).on( "hide",function () {
    $('body').removeClass('overflow-hidden');
  })
});

$(function() {
  $("#datepicker.datepicker").click(function() {
    $(this).datepicker().datepicker( "show" )
  });
});


$(window).load(function() {
  /* Wow script ================ */
  var wow = new WOW({
  });
  wow.init();
});


$('#resume').bind('change', function () {
  var filename2 = $("#resume").val();
  if (/^\s*$/.test(filename2)) {
    $(".file-upload").removeClass('active');
    $("#noFile2").text("No file chosen...");
  } else {
    $(".file-upload").addClass('active');
    $("#noFile2").text(filename2.replace("C:\\fakepath\\", ""));
  }
});

$(document).ready(function() {
  $("#close-popup").on('click', function(e) {
    e.preventDefault();
    $("body").removeClass("show-overlay-nav");
  });
  $("#open-overlay-nav").on("click", function() {
    $("body").toggleClass("show-overlay-nav");
  });
});

$(window).load(function(){
  $(".body_content").mCustomScrollbar({
    scrollButtons:{enable:true},
    theme:"light-thick",
    scrollbarPosition:"outside"
  });
});


$(document).ready(function() {
  $(".select").select2({
    // dropdownParent: $('#new-entry')
  });
  $(".modal .select").select2({
    dropdownParent: $('#new-entry')
  });

  /* 21-07-2020 */
  $('.select.toggle-class').on("select2:select", function (e) {
    var select_val = $(e.currentTarget).val();
    if(select_val === "custom-select"){
      $(this).parents('.select-toggle').addClass('custom-click');
    }else{
      $(this).parents('.select-toggle').removeClass('custom-click');
    }
  });

});

/*  double click to add classs*/
$(document).ready(function() {
  $(document).on('click',".task-close, .task-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("task-client-side-baar");
  });
  $(document).on("click",".details-clickarea", function() {
   // $("body").toggleClass("task-client-side-baar");
  });
});
/*  double click to add classs END*/

$(document).ready(function() {
  $(document).on('click',".pin-close-btn, .close-pin-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("show-pin-side-baar");
  });
  $(document).on("click",".pin-toggle", function() {
    $("body").toggleClass("show-pin-side-baar");
  });
});
/* Client Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".close-btn, .close-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("show-client-side-baar");
  });
  $(document).on("click",".client-side-baar-click", function() {
    $("body").toggleClass("show-client-side-baar");
  });
});
/* Budget Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".budget-close, .budget-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("budget-side-baar");
  });
  $(document).on("click",".budget-side-baar-click", function() {
    $("body").toggleClass("budget-side-baar");
  });
});
/* Summary Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".summary-close, .summary-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("summary-side-baar");
  });
  $(document).on("click",".summary-side-baar-click", function() {
    $("body").toggleClass("summary-side-baar");
  });
});
/* Assets Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".assets-close, .assets-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("assets-side-baar");
  });
  $(document).on("click",".assets-side-baar-click", function() {
    $("body").toggleClass("assets-side-baar");
  });
});
/* Project Brief Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".project-brief-close, .project-brief-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("project-brief-side-baar");
  });
  $(document).on("click",".project-brief-side-baar-click", function() {
    $("body").toggleClass("project-brief-side-baar");
  });
});
/* Collaborate Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".collaborate-close, .collaborate-side-baar-main", function(e) {
    e.preventDefault();
    $("body").removeClass("collaborate-side-baar");
  });
  $(document).on("click",".collaborate-side-baar-click", function() {
    $("body").toggleClass("collaborate-side-baar");
  });
});

$(document).ready(function() {
  $(document).on('click',".create-project-close, .create-project-baar-main", function(e) {
    e.preventDefault();
    $("body").removeClass("create-project-side-baar");
  });
  $(document).on("click",".create-project-baar-click", function() {
    $("body").toggleClass("create-project-side-baar");
  });
});
/* Update Bucket Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".update-bucket-close, .update-bucket-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("project-brief-side-baar");
  });
  $(document).on("click",".update-bucket-side-baar-click", function() {
    $("body").toggleClass("project-brief-side-baar");
  });
});

/* Project Invitation Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".project-invitation-close, .project-invitation-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("project-brief-side-baar");
  });
  $(document).on("click",".project-invitation-side-baar-click", function() {
    $("body").toggleClass("project-brief-side-baar");
  });
});
/* Project Invitation Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".create-bucket-close, .create-bucket-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("create-bucket-side-baar");
  });
  $(document).on("click",".create-bucket-side-baar-click", function() {
    $("body").addClass("create-bucket-side-baar");
    //$("body").removeClass("project-brief-side-baar");
  });
});

/* Assets File To Date */
$(document).ready(function() {
  $(document).on('click',"#assets-file", function(e) {
    e.preventDefault();
    $("body").removeClass("assets-side-baar");
  });
  $(document).on('click',".assets-file-close, .assets-file-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("assets-file-side-baar");
  });
  $(document).on("click","#assets-file", function() {
    $("body").toggleClass("assets-file-side-baar");
  });

  $(document).on('click',"#assets-date", function(e) {
    e.preventDefault();
    $("body").removeClass("assets-file-side-baar");
  });

  $(document).on("click","#assets-date", function() {
    $("body").toggleClass("assets-side-baar");
  });
});

/* Start Timer */
// Targets all textareas with class "txta"
let textareas = document.querySelectorAll('.txta'),
  hiddenDiv = document.createElement('div'),
  content = null;
// Adds a class to all textareas
for (let j of textareas) {
  j.classList.add('txtstuff');
}
/* Textaria Auto Height JS */
hiddenDiv.classList.add('txta');

// Add the styles for the hidden div
// These can be in the CSS, just remove these three lines and uncomment the CSS
hiddenDiv.style.display = 'none';
hiddenDiv.style.whiteSpace = 'pre-wrap';
hiddenDiv.style.wordWrap = 'break-word';

// Loop through all the textareas and add the event listener
for(let i of textareas) {
  (function(i) {
    // Note: Use 'keyup' instead of 'input'
    // if you want older IE support
    i.addEventListener('input', function() {
      // Append hiddendiv to parent of textarea, so the size is correct
      i.parentNode.appendChild(hiddenDiv);
      // Remove this if you want the user to be able to resize it in modern browsers
      i.style.resize = 'none';
      // This removes scrollbars
      i.style.overflow = 'hidden';
      // Every input/change, grab the content
      content = i.value;
      // Add the same content to the hidden div
      // This is for old IE
      content = content.replace(/\n/g, '<br>');
      // The <br ..> part is for old IE
      // This also fixes the jumpy way the textarea grows if line-height isn't included
      hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';
      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      hiddenDiv.style.visibility = 'hidden';
      hiddenDiv.style.display = 'block';
      i.style.height = hiddenDiv.offsetHeight + 'px';
      // Make the hidden div display:none again
      hiddenDiv.style.visibility = 'visible';
      hiddenDiv.style.display = 'none';
    });
  })(i);
}
/* Textaria Auto Height JS END*/



/* followers-list*/
$(".add-followers").on("click", function(){
  $(".followersBar").toggleClass("show-followers");
});

$(document).on('click', function(event) {
  if (!$(event.target).closest('.followersBar').length)  {
    $(".followersBar").removeClass("show-followers");
  }
});



$(window).load(function() {
  $('.preloader').fadeOut('slow');
});

/* Pratik Chauhan */
$(document).ready(function() {
  $(".dropdown-box ul").mCustomScrollbar({
    scrollButtons:{enable:false},
    theme:"dark-thick",
    scrollbarPosition:"inside"
  });
  $(".dropdown-menu .workspace-menu").mCustomScrollbar({
    scrollButtons:{enable:false},
    theme:"dark-thick",
    scrollbarPosition:"inside"
  });


  $(".dropdown-box label").on("click", function() {
    $(this).parents(".dropdown-box").toggleClass("open");
  });

  $(".dropdown-box ul li a").on("click", function(event) {
    $(this).parents(".dropdown-box").find("label").text($(this).text())
    $(this).parents(".dropdown-box").removeClass("open");
  });

  /* 03-07-2020 Today */
  $(document).on('click','.day-list:not(.no-click) a',function(e){
    if( $(this).attr('disabled') == 'disabled'){
        //alert('disabled');
    }else {
      getCusorPosition($(this),'.day-list')
    }
  });

  /* Global sidebar Js */
  $(document).on('click','[data-sidebar]',function(){
    var targetVal = $(this).attr('data-sidebar');
    if(targetVal.length){
      $(this).addClass('sidebar-active');
      $(targetVal).addClass('show');
      $('body').addClass('sidebar-open');
    }else{
      console.error("Couldn't found sidebar ID " , targetVal );
    }
  });

  $(document).on('click','[data-sidebar-close]',function(){
    var targetVal = $(this).attr('data-sidebar-close');
    if(targetVal === ""){
      $(this).parents('.sidebar-widget').removeClass('show');
    }else{
      $(targetVal).removeClass('show');
    }
    $('body').removeClass('sidebar-open');
    $('[data-sidebar]').removeClass('sidebar-active');

  });

  $(document).on('click','.task-timer span',function(){
    $(this).parent('.task-timer').toggleClass('stop');
  });

  /* TIMER POPUP DRAG JS START */
  var window_inner_height = $(window).innerHeight(),
    popup_height =$('.timer-popup').outerHeight(),
    maxHorizotalHeight = window_inner_height - popup_height;
  var selected = null,
    x_pos = 0, y_pos = 0,
    x_elem = 0, y_elem = 0;
  function _drag_init(elem) {
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;

    $('.timer-popup').addClass('is-drag');
  }
  function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    var temp_pos = (y_pos - y_elem) < 0 ? 0 : (y_pos - y_elem);
    temp_pos = temp_pos > maxHorizotalHeight ? maxHorizotalHeight :temp_pos;
    if (selected !== null) {
      // selected.style.left = (x_pos - x_elem) + 'px';
      selected.style.top = temp_pos + 'px';
    }
  }
  function _destroy() {
    selected = null;
    $('.timer-popup').removeClass('is-drag');
  }
  if($('.timer-popup').length){
    document.getElementById('timer-popup').onmousedown = function () {
      _drag_init(this);
      return false;
    };
  }
  document.onmousemove = _move_elem;
  document.onmouseup = _destroy;
  /* TIMER POPUP DRAG JS END */

  $(document).on('click','.timer-popup .timer-popup-trigger, .timer-popup-arrow',function (e) {
    $(this).parent('.timer-popup').toggleClass('open');
  });

  /* global Document click event  */
  $(document).on('click',function(e){
    var el = $(e.target);
    //Sidebar outer Click End
    // Timer Popup click
    var timerPopup = el.parents('.timer-popup').hasClass('open'),
      isPopupButton = el.parent().hasClass('timer-popup-trigger');
    if(!timerPopup && !isPopupButton){
      $('.timer-popup').removeClass('open');
    }
    // Timer Popup click
    var isAddFollowers = el.parents('.add-followers-list').hasClass('show'),
      isAddFollowersBtn = el.hasClass('js-add-followers');
    isAddFollowersinnerBtn = el.parents().hasClass('js-add-followers');
    if(!isAddFollowers && !isAddFollowersinnerBtn && !isAddFollowersBtn){
      $('.add-followers-list').removeClass('show');
    }
  });
  $(document).on('click','.js-add-followers',function(e){
    $(this).next('.add-followers-list').toggleClass('show');
  })

  $(document).on('click','.sub-task .cs-accordion-toggle',function(){
    var parent = $(this).parents('.sub-task'),
      parentAttr = parent.attr('data-sub-task');

    parent.toggleClass('active');
    // $('.sub-task-wrapper[data-sub-task="'+parentAttr+'"]').fadeToggle(0);
    $('.sub-task-wrapper[data-sub-task="'+parentAttr+'"]').toggleClass('show');

  });
});

$(window).on('load',function(){
 /* var activeDay = $('.day-list li.active a');
  activeDay.length ? getCusorPosition(activeDay,'.day-list'):'';*/

  // Removed - 08-07-2020
  // var activeDayLink = $('ul.day-week-option li.active a');
  // activeDayLink.length ? getCusorPosition(activeDayLink, '.day-week-option-js'):'';
})

function getCusorPosition (el,parentNodeElement){
  var superParent = $(el).parents(parentNodeElement),
    superParentOffset = superParent.offset().left,
    target = $(el).parent('li'),
    width = $(el).outerWidth(),
    leftPos = target.offset().left;
  var temp = leftPos - superParentOffset;
  superParent.find('span.line').css({
    "left":temp,
    "width":width
  });
  target.addClass('active').siblings().removeClass('active');
}


$(window).on('load',function(){
  $('.cs-tab-list li').on('click',function(e){
    e.preventDefault();
    var index = $(this).index(),
      tab = $(this).parents('.cs-tab'),
      tabList = tab.find('.cs-tab-content-list');

    $(this).addClass('tab-active active').siblings().removeClass('tab-active active');

    tabList.find('.cs-tab-content').eq(index).fadeIn();
    tabList.find('.cs-tab-content').not(':eq('+index+')').hide();

    // $(this).addClass('active').siblings().removeClass('active');
  });
  $('.cs-tab-list li.active').trigger('click');
});








/* KAMLESH JS --------------------------------*/
// Global Function----------------
function wondowload(){
  var prh = $('.project_task_row').outerWidth();
  var cw = $('.scope-work-top-fixed .project_task_cell').length;
  var ptrw = prh - (cw + 40);
  $(".project_task_row_wrapper").css("width",ptrw);


  var tts = $('.table-type-structure .thead').outerWidth();
  var cs15 = $('.table-type-structure .thead .col-sm-15').length;
  var csw15 = cs15 * 150;
  var cts = tts - csw15;
  $(".col-sm-auto").css("width",cts);
}
$(window).load(function(){
  wondowload();
});
$(window).resize(function(){
  wondowload();
});

// Scroll to add class----------------
$(document).ready(function() {
  $(".project_task_group_boxes").on('scroll', evt => {
    if($(evt.target).scrollTop() > 1){
      $(".scope-work-top-fixed").addClass('scrolling');
    }else{
      $(".scope-work-top-fixed").removeClass('scrolling');
    }
  });
});

// Task Active Js----------------
$(document).ready(function() {
  $(document).on("click",".details-clickarea", function() {
    $('.project_task_row').removeClass('open-subtask');
    $(this).parents(".project_task_row").addClass('open-subtask');
  });
});

// Left main Nav Active Class Js----------------
$(document).ready(function() {
  $(document).on("click",".nav-main > li", function() {
    $('.nav-main > li').removeClass('active');
    $(this).addClass('active');
  });
});

// Menu Active Class----------------
$(".purchase-agreement-menu ul li a").filter(function () {
  "use strict";
  return this.href == location.href.replace(/#.*/, "");
}).parents("li").addClass("active");

// Input Run Time Change Value With Auto Width----------------
/*$(document).on('keyup','.editable__textarea',function (){
  var inputValue = $(this).val();
  var shadowDiv = $(document).find('.editable__box.editable__focuschild .editable__preview');
  shadowDiv.html(inputValue);
});*/
$(document).on('blur','.editable__textarea',function (){
  $(this).parents('.editable__box').removeClass('editable__focuschild');
});
$(document).on('focus','.editable__textarea',function (){
  $(this).parents('.editable__box').addClass('editable__focuschild');
});
$(document).on('blur','.side-baar-comment-box .comment-box textarea',function (){
  $(this).parents('.comment-box').removeClass('textarea__focus');
});
$(document).on('focus','.side-baar-comment-box .comment-box textarea',function (){
  $(this).parents('.comment-box').addClass('textarea__focus');
});


$(document).on('click','.inner-sidebar-toggle',function (){
  $(this).parents('.project-list-details').toggleClass('view-inner-sidebar');
});

$(document).on('click','.cs-toggle',function (){
  $(this).parents('.cs-toggle-wrapper').toggleClass('active');
});

$(document).on('click','.cs-toggle-attr',function (){
  $(this).parents('.cs-toggle-wrapper').attr('data-active',$(this).attr('data-class'));
  $(this).addClass('active').siblings().removeClass('active');
});


/* Comment Box Focus to Height Large */

  $(document).on('click','.quillWrapper .ql-editor',function (){
    $(this).parents('.quillWrapper').addClass('editor__focus');
  });
  $(document).on('click',function (event){
    if ( !$(event.target).closest('.quillWrapper').length) {
      $('.quillWrapper').removeClass('editor__focus');
    }
  });

/* Placeholder and Delete icon is visible while using tab key on workspace setting */
$(document).on('mouseover','.workspace-table .drag',function(){
  $('.workspace-table .drag').removeClass('focus');
  $(this).addClass('focus');
});
$(document).on('focus','.workspace-table .drag .form-control',function (){
  $('.workspace-table .drag').removeClass('focus');
  $(this).parents('.drag').addClass('focus');
});

/* TAB key press to HIDE bootstrap dropdown */
$(window).keyup(function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 9) {
    $('.dropdown').removeClass('open');
  }
});


/* My Task Sidebar JS */
$(document).ready(function() {
  $(document).on('click',".task-close, .task-side-baar-div", function(e) {
    e.preventDefault();
    $("body").removeClass("task-client-side-baar");
  });
  $(document).on("click",".my-sub-task", function() {
    $("body").toggleClass("task-client-side-baar");
  });
});

$(document).ready(function() {
  $(document).on("click",".my-sub-task", function() {
    $('.task-row').removeClass('open-subtask');
    $(this).parents(".task-row").addClass('open-subtask');
  });
});
