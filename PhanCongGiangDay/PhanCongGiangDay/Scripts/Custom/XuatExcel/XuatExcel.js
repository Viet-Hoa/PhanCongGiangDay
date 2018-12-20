$(function () {
    XuatExcelModule.init();
});

var XuatExcelModule = (function () {
    function init() {
        MauSo04();
        MauSo03();
        MauSo02();
        MauBoMon();
        Mau01HK1();
        Mau01HK2();
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

    function MauSo02() {
        $('#mau_02').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMau02?BangPhanCongID=" + $("#NamHoc").val();
        });
    }

    function MauBoMon() {
        $('#mau_bomon').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMauBoMon?BangPhanCongID=" + $("#NamHoc").val();
        });
    }

    function MauGV() {
        $('#BPC-hidden').val($("#NamHoc").val());
        $('#check-all').click(function () {
            $("input:checkbox").prop('checked', $(this).prop("checked"));
        });
        $('#btn_xuatGV').click(function () {
            $('#modal').modal("hide");
            //var d = new Date();
            //var $checkboxes = $('#formGv td input[type="checkbox"]');
            //var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
            //if (countCheckedCheckboxes == 1) {
            //    $.ajax({
            //        url: '/XuatExcel/XuatExcelMauGiangVien',
            //        method: 'POST',
            //        data: $('#formGv').serialize(),
            //        xhrFields: {
            //            responseType: 'blob'
            //        },
            //        success: function (data) {
            //            var a = document.createElement('a');
            //            var url = window.URL.createObjectURL(data);
            //            a.href = url;
            //            a.download = 'BangPhanCongCongTacCanBoGiangVienCoHuu_MauGiangVien_' + d.getDate() + (d.getMonth() + 1) + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + '.xlsx';
            //            a.click();
            //            window.URL.revokeObjectURL(url);
            //            $('#modal').modal("hide");
            //        }
            //    });

            //}
            //else {
            //    $.ajax({
            //        url: '/XuatExcel/XuatExcelMauGiangVien',
            //        method: 'POST',
            //        data: $('#formGv').serialize(),
            //        xhrFields: {
            //            responseType: 'arraybuffer'
            //        },
            //        success: function (data) {
            //            var a = document.createElement('a');
            //            var blob = new Blob([data], { type: "application/zip" });
            //            var url = window.URL.createObjectURL(blob);
            //            a.href = url;
            //            a.download = 'BangPhanCongCongTacCanBoGiangVienCoHuu_MauGiangVien_' + d.getDate() + (d.getMonth() + 1) + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + '.zip';
            //            a.click();
            //            window.URL.revokeObjectURL(url);
            //            $('#modal').modal("hide");
            //        }
            //    });
            //}
        });

    }

    function Mau01HK1() {
        $('#mau_01_hk1').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMau01_HK1?BangPhanCongID=" + $("#NamHoc").val();
        });
    }
    function Mau01HK2() {
        $('#mau_01_hk2').click(function () {
            window.location.href = "/XuatExcel/XuatExcelMau01_HK2?BangPhanCongID=" + $("#NamHoc").val();
        });
    }

    return {
        init: init,
        MauGV: MauGV
    }
})();
