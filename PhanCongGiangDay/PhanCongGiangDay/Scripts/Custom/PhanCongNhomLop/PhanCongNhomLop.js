
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
                    Checkrole();
                    disabled_auto();
                }
            },

            columns: [
                { data: "STT" },
                { data: "MaHP" },
                { data: "TenHocPhan", className: "custom-wrap" },
                { data: "TenCTDT" },
                { data: "HocKi" },
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

    function Checkrole() {
        if ($('#role').val() < 2) {
            $(".btn-grid").addClass("edit-disabled");
            $("#btnThemPhanCongNhomLop").addClass("add-disabled");
            $("#btnPhanCongNhomLopTuDong").addClass("add-disabled");
        }
    }

    function disabled_auto() {
        if ($PhanCongNhomLopTable.data().count() > 0)
            $('#btnPhanCongNhomLopTuDong').addClass("add-disabled");
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

var PhanCongNhomLopTuDongModule = (function (PhanCongNhomLopModule) {
    function init() {
        AddRowNhomLop();
        setSLNhom();
        setSLSV();
    }

    function AddRowNhomLop() {
        $('.button-edit-nl').on('click', function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tnl") != -1) {
                $(this).addClass("d-none");
                $('#xnl_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/PhanCongNhomLop/ThemPhanCongNhomLopTuDong",
                    data: { BangPhanCongID: $('#bangpc').val(), i: i },
                    success: function (response) {
                        $('#row_' + i).after(response);
                    }
                });
            }
            else {
                $('#row_' + i).hide();
                $('#trangthainl_' + i).val("-1");
            }
        });
    }

    function AddRowNhomLopPartial() {
        $('.button-edit-nl-partial').on('click', function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tnl") != -1) {
                $(this).addClass("d-none");
                $('#xnl_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/PhanCongNhomLop/ThemPhanCongNhomLopTuDong",
                    data: { BangPhanCongID: $('#bangpc').val(), i: i },
                    success: function (response) {
                        $('#row_' + i).after(response);
                    }
                });
            }
            else {
                $('#row_' + i).hide();
                $('#trangthainl_' + i).val("-1");
            }
        });
    }

    function setNumber() {
        $('.nhomlopddl').change(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length)); 
            $("#sotietltddl > option").each(function () {
                if ($(this).val() == $('#'+id).val()) {
                    var x = parseInt($(this).text());
                    $('#SoTietLT_' + i).val(x);
                }
            });
            $("#sotietthddl > option").each(function () {
                if ($(this).val() == $('#' + id).val()) {
                    var x = parseInt($(this).text());
                    $('#SoTietTH_' + i).val(x);
                }
            });
            $("#sotinchiddl > option").each(function () {
                if ($(this).val() == $('#' + id).val()) {
                    $('#SoTC_'+i).val($(this).text());
                }
            });
            if ($('#' + id).val() != null || $('#' + id).val() != "") {
                $('#SoLuongNhomLopLT_' + i).attr("disabled", false);
            }
            $("#tuchonddl > option").each(function () {
                if ($(this).val() == $('#' + id).val()) {
                    $('#tuchon_' + i).val($(this).text());
                }
            });
        });

    }

    function enableSLSV() {
        $('.khoaddl').change(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length)); 
            if ($(this).val() != null || $(this).val() != "") {
                $('#SLSVNhomLop_' + i).attr("disabled", false);
            }
            $("#svkhoaddl > option").each(function () {
                if ($(this).val() == $('#' + id).val()) {
                    $('#slsvkhoa_' + i).val($(this).text());
                    $('#' + id).attr("title", $(this).text());
                }
            }); 
            $("#cnkhoaddl > option").each(function () {
                if ($(this).val() == $('#' + id).val()) {
                    $('#slcn_' + i).val($(this).text());
                }
            }); 
        });
    }

    function setSLNhom() {
        $(document).ready(function () {
            $(document).on("keyup", ".slnl", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.length));
                if ($('#SoTietTH_' + i).val() != 0) {
                    $('#SoLuongNhomLopTH_' + i).val($('#' + id).val());
                }
            });
        });
    }
    
    function setSLSV() {
        $(document).ready(function () {
            $(document).on("keyup", ".slsvnl", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.length));
                var slsv = ~~parseInt($(this).val());
                var str = $('#slsvkhoa_' + i).val();
                if (str.search(":")!=-1) {
                    str = str.substring(str.search(":") + 2, str.search(";"));
                }
                var sl = ~~parseInt(str);
                if ($('#tuchon_' + i).val() == 1) {
                    var cn = ~~parseInt($('#slcn_' + i).val());
                    if (cn < 1) {
                        cn = 1;
                    }
                    $('#SoLuongNhomLopLT_' + i).val(~~parseInt(sl / cn / slsv));
                    $('#SoLuongNhomLopTH_' + i).val(~~parseInt(sl / cn / slsv));
                }
                else {
                    $('#SoLuongNhomLopLT_' + i).val(~~parseInt(sl / slsv));
                    $('#SoLuongNhomLopTH_' + i).val(~~parseInt(sl / slsv));
                }
            });
        });
    }


    return {
        init: init,
        AddRowNhomLopPartial: AddRowNhomLopPartial,
        setNumber: setNumber,
        setSLNhom: setSLNhom,
        enableSLSV: enableSLSV

    }
})(PhanCongNhomLopModule);