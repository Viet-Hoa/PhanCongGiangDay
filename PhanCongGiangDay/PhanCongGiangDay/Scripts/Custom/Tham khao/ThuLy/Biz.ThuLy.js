$(function () {
    ChiTietHoSoModule.init();
});

var ChiTietHoSoModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalCongDoan = "#modelChuyenCongDoan",
        formCongDoan = "#formChuyenCongDoan",
        contentChiTietHoSo = "#contentThongTinChiTietHoSo",
        selectNgayTaoHoSo = "#selectNgayTaoHoSoThuLy";

    var chiTietHoSoUrl = "/ThuLy/ChiTietHoSo",
        logHoSoVuAnUrl = "/ThuLy/ChiTietHoSoTheoId";

    function init() {
        chuyenCongDoanForm();
        chuyenCongDoanNext();
        chuyenCongDoanPrev();
        loadChiTietHoSoTheoId();
        initRoleNhanVien();
        initRoleChuyenCongDoan();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ThuLy",
                actionCheck: "EditChiTietHoSo"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaHoSoThuLy").addClass("edit-disabled");
                    $("#btnChuyenCongDoan, #btnChuyenCongDoanNext, #btnChuyenCongDoanPrev").addClass("edit-disabled");
                }
            }
        });
    }

    function initRoleChuyenCongDoan() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
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

    function loadChiTietHoSoTheoId() {
        $(document).on("change", selectNgayTaoHoSo, function () {
            showLoadingOverlay(contentChiTietHoSo);
            $.ajax({
                type: "GET",
                url: logHoSoVuAnUrl,
                data: {
                    id: $(this).val(),
                    hoSoVuAnId: hoSoVuAnId
                },
                success: function (response) {
                    $(contentChiTietHoSo).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentChiTietHoSo);
                }
            });
        });
    }

    function loadChiTietHoSo() {
        showLoadingOverlay(contentChiTietHoSo);
        $.ajax({
            type: "GET",
            url: chiTietHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentChiTietHoSo).html(response);

                hideLoadingOverlay(contentChiTietHoSo);
            }
        });
    }

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
                    HoSoVuAnID: hoSoVuAnId
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
                    HoSoVuAnID: hoSoVuAnId
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

    return {
        init: init,
        loadChiTietHoSo: loadChiTietHoSo
    }
})();

var EditChiTietHoSoModule = (function (chiTietHoSoModule) {
    var $formEditChiTietHoSo;
    var $quanHePhapLuat,
        $loaiQuanHe,
        $KhieuKien;

    function initKhieuKien() {
        var isKhac = true;
        var $KhieuKienHidden = $("#KhieuKienHidden");
        var $KhieuKienTextbox = $("#KhieuKienTextbox");


        $("#khieukienddl option").each(function () {
            if ($(this).val() == $KhieuKienHidden.val() && $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $KhieuKienHidden.parent().find('.option-hidden').show();
            $KhieuKienTextbox.attr("disabled", false).val($KhieuKienHidden.val());
            $KhieuKien.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $KhieuKienHidden.parent().find('.option-hidden').hide();
            $KhieuKienTextbox.attr("disabled", true).val("");
            $KhieuKien.attr("name", "QuanHePhapLuat");
        }
    }

    function onKhieuKienPLChange() {
        //var $KhieuKien = $("#KhieuKienDDL");
        $KhieuKien.change(
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#KhieuKienTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#KhieuKienTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "QuanHePhapLuat").removeClass("mb-3");
                }
            });
    }

    function init() {
        $formEditChiTietHoSo = $("#formEditChiTietHoSo");
        $quanHePhapLuat = $("#QuanHePhapLuatDDL");
        $loaiQuanHe = $("#LoaiQuanHe");
        $KhieuKien = $('#khieukienddl');
        initKhieuKien();
        onKhieuKienPLChange();
        initHinhThucGoiDon();
        onHinhThucGoiDonChange();
        onLoaiQuanHeChange();
        initQuanHePhapLuat();
        onQuanHePhapLuatChange();
        initDateTimePicker();
        bindFormActions();
    }
    function initDateTimePicker() {
        $("#ngay-lam-don-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
        });
        $("#ngay-nop-don-tai-toa-an-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
        });
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
            if ($(this).val() == $hinhThucHidden.val()) {
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

    function onLoaiQuanHeChange() {
        $("#LoaiQuanHe").on("change", function () {
            if (this.value === "Tranh chấp") {
                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-tranh-chap li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });
            }
            else {
                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-yeu-cau li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });
            }
        });
    }

    function initQuanHePhapLuat() {
        var isKhac = true;
        var $quanHePhapLuatHidden = $("#QuanHePhapLuatHidden");
        var $quanHePhapLuatTextbox = $("#QuanHePhapLuatTextbox");
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");

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
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");
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

    function bindFormActions() {
        $("#luu-chi-tiet-ho-so-btn").on("click",
            function () {
                if ($formEditChiTietHoSo.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formEditChiTietHoSo.prop("method"),
                        url: $formEditChiTietHoSo.prop("action"),
                        data: $formEditChiTietHoSo.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHAT_HOSOVUAN_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHAT_HOSOVUAN_THANHCONG }, { type: "success" });
                                chiTietHoSoModule.loadChiTietHoSo();
                                $("#loaiQuanHe").val($loaiQuanHe.val());
                                $("#thuTuc").val($("#ThuLyTheoThuTuc").val());
                                initTabPhanCongThamPhanTheoLoaiQuanHe($("#loaiQuanHe").val());

                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                else {
                    if ($formEditChiTietHoSo.valid() == false) {
                        $('span[for="khieu-kien-ddl"]').html("Khiếu kiện không được để trống.");
                    }
                    return false;
                }
            });
    }

    function initTabPhanCongThamPhanTheoLoaiQuanHe(loaiQuanHe) {
        if (loaiQuanHe === "Yêu cầu") {
            $("#hoi-tham-nhan-dan-li").attr('style', 'display: none !important');
            $("#hoi-tham-nhan-dan-2-li").attr('style', 'display: none !important');
            $('[href="#tabHoiThamNhanDan"]').closest('li').hide();
        } else {
            $("#hoi-tham-nhan-dan-li").show();
            $("#hoi-tham-nhan-dan-2-li").show();
            $('[href="#tabHoiThamNhanDan"]').closest('li').show();
        }
    }

    return {
        init: init
    }
})(ChiTietHoSoModule);