/* ============= Start Section Name edit ==================== */
$(document).ready(function() {
  $(document).on('click','.section_name',function () {
    let value = $(this).text().trim();
    $(this).addClass('hidden');
    $(this).siblings('.section_edit').removeClass('hidden');
    $(this).siblings('.section_edit').val(value).focus();
  });

  $(document).on('blur','.section_edit',function () {
    let value = $(this).val().trim();
    $(this).addClass('hidden');
    $(this).siblings('.section_name').removeClass('hidden');
    let newVal = (value !='') ? value : 'Untitled Section';
    $(this).siblings('.section_name').text(newVal);
  });

  $(document).on('keyup','.section_edit',function(e){
    if (e.keyCode == '13' || e.which == '13') {
      let value = $(this).val().trim();
      $(this).addClass('hidden');
      $(this).siblings('.section_name').removeClass('hidden');
      let newVal = (value !='') ? value : 'Untitled Section';
      $(this).siblings('.section_name').text(newVal);
    }
  });
});
/* ============== End Section Name edit ======================= */

/* ============= Start Project Hours edit ==================== */
$(document).ready(function() {
  $(document).on('click','.projectHoursName',function () {
    let value = $(this).text().trim();
    $(this).addClass('hidden');
    $(this).siblings('.projectHoursedit').removeClass('hidden');
    $(this).siblings('.projectHoursedit').val(value).focus();
  });

  $(document).on('blur','.projectHoursedit',function () {
    let value = $(this).val().trim();
    $(this).addClass('hidden');
    $(this).siblings('.projectHoursName').removeClass('hidden');
    let newVal = (value !='') ? value : '0';
    $(this).siblings('.projectHoursName').text(newVal);
  });

  $(document).on('keyup','.projectHoursedit',function (e) {
    if (e.keyCode == '13' || e.which == '13') {
      let value = $(this).val().trim();
      $(this).addClass('hidden');
      $(this).siblings('.projectHoursName').removeClass('hidden');
      let newVal = (value !='') ? value : '0';
      $(this).siblings('.projectHoursName').text(newVal);
    }
  });

});
/* ============== End Project Hours edit ======================= */


/* ================ Time Track New Time Hours & Minutes script ======== */
$(document).ready(function (){
  $(document).on('click','#new_time_hours',function (){
    let val = parseInt($(this).val());
    if(val === 0){
      $(this).val('');
    }
  });
  $(document).on('blur','#new_time_hours',function (){
    let val = $(this).val();
    if(val == ''){
      $(this).val('0');
    }
  });

  $(document).on('click','#new_time_minutes',function (){
    let val = parseInt($(this).val());
    if(val === 0){
      $(this).val('');
    }
  });

  $(document).on('blur','#new_time_minutes',function (){
    let val = $(this).val();
    if(val == ''){
      $(this).val('00');
    }
  });

});
/* ================ Time Track New Time Hours & Minutes script ======== */



/*
$(document).ready(function (){
  var hours = '';
  $(document).on('click','.time_hours',function (){
    let val = parseInt($(this).val());
    hours = val;
    $(this).val('')
  });
  $(document).on('blur','.time_hours',function (){
    alert(hours);
    let val = (this).val();
    if(val == ''){
      $(this).val(hours);
    }
  });
});
*/

/* Multi Task Select Due Date Set JS */
$(document).on('click','.TaskMultiSelect .more-option',function (){
  $('.TaskMultiSelect .MoreOptopns').toggleClass('show');
  $('.TaskMultiSelect .DateSet').removeClass('show');
  $('.TaskMultiSelect .MultiAssign').removeClass('show');
});
$(document).on('click','.TaskMultiSelect .multi-set-date',function (){
  $('.TaskMultiSelect .DateSet').addClass('show');
  $('.TaskMultiSelect .MoreOptopns').removeClass('show');
  /*$('.TaskMultiSelect .DateSet .form-control').trigger('click');*/
});
$(document).on('click','.TaskMultiSelect .multi-assign',function (){
  $('.TaskMultiSelect .MultiAssign').addClass('show');
  $('.TaskMultiSelect .MoreOptopns').removeClass('show');
  $("body").addClass('multi-assign-show');
});

