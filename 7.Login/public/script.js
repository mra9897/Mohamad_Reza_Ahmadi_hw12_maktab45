const SERVER_URL = "http://localhost:5002/login";
$(function(){
    $('#login').on('click', ()=>{
        const username = $('#username').val();
        const password = $('#password').val();

        if(!validation()) return false;

        $.post(SERVER_URL, JSON.stringify({username, password}))
            .done(data=>{
                const parsed = JSON.parse(data);
                if(parsed.result === 1) {
                    normal($("#username"));
                    normal($("#password"));
                    alert("ورود موفقیت آمیز");
                }
                else {
                    error($("#username"));
                    error($("#password"));
                    alert("کاربری با این مشخصات وجود ندارد");
                }
            })
            .fail(()=>{
                alert("خطا در ارسال اطلاعات به سمت سرور");
            });
    });
});
const validation = () => {
    const username = $('#username');
    const password = $('#password');
    let wrong = false;

    if(!username.val()) {
        error(username, true);
        wrong = true;
    } else normal(username);

    if(!password.val()){
        error(password, true);
        wrong = true;
    } else normal(password);

    return !wrong;
}

const error = (element, text = false) => {
    $(element).parent().css("border","2px solid orangered");
    $(element).children('i').css("color","orangered");
    if(text) {
        $(`div[data-target=${$(element).attr("id")}]`).show();
    }
}
const normal = element => {
    $(element).parent().css("border","none");
    $(element).children('i').css("color","white");
    $(`div[data-target=${$(element).attr("id")}]`).hide();
}