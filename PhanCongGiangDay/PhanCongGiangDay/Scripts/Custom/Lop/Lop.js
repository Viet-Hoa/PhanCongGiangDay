$(function () {
    LopModule.init();
});

var LopModule = (function () {
    var $LopTable;

    var LopUrl = "/Lop/DanhSachLop";

    function init() {
        loadLop();
    }

    function loadLop() {
        initLopDataTable();
    }

    function initLopDataTable() {
        $LopTable = $("#lop-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: LopUrl,
                data: {
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay();
                },
                complete: function () {
                    hideLoadingOverlay();
                    Checkrole();
                }
            },

            columns: [
                { data: "STT" },
                { data: "MaLop" },
                { data: "HoTenGV" },
                { data: "TenKhoa" },
                {
                    data: "LopID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/Lop/SuaLop?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/Lop/XoaLop?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/Lop/ChiTietLop?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#lop-table_filter').hide();

    }
    function timKiem() {
        $('#Lop-search').keyup(function () {
            $LopTable.search($(this).val()).draw();
        });
    }

    function Checkrole() {
        if ($('#role').val() == 2) {
            $('#btnThemLop').addClass("add-disabled");
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadLopTable() {
        $LopTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadLopTable: reloadLopTable,

    }
})();

var ThemLopModule = (function (LopModule) {
    function init() {
        bindFormActions();
        $(document).ready(function () {
            $('.giangviensl2s').select2();
            $('.khoasl2s').select2();
        });
    }
    function bindFormActions() {
        $("#btn_themLop").on("click",
            function () {
                if ($("#formThemLop").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemLop").prop("method"),
                        url: $("#formThemLop").prop("action"),
                        data: $("#formThemLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                LopModule.reloadLopTable();
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
})(LopModule);

var SuaLopModule = (function (LopModule) {
    function init() {
        bindFormActions();
        $(document).ready(function () {
            $('.giangviensl2s').select2();
            $('.khoasl2s').select2();
        });
    }
    function bindFormActions() {
        $("#btn_suaLop").on("click",
            function () {
                if ($("#formSuaLop").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaLop").prop("method"),
                        url: $("#formSuaLop").prop("action"),
                        data: $("#formSuaLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                LopModule.reloadLopTable();
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
})(LopModule);

var XoaLopModule = (function (LopModule) {
    var $formXoaLop;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-Lop-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaLop").prop("method"),
                    url: $("#formXoaLop").prop("action"),
                    data: $("#formXoaLop").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            LopModule.reloadLopTable();
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
})(LopModule);