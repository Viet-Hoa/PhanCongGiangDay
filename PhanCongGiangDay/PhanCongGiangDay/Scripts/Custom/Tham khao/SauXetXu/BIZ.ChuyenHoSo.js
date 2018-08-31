$(function () {
	ChuyenHoSoModule.init();
});

var ChuyenHoSoModule = (function () {
    var hoSoVuAnId = $("#hoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

	var contentChuyenHoSo = "#contentChuyenHoSo",
        selectNgayTao = "#selectNgayTaoChuyenHoSo";

	var getChuyenHoSoUrl = "/SauXetXu/ChuyenHoSo",
        getChuyenHoSoTheoIdUrl = "/SauXetXu/GetChuyenHoSoTheoId";

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
                contrCheck: "SauXetXu",
                actionCheck: "EditChuyenHoSo"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemChuyenHoSo").addClass("add-disabled");
                    $("#btnSuaChuyenHoSo").addClass("edit-disabled");
                }
            }
        });
    }

	function loadThongTinChuyenHoSo() {
        showLoadingOverlay("#chuyen-ho-so-container");
		$.ajax({
			type: "GET",
			url: getChuyenHoSoUrl,
			data: {
                hoSoVuAnId: hoSoVuAnId
			},
			success: function (response) {
                $("#chuyen-ho-so-container").html(response);
			    initRoleNhanVien();

                hideLoadingOverlay("#chuyen-ho-so-container");
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

    var idTextarea = 'ghi-chu-chuyen-ho-so-sxx-textarea';

    function init() {
        $formEditChuyenHoSo = $("#formEditChuyenHoSo");
        $vungChuyenHoSo = $("#ddlVungChuyenHoSo");
        $toaAnChuyenDenTextbox = $("#txtToaAnChuyenDen");
        $toaAnChuyenDenDropdown = $("#ddlToaAnChuyenDen");
        $toaAnChuyenDenHidden = $("#hiddenToaAnChuyenDen");
        
        onDropdownVungChuyenHoSoChange();   
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        updateForm();
        initValidation();
        initVungChuyen();
    }
	function initDateTimePicker() {
		$("#ngay-ra-thong-bao-dtp").datetimepicker({
		    useCurrent: false,
		    maxDate: moment(),
		    defaultDate: moment(new Date()).format(),
		    format: "DD/MM/YYYY"
		});
		$("#ngay-chuyen-ho-so-dtp").datetimepicker({
		    useCurrent: false,
		    maxDate: moment(),
		    defaultDate: moment(new Date()).format(),
		    format: "DD/MM/YYYY"
		});
    }

    function initVungChuyen() {
        var toaan = $('#toaAn').val();
        var x = $("#txtToaAnChuyenDen").val();
        if (toaan != 10 && (x == null || x == "")) {
            $vungChuyenHoSo.val("Trong tỉnh");
            initDropdownVungChuyenHoSo();            
        }
        else if (toaan == 10 && (x == null || x == "")) {
            $vungChuyenHoSo.val("Ngoài tỉnh");
            initDropdownVungChuyenHoSo();
        }
        else if (x == "TAND tỉnh Cà Mau") {
            $vungChuyenHoSo.val("Trong tỉnh");
            initDropdownVungChuyenHoSo();
        }
        else {
            $vungChuyenHoSo.val("Ngoài tỉnh");
            initDropdownVungChuyenHoSo();
        }
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
            $toaAnChuyenDenHidden.val("");
        }
    }

    function onDropdownVungChuyenHoSoChange() {
        $vungChuyenHoSo.on("change",
            function () {
                initDropdownVungChuyenHoSo();
            });
    }

    function updateForm() {
        $("#btnLuuChuyenHoSo").on("click", function () {
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
                    required: ValidationMessages.VALIDATION_NGAYRAPHIEUCHUYEN_KHONGTRONG
                },
                "NgayChuyenHoSo": {
                    required: ValidationMessages.VALIDATION_NGAYCHUYENHOSO_KHONGTRONG
                },
                "ToaAnChuyenDen": {
                    required: ValidationMessages.VALIDATION_TOAANCHUYENDEN_KHONGTRONG
                },
                "LyDoChuyenHoSo": {
                    required: ValidationMessages.VALIDATION_LYDOCHUYENHOSO_KHONGTRONG
                },
                "txtToaAnChuyenDen": {
                    required: ValidationMessages.VALIDATION_TOAANCHUYENDEN_KHONGTRONG
                },
                "ddlToaAnChuyenDen": {
                    required: ValidationMessages.VALIDATION_TOAANCHUYENDEN_KHONGTRONG
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