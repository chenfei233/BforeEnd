// $(document).ready(function () {

    $("#code_ok").hide();// 隐藏OKdiv
    $("#code_no").hide();// 隐藏NOdiv

    var layer; // layer全局定义
    var code=""; // 在全局定义验证码
    var flag=false; // 输入验证码是否正确标志

    /**
     *  layer全局化定义
     * */
    layui.use('layer', function () {
        layer = layui.layer;
    });

    createCode(); // 第一次运行显示验证码

    /**
     *  验证码函数
     * */
    function createCode() {
        code="";

        $("#code_ok").hide();// 隐藏OKdiv
        $("#code_no").hide();// 隐藏NOdiv

        var codeLength = 4;// 验证码的长度
        $("#code").attr({
            "value": ""
        });
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');// 随机数
        for (var i = 0; i < codeLength; i++) {// 循环操作
            var index = Math.floor(Math.random() * 36);// 取得随机数的索引（0~35）
            code += random[index];// 根据索引取得随机数加到code上
        }
        $("#code").attr({
            "value": code
        });
    }

    /**
     *  校验验证码正确性
     * */
    $("#ey_code").on('input propertychange', function () {
        var ey_code = $("#ey_code").val().toUpperCase(); // 转换为大写
        if (ey_code != code && ey_code.length>3) {
            flag=false;
            $("#code_ok").hide();// 隐藏OKdiv
            $("#code_no").show();// 显示NOdiv
        } else if (ey_code == code && ey_code.length>3){
            flag=true;
            $("#code_ok").show();// 显示OKdiv
            $("#code_no").hide();// 隐藏NOdiv
        } else {
            flag=false;
            $("#code_ok").hide();// 隐藏OKdiv
            $("#code_no").hide();// 隐藏NOdiv
        }
    });

    /**
     *  点击刷新验证码
     * */
    $("#code").click(function (){
        createCode();
    });

    /**
     *  登录按钮 （校验账号密码输入是否为空）
     * */
    $("#entry").click(function () {
        var ey_name = $("#ey_name").val();// 获取用户名
        var ey_pswd = $("#ey_pswd").val();// 获取密码
        if (ey_name.length > 0 && ey_pswd.length > 0 && flag) {
            $.ajax({
                url:"http://localhost:8080/Bibased/Phuser/phuserLogin", //处理登录页面的路径
                data:{
                    phnum:ey_name,
                    phpswd:ey_pswd
                },//要提交的数据是一个JSON
                type:"POST", //提交方式
                dataType:"TEXT", //返回数据的类型
                //TEXT字符串 JSON返回JSON XML返回XML
                success:function(data){ //回调函数 ,成功时返回的数据存在形参data里
                    if(data){
                        layer.open({
                            title: '提醒',
                            content: '登陆成功！'
                        });
                    }else{
                        layer.open({
                            title: '警告',
                            content: '账号或密码错误！'
                        });
                        createCode(); // 刷新一次验证码
                    }
                },
                error:function (data) {
                    alert("出错了!");
                }
            });
        }else if(ey_name.length == 0 || ey_pswd.length == 0){
            layer.open({
                title: '警告',
                content: '账号或密码不能为空！'
            });
        } else if(!flag){
            createCode();
            layer.open({
                title: '警告',
                content: '验证码不正确！'
            });
        }
    });
// });