$(function () {
    PhatHanhBanAnModule.initPhatHanhBanAn();
});

var PhatHanhBanAnModule = (function () {
    var $duongSuPhatHanhBanAnTable;
    var $ngayPhatHanhBanAnDropdownlist;
    var thongTinPhatHanhBanAnTheoIdUrl = "/SauXetXu/ThongTinPhatHanhBanAnTheoId";
    var thongTinPhatHanhBanAnTheoHoSoUrl = "/SauXetXu/PhatHanhBanAn";
    var duongSuNhanPhatHanhBanAnUrl = "/SauXetXu/DanhSachDuongSuNhanPhatHanBanAnTheoPhatHanhBanAn";
    var $duongSuSelectAllCheckBox;
    var $duongSuCheckBox;
    var $duongSuNhanPhatHanhBanAn;
    var selectedDuongSu = [];
    var hoSoVuAnId = $("#hoSoVuAnID").val();
    var roleGiaiDoan = $("#roleGiaiDoan").val();
    var roleCongDoan = $("#roleCongDoan").val();
    var strNgayTuyenAn;
    var ngayTuyenAn;
    var phatHanhBanAnId;
    var ngayPhatHanh;
    var hieuluc;

    function initPhatHanhBanAn() {
        loadPhatHanhBanAn();
    }

    function initDuongSuNhanBanAnTable() {
        $duongSuPhatHanhBanAnTable = $("#duong-su-phat-hanh-ban-an-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: duongSuNhanPhatHanhBanAnUrl,
                data: function () {
                    return {
                        phatHanhBanAnId: getPhatHanhBanAnId()
                    }
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#duong-su-phat-hanh-ban-an-container");
                },
                complete: function () {
                    hideLoadingOverlay("#duong-su-phat-hanh-ban-an-container");
                }
            },
            columns: [
                {
                    data: "DuongSuId", visible: false, orderable: false, render: function (data) {
                        return '<input type="hidden" class="duong-su-phat-hanh-ban-an-id" value="' + data + '" />';
                    }
                },
                { data: "HoVaTen", className: "custom-wrap" },
                { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                { data: "NgayNhanPhatHanhBanAn" }
            ],
            initComplete: function () {
                initSelectedDuongSu();
            }
        });
    }

    function initNgayPhatHanhBanAnDropdown() {
        $ngayPhatHanhBanAnDropdownlist = $("#ngay-phat-hanh-ban-an-dropdownlist");

        $ngayPhatHanhBanAnDropdownlist.on("change",
            function () {
                $("#phat-hanh-ban-an-id-hidden").val(this.value);
                loadThongTinPhatHanhBanAn(this.value);
            });
    }

    function loadThongTinPhatHanhBanAn(phatHanhBanAnId) {
        showLoadingOverlay("#thong-tin-phat-hanh-ban-an-container");
        $.ajax({
            type: "GET",
            url: thongTinPhatHanhBanAnTheoIdUrl,
            data: {
                phatHanhBanAnId: phatHanhBanAnId,
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#thong-tin-phat-hanh-ban-an-container").html(response);
                initNgayPhatHanh();
                initDuongSuNhanBanAnTable();
                initNgayTuyenAn();
                hideLoadingOverlay("#thong-tin-phat-hanh-ban-an-container");
            }
        });
    }

    function loadPhatHanhBanAn() {
        showLoadingOverlay("#phat-hanh-ban-an-container");
        $.ajax({
            type: "GET",
            url: thongTinPhatHanhBanAnTheoHoSoUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#phat-hanh-ban-an-container").html(response);
                initNgayPhatHanhBanAnDropdown();
                phatHanhBanAnId = $("#phat-hanh-ban-an-id-hidden").val();
                initNgayPhatHanh();
                initDuongSuNhanBanAnTable();
                initNgayTuyenAn();
                initRoleNhanVien();

                hideLoadingOverlay("#phat-hanh-ban-an-container");
            }
        });
    }

    //must be called in initComplete of .DataTable({initComplete: }) in oder to take data of column
    function initSelectedDuongSu() {
        selectedDuongSu = [];
        var columnData = $duongSuPhatHanhBanAnTable.column(0).data();
        $.each(columnData, function (index, value) {
            var duongSuId = value + '';
            selectedDuongSu.push(duongSuId);
        });
    }

    function initNgayTuyenAn() {
        var strNgayTuyenAn = $("#ngay-tuyen-an").val();
        if (strNgayTuyenAn == null)
            ngayTuyenAn = new Date();
        else {
            strNgayTuyenAn = strNgayTuyenAn.split("/");
            ngayTuyenAn = new Date(strNgayTuyenAn[2], strNgayTuyenAn[1] - 1, strNgayTuyenAn[0]);
        }
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "PhatHanhBanAn"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemPhatHanhBanAn").addClass("add-disabled");
                    $("#btnSuaPhatHanhBanAn").addClass("edit-disabled");
                }
            }
        });
    }

    function initNgayPhatHanh() {
        var strNgayPhatHanh = $("#ngay-phat-hanh").text();
        if (strNgayPhatHanh === "")
            ngayPhatHanh = null;
        else {
            strNgayPhatHanh = strNgayPhatHanh.split("/");
            ngayPhatHanh = new Date(strNgayPhatHanh[2], strNgayPhatHanh[1] - 1, strNgayPhatHanh[0]);
        }
    }

    function initHieuLuc() {
        var strNgayhieuluc = $("#ngay-hieu-luc").text();
        if (strNgayhieuluc === "")
            hieuluc = null;
        else {
            strNgayhieuluc = strNgayhieuluc.split("/");
            hieuluc = new Date(strNgayhieuluc[2], strNgayhieuluc[1] - 1, strNgayhieuluc[0]);
        }
    }

    function getSelectedDuongSu() {
        return selectedDuongSu;
    }

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    function getNgayTuyenAn() {
        return ngayTuyenAn;
    }

    function getPhatHanhBanAnId() {
        return phatHanhBanAnId;
    }

    function getNgayPhatHanh() {
        return ngayPhatHanh;
    }
    function getHieuLuc() {
        initHieuLuc();
        return hieuluc;
    }
    return {
        initPhatHanhBanAn: initPhatHanhBanAn,
        getSelectedDuongSu: getSelectedDuongSu,
        loadPhatHanhBanAn: loadPhatHanhBanAn,
        getHoSoVuAnId: getHoSoVuAnId,
        getNgayTuyenAn: getNgayTuyenAn,
        getPhatHanhBanAnId: getPhatHanhBanAnId,
        getNgayPhatHanh: getNgayPhatHanh, 
        getHieuLuc: getHieuLuc
    }
})();

var PhatHanhBanAnModalModule = (function (phatHanhBanAnModule) {
    var duongSuNhanPhatHanhBanAnUrl = "/SauXetXu/DanhSachDuongSuTheoHoSo";

    var $duongSuPhatHanhBanAnTable;
    var $ngayPhatHanhBanAnDtp;
    var $hieuLucDtp;
    var $duongSuSelectAllCheckBox;
    var $duongSuCheckBox;
    var $phatHanhBanAnForm;

    var selectedDuongSu = [];
    var selectedDuongSuNgayPhatHanh = [];
    var selectedNgayPhatHanh;
    var selectedHieuLucPhatHanh;
    var ngayPhatHanhTypeDateMoment;
    var ngayTuyenAnTypeDateMoment;
    var ngayhieulucTypeDateMoment;

    var thoiHanPhatHanh = 0; //considering about ThoiHanPhatHanh 10 days can be changed.

    function init() {
        initNgayPhatHanh();
        selectedHieuLucPhatHanh = null; //$("#hieu-luc-phat-hanh-hidden").val(); //moment(new Date()).format();
        $phatHanhBanAnForm = $("#phat-hanh-ban-an-form");
        initDuongSuNhanBanAnTable();
        initNgayHanPhatHanhBanAnDateTimePicker();
        initHieuLucDateTimePicker();
        initSelectAllDuongSuChekBox();
        initValidation();
        bindFormActions();
    }

    function initNgayPhatHanh() {
        if (phatHanhBanAnModule.getNgayPhatHanh() != null)
            ngayPhatHanhTypeDateMoment = moment(phatHanhBanAnModule.getNgayPhatHanh());
        else
            ngayPhatHanhTypeDateMoment = moment(phatHanhBanAnModule.getNgayTuyenAn()).add(thoiHanPhatHanh, 'day');

        ngayTuyenAnTypeDateMoment = moment(phatHanhBanAnModule.getNgayTuyenAn());
        selectedNgayPhatHanh = ngayPhatHanhTypeDateMoment.format('DD/MM/YYYY');
        if (phatHanhBanAnModule.getHieuLuc() != null)
            ngayhieulucTypeDateMoment = moment(phatHanhBanAnModule.getHieuLuc());
    }


    function initNgayHanPhatHanhBanAnDateTimePicker() {
        $ngayPhatHanhBanAnDtp = $("#ngay-phat-hanh-ban-an-modal-dtp");
        $ngayPhatHanhBanAnDtp.datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: ngayPhatHanhTypeDateMoment,
            //defaultDate: new Date(),
            useCurrent: false
        });

        $ngayPhatHanhBanAnDtp.on("dp.change",
            function (e) {

                if (e.date) {
                    selectedNgayPhatHanh = e.date.format();
                }
                var thoiHanPhatHanh = $(this).find("input").val().split("/");
                var thoiHanPhatHanhMoment = moment(new Date(thoiHanPhatHanh[2], thoiHanPhatHanh[1] - 1, thoiHanPhatHanh[0])).format('DD/MM/YYYY');
                $(".ngay-phat-hanh-tung-duong-su").each(function() {
                    $(this).data("DateTimePicker").maxDate(thoiHanPhatHanhMoment);
                });
            });
    }

    function initHieuLucDateTimePicker() {
        $hieuLucDtp = $("#hieu-luc-phat-hanh-modal-dtp");
        $hieuLucDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: ngayhieulucTypeDateMoment
        });

        $hieuLucDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    ngayhieulucTypeDateMoment = e.date.format();
                }
            });
    }

    function initDuongSuNhanBanAnTable() {
        $duongSuPhatHanhBanAnTable = $("#duong-su-phat-hanh-ban-an-modal-table").DataTable({
            searching: false,
            order: [],
            pageLength: -1,
            lengthChange: false,
            ajax: {
                url: duongSuNhanPhatHanhBanAnUrl,
                method: "GET",
                data: {
                    hoSoVuAnId: phatHanhBanAnModule.getHoSoVuAnId(),
                    phatHanhBanAnId: phatHanhBanAnModule.getPhatHanhBanAnId()
                }
            },
            columns: [
                {
                    data: "DuongSuId", orderable: false, render: function (data, type, row) {
                        var ngayPhatHanh;
                        if (row.NgayNhanPhatHanhBanAn == null)
                            ngayPhatHanh = selectedNgayPhatHanh.toString();
                        else
                            ngayPhatHanh = row.NgayNhanPhatHanhBanAn;
                        return '<input type="checkbox" id="duongSuNhanPhatHanh' + data + '" data-ngay-phat-hanh="' + ngayPhatHanh + '" class="duong-su-nhan-ban-an-modal-checkbox" value="' + data + '"/>';
                    }
                },
                { data: "HoVaTen", className: "custom-wrap"},
                { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                {
                    data: "NgayNhanPhatHanhBanAn", orderable: false, render: function (data, type, row) {
                        if (data == null)
                            data = selectedNgayPhatHanh.toString();
                        return '<div class="input-group ngay-phat-hanh-tung-duong-su" data-id="duongSuNhanPhatHanh' + row.DuongSuId + '">'
                            + '<input type="text" class="form-control" value="' + data + '"/>'
                            + '<span class="input-group-addon">'
                            + '<span class="fa fa-calendar"></span>'
                            + '</span>'
                            + '</div>';
                    }
                }
            ],
            initComplete: function () {
                $('#duong-su-phat-hanh-ban-an-modal-table_info').hide();
                $('#duong-su-phat-hanh-ban-an-modal-table_paginate').hide();
                initSelectDuongSuCheckBox();
                initNgayPhatHanhTungDuongSuDateTimePicker();
            }
        });
    }

    function initSelectDuongSuCheckBox() {
        selectedDuongSu = [];

        $duongSuCheckBox = $(".duong-su-nhan-ban-an-modal-checkbox");
        $duongSuCheckBox.each(function () {
            var defaultSelectedDuongSu = phatHanhBanAnModule.getSelectedDuongSu();
            var isDefault = defaultSelectedDuongSu.indexOf($(this).val()) > -1;
            if (isDefault) {
                selectedDuongSu.push($(this).val());
                $(this).prop("checked", true);
            }

            if (selectedDuongSu.length === $duongSuCheckBox.length) {
                $duongSuSelectAllCheckBox.prop("checked", true);
            } else {
                $duongSuSelectAllCheckBox.prop("checked", false);
            }
        });

        $duongSuCheckBox.on("click", function () {
            if (selectedDuongSu.length === $duongSuCheckBox.length) {
                $duongSuSelectAllCheckBox.prop("checked", true);
            } else {
                $duongSuSelectAllCheckBox.prop("checked", false);
            }

            validateDataTableCheckbox();
        });
    }

    function initSelectAllDuongSuChekBox() {
        $duongSuSelectAllCheckBox = $(".duong-su-phat-hanh-ban-an-modal-select-all-checkbox");
        $duongSuSelectAllCheckBox.on("click", function (e) {
            selectedDuongSu = [];

            if (e.currentTarget.checked) {
                $duongSuCheckBox.each(function () {
                    var duongSuId = $(this).val();
                    selectedDuongSu.push(duongSuId);
                    $(this).prop('checked', true);
                });
            } else {
                $duongSuCheckBox.each(function () {
                    $(this).prop('checked', false);
                });
            }

            validateDataTableCheckbox();
        });
    }

    function initNgayPhatHanhTungDuongSuDateTimePicker() {
        $ngayPhatHanhBanAnTungDuongSuDtp = $(".ngay-phat-hanh-tung-duong-su");
        $ngayPhatHanhBanAnTungDuongSuDtp.each(function () {
            var strNgayPhatHanhTungDuongSu = $(this).children('input').val();
            var ngayPhatHanhTungDuongSu;
            if (strNgayPhatHanhTungDuongSu !== "") {
                strNgayPhatHanhTungDuongSu = strNgayPhatHanhTungDuongSu.split("/");
                ngayPhatHanhTungDuongSu = moment(new Date(strNgayPhatHanhTungDuongSu[2], strNgayPhatHanhTungDuongSu[1] - 1,
                    strNgayPhatHanhTungDuongSu[0]));
            } else {
                ngayPhatHanhTungDuongSu = ngayPhatHanhTypeDateMoment;
            }

            $(this).datetimepicker({
                format: 'DD/MM/YYYY',
                //maxDate: ngayPhatHanhTypeDateMoment,
                //maxDate: selectedNgayPhatHanh,
                //minDate: ngayTuyenAnTypeDateMoment,
                useCurrent: false,
                defaultDate: ngayPhatHanhTungDuongSu
            });
            $(this).on("dp.change", function (e) {
                
                if (e.date) {
                    $('#' + $(this).data('id')).data('ngay-phat-hanh', e.date.format('DD/MM/YYYY'));
                }
            });
        });
    }

    function bindFormActions() {
        $("#phat-hanh-ban-an-btn").on("click",
            function () {
                var isValid = validateDataTableCheckbox();
                if ($phatHanhBanAnForm.valid() && isValid) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $phatHanhBanAnForm.prop("method"),
                        url: $phatHanhBanAnForm.prop("action"),
                        data: {
                            hoSoVuAnId: phatHanhBanAnModule.getHoSoVuAnId(),
                            ngayPhatHanh: selectedNgayPhatHanh,
                            hieuLuc: selectedHieuLucPhatHanh,
                            duongSuNhanPhatHanhBanAnIds: selectedDuongSu,
                            duongSuNgayPhatHanh: selectedDuongSuNgayPhatHanh
                        },
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({
                                    message: NotifyMessage.MESSAGE_PHATHANHBANAN_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_PHATHANHBANAN_THANHCONG }, { type: "success" });
                                phatHanhBanAnModule.loadPhatHanhBanAn();
                            }
                        },
                        complete: function () {
                            $('#modalLarge').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function getDataFormCheckbox() {
        selectedDuongSu = [];
        selectedDuongSuNgayPhatHanh = [];

        $duongSuCheckBox = $(".duong-su-nhan-ban-an-modal-checkbox");
        $duongSuCheckBox.each(function () {
            if ($(this).prop("checked")) {
                selectedDuongSu.push($(this).val());
                selectedDuongSuNgayPhatHanh.push($(this).data('ngay-phat-hanh'));
            }
        });
    }

    function initValidation() {
        $phatHanhBanAnForm.validate({
            rules: {
                "ngay-phat-hanh-ban-an-modal-dtp": {
                    required: true
                },
                "hieu-luc-phat-hanh-modal-dtp": {
                    required: false
                }
            },
            messages:
            {
                "ngay-phat-hanh-ban-an-modal-dtp": {
                    required: "Thời hạn phát hành không được để trống."
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

    function validateDataTableCheckbox() {
        getDataFormCheckbox();
        if (selectedDuongSu.length === 0) {
            $('span[for="duong-su-phat-hanh-ban-an-modal-table"]').each(function () {
                $(this).text(ValidationMessages.VALIDATION_DUONGSUPHATHANH);
            });

            return false;
        } else {
            $('span[for="duong-su-phat-hanh-ban-an-modal-table"]').each(function () {
                $(this).text("");
            });

            return true;
        }
    }

    return {
        init: init
    }
})(PhatHanhBanAnModule);