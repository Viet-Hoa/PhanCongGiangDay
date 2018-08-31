$(function () {
    KetQuaXetXuBanAn.init();
});

var KetQuaXetXuBanAn = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#modelKetQuaXetXuBanAn",
        formEdit = "#formEditKetQuaXetXuBanAn",
        contentTab = "#contentKetQuaXetXuBanAn",
        selectNgayTao = "#selectNgayTaoBanAn";

    var getUrl = "/KetQuaXetXu/GetKetQuaXetXuBanAnTheoHoSoVuAnID",
        getTheoIDUrl = "/KetQuaXetXu/GetKetQuaXetXuBanAnTheoBanAnID",
        editUrl = "/KetQuaXetXu/EditKetQuaXetXuBanAn",
        danhSachKetQuaXetXuUrl = "/KetQuaXetXu/DanhSachKetQuaXetXu";

    var $KetQuaXetXuToiDanhTable;

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {
            openFormEdit();
        });
        
        loadThongTin();
        loadThongTinTheoId();
        updateForm();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "KetQuaXetXu",
                actionCheck: "EditKetQuaXetXuBanAn"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemBanAn").addClass("add-disabled");
                    $("#btnSuaBanAn").addClass("edit-disabled");
                    $("#btnTaoKetQuaXetXuToiDanh").addClass("add-disabled");
                    $(".btn-grid").addClass("edit-disabled");
                }
            }
        });
    }

    function openFormEdit() {
        showLoadingOverlay(modalId + " .modal-content");
        $.ajax({
            type: "GET",
            url: editUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(modalId + " .modal-content").html(response);

                hideLoadingOverlay(modalId + " .modal-content");
            }
        });
    }

    function loadThongTin() {
        showLoadingOverlay(contentTab);
        $.ajax({
            type: "GET",
            url: getUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(contentTab).html(response);
                initRoleNhanVien();
                initKetQuaXetXuToiDanhTable(HoSoVuAnID);
                hideLoadingOverlay(contentTab);
            }
        });
    }

    function loadThongTinTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentTab);
            $.ajax({
                type: "GET",
                url: getTheoIDUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentTab).html(response);
                    initRoleNhanVien();
                    initKetQuaXetXuToiDanhTable(HoSoVuAnID);
                    hideLoadingOverlay(contentTab);
                }
            });
        });
    }

    function initKetQuaXetXuToiDanhTable(hoSoVuAnId) {
        $KetQuaXetXuToiDanhTable = $("#ket-qua-xet-xu-table").DataTable({
            searching: false,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: danhSachKetQuaXetXuUrl,
                data: { hoSoVuAnId: hoSoVuAnId },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#ket-qua-xet-xu-container");
                },
                complete: function () {
                    $("#btnTaoKetQuaXetXuToiDanh").attr('data-url', '/KetQuaXetXu/TaoToiDanh?hoSoVuAnId=' + hoSoVuAnId);
                    hideLoadingOverlay("#ket-qua-xet-xu-container");
                    initRoleNhanVien();
                }
            },
            columns: [
                { data: "STT" },
                { data: "TenBiCao", className: "custom-wrap" },
                { data: "KetQuaXetXu", className: "custom-wrap" },
                { data: "DieuLuatApDung", className: "custom-wrap" },
                { data: "HinhPhat", className: "custom-wrap"},
                { data: "BienPhapTuPhap", className: "custom-wrap" },
                {
                    data: "ToiDanhID", orderable: false, width: 90, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/KetQuaXetXu/ChiTietToiDanh?toiDanhId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/KetQuaXetXu/SuaToiDanh?toiDanhId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/KetQuaXetXu/GetXoaToiDanh?toiDanhId=' + data + '"><i class="fa fa-trash-o"></button>';
                    }
                }
            ]
        });
    }

    function updateForm() {
        $(document).on("submit", formEdit, function () {
            if ($('#file_upload').closest('.form-group').find('.has-error').length > 0) {
                return false;
            }

            var _this = this;
            showLoadingOverlay(modalId + " .modal-content");

            $.ajax({
                type: "POST",
                url: editUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEdit).length === 0) {
                        $(contentTab).html(response);
                        initKetQuaXetXuToiDanhTable(HoSoVuAnID);
                        $(modalId).modal('hide');

                        $.notify({ message: "Cập nhật bản án thành công" }, { type: "success" });
                    }
                    else {
                        $(modalId + " .modal-content").html(response);
                    }

                    hideLoadingOverlay(modalId + " .modal-content");

                }
            });

            return false;
        });
    }

    function reloadKetQuaXetXuToiDanhTable() {
        $KetQuaXetXuToiDanhTable.ajax.reload();
    }

    return {
        init: init,
        reloadKetQuaXetXuToiDanhTable: reloadKetQuaXetXuToiDanhTable
    }
})();

var EditKetQuaXetXuBanAn = (function () {
    function init() {
        $('#SoBanAn').keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });//.keyup(function (e) {
        //    if ($(this).val() > 2147483647) {
        //        $(this).val(2147483647);
        //    }
        //});

        $(".datepicker").datetimepicker({
            format: 'DD/MM/YYYY'
        });

        $('#formEditKetQuaXetXuBanAn #file_upload').change(function (e) {
            $(this).closest('.form-group').find('.error').remove();

            var files = e.target.files;
            if (files.length > 0) {
                var fileSize = this.files[0].size / 1024 / 1024;
                var fileName = this.files[0].name;
                var dotPosition = fileName.lastIndexOf(".");
                var fileExt = fileName.substring(dotPosition).toLowerCase();

                if (fileExt != ".pdf" && fileExt != ".doc" && fileExt != ".docx") {
                    $(this).parent().after('<div class="col-12 error has-error">Chỉ hỗ trợ file *.PDF, *.DOC, *.DOCX</div>');

                    return false;
                }
                else if (fileSize > 5) {
                    $(this).parent().after('<div class="col-12 error has-error">Dung lượng tối đa 5MB</div>');

                    return false;
                }

                if (window.FormData !== undefined) {
                    var data = new FormData();
                    data.append("file" + 0, files[0]);

                    $.ajax({
                        type: "POST",
                        dateType: "json",
                        url: '/KetQuaXetXu/UploadFiles',
                        contentType: false,
                        processData: false,
                        data: data,
                        beforeSend: function () {

                        },
                        success: function (result) {
                            if (result.status == 'success') {
                                $('#formEditKetQuaXetXuBanAn #DinhKemFile').val(result.fileName);
                                $('#formEditKetQuaXetXuBanAn #file_upload').parent().next('.error').remove();
                            }
                            else if (result.status == 'fail') {
                                if ($('#formEditKetQuaXetXuBanAn #file_upload').parent().next('.error').length == 0) {
                                    $('#formEditKetQuaXetXuBanAn #file_upload').parent().after('<span class="col-12 error has-error">' + result.msg + '</span>');
                                }
                            }
                        }
                    });
                } else {
                    alert("This browser doesn't support HTML5 file uploads!");
                }
            }
        });

        
        //$(document).on("change", '#ThamPhan', function () {
        //    var maNV = $(this).val();
        //    $.ajax({
        //        type: "GET",
        //        dataType: 'json',
        //        url: '/ChuanBiXetXu/GetThuKyTheoThamPhan',
        //        data: {
        //            manv: maNV
        //        },
        //        success: function (response) {
        //            $('#ThuKy').html('');
        //            for (var i = 0; i < response.length; i++) {
        //                $('#ThuKy').append('<option value="' + response[i].MaNV + '">' + response[i].HoVaTenNV + ' (' + response[i].MaNV + ')' + '</option>');
        //            }

        //            $('#ThuKy').removeAttr('disabled');
        //            $('#ThuKy').next('input[name=ThuKy]').val('');
        //        }
        //    });
        //});
        

        //var settings = $.extend({
        //    selector: ".tinymce-editor",
        //    height: 143,
        //}, $.tinymceDefaults);

        //tinymce.remove();
        //tinymce.init(settings);

        CKEDITOR.replaceAll('ckeditorClassBanAn');

        initQuanHePhapLuat();
        onQuanHePhapLuatChange();
    }

    function initQuanHePhapLuat() {
        var isKhac = true;
        var $quanHePhapLuatHidden = $("#QuanHePhapLuatHidden");
        var $quanHePhapLuatTextbox = $("#QuanHePhapLuatTextbox");
        var $quanHePhapLuat = $("#QuanHePhapLuatDDL");

        $("#QuanHePhapLuatDDL option").each(function () {
            if ($(this).val() == $quanHePhapLuatHidden.val() & $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $quanHePhapLuatHidden.parent().find('.option-hidden').show();
            $quanHePhapLuatTextbox.attr("disabled", false).val($quanHePhapLuatHidden.val());
            $quanHePhapLuat.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $quanHePhapLuatHidden.parent().find('.option-hidden').hide();
            $quanHePhapLuatTextbox.attr("disabled", true).val("");
            $quanHePhapLuat.attr("name", "QuanHePhapLuat");
        }
    }

    function onQuanHePhapLuatChange() {
        var $quanHePhapLuat = $("#QuanHePhapLuatDDL");
        $quanHePhapLuat.on("change",
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#QuanHePhapLuatTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#QuanHePhapLuatTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "QuanHePhapLuat").removeClass("mb-3");
                }
            });
    }

    return {
        init: init
    }
})();

var TaoSuaToiDanhModule = (function (ketQuaXetXuBanAn) {
    var $formTaoToiDanh,
        $formSuaToiDanh;
    var $ddlKetQuaXetXu;
    var $typeKetQuaXetXu;

    function initCreating() {
        $formTaoToiDanh = $("#formTaoToiDanh");
        $ddlKetQuaXetXu = $("#ddlKetQuaXetXu");
        initFormToiDanh();
        onDieuChange();
        onDropdownlistChange();
        initCKEditor();
        bindCreateFormActions();
    }

    function initUpdating() {
        $formSuaToiDanh = $("#formSuaToiDanh");
        $ddlKetQuaXetXu = $("#ddlKetQuaXetXu");
        $typeKetQuaXetXu = $("#KetQuaXetXuHidden").val();
        initFormToiDanh();
        onDieuChange();
        onDropdownlistChange();
        initCKEditor();
        bindUpdateFormActions();
    }

    function onDieuChange() {
        $('#dieu-ddl').change(function () {
            $("#ToiDanhHidden > option").each(function () {
                if ($(this).val() == $('#dieu-ddl').val()) {
                    $('#toidanhtb').val($(this).text());
                }
            });
        });
    }

    function initFormToiDanh() {
        if ($typeKetQuaXetXu === "Chịu trách nhiệm hình sự và hình phạt") {
            showControlByClass(".HinhPhatContent");
            $(".BienPhapTuPhapContent").show();
            $("#ModalToiDanhBienPhapTuPhap").show();
            $(".BienPhapGiamSatContent").hide();
            $("#ModalToiDanhBienPhapGiamSat").hide();
        }
        else if ($typeKetQuaXetXu === "Miễn trách nhiệm hình sự") {
            $(".BienPhapGiamSatContent").show();
            $("#ModalToiDanhBienPhapGiamSat").show();
            hideControlByClass(".HinhPhatContent");
            $(".BienPhapTuPhapContent").hide();
            $("#ModalToiDanhBienPhapTuPhap").hide();
        }
        else {
            hideControlByClass(".HinhPhatContent");
            $(".BienPhapTuPhapContent").hide();
            $("#ModalToiDanhBienPhapTuPhap").hide();
            $(".BienPhapGiamSatContent").hide();
            $("#ModalToiDanhBienPhapGiamSat").hide();
        }
    }
    
    function onDropdownlistChange() {
        $ddlKetQuaXetXu.on("change", function () {
            $typeKetQuaXetXu = $ddlKetQuaXetXu.val();
            initFormToiDanh();
        });
    }

    function initCKEditor() {
        CKEDITOR.replaceAll('ckeditorClassToiDanh');
    }

    function saveContentToTextArea() {
        $().CKEditorSetValForTextarea("TrachNhiemDanSu");
        $().CKEditorSetValForTextarea("XuLy");
        $().CKEditorSetValForTextarea("GhiChu");
        $().CKEditorSetValForTextarea("BienPhapTuPhap");
        $().CKEditorSetValForTextarea("BienPhapKhienTrach");
    }

    function bindCreateFormActions() {
        $("#tao-toi-danh-btn").on("click",
            function () {
                if ($formTaoToiDanh.valid()) {
                    showLoadingOverlay();
                    saveContentToTextArea();
                    $.ajax({
                        type: $formTaoToiDanh.prop("method"),
                        url: $formTaoToiDanh.prop("action"),
                        data: $($formTaoToiDanh).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $('#modalLarge').modal("hide");
                                ketQuaXetXuBanAn.reloadKetQuaXetXuToiDanhTable();
                                $.notify({ message: "Thêm tội danh thành công" }, { type: "success" });
                            }
                        },
                        complete: function () {
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    function bindUpdateFormActions() {
        $("#sua-toi-danh-btn").on("click",
            function () {
                if ($formSuaToiDanh.valid()) {
                    showLoadingOverlay();
                    saveContentToTextArea();
                    $.ajax({
                        type: $formSuaToiDanh.prop("method"),
                        url: $formSuaToiDanh.prop("action"),
                        data: $($formSuaToiDanh).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $('#modalLarge').modal("hide");
                                ketQuaXetXuBanAn.reloadKetQuaXetXuToiDanhTable();
                                $.notify({ message: "Sửa tội danh thành công" }, { type: "success" });
                            }
                        },
                        complete: function () {
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    return {
        initCreating: initCreating,
        initUpdating: initUpdating
    }
})(KetQuaXetXuBanAn);

var XoaToiDanhModule = (function (ketQuaXetXuBanAn) {
    var $formXoaToiDanh;

    function init() {
        $formXoaToiDanh = $("#formXoaToiDanh");
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-toi-danh-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formXoaToiDanh.prop("method"),
                    url: $formXoaToiDanh.prop("action"),
                    data: getFormData(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: "Xóa thông tin tội danh không thành công" }, { type: "danger" });
                        } else {
                            $.notify({ message: "Xóa thông tin tội danh thành công" }, { type: "success" });
                            ketQuaXetXuBanAn.reloadKetQuaXetXuToiDanhTable();
                        }
                    },
                    complete: function () {
                        $('#modal').modal("hide");
                        hideLoadingOverlay();
                    }
                });
                return false;
            });
    }

    function getFormData() {
        var toiDanhId = $("#toi-danh-id-hidden").val();

        return {
            toiDanhId: toiDanhId
        }
    }

    return {
        init: init
    }
})(KetQuaXetXuBanAn);