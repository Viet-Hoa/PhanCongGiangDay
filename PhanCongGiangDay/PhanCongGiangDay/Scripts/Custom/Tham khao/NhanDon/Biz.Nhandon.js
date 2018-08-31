var NhanDon = (function () {
    var modalId = "#modelNhanHoSoMoi",
        modelTrangThai = "#modelChuyenTrangThai",
        formEdit = "#formThemHoSoVuAn",
        formEditApDung = "#formThemHoSoVuAnApDung",
        formEditHinhSu = "#formThemHoSoVuAnHinhSu",
        formTrangThai = "#formChuyenTrangThai";       
    
    var editUrl = "/NhanDon/ThemHoSoVuAn",
        editApDungUrl = "/NhanDon/ThemHoSoVuAnApDungBPXLHC",
        editHinhSuUrl = "/NhanDon/ThemHoSoVuAnHinhSu",
        chuyenTrangThaiUrl = "/NhanDon/ChuyenCongDoan";
    var $quanHePhapLuat;

    //var idTextarea = 'NoiDungDon';

    function init() {        
        $(modalId).on("shown.bs.modal", function (e) {
            openFormEdit();
        });

        $(modelTrangThai).on("show.bs.modal", function (e) {
            var hoSoVuAnID = $(e.relatedTarget).attr('data-hosovuanid'),
                trangThai = $(e.relatedTarget).attr('data-trangthai');

            $(this).find('input[name=HoSoVuAnID]').val(hoSoVuAnID);
            $(this).find('select[name=TrangThai]').val(trangThai);
        });

        $quanHePhapLuat = $("#QuanHePhapLuat");
        initRoleTaoHoSoMoi();
        initRoleNhanHoSoPhucTham();
        updateForm();
        updateFormApDung();
        updateFormHinhSu();
        chuyenTrangThaiForm();
        resetTimKiemMoRong();

        if ($.cookie('FlashMessage') == 'success') {
            $.notify({ message: "Hồ sơ mới được tạo thành công" }, { type: "success" });
        }

        $.cookie('FlashMessage', null, { path: '/' });
    }

    function openFormEdit() {
        showLoadingOverlay(modalId + " .modal-content");
        $.ajax({
            type: "GET",
            url: editUrl,
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

    function updateFormApDung() {
        $(document).on("submit", formEditApDung, function () {
            var _this = this;
            showLoadingOverlay(modalId + " .modal-content");
            $.ajax({
                type: "POST",
                url: editApDungUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEditApDung).length === 0) {
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

    function updateFormHinhSu() {
        $(document).on("submit", formEditHinhSu, function () {
            var _this = this;

            showLoadingOverlay(modalId + " .modal-content");
            $.ajax({
                type: "POST",
                url: editHinhSuUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEditHinhSu).length === 0) {
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

    function chuyenTrangThaiForm() {
        $(document).on("submit", formTrangThai, function () {
            var _this = this;
            showLoadingOverlay(modelTrangThai + " .modal-content");

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: chuyenTrangThaiUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            });

            return false;
        });
    }

    function resetTimKiemMoRong() {
        $("#btnSearchReset").on("click",
            function () {
                $("#ngay-nhan-don-tu-dtp").find("input").val("");
                $("#ngay-nhan-don-den-dtp").find("input").val("");
                $("#NguoiKyXacNhanDaNhanDon, #HinhThucGoiDon, #CongDoanHoSo, #LoaiDon, #LoaiQuanHe, #YeuToNuocNgoai")
                    .each(function() {
                        $(this).val($(this).find("option:first").val());
                    });
            });
    }    

    function initRoleTaoHoSoMoi() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVienAction",
            data: {
                contrCheck: "NhanDon",
                actionCheck: "ThemHoSoVuAn"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#btnTaoHoSo").addClass("add-disabled");
                }
            }
        });
    }
    function initRoleNhanHoSoPhucTham() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVienAction",
            data: {
                contrCheck: "NhanDon",
                actionCheck: "NhanHoSoPhucTham"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#btnTaoHoSo").addClass("add-disabled");
                }
            }
        });
    }

    return {
        init: init
    }
})();

$(function () {
    NhanDon.init();
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
        intTextBox();
    }

    function intTextBox() {
        $(".intText").on("keypress keyup blur", function (event) {
            if ($(this).val() == 0) {
                $(this).val('');
            }
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }            
        });
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