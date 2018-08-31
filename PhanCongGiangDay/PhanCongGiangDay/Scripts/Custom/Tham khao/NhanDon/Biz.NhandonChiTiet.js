var NhanDonChiTiet = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();
    var $quanHePhapLuat;

    var modalId = "#modelSuaHoSoMoi",
        formEdit = "#formThemHoSoVuAn",
        formEditApDung = "#formThemHoSoVuAnApDung",
        formEditHinhSu = "#formThemHoSoVuAnHinhSu",
        modalCongDoan = "#modalChuyenCongDoan",
        formCongDoan = "#formChuyenCongDoan",
        selectNgayTaoHoSo = "#selectNgayTaoHoSoVuAn",
        contentChiTietHoSo = "#contentChiTietHoSoVuAn";

    var editUrl = "/NhanDon/ThemHoSoVuAn",
        editApDungUrl = "/NhanDon/ThemHoSoVuAnApDungBPXLHC",
        editHinhSuUrl = "/NhanDon/ThemHoSoVuAnHinhSu",
        logHoSoVuAnUrl = "/NhanDon/ChiTietHoSoTheoLog",
        kiemTraQuyenNhanVienUrl = "/Biz/KiemTraQuyenNhanVien";

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {
            openFormEdit();
        });
        $quanHePhapLuat = $("#QuanHePhapLuat");
        updateForm();
        //updateFormApDung();
        //updateFormHinhSu();
        chuyenCongDoanForm();
        chuyenCongDoanNext();
        chuyenCongDoanPrev();
        initRoleNhanVien();
        initRoleChuyenCongDoan();

        if ($.cookie('FlashMessage') == 'success') {
            $.notify({ message: "Cập nhật hồ sơ thành công" }, { type: "success" });
        }

        $.cookie('FlashMessage', null, { path: '/' });
        
        $(document).on("change", selectNgayTaoHoSo, function () {
            showLoadingOverlay(contentChiTietHoSo);
            $.ajax({
                type: "GET",
                url: logHoSoVuAnUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentChiTietHoSo).html(response);

                    hideLoadingOverlay(contentChiTietHoSo);
                }
            });
        });

        //$(document).ready(function () {
        //    if ($("#giaiDoanHoSo").val() == 2) {
        //        $(".tab-content, .nav-tabs").hide();
        //    } else {
        //        $(".tab-content, .nav-tabs").show();
        //    }
        //});
    }
   
    function openFormEdit() {
        showLoadingOverlay(modalId + " .modal-content");
        $.ajax({
            type: "GET",
            url: editUrl,
            data: { id: HoSoVuAnID },
            success: function (response) {
                $(modalId + " .modal-content").html(response);

                hideLoadingOverlay(modalId + " .modal-content");
            }
        });
    }

    function updateForm() {
        $(document).on("submit", formEdit, function () {
            var _this = this;
            showLoadingOverlay(modalId + " .modal-content");
            $.ajax({
                type: "POST",
                url: editUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEdit).length === 0) {
                        if (response.status == 'success') {
                            $.cookie('FlashMessage', 'success', { path: '/' });
                            window.location.reload();
                        }
                    }
                    else {
                        $(modalId + " .modal-content").html(response);
                    }

                    hideLoadingOverlay(modalId + " .modal-content");
                }
            });

            return false;
        });
    }

    //function updateFormApDung() {
    //    $(document).on("submit", formEditApDung, function () {
    //        var _this = this;
    //        showLoadingOverlay(modalId + " .modal-content");
    //        $.ajax({
    //            type: "POST",
    //            url: editApDungUrl,
    //            data: $(_this).serialize(),
    //            success: function (response) {
    //                var $wrapperResponse = $("<div>").append(response);

    //                if ($wrapperResponse.find(formEditApDung).length === 0) {
    //                    if (response.status == 'success') {
    //                        $.cookie('FlashMessage', 'success', { path: '/' });
    //                        window.location.reload();
    //                    }
    //                }
    //                else {
    //                    $(modalId + " .modal-content").html(response);
    //                }

    //                hideLoadingOverlay(modalId + " .modal-content");
    //            }
    //        });

    //        return false;
    //    });
    //}

    //function updateFormHinhSu() {
    //    $(document).on("submit", formEditHinhSu, function () {
    //        var _this = this;
    //        showLoadingOverlay(modalId + " .modal-content");
    //        $.ajax({
    //            type: "POST",
    //            url: editHinhSuUrl,
    //            data: $(_this).serialize(),
    //            success: function (response) {
    //                var $wrapperResponse = $("<div>").append(response);

    //                if ($wrapperResponse.find(formEditHinhSu).length === 0) {
    //                    if (response.status == 'success') {
    //                        $.cookie('FlashMessage', 'success', { path: '/' });
    //                        window.location.reload();
    //                    }
    //                }
    //                else {
    //                    $(modalId + " .modal-content").html(response);
    //                }

    //                hideLoadingOverlay(modalId + " .modal-content");
    //            },
    //            complete: function() {
    //                return false;
    //            }
    //        });

    //        return false;
    //    });
    //}

    function chuyenCongDoanForm() {
        $("#chuyen-cong-doan-btn").on("click", function () {
            showLoadingOverlay(modalCongDoan + " .modal-content");

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: $(formCongDoan).prop("action"),
                data: $(formCongDoan).serialize(),
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            });

            return false;
        });
    } 

    function chuyenCongDoanNext() {
        $("#btnChuyenCongDoanNext").on("click", function () {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/NhanDon/ChuyenCongDoanNext",
                data: {
                    HoSoVuAnID: HoSoVuAnID
                },
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.replace(response.urlCongDoan);
                    }
                }
            });

            return false;
        });
    }

    function chuyenCongDoanPrev() {
        $("#btnChuyenCongDoanPrev").on("click", function () {

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/NhanDon/ChuyenCongDoanPrev",
                data: {
                    HoSoVuAnID: HoSoVuAnID
                },
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.replace(response.urlCongDoan);
                    }
                }
            });

            return false;
        });
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: kiemTraQuyenNhanVienUrl,
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "NhanDon",
                actionCheck: "ThemHoSoVuAn"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaHoSo").addClass("edit-disabled");
                    $("#btnChuyenCongDoan, #btnChuyenCongDoanNext, #btnChuyenCongDoanPrev").addClass("edit-disabled");
                }
            }
        });
    }

    function initRoleChuyenCongDoan() {
        $.ajax({
            type: "GET",
            url: kiemTraQuyenNhanVienUrl,
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "NhanDon",
                actionCheck: "ChuyenCongDoan"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#btnChuyenCongDoan, #btnChuyenCongDoanNext, #btnChuyenCongDoanPrev").addClass("edit-disabled");
                }
            }
        });
    }



    return {
        init: init
    }
})();

$(function () {
    NhanDonChiTiet.init();
});

var EditNhanDon = (function () {
    function init() {
        initHinhThucGoiDon();
        onHinhThucGoiDonChange();
        initQuanHePhapLuat();
        onQuanHePhapLuatChange();
    }

    function onHinhThucGoiDonChange() {
        var $hinhThucGoiDon = $("#hinh-thuc-goi-don-ddl");
        $hinhThucGoiDon.on("change",
            function () {
                if (this.value === "Khác") {
                    $("#hinh-thuc-goi-don-textbox").attr("disabled", false);
                    $("#hinh-thuc-goi-don-ddl").attr("name", "").addClass("mb-3");
                    $(this).parent().find('.option-hidden').show();

                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#hinh-thuc-goi-don-textbox").attr("disabled", true).val("");
                    $("#hinh-thuc-goi-don-ddl").attr("name", "HinhThucGoiDon").removeClass("mb-3");
                }
            });
    }

    function initHinhThucGoiDon() {
        var isKhac = true;
        var $hinhThucHidden = $("#hinh-thuc-goi-don-hidden");

        $("#hinh-thuc-goi-don-ddl option").each(function () {
            if ($(this).val() == $hinhThucHidden.val() & $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $($hinhThucHidden).parent().find('.option-hidden').show();
            $("#hinh-thuc-goi-don-textbox").attr("disabled", false).val($hinhThucHidden.val());
            $("#hinh-thuc-goi-don-ddl").attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $($hinhThucHidden).parent().find('.option-hidden').hide();
            $("#hinh-thuc-goi-don-textbox").attr("disabled", true).val("");
            $("#hinh-thuc-goi-don-ddl").attr("name", "HinhThucGoiDon");
        }
    }

    function initQuanHePhapLuat() {
        var isKhac = true;
        var $quanHePhapLuatHidden = $("#QuanHePhapLuatHidden");
        var $quanHePhapLuatTextbox = $("#QuanHePhapLuatTextbox");
        var $quanHePhapLuat = $("#QuanHePhapLuatDDL");

        $("#ddlLoaiQuanHe").on("change", function () {
            if (this.value === "Tranh chấp") {
                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-tranhchap li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });

            }
            else {
                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-yeucau li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });
            }
        });

        $("#QuanHePhapLuatDDL option").each(function () {
            if ($(this).val() == $quanHePhapLuatHidden.val() & $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $quanHePhapLuatHidden.parent().find('.option-hidden').show();
            $quanHePhapLuatTextbox.attr("disabled", false).val($quanHePhapLuatHidden.val());
            $quanHePhapLuat.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $quanHePhapLuatHidden.parent().find('.option-hidden').hide();
            $quanHePhapLuatTextbox.attr("disabled", true).val("");
            $quanHePhapLuat.attr("name", "QuanHePhapLuat");
        }
    }

    function onQuanHePhapLuatChange() {
        var $quanHePhapLuat = $("#QuanHePhapLuatDDL");
        $quanHePhapLuat.on("change",
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#QuanHePhapLuatTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#QuanHePhapLuatTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "QuanHePhapLuat").removeClass("mb-3");
                }
            });
    }

    return {
        init: init
    }
})();

var EditNhanDonADBPXLHC = (function () {
    function init() {
        initTenCoQuanDeNhgi();
        onTenCoQuanDeNhgiChange();
    }
    function onTenCoQuanDeNhgiChange() {
        $("#ten-co-quan-de-nghi-ddl").on("change",
            function () {
                if (this.value === "Khác") {
                    $("#ten-co-quan-de-nghi-textbox").attr("disabled", false);
                    $("#ten-co-quan-de-nghi-ddl").attr("name", "").addClass("mb-3");
                    $(this).parent().find('.option-hidden').show();

                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#ten-co-quan-de-nghi-textbox").attr("disabled", true).val("");
                    $("#ten-co-quan-de-nghi-ddl").attr("name", "TenCoQuanDeNghi").removeClass("mb-3");
                }
            });
    }

    function initTenCoQuanDeNhgi() {
        var isKhac = true;
        var $coQuanDeNghiHidden = $("#ten-co-quan-de-nghi-hidden");

        $("#ten-co-quan-de-nghi-ddl option").each(function () {
            if ($(this).val() == $coQuanDeNghiHidden.val()) {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $($coQuanDeNghiHidden).parent().find('.option-hidden').show();
            $("#ten-co-quan-de-nghi-textbox").attr("disabled", false).val($coQuanDeNghiHidden.val());
            $("#ten-co-quan-de-nghi-ddl").attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $($coQuanDeNghiHidden).parent().find('.option-hidden').hide();
            $("#ten-co-quan-de-nghi-textbox").attr("disabled", true).val("");
            $("#ten-co-quan-de-nghi-ddl").attr("name", "TenCoQuanDeNghi");
        }
    }
    return {
        init: init
    }
})();

var EditNhanDonHinhSu = (function () {
    function init() {
        initVienKiemSatTruyTo();
        onVienKiemSatTruyToChange();
    }
    function onVienKiemSatTruyToChange() {
        $("#vks-truy-to-ddl").on("change",
            function () {
                if (this.value === "Khác") {
                    $("#vks-truy-to-textbox").attr("disabled", false);
                    $("#vks-truy-to-ddl").attr("name", "").addClass("mb-3");
                    $(this).parent().find('.option-hidden').show();

                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#vks-truy-to-textbox").attr("disabled", true).val("");
                    $("#vks-truy-to-ddl").attr("name", "VienKiemSatTruyTo").removeClass("mb-3");
                }
            });
    }

    function initVienKiemSatTruyTo() {
        var isKhac = true;
        var $coQuanDeNghiHidden = $("#vks-truy-to-hidden");

        $("#vks-truy-to-ddl option").each(function () {
            if ($(this).val() == $coQuanDeNghiHidden.val()) {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $($coQuanDeNghiHidden).parent().find('.option-hidden').show();
            $("#vks-truy-to-textbox").attr("disabled", false).val($coQuanDeNghiHidden.val());
            $("#vks-truy-to-ddl").attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $($coQuanDeNghiHidden).parent().find('.option-hidden').hide();
            $("#vks-truy-to-textbox").attr("disabled", true).val("");
            $("#vks-truy-to-ddl").attr("name", "VienKiemSatTruyTo");
        }
    }
    return {
        init: init
    }
})();