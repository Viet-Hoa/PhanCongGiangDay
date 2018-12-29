$(function () {
    ChuongTrinhDaoTaoModule.init();
});

var ChuongTrinhDaoTaoModule = (function () {
    var $ChuongTrinhDaoTaoTable;

    var ChuongTrinhDaoTaoUrl = "/ChuongTrinhDaoTao/DanhSachChuongTrinhDaoTao";

    function init() {
        loadChuongTrinhDaoTao();
    }

    function loadChuongTrinhDaoTao() {
        initChuongTrinhDaoTaoDataTable();
    }

    function initChuongTrinhDaoTaoDataTable() {
        $ChuongTrinhDaoTaoTable = $("#chuong-trinh-dao-tao-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: ChuongTrinhDaoTaoUrl,
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
                { data: "MaCTDT" },
                { data: "TenCTDT" },
                { data: "NamBatDau" },
                { data: "NamKetThuc" },
                {
                    data: "ChuongTrinhDaoTaoID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/ChuongTrinhDaoTao/SuaChuongTrinhDaoTao?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/ChuongTrinhDaoTao/XoaChuongTrinhDaoTao?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/ChuongTrinhDaoTao/ChiTietChuongTrinhDaoTao?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#chuong-trinh-dao-tao-table_filter').hide();

    }
    function timKiem() {
        $('#ChuongTrinhDaoTao-search').keyup(function () {
            $ChuongTrinhDaoTaoTable.search($(this).val()).draw();
        });
    }

    function Checkrole() {
        if ($('#role').val() == 2) {
            $('#btnThemChuongTrinhDaoTao').addClass("add-disabled");
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadChuongTrinhDaoTaoTable() {
        $ChuongTrinhDaoTaoTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadChuongTrinhDaoTaoTable: reloadChuongTrinhDaoTaoTable,

    }
})();

var ThemChuongTrinhDaoTaoModule = (function (ChuongTrinhDaoTaoModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themChuongTrinhDaoTao").on("click",
            function () {
                if ($("#formThemChuongTrinhDaoTao").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemChuongTrinhDaoTao").prop("method"),
                        url: $("#formThemChuongTrinhDaoTao").prop("action"),
                        data: $("#formThemChuongTrinhDaoTao").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                ChuongTrinhDaoTaoModule.reloadChuongTrinhDaoTaoTable();
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
})(ChuongTrinhDaoTaoModule);

var SuaChuongTrinhDaoTaoModule = (function (ChuongTrinhDaoTaoModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaChuongTrinhDaoTao").on("click",
            function () {
                if ($("#formSuaChuongTrinhDaoTao").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaChuongTrinhDaoTao").prop("method"),
                        url: $("#formSuaChuongTrinhDaoTao").prop("action"),
                        data: $("#formSuaChuongTrinhDaoTao").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                ChuongTrinhDaoTaoModule.reloadChuongTrinhDaoTaoTable();
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
})(ChuongTrinhDaoTaoModule);

var XoaChuongTrinhDaoTaoModule = (function (ChuongTrinhDaoTaoModule) {
    var $formXoaChuongTrinhDaoTao;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-ChuongTrinhDaoTao-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaChuongTrinhDaoTao").prop("method"),
                    url: $("#formXoaChuongTrinhDaoTao").prop("action"),
                    data: $("#formXoaChuongTrinhDaoTao").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            ChuongTrinhDaoTaoModule.reloadChuongTrinhDaoTaoTable();
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
})(ChuongTrinhDaoTaoModule);