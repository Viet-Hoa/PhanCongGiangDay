$(function () {
    if ($("#nhomAn").val() == "AD" && $("#giaiDoan").val() == 2) {
        KetQuaXetXuQuyetDinhADBPXLHC.init();
    } else {
        KetQuaXetXuQuyetDinh.init();
    }      
});

var KetQuaXetXuQuyetDinh = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#modelKetQuaXetXuQuyetDinh",
        formEdit = "#formEditKetQuaXetXuQuyetDinh",
        contentTab = "#contentKetQuaXetXuQuyetDinh",
        selectNgayTao = "#selectNgayTaoQuyetDinh";


    var getUrl = "/KetQuaXetXu/GetKetQuaXetXuQuyetDinhTheoHoSoVuAnID",
        getTheoIDUrl = "/KetQuaXetXu/GetKetQuaXetXuQuyetDinhTheoQuyetDinhID",
        editUrl = "/KetQuaXetXu/EditKetQuaXetXuQuyetDinh";

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
                actionCheck: "EditKetQuaXetXuQuyetDinh"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemQuyetDinhKQXX").addClass("add-disabled");
                    $("#btnSuaQuyetDinhKQXX").addClass("edit-disabled");
                }
            }
        });
    }

    function openFormEdit() {
        showLoadingOverlay(modalId + "  .modal-content");
        $.ajax({
            type: "GET",
            url: editUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(modalId + "  .modal-content").html(response);

                hideLoadingOverlay(modalId + "  .modal-content");
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

                        $.notify({ message: "Cập nhật quyết định thành công" }, { type: "success" });
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

var EditKetQuaXetXuQuyetDinh = (function () {
    var $quanHePhapLuat;
    var $LoaiQuyetDinh;

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
        
        $(".datepicker").datetimepicker({
            format: 'DD/MM/YYYY'
        });

        $('#formEditKetQuaXetXuQuyetDinh #file_upload').change(function (e) {
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
                                $('#formEditKetQuaXetXuQuyetDinh #DinhKemFile').val(result.fileName);
                                $('#formEditKetQuaXetXuQuyetDinh #file_upload').parent().next('.error').remove();
                            }
                            else if (result.status == 'fail') {
                                if ($('#formEditKetQuaXetXuQuyetDinh #file_upload').parent().next('.error').length == 0) {
                                    $('#formEditKetQuaXetXuQuyetDinh #file_upload').parent().after('<div class="col-12 error has-error">' + result.msg + '</div>');
                                }
                            }
                        }
                    });
                } else {
                    alert("This browser doesn't support HTML5 file uploads!");
                }
            }
        });

        //var settings = $.extend({
        //    selector: ".tinymce-editor",
        //    height: 170,
        //}, $.tinymceDefaults);

        //tinymce.remove();
        //tinymce.init(settings);

        CKEDITOR.replaceAll('ckeditorClassQuyetDinh');
        initLoaiQuyetDinhqh();
        $quanHePhapLuat = $("#QuanHePhapLuatDDL");
        $LoaiQuyetDinh = $(".LoaiQuyetDinhDDL");
        onLoaiQuanHeChange();
        initQuanHePhapLuat();
        onQuanHePhapLuatChange();
        LoaiQuyetDinhChange();
        initLoaiQuyetDinh();
        onLoaiQuyetDinhChange();
        
    }

    function LoaiQuyetDinhChange() {
        $LoaiQuyetDinh.change(function () {
            if ($(this).val().search("Thẩm phán") != -1) {
                $('#tham-phan-1').hide();
                $('#tham-phan-2').hide();
                $('#hoi-tham-nhan-dan-1-form-group').hide();
                $('#hoi-tham-nhan-dan-2-form-group').hide();
                $('#hoi-tham-nhan-dan-3-form-group').hide();
            }
            else {
                $('#tham-phan-1').show();
                $('#tham-phan-2').show();
                $('#hoi-tham-nhan-dan-1-form-group').show();
                $('#hoi-tham-nhan-dan-2-form-group').show();
                $('#hoi-tham-nhan-dan-3-form-group').show();
            }
        });
    }

    function initLoaiQuyetDinhqh() {


        if ($("#LoaiQuanHe").val() === "Tranh chấp") {
                
            $('#LoaiQuyetDinhDDLvuan').prop('disabled', false);
            $('#LoaiQuyetDinhDDLvuan').show();
            $('#LoaiQuyetDinhDDLvuviec').prop('disabled', true);
            $('#LoaiQuyetDinhDDLvuviec').hide();
            }
            else {
                
            $('#LoaiQuyetDinhDDLvuan').prop('disabled', true);
            $('#LoaiQuyetDinhDDLvuan').hide();
            $('#LoaiQuyetDinhDDLvuviec').prop('disabled', false);
            $('#LoaiQuyetDinhDDLvuviec').show();
            }
        
    }

    function onLoaiQuanHeChange() {
        $("#LoaiQuanHe").on("change", function () {
            if (this.value === "Tranh chấp") {
                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-tranh-chap li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });
                $('#LoaiQuyetDinhDDLvuan').prop('disabled', false);
                $('#LoaiQuyetDinhDDLvuan').show();
                $('#LoaiQuyetDinhDDLvuviec').prop('disabled', true);
                $('#LoaiQuyetDinhDDLvuviec').hide();
            }
            else {
                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-yeu-cau li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });
                $('#LoaiQuyetDinhDDLvuan').prop('disabled', true);
                $('#LoaiQuyetDinhDDLvuan').hide();
                $('#LoaiQuyetDinhDDLvuviec').prop('disabled', false);
                $('#LoaiQuyetDinhDDLvuviec').show();
            }
        });
    }

    function initQuanHePhapLuat() {
        var isKhac = true;
        var $quanHePhapLuatHidden = $("#QuanHePhapLuatHidden");
        var $quanHePhapLuatTextbox = $("#QuanHePhapLuatTextbox");
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");

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
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");
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

    function initLoaiQuyetDinh() {
        var isKhac = true;
        var $LoaiQuyetDinhHidden = $("#LoaiQuyetDinhHidden");
        var $LoaiQuyetDinhTextbox = $("#LoaiQuyetDinhTextbox");
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");

        $(".LoaiQuyetDinhDDL option").each(function () {
            if ($(this).val() == $LoaiQuyetDinhHidden.val() & $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $LoaiQuyetDinhHidden.parent().find('.option-hidden').show();
            $LoaiQuyetDinhTextbox.attr("disabled", false).val($LoaiQuyetDinhHidden.val());
            $LoaiQuyetDinh.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $LoaiQuyetDinhHidden.parent().find('.option-hidden').hide();
            $LoaiQuyetDinhTextbox.attr("disabled", true).val("");
            $LoaiQuyetDinh.attr("name", "LoaiQuyetDinh");
        }
    }

    function onLoaiQuyetDinhChange() {
        $LoaiQuyetDinh.on("change",
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#LoaiQuyetDinhTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#LoaiQuyetDinhTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "LoaiQuyetDinh").removeClass("mb-3");
                }
            });
    }

    return {
        init: init
    }
})();


var KetQuaXetXuQuyetDinhADBPXLHC = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#modelKetQuaXetXuQuyetDinhADBPXLHC",
        formEdit = "#formEditKetQuaXetXuQuyetDinhADBPXLHC",
        contentTab = "#contentKetQuaXetXuQuyetDinh",
        selectNgayTao = "#selectNgayTaoQuyetDinhADBPXLHC";


    var getUrl = "/KetQuaXetXu/GetKetQuaXetXuQuyetDinhADBPXLHCTheoHoSoVuAnID",
        getTheoIDUrl = "/KetQuaXetXu/GetKetQuaXetXuQuyetDinhADBPXLHCTheoQuyetDinhID",
        editUrl = "/KetQuaXetXu/EditKetQuaXetXuQuyetDinhADBPXLHC";

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
                actionCheck: "EditKetQuaXetXuQuyetDinh"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemQuyetDinhKQXX").addClass("add-disabled");
                    $("#btnSuaQuyetDinhKQXX").addClass("edit-disabled");
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

                    hideLoadingOverlay(contentTab);
                }
            });
        });
    }

    function updateForm() {
        $(document).on("submit", formEdit, function () {

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

                        $.notify({ message: "Cập nhật quyết định thành công" }, { type: "success" });
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