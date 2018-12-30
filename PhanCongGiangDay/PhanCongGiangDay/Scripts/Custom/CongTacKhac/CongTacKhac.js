$(function () {
    CongTacKhacModule.init();
});

var CongTacKhacModule = (function () {
    var $CongTacKhacTable;

    var CongTacKhacUrl = "/CongTacKhac/DanhSachCongTacKhac";

    function init() {
        loadCongTacKhac();
    }

    function loadCongTacKhac() {
        initCongTacKhacDataTable();
    }

    function initCongTacKhacDataTable() {
        $CongTacKhacTable = $("#cong-tac-khac-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: CongTacKhacUrl,
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
                { data: "TenCongTac" },
                { data: "SoTiet" },
                {
                    data: "CongTacKhacID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/CongTacKhac/SuaCongTacKhac?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/CongTacKhac/XoaCongTacKhac?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/CongTacKhac/ChiTietCongTacKhac?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#cong-tac-khac-table_filter').hide();

    }
    function timKiem() {
        $('#CongTacKhac-search').keyup(function () {
            $CongTacKhacTable.search($(this).val()).draw();
        });
    }

    function Checkrole() {
        if ($('#role').val() == 2) {
            $('#btnThemCongTacKhac').addClass("add-disabled");
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadCongTacKhacTable() {
        $CongTacKhacTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadCongTacKhacTable: reloadCongTacKhacTable,

    }
})();

var ThemCongTacKhacModule = (function (CongTacKhacModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themCongTacKhac").on("click",
            function () {
                if ($("#formThemCongTacKhac").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemCongTacKhac").prop("method"),
                        url: $("#formThemCongTacKhac").prop("action"),
                        data: $("#formThemCongTacKhac").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                CongTacKhacModule.reloadCongTacKhacTable();
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
})(CongTacKhacModule);

var SuaCongTacKhacModule = (function (CongTacKhacModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaCongTacKhac").on("click",
            function () {
                if ($("#formSuaCongTacKhac").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaCongTacKhac").prop("method"),
                        url: $("#formSuaCongTacKhac").prop("action"),
                        data: $("#formSuaCongTacKhac").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                CongTacKhacModule.reloadCongTacKhacTable();
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
})(CongTacKhacModule);

var XoaCongTacKhacModule = (function (CongTacKhacModule) {
    var $formXoaCongTacKhac;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-CongTacKhac-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaCongTacKhac").prop("method"),
                    url: $("#formXoaCongTacKhac").prop("action"),
                    data: $("#formXoaCongTacKhac").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            CongTacKhacModule.reloadCongTacKhacTable();
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
})(CongTacKhacModule);