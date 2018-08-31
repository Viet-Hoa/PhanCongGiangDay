$(function () {
    DuongSuModule.init();
});

var DuongSuModule = (function () {
    var $duongSuCaNhanTable,
        $duongSuToChucTable;
    var duongSuCaNhanUrl = "/NhanDon/DanhSachDuongSuCaNhan",
        duongSuToChucUrl = "/NhanDon/DanhSachDuongSuToChuc";
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val(),
        nhomAn = $("#nhomAn").val();

    function init() {
        loadDuongSu();
    }

    function loadDuongSu() {
        initDuongSuDataTable(hoSoVuAnId);
        initDuongSuToChucDataTable(hoSoVuAnId);
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "TaoDuongSu"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnTaoDuongSu").addClass("add-disabled");
                    $(".btn-grid").addClass("edit-disabled");
                }
            }
        });
    }

    function initDuongSuDataTable(hoSoVuAnId) {
        if ( nhomAn === "HS") {                  //nhóm án Hình Sự
            $duongSuCaNhanTable = $("#duong-su-ca-nhan-table").DataTable({
                searching: false,
                order: [],
                pageLength: 25,
                lengthChange: false,
                ajax: {
                    url: duongSuCaNhanUrl,
                    data: function () {
                        return {
                            hoSoVuAnId: hoSoVuAnId
                        }
                    },
                    method: "GET",
                    beforeSend: function () {
                        showLoadingOverlay("#duong-su-container");
                    },
                    complete: function () {
                        $("#btnTaoDuongSu").attr('data-url', '/NhanDon/TaoDuongSu?hoSoVuAnId=' + hoSoVuAnId);
                        $("#btnTaoDuongSu").attr('data-target', '#modalLarge');
                        hideLoadingOverlay("#duong-su-container");
                        initRoleNhanVien();
                    }
                },
                columns: [
                    { data: "STT" },
                    { data: "HoVaTen", className: "custom-wrap"},
                    { data: "NoiCuTru", className: "custom-wrap"},
                    { data: "NgayThangNamSinh" },
                    { data: "SoDienThoai" },
                    { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                    {
                        data: "DuongSuID", orderable: false, width: 140, className: "text-center", render: function (data) {
                            return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/ChiTietDuongSu?duongSuId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/SuaDuongSu?duongSuId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/GetXoaDuongSu?duongSuId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        }
                    }
                ]
            });
        }
        else if (nhomAn === "AD") {                  //nhóm án Áp Dụng
            $duongSuCaNhanTable = $("#duong-su-ca-nhan-table").DataTable({
                searching: false,
                order: [],
                pageLength: 25,
                lengthChange: false,
                ajax: {
                    url: duongSuCaNhanUrl,
                    data: function () {
                        return {
                            hoSoVuAnId: hoSoVuAnId
                        }
                    },
                    method: "GET",
                    beforeSend: function () {
                        showLoadingOverlay("#duong-su-container");
                    },
                    complete: function () {
                        $("#btnTaoDuongSu").attr('data-url', '/NhanDon/TaoDuongSu?hoSoVuAnId=' + hoSoVuAnId);
                        $("#btnTaoDuongSu").attr('data-target', '#modalLarge');
                        hideLoadingOverlay("#duong-su-container");
                        initRoleNhanVien();
                    }
                },
                columns: [
                    { data: "STT" },
                    { data: "HoVaTen", className: "custom-wrap" },
                    { data: "SoCMND" },
                    { data: "NgayThangNamSinh" },
                    { data: "QuocTich" },
                    { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                    {
                        data: "DuongSuID", orderable: false, width: 140, className: "text-center", render: function (data) {
                            return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/ChiTietDuongSu?duongSuId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/SuaDuongSu?duongSuId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/GetXoaDuongSu?duongSuId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        }
                    }
                ]
            });
        }
        else {
            $duongSuCaNhanTable = $("#duong-su-ca-nhan-table").DataTable({
                searching: false,
                order: [],
                pageLength: 25,
                lengthChange: false,
                ajax: {
                    url: duongSuCaNhanUrl,
                    data: function () {
                        return {
                            hoSoVuAnId: hoSoVuAnId
                        }
                    },
                    method: "GET",
                    beforeSend: function () {
                        showLoadingOverlay("#duong-su-container");
                    },
                    complete: function () {
                        $("#btnTaoDuongSu").attr('data-url', '/NhanDon/TaoDuongSu?hoSoVuAnId=' + hoSoVuAnId);
                        hideLoadingOverlay("#duong-su-container");
                        initRoleNhanVien();
                    }
                },
                columns: [
                    { data: "STT" },
                    { data: "HoVaTen", className: "custom-wrap"},
                    { data: "SoCMND" },
                    { data: "NgayThangNamSinh" },
                    { data: "QuocTich" },
                    { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                    {
                        data: "DuongSuID", orderable: false, width: 140, className: "text-center", render: function (data) {
                            return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/ChiTietDuongSu?duongSuId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/SuaDuongSu?duongSuId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/GetXoaDuongSu?duongSuId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        }
                    }
                ]
            });
        }
    }

    function initDuongSuToChucDataTable(hoSoVuAnId) {
        if (nhomAn === "HS") {
            $duongSuToChucTable = $("#duong-su-to-chuc-table").DataTable({
                searching: false,
                order: [],
                pageLength: 25,
                lengthChange: false,
                ajax: {
                    url: duongSuToChucUrl,
                    data: function () {
                        return {
                            hoSoVuAnId: hoSoVuAnId
                        }
                    },
                    method: "GET",
                    beforeSend: function () {
                        showLoadingOverlay("#duong-su-container");
                    },
                    complete: function () {
                        hideLoadingOverlay("#duong-su-container");
                    }
                },
                columns: [
                    { data: "STT" },
                    { data: "TenCoQuanToChuc", className: "custom-wrap"},
                    { data: "HoVaTen" },
                    { data: "NoiDKHKTT", className: "custom-wrap" },
                    { data: "SoDienThoai" },
                    { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                    {
                        data: "DuongSuID", orderable: false, width: 140, className: "text-center", render: function (data) {
                            return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/ChiTietDuongSu?duongSuId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/SuaDuongSu?duongSuId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/GetXoaDuongSu?duongSuId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        }
                    }
                ]
            });
        }
        else {
            $duongSuToChucTable = $("#duong-su-to-chuc-table").DataTable({
                searching: false,
                order: [],
                pageLength: 25,
                lengthChange: false,
                ajax: {
                    url: duongSuToChucUrl,
                    data: function () {
                        return {
                            hoSoVuAnId: hoSoVuAnId
                        }
                    },
                    method: "GET",
                    beforeSend: function () {
                        showLoadingOverlay("#duong-su-container");
                    },
                    complete: function () {
                        hideLoadingOverlay("#duong-su-container");
                    }
                },
                columns: [
                    { data: "STT" },
                    { data: "TenCoQuanToChuc", className: "custom-wrap"},
                    { data: "HoVaTen" },
                    { data: "NoiDKHKTT", className: "custom-wrap" },
                    { data: "SoDienThoai" },
                    { data: "TuCachThamGiaToTung", className: "custom-wrap" },
                    {
                        data: "DuongSuID", orderable: false, width: 140, className: "text-center", render: function (data) {
                            return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/NhanDon/ChiTietDuongSuLaToChuc?duongSuId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/SuaDuongSu?duongSuId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/GetXoaDuongSu?duongSuId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        }
                    }
                ]
            });
        }
    }

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    function reloadDuongSuTable() {
        $duongSuCaNhanTable.ajax.reload();
        $duongSuToChucTable.ajax.reload();
    }

    return {
        init: init,
        reloadDuongSuTable: reloadDuongSuTable,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var TaoDuongSuModule = (function (duongSuModule) {
    var $formTaoDuongSu;
    var updateBiDonHoSoVuAn = "#HoSoVuAn_BiDon",
        updateNguyenDonHoSoVuAn = "#HoSoVuAn_NguyenDon";
    var contentCaNhan = "#contentCoQuanToChuc",
        contentCoQuanToChuc = "#contentCoQuanToChuc",
        ddlDuongSuLa = "#duong-su-la-ddl",
        $TuCachThamGiaToTung;

    function init() {
        $formTaoDuongSu = $("#formTaoDuongSu");
        $TuCachThamGiaToTung = $("#TuCachThamGiaToTungddl");
        var typeDuongSu = $("#duong-su-la-hidden").val();
        initDateTimePicker();
        initFormDuongSuTheoDuongSuLa(typeDuongSu);
        onDropdownlistDuongSuLaChange();
        bindFormActions();
        initTuCachThamGiaToTung();
        onTuCachThamGiaToTungChange();
        initTuCachThamGiaToTungToChuc();
        onTuCachThamGiaToTungToChucChange();
    }
    function initTuCachThamGiaToTung() {
        var isKhac = true;
        var $TuCachThamGiaToTungHidden = $("#TuCachThamGiaToTungHidden");
        var $TuCachThamGiaToTungTextbox = $("#TuCachThamGiaToTungTextbox");


        $("#TuCachThamGiaToTungddl option").each(function () {
            if ($(this).val() == $TuCachThamGiaToTungHidden.val() && $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').show();
            $TuCachThamGiaToTungTextbox.attr("disabled", false).val($TuCachThamGiaToTungHidden.val());
            $TuCachThamGiaToTung.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').hide();
            $TuCachThamGiaToTungTextbox.attr("disabled", true).val("");
            $TuCachThamGiaToTung.attr("name", "TuCachThamGiaToTung");
        }
    }

    function onTuCachThamGiaToTungChange() {        
        $TuCachThamGiaToTung.change(
            function () {                
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#TuCachThamGiaToTungTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#TuCachThamGiaToTungTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "TuCachThamGiaToTung").removeClass("mb-3");
                }
            });
    }

    function initTuCachThamGiaToTungToChuc() {
        var isKhac = true;
        var $TuCachThamGiaToTungHidden = $("#TuCachThamGiaToTungHidden2");
        var $TuCachThamGiaToTungTextbox = $("#TuCachThamGiaToTungTextbox2");


        $("#TuCachThamGiaToTungddl2 option").each(function () {
            if ($(this).val() == $TuCachThamGiaToTungHidden.val() && $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').show();
            $TuCachThamGiaToTungTextbox.attr("disabled", false).val($TuCachThamGiaToTungHidden.val());
            $("#TuCachThamGiaToTungddl2").attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').hide();
            $TuCachThamGiaToTungTextbox.attr("disabled", true).val("");
            $("#TuCachThamGiaToTungddl2").attr("name", "TuCachThamGiaToTung");
        }
    }

    function onTuCachThamGiaToTungToChucChange() {
        $("#TuCachThamGiaToTungddl2").change(
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#TuCachThamGiaToTungTextbox2").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#TuCachThamGiaToTungTextbox2").attr("disabled", true).val("");
                    $(this).attr("name", "TuCachThamGiaToTung").removeClass("mb-3");
                }
            });
    }

    function initDateTimePicker() {
        $("#ngay-thang-nam-sinh-dtp").datetimepicker({
            useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null,
            maxDate: new Date()
        });
        $("#ngay-cap-cmnd-dtp").datetimepicker({
            //useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });
    }

    function onDropdownlistDuongSuLaChange() {
        $("#duong-su-la-ddl").on("change", function () {
            initFormDuongSuTheoDuongSuLa($("#duong-su-la-ddl").val());
            initTuCachThamGiaToTungToChuc();
        });
    }

    function initFormDuongSuTheoDuongSuLa(typeDuongSu) {
        if (typeDuongSu == null || typeDuongSu === "Cá nhân" || typeDuongSu === "") {
            $("#contentCaNhan").show();
            $("#contentCoQuanToChuc").hide();
            $("#contentCaNhan *").prop('disabled', false);
            $("#contentCoQuanToChuc *").prop('disabled', true);
            //$("#duong-su-la-ddl").val("Cơ quan, tổ chức");                   
        }
        else {
            $("#contentCoQuanToChuc").show();
            $("#contentCaNhan").hide();
            $("#contentCoQuanToChuc *").prop('disabled', false);
            $("#contentCaNhan *").prop('disabled', true);

        }
    }

    function bindFormActions() {
        $("#tao-duong-su-btn").on("click",
            function () {
                if ($formTaoDuongSu.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formTaoDuongSu.prop("method"),
                        url: $formTaoDuongSu.prop("action"),
                        data: $($formTaoDuongSu).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                duongSuModule.reloadDuongSuTable();
                                $.notify({ message: "Thêm đương sự thành công" }, { type: "success" });
                                //cap nhat phan chi tiet ho so vu an
                                //if ($("#TuCachThamGiaToTung").val() === "Nguyên đơn") {
                                //    $(updateNguyenDonHoSoVuAn).text($('#HoVaTen').val());
                                //} else {
                                //    $(updateBiDonHoSoVuAn).text($('#HoVaTen').val()); 
                                //}                                                           
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init
    }
})(DuongSuModule);

var SuaDuongSuModule = (function (duongSuModule) {
    var $formSuaDuongSu;
    var updateBiDonHoSoVuAn = "#HoSoVuAn_BiDon";
    var updateNguyenDonHoSoVuAn = "#HoSoVuAn_NguyenDon",
        $TuCachThamGiaToTung;;

    function init() {
        $formSuaDuongSu = $("#formSuaDuongSu");
        $TuCachThamGiaToTung = $("#TuCachThamGiaToTungddl");
        var typeDuongSu = $("#duong-su-la-hidden").val();
        initDateTimePicker();
        onDieuChange();
        bindFormActions();
        onDropdownlistDuongSuLaChange();
        initFormDuongSuTheoDuongSuLa(typeDuongSu);
        initTuCachThamGiaToTung();
        onTuCachThamGiaToTungChange();
        initTuCachThamGiaToTungToChuc();
        onTuCachThamGiaToTungToChucChange();
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

    function initTuCachThamGiaToTung() {
        var isKhac = true;
        var $TuCachThamGiaToTungHidden = $("#TuCachThamGiaToTungHidden");
        var $TuCachThamGiaToTungTextbox = $("#TuCachThamGiaToTungTextbox");


        $("#TuCachThamGiaToTungddl option").each(function () {
            if ($(this).val() == $TuCachThamGiaToTungHidden.val() && $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').show();
            $TuCachThamGiaToTungTextbox.attr("disabled", false).val($TuCachThamGiaToTungHidden.val());
            $TuCachThamGiaToTung.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').hide();
            $TuCachThamGiaToTungTextbox.attr("disabled", true).val("");
            $TuCachThamGiaToTung.attr("name", "TuCachThamGiaToTung");
        }
    }

    function onTuCachThamGiaToTungChange() {
        $TuCachThamGiaToTung.change(
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#TuCachThamGiaToTungTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#TuCachThamGiaToTungTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "TuCachThamGiaToTung").removeClass("mb-3");
                }
            });
    }

    function initTuCachThamGiaToTungToChuc() {
        var isKhac = true;
        var $TuCachThamGiaToTungHidden = $("#TuCachThamGiaToTungHidden2");
        var $TuCachThamGiaToTungTextbox = $("#TuCachThamGiaToTungTextbox2");


        $("#TuCachThamGiaToTungddl2 option").each(function () {
            if ($(this).val() == $TuCachThamGiaToTungHidden.val() && $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').show();
            $TuCachThamGiaToTungTextbox.attr("disabled", false).val($TuCachThamGiaToTungHidden.val());
            $("#TuCachThamGiaToTungddl2").attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $TuCachThamGiaToTungHidden.parent().find('.option-hidden').hide();
            $TuCachThamGiaToTungTextbox.attr("disabled", true).val("");
            $("#TuCachThamGiaToTungddl2").attr("name", "TuCachThamGiaToTung");
        }
    }

    function onTuCachThamGiaToTungToChucChange() {
        $("#TuCachThamGiaToTungddl2").change(
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#TuCachThamGiaToTungTextbox2").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#TuCachThamGiaToTungTextbox2").attr("disabled", true).val("");
                    $(this).attr("name", "TuCachThamGiaToTung").removeClass("mb-3");
                }
            });
    }

    function initDateTimePicker() {
        $("#ngay-thang-nam-sinh-dtp").datetimepicker({
            useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null,
            maxDate: new Date()
        });
        $("#ngay-cap-cmnd-dtp").datetimepicker({
            //useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null
        });
    }

    function onDropdownlistDuongSuLaChange() {
        $("#duong-su-la-ddl").on("change", function () {
            initFormDuongSuTheoDuongSuLa($("#duong-su-la-ddl").val());                    
        });
    }

    function initFormDuongSuTheoDuongSuLa(typeDuongSu) {
        if (typeDuongSu == null || typeDuongSu === "Cá nhân" || typeDuongSu === "") {
            $("#contentCaNhan").show();
            $("#contentCoQuanToChuc").hide();
            $("#contentCaNhan *").prop('disabled', false);
            $("#contentCoQuanToChuc *").prop('disabled', true);
            initTuCachThamGiaToTung();
            //$("#duong-su-la-ddl").val("Cơ quan, tổ chức");                   
        }
        else {
            $("#contentCoQuanToChuc").show();
            $("#contentCaNhan").hide();
            $("#contentCoQuanToChuc *").prop('disabled', false);
            $("#contentCaNhan *").prop('disabled', true);
            initTuCachThamGiaToTungToChuc();
        }
    }

    function bindFormActions() {
        $("#sua-duong-su-btn").on("click",
            function () {
                if ($formSuaDuongSu.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaDuongSu.prop("method"),
                        url: $formSuaDuongSu.prop("action"),
                        data: $($formSuaDuongSu).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                //$.notify({ message: "Sửa thông tin đương sự thành công" }, { type: "success" });
                                //duongSuModule.reloadDuongSuTable();
                                duongSuModule.reloadDuongSuTable();
                                $.notify({ message: "Sửa thông tin đương sự thành công" }, { type: "success" });
                                //cap nhat phan chi tiet ho so vu an
                                //if ($("#TuCachThamGiaToTung").val() === "Nguyên đơn") {
                                //    $(updateNguyenDonHoSoVuAn).text($('#HoVaTen').val());
                                //} else {
                                //    $(updateBiDonHoSoVuAn).text($('#HoVaTen').val()); 
                                //}                                                           
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init
    }
})(DuongSuModule);
var TaoDuongSuModuleAD = (function (duongSuModule) {
    var $formTaoDuongSu;
    var updateBiDonHoSoVuAn = "#HoSoVuAn_BiDon",
        updateNguyenDonHoSoVuAn = "#HoSoVuAn_NguyenDon";
    var contentCaNhan = "#contentCoQuanToChuc",
        contentCoQuanToChuc = "#contentCoQuanToChuc",
        ddlDuongSuLa = "#duong-su-la-ddl";

    function init() {
        $formTaoDuongSu = $("#formTaoDuongSu");
        var typeDuongSu = $("#duong-su-la-hidden").val();
        initDateTimePicker();
        initFormDuongSuTheoDuongSuLa(typeDuongSu);
        onDropdownlistDuongSuLaChange();
        bindFormActions();
    }
    function initDateTimePicker() {
        $("#ngay-thang-nam-sinh-dtp").datetimepicker({
            useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null,
            maxDate: new Date()
        });
        $("#ngay-cap-cmnd-dtp").datetimepicker({
            //useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null,
            maxDate: new Date()
        });
    }

    function onDropdownlistDuongSuLaChange() {
        $("#duong-su-la-ddl").on("change", function () {
            initFormDuongSuTheoDuongSuLa($("#duong-su-la-ddl").val());
        });
    }

    function initFormDuongSuTheoDuongSuLa(typeDuongSu) {
        if (typeDuongSu == null || typeDuongSu === "Cá nhân" || typeDuongSu === "") {
            $("#contentCaNhan").show();
            $("#contentCoQuanToChuc").hide();
            $("#contentCaNhan *").prop('disabled', false);
            $("#contentCoQuanToChuc *").prop('disabled', true);
            //$("#duong-su-la-ddl").val("Cơ quan, tổ chức");                   
        }
        else {
            $("#contentCoQuanToChuc").show();
            $("#contentCaNhan").hide();
            $("#contentCoQuanToChuc *").prop('disabled', false);
            $("#contentCaNhan *").prop('disabled', true);

        }
    }

    function bindFormActions() {
        $("#tao-duong-su-btn").on("click",
            function () {
                if ($formTaoDuongSu.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formTaoDuongSu.prop("method"),
                        url: $formTaoDuongSu.prop("action"),
                        data: $($formTaoDuongSu).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                duongSuModule.reloadDuongSuTable();
                                $.notify({ message: "Thêm đương sự thành công" }, {type: "success"});
                                //cap nhat phan chi tiet ho so vu an
                                //if ($("#TuCachThamGiaToTung").val() === "Nguyên đơn") {
                                //    $(updateNguyenDonHoSoVuAn).text($('#HoVaTen').val());
                                //} else {
                                //    $(updateBiDonHoSoVuAn).text($('#HoVaTen').val()); 
                                //}                                                           
                            }
                        },
                        complete: function () {
                            $('#modalLarge').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init
    }
})(DuongSuModule);

var SuaDuongSuModuleAD = (function (duongSuModule) {
    var $formSuaDuongSu;
    var updateBiDonHoSoVuAn = "#HoSoVuAn_BiDon";
    var updateNguyenDonHoSoVuAn = "#HoSoVuAn_NguyenDon";

    function init() {
        $formSuaDuongSu = $("#formSuaDuongSu");
        var typeDuongSu = $("#duong-su-la-hidden").val();
        initDateTimePicker();
        onDieuChange();
        bindFormActions();
        onDropdownlistDuongSuLaChange();
        initFormDuongSuTheoDuongSuLa(typeDuongSu);
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

    function initDateTimePicker() {
        $("#ngay-thang-nam-sinh-dtp").datetimepicker({
            useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null,
            maxDate: new Date()
        });
        $("#ngay-cap-cmnd-dtp").datetimepicker({
            //useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: null,
            maxDate: new Date()
        });
    }

    function onDropdownlistDuongSuLaChange() {
        $("#duong-su-la-ddl").on("change", function () {
            initFormDuongSuTheoDuongSuLa($("#duong-su-la-ddl").val());
        });
    }

    function initFormDuongSuTheoDuongSuLa(typeDuongSu) {
        if (typeDuongSu == null || typeDuongSu === "Cá nhân" || typeDuongSu === "") {
            $("#contentCaNhan").show();
            $("#contentCoQuanToChuc").hide();
            $("#contentCaNhan *").prop('disabled', false);
            $("#contentCoQuanToChuc *").prop('disabled', true);
            //$("#duong-su-la-ddl").val("Cơ quan, tổ chức");                   
        }
        else {
            $("#contentCoQuanToChuc").show();
            $("#contentCaNhan").hide();
            $("#contentCoQuanToChuc *").prop('disabled', false);
            $("#contentCaNhan *").prop('disabled', true);

        }
    }

    function bindFormActions() {
        $("#sua-duong-su-btn").on("click",
            function () {
                if ($formSuaDuongSu.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaDuongSu.prop("method"),
                        url: $formSuaDuongSu.prop("action"),
                        data: $($formSuaDuongSu).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                //$.notify({ message: "Sửa thông tin đương sự thành công" }, { type: "success" });
                                //duongSuModule.reloadDuongSuTable();
                                duongSuModule.reloadDuongSuTable();
                                $.notify({ message: "Sửa thông tin đương sự thành công" }, { type: "success"});
                                //cap nhat phan chi tiet ho so vu an
                                //if ($("#TuCachThamGiaToTung").val() === "Nguyên đơn") {
                                //    $(updateNguyenDonHoSoVuAn).text($('#HoVaTen').val());
                                //} else {
                                //    $(updateBiDonHoSoVuAn).text($('#HoVaTen').val());
                                //}    
                            }
                        },
                        complete: function () {
                            $('#modalLarge').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init
    }
})(DuongSuModule);

var XoaDuongSuModule = (function (duongSuModule) {
    var $formXoaDuongSu;

    function init() {
        $formXoaDuongSu = $("#formXoaDuongSu");
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-duong-su-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formXoaDuongSu.prop("method"),
                    url: $formXoaDuongSu.prop("action"),
                    data: getFormData(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: "Xóa thông tin đương sự không thành công" }, { type: "danger" });
                        } else {
                            $.notify({ message: "Xóa thông tin đương sự thành công" }, { type: "success" });
                            duongSuModule.reloadDuongSuTable();
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
        var duongSuId = $("#duong-su-id-hidden").val();

        return {
            duongSuId: duongSuId
        }
    }

    return {
        init: init
    }
})(DuongSuModule);

var TaoSuaDuongSuHinhSuModule = (function (duongSuModule) {
    var $formTaoDuongSu,
        $formSuaDuongSu;

    var $ddlDuongSuLa,
        $ddlNguoiBaoChuaLa;

    var $ddlTuCachThamGiaToTung;

    var typeTuCachThamGiaToTung,
        typeDuongSu,
        typeNguoiBaoChua;

    function initCreating() {
        $formTaoDuongSu = $("#formTaoDuongSu");
        $ddlTuCachThamGiaToTung = $("#TuCachThamGiaToTungDDL");
        $ddlDuongSuLa = $("#duong-su-la-ddl");
        $ddlNguoiBaoChuaLa = $("#NguoiBaoChuaLaDDL");
        typeTuCachThamGiaToTung = $("#TuCachThamGiaToTungHidden").val();
        typeDuongSu = $("#duong-su-la-hidden").val();
        typeNguoiBaoChua = $("#NguoiBaoChuaLaHidden").val();
        initDateTimePicker();
        initFormDuongSuHinhSu();
        onDropdownlistChange();
        onCheckboxClicked();
        onDieuChange();
        initTinhTrangGiamGiu();
        bindCreateFormActions();
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

    function initUpdating() {
        $formSuaDuongSu = $("#formSuaDuongSu");
        $ddlTuCachThamGiaToTung = $("#TuCachThamGiaToTungDDL");
        $ddlDuongSuLa = $("#duong-su-la-ddl");
        $ddlNguoiBaoChuaLa = $("#NguoiBaoChuaLaDDL");
        typeTuCachThamGiaToTung = $("#TuCachThamGiaToTungHidden").val();
        typeDuongSu = $("#duong-su-la-hidden").val();
        typeNguoiBaoChua = $("#NguoiBaoChuaLaHidden").val();
        initDateTimePicker();
        initFormDuongSuHinhSu();
        onDropdownlistChange();
        initCheckboxDacDiemNhanThanBiCao();
        onCheckboxClicked();
        onDieuChange();
        initTinhTrangGiamGiu();
        bindUpdateFormActions();
    }

    function initViewing() {
        $ddlTuCachThamGiaToTung = $("#TuCachThamGiaToTungDDL");
        $ddlDuongSuLa = $("#duong-su-la-ddl");
        $ddlNguoiBaoChuaLa = $("#NguoiBaoChuaLaDDL");
        typeTuCachThamGiaToTung = $("#TuCachThamGiaToTungHidden").val();
        typeDuongSu = $("#duong-su-la-hidden").val();
        typeNguoiBaoChua = $("#NguoiBaoChuaLaHidden").val();
        initFormDuongSuHinhSu();
        initCheckboxDacDiemNhanThanBiCao();
        initTinhTrangGiamGiu();
        initCheckboxRadioForReadonly();
    }

    function initDateTimePicker() {
        //$("#ngay-thang-nam-sinh-dtp").datetimepicker({
        //    useCurrent: false,
        //    format: "DD/MM/YYYY",
        //    defaultDate: null,
        //    maxDate: new Date()
        //});
        //$("#ngay-cap-cmnd-dtp").datetimepicker({
        //    //useCurrent: false,
        //    format: "DD/MM/YYYY",
        //    defaultDate: new Date()
        //});
        $("#ngay-bat-tam-giam-dtp").datetimepicker({
            useCurrent: false,
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });
    }

    function onDropdownlistChange() {
        $ddlTuCachThamGiaToTung.on("change", function () {
            //typeTuCachThamGiaToTung = $(this).val();
            typeTuCachThamGiaToTung = $ddlTuCachThamGiaToTung.val();
            typeDuongSu = $ddlDuongSuLa.val();
            typeNguoiBaoChua = $ddlNguoiBaoChuaLa.val();
            initFormDuongSuHinhSu();
        });
        $ddlDuongSuLa.on("change", function () {
            //typeDuongSu = $(this).val();
            typeTuCachThamGiaToTung = $ddlTuCachThamGiaToTung.val();
            typeDuongSu = $ddlDuongSuLa.val();
            typeNguoiBaoChua = $ddlNguoiBaoChuaLa.val();
            initFormDuongSuHinhSu();
        });
        $ddlNguoiBaoChuaLa.on("change", function () {
            //typeNguoiBaoChua = $(this).val();
            typeTuCachThamGiaToTung = $ddlTuCachThamGiaToTung.val();
            typeDuongSu = $ddlDuongSuLa.val();
            typeNguoiBaoChua = $ddlNguoiBaoChuaLa.val();
            initFormDuongSuHinhSu();
        });
    }

    function initFormDuongSuHinhSu() {
        switch (removeSpaceSpecialChar(typeTuCachThamGiaToTung)) {
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_BICAN):
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_BICAO):
                hideAllContent();
                showControlByClass(".DuongSuLaContent");
                if (removeSpaceSpecialChar(typeDuongSu) === removeSpaceSpecialChar(Setting.DUONGSULA_CANHAN)) {
                    $("#contentCaNhan").show();
                    $("#contentCoQuanToChuc").hide();
                    $("#contentCoQuanToChuc *").prop('disabled', true);

                    showControlByClass(".HoVaTenContent");
                    showControlByClass(".TenGoiKhacContent");
                    showControlByClass(".NgayThangNamSinhContent");
                    showControlByClass(".NoiSinhContent");
                    showControlByClass(".GioiTinhContent");
                    showControlByClass(".QuocTichContent");
                    showControlByClass(".DanTocContent");
                    showControlByClass(".TonGiaoContent");
                    showControlByClass(".SoDienThoaiContent");
                    showControlByClass(".NgheNghiepContent");
                    showControlByClass(".TrinhDoVanHoaContent");
                    showControlByClass(".NoiCuTruContent");
                    showControlByClass(".TienAnContent");
                    showControlByClass(".TienSuContent");
                    showControlByClass(".ConOngConBaContent");
                    showControlByClass(".DacDiemNhanThanBiCaoContent");
                    showControlByClass(".TinhTrangGiamGiuContent");
                    showControlByClass(".TruyToContent");
                }
                else if (removeSpaceSpecialChar(typeDuongSu) === removeSpaceSpecialChar(Setting.DUONGSULA_TOCHUC)) {
                    $("#contentCoQuanToChuc").show();
                    $("#contentCaNhan").hide();
                    $("#contentCaNhan *").prop('disabled', true);
                    $("#contentCoQuanToChuc *").prop('disabled', false);

                    hideControlByClass(".GioiTinhNguoiDaiDienContent");
                }
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIBAOCHUA):
                $ddlTuCachThamGiaToTung.after('<input type="hidden" name="DuongSuLa" value="" id="hidden-tucach">');
                $('#hidden-tucach').val(Setting.DUONGSULA_CANHAN);
                hideAllContent();
                hideControlByClass(".DuongSuLaContent");
                showControlByClass(".NguoiBaoChuaLaContent");
                if (removeSpaceSpecialChar(typeNguoiBaoChua) === removeSpaceSpecialChar(Setting.HS_NGUOIBAOCHUALA_LUATSU)) {
                    $("#contentCaNhan").show();
                    $("#contentCoQuanToChuc").hide();
                    $("#contentCoQuanToChuc *").prop('disabled', true);

                    showControlByClass(".HoVaTenContent");
                    showControlByClass(".VanPhongLuatSuContent");
                    showControlByClass(".DoanLuatSuContent");
                }
                else if (removeSpaceSpecialChar(typeNguoiBaoChua) === removeSpaceSpecialChar(Setting.HS_NGUOIBAOCHUALA_KHONGPHAILUATSU)) {
                    $("#contentCaNhan").show();
                    $("#contentCoQuanToChuc").hide();
                    $("#contentCoQuanToChuc *").prop('disabled', true);

                    showControlByClass(".HoVaTenContent");
                    showControlByClass(".GioiTinhContent");
                    showControlByClass(".NgheNghiepContent");
                    showControlByClass(".NoiCongTacContent");
                }
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIDAIDIEN):
                $ddlTuCachThamGiaToTung.after('<input type="hidden" name="DuongSuLa" value="" id="hidden-tucach">');
                $('#hidden-tucach').val(Setting.DUONGSULA_CANHAN);
                hideAllContent();
                hideControlByClass(".DuongSuLaContent");
                showControlByClass(".NguoiDaiDienCuaContent");

                $("#contentCaNhan").show();
                $("#contentCoQuanToChuc").hide();
                $("#contentCoQuanToChuc *").prop('disabled', true);

                showControlByClass(".HoVaTenContent");
                showControlByClass(".GioiTinhContent");
                showControlByClass(".NgayThangNamSinhContent");
                showControlByClass(".NoiCuTruContent");
                showControlByClass(".NgheNghiepContent");
                showControlByClass(".QuanHeVoiNguoiThamGiaToTungContent");
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIBAOVEQUYENLOIICH):
                $ddlTuCachThamGiaToTung.after('<input type="hidden" name="DuongSuLa" value="" id="hidden-tucach">');
                $('#hidden-tucach').val(Setting.DUONGSULA_CANHAN);
                hideAllContent();
                hideControlByClass(".DuongSuLaContent");
                showControlByClass(".NguoiBaoVeCuaContent");

                $("#contentCaNhan").show();
                $("#contentCoQuanToChuc").hide();
                $("#contentCoQuanToChuc *").prop('disabled', true);

                showControlByClass(".HoVaTenContent");
                showControlByClass(".GioiTinhContent");
                showControlByClass(".NgayThangNamSinhContent");
                showControlByClass(".NoiCuTruContent");
                showControlByClass(".NgheNghiepContent");
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_BIHAI):
                hideAllContent();
                showControlByClass(".DuongSuLaContent");
                if (removeSpaceSpecialChar(typeDuongSu) === removeSpaceSpecialChar(Setting.DUONGSULA_CANHAN)) {
                    $("#contentCaNhan").show();
                    $("#contentCoQuanToChuc").hide();
                    $("#contentCoQuanToChuc *").prop('disabled', true);

                    showControlByClass(".HoVaTenContent");
                    showControlByClass(".NgayThangNamSinhContent");
                    showControlByClass(".GioiTinhContent");
                    showControlByClass(".SoDienThoaiContent");
                    showControlByClass(".NgheNghiepContent");
                    showControlByClass(".NoiCuTruContent");
                    showControlByClass(".ChucVuContent");
                    showControlByClass(".DacDiemNhanThanBiHaiContent");
                }
                else if (removeSpaceSpecialChar(typeDuongSu) === removeSpaceSpecialChar(Setting.DUONGSULA_TOCHUC)) {
                    $("#contentCoQuanToChuc").show();
                    $("#contentCaNhan").hide();
                    $("#contentCaNhan *").prop('disabled', true);
                    $("#contentCoQuanToChuc *").prop('disabled', false);

                    hideControlByClass(".GioiTinhNguoiDaiDienContent");
                }
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUYENDON):
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_BIDON):
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOILIENQUAN):
                hideAllContent();
                showControlByClass(".DuongSuLaContent");
                if (removeSpaceSpecialChar(typeDuongSu) === removeSpaceSpecialChar(Setting.DUONGSULA_CANHAN)) {
                    $("#contentCaNhan").show();
                    $("#contentCoQuanToChuc").hide();
                    $("#contentCoQuanToChuc *").prop('disabled', true);

                    showControlByClass(".HoVaTenContent");
                    showControlByClass(".NgayThangNamSinhContent");
                    showControlByClass(".GioiTinhContent");
                    showControlByClass(".SoDienThoaiContent");
                    showControlByClass(".NoiCuTruContent");
                }
                else if (removeSpaceSpecialChar(typeDuongSu) === removeSpaceSpecialChar(Setting.DUONGSULA_TOCHUC)) {
                    $("#contentCoQuanToChuc").show();
                    $("#contentCaNhan").hide();
                    $("#contentCaNhan *").prop('disabled', true);
                    $("#contentCoQuanToChuc *").prop('disabled', false);

                    showControlByClass(".GioiTinhNguoiDaiDienContent");
                }
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOILAMCHUNG):
                hideAllContent();
                showControlByClass(".DuongSuLaContent");
                $("#contentCaNhan").show();
                $("#contentCoQuanToChuc").hide();
                $("#contentCoQuanToChuc *").prop('disabled', true);
                initDefaultDuongSuLaCaNhan();
                showControlByClass(".HoVaTenContent");
                showControlByClass(".GioiTinhContent");
                showControlByClass(".NgayThangNamSinhContent");
                showControlByClass(".NoiCuTruContent");
                break;

            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIGIAMDINH):
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIDINHGIA):
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIPHIENDICH):
            case removeSpaceSpecialChar(Setting.HS_TUCACHTOTUNG_NGUOIDICHTHUAT):
                hideAllContent();
                showControlByClass(".DuongSuLaContent");
                $("#contentCaNhan").show();
                $("#contentCoQuanToChuc").hide();
                $("#contentCoQuanToChuc *").prop('disabled', true);
                initDefaultDuongSuLaCaNhan();
                showControlByClass(".HoVaTenContent");
                showControlByClass(".NgayThangNamSinhContent");
                showControlByClass(".ChucVuContent");
                showControlByClass(".NoiCongTacContent");
                break;

            default:
                hideAllContent();
                showControlByClass(".DuongSuLaContent");
                $("#contentCaNhan").hide();
                $("#contentCoQuanToChuc").hide();
                $("#contentCaNhan *").prop('disabled', true);
                $("#contentCoQuanToChuc *").prop('disabled', true);
                break;
        }

        initCheckboxDacDiemNhanThanBiCao();
    }

    function hideAllContent() {
        hideControlByClass(".ContentHidden");
    }

    function initCheckboxDacDiemNhanThanBiCao() {
        var isDuoi18Tuoi = $(".chkDacDiemNhanThanBiCao[value='" + Setting.HS_DACDIEMNHANTHANBICAO_1416 + "']:checked").length + $(".chkDacDiemNhanThanBiCao[value ='" + Setting.HS_DACDIEMNHANTHANBICAO_1618 + "']:checked").length;

        if (isDuoi18Tuoi > 0) {
            showControlByClass(".DacDiemNhanThanBiCaoNguoiDu18XuiGiucContent");
        }
        else {
            hideControlByClass(".DacDiemNhanThanBiCaoNguoiDu18XuiGiucContent");
        }

        var isCanBo = $(".chkDacDiemNhanThanBiCao[value='" + Setting.HS_DACDIEMNHANTHANBICAO_DANGVIEN + "']:checked, .chkDacDiemNhanThanBiCao[value='" + Setting.HS_DACDIEMNHANTHANBICAO_CANBO + "']:checked").length > 0;

        if (isCanBo) {
            showControlByClass(".LuuYVeChucVuContent");
        }
        else {
            hideControlByClass(".LuuYVeChucVuContent");
        }
    }

    function onCheckboxClicked() {
        $(".chkDacDiemNhanThanBiCao").on("click", function () {
            initCheckboxDacDiemNhanThanBiCao();
        });
    }

    function initTinhTrangGiamGiu() {
        if ($("#TinhTrangGiamGiuDDL").val() === Setting.HS_TINHTRANGGIAMGIU_TAMGIAM) {
            showControlByClass(".NgayBatTamGiamContent");
        }
        else {
            hideControlByClass(".NgayBatTamGiamContent");
        }
        $("#TinhTrangGiamGiuDDL").on("change", function () {
            if ($(this).val() === Setting.HS_TINHTRANGGIAMGIU_TAMGIAM) {
                showControlByClass(".NgayBatTamGiamContent");
            }
            else {
                hideControlByClass(".NgayBatTamGiamContent");
            }
        });
    }

    function initDefaultDuongSuLaCaNhan() {
        $ddlDuongSuLa.val(Setting.DUONGSULA_CANHAN);
        $ddlDuongSuLa.prop('disabled', true);
        $ddlDuongSuLa.after('<input type="hidden" name="DuongSuLa" value="" id="hidden-tucach">');
        $('#hidden-tucach').val(Setting.DUONGSULA_CANHAN);
    }

    function initCheckboxRadioForReadonly() {
        $('input[type="checkbox"]').each(function () {
            $(this).prop('disabled', true);
        });
        $('input[type="radio"]').each(function () {
            $(this).prop('disabled', true);
        });
    }

    function bindCreateFormActions() {
        $("#tao-duong-su-btn").on("click",
            function () {
                if ($formTaoDuongSu.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formTaoDuongSu.prop("method"),
                        url: $formTaoDuongSu.prop("action"),
                        data: $($formTaoDuongSu).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                duongSuModule.reloadDuongSuTable();
                                $.notify({ message: "Thêm đương sự thành công" }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $('#modalLarge').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    function bindUpdateFormActions() {
        $("#sua-duong-su-btn").on("click",
            function () {
                if ($formSuaDuongSu.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaDuongSu.prop("method"),
                        url: $formSuaDuongSu.prop("action"),
                        data: $($formSuaDuongSu).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                duongSuModule.reloadDuongSuTable();
                                $.notify({ message: "Sửa thông tin đương sự thành công" }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $('#modalLarge').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    return {
        initCreating: initCreating,
        initUpdating: initUpdating,
        initViewing: initViewing
    }
})(DuongSuModule);