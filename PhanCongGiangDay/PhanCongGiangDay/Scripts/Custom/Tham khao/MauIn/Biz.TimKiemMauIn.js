$(function () {
    TimKiemMauInModule.init();
});

var TimKiemMauInModule = (function () {
    var timKiemMauInUrl = "/MauIn/DanhSachMauInSearchByKeyword";

    function init() {
        timKiemMauIn();
    }

    function timKiemMauIn() {
        $("#keywordMauIn").keyup(function () {
            $.ajax({
                type: "GET",
                url: timKiemMauInUrl,
                data: {
                    keyword: $("#keywordMauIn").val(),
                },
                success: function (data) {
                    $("#danhSachMauIn").html(data);
                }
            });
        });
    }
    return {
        init: init
    }
})();