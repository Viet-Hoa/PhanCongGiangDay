$(function () {
    NoiDungDonModule.init();
});

var NoiDungDonModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentNoiDungDon = "#contentNoiDungDon",
        selectNgayTao = "#selectNgayTaoNoiDungDon";

    var getNoiDungDonUrl = "/NhanDon/NoiDungDon",
        getNoiDungDonTheoIdUrl = "/NhanDon/GetNoiDungDonTheoId";

    function init() {
        loadThongTinNoiDungDon();
        loadThongTinNoiDungDonTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "EditNoiDungDon"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaNoiDungDon").addClass("edit-disabled");
                    $("#btnThemNoiDungDon").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinNoiDungDon() {
        showLoadingOverlay(contentNoiDungDon);
        $.ajax({
            type: "GET",
            url: getNoiDungDonUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentNoiDungDon).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentNoiDungDon);
            }
        });
    }

    function loadThongTinNoiDungDonTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentNoiDungDon);
            $.ajax({
                type: "GET",
                url: getNoiDungDonTheoIdUrl,
                data: {
                    noiDungDonId: $(this).val()
                },
                success: function (response) {
                    $(contentNoiDungDon).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentNoiDungDon);
                }
            });
        });
    }

    return {
        init: init,
        loadThongTinNoiDungDon: loadThongTinNoiDungDon
    }
})();

var EditNoiDungDonModule = (function (noiDungDonModule) {
    var $formEditNoiDungDon;
    var idTextarea = 'NoiDungDon';

    function init() {
        $formEditNoiDungDon = $("#formEditNoiDungDon");
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        bindFormActions();
        initValidation();
    }

    function initDateTimePicker() {
        $("#ngay-phan-cong-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            maxDate: moment()
        });
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var noiDungDonSettings = $.extend({},
    //        {
    //            selector: "#NoiDungDon",
    //            height: 200,
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    tinymce.init(noiDungDonSettings);
    //}

    function bindFormActions() {
        $("#luu-noi-dung-don-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formEditNoiDungDon.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditNoiDungDon.prop("action"),
                        data: $formEditNoiDungDon.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: "Cập nhật nội dung đơn không thành công" }, { type: "danger" });
                            } else {
                                $.notify({ message: "Cập nhật nội dung đơn thành công" }, { type: "success" });
                                noiDungDonModule.loadThongTinNoiDungDon();
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
        $formEditNoiDungDon.validate({
            ignore: '',
            rules: {
                "NoiDungDon": {
                    required: true
                }
            },
            messages:
            {
                "NoiDungDon": {
                    required: "Nội dung đơn không được để trống"
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

    return {
        init: init
    }
})(NoiDungDonModule);