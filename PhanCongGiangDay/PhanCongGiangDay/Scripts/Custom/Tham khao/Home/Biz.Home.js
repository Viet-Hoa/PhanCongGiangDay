$(function () {
    HomeModule.init();
});

var HomeModule = (function () {
    
    var contentNhomAn = "#contentNhomAn";

    function init() {
        loadDanhSachNhomAn();
    }

    function loadDanhSachNhomAn() {
        $(".toa-an-btn").on("click",
            function () {
                showLoadingOverlay(contentNhomAn);
                
                    $(".list-group > .toa-an-btn").removeClass("custom-active-toa-an");
                    $(this).addClass("custom-active-toa-an");
                
                $(contentNhomAn).load("/Home/DanhSachNhomAn", 'toaAnId=' + $(this).data("id"));
                $('#title_header').load("/Home/ChangeTitleHeader");
                $('#login_partial').load("/Home/ChangeLoginPartial");
                hideLoadingOverlay(contentNhomAn);
            });
    }

    return {
        init: init
    }
})();
