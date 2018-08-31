$(function () {
    ThongKePCTPModule.init();
});

var ThongKePCTPModule = (function () {
    var $hoSoChuaPhanCongTable;

    var hoSoChuaPhanCongUrl = "/ThongKeGiamSat/DanhSachHoSoChuaPhanCongThamPhanTable";
    var thongKeTrucTuyenUrl = "/ThongKeGiamSat/ChiTietThongKeTrucTuyenPCTPTable";


    function init() {
        initHoSoChuaPhanCongDataTable();
        loadDuLieuThongKeTrucTuyen();
        xemThongTinPhanCongThamPhan();
    }  

    function initHoSoChuaPhanCongDataTable() {
        $hoSoChuaPhanCongTable = $("#ho-so-chua-phan-cong-table").DataTable({
            searching: false,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: hoSoChuaPhanCongUrl,
                data: function(d) {
                    d.tuNgay = $("#TuNgay").val();
                    d.denNgay = $("#DenNgay").val();
                    d.toaAnId = $("#ToaAnID").val();
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#contentHoSoChuaPhanCong");
                },
                complete: function () {
                    hideLoadingOverlay("#contentHoSoChuaPhanCong");
                }
            },
            columns: [
                { data: "STT", className: "text-center" },
                { data: "SoHoSo", className: "text-center" },
                {
                    data: "MaHoSo"/*, render: function (data, type, row) {
                        if (row.CongDoanHoSo == 1)
                            return '<a target="_blank" href="/NhanDon/ChiTietHoSo/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 2)
                            return '<a target="_blank" href="/ThuLy/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 3)
                            return '<a target="_blank" href="/ChuanBiXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 4)
                            return '<a target="_blank"  href="/KetQuaXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 5 || row.CongDoanHoSo == -1)
                            return '<a target="_blank" href="/SauXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else
                            return '<a target="_blank" href="/NhanDon/ChiTietHoSo/' + row.HoSoVuAnID + '">' + data + '</a>';
                    } */
                },
                { data: "NhomAn" },
                { data: "GiaiDoan" },
                { data: "QuanHePhapLuat", className: "custom-wrap" },
                {
                    data: "HoSoVuAnID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-success" data-trigger="modal" data-target="#modalPhanCongThamPhan" data-url="/ThuLy/EditPhanCongThamPhan?hoSoVuAnId=' + data + '&thamPhanId=0">Phân Công Thẩm Phán</button>';
                    }
                }                
            ]
        });
    }

    function reloadPhanCongTable() {
        $hoSoChuaPhanCongTable.ajax.reload();
    }

    function xemThongTinPhanCongThamPhan() {

        //$("#xem-pctp-btn").on("click",
        //    function () {
        //        $hoSoChuaPhanCongTable.ajax.reload();
        //    });

        $("#ToaAnID").on("change",
            function () {
                $hoSoChuaPhanCongTable.ajax.reload();
            });
    }

    function loadDuLieuThongKeTrucTuyen() {      

        $("#tai-du-lieu-btn").on("click",
            function () {
                showLoadingOverlay("#contentThongKeTrucTuyen");
                $.ajax({
                    type: "GET",
                    url: thongKeTrucTuyenUrl,
                    data: getFormData(),
                    success: function (response) {
                        $("#contentThongKeTrucTuyen").html(response);
                        hideLoadingOverlay("#contentThongKeTrucTuyen");
                    }
                });
            });
    }

    function getFormData() {

        var tuNgay = $("#TuNgay").val();
        var denNgay = $("#DenNgay").val();
        var toaAnId = $("#ToaAnID").val();
        return {
            tuNgay: tuNgay,
            denNgay: denNgay,
            toaAnId: toaAnId
        }
    }

    return {
        init: init,
        reloadPhanCongTable: reloadPhanCongTable
    }
})();

var EditPhanCongThamPhanModule = (function () {
    var $formEditPhanCongThamPhan;
    var idTextarea = 'ghi-chu-phan-cong-tham-phan-textarea';

    function init() {
        $formEditPhanCongThamPhan = $("#formEditPhanCongThamPhan");
        initDateTimePicker();
        CKEDITOR.replace(idTextarea, { readOnly: true });
        initValidation();
        bindFormActions();
        changeSelectThamPhan();
        CKEDITOR.on('instanceReady', function (ev) {
            editor = ev.editor;

            // Show this "on" button.
            document.getElementById('readOnlyOn').style.display = '';

            // Event fired when the readOnly property changes.
            editor.on('readOnly', function () {
                document.getElementById('readOnlyOn').style.display = this.readOnly ? 'none' : '';
                document.getElementById('readOnlyOff').style.display = this.readOnly ? '' : 'none';
            });
        });
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
                    for (var i = response.length - 1; i >= 0; i--) {
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
                                $.notify({ message: NotifyMessage.MESSAGE_PHANCONGTHAMPHAN_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_PHANCONGTHAMPHAN_THANHCONG }, { type: "success" });
                                if ($('#contentLocDuLieu').length) {
                                    ThongKePCTPModule.reloadPhanCongTable();
                                }
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
                        required: ViewText.LABEL_NGAYPHANCONG + " " + ValidationMessages.VALIDATION_KHONGDETRONG
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
            invalidHandler: function (e, validator) {
                if (validator.errorList.length)
                    $('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
            }
        });
    }

    return {
        init: init
    }
})();

