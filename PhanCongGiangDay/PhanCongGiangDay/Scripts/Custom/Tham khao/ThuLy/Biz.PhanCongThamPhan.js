$(function () {
    PhanCongThamPhanModule.init();
});

var PhanCongThamPhanModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentPhanCongThamPhan = "#contentPhanCongThamPhan",
        selectNgayTao = "#ddlNgayTaoPhanCongThamPhan";

    var getPhanCongThamPhanUrl = "/ThuLy/PhanCongThamPhan",
        getPhanCongThamPhanTheoIdUrl = "/ThuLy/ChiTietPhanCongThamPhanTheoId";

    function init() {
        
        loadThongTinPhanCongThamPhan();
        loadThongTinPhanCongThamPhanTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ThuLy",
                actionCheck: "EditPhanCongThamPhan"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaPhanCongThamPhan").addClass("edit-disabled");
                    $("#btnThemPhanCongThamPhan").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinPhanCongThamPhan() {
        showLoadingOverlay(contentPhanCongThamPhan);
        $.ajax({
            type: "GET",
            url: getPhanCongThamPhanUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentPhanCongThamPhan).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentPhanCongThamPhan);
            }
        });
    }

    function loadThongTinPhanCongThamPhanTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentPhanCongThamPhan);
            $.ajax({
                type: "GET",
                url: getPhanCongThamPhanTheoIdUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentPhanCongThamPhan).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentPhanCongThamPhan);
                }
            });
        });
    }

    return {
        init: init,
        loadThongTinPhanCongThamPhan: loadThongTinPhanCongThamPhan,
    }
})();


var EditPhanCongThamPhanModule = (function (phanCongThamPhanModule) {
    var $formEditPhanCongThamPhan;
    var updateHoSoVuAn = "#HoSoVuAn_ThamPhan";
    var idTextarea = 'ghi-chu-phan-cong-tham-phan-textarea';
    function init() {
        $formEditPhanCongThamPhan = $("#formEditPhanCongThamPhan");
        initDateTimePicker();
        //initEditor();
        CKEDITOR.replace(idTextarea,{ readOnly: true });
        initValidation();
        bindFormActions();
        changeSelectThamPhan();
    }
    
    function initDateTimePicker() {
        $("#ngay-phan-cong-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
        });
    }

    function changeSelectThamPhan() {
        $('#ThamPhan').on("change", function () {
            var maNV = $(this).val();

            $.ajax({
                type: "GET",
                dataType: 'json',
                url: '/ChuanBiXetXu/ResetThuKyTheoThamPhan',
                data: {
                    manv: maNV
                },
                success: function (response) {
                    $('#ThuKy').html('');
                    $("#ThuKy").append("<option value=''>--Chọn--</option>");
                    for (var i = 0; i < response.length; i++) {
                        $('#ThuKy').append('<option value="' + response[i].Value + '">' + response[i].Text + '</option>');
                    }
                    $('#ThuKy').removeAttr('disabled');
                    $('#ThuKy').next('input[name=ThuKy]').val('');
                }
            });

            $.ajax({
                type: "GET",
                dataType: 'json',
                url: '/ChuanBiXetXu/GetThuKyTheoThamPhan',
                data: {
                    manv: maNV
                },
                success: function (response) {
                    for (var i = response.length-1; i >= 0; i--) {
                        $("#ThuKy > option").each(function () {
                            if ($(this).val() == response[i].MaNV) {
                                $(this).addClass("custom-option");
                                $(this).insertBefore("#ThuKy option:eq(1)");
                            }
                        });
                    }
                    $("#ThuKy option:eq(1)").attr('selected', 'selected');
                    $('#ThuKy').removeAttr('disabled');
                    $('#ThuKy').next('input[name=ThuKy]').val('');
                    $('#ThuKy').closest('.tab-pane').find('.DanhSachNhanhVien li').each(function () {
                        var value = $(this).find('input').val();
                        if (value !== $('#ThuKy').val()) {
                            $(this).show();
                            $(this).find('input').prop('checked', true);
                        }
                    });
                    if ($('#ThuKy').val() !== '') {

                        $(this).closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").parent().hide();
                        $(this).closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").find('input').prop('checked', false);
                    }

                    $('#ThuKy').closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").parent().hide();
                    $('#ThuKy').closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").find('input').prop('checked', false);
                }
            });
        });
    }

    function bindFormActions() {
        $("#luu-phan-cong-tham-phan-btn").on("click",
            function () {
                $().CKEditorSetValForTextarea(idTextarea);
                if ($formEditPhanCongThamPhan.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formEditPhanCongThamPhan.prop("method"),
                        url: $formEditPhanCongThamPhan.prop("action"),
                        data: $formEditPhanCongThamPhan.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_PHANCONGTHAMPHAN_KHONGTHANHCONG}, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_PHANCONGTHAMPHAN_THANHCONG }, { type: "success" });
                                phanCongThamPhanModule.loadThongTinPhanCongThamPhan();
                                //cap nhat phan chi tiet ho so vu an                                
                                $(updateHoSoVuAn).text($("#ThamPhan option:selected").text());
                                
                            }
                        },
                        complete: function () {
                            $("#modalPhanCongThamPhan").modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function initValidation() {
        $formEditPhanCongThamPhan.validate({
            ignore: '',
            rules: {
                "NgayPhanCong": {
                    required: true
                },
                "TenNguoiPhanCong": {
                    required: true
                },
                "ThamPhan": {
                    required: true
                },
                "ThamPhan1": {
                    required: true
                },
                "ThamPhan2": {
                    required: true
                },
                //"ThamPhanKhac": {
                //    required: true
                //},
                "HoiThamNhanDan": {
                    required: true
                },
                "HoiThamNhanDan2": {
                    required: true
                },
                //"HoiThamNhanDan3": {
                //    required: true
                //},
                "ThuKy": {
                    required: true
                }
            },
            messages:
            {
                "NgayPhanCong": {
                    required: ViewText.LABEL_NGAYPHANCONG +" "+ ValidationMessages.VALIDATION_KHONGDETRONG
                },
                "TenNguoiPhanCong": {
                    required: ViewText.LABEL_NGUOIPHANCONG + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                },
                "ThamPhan": {
                    required: ViewText.LABEL_THAMPHAN_CHUTOA + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                },
                "ThamPhan1": {
                    required: ViewText.LABEL_THAMPHAN1 + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                },
                "ThamPhan2": {
                    required: ViewText.LABEL_THAMPHAN2 + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                //"ThamPhanKhac": {
                //    required: ViewText.LABEL_THAMPHAN_KHAC + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                //},
                "HoiThamNhanDan": {
                    required: ViewText.LABEL_HOITHAMNHANDAN_1 + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                },
                "HoiThamNhanDan2": {
                    required: ViewText.LABEL_HOITHAMNHANDAN_2 + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                //"HoiThamNhanDan3": {
                //    required: ViewText.LABEL_HOITHAMNHANDAN_3 + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                //},
                "ThuKy": {
                    required: ViewText.LABEL_THUKY + " " + ValidationMessages.VALIDATION_KHONGDETRONG
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
            },
            invalidHandler: function(e, validator) {
                if (validator.errorList.length)
                    $('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
            }
        });
    }

    return {
        init: init
    }
})(PhanCongThamPhanModule );