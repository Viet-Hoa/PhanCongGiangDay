$(function () {
    TimKiemNVModule.init();
});

var TimKiemNVModule = (function () {
    var formTimKiemNhanVien = $("#formTimKiemNhanVien");

    var timKiemNhanVienUrl = "/QuanLyNhanVien/DanhSachNhanVienTheoKeyword";

    function init() {
        timKiemNhanVien();
    }
    function timKiemNhanVien() {
        $("#keywordNhanVien").keyup(_.debounce( function () {
            
            $.ajax({
                type: "GET",
                url: timKiemNhanVienUrl,
                data: {
                    keyword: $("#keywordNhanVien").val(),
                    toaAnId: $("#toaAn-ddl").val()
                },
                success: function (data) {
                    $("#nhanviencontent").html(data);
                    
                }
            });
        },500));
    }

    return {
        init: init
    }
})();