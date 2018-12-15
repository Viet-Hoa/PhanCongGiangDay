
var PhanCongNhomLopModule = (function () {
    var $PhanCongNhomLopTable;

    var PhanCongNhomLopUrl = "/PhanCongNhomLop/DanhSachPhanCongNhomLop";

    function init() {
        loadPhanCongNhomLop();
        showThemPanel();
    }

    function showThemPanel() {
        $('#btnThemPhanCongNhomLop').click(function () {
            $('#btnThemPhanCongNhomLop').addClass("add-disabled");
            $('#panelThemPCNL').addClass("pb-4");
            $.ajax({
                type: "GET",
                url: "/PhanCongNhomLop/ThemPhanCongNhomLop",
                data: { BangPhanCongID: $('#bangpc').val(), KhoaID: $('#khoaid').val() },
                success: function (response) {
                    $('#panelThemPCNL').html(response);
                },
            });
        });
    }

    function loadPhanCongNhomLop() {
        initPhanCongNhomLopDataTable();
    }

    function initPhanCongNhomLopDataTable() {
        $PhanCongNhomLopTable = $("#phanCongNhomLop-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: PhanCongNhomLopUrl,
                data: {
                    BangPhanCongID: $('#bangpc').val(), KhoaID: $('#khoaid').val()
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#PhanCongNhomLop-container");
                },
                complete: function () {
                    hideLoadingOverlay("#PhanCongNhomLop-container");
                    //initRoleNhanVien();
                }
            },

            columns: [
                { data: "STT" },
                { data: "MaHP" },
                { data: "TenHocPhan" },
                { data: "SoLuongNhomLopLT" },
                { data: "SoLuongNhomLopTH" },
                { data: "SoLuongConLaiLT" },
                { data: "SoLuongConLaiTH" },
                {
                    data: "PhanCongNhomLopID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/SuaPhanCongNhomLop?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/XoaPhanCongNhomLop?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/ChiTietPhanCongNhomLop?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#phanCongNhomLop-table_filter').hide();

    }
    function timKiem() {
        $('#PhanCongNhomLop-search').keyup(function () {
            $PhanCongNhomLopTable.search($(this).val()).draw();
        });
    }



    function reloadPhanCongNhomLopTable() {
        $PhanCongNhomLopTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadPhanCongNhomLopTable: reloadPhanCongNhomLopTable,
        loadPhanCongNhomLop: loadPhanCongNhomLop
    }
})();

var ThemPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {
    var lt = 0, th = 0;
    function init() {
        hideThemPanel();
        setNumber();
        bindFormActions();
        $(document).ready(function () {
            $('.hocphansl2t').select2();
        });
    }
    
    function hideThemPanel() {
        $('#btn_hide').click(function () {
            $('#panelThemPCNL').removeClass("pb-4");
            $('#panelThemPCNL').html("");
            $('#Them_panel').hide();
            $('#btnThemPhanCongNhomLop').removeClass("add-disabled");
        });
    }

    function setNumber() {
        $('#tHocPhanLogID').change(function () {
            $('#tenhpfor-em').val($("#tHocPhanLogID option:selected").text());
            //$("#tsotietltddl > option").each(function () {
            //    if ($(this).val() == $('#tHocPhanLogID').val()) {
            //        var x = parseInt($(this).text());
            //        if (x > 0) {
            //            lt = 1;
            //            $('#tSoLuongNhomLopLT').attr("readonly", false);
            //        }
            //        else {
            //            lt = 0;
            //            $('#tSoLuongNhomLopLT').val(0);
            //            $('#tSoLuongNhomLopLT').attr("readonly", true);
            //        }                    
            //    }                
            //});
            $("#tsotietthddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    var x = parseInt($(this).text());
                    if (x > 0) {
                        th = 1;
                        $('#tSoLuongNhomLopTH').attr("readonly", false);
                    }
                    else {
                        th = 0;
                        $('#tSoLuongNhomLopTH').val(0);
                        $('#tSoLuongNhomLopTH').attr("readonly", true);
                    }                    
                }
            });
            $("#tsotinchiddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    $('#tSoTinChi').val($(this).text());
                }
            });
            $("#tsotietddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    $('#tSoTiet').val($(this).text());
                }
            });
            $("#tbomonddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    $('#tBoMon').val($(this).text());
                }
            });
        });
        
    }

    function bindFormActions() {
        $("#btn_themPhanCongNhomLop").on("click",
            function () {
                if ($("#formThemPhanCongNhomLop").valid()) {
                    showLoadingOverlay("#panelThemPCNL");
                    $.ajax({
                        type: $("#formThemPhanCongNhomLop").prop("method"),
                        url: $("#formThemPhanCongNhomLop").prop("action"),
                        data: $("#formThemPhanCongNhomLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $('#panelThemPCNL').html(response);
                            } else {
                                PhanCongNhomLopModule.reloadPhanCongNhomLopTable();
                                $.notify({ message: response.Messages }, { type: "success" });
                                lt = 0;
                                th = 0;
                                $('.field-validation-error').hide();
                                $('.field-validation-error').addClass('field-validation-valid');
                                $('.field-validation-error').removeClass('field-validation-error');
                                $('.input-validation-error').removeClass('input-validation-error');
                                $("#formThemPhanCongNhomLop").trigger("reset");
                                $('.hocphansl2t').select2();
                            }
                        },
                        complete: function () {
                            hideLoadingOverlay("#panelThemPCNL");
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init
    }
})(PhanCongNhomLopModule);

var SuaPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {
    var lt = 0, th = 0;
    function init() {
        setNumber();
        bindFormActions();
        $('#HocPhanLogID').change();
        $(document).ready(function () {
            $('.hocphansl2s').select2();
        });
    }

    function setNumber() {
        $('#HocPhanLogID').change(function () {
            //$("#sotietltddl > option").each(function () {
            //    if ($(this).val() == $('#HocPhanLogID').val()) {
            //        var x = parseInt($(this).text());
            //        if (x > 0) {
            //            lt = 1;
            //            $('#SoLuongNhomLopLT').attr("readonly", false);
            //        }
            //        else {
            //            lt = 0;
            //            $('#SoLuongNhomLopLT').val(0);
            //            $('#SoLuongNhomLopLT').attr("readonly", true);
            //        }                    
            //    }
            //});
            $("#sotietthddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    var x = parseInt($(this).text());
                    if (x > 0) {
                        th = 1;
                        $('#SoLuongNhomLopTH').attr("readonly", false);
                    }
                    else {
                        th = 0;
                        $('#SoLuongNhomLopTH').val(0);
                        $('#SoLuongNhomLopTH').attr("readonly", true);
                    }                    
                }
            });
            $("#sotinchiddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    $('#SoTinChi').val($(this).text());
                }
            });
            $("#sotietddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    $('#SoTiet').val($(this).text());
                }
            });
            $("#bomonddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    $('#BoMon').val($(this).text());
                }
            });
        });

    }

    function bindFormActions() {
        $("#btn_suaPhanCongNhomLop").on("click",
            function () {
                if ($("#formSuaPhanCongNhomLop").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaPhanCongNhomLop").prop("method"),
                        url: $("#formSuaPhanCongNhomLop").prop("action"),
                        data: $("#formSuaPhanCongNhomLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                PhanCongNhomLopModule.reloadPhanCongNhomLopTable();
                                $.notify({ message: response.Messages }, { type: "success" });

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
})(PhanCongNhomLopModule);

var XoaPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {
    var $formXoaPhanCongNhomLop;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-PhanCongNhomLop-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaPhanCongNhomLop").prop("method"),
                    url: $("#formXoaPhanCongNhomLop").prop("action"),
                    data: $("#formXoaPhanCongNhomLop").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            PhanCongNhomLopModule.reloadPhanCongNhomLopTable();
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
})(PhanCongNhomLopModule);


var CheDoXemPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {

    function init() {
        PhanCongNhomLopModule.loadPhanCongNhomLop();
        bindFormActions();
    }

    function bindFormActions() {
        $("#CheDoXem").change(function () {
            var tg = $(this).val();
            if (tg == 0) {
                $('.chedo0').removeClass("d-none");
                $('.chedo1').addClass("d-none");
            }
            else {
                $('.chedo1').removeClass("d-none");
                $('.chedo0').addClass("d-none");
            }
        });            
    }



    return {
        init: init
    }
})(PhanCongNhomLopModule);
