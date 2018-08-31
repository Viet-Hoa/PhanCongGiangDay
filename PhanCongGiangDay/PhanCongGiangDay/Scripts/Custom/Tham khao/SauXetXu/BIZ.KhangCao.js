$(function () {
    $.validator.addMethod("khangCaoGreaterThan",
        function (value, element, params) {
            if (!isNaN(value) || !isNaN($(params).val()))
                return true;

            var newValue = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
            var paramValue = $(params).val().replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");

            if (!/Invalid|NaN/.test(new Date(newValue))) {
                return new Date(newValue) >= new Date(paramValue);
            }

            return Number(newValue) >= Number(paramValue);
        }, ValidationMessages.VALIDATION_NGAYNOPKHANGCAO_LONHON_NGAYLAMKHANGCAO);

    $.validator.addMethod("khangCaoNotGreaterThan",
        function (value, element, params) {
            if (!isNaN(value) || !isNaN($(params).val()))
                return true;

            var newValue = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
            var paramValue = $(params).val().replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");

            if (!/Invalid|NaN/.test(new Date(newValue))) {
                return new Date(newValue) <= new Date(paramValue);
            }

            return Number(newValue) <= Number(paramValue);
        }, ValidationMessages.VALIDATION_NGAYLAMKHANGCAO_NHOHON_NGAYNOPKHANGCAO);

    KhangCaoModule.init();
});

var KhangCaoModule = (function () {
    var $khangCaoTable;
    var khangCaoUrl = "/SauXetXu/KhangCao";
    var hoSoVuAnId = $("#hoSoVuAnID").val(),
        nhomAn = $("#nhomAn").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    function init() {
        loadKhangCao();
    }

    function loadKhangCao() {
        initKhangCaoDataTableTheoNhomAn(nhomAn);
    }

    function initKhangCaoDataTableTheoNhomAn(nhomAn) {
        if (nhomAn == "AD") {
            initKhangCaoDataTableNhomADBPXLHC(hoSoVuAnId);
        }
        else if (nhomAn == "HS") {
            initKhangCaoDataTableHinhSu(hoSoVuAnId);
        }
        else {
            initKhangCaoDataTable(hoSoVuAnId);
        }
    }

    function initKhangCaoDataTable(hoSoVuAnId) {
        $khangCaoTable = $("#khang-cao-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: khangCaoUrl,
                data: function () {
                    return {
                        hoSoVuAnId: hoSoVuAnId
                    }
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#khang-cao-container");
                },
                complete: function () {
                    hideLoadingOverlay("#khang-cao-container");
                    initRoleNhanVien();
                }
            },
            columns: [
                { data: "KhangCaoId" },
                { data: "NguoiKhangCao" },
                { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                { data: "NgayLamDon" },
                { data: "NgayNopDon" },
                { data: "HinhThucNopDon" },
                { data: "TinhTrangKhangCao" },
                {
                    data: "KhangCaoId", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/SauXetXu/ThongTinKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/SauXetXu/SuaKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/SauXetXu/XoaKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
    }

    function initKhangCaoDataTableHinhSu(hoSoVuAnId) {
        $khangCaoTable = $("#khang-cao-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: khangCaoUrl,
                data: function () {
                    return {
                        hoSoVuAnId: hoSoVuAnId
                    }
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#khang-cao-container");
                },
                complete: function () {
                    hideLoadingOverlay("#khang-cao-container");
                    initRoleNhanVien();
                }
            },
            columns: [
                { data: "KhangCaoId" },
                { data: "NguoiKhangCao" },
                { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                { data: "NgayLamDon" },
                { data: "NgayNopDon" },
                { data: "HinhThucNopDon" },
                { data: "TinhTrangKhangCao" },
                {
                    data: "KhangCaoId", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/SauXetXu/ThongTinKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modalLarge" data-url="/SauXetXu/SuaKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modalLarge" data-url="/SauXetXu/XoaKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
    }

    function initKhangCaoDataTableNhomADBPXLHC(hoSoVuAnId) {
        $khangCaoTable = $("#khang-cao-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: khangCaoUrl,
                data: function () {
                    return {
                        hoSoVuAnId: hoSoVuAnId
                    }
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#khang-cao-container");
                },
                complete: function () {
                    hideLoadingOverlay("#khang-cao-container");
                    initRoleNhanVien();
                }
            },
            columns: [
                { data: "KhangCaoId" },
                { data: "NguoiKhieuNai" },
                { data: "NgayLamDon" },
                { data: "NgayNopDon" },
                { data: "HinhThucNopDon" },
                {
                    data: "KhangCaoId", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/SauXetXu/ThongTinKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/SauXetXu/SuaKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/SauXetXu/XoaKhangCaoModal?khangCaoId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "TaoKhangCao"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnTaoKhangCao").addClass("add-disabled");
                    $(".btn-grid").addClass("edit-disabled");
                }
            }
        });
    }

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    function reloadKhangCaoTable() {
        $khangCaoTable.ajax.reload();
    }

    return {
        init: init,
        reloadKhangCaoTable: reloadKhangCaoTable,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var KhangCaoModalModule = (function (khangCaoModule) {
    var $ngayNopDonDtp;
    var $ngayLamDonDtp;
    var $khangCaoForm;
    var $modalId;

    var selectedNgayNopDon;
    var selectedNgayLamDon;
    var selectedDuongSu = [];
    var nhomAn;

    var idNoiDungKhangCaoTextarea = 'noi-dung-khang-cao-textarea';
    var idTaiLieuChungTuTextarea = 'tai-lieu-chung-tu-kem-theo-textarea';
    var idLyDoTextarea = 'ly-do-textarea';
    var idGhiChuTextara = 'ghi-chu-textarea';

    function init() {
        selectedNgayNopDon = moment(new Date()).format();
        selectedNgayLamDon = moment(new Date()).format();
        $khangCaoForm = $("#khang-cao-form");
        nhomAn = $("#nhomAn").val();
        initDateTimePicker();
        //initEditor();
        initModalId();
        initEditorTheoNhomAn();
        initValidationTheoNhomAn();
        bindFormActions();
    }

    function initModalId() {
        if (nhomAn == "HS") {
            $modalId = $('#modalLarge');
        } else {
            $modalId = $('#modal');
        }
    }

    function initDateTimePicker() {
        $ngayNopDonDtp = $("#ngay-nop-don-khang-cao-dtp");
        $ngayLamDonDtp = $("#ngay-lam-don-khang-cao-dtp");

        $ngayNopDonDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });

        $ngayNopDonDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgayNopDon = e.date.format();
                }
            });

        $ngayLamDonDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });

        $ngayLamDonDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgayLamDon = e.date.format();
                }
            });
    }

    function bindFormActions() {
        $("#khang-cao-btn").on("click",
            function () {
                //tinymce.triggerSave();
                saveTriggerEditor();

                if ($khangCaoForm.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $khangCaoForm.prop("method"),
                        url: $khangCaoForm.prop("action"),
                        data: getFormData(),
                        success: function (response) {
                            
                            if (nhomAn == "AD") {
                                if (!response.IsSuccess) {
                                    $.notify({ message: "Thêm khiếu nại / kiến nghị không thành công." },
                                        { type: "danger" });
                                } else {
                                    $.notify({ message: "Thêm khiếu nại / kiến nghị thành công." },
                                        { type: "success" });
                                    khangCaoModule.reloadKhangCaoTable();
                                }
                            } else {
                                if (!response.IsSuccess) {
                                    $.notify({ message: NotifyMessage.MESSAGE_CAPNHATKHANGCAO_KHONGTHANHCONG }, { type: "danger" });
                                } else {
                                    $.notify({ message: NotifyMessage.MESSAGE_CAPNHATKHANGCAO_THANHCONG }, { type: "success" });
                                    khangCaoModule.reloadKhangCaoTable();
                                }
                            }
                        },
                        complete: function () {
                            $modalId.modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function saveTriggerEditor() {
        if (nhomAn == 'AD') {
            $().CKEditorSetValForTextarea(idNoiDungKhangCaoTextarea);
            $().CKEditorSetValForTextarea(idLyDoTextarea);
            $().CKEditorSetValForTextarea(idGhiChuTextara);
        } else {
            $().CKEditorSetValForTextarea(idNoiDungKhangCaoTextarea);
            $().CKEditorSetValForTextarea(idTaiLieuChungTuTextarea);
        }
    }

    function initEditorTheoNhomAn() {
        if (nhomAn == 'AD') {
            CKEDITOR.replace(idNoiDungKhangCaoTextarea);
            CKEDITOR.replace(idLyDoTextarea);
            CKEDITOR.replace(idGhiChuTextara);
        } else {
            CKEDITOR.replace(idNoiDungKhangCaoTextarea);
            CKEDITOR.replace(idTaiLieuChungTuTextarea);
        }
    }

    function initValidationTheoNhomAn() {
        if (nhomAn == 'AD') {
            initValidationADBPXLHC();
        } else {
            initValidation();
        }
    }

    function initValidation() {
        $khangCaoForm.validate({
            ignore: '',
            rules: {
                "nguoi-khang-cao-dropdownlist": {
                    required: true
                },
                "ngay-lam-don-khang-cao-dtp": {
                    required: true,
                    khangCaoNotGreaterThan: "#ngay-nop-don-khang-cao-input"
                },
                "ngay-nop-don-khang-cao-dtp": {
                    required: true,
                    khangCaoGreaterThan: "#ngay-lam-don-khang-cao-input"
                },
                "hinh-thuc-dropdownlist": {
                    required: true
                },
                "tinh-trang-dropdownlist": {
                    required: true
                },
                "noi-dung-khang-cao-textarea": {
                    required: true
                }
            },
            messages:
            {
                "nguoi-khang-cao-dropdownlist": {
                    required: ValidationMessages.VALIDATION_NGUOIKHANGCAO_KHONGTRONG
                },
                "ngay-lam-don-khang-cao-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYLAMDON_KHONGTRONG
                },
                "ngay-nop-don-khang-cao-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYNOPDON_KHONGTRONG
                },
                "hinh-thuc-dropdownlist": {
                    required: ValidationMessages.VALIDATION_HINHTHUCNOP_KHONGTRONG
                },
                "tinh-trang-dropdownlist": {
                    required: ValidationMessages.VALIDATION_TINHTRANGKHANGCAO_KHONGTRONG
                },
                "noi-dung-khang-cao-textarea": {
                    required: ValidationMessages.VALIDATION_NOIDUNGKHANGCAO_KHONGTRONG
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

    function initValidationADBPXLHC() {
        $khangCaoForm.validate({
            ignore: '',
            rules: {
                "nguoi-khieu-nai-dropdownlist": {
                    required: true
                },
                "ngay-lam-don-khang-cao-dtp": {
                    required: true
                },
                "ngay-nop-don-khang-cao-dtp": {
                    required: true
                },
                "hinh-thuc-dropdownlist": {
                    required: true
                },
                "noi-dung-khang-cao-textarea": {
                    required: true
                }
            },
            messages:
                {
                    "nguoi-khieu-nai-dropdownlist": {
                        required: ViewText.LABEL_NGUOIKHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "ngay-lam-don-khang-cao-dtp": {
                        required: ViewText.LABEL_NGAYKHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "ngay-nop-don-khang-cao-dtp": {
                        required: ViewText.LABEL_NGAYNHAN_KHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "hinh-thuc-dropdownlist": {
                        required: ViewText.LABEL_HINHTHUCNOP + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "noi-dung-khang-cao-textarea": {
                        required: ViewText.LABEL_NOIDUNG_KHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
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

    function getFormData() {
        var nguoiKhangCao = $("#nguoi-khang-cao-dropdownlist").val();
        var ngayNopDon = selectedNgayNopDon;
        var ngayLamDon = selectedNgayLamDon;
        var hinhThucNop = $("#hinh-thuc-dropdownlist").val();
        var tinhTrangKhangCao = $("#tinh-trang-dropdownlist").val();
        var noiDungKhangCao = $("#noi-dung-khang-cao-textarea").val();
        var taiLieuChungTuKemTheo = $("#tai-lieu-chung-tu-kem-theo-textarea").val();
        var nguoiKhieuNai = $("#nguoi-khieu-nai-dropdownlist").val();
        var lyDo = $("#ly-do-textarea").val();
        var ghiChu = $("#ghi-chu-textarea").val();
        
        selectedDuongSu = [];
        $(".ngoi-bi-khang-cao-checkbox").each(function () {
            if ($(this).prop("checked")) {
                selectedDuongSu.push($(this).val());
            }
        });

        return {
            hoSoVuAnId: khangCaoModule.getHoSoVuAnId(),
            nguoiKhangCao: nguoiKhangCao,
            ngayNopDon: ngayNopDon,
            ngayLamDon: ngayLamDon,
            hinhThucNop: hinhThucNop,
            tinhTrangKhangCao: tinhTrangKhangCao,
            noiDungKhangCao: noiDungKhangCao,
            taiLieuChungTuKemTheo: taiLieuChungTuKemTheo,
            nguoiKhieuNai: nguoiKhieuNai,
            lyDo: lyDo,
            ghiChu: ghiChu,
            danhSachNguoiBiKhangCao: selectedDuongSu
        }
    }

    //function initEditor() {
    //    tinymce.init({
    //        skin_url: "/Scripts/tinymce/skins/lightgray",
    //        selector: "#noi-dung-khang-cao-textarea",
    //        menubar: false,
    //        toolbar_items_size: "small",
    //        toolbar1: "bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | removeformat | undo redo",
    //        setup: function (ed) {
    //            ed.on("change",
    //                function () {
    //                    tinymce.triggerSave();
    //                    $("#" + ed.id).valid();
    //                });
    //        }
    //    });
    //}

    return {
        init: init
    }
})(KhangCaoModule);

var SuaKhangCaoModalModule = (function (khangCaoModule) {
    var $ngayNopDonDtp;
    var $ngayLamDonDtp;
    var $khangCaoForm;
    var $modalId;

    var selectedNgayNopDon;
    var selectedNgayLamDon;
    var selectedDuongSu = [];
    var nhomAn;

    var idNoiDungKhangCaoTextarea = 'noi-dung-khang-cao-textarea';
    var idTaiLieuChungTuTextarea = 'tai-lieu-chung-tu-kem-theo-textarea';
    var idLyDoTextarea = 'ly-do-textarea';
    var idGhiChuTextara = 'ghi-chu-textarea';

    function init() {
        $khangCaoForm = $("#sua-khang-cao-form")       
        nhomAn = $("#nhomAn").val();
        initDateTimePicker();
        //initEditor();
        initModalId();
        initEditorTheoNhomAn();
        initValidationTheoNhomAn();
        initValidation();
        bindFormActions();
    }

    function initModalId() {
        if (nhomAn == "HS") {
            $modalId = $('#modalLarge');
        } else {
            $modalId = $('#modal');
        }
    }

    function initDateTimePicker() {
        var ngayNopDon = $("#ngay-nop-don-hidden").val().split("/");
        var ngayLamDon = $("#ngay-lam-don-hidden").val().split("/");

        selectedNgayNopDon = moment(new Date(ngayNopDon[2], ngayNopDon[1] - 1, ngayNopDon[0])).format();
        selectedNgayLamDon = moment(new Date(ngayLamDon[2], ngayLamDon[1] - 1, ngayLamDon[0])).format();

        $ngayNopDonDtp = $("#ngay-nop-don-khang-cao-dtp");
        $ngayLamDonDtp = $("#ngay-lam-don-khang-cao-dtp");

        $ngayNopDonDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: selectedNgayNopDon
        });

        $ngayNopDonDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgayNopDon = e.date.format();
                }
            });

        $ngayLamDonDtp.datetimepicker({
            format: "DD/MM/YYYY",
            defaultDate: selectedNgayLamDon
        });

        $ngayLamDonDtp.on("dp.change",
            function (e) {
                if (e.date) {
                    selectedNgayLamDon = e.date.format();
                }
            });
    }

    function bindFormActions() {
        $("#sua-khang-cao-btn").on("click",
            function () {
                //tinymce.triggerSave();
                saveTriggerEditor();

                if ($khangCaoForm.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $khangCaoForm.prop("method"),
                        url: $khangCaoForm.prop("action"),
                        data: getFormData(),
                        success: function (response) {
                            if (nhomAn == "AD") {
                                if (!response.IsSuccess) {
                                    $.notify({ message: "Sửa khiếu nại / kiến nghị không thành công." },
                                        { type: "danger" });
                                } else {
                                    $.notify({ message: "Sửa khiếu nại / kiến nghị thành công." },
                                        { type: "success" });
                                    khangCaoModule.reloadKhangCaoTable();
                                }
                            } else {
                                if (!response.IsSuccess) {
                                    $.notify({ message: NotifyMessage.MESSAGE_SUAKHANGCAO_KHONGTHANHCONG }, { type: "danger" });
                                } else {
                                    $.notify({ message: NotifyMessage.MESSAGE_SUAKHANGCAO_THANHCONG }, { type: "success" });
                                    khangCaoModule.reloadKhangCaoTable();
                                }
                            }                           
                        },
                        complete: function () {
                            $modalId.modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
            });
    }

    function saveTriggerEditor() {
        if (nhomAn == 'AD') {
            $().CKEditorSetValForTextarea(idNoiDungKhangCaoTextarea);
            $().CKEditorSetValForTextarea(idLyDoTextarea);
            $().CKEditorSetValForTextarea(idGhiChuTextara);
        } else {
            $().CKEditorSetValForTextarea(idNoiDungKhangCaoTextarea);
            $().CKEditorSetValForTextarea(idTaiLieuChungTuTextarea);
        }
    }

    function initEditorTheoNhomAn() {
        if (nhomAn == 'AD') {
            CKEDITOR.replace(idNoiDungKhangCaoTextarea);
            CKEDITOR.replace(idLyDoTextarea);
            CKEDITOR.replace(idGhiChuTextara);
        } else {
            CKEDITOR.replace(idNoiDungKhangCaoTextarea);
            CKEDITOR.replace(idTaiLieuChungTuTextarea);
        }
    }

    function initValidationTheoNhomAn() {
        if (nhomAn == 'AD') {
            initValidationADBPXLHC();
        } else {
            initValidation();
        }
    }

    function initValidation() {
        $khangCaoForm.validate({
            ignore: '',
            rules: {
                "nguoi-khang-cao-dropdownlist": {
                    required: true
                },
                "ngay-lam-don-khang-cao-dtp": {
                    required: true,
                    khangCaoNotGreaterThan: "#ngay-nop-don-khang-cao-input"
                },
                "ngay-nop-don-khang-cao-dtp": {
                    required: true,
                    khangCaoGreaterThan: "#ngay-lam-don-khang-cao-input"
                },
                "hinh-thuc-dropdownlist": {
                    required: true
                },
                "tinh-trang-dropdownlist": {
                    required: true
                },
                "noi-dung-khang-cao-textarea": {
                    required: true
                }
            },
            messages:
            {
                "nguoi-khang-cao-dropdownlist": {
                    required: ValidationMessages.VALIDATION_NGUOIKHANGCAO_KHONGTRONG
                },
                "ngay-lam-don-khang-cao-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYLAMDON_KHONGTRONG
                },
                "ngay-nop-don-khang-cao-dtp": {
                    required: ValidationMessages.VALIDATION_NGAYNOPDON_KHONGTRONG
                },
                "hinh-thuc-dropdownlist": {
                    required: ValidationMessages.VALIDATION_HINHTHUCNOP_KHONGTRONG
                },
                "tinh-trang-dropdownlist": {
                    required: ValidationMessages.VALIDATION_TINHTRANGKHANGCAO_KHONGTRONG
                },
                "noi-dung-khang-cao-textarea": {
                    required: ValidationMessages.VALIDATION_NOIDUNGKHANGCAO_KHONGTRONG
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

    function initValidationADBPXLHC() {
        $khangCaoForm.validate({
            ignore: '',
            rules: {
                "nguoi-khieu-nai-dropdownlist": {
                    required: true
                },
                "ngay-lam-don-khang-cao-dtp": {
                    required: true
                },
                "ngay-nop-don-khang-cao-dtp": {
                    required: true
                },
                "hinh-thuc-dropdownlist": {
                    required: true
                },
                "noi-dung-khang-cao-textarea": {
                    required: true
                }
            },
            messages:
                {
                    "nguoi-khieu-nai-dropdownlist": {
                        required: ViewText.LABEL_NGUOIKHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "ngay-lam-don-khang-cao-dtp": {
                        required: ViewText.LABEL_NGAYKHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "ngay-nop-don-khang-cao-dtp": {
                        required: ViewText.LABEL_NGAYNHAN_KHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "hinh-thuc-dropdownlist": {
                        required: ViewText.LABEL_HINHTHUCNOP + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    },
                    "noi-dung-khang-cao-textarea": {
                        required: ViewText.LABEL_NOIDUNG_KHIEUNAI_KIENNGHI + " " + ValidationMessages.VALIDATION_KHONGDETRONG
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

    function getFormData() {
        var khangCaoId = $("#khang-cao-id-hidden").val();
        var nguoiKhangCao = $("#nguoi-khang-cao-dropdownlist").val();
        var ngayNopDon = selectedNgayNopDon;
        var ngayLamDon = selectedNgayLamDon;
        var hinhThucNop = $("#hinh-thuc-dropdownlist").val();
        var tinhTrangKhangCao = $("#tinh-trang-dropdownlist").val();
        var noiDungKhangCao = $("#noi-dung-khang-cao-textarea").val();
        var taiLieuChungTuKemTheo = $("#tai-lieu-chung-tu-kem-theo-textarea").val();
        var nguoiKhieuNai = $("#nguoi-khieu-nai-dropdownlist").val();
        var lyDo = $("#ly-do-textarea").val();
        var ghiChu = $("#ghi-chu-textarea").val();

        selectedDuongSu = [];
        $(".ngoi-bi-khang-cao-checkbox").each(function () {
            if ($(this).prop("checked")) {
                selectedDuongSu.push($(this).val());
            }
        });

        return {
            khangCaoId: khangCaoId,
            nguoiKhangCao: nguoiKhangCao,
            ngayNopDon: ngayNopDon,
            ngayLamDon: ngayLamDon,
            hinhThucNop: hinhThucNop,
            tinhTrangKhangCao: tinhTrangKhangCao,
            noiDungKhangCao: noiDungKhangCao,
            taiLieuChungTuKemTheo: taiLieuChungTuKemTheo,
            nguoiKhieuNai: nguoiKhieuNai,
            lyDo: lyDo,
            ghiChu: ghiChu,
            danhSachNguoiBiKhangCao: selectedDuongSu
        }
    }

    //function initEditor() {
    //    tinymce.init({
    //        skin_url: "/Scripts/tinymce/skins/lightgray",
    //        selector: "#noi-dung-khang-cao-textarea",
    //        menubar: false,
    //        toolbar_items_size: "small",
    //        toolbar1: "bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | removeformat | undo redo",
    //        setup: function (ed) {
    //            ed.on("change",
    //                function () {
    //                    tinymce.triggerSave();
    //                    $("#" + ed.id).valid();
    //                });
    //        }
    //    });
    //}

    return {
        init: init
    }
})(KhangCaoModule);

var XoaKhangCaoModalModule = (function (khangCaoModule) {
    var $khangCaoForm;
    var $modalId;

    function init() {
        $khangCaoForm = $("#xoa-khang-cao-form");
        initModalId();
        bindFormActions();
    }

    function initModalId() {
        if ($("#nhomAn").val() == "HS") {
            $modalId = $('#modalLarge');
        } else {
            $modalId = $('#modal');
        }
    }

    function bindFormActions() {
        $("#xoa-khang-cao-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $khangCaoForm.prop("method"),
                    url: $khangCaoForm.prop("action"),
                    data: getFormData(),
                    success: function (response) {
                        
                        if (nhomAn == "AD") {
                            if (!response.IsSuccess) {
                                $.notify({ message: "Xóa khiếu nại / kiến nghị không thành công." },
                                    { type: "danger" });
                            } else {
                                $.notify({ message: "Xóa khiếu nại / kiến nghị thành công." },
                                    { type: "success" });
                                khangCaoModule.reloadKhangCaoTable();
                            }
                        } else {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_XOAKHANGCAO_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_XOAKHANGCAO_THANHCONG }, { type: "success" });
                                khangCaoModule.reloadKhangCaoTable();
                            }
                        }
                    },
                    complete: function () {
                        $modalId.modal("hide");
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function getFormData() {
        var khangCaoId = $("#khang-cao-id-hidden").val();

        return {
            khangCaoId: khangCaoId
        }
    }

    return {
        init: init
    }
})(KhangCaoModule);