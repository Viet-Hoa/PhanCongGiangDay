$(function () {
    ThamPhanModule.init();
});

var ThamPhanModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentThamPhan = "#contentThamPhan",
        selectNgayTao = "#selectNgayTaoThamPhan";       

    var getThamPhanUrl = "/NhanDon/ThamPhan",
        getThamPhanTheoIdUrl = "/NhanDon/GetThamPhanTheoId";

    function init() {
        loadThongTinThamPhan();
        loadThongTinThamPhanTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "EditThamPhan"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaThamPhan").addClass("edit-disabled");
                    $("#btnThemThamPhan").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinThamPhan() {
        showLoadingOverlay(contentThamPhan);
        $.ajax({
            type: "GET",
            url: getThamPhanUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentThamPhan).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentThamPhan);                
            }
        });
    }

    function loadThongTinThamPhanTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentThamPhan);
            $.ajax({
                type: "GET",
                url: getThamPhanTheoIdUrl,
                data: {
                    thamPhanId: $(this).val()
                },
                success: function (response) {
                    $(contentThamPhan).html(response);
                    initRoleNhanVien();
                    hideLoadingOverlay(contentThamPhan);
                }
            });
        });
    }
    
    return {
        init: init,
        loadThongTinThamPhan: loadThongTinThamPhan
    }
})();

var EditThamPhanModule = (function (thamPhanModule) {
    var $formEditThamPhan;
    var updateHoSoVuAn = "#HoSoVuAn_ThamPhan";
    var idTextarea = 'ghi-chu-tham-phan-textarea';

    function init() {
        $formEditThamPhan = $("#formEditThamPhan");
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        updateForm();
    }
    function initDateTimePicker() {
        $("#ngay-phan-cong-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            maxDate: moment(),
            defaultDate: moment(new Date()).format(),
            useCurrent: false
        });
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var ghiChuSettings = $.extend({},
    //        {
    //            selector: "#ghi-chu-tham-phan-textarea",
    //            height: 110,
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    tinymce.init(ghiChuSettings);
    //}

    function updateForm() {
        $("#luu-tham-phan-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formEditThamPhan.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditThamPhan.prop("action"),
                        data: $formEditThamPhan.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: "Cập nhật Thẩm phán không thành công" }, { type: "danger" });
                            } else {
                                $.notify({ message: "Cập nhật Thẩm phán thành công" }, { type: "success" });
                                thamPhanModule.loadThongTinThamPhan();
                                //cap nhat phan chi tiet ho so vu an
                                $(updateHoSoVuAn).text($('#ThamPhan option:selected').text());
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

    return {
        init: init
    }
})(ThamPhanModule);