$(function () {
    ChuyenHoSoModule.init();
});

var ChuyenHoSoModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentChuyenHoSo = "#contentChuyenHoSo",
        selectNgayTao = "#selectNgayTaoChuyenHoSo";
    
    var getChuyenHoSoUrl = "/ChuanBiXetXu/ChuyenHoSo",
        getChuyenHoSoTheoIdUrl = "/ChuanBiXetXu/GetChuyenHoSoTheoId";

    function init() {
        loadThongTinChuyenHoSo();
        loadThongTinChuyenHoSoTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ChuanBiXetXu",
                actionCheck: "EditChuyenHoSo"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnSuaChuyenHoSo").addClass("edit-disabled");
                    $("#btnThemChuyenHoSo").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinChuyenHoSo() {
        showLoadingOverlay(contentChuyenHoSo);
        $.ajax({
            type: "GET",
            url: getChuyenHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentChuyenHoSo).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentChuyenHoSo);
            }
        });
    }

    function loadThongTinChuyenHoSoTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentChuyenHoSo);
            $.ajax({
                type: "GET",
                url: getChuyenHoSoTheoIdUrl,
                data: {
                    chuyenHoSoId: $(this).val()
                },
                success: function (response) {
                    $(contentChuyenHoSo).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentChuyenHoSo);
                }
            });
        });
    }

    return {
        init: init,
        loadThongTinChuyenHoSo: loadThongTinChuyenHoSo
    }
})();

var EditChuyenHoSoModule = (function (chuyenHoSoModule) {
    var $formEditChuyenHoSo,
         $vungChuyenHoSo,
         $toaAnChuyenDenTextbox,
         $toaAnChuyenDenDropdown,
         $toaAnChuyenDenHidden;

    var idTextarea = 'GhiChu';

    var updateHoSoVuAn = "#HoSoVuAn_NgayChuyenHoSo";

    function init() {
        $formEditChuyenHoSo = $("#formEditChuyenHoSo");
        $vungChuyenHoSo = $("#ddlVungChuyenHoSo");
        $toaAnChuyenDenTextbox = $("#txtToaAnChuyenDen");
        $toaAnChuyenDenDropdown = $("#ddlToaAnChuyenDen");
        $toaAnChuyenDenHidden = $("#hiddenToaAnChuyenDen");
        initDropdownVungChuyenHoSo();
        onDropdownVungChuyenHoSoChange();   
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        initValidation();
        updateForm();       
    }

    function initDateTimePicker() {
        $("#ngay-ra-thong-bao-dtp").datetimepicker({
            useCurrent: false,            
            maxDate: moment(),
            defaultDate: moment(new Date()).format(),
            format: "DD/MM/YYYY"
        });
       
        $("#ngay-chuyen-don-dtp").datetimepicker({
            useCurrent: false,           
            maxDate: moment(),
            defaultDate: moment(new Date()).format(),
            format: "DD/MM/YYYY"
        });
        
    }

    function initDropdownVungChuyenHoSo() {
        
        if ($vungChuyenHoSo.val() === "Trong tỉnh") {
            $toaAnChuyenDenDropdown.attr("disabled", false).show();
            $toaAnChuyenDenTextbox.attr("disabled", true).hide();
            $toaAnChuyenDenHidden.val("");
        }
        else {
            $toaAnChuyenDenDropdown.attr("disabled", true).hide();
            $toaAnChuyenDenTextbox.attr("disabled", false).show().val($toaAnChuyenDenHidden.val());
        }
    }

    function onDropdownVungChuyenHoSoChange() {
        $vungChuyenHoSo.on("change",
            function () {
                initDropdownVungChuyenHoSo();
            });
    }

    function updateForm() {
        $("#luu-chuyen-don-btn").on("click",
            function () {
                tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formEditChuyenHoSo.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditChuyenHoSo.prop("action"),
                        data: $formEditChuyenHoSo.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                                chuyenHoSoModule.loadThongTinChuyenHoSo();
                                //cap nhat phan chi tiet ho so vu an
                                $(updateHoSoVuAn).text($('#NgayChuyenHoSo').val());
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
        $formEditChuyenHoSo.validate({
            ignore: '',
            rules: {
                "NgayRaThongBao": {
                    required: true
                },
                "NgayChuyenHoSo": {
                    required: true
                },
                "ToaAnChuyenDen": {
                    required: true
                },
                "LyDoChuyenHoSo": {
                    required: true
                },
                "txtToaAnChuyenDen": {
                    required: true
                },
                "ddlToaAnChuyenDen": {
                    required: true
                }
            },
            messages:
            {
                "NgayRaThongBao": {
                    required: "Ngày ra thông báo không được để trống."
                },
                "NgayChuyenHoSo": {
                    required: "Ngày chuyển hồ sơ không được để trống."
                },
                "ToaAnChuyenDen": {
                    required: "Tòa án chuyển đến không được để trống."
                },
                "LyDoChuyenHoSo": {
                    required: "Lý do chuyển hồ sơ không được để trống."
                },
                "txtToaAnChuyenDen": {
                    required: "Tòa án chuyển đến không được để trống."
                },
                "ddlToaAnChuyenDen": {
                    required: "Tòa án chuyển đến không được để trống."
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
})(ChuyenHoSoModule);