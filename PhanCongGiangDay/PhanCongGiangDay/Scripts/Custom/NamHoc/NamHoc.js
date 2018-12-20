$(function () {
    NamHocModule.init();
});

var NamHocModule = (function () {
    var $NamHocTable;

    var NamHocUrl = "/NamHoc/DanhSachNamHoc";

    function init() {
        loadNamHoc();
    }

    function loadNamHoc() {
        initNamHocDataTable();
    }

    function initNamHocDataTable() {
        $NamHocTable = $("#nam-hoc-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: NamHocUrl,
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
                { data: "NamHoc" },
                {
                    data: "BangPhanCongID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NamHoc/SuaNamHoc?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' //+ ' ' +
                            //'<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/NamHoc/XoaNamHoc?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/NamHoc/ChiTietNamHoc?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#nam-hoc-table_filter').hide();

    }
    function timKiem() {
        $('#NamHoc-search').keyup(function () {
            $NamHocTable.search($(this).val()).draw();
        });
    }

    function Checkrole() {
        if ($('#role').val() == 2) {
            $('#btnThemNamHoc').addClass("add-disabled");
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadNamHocTable() {
        $NamHocTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadNamHocTable: reloadNamHocTable,

    }
})();

var ThemNamHocModule = (function (NamHocModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themNamHoc").on("click",
            function () {
                if ($("#formThemNamHoc").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemNamHoc").prop("method"),
                        url: $("#formThemNamHoc").prop("action"),
                        data: $("#formThemNamHoc").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                NamHocModule.reloadNamHocTable();
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
})(NamHocModule);

var SuaNamHocModule = (function (NamHocModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaNamHoc").on("click",
            function () {
                if ($("#formSuaNamHoc").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaNamHoc").prop("method"),
                        url: $("#formSuaNamHoc").prop("action"),
                        data: $("#formSuaNamHoc").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                NamHocModule.reloadNamHocTable();
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
})(NamHocModule);
