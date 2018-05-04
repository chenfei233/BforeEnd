$("#header_left_title,.user_name,.user_logout,.header_right_about").on({
    mouseover : function(){
        $(this).css("color","#ffc81f");
    },mouseout : function(){
        $(this).css("color","white");
    }
}) ;

$(".cate").on({
    mouseover : function(){
        $(this).css("color","#ffc81f");
    },mouseout : function(){
        $(this).css("color","#777777");
    }
}) ;

$(".user_so").click(function (){
    $("#user_so").css("display","block");
});

