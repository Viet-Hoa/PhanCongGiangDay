$(function () {
    KhangCaoQuaHanModule.init();
});

var KhangCaoQuaHanModule = (function () {
    var $ngayKhangCaoQuaHanDropdownlist;
    var thongTinKhangCaoQuaHanTheoIdUrl = "/SauXetXu/ThongTinKhangCaoQuaHanTheoId";
    var thongTinKhangCaoQuaHanTheoHoSoUrl = "/SauXetXu/KhangCaoQuaHan";
    var hoSoVuAnId = $("#hoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    function init() {
        loadKhangCaoQuaHan();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "KhangCaoQuaHan"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1 ) {
                    $("#btnThemKhangCaoQuaHan").addClass("add-disabled");
                    $("#btnSuaKhangCaoQuaHan").addClass("edit-disabled");
                }
            }
        });
    }

    function initNgayKhangCaoQuaHanDropdown() {
        $ngayKhangCaoQuaHanDropdownlist = $("#ngay-khang-cao-qua-han-dropdownlist");

        $ngayKhangCaoQuaHanDropdownlist.on("change",
            function () {
                loadThongTinKhangCaoQuaHan(this.value);
            });
    }

    function loadThongTinKhangCaoQuaHan(khangCaoQuaHanId) {
        showLoadingOverlay("#thong-tin-khang-cao-qua-han-container");
        $.ajax({
            type: "GET",
            url: thongTinKhangCaoQuaHanTheoIdUrl,
            data: {
                khangCaoQuaHanId: khangCaoQuaHanId
            },
            success: function (response) {
                $("#thong-tin-khang-cao-qua-han-container").html(response);
                hideLoadingOverlay("#thong-tin-khang-cao-qua-han-container");
            }
        });
    }

    function loadKhangCaoQuaHan() {
        showLoadingOverlay("#khang-cao-qua-han-container");
        $.ajax({
            type: "GET",
            url: thongTinKhangCaoQuaHanTheoHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#khang-cao-qua-han-container").html(response);
                initNgayKhangCaoQuaHanDropdown();
                initRoleNhanVien();

                hideLoadingOverlay("#khang-cao-qua-han-container");
            }
        });
    }

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    return {
        init: init,
        loadKhangCaoQuaHan: loadKhangCaoQuaHan,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var KhangCaoQuaHanModalModule = (function (khangCaoQuaHanModule) {
    var $khangCaoQuaHanForm;
    var idTextareaLyDo = 'ly-do-khang-cao-qua-han-textarea';
    var idTextareaKetQua = 'ket-qua-khang-cao-qua-han-textarea';

    function init() {
        $khangCaoQuaHanForm = $("#khang-cao-qua-han-form");
        initKhangCaoHayKhangNghiComboBox();
        //initEditor();
        CKEDITOR.replace(idTextareaLyDo);
        CKEDITOR.replace(idTextareaKetQua);
        //initValidation();
        bindFormActions();
    }

    function initKhangCaoHayKhangNghiComboBox() {
        var khangCaoHayKhangNghi = $("#khang-cao-hay-khang-nghi");
        khangCaoHayKhangNghi.on('change', function () {
            if (khangCaoHayKhangNghi.val() === "Kháng Nghị") {
                $('#khangCaoQuaHanTitle').text("Kháng nghị quá hạn");
                $('#lyDoKhangCaoQuaHanLabel').text("Lý do kháng nghị quá hạn");
                $('#ketQuaKhangCaoQuaHanLabel').text("Kết quả kháng nghị quá hạn");
            }
            else {
                $('#khangCaoQuaHanTitle').text("Kháng cáo quá hạn");
                $('#lyDoKhangCaoQuaHanLabel').text("Lý do kháng cáo quá hạn");
                $('#ketQuaKhangCaoQuaHanLabel').text("Kết quả kháng cáo quá hạn");
            }
        });
    }

    function bindFormActions() {
        $("#khang-cao-qua-han-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextareaLyDo);
                $().CKEditorSetValForTextarea(idTextareaKetQua);

                if ($khangCaoQuaHanForm.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $khangCaoQuaHanForm.prop("method"),
                        url: $khangCaoQuaHanForm.prop("action"),
                        data: getFormData(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATKHANGCAO_QUAHAN_THANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATKHANGCAO_QUAHAN_KHONGTHANHCONG }, { type: "success" });
                                khangCaoQuaHanModule.loadKhangCaoQuaHan();
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

    //function initValidation() {
    //    $khangCaoQuaHanForm.validate({
    //        ignore: '',
    //        rules: {
    //            "ly-do-khang-cao-qua-han-textarea": {
    //                required: true
    //            }
    //        },
    //        messages:
    //        {
    //            "ly-do-khang-cao-qua-han-textarea": {
    //                required: "Lý do kháng cáo quá hạn không được để trống"
    //            }
    //        },
    //        errorPlacement: function (error) {
    //            var htmlFor = error[0].htmlFor;

    //            $('span[for="' + htmlFor + '"]').each(function () {
    //                $(this).append(error);
    //            });
    //        },
    //        success: function (error) {
    //            error.remove();
    //        }
    //    });
    //}

    function getFormData() {
        var khangCaoHayKhangNghi = $("#khang-cao-hay-khang-nghi").val();
        var lyDo = $("#ly-do-khang-cao-qua-han-textarea").val();
        var ketQua = $("#ket-qua-khang-cao-qua-han-textarea").val();

        return {
            hoSoVuAnId: khangCaoQuaHanModule.getHoSoVuAnId(),
            khangCaoHayKhangNghi: khangCaoHayKhangNghi,
            lyDo: lyDo,
            ketQua: ketQua
        }
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var lyDoSettings = $.extend({},
    //        {
    //            selector: "#ly-do-khang-cao-qua-han-textarea",
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    var ketQuaSettings = $.extend({},
    //        {
    //            selector: "#ket-qua-khang-cao-qua-han-textarea",
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    tinymce.init(lyDoSettings);
    //    tinymce.init(ketQuaSettings);
    //}

    return {
        init: init
    }
})(KhangCaoQuaHanModule);