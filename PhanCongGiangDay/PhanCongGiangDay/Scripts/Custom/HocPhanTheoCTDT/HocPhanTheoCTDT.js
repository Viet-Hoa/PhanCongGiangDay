$(function () {
    HocPhanTheoCTDTModule.init();
});

var HocPhanTheoCTDTModule = (function () {
    var $HocPhanTheoCTDTTable;

    var HocPhanTheoCTDTUrl = "/ChuongTrinhDaoTao/DanhSachHocPhanTheoCTDT?id=" + $('#ChuongTrinhDaoTaoID').val();

    function init() {
        loadHocPhanTheoCTDT();
    }

    function loadHocPhanTheoCTDT() {
        initHocPhanTheoCTDTDataTable();
    }

    function initHocPhanTheoCTDTDataTable() {
        $HocPhanTheoCTDTTable = $("#chi-tiet-chuong-trinh-dao-tao-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: HocPhanTheoCTDTUrl,
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
                { data: "HocKi" },
                {
                    data: "HocPhanTheoCTDT_ID", orderable: false, width: 140, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/ChuongTrinhDaoTao/SuaHocPhanTheoCTDT?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                               '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/ChuongTrinhDaoTao/XoaHocPhanTheoCTDT?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                               //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/HocPhanTheoCTDT/ChiTietHocPhanTheoCTDT?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#chi-tiet-chuong-trinh-dao-tao-table_filter').hide();

    }
    function timKiem() {
        $('#HocPhanTheoCTDT-search').keyup(function () {
            $HocPhanTheoCTDTTable.search($(this).val()).draw();
        });
    }



    function reloadHocPhanTheoCTDTTable() {
        $HocPhanTheoCTDTTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadHocPhanTheoCTDTTable: reloadHocPhanTheoCTDTTable,

    }
})();

var ThemHocPhanTheoCTDTModule = (function (HocPhanTheoCTDTModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_themHocPhanTheoCTDT").on("click",
            function () {
                if ($("#formThemHocPhanTheoCTDT").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formThemHocPhanTheoCTDT").prop("method"),
                        url: $("#formThemHocPhanTheoCTDT").prop("action"),
                        data: $("#formThemHocPhanTheoCTDT").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                HocPhanTheoCTDTModule.reloadHocPhanTheoCTDTTable();
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
})(HocPhanTheoCTDTModule);

var SuaHocPhanTheoCTDTModule = (function (HocPhanTheoCTDTModule) {
    function init() {
        bindFormActions();
    }
    function bindFormActions() {
        $("#btn_suaHocPhanTheoCTDT").on("click",
            function () {
                if ($("#formSuaHocPhanTheoCTDT").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaHocPhanTheoCTDT").prop("method"),
                        url: $("#formSuaHocPhanTheoCTDT").prop("action"),
                        data: $("#formSuaHocPhanTheoCTDT").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                HocPhanTheoCTDTModule.reloadHocPhanTheoCTDTTable();
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
})(HocPhanTheoCTDTModule);

var XoaHocPhanTheoCTDTModule = (function (HocPhanTheoCTDTModule) {
    var $formXoaHocPhanTheoCTDT;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-HocPhanTheoCTDT-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaHocPhanTheoCTDT").prop("method"),
                    url: $("#formXoaHocPhanTheoCTDT").prop("action"),
                    data: $("#formXoaHocPhanTheoCTDT").serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            HocPhanTheoCTDTModule.reloadHocPhanTheoCTDTTable();
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
})(HocPhanTheoCTDTModule);

var ImportHocPhanTheoCTDTModule = (function (HocPhanTheoCTDTModule) {
    var $formImport;

    function init() {
        bindFormActions();
        prepareUpload();
    }

    var formData = new FormData();
    function prepareUpload() {
        $("#excel").change(function (e) {
            formData.append('file_imp', e.target.files[0]);
            formData.append('CTDTID', $("#ctdt-ID").val());
        }).change();
    }

    function bindFormActions() {
        $("#bnt-import").on("click",
            function () {
                if ($("#import-form").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#import-form").prop("method"),
                        url: $("#import-form").prop("action"),
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                                HocPhanTheoCTDTModule.reloadHocPhanTheoCTDTTable();
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    }, 'json');
                }
                return false;
            });
    }
    
    return {
        init: init
    }
})(HocPhanTheoCTDTModule);