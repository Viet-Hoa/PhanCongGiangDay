
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
        setNumber();
        AddRowNhomLop();
        AddRowCongTac();
        bindFormActions();
    }

    function setNumber() {
        $('.nhomlopddl').change(function () {
            var id = $(this).attr('id');
            var i = parseInt(id.substring(id.search("_") + 1, id.length));            
            $("#sotietltddl > option").each(function () {
                if ($(this).val() == $("#"+id).val()) {
                    var x = parseInt($(this).text());
                    $("#NhomLopPhanCong_"+i+"__SoTietLT").val(x);              
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
        });
        
    }

    function AddRowNhomLop() {
        $(document).ready(function () {
            $(document).on('click', '.button-edit-nl', function () {
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
                    $('#trangthainhomlop_' + i).val("0");
                }
            });
        });        
    }

    function AddRowCongTac() {
        $(document).ready(function () {
            $(document).on('click', '.button-edit-ct', function () {
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
                    $('#trangthaicongtac_' + i).val("0");
                }
            });
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
        init: init
    }
})(PhanCongGiangVienModule);

