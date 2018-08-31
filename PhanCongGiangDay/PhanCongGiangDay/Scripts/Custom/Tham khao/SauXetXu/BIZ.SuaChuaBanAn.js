$(function () {
    SuaChuaBanAnModule.init();
});

var SuaChuaBanAnModule = (function () {
    var $ngaySuaChuaBanAnDropdownlist;
    var thongTinSuaChuaBanAnTheoIdUrl = "/SauXetXu/ThongTinSuaBanAnTheoId";
    var thongTinSuaChuaBanAnTheoHoSoUrl = "/SauXetXu/SuaChuaBanAn";
    var hoSoVuAnId = $("#hoSoVuAnID").val();
    var roleGiaiDoan = $("#roleGiaiDoan").val();
    var roleCongDoan = $("#roleCongDoan").val();

    function init() {
        loadSuaChuaBanAn();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "SuaChuaBanAn"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemSuaChuaBanAn").addClass("add-disabled");
                    $("#btnSuaSuaChuaBanAn").addClass("edit-disabled");
                }
            }
        });
    }

    function initNgaySuaChuaBanAnDropdown() {
        $ngaySuaChuaBanAnDropdownlist = $("#ngay-sua-chua-ban-an-dropdownlist");

        $ngaySuaChuaBanAnDropdownlist.on("change",
            function () {
                loadThongTinSuaChuaBanAn(this.value);
            });
    }

    function loadThongTinSuaChuaBanAn(suaChuaBanAnId) {
        showLoadingOverlay("#thong-tin-sua-chua-ban-an-container");
        $.ajax({
            type: "GET",
            url: thongTinSuaChuaBanAnTheoIdUrl,
            data: {
                suaChuaBanAnId: suaChuaBanAnId
            },
            success: function (response) {
                debugger;
                $("#thong-tin-sua-chua-ban-an-container").html(response);
                hideLoadingOverlay("#thong-tin-sua-chua-ban-an-container");
            }
        });
    }

    function loadSuaChuaBanAn() {
        showLoadingOverlay("#sua-chua-ban-an-container");
        $.ajax({
            type: "GET",
            url: thongTinSuaChuaBanAnTheoHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#sua-chua-ban-an-container").html(response);
                initNgaySuaChuaBanAnDropdown();
                initRoleNhanVien();

                hideLoadingOverlay("#sua-chua-ban-an-container");
            }
        });
    }
    //


    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    return {
        init: init,
        loadSuaChuaBanAn: loadSuaChuaBanAn,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var SuaChuaBanAnModalModule = (function (suaChuaBanAnModule) {
    var $ngaySuaChuaBanAnDtp;
    var $suaChuaBanAnForm;
    var idTextarea = 'noi-dung-sua-chua-textarea';
    var selectedNgaySuaBanAn;

    function init() {
        selectedNgaySuaBanAn = moment(new Date()).format();
        $suaChuaBanAnForm = $("#sua-chua-ban-an-form");
        initNgaySuaBanAnDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        initValidation();
        bindFormActions();
    }

    function initNgaySuaBanAnDateTimePicker() {
        $ngaySuaChuaBanAnDtp = $("#ngay-sua-chua-ban-an-modal-dtp");
        $ngaySuaChuaBanAnDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });

        $ngaySuaChuaBanAnDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgaySuaBanAn = e.date.format();
                }
            });
    }

    function bindFormActions() {
        $("#sua-chua-ban-an-btn").on("click",
            function () {
                if ($('#file_upload').closest('.col-7').find('.has-error').length > 0) {
                    return false;
                }
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($suaChuaBanAnForm.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $suaChuaBanAnForm.prop("method"),
                        url: $suaChuaBanAnForm.prop("action"),
                        data: getFormData(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_SUACHUABANAN_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: "Sửa chữa bản án thành công"}, { type: "success" });
                                suaChuaBanAnModule.loadSuaChuaBanAn();
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
        $suaChuaBanAnForm.validate({
            ignore: '',
            rules: {
                "ly-do-textbox": {
                    required: true,
                    maxlength: 500
                },
                "ngay-sua-chua-ban-an-modal-dtp": {
                    required: true
                },
                "NguoiKy": {
                    required: true
                },
                "noi-dung-sua-chua-textarea": {
                    required: true
                }
            },
            messages:
            {
                "ly-do-textbox": {
                    required: ValidationMessages.VALIDATION_LYDO_KHONGTRONG,
                    maxlength: ValidationMessages.VALIDATION_LYDO_KHONGQUA
                },
                "ngay-sua-chua-ban-an-modal-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYSUACHUA_BOSUNG_KHONGTRONG
                },
                "NguoiKy": {
                    required: ValidationMessages.VALIDATION_NGUOIKY_KHONGTRONG
                },
                "noi-dung-sua-chua-textarea": {
                    required: ValidationMessages.VALIDATION_NOIDUNGSUACHUA_KHONGTRONG
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
        var lyDo = $("#ly-do-textbox").val();
        var ngaySuaChua = selectedNgaySuaBanAn;
        var nguoiKy = $("#nguoi-ky-dropdownlist").val();
        var noiDungSuaChua = $("#noi-dung-sua-chua-textarea").val();
        var dinhKemFile = $("#DinhKemFile").val();

        return {
            hoSoVuAnId: suaChuaBanAnModule.getHoSoVuAnId(),
            lyDo: lyDo,
            ngaySuaChua: ngaySuaChua,
            nguoiKy: nguoiKy,
            noiDungSuaChua: noiDungSuaChua,
            dinhKemFile: dinhKemFile
        }
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var settings = $.extend({},
    //        {
    //            selector: "#noi-dung-sua-chua-textarea",
    //            setup: function(ed) {
    //                ed.on("change",
    //                    function() {
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
})(SuaChuaBanAnModule);