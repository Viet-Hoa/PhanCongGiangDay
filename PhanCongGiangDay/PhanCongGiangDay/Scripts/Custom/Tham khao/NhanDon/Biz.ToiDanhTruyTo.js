$(function () {
    ToiDanhTruyToModule.init();
});

var ToiDanhTruyToModule = (function () {
    var $toiDanhTruyToTable;
    var toiDanhTruyToUrl = "/NhanDon/DanhSachToiDanhTruyTo";
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    function init() {
        initToiDanhTruyToDataTable(hoSoVuAnId);
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "TaoToiDanhTruyTo"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnTaoToiDanhTruyTo").addClass("add-disabled");
                    $(".btn-grid").addClass("edit-disabled");
                }
            }
        });
    }

    function initToiDanhTruyToDataTable(hoSoVuAnId) {
        $toiDanhTruyToTable = $("#toi-danh-truy-to-table").DataTable({
                searching: false,
                order: [],
                pageLength: 25,
                lengthChange: false,
                ajax: {
                    url: toiDanhTruyToUrl,
                    data: function () {
                        return {
                            hoSoVuAnId: hoSoVuAnId
                        }
                    },
                    method: "GET",
                    beforeSend: function () {
                        showLoadingOverlay("#toi-danh-truy-to-container");
                    },
                    complete: function () {
                        $("#btnTaoToiDanhTruyTo").attr('data-url', '/NhanDon/ThemToiDanhTruyTo?hoSoVuAnId=' + hoSoVuAnId);
                        hideLoadingOverlay("#toi-danh-truy-to-container");
                        initRoleNhanVien();
                    }
                },
                columns: [
                    { data: "STT", width: 70 },
                    {
                        data: "Dieu", "render": function (data, type, full, meta) {
                            if (full.BoLuatHinhSu != null && full.BoLuatHinhSu != "") {
                                return full.Dieu + ", BLHS " + full.BoLuatHinhSu;
                            }
                            else {
                                return full.Dieu
                            }
                        },width: 100},
                    { data: "ToiDanh", width: 300 },  
                    { data: "DieuLuatApDung" }, 
                    {
                        data: "ToiDanhTruyToID", orderable: false, width: 140, className: "text-center", render: function (data) {
                            return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/NhanDon/ChiTietToiDanhTruyTo?toiDanhTruyToId=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modelToiDanh" data-url="/NhanDon/SuaToiDanhTruyTo?toiDanhTruyToId=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                                '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NhanDon/GetXoaToiDanhTruyTo?toiDanhTruyToId=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        }
                    }
                ]
            });
        }
    

    function getHoSoVuAnId() {
        return hoSoVuAnId;
    }

    function reloadToiDanhTruyToTable() {
        $toiDanhTruyToTable.ajax.reload();
    }    
    
    return {
        init: init,
        reloadToiDanhTruyToTable: reloadToiDanhTruyToTable,
        getHoSoVuAnId: getHoSoVuAnId
    }
})();

var ThemToiDanhTruyToModule = (function (toiDanhTruyToModule) {
    var $formThemToiDanhTruyTo;
    function init() {
        $formThemToiDanhTruyTo = $("#formThemToiDanhTruyTo");
        CKEDITOR.replace('noi-dung-dieu-luat-textarea');
        onDieuChange();
        AddKhoanDiem();
        bindFormActions();
        //initValidation();
    }    
        
    function onDieuChange() {
        $('#dieu-ddl').change(function () {            
            if ($(this).val() == "Khác") {
                $('#dieu-khac').removeClass("d-none");
                $('#dieu-textbox').attr("disabled", false);
                $('#BoLuatHinhSu').attr("disabled", false);
                $(this).attr("name", "");
                $('#dieu-textbox').val("Điều ");
                $('#toidanhtb').val("");
                $('#dieu-dll-val').addClass("d-none");
            } else {
                $('#dieu-khac').addClass("d-none");
                $('#dieu-textbox').attr("disabled", true);
                $('#BoLuatHinhSu').attr("disabled", true);
                $(this).attr("name", "Dieu");
                $('#dieu-dll-val').removeClass("d-none");
                $("#ToiDanhHidden > option").each(function () {
                    if ($(this).val() == $('#dieu-ddl').val()) {
                        $('#toidanhtb').val($(this).text());
                    }
                });
            }
        });
    }


    function AddKhoanDiem() {
        $('.button-edit').click(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));            
            if (id.search("tkd") != -1) {
                $(this).addClass("d-none");
                $('#xkd_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/NhanDon/KhoanDiemItem",
                    data: { i: i+1 },
                    success: function (response) {
                        $('.khoandiem').last().after(response);
                    }
                });
            }
            else {
                $('#khoanDiem_' + i).hide();
                $('#check_' + i).val("0");               
            }
        });
    }

    function AddKhoanDiemPartial() {
        $('.button-edit-partial').click(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tkd") != -1) {
                $(this).addClass("d-none");
                $('#xkd_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/NhanDon/KhoanDiemItem",
                    data: { i: i + 1 },
                    success: function (response) {
                        $('.khoandiem').last().after(response);
                    }
                });
            }
            else {
                $('#khoanDiem_' + i).hide();
                $('#check_' + i).val("0");
            }
        });
    }

    function bindFormActions() {
        $("#them-toi-danh-btn").on("click",
            function () {
                $().CKEditorSetValForTextarea('noi-dung-dieu-luat-textarea');
                if ($formThemToiDanhTruyTo.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formThemToiDanhTruyTo.prop("method"),
                        url: $formThemToiDanhTruyTo.prop("action"),
                        data: $($formThemToiDanhTruyTo).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {

                                toiDanhTruyToModule.reloadToiDanhTruyToTable();
                                $.notify({ message: response.Messages }, {type: "success"});                                                        
                            }
                        },
                        complete: function () {
                            $('#modelToiDanh').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    function initValidation() {
        $formThemToiDanhTruyTo.validate({
            ignore: '',
            rules: {
                "ToiDanh": {
                    required: true
                },
                "NoiDungDieuLuat": {
                    required: true
                }
            },
            messages:
            {
                "ToiDanh": {
                    required: "Tội danh không được để trống."
                },
                "NoiDungDieuLuat": {
                    required: "Nội dung không được để trống."
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
        init: init,
        AddKhoanDiemPartial: AddKhoanDiemPartial
    }
})(ToiDanhTruyToModule);

var SuaToiDanhTruyToModule = (function (toiDanhTruyToModule) {
    var $formSuaToiDanhTruyTo;
    function init() {
        $formSuaToiDanhTruyTo = $("#formSuaToiDanhTruyTo");
        CKEDITOR.replace('sua-noi-dung-dieu-luat-textarea');
        SelectedValue();
        bindFormActions();
        initDieu();
        onDieuChange();
        AddKhoanDiem();
    }

    function initDieu() {
        var isKhac = true;
        $("#dieu-ddl option").each(function () {
            if ($(this).val() == $('#DieuHidden').val()) {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            alert();
            $("#dieu-ddl option:last").attr("selected", "selected");
            $('#dieu-khac').removeClass("d-none");
            $('#dieu-textbox').attr("disabled", false);
            $('#dieu-textbox').val($('#DieuHidden').val());
            $('#BoLuatHinhSu').attr("disabled", false);
            $(this).attr("name", "");
            $('#toidanhtb').val("");
            $('#dieu-dll-val').addClass("d-none");
        }
    }

    function onDieuChange() {
        $('#dieu-ddl').change(function () {
            if ($(this).val() == "Khác") {
                $('#dieu-khac').removeClass("d-none");
                $('#dieu-textbox').attr("disabled", false);
                $('#BoLuatHinhSu').attr("disabled", false);
                $(this).attr("name", "");
                $('#dieu-textbox').val("Điều ");
                $('#toidanhtb').val("");
                $('#dieu-dll-val').addClass("d-none");
            } else {
                $('#dieu-khac').addClass("d-none");
                $('#dieu-textbox').attr("disabled", true);
                $('#BoLuatHinhSu').attr("disabled", true);
                $(this).attr("name", "Dieu");
                $('#dieu-dll-val').removeClass("d-none");
                $("#ToiDanhHidden > option").each(function () {
                    if ($(this).val() == $('#dieu-ddl').val()) {
                        $('#toidanhtb').val($(this).text());
                    }
                });
            }
        });
    }

    function SelectedValue() {
        $(".khoandiem").each(function () {
            var hidden = $(this).find(".KhoanHidden").val();
            var $Khoan = $(this).find(".khoanslt");
            $Khoan.val(hidden);
        });
    }

    function AddKhoanDiem() {
        $('.button-edit').click(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tkd") != -1) {
                $(this).addClass("d-none");
                $('#xkd_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/NhanDon/KhoanDiemItem",
                    data: { i: i + 1 },
                    success: function (response) {
                        $('.khoandiem').last().after(response);
                    }
                });
            }
            else {
                $('#khoanDiem_' + i).hide();
                $('#check_' + i).val("0");
            }
        });
    }

    function bindFormActions() {
        $("#sua-toi-danh-btn").on("click",
            function () {
                $().CKEditorSetValForTextarea('sua-noi-dung-dieu-luat-textarea');
                if ($formSuaToiDanhTruyTo.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaToiDanhTruyTo.prop("method"),
                        url: $formSuaToiDanhTruyTo.prop("action"),
                        data: $($formSuaToiDanhTruyTo).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {

                                toiDanhTruyToModule.reloadToiDanhTruyToTable();
                                $.notify({ message: response.Messages }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $('#modelToiDanh').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            });
    }

    function initValidation() {
        $formSuaToiDanhTruyTo.validate({
            ignore: '',
            rules: {
                "ToiDanh": {
                    required: true
                },
                "NoiDungDieuLuat": {
                    required: true
                }
            },
            messages:
                {
                    "ToiDanh": {
                        required: "Tội danh không được để trống."
                    },
                    "NoiDungDieuLuat": {
                        required: "Nội dung không được để trống."
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
})(ToiDanhTruyToModule);

var XoaToiDanhTruyToModule = (function (toiDanhTruyToModule) {
    var $formXoaToiDanhTruyTo;

    function init() {
        $formXoaToiDanhTruyTo = $("#formXoaToiDanhTruyTo");
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-toi-danh-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formXoaToiDanhTruyTo.prop("method"),
                    url: $formXoaToiDanhTruyTo.prop("action"),
                    data: getFormData(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            toiDanhTruyToModule.reloadToiDanhTruyToTable();
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
        var toiDanhTruyToId = $("#toi-danh-id-hidden").val();

        return {
            toiDanhTruyToId: toiDanhTruyToId
        }
    }

    return {
        init: init
    }
})(ToiDanhTruyToModule);
