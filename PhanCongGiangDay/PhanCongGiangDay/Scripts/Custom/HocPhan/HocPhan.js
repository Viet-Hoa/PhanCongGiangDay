$(function () {
    HocPhanModule.init();
});

var HocPhanModule = (function () {
    var $HocPhanTable;

    var HocPhanUrl = "/HocPhan/DanhSachHocPhan";

    function init() {
        loadHocPhan();
    }

    function loadHocPhan() {
        initHocPhanDataTable();
    }

    function initHocPhanDataTable() {
        $HocPhanTable = $("#hoc-phan-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: HocPhanUrl,
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
                { data: "MaHP" },
                { data: "TenHocPhan" },
                { data: "TenBoMon" },
                { data: "SoTC" },
                { data: "SoTietLT" },
                { data: "SoTietTH" },
                {
                    data: "HocPhanID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/HocPhan/SuaHocPhan?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/HocPhan/XoaHocPhan?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/HocPhan/ChiTietHocPhan?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#hoc-phan-table_filter').hide();

    }
    function timKiem() {
        $('#HocPhan-search').keyup(function () {
            $HocPhanTable.search($(this).val()).draw();
        });
    }



    function reloadHocPhanTable() {
        $HocPhanTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadHocPhanTable: reloadHocPhanTable,

    }
})();

var ThemHocPhanModule = (function (HocPhanModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themHocPhan").on("click",
            function () {
                if ($("#formThemHocPhan").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemHocPhan").prop("method"),
                        url: $("#formThemHocPhan").prop("action"),
                        data: $("#formThemHocPhan").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                HocPhanModule.reloadHocPhanTable();
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
})(HocPhanModule);

var SuaHocPhanModule = (function (HocPhanModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaHocPhan").on("click",
            function () {
                if ($("#formSuaHocPhan").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaHocPhan").prop("method"),
                        url: $("#formSuaHocPhan").prop("action"),
                        data: $("#formSuaHocPhan").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                HocPhanModule.reloadHocPhanTable();
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
})(HocPhanModule);

var XoaHocPhanModule = (function (HocPhanModule) {
    var $formXoaHocPhan;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-HocPhan-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaHocPhan").prop("method"),
                    url: $("#formXoaHocPhan").prop("action"),
                    data: $("#formXoaHocPhan").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            HocPhanModule.reloadHocPhanTable();
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
})(HocPhanModule);