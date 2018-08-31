$(function () {
    TraHoSoDieuTraBoSung.init();
});

var TraHoSoDieuTraBoSung = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val(),
        quyetDinhGroup = 2; // 2: trả hồ sơ điều tra bổ sung

    var modalId = "#modalTraHoSoDieuTraBoSung",
        formEdit = "#formEditTraHoSoDieuTraBoSung",
        contentTab = "#contentTraHoSoDieuTraBoSung",
        selectNgayTao = "#selectNgayTaoTraHoSoDieuTraBoSung";


    var getUrl = "/ChuanBiXetXu/GetChuanBiXetXuQuyetDinhHinhSuTheoHoSoVuAnID",
        getTheoIDUrl = "/ChuanBiXetXu/GetChuanBiXetXuQuyetDinhHinhSuTheoQuyetDinhID",
        editUrl = "/ChuanBiXetXu/EditChuanBiXetXuQuyetDinhHinhSu";

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
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ChuanBiXetXu",
                actionCheck: "EditChuanBiXetXuQuyetDinhHinhSu"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemQuyetDinhHinhSu").addClass("add-disabled");
                    $("#btnSuaQuyetDinhHinhSu").addClass("edit-disabled");
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
                id: hoSoVuAnId,
                quyetDinhGroup: quyetDinhGroup
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
                id: hoSoVuAnId,
                quyetDinhGroup: quyetDinhGroup
            },
            success: function (response) {
                $(contentTab).html(response);
                initRoleNhanVien();

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
                    id: $(this).val(),
                    quyetDinhGroup: quyetDinhGroup
                },
                success: function (response) {
                    $(contentTab).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentTab);
                }
            });
        });
    }

    function updateForm() {
        $(document).on("submit", formEdit, function () {
            if ($('#file_upload').closest('.form-group').find('.has-error').length > 0) {
                return false;
            }

            $().CKEditorSetValForTextarea('ghi-chu-tra-ho-so-dieu-tra-textarea');
            $().CKEditorSetValForTextarea('ket-qua-tra-ho-so-dieu-tra-textarea');
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
                        $(modalId).modal('hide');

                        $.notify({ message: "Cập nhật thông tin trả hồ sơ điều tra bổ sung thành công" }, { type: "success" });
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

    return {
        init: init
    }
})();

var EditTraHoSoDieuTraBoSung = (function () {

    function init() {
        $('#SoQuyetDinh').keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
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

        CKEDITOR.replaceAll('textareatrahoso');

        $(".datepicker").datetimepicker({
            format: 'DD/MM/YYYY'
        });

        $('#formEditTraHoSoDieuTraBoSung #file_upload').change(function (e) {
            $(this).closest('.form-group').find('.error').remove();

            var files = e.target.files;
            if (files.length > 0) {
                var fileSize = this.files[0].size / 1024 / 1024;
                var fileName = this.files[0].name;
                var dotPosition = fileName.lastIndexOf(".");
                var fileExt = fileName.substring(dotPosition).toLowerCase();

                if (fileExt != ".pdf" && fileExt != ".doc" && fileExt != ".docx") {
                    $(this).parent().after('<div class="error has-error">Chỉ hỗ trợ file *.PDF, *.DOC, *.DOCX</div>');

                    return false;
                }
                else if (fileSize > 5) {
                    $(this).parent().after('<div class="error has-error">Dung lượng tối đa 5MB</div>');

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
                                $('#formEditTraHoSoDieuTraBoSung #DinhKemFile').val(result.fileName);
                                $('#formEditTraHoSoDieuTraBoSung #file_upload').parent().next('.error').remove();
                            }
                            else if (result.status == 'fail') {
                                if ($('#formEditTraHoSoDieuTraBoSung #file_upload').parent().next('.error').length == 0) {
                                    $('#formEditTraHoSoDieuTraBoSung #file_upload').parent().after('<div class="error has-error">' + result.msg + '</div>');
                                }
                            }
                        }
                    });
                } else {
                    alert("This browser doesn't support HTML5 file uploads!");
                }
            }
        });       

    }

    return {
        init: init
    }
})();
