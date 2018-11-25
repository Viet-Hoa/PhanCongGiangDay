$(function () {
    XuatExcelModule.init();
});

var XuatExcelModule = (function () {
    function init() {
        MauSo04();
    }

    function MauSo04() {
        $('#mau_04').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMau04?BangPhanCongID=" + $("#NamHoc").val();
        });
    }
    
    return {
        init: init
    }
})();
