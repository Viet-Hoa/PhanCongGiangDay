$(function () {
    DonViModule.init();
});

var DonViModule = (function () {
    var $DonViTable;

    var DonViUrl = "/DonVi/DanhSachDonVi";

    function init() {
        loadDonVi();
    }

    function loadDonVi() {
        initDonViDataTable();
    }

    function initDonViDataTable() {
        $DonViTable = $("#don-vi-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: DonViUrl,
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
                { data: "MaDonVi" },
                { data: "TenDonVi" },
                {
                    data: "DonViID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/DonVi/SuaDonVi?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/DonVi/XoaDonVi?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/DonVi/ChiTietDonVi?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#don-vi-table_filter').hide();

    }
    function timKiem() {
        $('#DonVi-search').keyup(function () {
            $DonViTable.search($(this).val()).draw();
        });
    }



    function reloadDonViTable() {
        $DonViTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadDonViTable: reloadDonViTable,

    }
})();

var ThemDonViModule = (function (DonViModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themdonvi").on("click",
            function () {
                if ($("#formThemDonVi").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemDonVi").prop("method"),
                        url: $("#formThemDonVi").prop("action"),
                        data: $("#formThemDonVi").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                DonViModule.reloadDonViTable();
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
})(DonViModule);

var SuaDonViModule = (function (DonViModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suadonvi").on("click",
            function () {
                if ($("#formSuaDonVi").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaDonVi").prop("method"),
                        url: $("#formSuaDonVi").prop("action"),
                        data: $("#formSuaDonVi").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                DonViModule.reloadDonViTable();
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
})(DonViModule);

var XoaDonViModule = (function (DonViModule) {
    var $formXoaDonVi;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-DonVi-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaDonVi").prop("method"),
                    url: $("#formXoaDonVi").prop("action"),
                    data: $("#formXoaDonVi").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            DonViModule.reloadDonViTable();
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
})(DonViModule);