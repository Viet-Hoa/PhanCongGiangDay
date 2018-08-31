$(function () {
    GDTTTModule.init();
});

var GDTTTModule = (function () {
    var $GDTTTTable;
        
    var GDTTTUrl = "/GiamDocThamTaiTham/DanhSachGDTTT";
        
    var gdttt = $("#gdttt").val();
    var hoSoVuAnId = $('#HoSoVuAnID').val();

    function init() {
        loadGDTTT();
    }

    function loadGDTTT() {
        initGDTTTDataTable();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVienAction",
            data: {
                contrCheck: "GiamDocThamTaiTham",
                actionCheck: "SuaGDTTT"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#btnTaoHoSo").addClass("add-disabled");
                    $(".btn-grid").addClass("edit-disabled");
                }
            }
        });
    }
    
    function initGDTTTDataTable() {        
        $GDTTTTable = $("#giam-doc-tham-tai-tham-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: GDTTTUrl,
                data: {
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay();
                },
                complete: function () {
                    hideLoadingOverlay();
                    //initRoleNhanVien();
                }
            },

            columns: [
                { data: "So" },
                { data: "MaHoSo" },
                { data: "Nhom" },
                { data: "SoQuyetDinh" },
                { data: "NgayRaQuyetDinh" },
                {
                    data: "GiamDocThamTaiThamID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modelchitiet" data-url="/GiamDocThamTaiTham/ChiTietGDTTT?gDTTTid=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modelTaoHoSoMoi" data-url="/GiamDocThamTaiTham/SuaGDTTT?gDTTTid=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/GiamDocThamTaiTham/XoaGDTTT?gDTTTid=' + data + '"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
        $('#giam-doc-tham-tai-tham-table_filter').hide();
        
    }
    function timKiem() {
        $('#GDTTT-search').keyup(function () {
            $GDTTTTable.search($(this).val()).draw();
        });
    }
    

   
    function reloadGDTTTTable() {
        $GDTTTTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadGDTTTTable: reloadGDTTTTable,
        
    }
})();

var SuaGDTTTModule = (function (gDTTTModule) {
    var $formSuaGDTTT;
    var idTextEditor = 'ghi-chu-gdttt';
    function init() {
        $formSuaGDTTT = $("#formSuaGDTTT");
        initDateTimePicker();
        CKEDITOR.replace(idTextEditor, { height:"104px" });
        initView();
        hideNoiDung();
        noiDungHuySua();
        maHoSo();
        checkhuysua();
        bindFormActions();
    }

    

    function initDateTimePicker() {        
        $("#ngay-quyet-dinh").datetimepicker({
            useCurrent: true,
            format: "DD/MM/YYYY",
            defaultDate: new Date()
        });
    }

    function initView() {

        if ($("#Nhom").val() === "Giám đốc thẩm") {
            $('#tab-gdt').show();
            $('#tab-tt').hide();
        }
        else {
            $('#tab-gdt').hide();
            $('#tab-tt').show();
        }
        var str = $('input[type=radio]:checked', '#formSuaGDTTT').val();
        if (str === null || str === undefined)
            str = "";
        if (str.search("Hủy") != -1 || str.search("Sửa") != -1) {
            $('#huy-sua-an').show();
            $('#NoiDungHuySuaAn').enableSelection();
        }
        else {
            $('#huy-sua-an').hide();
            $('#NoiDungHuySuaAn').disableSelection();
        }

        if ($('#GiamDocThamTaiThamID').val() == 0) {
            $('.tab-st').hide();
            $('.tab-pt').hide();
            $('#data-sotham').show();
            $('#data-phuctham').show();
        }
        else {
            if ($('#giaiDoan-gdttt').val() == 1) {
                $('.tab-pt').hide();
                $('#data-phuctham').show();
            }
            else if ($('#giaiDoan-gdttt').val() == 2 && $('#HuySuaPhucTham').is(':checked')) {
                $('#data-phuctham').hide();
                $('.tab-pt').show();
            }
            
        }
        
    }
    function hideNoiDung() {
        $("#Nhom").change(function () {
            if ($(this).val() === "Giám đốc thẩm") {
                $('#tab-gdt').show();
                $('#tab-tt').hide();
            }
            else {
                $('#tab-gdt').hide();
                $('#tab-tt').show();
            }
        });
    }
    function noiDungHuySua() {
        $('.noi-dung-qd').change(function () {

            if ($(this).val().search("Hủy") != -1 || $(this).val().search("Sửa") != -1) {
                $('#huy-sua-an').show();
                $('#NoiDungHuySuaAn').enableSelection();
            }
            else {
                $('#NoiDungHuySuaAn').val("");
                $('#huy-sua-an').hide();
                $('#NoiDungHuySuaAn').disableSelection();
            }
        });
    }
    function maHoSo() {
        $("#NhomAn").change(function () {
            $.ajax({
                url: "/GiamDocThamTaiTham/DanhSachMaHoSo",
                type: "POST",
                dataType: "json",
                data: { nhomAn: $(this).val() },
                success: function (data) {
                    $("#MaHoSo").empty();
                    $("#MaHoSo").prop('disabled', false);
                    $("#MaHoSo").append("<option value=''>--Chọn--</option>");
                    $.each(data, function (index, value) {
                        $("#MaHoSo").append("<option value='" + value.MaHoSo + "'>" + value.MaHoSo + "</option>");
                    });
                }
            });
        });
        $("#MaHoSo").change(function () {
            $.ajax({
                url: "/GiamDocThamTaiTham/TimHoSo",
                type: "POST",
                data: { MaHoSo: $(this).val() },
                success: function (data) {
                    $('#hoso-partial').html(data);
                    $('.tab-st').hide();
                    $('.tab-pt').hide();
                    $('#data-sotham').show();
                    $('#data-phuctham').show();
                }
            });
        });
    }

    function checkhuysua() {
        $('#HuySuaSoTham').change(function () {
            if ($(this).is(':checked')) {
                $('.tab-st').show();
                $('#data-sotham').hide();
            }
            else {
                $('.tab-st').hide();
                $('#data-sotham').show();
            }
        });

        $('#HuySuaPhucTham').change(function () {
            if ($(this).is(':checked')) {
                $('.tab-pt').show();
                $('#data-phuctham').hide();
            }
            else {
                $('.tab-pt').hide();
                $('#data-phuctham').show();
            }
        });
    }

    function bindFormActions() {
        $("#Luu-gdttt-btn").on("click",
            function () {                
                $().CKEditorSetValForTextarea(idTextEditor);
                
                if ($formSuaGDTTT.valid()) {                    
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaGDTTT.prop("method"),
                        url: $formSuaGDTTT.prop("action"),
                        data: $formSuaGDTTT.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                
                                
                                gDTTTModule.reloadGDTTTTable();
                                $.notify({ message: response.Messages }, {type: "success"});
                                
                            }
                        },
                        complete: function () {
                            $('#modelTaoHoSoMoi').modal("hide");
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
})(GDTTTModule);

var XemGDTTTModule = (function (gDTTTModule) {
    function init() {
        initView();
    }

    function initView() {
        
        var str = $('input[type=radio]:checked', '#noi-dung-quyet-dinh').val();
        if (str.search("Hủy") != -1 || str.search("Sửa") != -1) {
            $('#huy-sua-an').show();
            $('#NoiDungHuySuaAn').enableSelection();
        }
        else {
            $('#huy-sua-an').hide();
            $('#NoiDungHuySuaAn').disableSelection();
        }
    }

    return {
        init: init
    }
})(GDTTTModule);

var XoaGDTTTModule = (function (gDTTTModule) {
    var $formXoaGDTTT;

    function init() {
        $formXoaGDTTT = $("#formXoaGDTTT");
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-gdttt-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formXoaGDTTT.prop("method"),
                    url: $formXoaGDTTT.prop("action"),
                    data: { gDTTTid: $('#gDTTTid-hidden').val(), },
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: "Xóa thông tin giám đốc thẩm, tái thẩm không thành công" }, { type: "danger" });
                        } else {
                            $.notify({ message: "Xóa thông tin giám đốc thẩm, tái thẩm thành công" }, { type: "success" });
                            gDTTTModule.reloadGDTTTTable();
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

    

    return {
        init: init
    }
})(GDTTTModule);