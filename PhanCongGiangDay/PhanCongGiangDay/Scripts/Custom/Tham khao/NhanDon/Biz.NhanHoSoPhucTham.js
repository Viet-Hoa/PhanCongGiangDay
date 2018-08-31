$(function () {
	NhanHoSoPhucThamModule.init();
});

var NhanHoSoPhucThamModule = (function () {
    var nhanHoSoPhucThamURL = "/NhanDon/DanhSachHoSoChoPhucTham";
	var $nhanHoSoPhucThamTable;

	function init() {
		initNhanHoSoPhucThamTable();
	}

	//function initRoleNhanVien() {
	//	$.ajax({
	//		type: "GET",
	//		url: "/Biz/KiemTraQuyenNhanVien",
	//		data: {
	//			hoSoVuAnId: hoSoVuAnId,
	//			contrCheck: "NhanDon",
	//			actionCheck: "TaoDuongSu"
	//		},
	//		success: function (response) {
	//			if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
	//				$("#btnTaoDuongSu").addClass("add-disabled");
	//				$(".btn-grid").addClass("edit-disabled");
	//			}
	//		}
	//	});
	//}

	function initNhanHoSoPhucThamTable() {
		$nhanHoSoPhucThamTable = $("#tableNhanHoSoPhucTham").DataTable({
			searching: false,
			order: [],
			pageLength: 10,
			lengthChange: false,
			ajax: {
				url: nhanHoSoPhucThamURL,
				method: "GET",
				beforeSend: function () {
					showLoadingOverlay("#nhanHoSoPhucThamContainer");
				},
				complete: function () {
				    hideLoadingOverlay("#nhanHoSoPhucThamContainer");
				}
			},
			columns: [
                { data: "STT" },
                { data: "MaHoSo" },
                { data: "TenCacDuongSu" },
                { data: "NgayChuyenHoSo" },
                { data: "NguoiChuyenHoSo" },
                {
                    data: "ChuyenDonID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-primary" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/GetChiTietHoSoChoNhanPhucTham?chuyenDonId=' + data + '"><i class="fa fa-bars"></i></button>'
                    }
                },
                {
                    data: "HoSoVuAnID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-primary btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/XacNhanHoSoPhucTham?hoSoVuAnId=' + data + '">Nhận</button>'
                	}
                }
			]
		});
	}

	function reloadHoSoPhucThamTable() {
		$nhanHoSoPhucThamTable.ajax.reload();
	}

	return {
		init: init,
		reloadHoSoPhucThamTable: reloadHoSoPhucThamTable
	}
})();

var XacNhanHoSoPhucTham = (function () {
    var $formXacNhanHoSoPhucTham;
    var idTextarea = "GhiChu";

    function init() {
        $formXacNhanHoSoPhucTham = $("#formXacNhanHoSoPhucTham");
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea);
        initValidation();
        updateForm();
    }
    function initDateTimePicker() {
        $("#NgayNhanHoSo").parent().datetimepicker({
            useCurrent: false,
            defaultDate: moment(new Date()).format(),
            format: "DD/MM/YYYY"
        });
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var ghiChuNhanHoSoSettings = $.extend({},
    //        {
    //            selector: "#GhiChu",
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
    //    tinymce.init(ghiChuNhanHoSoSettings);
    //}

    function updateForm() {
        $("#btnXacNhanHoSoPhucTham").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formXacNhanHoSoPhucTham.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formXacNhanHoSoPhucTham.prop("action"),
                        data: $formXacNhanHoSoPhucTham.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages[0] }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages[0] }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            NhanHoSoPhucThamModule.reloadHoSoPhucThamTable();
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function initValidation() {
        $formXacNhanHoSoPhucTham.validate({
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
})();