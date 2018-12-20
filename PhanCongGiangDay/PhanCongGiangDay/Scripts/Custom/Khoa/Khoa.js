$(function () {
    KhoaModule.init();
});

var KhoaModule = (function () {
    var $KhoaTable;

    var KhoaUrl = "/Khoa/DanhSachKhoa";

    function init() {
        loadKhoa();
    }

    function loadKhoa() {
        initKhoaDataTable();
    }

    function initKhoaDataTable() {
        $KhoaTable = $("#khoa-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: KhoaUrl,
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
                { data: "TenKhoa" },
                { data: "SLSV" },
                { data: "NamBatDau" },
                { data: "NamKetThuc" },
                { data: "ChuongTrinhDaoTao" },
                {
                    data: "KhoaID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/Khoa/SuaKhoa?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/Khoa/XoaKhoa?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/Khoa/ChiTietKhoa?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#khoa-table_filter').hide();

    }
    function timKiem() {
        $('#Khoa-search').keyup(function () {
            $KhoaTable.search($(this).val()).draw();
        });
    }

    function Checkrole() {
        if ($('#role').val() == 2) {
            $('#btnThemKhoa').addClass("add-disabled");
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadKhoaTable() {
        $KhoaTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadKhoaTable: reloadKhoaTable,

    }
})();

var ThemKhoaModule = (function (KhoaModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themKhoa").on("click",
            function () {
                if ($("#formThemKhoa").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemKhoa").prop("method"),
                        url: $("#formThemKhoa").prop("action"),
                        data: $("#formThemKhoa").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                KhoaModule.reloadKhoaTable();
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
})(KhoaModule);

var SuaKhoaModule = (function (KhoaModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaKhoa").on("click",
            function () {
                if ($("#formSuaKhoa").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaKhoa").prop("method"),
                        url: $("#formSuaKhoa").prop("action"),
                        data: $("#formSuaKhoa").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                KhoaModule.reloadKhoaTable();
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
})(KhoaModule);

var XoaKhoaModule = (function (KhoaModule) {
    var $formXoaKhoa;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-Khoa-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaKhoa").prop("method"),
                    url: $("#formXoaKhoa").prop("action"),
                    data: { id: $('#Khoaid').val(), },
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            KhoaModule.reloadKhoaTable();
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
})(KhoaModule);