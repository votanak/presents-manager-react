
jQuery(document).ready(function ($) {


if ($(window).width() < 768) {

$('.filtropen').show();
$('.paramfilter').hide();

$('.filtropen').click( function(){
	$('.paramfilter').toggle();
});


}







$('a[data-toggle="sppb-tab"]').on('click', function (e) {
	//$('.slickslider').slick('destroy');
	$('.vmtabs').slick('setPosition');
});


$('a.myLinkModal').click( function(event){
    event.preventDefault();
    $('#myOverlay').fadeIn(297,	function(){
      $('#myModal') 
      .css('display', 'block')
      .animate({opacity: 1}, 198);
    });
  });

  $('#myModal__close, #myOverlay').click( function(){
    $('#myModal').animate({opacity: 0}, 198, function(){
      $(this).css('display', 'none');
      $('#myOverlay').fadeOut(297);
    });
  });


$('a.myLinkModal2').click( function(event){
    event.preventDefault();
    $('#myOverlay2').fadeIn(297,	function(){
      $('#myModal2') 
      .css('display', 'block')
      .animate({opacity: 1}, 198);
    });
  });

  $('#myModal__close2, #myOverlay2').click( function(){
    $('#myModal2').animate({opacity: 0}, 198, function(){
      $(this).css('display', 'none');
      $('#myOverlay2').fadeOut(297);
    });
  });




//$('select option').click(function(){

//$(this).parent('select').find('option:selected').prop('selected', false)
//        $(this).prop('selected', true);
//    });


    /*
    select в настраиваемых полях
    */
    function selectFiels() {
        $('.product-field-type-S select').addClass('selectpicker').attr({
            'data-style': 'btn-default btn-block',
            'data-menu-style': 'dropdown-blue'
        });
    }
    selectFiels();
    
    /*
    Переключение табов при просмотре отзывов
    */
    var hash = window.location.hash;
    if(hash == '#review-tab'){
        $('.tab-home, .tab-content #home').removeClass('active');
        $('.tab-reviews').addClass('active');
        $('.tab-content #reviews').addClass('active in');
        $('.nav-tabs li').click(function() {
            var topHeight = $(document).scrollTop();
            window.location.hash = ''; 
            $('html, body').scrollTop(topHeight);
        });
    } 
    
    /*
    КОРЗИНА VP One Page
    */
    function cartVirtuemart(){
        /*удалить всплывающие подсказки у полей в корзине*/
        setTimeout(function(){
           $('.view-cart .hover-tootip').removeAttr('data-tiptext'); 
        }, 1500);

        /*активировать чекбокс tos (скрыт по умолчанию) в контактных данных*/
        $('.view-cart .proopc-bt-address input.terms-of-service').attr('checked', 'checked');
    }
    cartVirtuemart();
    
    /*скрипты после ajax обновления корзины */
    jQuery(document).ajaxComplete(function(event, xhr, settings) {       
        if(settings.data == "task=procheckout"){
            jQuery('#phone_1_field').mask('+7(999) 999-99-99').attr('placeholder','');
            cartVirtuemart();
        }
    });   
    
    /*
    КОРЗИНА ONE PAGE
    */
    /*способы доставки*/
 
    
    /*label для полей*/
    $('#billto_inputdiv input').each(function(){
        var titleInput = $(this).attr('placeholder'); // название поля
        var fotInput = $(this).attr('id'); // id поля
        var requiredInput = ($(this).hasClass('required')) ? ' <span class="asterisk">*</span>' : ''; 
        $(this).before("<label class='col-lg-3 col-md-3 col-sm-4 col-xs-12 control-label'></label>");
        $(this).prev('label').attr({'for':fotInput}).html(titleInput + requiredInput);
        $(this).removeAttr('placeholder').addClass('form-control');
    });
    
    /*активация условия обслуживания по умолчанию и его скрытие в списке всех полей*/
    $('.view-cart input#tos').prop('checked', true);
    $('.view-cart label[for="tos"]').closest('div').addClass('hidden');
    
    /*вызов окна с условиями обслуживания*/
    $('.tos-field').click(function(){
        $('a#terms-of-service').trigger('click');
    });
    
    /*
    //КОРЗИНА ONE PAGE
    */
    
    /*
    страница благодартности за заказ
    */
    $('.vm-order-done a').attr('class', 'btn btn-primary btn-sm');
    
    /*
    страница просмотра всех заказов
    */
    $('.view-orders #com-form-order-submit input').addClass('btn btn-primary');
    
    /*
    страница аккаунта
    */
    $('form#com-form-login input[type="submit"]').addClass('btn btn-primary');
    $('form#com-form-login label[for="remember"]').prepend($('form#com-form-login input#remember').attr('data-toggle','checkbox')).addClass('checkbox checkbox-blue').show();
    $('form#adminForm label[for="tos"]').closest('tr').addClass('tos-block');
    $('form#adminForm label[for="tos"]').prepend($('form#adminForm input#tos').attr('data-toggle','checkbox')).addClass('checkbox checkbox-blue');
    $('form#adminForm button[type="submit"]').addClass('btn btn-primary');
    $('form#adminForm button[type="reset"]').addClass('btn btn-default');
    $('form#form-login input[type="submit"]').addClass('btn btn-default');
    
    /*
    страница стандартного входа joomla
    */
    $('.view-login div.checkbox label').addClass('checkbox');
    $('.view-login div.checkbox input').attr('data-toggle', 'checkbox');
    $('.view-login div.checkbox').removeClass('checkbox');
    
    /*
    страница восстановления логина и пароля
    */
    $('.view-reset button[type="submit"]').addClass('btn btn-primary');
    
    /*
    страница блока материалов
    */
    $('.blog .readmore-link').addClass('btn btn-primary');
    
    /*
    замена имени пользователя на email в форме входа
    необходимо если активирован плагин VM Clean Redistration
    в личном кабинете правки внесены в файле /templates/trendshop/html/com_virtuemart/sublayouts/login.php
    */
    $('.view-cart #userlogin_username').attr({
       'alt' : 'Email',
        'placeholder' : ' Email'
    });
});