$(function () {
    GiangVienModule.init();
});

var GiangVienModule = (function () {
    var $GiangVienTable;

    var GiangVienUrl = "/GiangVien/DanhSachGiangVien";

    function init() {
        loadGiangVien();
    }

    function loadGiangVien() {
        initGiangVienDataTable();
    }

    function initGiangVienDataTable() {
        $GiangVienTable = $("#giang-vien-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: GiangVienUrl,
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
                { data: "STT" },
                { data: "MaCB" },
                { data: "Ho" },
                { data: "Ten" },
                { data: "NamSinh" },
                { data: "ChucDanh" },
                { data: "HocVi" },
                { data: "ChucVu" },
                { data: "TenDonVi" },
                { data: "TenBoMon" },
                { data: "Truong" },
                { data: "ChuyenNganhDaoTao" },
                {
                    data: "GiangVienID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/GiangVien/SuaGiangVien?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/GiangVien/XoaGiangVien?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/GiangVien/ChiTietGiangVien?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#giang-vien-table_filter').hide();

    }
    function timKiem() {
        $('#GiangVien-search').keyup(function () {
            $GiangVienTable.search($(this).val()).draw();
        });
    }



    function reloadGiangVienTable() {
        $GiangVienTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadGiangVienTable: reloadGiangVienTable,

    }
})();

var ThemGiangVienModule = (function (GiangVienModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themGiangVien").on("click",
            function () {
                if ($("#formThemGiangVien").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemGiangVien").prop("method"),
                        url: $("#formThemGiangVien").prop("action"),
                        data: $("#formThemGiangVien").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                GiangVienModule.reloadGiangVienTable();
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
})(GiangVienModule);

var SuaGiangVienModule = (function (GiangVienModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaGiangVien").on("click",
            function () {
                if ($("#formSuaGiangVien").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaGiangVien").prop("method"),
                        url: $("#formSuaGiangVien").prop("action"),
                        data: $("#formSuaGiangVien").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                GiangVienModule.reloadGiangVienTable();
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
})(GiangVienModule);

var XoaGiangVienModule = (function (GiangVienModule) {
    var $formXoaGiangVien;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-GiangVien-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaGiangVien").prop("method"),
                    url: $("#formXoaGiangVien").prop("action"),
                    data: $("#formXoaGiangVien").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            GiangVienModule.reloadGiangVienTable();
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
})(GiangVienModule);