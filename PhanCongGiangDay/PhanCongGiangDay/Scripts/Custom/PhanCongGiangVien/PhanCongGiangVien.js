﻿
var PhanCongGiangVienModule = (function () {
    var $PhanCongGiangVienTable;    
    var PhanCongGiangVienUrl = "/PhanCongGiangVien/DanhSachGiangVien";
    var PhanCongNhomLopUrl = "/PhanCongGiangVien/DanhSachNhomLop";

    function init() {
        loadPhanCongNhomLop();
        loadPhanCongGiangVien();
        BoMonChange();
        loadLoai();
    }


    function loadPhanCongGiangVien() {
        initPhanCongGiangVienDataTable();
    }

    function initPhanCongGiangVienDataTable() {
        $PhanCongGiangVienTable = $("#phanCongGiangVien-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: PhanCongGiangVienUrl,
                data: {
                    NamHoc: $('#bangpc').val(), Loc: $('#Loc').val()
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#PhanCongGiangVien-container");
                },
                complete: function () {
                    hideLoadingOverlay("#PhanCongGiangVien-container");
                    Checkrole();
                }
            },            
            columns: [
                { data: "STT" },
                { data: "HoTenGV" },
                {
                    data: "TongSoTiet", createdCell: function (td, data) {
                        if (data > 500) {
                            $(td).css('color', 'red');
                        }
                    }
                },
                {
                    data: "SoTietCongTac", createdCell: function (td, data) {
                        if (data > 500) {
                            $(td).css('color', 'red');
                        }
                    }
                },
                {
                    data: "SoTietThucTe", createdCell: function (td,data) {
                        if (data > 500) {
                            $(td).css('color', 'red');
                        }
                    }
                },
                {
                    data: "GiangVienLogID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalPhanCong" data-url="/PhanCongGiangVien/ChiTietPhanCongCuaGiangVien?BangPhanCongID=' + $('#bangpc').val() + '&GiangVienID=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modalPhanCong" data-url="/PhanCongGiangVien/CapNhatPhanCongGiangVien?BangPhanCongID=' + $('#bangpc').val() + '&GiangVienID=' + data + '"><i class="fa fa-pencil-square-o"></i></button>';
                    }
                }
            ]            
        });
        $('#phanCongGiangVien-table_filter').hide();

    }
    function timKiem() {
        $('#PhanCongGiangVien-search').keyup(function () {
            $PhanCongGiangVienTable.search($(this).val()).draw();
        });
    }
    function loadLoai() {
        $('#Loc').change(function () {
            $PhanCongGiangVienTable.destroy();
            initPhanCongGiangVienDataTable();
        });
    }

    function Checkrole() {
        if ($('#role').val() < 2) {
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadPhanCongGiangVienTable() {
        $PhanCongGiangVienTable.ajax.reload();
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
                    NamHoc: $('#bangpc').val(), BoMonID: $('#BoMonID').val()
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#PhanCongNhomLop-container");
                },
                complete: function () {
                    hideLoadingOverlay("#PhanCongNhomLop-container");
                }
            },

            columns: [
                { data: "STT" },
                { data: "MaHP" },
                { data: "TenHocPhan", className:"custom-wrap" },
                { data: "TenCTDT" },
                { data: "HocKi" },
                { data: "SoLuongNhomLopLT" },
                { data: "SoLuongNhomLopTH" },
                { data: "SoLuongConLaiLT" },
                { data: "SoLuongConLaiTH" },
                {
                    data: "PhanCongNhomLopID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalLarge" data-url="/PhanCongGiangVien/ChiTietPhanCongCuaGiangVien?BangPhanCongID=' + $('#bangpc').val() + '&PhanCongNhomLopID=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modalLarge" data-url="/PhanCongGiangVien/CapNhatPhanCongGiangVienNhomLop?BangPhanCongID=' + $('#bangpc').val() + '&PhanCongNhomLopID=' + data + '"><i class="fa fa-pencil-square-o"></i></button>';
                            //'<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/XoaPhanCongNhomLop?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/ChiTietPhanCongNhomLop?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#phanCongNhomLop-table_filter').hide();

    }
    function timKiemNL() {
        $('#PhanCongNhomLop-search').keyup(function () {
            $PhanCongNhomLopTable.search($(this).val()).draw();
        });
    }

    function reloadPhanCongNhomLopTable() {
        $PhanCongNhomLopTable.ajax.reload();

    }

    function BoMonChange() {
        $('#BoMonID').change(function () {
            $PhanCongNhomLopTable.destroy();
            initPhanCongNhomLopDataTable();
        });
    }

    function displayPC() {
        $('#hienthiddl').change(function () {
            if ($(this).val() == 1) {
                $('#gv_area').removeClass("d-none");
                $('#nl_area').addClass("d-none");
            }
            else {
                $('#gv_area').addClass("d-none");
                $('#nl_area').removeClass("d-none");
            }
        });
    }

    return {
        init: init,
        timKiem: timKiem,
        timKiemNL: timKiemNL,
        displayPC: displayPC,
        reloadPhanCongNhomLopTable: reloadPhanCongNhomLopTable,
        reloadPhanCongGiangVienTable: reloadPhanCongGiangVienTable
    }
})();

var CapNhatPhanCongGiangVienModule = (function (PhanCongGiangVienModule) {
    var lt = 0, th = 0;
    function init() {
        bindFormActions();
        setNumber();
        AddRowNhomLop();
        AddRowCongTac();
        disableOption();
        $(document).ready(function () {
            $('.nhomlopddl').select2();
            $('.congtackhacddl').select2();
        });
        SelectedValueNhomLop();
        SelectedValueCongTac();
        sumAll();
        checkValid();        
    }

    function disableOption() {
        $('.nhomlop-row').each(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            $("#nhomlop_" + i + " > option").each(function () {
                var valx = $(this).val();
                if (valx != null && valx != "") {
                    var cl = 0;
                    $("#sotietltclddl > option").each(function () {
                        if ($(this).val() == valx) {
                            var x = parseInt($(this).text());
                            cl = x;
                        }
                    });
                    if (cl == 0) {
                        $("#sotietthclddl > option").each(function () {
                            if ($(this).val() == valx) {
                                var x = parseInt($(this).text());
                                cl = cl + x;
                            }
                        });
                        if (cl == 0) {
                            $(this).text($(this).text() + " (Hết)");
                        }
                    }       
                }      
            });
            i++;
        });
    }

    function disableOptionnew(i) {
        $("#nhomlop_" + i + " > option").each(function () {
            var valx = $(this).val();
            if (valx != null && valx != "") {
                var cl = 0;
                $("#sotietltclddl > option").each(function () {
                    if ($(this).val() == valx) {
                        var x = parseInt($(this).text());
                        cl = x;
                    }
                });
                if (cl == 0) {
                    $("#sotietthclddl > option").each(function () {
                        if ($(this).val() == valx) {
                            var x = parseInt($(this).text());
                            cl = cl + x;
                        }
                    });
                    if (cl == 0) {
                        $(this).text($(this).text() + " (Hết)");
                    }
                }
            }
        });
    }

    function SelectedValueNhomLop() {
        $(".nhomlop-row").each(function () {
            var hidden = $(this).find(".pcnlHidden").val();
            var $nhomlop = $(this).find(".nhomlopddl");
            $nhomlop.val(hidden);
        });
    }

    function SelectedValueCongTac() {
        $(".congtac-row").each(function () {
            var hidden = $(this).find(".pcctHidden").val();
            var $congtac = $(this).find(".congtackhacddl");
            $congtac.val(hidden);
        });
    }

    function setNumber() {
        $(document).ready(function () {
            $(document).on('change', '.nhomlopddl', function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.length));
                $("#sotietltddl > option").each(function () {
                    if ($(this).val() == $("#" + id).val()) {
                        var x = parseInt($(this).text());
                        $("#NhomLopPhanCong_" + i + "__SoTietLT").val(x);
                        
                    }
                });
                $("#sotietthddl > option").each(function () {
                    if ($(this).val() == $("#" + id).val()) {
                        var x = parseInt($(this).text());
                        $("#NhomLopPhanCong_" + i + "__SoTietTH").val(x);
                        if (x == 0) {
                            
                            $("#NhomLopPhanCong_" + i + "__HK1TH").attr("readonly", true);
                            $("#NhomLopPhanCong_" + i + "__HK2TH").attr("readonly", true);
                        }
                        else {
                            $("#NhomLopPhanCong_" + i + "__HK1TH").attr("readonly", false);
                            $("#NhomLopPhanCong_" + i + "__HK2TH").attr("readonly", false);
                        }
                    }
                });
                $("#sotietltclddl > option").each(function () {
                    if ($(this).val() == $("#" + id).val()) {
                        var x = parseInt($(this).text());
                        $("#NhomLopPhanCong_" + i + "__SoLuongConLaiLT").val(x);
                    }
                });
                $("#sotietthclddl > option").each(function () {
                    if ($(this).val() == $("#" + id).val()) {
                        var x = parseInt($(this).text());
                        $("#NhomLopPhanCong_" + i + "__SoLuongConLaiTH").val(x);
                    }
                });
                $("#bomonddl > option").each(function () {
                    if ($(this).val() == $("#" + id).val()) {
                        var x = $(this).text();
                        $("#NhomLopPhanCong_" + i + "__TenBoMon").val(x);
                    }
                });
                $("#NhomLopPhanCong_" + i + "__HK1LT").val(0);
                $("#NhomLopPhanCong_" + i + "__HK2LT").val(0);
                $("#NhomLopPhanCong_" + i + "__HK1TH").val(0);
                $("#NhomLopPhanCong_" + i + "__HK2TH").val(0);
                var stlt = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietLT").val());
                var stth = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietTH").val()) / 2;
                $("#NhomLopPhanCong_" + i + "__SoTiet").val(stlt + stth);
            });
        });        
    }

    function checkValid() {
        $(document).ready(function () {
            $(document).on('keyup', '.lythuyet', function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                var lt = ~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val()) - (~~parseInt($("#hidden_HK1LT_" + i).val()) + ~~parseInt($("#hidden_HK2LT_" + i).val()));
                if (lt > ~~parseInt($("#NhomLopPhanCong_" + i + "__SoLuongConLaiLT").val())) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('td').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.');
                }
                else {
                    $("#" + id).removeClass("input-validation-error");
                    var $valmess = $("#" + id).closest('td').find(".field-validation-error");
                    $valmess.addClass("field-validation-valid").removeClass("field-validation-error");
                    $valmess.text("");
                }
            });
            $(document).on('keyup', '.thuchanh', function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                var th = ~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val()) - (~~parseInt($("#hidden_HK1TH_" + i).val()) + ~~parseInt($("#hidden_HK2TH_" + i).val()));
                if (th > ~~parseInt($("#NhomLopPhanCong_" + i + "__SoLuongConLaiTH").val())) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('td').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.');
                }
                else {
                    $("#" + id).removeClass("input-validation-error");
                    var $valmess = $("#" + id).closest('td').find(".field-validation-error");
                    $valmess.addClass("field-validation-valid").removeClass("field-validation-error");
                    $valmess.text("");
                }
            });
        });
    }

    function sumAll() {
        $(document).ready(function () {
            $(document).on("keyup", ".lythuyet", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                if (id.search("HK1LT") != -1 && $('#NhomLopPhanCong_' + i + '__SoTietTH').val()!=0) {
                    $("#NhomLopPhanCong_" + i + "__HK1TH").val($(this).val());
                }
                else if (id.search("HK2LT") != -1 && $('#NhomLopPhanCong_' + i + '__SoTietTH').val() != 0) {
                    $("#NhomLopPhanCong_" + i + "__HK2TH").val($(this).val());
                }
                var stlt = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietLT").val());
                var stth = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietTH").val()) / 2;
                $("#NhomLopPhanCongSoTiet_" + i).val(stlt + stth);

                var sumst = 0;
                $(".nhomlop-row").each(function () {
                    var hidden = $(this).find(".sotietSum").val();
                    sumst = parseInt(hidden) + sumst;
                });
                $('#tongsotiet').text(sumst);
                $('#sotietthucte').text(sumst + parseInt($('#sotietcongtac').text()));
            });
            $(document).on("keyup", ".thuchanh", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));                
                var stlt = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietLT").val());
                var stth = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietTH").val()) / 2;
                $("#NhomLopPhanCongSoTiet_" + i).val(stlt + stth);

                var sumst = 0;
                $(".nhomlop-row").each(function () {
                    var hidden = $(this).find(".sotietSum").val();
                    sumst = parseInt(hidden) + sumst;
                });                
                $('#tongsotiet').text(sumst);
                $('#sotietthucte').text(sumst + parseInt($('#sotietcongtac').text()));
            });
            $(document).on("change", ".congtackhacddl", function () {
                var sumct = 0;
                $(".congtac-row").each(function () {
                    var hidden = $(this).find(".congtackhacddl").val();
                    $("#sotietctddl > option").each(function () {
                        if ($(this).val() == hidden) {
                            sumct = sumct + parseInt($(this).text());
                        }
                    });
                });
                $('#sotietcongtac').text(sumct);
                $('#sotietthucte').text(parseInt($('#tongsotiet').text()) + sumct);
            });
        });
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
                    url: "/PhanCongGiangVien/ThemPhanCongGiangVien",
                    data: { BangPhanCongID: $('#NamHocHidden').val(), GiangVienID: $('#GiangVienHidden').val(), i: i },
                    success: function (response) {
                        $('#row_' + i).after(response);
                    }
                });
            }
            else {
                $('#row_' + i).hide();
                $('#trangthainhomlop_' + i).val("-1");
                $('#row_' + i).removeClass("nhomlop-row");
                var newv = 0;
                $(".nhomlop-row").each(function () {
                    var hidden = $(this).find(".sotietSum").val();
                    newv = parseInt(hidden) + newv;
                });
                var oldv = parseInt($('#tongsotiet').text());
                $('#tongsotiet').text(newv);
                var sttt = parseInt($('#sotietthucte').text());
                $('#sotietthucte').text(sttt - oldv + newv);
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
                    url: "/PhanCongGiangVien/ThemPhanCongGiangVien",
                    data: { BangPhanCongID: $('#NamHocHidden').val(), GiangVienID: $('#GiangVienHidden').val(), i: i },
                    success: function (response) {
                        $('#row_' + i).after(response);
                    }
                });
            }
            else {
                $('#row_' + i).hide();
                $('#trangthainhomlop_' + i).val("-1");
                $('#row_' + i).removeClass("nhomlop-row");
                var newv = 0;
                $(".nhomlop-row").each(function () {
                    var hidden = $(this).find(".sotietSum").val();
                    newv = parseInt(hidden) + newv;
                });
                var oldv = parseInt($('#tongsotiet').text());
                $('#tongsotiet').text(newv);
                var sttt = parseInt($('#sotietthucte').text());
                $('#sotietthucte').text(sttt - oldv + newv);
            }
        });
    }

    function AddRowCongTac() {
        $('.button-edit-ct').on('click', function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tct") != -1) {
                $(this).addClass("d-none");
                $('#xct_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/PhanCongGiangVien/ThemPhanCongCongTac",
                    data: { BangPhanCongID: $('#NamHocHidden').val(), GiangVienID: $('#GiangVienHidden').val(), i: i },
                    success: function (response) {
                        $('#rowct_' + i).after(response);
                    }
                });
            }
            else {
                $('#rowct_' + i).hide();
                $('#trangthaicongtac_' + i).val("-1");
                $('#rowct_' + i).removeClass("congtac-row");
                var sumct = 0;
                $(".congtac-row").each(function () {
                    var hidden = $(this).find(".congtackhacddl").val();
                    $("#sotietctddl > option").each(function () {
                        if ($(this).val() == hidden) {
                            sumct = sumct + parseInt($(this).text());
                        }
                    });
                });
                $('#sotietcongtac').text(sumct);
                $('#sotietthucte').text(parseInt($('#tongsotiet').text()) + sumct);
            }
        }); 
    }


    function AddRowCongTacPartial() {
        $('.button-edit-ct-partial').on('click', function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tct") != -1) {
                $(this).addClass("d-none");
                $('#xct_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/PhanCongGiangVien/ThemPhanCongCongTac",
                    data: { BangPhanCongID: $('#NamHocHidden').val(), GiangVienID: $('#GiangVienHidden').val(), i: i },
                    success: function (response) {
                        $('#rowct_' + i).after(response);
                    }
                });
            }
            else {
                $('#rowct_' + i).hide();
                $('#trangthaicongtac_' + i).val("-1");
                $('#rowct_' + i).removeClass("congtac-row");
                var sumct = 0;
                $(".congtac-row").each(function () {
                    var hidden = $(this).find(".congtackhacddl").val();
                    $("#sotietctddl > option").each(function () {
                        if ($(this).val() == hidden) {
                            sumct = sumct + parseInt($(this).text());
                        }
                    });
                });
                $('#sotietcongtac').text(sumct);
                $('#sotietthucte').text(parseInt($('#tongsotiet').text()) + sumct);
            }
        });
    }

    function bindFormActions() {
        $("#btn_CapNhatPhanCongGiangVien").on("click",
            function () {
                if ($("#formCapNhatPhanCongGiangVien").valid()) {
                    $.ajax({
                        type: $("#formCapNhatPhanCongGiangVien").prop("method"),
                        url: $("#formCapNhatPhanCongGiangVien").prop("action"),
                        data: $("#formCapNhatPhanCongGiangVien").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $("#modalPhanCong").modal("hide");
                            PhanCongGiangVienModule.reloadPhanCongGiangVienTable();
                            PhanCongGiangVienModule.reloadPhanCongNhomLopTable();
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init,
        AddRowNhomLopPartial: AddRowNhomLopPartial,
        AddRowCongTacPartial: AddRowCongTacPartial,
        disableOptionnew: disableOptionnew
    }
})(PhanCongGiangVienModule);


var CapNhatPhanCongGiangVienNhomLopModule = (function (PhanCongGiangVienModule) {

    function init() {
        bindFormActions();
        AddRowGiangVien();
        $(document).ready(function () {
            $('.gvddl').select2();
        });
        SelectedValueGiangVien();
        sumAll();
        setNumber();
        disableNumber();
    }

    
    function SelectedValueGiangVien() {
        $(".row-gv").each(function () {
            var hidden = $(this).find(".gv-hidden-val").val();
            var $nhomlop = $(this).find(".gvddl");
            $nhomlop.val(hidden);
        });
    }
    
    function sumAll() {
        $(document).ready(function () {
            $(document).on("keyup", ".lythuyet", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                var stlt = (~~parseInt($("#GiangVienPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#GiangVienPhanCong_" + i + "__HK2LT").val())) * ~~parseInt($("#SoTietLT").val());
                var stth = (~~parseInt($("#GiangVienPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#GiangVienPhanCong_" + i + "__HK2TH").val())) * ~~parseInt($("#SoTietTH").val()) / 2;
                $("#GiangVienPhanCongSoTiet_" + i).val(stlt + stth);                
            });
            $(document).on("keyup", ".thuchanh", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                var stlt = (~~parseInt($("#GiangVienPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#GiangVienPhanCong_" + i + "__HK2LT").val())) * ~~parseInt($("#SoTietLT").val());
                var stth = (~~parseInt($("#GiangVienPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#GiangVienPhanCong_" + i + "__HK2TH").val())) * ~~parseInt($("#SoTietTH").val()) / 2;
                $("#GiangVienPhanCongSoTiet_" + i).val(stlt + stth);
            });            
        });
    }

    function setNumber() {
        $(document).ready(function () {
            $(document).on("keyup", ".lythuyet", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                if (id.search("HK1LT") != -1 && ~~parseInt($('#sotiettht').text()) > 0) {
                    $("#GiangVienPhanCong_" + i + "__HK1TH").val($(this).val());
                }
                else if (id.search("HK2LT") != -1 && ~~parseInt($('#sotiettht').text()) > 0) {
                    $("#GiangVienPhanCong_" + i + "__HK2TH").val($(this).val());
                }
                var tlt = 0;
                $(".row-gv").each(function () {
                    tlt = tlt + ~~parseInt($(this).find(".hk1lt").val()) + ~~parseInt($(this).find(".hk2lt").val());
                });
                $('#sotietcllt').text(~~parseInt($('#SoLuongNhomLopLT').val()) - tlt);
                if ((~~parseInt($('#SoLuongNhomLopTH').val()) - tlt)<0) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.');
                }
                else {
                    $("#" + id).removeClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-error");
                    $valmess.addClass("field-validation-valid").removeClass("field-validation-error");
                    $valmess.text("");
                }
                var tth = 0;
                $(".row-gv").each(function () {
                    tth = tth + ~~parseInt($(this).find(".hk1th").val()) + ~~parseInt($(this).find(".hk2th").val());
                });
                $('#sotietclth').text(~~parseInt($('#SoLuongNhomLopLT').val()) - tth);
                if ((~~parseInt($('#SoLuongNhomLopTH').val()) - tth) < 0) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.');
                }
                else {
                    $("#" + id).removeClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-error");
                    $valmess.addClass("field-validation-valid").removeClass("field-validation-error");
                    $valmess.text("");
                }
            });
            $(document).on("keyup", ".thuchanh", function () {
                var id = $(this).attr('id');                
                var tth = 0;
                $(".row-gv").each(function () {
                    tth = tth + ~~parseInt($(this).find(".hk1th").val()) + ~~parseInt($(this).find(".hk2th").val());
                });
                $('#sotietclth').text(~~parseInt($('#SoLuongNhomLopLT').val()) - tth);
                if ((~~parseInt($('#SoLuongNhomLopTH').val()) - tth) < 0) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.');
                }
                else {
                    $("#" + id).removeClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-error");
                    $valmess.addClass("field-validation-valid").removeClass("field-validation-error");
                    $valmess.text("");
                }

                var tlt = 0;
                $(".row-gv").each(function () {
                    tlt = tlt + ~~parseInt($(this).find(".hk1lt").val()) + ~~parseInt($(this).find(".hk2lt").val());
                });
                $('#sotietcllt').text(~~parseInt($('#SoLuongNhomLopLT').val()) - tlt);
                if ((~~parseInt($('#SoLuongNhomLopTH').val()) - tlt) < 0) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.');
                }
                else {
                    $("#" + id).removeClass("input-validation-error");
                    var $valmess = $("#" + id).closest('div').find(".field-validation-error");
                    $valmess.addClass("field-validation-valid").removeClass("field-validation-error");
                    $valmess.text("");
                }
            });
        });

    }

    function AddRowGiangVien() {
        $('.button-edit-gv').on('click', function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tgv") != -1) {
                $(this).addClass("d-none");
                $('#xgv_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/PhanCongGiangVien/ThemPhanCongGiangVienNhomLop",
                    data: { BangPhanCongID: $('#NamHocHidden').val(), i: i },
                    success: function (response) {
                        $('#gv_' + i).after(response);
                    }
                });
            }
            else {
                $('#gv_' + i).hide();
                $('#trangthaigv_' + i).val("-1");
                $('#gv_' + i).removeClass("row-gv");
                
                
            }
        });
    }

    function AddRowGiangVienPartial() {
        $('.button-edit-gv-partial').on('click', function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));
            if (id.search("tgv") != -1) {
                $(this).addClass("d-none");
                $('#xgv_' + i).removeClass("d-none");
                $.ajax({
                    type: "GET",
                    url: "/PhanCongGiangVien/ThemPhanCongGiangVienNhomLop",
                    data: { BangPhanCongID: $('#NamHocHidden').val(), i: i },
                    success: function (response) {
                        $('#gv_' + i).after(response);
                    }
                });
            }
            else {
                $('#gv_' + i).hide();
                $('#trangthaigv_' + i).val("-1");
                $('#gv_' + i).removeClass("row-gv");
                
            }
        });
    }

    function bindFormActions() {
        $("#btn_CapNhatPhanCongGiangVienNhomLop").on("click",
            function () {
                if ($("#formCapNhatPhanCongGiangVienNhomLop").valid()) {
                    $.ajax({
                        type: $("#formCapNhatPhanCongGiangVienNhomLop").prop("method"),
                        url: $("#formCapNhatPhanCongGiangVienNhomLop").prop("action"),
                        data: $("#formCapNhatPhanCongGiangVienNhomLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $("#modalLarge").modal("hide");
                            PhanCongGiangVienModule.reloadPhanCongNhomLopTable();
                            PhanCongGiangVienModule.reloadPhanCongGiangVienTable();
                        }
                    });
                }
                return false;
            });
    }

    function disableNumber() {
        $(document).ready(function () {
            if ($('#SoTietTH').val() == 0)
                $('.thuchanh').attr("readonly", true);
        });
    }

    return {
        init: init,
        AddRowGiangVienPartial: AddRowGiangVienPartial,
        disableNumber: disableNumber
    }
})(PhanCongGiangVienModule);
