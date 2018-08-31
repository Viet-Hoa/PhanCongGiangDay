$(function () {
    KhieuNaiTraDon.init();
});

var KhieuNaiTraDon = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#popupEditKhieuNaiTraDon",
        modalIdKienNghi = "#popupEditKienNghiTraDon",
        formEditKhieuNai = "#formEditKhieuNaiTraDon",
        formEditKienNghi = "#formEditKienNghiTraDon",
        contentKhieuNai = "#contentKhieuNai",
        contentKienNghi = "#contentKienNghi",
        selectNgayTao = "#selectNgayTaoKhieuNaiTraDon",
        selectNgayTaoKienNghi = "#selectNgayTaoKienNghiTraDon",
        updateHoSoVuAn = "#HoSoVuAn_NgayKhieuNai";


    var getKhieuNaiUrl = "/NhanDon/GetKhieuNaiTraDonTheoHoSoVuAnID",
        getKienNghiUrl = "/NhanDon/GetKienNghiTraDonTheoHoSoVuAnID",
        getKhieuNaiTheoIdUrl = "/NhanDon/GetKhieuNaiTraDonTheoKhieuNaiTraDonID",
        getKienNghiTheoIdUrl = "/NhanDon/GetKienNghiTraDonTheoKienNghiTraDonID",
        editKhieuNaiUrl = "/NhanDon/EditKhieuNaiTraDon",
        editKienNghiUrl = "/NhanDon/EditKienNghiTraDon";

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {
            openFormEditKhieuNai();
        });
        $(modalIdKienNghi).on("shown.bs.modal", function (e) {
            openFormEditKienNghi();            
        });

        loadThongTin();
        loadThongTinKhieuNaiTheoId();
        updateFormKhieuNai();
        loadThongTinKienNghiTheoId();
        updateFormKienNghi();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "NhanDon",
                actionCheck: "EditKhieuNaiTraDon"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaKienNghiTraDon").addClass("edit-disabled");
                    $("#btnSuaKhieuNaiTraDon").addClass("edit-disabled");
                    $("#btnThemKienNghiTraDon").addClass("add-disabled");
                    $("#btnThemKhieuNaiTraDon").addClass("add-disabled");
                }
            }
        });
    }

    function openFormEditKhieuNai() {
        showLoadingOverlay(modalId + " .modal-content");
        $.ajax({
            type: "GET",
            url: editKhieuNaiUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(modalId + " .modal-content").html(response);

                hideLoadingOverlay(modalId + " .modal-content");
            }
        });
    }

    function loadThongTin() {
        loadThongTinKhieuNai();
        loadThongTinKienNghi();
    }

    function loadThongTinKhieuNai() {
        showLoadingOverlay(contentKhieuNai);
        $.ajax({
            type: "GET",
            url: getKhieuNaiUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(contentKhieuNai).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentKhieuNai);
            }
        });
    }

    function loadThongTinKhieuNaiTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentKhieuNai);
            $.ajax({
                type: "GET",
                url: getKhieuNaiTheoIdUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentKhieuNai).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentKhieuNai);
                }
            });
        });
    }

    function updateFormKhieuNai() {
        $(document).on("submit", formEditKhieuNai, function () {
            var _this = this;
            showLoadingOverlay(modalId + " .modal-content");

            $.ajax({
                type: "POST",
                url: editKhieuNaiUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEditKhieuNai).length === 0) {
                        $(contentKhieuNai).html(response);
                        $(modalId).modal('hide');
                        //cap nhat phan chi tiet ho so vu an
                        $(updateHoSoVuAn).text($('#NgayKhieuNai').val());

                        $.notify({ message: "Cập nhật khiếu nại việc trả đơn thành công" }, { type: "success" });
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

    //Kien Nghi Viec Tra Don
    function openFormEditKienNghi() {
        showLoadingOverlay(modalIdKienNghi + " .modal-content");
        $.ajax({
            type: "GET",
            url: editKienNghiUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(modalIdKienNghi + " .modal-content").html(response);

                hideLoadingOverlay(modalIdKienNghi + " .modal-content");
            }
        });
    }

    function loadThongTinKienNghi() {
        showLoadingOverlay(contentKienNghi);
        $.ajax({
            type: "GET",
            url: getKienNghiUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(contentKienNghi).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentKienNghi);
            }
        });
    }

    function loadThongTinKienNghiTheoId() {
        $(document).on("change", selectNgayTaoKienNghi, function () {
            showLoadingOverlay(contentKienNghi);
            $.ajax({
                type: "GET",
                url: getKienNghiTheoIdUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentKienNghi).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentKienNghi);
                }
            });
        });
    }

    function updateFormKienNghi() {
        $(document).on("submit", formEditKienNghi, function () {
            var _this = this;
            showLoadingOverlay(modalIdKienNghi + " .modal-content");

            $.ajax({
                type: "POST",
                url: editKienNghiUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEditKienNghi).length === 0) {
                        $(contentKienNghi).html(response);
                        $(modalIdKienNghi).modal('hide');
                        //cap nhat phan chi tiet ho so vu an
                        $(updateHoSoVuAn).text($('#NgayKienNghi').val());

                        $.notify({ message: "Cập nhật kiến nghị việc trả đơn thành công" }, { type: "success" });
                    }
                    else {
                        $(modalIdKienNghi + " .modal-content").html(response);
                    }

                    hideLoadingOverlay(modalIdKienNghi + " .modal-content");
                }
            });

            return false;
        });
    }

    return {
        init: init
    }
})();

var EditKhieuNaiTraDon = (function () {
    function init() {
        $(".datepicker").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            maxDate: moment()
        });

        //var settings = $.extend({
        //    selector: ".tinymce-editor",
        //    height: 170,
        //}, $.tinymceDefaults);

        //tinymce.remove();
        //tinymce.init(settings);
        CKEDITOR.replaceAll('ckeditorClassKhieuNai');
    }

    return {
        init: init
    }
})();

var EditKienNghiTraDon = (function () {
    function init() {
        $(".datepicker").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            maxDate: moment()
        });

        //var settings = $.extend({
        //    selector: ".tinymce-editor",
        //    height: 170,
        //}, $.tinymceDefaults);

        //tinymce.remove();
        //tinymce.init(settings);
        CKEDITOR.replaceAll('ckeditorClassKienNghi');
    }

    return {
        init: init
    }
})();