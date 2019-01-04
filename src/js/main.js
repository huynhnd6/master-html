// main menu

$('a[href="#"]').click(function () {
    return false;
});

$('.btn-sub').click(function () {
    $('.overlay').fadeToggle();
    $(this).parent().toggleClass('active');
    a = $(this).attr('href');
    $(a).toggleClass('show');
    return false;
});