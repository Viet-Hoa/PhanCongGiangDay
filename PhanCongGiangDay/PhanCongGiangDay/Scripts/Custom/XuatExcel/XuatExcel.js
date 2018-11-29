$(function () {
    XuatExcelModule.init();
});

var XuatExcelModule = (function () {
    function init() {
        MauSo04();
        MauSo03();
    }

    function MauSo04() {
        $('#mau_04').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMau04?BangPhanCongID=" + $("#NamHoc").val();
        });
    }

    function MauSo03() {
        $('#mau_03').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMau03?BangPhanCongID=" + $("#NamHoc").val();
        });
    }

    return {
        init: init
    }
})();
