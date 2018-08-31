$(function () {
    ChuyenDonModule.init();
});

var ChuyenDonModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentChuyenDon = "#contentChuyenDon",
        selectNgayTao = "#selectNgayTaoChuyenDon";
    
    var getChuyenDonUrl = "/NhanDon/ChuyenDon",
        getChuyenDonTheoIdUrl = "/NhanDon/GetChuyenDonTheoId";

    function init() {
        loadThongTinChuyenDon();
        loadThongTinChuyenDonTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "EditChuyenDon"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaChuyenDon").addClass("edit-disabled");
                    $("#btnThemChuyenDon").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinChuyenDon() {
        showLoadingOverlay(contentChuyenDon);
        $.ajax({
            type: "GET",
            url: getChuyenDonUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentChuyenDon).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentChuyenDon);
            }
        });
    }

    function loadThongTinChuyenDonTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentChuyenDon);
            $.ajax({
                type: "GET",
                url: getChuyenDonTheoIdUrl,
                data: {
                    chuyenDonId: $(this).val()
                },
                success: function (response) {
                    $(contentChuyenDon).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentChuyenDon);
                }
            });
        });
    }

    return {
        init: init,
        loadThongTinChuyenDon: loadThongTinChuyenDon
    }
})();

var EditChuyenDonModule = (function (chuyenDonModule) {
    var $formEditChuyenDon,
        $vungChuyenDon,
        $toaAnChuyenDenTextbox,
        $toaAnChuyenDenDropdown,
        $toaAnChuyenDenHidden;
    var idTextarea = 'LyDoChuyenDon';

    var updateHoSoVuAn = "#HoSoVuAn_NgayChuyenDon";

    function init() {
        $formEditChuyenDon = $("#formEditChuyenDon");
        $vungChuyenDon = $("#ddlVungChuyenDon");
        $toaAnChuyenDenTextbox = $("#txtToaAnChuyenDen");
        $toaAnChuyenDenDropdown = $("#ddlToaAnChuyenDen");
        $toaAnChuyenDenHidden = $("#hiddenToaAnChuyenDen");
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        initDropdownVungChuyenDon();
        onDropdownVungChuyenDonChange();
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

    function initDropdownVungChuyenDon() {
        if ($vungChuyenDon.val() === "Trong tỉnh") {
            $toaAnChuyenDenDropdown.attr("disabled", false).show();
            $toaAnChuyenDenTextbox.attr("disabled", true).hide();
            $toaAnChuyenDenHidden.val("");
        }
        else {
            $toaAnChuyenDenDropdown.attr("disabled", true).hide();
            $toaAnChuyenDenTextbox.attr("disabled", false).show().val($toaAnChuyenDenHidden.val());
        }
    }

    function onDropdownVungChuyenDonChange() {
        $vungChuyenDon.on("change",
            function () {
                initDropdownVungChuyenDon();
            });
    }

    function updateForm() {
        $("#luu-chuyen-don-btn").on("click",
            function () {
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formEditChuyenDon.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditChuyenDon.prop("action"),
                        data: $formEditChuyenDon.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                                chuyenDonModule.loadThongTinChuyenDon();
                                //cap nhat phan chi tiet ho so vu an
                                $(updateHoSoVuAn).text($('#NgayChuyenDon').val());
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
        $formEditChuyenDon.validate({
            ignore: '',
            rules: {
                "NgayRaThongBao": {
                    required: true
                },
                "NgayChuyenDon": {
                    required: true
                },
                "ToaAnChuyenDen": {
                    required: true
                },
                "LyDoChuyenDon": {
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
                "NgayChuyenDon": {
                    required: "Ngày chuyển đơn không được để trống."
                },
                "ToaAnChuyenDen": {
                    required: "Tòa án chuyển đến không được để trống."
                },
                "LyDoChuyenDon": {
                    required: "Lý do chuyển đơn không được để trống."
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
})(ChuyenDonModule);