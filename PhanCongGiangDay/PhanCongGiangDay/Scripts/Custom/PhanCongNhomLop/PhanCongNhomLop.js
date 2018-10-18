$(function () {
    PhanCongNhomLopModule.init();
});

var PhanCongNhomLopModule = (function () {
    var $PhanCongNhomLopTable;

    var PhanCongNhomLopUrl = "/PhanCongNhomLop/DanhSachPhanCongNhomLop";

    function init() {
        loadPhanCongNhomLop();
        showThemPanel();
    }

    function showThemPanel() {
        $('#btnThemPhanCongNhomLop').click(function () {
            $('#btnThemPhanCongNhomLop').addClass("add-disabled");
            $('#panelThemPCNL').addClass("pb-4");
            $.ajax({
                type: "GET",
                url: "/PhanCongNhomLop/ThemPhanCongNhomLop",
                data: { BangPhanCongID: $('#bangpc').val(), KhoaID: $('#khoaid').val() },
                success: function (response) {
                    $('#panelThemPCNL').html(response);
                },
            });
        });
    }

    function loadPhanCongNhomLop() {
        initPhanCongNhomLopDataTable();
    }

    function initPhanCongNhomLopDataTable() {
        $PhanCongNhomLopTable = $("#phanCongNhomLop-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: PhanCongNhomLopUrl,
                data: {
                    BangPhanCongID: $('#bangpc').val(), KhoaID: $('#khoaid').val()
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#PhanCongNhomLop-container");
                },
                complete: function () {
                    hideLoadingOverlay("#PhanCongNhomLop-container");
                    //initRoleNhanVien();
                }
            },

            columns: [
                { data: "STT" },
                { data: "MaHP" },
                { data: "TenHocPhan" },
                { data: "SoLuongNhomLop" },
                { data: "SoLuongConLaiLT" },
                { data: "SoLuongConLaiTH" },
                {
                    data: "PhanCongNhomLopID", orderable: false, width: 100, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/SuaPhanCongNhomLop?id=' + data + '"><i class="fa fa-pencil-square-o"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-danger btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/XoaPhanCongNhomLop?id=' + data + '"><i class="fa fa-trash-o"></i></button>';
                        //'<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modal" data-url="/PhanCongNhomLop/ChiTietPhanCongNhomLop?id=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                    }
                }
            ]
        });
        $('#phanCongNhomLop-table_filter').hide();

    }
    function timKiem() {
        $('#PhanCongNhomLop-search').keyup(function () {
            $PhanCongNhomLopTable.search($(this).val()).draw();
        });
    }



    function reloadPhanCongNhomLopTable() {
        $PhanCongNhomLopTable.ajax.reload();

    }

    return {
        init: init,
        timKiem: timKiem,
        reloadPhanCongNhomLopTable: reloadPhanCongNhomLopTable,

    }
})();

var ThemPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {
    var lt = 0, th = 0;
    function init() {
        hideThemPanel();
        setNumber();
        setHiddenValue();
        bindFormActions();
    }
    
    function hideThemPanel() {
        $('#btn_hide').click(function () {
            $('#panelThemPCNL').removeClass("pb-4");
            $('#panelThemPCNL').html("");
            $('#Them_panel').hide();
            $('#btnThemPhanCongNhomLop').removeClass("add-disabled");
        });
    }

    function setNumber() {
        $('#tHocPhanLogID').change(function () {
            $("#tsotietltddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    var x = parseInt($(this).text());
                    if (x > 0) {
                        lt = 1
                    }
                    else {
                        lt = 0;
                    }
                    $('#tconlaiLT').val(lt * $('#tSoLuongNhomLop').val());
                }
            });
            $("#tsotietthddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    var x = parseInt($(this).text());
                    if (x > 0) {
                        th = 1
                    }
                    else {
                        th = 0;
                    }
                    $('#tconlaiTH').val(th * $('#tSoLuongNhomLop').val());
                }
            });
            $("#tsotinchiddl > option").each(function () {
                if ($(this).val() == $('#tHocPhanLogID').val()) {
                    $('#tSoTinChi').val($(this).val());
                }
            });
        });
        
    }

    function setHiddenValue() {
        $('#tSoLuongNhomLop').change(function () {
            $('#tconlaiLT').val(lt * $(this).val());
            $('#tconlaiTH').val(th * $(this).val());            
        });
    }

    function bindFormActions() {
        $("#btn_themPhanCongNhomLop").on("click",
            function () {
                if ($("#formThemPhanCongNhomLop").valid()) {
                    showLoadingOverlay("#panelThemPCNL");
                    $.ajax({
                        type: $("#formThemPhanCongNhomLop").prop("method"),
                        url: $("#formThemPhanCongNhomLop").prop("action"),
                        data: $("#formThemPhanCongNhomLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                PhanCongNhomLopModule.reloadPhanCongNhomLopTable();
                                $.notify({ message: response.Messages }, { type: "success" });
                                lt = 0;
                                th = 0;
                            }
                        },
                        complete: function () {
                            hideLoadingOverlay("#panelThemPCNL");
                        }
                    });
                }
                return false;
            });
    }

    return {
        init: init
    }
})(PhanCongNhomLopModule);

var SuaPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {
    var lt = 0, th = 0;
    function init() {
        setNumber();
        setValue();
        bindFormActions();
        $('#HocPhanLogID').change();
    }

    function setNumber() {
        $('#HocPhanLogID').change(function () {
            $("#sotietltddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    var x = parseInt($(this).text());
                    if (x > 0) {
                        lt = 1
                    }
                    else {
                        lt = 0;
                    }
                    $('#SoLuongConLaiLT').val(lt * $('#SoLuongNhomLop').val());
                }
            });
            $("#sotietthddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    var x = parseInt($(this).text());
                    if (x > 0) {
                        th = 1
                    }
                    else {
                        th = 0;
                    }
                    $('#SoLuongConLaiTH').val(th * $('#SoLuongNhomLop').val());
                }
            });
            $("#sotinchiddl > option").each(function () {
                if ($(this).val() == $('#HocPhanLogID').val()) {
                    $('#SoTinChi').val($(this).val());
                }
            });
        });

    }

    function setValue() {
        $('#SoLuongNhomLop').change(function () {
            $('#SoLuongConLaiLT').val(lt * $(this).val());
            $('#SoLuongConLaiTH').val(th * $(this).val());
        });
    }

    function bindFormActions() {
        $("#btn_suaPhanCongNhomLop").on("click",
            function () {
                if ($("#formSuaPhanCongNhomLop").valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $("#formSuaPhanCongNhomLop").prop("method"),
                        url: $("#formSuaPhanCongNhomLop").prop("action"),
                        data: $("#formSuaPhanCongNhomLop").serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                PhanCongNhomLopModule.reloadPhanCongNhomLopTable();
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
})(PhanCongNhomLopModule);

var XoaPhanCongNhomLopModule = (function (PhanCongNhomLopModule) {
    var $formXoaPhanCongNhomLop;

    function init() {
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-PhanCongNhomLop-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $("#formXoaPhanCongNhomLop").prop("method"),
                    url: $("#formXoaPhanCongNhomLop").prop("action"),
                    data: { id: $('#PhanCongNhomLopid').val(), },
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {
                            $.notify({ message: response.Messages }, { type: "success" });
                            PhanCongNhomLopModule.reloadPhanCongNhomLopTable();
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
})(PhanCongNhomLopModule);
