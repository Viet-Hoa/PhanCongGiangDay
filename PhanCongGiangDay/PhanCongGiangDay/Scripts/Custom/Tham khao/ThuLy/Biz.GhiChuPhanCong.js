$(function () {
    GhiChuPhanCongModule.init();
});

var GhiChuPhanCongModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val();

    var contentGhiChuPhanCong = "#contentGhiChuPhanCong",
        selectNgayTao = "#selectNgayTaoGhiChuPhanCong";

    var getGhiChuPhanCongUrl = "/ThuLy/GhiChuPhanCong",
        getGhiChuPhanCongTheoIdUrl = "/ThuLy/ChiTietGhiChuPhanCong";

    function init() {
        loadThongTinGhiChuPhanCong();
        loadThongTinGhiChuPhanCongTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ThuLy",
                actionCheck: "ThemGhiChuPhanCong"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaGhiChuPhanCong").addClass("edit-disabled");
                    $("#btnThemGhiChuPhanCong").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinGhiChuPhanCong() {
        showLoadingOverlay(contentGhiChuPhanCong);
        $.ajax({
            type: "GET",
            url: getGhiChuPhanCongUrl,
            data: {
                hoSoVuAnID: hoSoVuAnId
            },
            success: function (response) {
                $(contentGhiChuPhanCong).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentGhiChuPhanCong);
            }
        });
    }

    function loadThongTinGhiChuPhanCongTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentGhiChuPhanCong);
            $.ajax({
                type: "GET",
                url: getGhiChuPhanCongTheoIdUrl,
                data: {
                    ghiChuPhanCongId: $(this).val()
                },
                success: function (response) {
                    $('#noidungghichu').html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentGhiChuPhanCong);
                }
            });
        });
    }

    return {
        init: init,
        loadThongTinGhiChuPhanCong: loadThongTinGhiChuPhanCong
    }
})();

var EditGhiChuPhanCongModule = (function (GhiChuPhanCongModule) {
    var $formEditGhiChuPhanCong;
    var idTextarea = 'NoiDungGhiChu';

    function init() {
        $formEditGhiChuPhanCong = $("#formEditNoiDungChiChu");
        //initEditor();
        CKEDITOR.replace(idTextarea);
        bindFormActions();
        initValidation();
    }
        
    function bindFormActions() {
        $("#luu-noi-dung-ghi-chu-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formEditGhiChuPhanCong.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditGhiChuPhanCong.prop("action"),
                        data: $formEditGhiChuPhanCong.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                                GhiChuPhanCongModule.loadThongTinGhiChuPhanCong();
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
        $formEditGhiChuPhanCong.validate({
            ignore: '',
            rules: {
                "NoiDungGhiChu": {
                    required: true
                }
            },
            messages:
            {
                "NoiDungGhiChu": {
                    required: "Nội dung ghi chú không được để trống."
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
})(GhiChuPhanCongModule);