$(function () {
	NhanHoSoModule.init();
});

var NhanHoSoModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentNhanHoSo = "#contentNhanHoSo",
        contentChiTietNhanHoSo = "#contentChiTietNhanHoSo",
        contentChiTietChuyenHoSo = "#contentThongTinChuyenHoSo",
        selectNgayTao = "#selectNgayTaoNhanHoSo",
        modalCongDoan = "#modelChuyenCongDoan",
        formCongDoan = "#formChuyenCongDoan";

    var getNhanHoSoUrl = "/NhanHoSo/ChiTietNhanHoSo",
        getNhanHoSoTheoIdUrl = "/NhanHoSo/GetChiTietNhanHoSoTheoId",
        getChiTietChuyenHoSoUrl = "/NhanHoSo/GetChiTietChuyenHoSoTheoHoSoVuAnID";

    function init() {
        chuyenCongDoanForm();
        chuyenCongDoanNext();
        chuyenCongDoanPrev();
        loadThongTinNhanHoSo();
        loadThongTinNhanHoSoTheoId();
        initRoleChuyenCongDoan();
    }

    function initRoleNhanVien() {
		$.ajax({
			type: "GET",
			url: "/Biz/KiemTraQuyenNhanVien",
			data: {
				hoSoVuAnId: hoSoVuAnId,
				contrCheck: "NhanHoSo",
                actionCheck: "EditChiTietNhanHoSo"
			},
			success: function (response) {
				if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaNhanHoSo").addClass("edit-disabled");
				    $("#btnChuyenCongDoan").addClass("edit-disabled");
				}
			}
		});
	}

    function initRoleChuyenCongDoan() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "ChuyenCongDoan"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#btnChuyenCongDoan").addClass("edit-disabled");
                }
            }
        });
    }

    function loadThongTinNhanHoSo() {
        showLoadingOverlay(contentNhanHoSo);
        $.ajax({
            type: "GET",
            url: getNhanHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentNhanHoSo).html(response);
                initRoleNhanVien();
                loadThongTinChuyenHoSo();
                hideLoadingOverlay(contentNhanHoSo);
            }
        });
    }

    function loadThongTinNhanHoSoTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentChiTietNhanHoSo);
            $.ajax({
                type: "GET",
                url: getNhanHoSoTheoIdUrl,
                data: {
                    nhanHoSoId: $(this).val()
                },
                success: function (response) {
                    $(contentChiTietNhanHoSo).html(response);

                    hideLoadingOverlay(contentChiTietNhanHoSo);
                }
            });
        });
    }

    function loadThongTinChuyenHoSo() {
        $.ajax({
            type: "GET",
            url: getChiTietChuyenHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentChiTietChuyenHoSo).html(response);
            }
        });
    }

    function chuyenCongDoanForm() {
        $("#chuyen-cong-doan-btn").on("click", function () {
            showLoadingOverlay(modalCongDoan + " .modal-content");

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: $(formCongDoan).prop("action"),
                data: $(formCongDoan).serialize(),
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            });

            return false;
        });
    }

    function chuyenCongDoanNext() {
        $("#btnChuyenCongDoanNext").on("click", function () {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/NhanDon/ChuyenCongDoanNext",
                data: {
                    HoSoVuAnID: hoSoVuAnId
                },
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.replace(response.urlCongDoan);
                    }
                }
            });

            return false;
        });
    }

    function chuyenCongDoanPrev() {
        $("#btnChuyenCongDoanPrev").on("click", function () {

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/NhanDon/ChuyenCongDoanPrev",
                data: {
                    HoSoVuAnID: hoSoVuAnId
                },
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.replace(response.urlCongDoan);
                    }
                }
            });

            return false;
        });
    }

    return {
        init: init,
        loadThongTinNhanHoSo: loadThongTinNhanHoSo
    }
	
})();

var EditNhanHoSoModule = (function (nhanHoSoModule) {
    var $formEditNhanHoSo;
    var idGhiChuTextarea = 'ghi-chu-nhan-ho-so-textarea';

    function init() {
        $formEditNhanHoSo = $("#formEditChiTietNhanHoSo");
        initDateTimePicker();
        initValidation();
        CKEDITOR.replace(idGhiChuTextarea);
        updateForm();
    }
    function initDateTimePicker() {
        $("#NgayNhanHoSo").parent().datetimepicker({
            useCurrent: false,
            defaultDate: moment(new Date()).format(),
            format: "DD/MM/YYYY"
        });
    }

    function updateForm() {
        $("#btnLuuNhanHoSo").on("click",
            function () {
                $().CKEditorSetValForTextarea(idGhiChuTextarea);
                if ($formEditNhanHoSo.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditNhanHoSo.prop("action"),
                        data: $formEditNhanHoSo.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages[0] }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages[0] }, { type: "success" });
                                nhanHoSoModule.loadThongTinNhanHoSo();
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
        $formEditNhanHoSo.validate({
            ignore: '',
            rules: {
                "NgayNhanHoSo": {
                    required: true
                },
                "NguoiNhanHoSo": {
                    required: true
                }
            },
            messages:
            {
                "NgayNhanHoSo": {
                    required: "Ngày nhận hồ sơ không được để trống."
                },
                "NguoiNhanHoSo": {
                    required: "Người nhận hồ sơ không được để trống."
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
})(NhanHoSoModule);