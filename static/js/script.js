$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

$(window).on('load', function () {
    $(".body_content").mCustomScrollbar({
        scrollButtons: { enable: true },
        theme: "light-thick",
        scrollbarPosition: "outside"
    });

    $('.preloader').fadeOut('slow');

    $('.video').each(function () {
        $(this).on("mouseover", function (e) {
            if ($(this).find('video source').attr('src') == '') {
                var videoLink = $(this).attr('data-src');
                $(this).find('video source').attr('src', videoLink);
                $('.thevideo', this).get(0).load();
                $('.thevideo', this).get(0).play();
            }
            $('.thevideo', this).get(0).play();
        });

        $(this).on("mouseout", function () {
            $('.thevideo', this).get(0).pause();
        });
    });

    $('.edit-area').each(function () {
        $(this).parents('.editable-box').find(' > span').text($(this).parents('.editable-box').find('> .edit-area').val());
        $(this).parents('.editable-box').find('> .edit-area').width($(this).parents('.editable-box').find(' > span').width() + 10);
    }).on('.edit-area', function () {
        $(this).parents('.editable-box').find(' > span').text($(this).parents('.editable-box').find('  > .edit-area').val());
        $(this).parents('.editable-box').find('> .edit-area').width($(this).parents('.editable-box').find(' > span').width());
    });
});

$(document).ready(function () {

    $(document).on('keyup', '.edit-area', function () {
        $(this).parents('.editable-box').find(' > span').text($(this).parents('.editable-box').find('> .edit-area').val());
        $(this).parents('.editable-box').find('> .edit-area').width($(this).parents('.editable-box').find(' > span').width() + 10);
    }).on('.edit-area', function () {
        $(this).parents('.editable-box').find(' > span').text($(this).parents('.editable-box').find('  > .edit-area').val());
        $(this).parents('.editable-box').find('> .edit-area').width($(this).parents('.editable-box').find(' > span').width());
    });

    if ($('[data-fancybox]').length > 0) {
        $("[data-fancybox]").fancybox({
            video: {
                tpl:
                    '<video class="fancybox-video"  controlsList="nodownload" poster="">' +
                    '<source src="{{src}}" type="{{format}}" />' +
                    'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
                    "</video>",
                format: "", // custom video format
                autoStart: true
            }
        });
    }

    // file upload js
    if ($('.dropzone').length > 0) {
        Dropzone.options.DropZoneFiddle = {
            url: this.location,
            paramName: "file", //the parameter name containing the uploaded file
            clickable: true,
            maxFilesize: 3, //in mb
            uploadMultiple: true,
            maxFiles: 30, // allowing any more than this will stress a basic php/mysql stack
            addRemoveLinks: true,
            acceptedFiles: '.png,.jpg', //allowed filetypes
            // dictDefaultMessage: "Upload your files here", //override the default text
            init: function () {
                this.on("sending", function (file, xhr, formData) {
                    formData.append("step", "upload"); // Append all the additional input data of your form here!
                    formData.append("id", "1"); // Append all the additional input data of your form here!
                });
                this.on("success", function (file, responseText) {
                    //auto remove buttons after upload
                    $("#div-files").html(responseText);
                    var _this = this;
                    _this.removeFile(file);
                });
            },
        };
    }

    $('.resource-box input,.uploaded-wrapper .uploaded-box input').change(function () {
        if ($(this).is(":checked")) {
            $(this).parents('.resource-box').addClass('selected');
            $(this).parents('.uploaded-wrapper').addClass('selected');
        } else {
            $(this).parents('.resource-box').removeClass('selected');
            $(this).parents('.uploaded-wrapper').removeClass('selected');
        }
        if ($('.resource-box input,.uploaded-wrapper .uploaded-box input').is(":checked")) {
            $('body').addClass('selectBaractive');
        } else {
            $('body').removeClass('selectBaractive');
        }
    });


    $('.folder-list li ul').parent().addClass('expanded');
        $("<i class='menu-expand'></i>").insertBefore($('.expanded .sub-menu'));

        $('.menu-expand').click(function () {
            $(this).next('.sub-menu').slideToggle();
            $(this).parent().toggleClass('open');
        });


        // grid style changes js
        $('.file-grid span').click(function () {
            $('.file-grid span').removeClass('active');
            $(this).addClass('active');
        });

        $('.file-grid .tile').click(function () {
            $('.resource-container').removeClass('column-resource');
            $('.resource-container').addClass('row-resource');
        });

        $('.file-grid .list').click(function () {
            $('.resource-container').removeClass('row-resource');
            $('.resource-container').addClass('column-resource');
        });

        $(window).on('resize', function () {
            if ($(window).width() < 1024) {
                $('.resource-container').removeClass('column-resource');
                $('.resource-container').addClass('row-resource');

                $('.file-grid span.list').removeClass('active');
                $('.file-grid span.tile').addClass('active');
            }
            fillscrollmennu();
        });


    $(".select").select2({
        minimumResultsForSearch: -1
    });



    $('.add-folder button').click(function () {
        $('.add-folder input[type="text"]').show();
        fillscrollmennu();
    });

    $('.tag-btn,.refine-btn a').click(function () {
        $('.tag-list').addClass('open');
    });

    $('.close-tags').click(function () {
        $('.tag-list').removeClass('open');
    });

    $('select#searchFilter').select2({
        placeholder: "Search by",
        allowClear: true,
        minimumResultsForSearch: -1
    });

    $('#keySelect').select2({
        placeholder: "Select Key",
        allowClear: true,
        minimumResultsForSearch: -1
    });

    $('#FileTypes').select2({
        placeholder: "More File types",
        allowClear: true,
        minimumResultsForSearch: -1
    });

    $('#fileSort').select2({
        placeholder: "Sort by",
        allowClear: true,
        minimumResultsForSearch: -1
    });


    $('.folder-filter').select2({
        placeholder: "Search Folder",
        allowClear: true
    });
   
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'dd M yyyy'
    });

    // datepicker js
    $('input:not(.type-2)[name="daterange"]').daterangepicker({
        "opens": 'right',
        "parentEl": ".daterange-wrapper",
        locale: {
            format: 'MM/DD hh:mm A'
        }
    }).on('show.daterangepicker', function (ev, picker) {
        $(this).addClass('show');
    }).on('hide.daterangepicker', function (ev, picker) {
        $(this).removeClass('show');
    });

    $('input.type-2[name="daterange"]').daterangepicker({
        "opens": 'right',
        "parentEl": ".daterange-wrapper",
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    }).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('D') + ' - ' + picker.endDate.format('D MMM'));
    }).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    }).on('show.daterangepicker', function (ev, picker) {
        $(this).addClass('show');
    }).on('hide.daterangepicker', function (ev, picker) {
        $(this).removeClass('show');
    });


    if ($('.tagsinput').length > 0) {
        $('.tagsinput select').tagsinput({
            freeInput: true
        });
    }
   $('.clear-filter').click(function(){
       $('.bootstrap-tagsinput .tag') .tagsinput('removeAll')
    });

    $('.tagsinput select').on('beforeItemAdd', function (event) {
        event.cancel = !(/^[0-9A-Za-z\.,\n]+$/.test(event.item));
    });

    $('.bootstrap-tagsinput input').blur(function () {
        fillscrollmennu();
    });

    if ($('.owl-carousel').length > 0) {
        $('.owl-carousel').owlCarousel({
            loop:true,
            nav:true,
            responsive:{
                0:{
                    items:1
                }
            }
        });
    }
    fillscrollmennu();
});



function fillscrollmennu() {
    var overviewH = $('.asset-overview').outerHeight();
    var addFolderH = $('.add-folder').outerHeight();
    var bulkBox = $('.bulk-box').outerHeight();
    var popularTags = $('.popular-tags').outerHeight();

    var foldermenuH = $(window).height() - overviewH - addFolderH;
    var foldermenuH2 = $(window).height() - bulkBox - addFolderH;

    $('.bulk-tags .folder-list').css('max-height', foldermenuH2 - 306);
    $('.asset-left .folder-list').css('max-height', foldermenuH - 120);
    $('.asset-left .asset-overview  + .subfolder-list .folder-list').css('max-height', foldermenuH - 150);
    $('.front-page .asset-left .asset-overview  + .subfolder-list .folder-list').css('max-height', foldermenuH - 370);
}

function funSelectScroll() {
    $('.select2-dropdown .select2-results__options').mCustomScrollbar('destroy');
    setTimeout(function () {
        $('.select2-dropdown .select2-results__options').mCustomScrollbar({
            axis: 'y',
            scrollbarPosition: 'inside',
            advanced: {
                updateOnContentResize: true,
            },
        });
    }, 8);
}


// menu dropdown
(function ($) {
    'use strict';
    var $items = $('.nav-main li.nav-parent');
    function expand($li) {
        $li.children('ul.nav-children').slideDown('fast', function () {
            $li.addClass('nav-expanded');
            $(this).css('display', '');
            ensureVisible($li);
        });
    }
    function collapse($li) {
        $li.children('ul.nav-children').slideUp('fast', function () {
            $(this).css('display', '');
            $li.removeClass('nav-expanded');
        });
    }
    function ensureVisible($li) {
        var scroller = $li.offsetParent();
        if (!scroller.get(0)) {
            return false;
        }
        var top = $li.position().top;
        if (top < 0) {
            scroller.animate({
                scrollTop: scroller.scrollTop() + top
            }, 'fast');
        }
    }
    function buildSidebarNav(anchor, prev, next, ev) {
        if (anchor.prop('href')) {
            var arrowWidth = parseInt(window.getComputedStyle(anchor.get(0), ':after').width, 10) || 0;
            if (ev.offsetX > anchor.get(0).offsetWidth - arrowWidth) {
                ev.preventDefault();
            }
        }
        if (prev.get(0) !== next.get(0)) {
            collapse(prev);
            expand(next);
        } else {
            collapse(prev);
        }
    }
    $items.find('> a').on('click', function (ev) {
        var $html = $('html'),
            $window = $(window),
            $anchor = $(this),
            $prev = $anchor.closest('ul.nav').find('> li.nav-expanded'),
            $next = $anchor.closest('li'),
            $ev = ev;
        if ($anchor.attr('href') == '#') {
            ev.preventDefault();
        }
        if (!$html.hasClass('sidebar-left-big-icons')) {
            buildSidebarNav($anchor, $prev, $next, $ev);
        } else if ($html.hasClass('sidebar-left-big-icons') && $window.width() < 768) {
            buildSidebarNav($anchor, $prev, $next, $ev);
        }

    });

}).apply(this, [jQuery]);