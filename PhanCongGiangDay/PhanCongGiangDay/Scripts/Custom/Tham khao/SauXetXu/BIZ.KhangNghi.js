$(function () {
    KhangNghiModule.init();
});

var KhangNghiModule = (function () {
    var $ngayKhangNghiDropdownlist;
    var thongTinKhangNghiTheoIdUrl = "/SauXetXu/ThongTinKhangNghiTheoId";
    var thongTinKhangNghiTheoHoSoUrl = "/SauXetXu/KhangNghi";
    var hoSoVuAnId = $("#hoSoVuAnID").val();
    var roleGiaiDoan = $("#roleGiaiDoan").val();
    var roleCongDoan = $("#roleCongDoan").val();

    function init() {
        loadKhangNghi();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "KhangNghi"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemKhangNghi").addClass("add-disabled");
                    $("#btnSuaKhangNghi").addClass("edit-disabled");
                }
            }
        });
    }

    function initNgayKhangNghiDropdown() {
        $ngayKhangNghiDropdownlist = $("#ngay-khang-nghi-dropdownlist");

        $ngayKhangNghiDropdownlist.on("change",
            function () {
                loadThongTinKhangNghi(this.value);
            });
    }

    function loadThongTinKhangNghi(khangNghiId) {
        showLoadingOverlay("#thong-tin-khang-nghi-container");
        $.ajax({
            type: "GET",
            url: thongTinKhangNghiTheoIdUrl,
            data: {
                khangNghiId: khangNghiId
            },
            success: function (response) {
                $("#thong-tin-khang-nghi-container").html(response);               
                hideLoadingOverlay("#thong-tin-khang-nghi-container");
            }
        });
    }

    function loadKhangNghi() {
        showLoadingOverlay("#khang-nghi-container");
        $.ajax({
            type: "GET",
            url: thongTinKhangNghiTheoHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#khang-nghi-container").html(response);
                initNgayKhangNghiDropdown();
                initRoleNhanVien();
                hideLoadingOverlay("#khang-nghi-container");
            }
        });
    }

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    return {
        init: init,
        loadKhangNghi: loadKhangNghi,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var KhangNghiModalModule = (function (khangNghiModule) {
    var $ngayKhangNghiDtp;
    var $khangNghiForm;
    var $modalId;

    var selectedNgayKhangNghi;
    var selectedDuongSu = [];

    var idTextarea = 'noi-dung-khang-nghi-textarea';

    function init() {
        selectedNgayKhangNghi = moment(new Date()).format();
        $khangNghiForm = $("#khang-nghi-form");
        initNgayKhangNghiDateTimePicker();
        //initEditor();
        initModalId();
        CKEDITOR.replace(idTextarea);
        initValidation();
        bindFormActions();
    }

    function initModalId() {
        if ($("#nhomAn").val() == "HS") {
            $modalId = $('#modalLarge');
        } else {
            $modalId = $('#modal');
        }
    }

    function initNgayKhangNghiDateTimePicker() {
        $ngayKhangNghiDtp = $("#ngay-toa-an-nha-van-ban-dtp");
        $ngayKhangNghiDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });

        $ngayKhangNghiDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgayKhangNghi = e.date.format();
                }
            });
    }

    function bindFormActions() {
        $("#khang-nghi-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($khangNghiForm.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $khangNghiForm.prop("method"),
                        url: $khangNghiForm.prop("action"),
                        data: getFormData(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATKHANGNGHI_THANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATKHANGNGHI_KHONGTHANHCONG }, { type: "success" });
                                khangNghiModule.loadKhangNghi();
                            }
                        },
                        complete: function () {
                            $modalId.modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function initValidation() {
        $khangNghiForm.validate({
            ignore: '',
            rules: {
                "VienKiemSatKhangNghi": {
                    required: true
                },
                "van-ban-khang-nghi-textbox": {
                    required: true,
                    maxlength: 250
                },
                "ngay-toa-an-nha-van-ban-dtp": {
                    required: true
                },
                "HinhThuc": {
                    required: true
                },
                "noi-dung-khang-nghi-textarea": {
                    required: true
                },
                "DanhSachNguoiBiKhangNghi[]": {
                    required: true
                }
            },
            messages:
            {
                "VienKiemSatKhangNghi": {
                    required: ValidationMessages.VALIDATION_VIENKIERMSAT_KHONGTRONG
                },
                "van-ban-khang-nghi-textbox": {
                    required: ValidationMessages.VALIDATION_VANBAN_KHANGNGHI_KHONGTRONG,
                    maxlength: ValidationMessages.VALIDATION_VANBAN_KHANGNGHI_KHONGQUA
                },
                "ngay-toa-an-nha-van-ban-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYTOAAN_KHONGTRONG
                },
                "HinhThuc": {
                    required: ValidationMessages.VALIDATION_HINHTHUC_KHONGTRONG
                },
                "noi-dung-khang-nghi-textarea": {
                    required: ValidationMessages.VALIDATION_NOIDUNG_KHANGNGHI_KHONGTRONG
                },
                "DanhSachNguoiBiKhangNghi[]": {
                    required: "Người bị kháng nghị không được để trống."
                }
            },
            errorPlacement: function (error) {
                var htmlFor = error[0].htmlFor;

                $('span[for="' + htmlFor + '"]').each(function () {
                    $(this).append(error);
                });
            },
            success: function (error) {
                error.remove();
            }
        });
    }

    function getFormData() {
        var vienKiemSoat = $("#vien-kiem-sat-khang-nghi-dropdownlist").val();
        var vanBan = $("#van-ban-khang-nghi-textbox").val();
        var ngayNhan = selectedNgayKhangNghi;
        var hinhThuc = $("#hinh-thuc-dropdownlist").val();
        var noiDung = $("#noi-dung-khang-nghi-textarea").val();

        selectedDuongSu = [];
        $(".nguoi-bi-khang-nghi-checkbox").each(function () {
            if ($(this).prop("checked")) {
                selectedDuongSu.push($(this).val());
            }
        });

        return {
            hoSoVuAnId : khangNghiModule.getHoSoVuAnId(),
            vienKiemSatKhangNghi: vienKiemSoat,
            vanBanKhangNghi: vanBan,
            ngayToaAnNhanVanBan: ngayNhan,
            hinhThuc: hinhThuc,
            noiDungKhangNghi: noiDung,
            danhSachNguoiBiKhangNghi : selectedDuongSu
        }
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var settings = $.extend({},
    //        {
    //            selector: "#noi-dung-khang-nghi-textarea",
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);
    //    tinymce.init(settings);
    //}

    return {
        init: init
    }
})(KhangNghiModule);