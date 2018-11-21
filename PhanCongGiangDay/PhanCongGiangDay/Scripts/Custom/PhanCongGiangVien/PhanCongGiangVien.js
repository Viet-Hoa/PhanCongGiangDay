
var PhanCongGiangVienModule = (function () {
    var $PhanCongGiangVienTable;    
    var PhanCongGiangVienUrl = "/PhanCongGiangVien/DanhSachGiangVien";

    function init() {
        loadPhanCongGiangVien();
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
                    //initRoleNhanVien();
                }
            },

            columns: [
                { data: "STT" },
                { data: "HoTenGV" },
                { data: "TongSoTiet" },
                { data: "SoTietThucTe" },
                {
                    data: "GiangVienLogID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modalPhanCong" data-url="/PhanCongGiangVien/ChiTietPhanCongGiangVien?BangPhanCongID=' + $('#bangpc').val() + '&GiangVienID=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
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

    function reloadPhanCongGiangVienTable() {
        $PhanCongGiangVienTable.ajax.reload();
    }

    return {
        init: init,
        timKiem: timKiem,
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
        SelectedValueNhomLop();
        SelectedValueCongTac();
        sumAll();
        checkValid();
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
                var lt = ~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val());
                if (lt > ~~parseInt($("#NhomLopPhanCong_" + i + "SoLuongConLaiLT").val())) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('td').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.')
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
                var th = ~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val());
                if (th > ~~parseInt($("#NhomLopPhanCong_" + i + "SoLuongConLaiTH").val())) {
                    $("#" + id).addClass("input-validation-error");
                    var $valmess = $("#" + id).closest('td').find(".field-validation-valid");
                    $valmess.addClass("field-validation-error").removeClass("field-validation-valid");
                    $valmess.text('Đã nhập quá số lượng còn lại.')
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
                var stlt = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietLT").val());
                var stth = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietTH").val()) / 2;
                $("#NhomLopPhanCongSoTiet_" + i).val(stlt + stth);

                var sumst = 0, sumct = 0;
                $(".nhomlop-row").each(function () {
                    var hidden = $(this).find(".sotietSum").val();
                    sumst = parseInt(hidden) + sumst;
                });
                if ($('.congtac-row')[0]) {
                    $(".congtac-row").each(function () {
                        var hidden = $(this).find(".congtackhacddl").val();
                        $("#sotietctddl > option").each(function () {
                            if ($(this).val() == hidden) {
                                sumct = sumct + parseInt($(this).text());
                            }
                        });
                    });
                }
                $('#tongsotiet').text(sumst);
                $('#sotietthucte').text(sumst + sumct);
            });
            $(document).on("keyup", ".thuchanh", function () {
                var id = $(this).attr('id');
                var i = parseInt(id.substring(id.search("_") + 1, id.search("__")));
                var stlt = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1LT").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2LT").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietLT").val());
                var stth = (~~parseInt($("#NhomLopPhanCong_" + i + "__HK1TH").val()) + ~~parseInt($("#NhomLopPhanCong_" + i + "__HK2TH").val())) * parseInt($("#NhomLopPhanCong_" + i + "__SoTietTH").val()) / 2;
                $("#NhomLopPhanCongSoTiet_" + i).val(stlt + stth);

                var sumst = 0, sumct = 0;
                $(".nhomlop-row").each(function () {
                    var hidden = $(this).find(".sotietSum").val();
                    sumst = parseInt(hidden) + sumst;
                });
                if ($('.congtac-row')[0]) {
                    $(".congtac-row").each(function () {
                        var hidden = $(this).find(".congtackhacddl").val();
                        $("#sotietctddl > option").each(function () {
                            if ($(this).val() == hidden) {
                                sumct = sumct + parseInt($(this).text());
                            }
                        });
                    });
                }
                $('#tongsotiet').text(sumst);
                $('#sotietthucte').text(sumst + sumct);
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
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init,
        AddRowNhomLopPartial: AddRowNhomLopPartial,
        AddRowCongTacPartial: AddRowCongTacPartial
    }
})(PhanCongGiangVienModule);

