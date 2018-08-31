$(function () {
    LuuKhoModule.init();
});

var LuuKhoModule = (function () {
    var $ngayLuuKhoDropdownlist;
    var thongTinLuuKhoTheoIdUrl = "/SauXetXu/ThongTinLuuKhoTheoId";
    var thongTinLuuKhoTheoHoSoUrl = "/SauXetXu/LuuKho";
    var hoSoVuAnId = $("#hoSoVuAnID").val();
    var roleGiaiDoan = $("#roleGiaiDoan").val();
    var roleCongDoan = $("#roleCongDoan").val();

    function init() {
        loadLuuKho();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "LuuKho"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemLuuKho").addClass("add-disabled");
                    $("#btnSuaLuuKho").addClass("edit-disabled");
                }
            }
        });
    }

    function initNgayLuuKhoDropdown() {
        $ngayLuuKhoDropdownlist = $("#ngay-luu-kho-dropdownlist");

        $ngayLuuKhoDropdownlist.on("change",
            function () {
                loadThongTinLuuKho(this.value);
            });
    }

    function loadThongTinLuuKho(luuKhoId) {
        showLoadingOverlay("#thong-tin-luu-kho-container");
        $.ajax({
            type: "GET",
            url: thongTinLuuKhoTheoIdUrl,
            data: {
                luuKhoId: luuKhoId
            },
            success: function (response) {
                $("#thong-tin-luu-kho-container").html(response);
                hideLoadingOverlay("#thong-tin-luu-kho-container");
            }
        });
    }

    function loadLuuKho() {
        showLoadingOverlay("#luu-kho-container");
        $.ajax({
            type: "GET",
            url: thongTinLuuKhoTheoHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#luu-kho-container").html(response);
                initNgayLuuKhoDropdown();
                initRoleNhanVien();

                hideLoadingOverlay("#luu-kho-container");
            }
        });
    }

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    return {
        init: init,
        loadLuuKho: loadLuuKho,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var LuuKhoModalModule = (function (luuKhoModule) {
    var $ngayLuuKhoDtp;
    var $luuKhoForm;

    var selectedNgayLuuKho;

    var idTextareaGhiChuTinhTrangHoSo = 'ghi-chu-tinh-trang-ho-so-textarea';
    var idTextareaGhiChu = 'ghi-chu-textarea';

    function init() {
        selectedNgayLuuKho = moment(new Date()).format();
        $luuKhoForm = $("#luu-kho-form");
        initNgayLuuKhoDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextareaGhiChuTinhTrangHoSo);
        CKEDITOR.replace(idTextareaGhiChu);
        initValidation();
        bindFormActions();
    }

    function initNgayLuuKhoDateTimePicker() {
        $ngayLuuKhoDtp = $("#ngay-luu-kho-dtp");
        $ngayLuuKhoDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });

        $ngayLuuKhoDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgayLuuKho = e.date.format();
                }
            });
    }

    function bindFormActions() {
        $("#luu-kho-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextareaGhiChuTinhTrangHoSo);
                $().CKEditorSetValForTextarea(idTextareaGhiChu);

                if ($luuKhoForm.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $luuKhoForm.prop("method"),
                        url: $luuKhoForm.prop("action"),
                        data: getFormData(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_LUUKHO_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_LUUKHO_THANHCONG}, { type: "success" });
                                luuKhoModule.loadLuuKho();
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function initValidation() {
        $luuKhoForm.validate({
            ignore: '',
            rules: {
                "NguoiGiao": {
                    required: true
                },
                "NguoiNhanLuu": {
                    required: true
                },
                "ngay-luu-kho-dtp": {
                    required: true
                }
            },
            messages:
            {
                "NguoiGiao": {
                    required: ValidationMessages.VALIDATION_NGUOIDAO_KHONGTRONG
                },
                "NguoiNhanLuu": {
                    required: ValidationMessages.VALIDATION_NGUOINHAN_KHONGTRONG
                },
                "ngay-luu-kho-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYLUU_KHONGTRONG
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
        var nguoiGiao = $("#nguoi-giao-dropdownlist").val();
        var nguoiNhanLuu = $("#nguoi-nhan-dropdownlist").val();
        var ngayLuu = selectedNgayLuuKho;
        var ghiChuTinhTrangHoSo = $("#ghi-chu-tinh-trang-ho-so-textarea").val();
        var ghiChu = $("#ghi-chu-textarea").val();

        return {
            hoSoVuAnId : luuKhoModule.getHoSoVuAnId(),
            nguoiGiao: nguoiGiao,
            nguoiNhanLuu: nguoiNhanLuu,
            ngayLuu: ngayLuu,
            ghiChuTinhTrangHoSo: ghiChuTinhTrangHoSo,
            ghiChu: ghiChu
        }
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var ghiChuTinhTrangSettings = $.extend({},
    //        {
    //            selector: "#ghi-chu-tinh-trang-ho-so-textarea",
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    var ghiChuSettings = $.extend({},
    //        {
    //            selector: "#ghi-chu-textarea",
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    tinymce.init(ghiChuTinhTrangSettings);
    //    tinymce.init(ghiChuSettings);
    //}
    
    return {
        init: init
    }
})(LuuKhoModule);