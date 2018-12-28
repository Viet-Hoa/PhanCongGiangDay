$(function () {
    BoMonModule.init();
});

var BoMonModule = (function () {
    var $BoMonTable;

    var BoMonUrl = "/BoMon/DanhSachBoMon";

    function init() {
        loadBoMon();
    }

    function loadBoMon() {
        initBoMonDataTable();
    }

    function initBoMonDataTable() {
        $BoMonTable = $("#bo-mon-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: BoMonUrl,
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
                { data: "MaBoMon" },
                { data: "TenBoMon" },
                 { data: "TenDonVi" },
                {
                    data: "BoMonID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/BoMon/SuaBoMon?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/BoMon/XoaBoMon?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/BoMon/ChiTietBoMon?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#bo-mon-table_filter').hide();

    }
    function timKiem() {
        $('#BoMon-search').keyup(function () {
            $BoMonTable.search($(this).val()).draw();
        });
    }

    function Checkrole() {
        if ($('#role').val() == 2) {
            $('#btnThemBoMon').addClass("add-disabled");
            $(".btn-grid").addClass("edit-disabled");
        }
    }

    function reloadBoMonTable() {
        $BoMonTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadBoMonTable: reloadBoMonTable,

    }
})();

var ThemBoMonModule = (function (BoMonModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themBoMon").on("click",
            function () {
                if ($("#formThemBoMon").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemBoMon").prop("method"),
                        url: $("#formThemBoMon").prop("action"),
                        data: $("#formThemBoMon").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                BoMonModule.reloadBoMonTable();
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
})(BoMonModule);

var SuaBoMonModule = (function (BoMonModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaBoMon").on("click",
            function () {
                if ($("#formSuaBoMon").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaBoMon").prop("method"),
                        url: $("#formSuaBoMon").prop("action"),
                        data: $("#formSuaBoMon").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                BoMonModule.reloadBoMonTable();
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
})(BoMonModule);

var XoaBoMonModule = (function (BoMonModule) {
    var $formXoaBoMon;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-BoMon-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaBoMon").prop("method"),
                    url: $("#formXoaBoMon").prop("action"),
                    data: $("#formXoaBoMon").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            BoMonModule.reloadBoMonTable();
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
})(BoMonModule);