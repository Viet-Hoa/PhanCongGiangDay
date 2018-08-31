var SoDoToChucTreeViewModule = (function () {
    var ddlToaAnSoDoToChuc = $("#ddlToaAnSoDoToChuc");

    var soDoToChucUrl = "/SoDoToChuc/DanhSachChucDanhTheoToaAn";
    var soDoToChucUrl_2 = "/SoDoToChuc/DanhSachChucVuTheoToaAn";

    function loadSoDoToChuc() {
        initDdlToaAn();
        reloadSoDoToChuc();
    }

    function loadSoDoToChucChucVu() {
        initDdlToaAn2();
        reloadSoDoToChucChucVu();
    }

    function initDdlToaAn() {
        ddlToaAnSoDoToChuc.on("change", function () {
            reloadSoDoToChuc();
        });
    }

    function initDdlToaAn2() {
        ddlToaAnSoDoToChuc.on("change", function () {
            reloadSoDoToChucChucVu();
        });
    }

    function initSoDoToChucTreeView() {
        $('.tree').treegrid({
            expanderExpandedClass: 'fa fa-angle-down btn-treeview align-text-bottom',
            expanderCollapsedClass: 'fa fa-angle-right btn-treeview align-text-bottom'
        });

        $(".expand-all").on("click", function () {
            $('.tree').treegrid('expandAll');
        });

        $(".collapse-all").on("click", function () {
            $('.tree').treegrid('collapseAll');
        });

        $(".chucDanhSoDoToChuc").on("click", function () {
            var nodeID = '#' + $(this).parents('tr').data('id');
            if ($(nodeID).treegrid('isCollapsed')) {
                $(nodeID).treegrid('expand');
            }
            else {
                $(nodeID).treegrid('collapse');
            }
        });
    }

    function reloadSoDoToChuc() {
        $.ajax({
            type: "GET",
            url: soDoToChucUrl,
            data: {
                toaAnId: ddlToaAnSoDoToChuc.val()
            },
            success: function (data) {
                $("#soDoToChucTreeView").html(data);
                initSoDoToChucTreeView();
            }
        });
    }

    function reloadSoDoToChucChucVu() {
        $.ajax({
            type: "GET",
            url: soDoToChucUrl_2,
            data: {
                toaAnId: ddlToaAnSoDoToChuc.val()
            },
            success: function (data) {
                $("#soDoToChucTreeViewChucVu").html(data);
                initSoDoToChucTreeView();
            }
        });
    }

    return {
        loadSoDoToChuc: loadSoDoToChuc,
        loadSoDoToChucChucVu: loadSoDoToChucChucVu,
        reloadSoDoToChuc: reloadSoDoToChuc,
        reloadSoDoToChucChucVu: reloadSoDoToChucChucVu
    }
})();

var ThemChucDanhModule = (function (soDoToChucTreeViewModule) {
    var $formThemChucDanh;
    var chucDanhId = $("#ChucDanhID").val(),
        toaAnId = $("#ddlToaAnSoDoToChuc").val();
    var ddlToaAnQLNV = $("#toaAn-ddl");

    var idTextarea = 'dien-giai-nghiep-vu-them-textarea';

    function init() {
        $formThemChucDanh = $("#formThemChucDanh");
        bindFormActions();
        //onToaAnChange();
        //initEditorThem();
        CKEDITOR.replace(idTextarea);
        DDLTreeViewModule.init();
    }

    //function initEditorThem() {
    //    var defaults = $.tinymceDefaults;
    //    var dienGiaiThemSettings = $.extend({},
    //        {
    //            selector: "#dien-giai-nghiep-vu-them-textarea",
    //            height: 170,
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    tinymce.init(dienGiaiThemSettings);
    //}

    function bindFormActions() {
        $("#them-chuc-danh-btn").on("click",
            function () {
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formThemChucDanh.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formThemChucDanh.prop("method"),
                        url: $formThemChucDanh.prop("action"),
                        data: $formThemChucDanh.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_THEMCHUCDANH_THANHCONG }, { type: "success" });
                                soDoToChucTreeViewModule.reloadSoDoToChuc();
                                soDoToChucTreeViewModule.reloadSoDoToChucChucVu();
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            }
        );
    }
    

    return {
        init: init
    }

})(SoDoToChucTreeViewModule);

var SuaChucDanhModule = (function (soDoToChucTreeViewModule) {
    var $formSuaChucDanh;
    var chucDanhId = $("#ChucDanhID").val(),
        toaAnId = $("#ddlToaAnSoDoToChuc").val();
    var idTextarea = 'dien-giai-nghiep-vu-sua-textarea';

    function init() {
        $formSuaChucDanh = $("#formSuaChucDanh");
        bindFormActions();
        //onToaAnChange();
        //initEditorSua();
        CKEDITOR.replace(idTextarea);
        DDLTreeViewModule.init();
    }

    //function initEditorSua() {
    //    var defaults = $.tinymceDefaults;
    //    var dienGiaiSuaSettings = $.extend({},
    //        {
    //            selector: "#dien-giai-nghiep-vu-sua-textarea",
    //            height: 170,
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);

    //    tinymce.init(dienGiaiSuaSettings);
    //}

    //function onToaAnChange() {
    //    $("#ddlToaAnSoDoToChuc").on("change", function () {
    //        $.ajax({
    //            type: "GET",
    //            url: "/SoDoToChuc/SuaChucDanh",
    //            data: {
    //                id: $("#ChucDanhID").val(),
    //                toaAnId: toaAnId
    //            },
    //            success: function (data) {
    //                $("#chucDanhContent").html(data);
    //            }
    //        });
    //    });
    //}

    function bindFormActions() {
        $("#sua-chuc-danh-btn").on("click",
            function () {
                //tinymce.triggerSave();
                $().CKEditorSetValForTextarea(idTextarea);

                if ($formSuaChucDanh.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaChucDanh.prop("method"),
                        url: $formSuaChucDanh.prop("action"),
                        data: $formSuaChucDanh.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_SUACHUCDANH_THANHCONG }, { type: "success" });
                                soDoToChucTreeViewModule.reloadSoDoToChuc();
                                soDoToChucTreeViewModule.reloadSoDoToChucChucVu();
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                }
                return false;
            }
        );
    }

    return {
        init: init
    }
})(SoDoToChucTreeViewModule);

var XoaChucDanhModule = (function (soDoToChucTreeViewModule) {
    var chucDanhId;
    var xoaConfirmUrl = "/SoDoToChuc/XoaChucDanhConfirmed";

    function init() {
        $formXoaChucDanh = $("#formXoaChucDanh");
        bindFormActions();
    }

    function bindFormActions() {
        $("#xoa-chuc-danh-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formXoaChucDanh.prop("method"),
                    url: $formXoaChucDanh.prop("action"),
                    data: $formXoaChucDanh.serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: NotifyMessage.MESSAGE_XOACHUCDANH_KHONGTHANHCONG }, { type: "danger" });
                        }
                        else {
                            $.notify({ message: NotifyMessage.MESSAGE_XOACHUCDANH_THANHCONG }, { type: "success" });
                            soDoToChucTreeViewModule.loadSoDoToChuc();
                            soDoToChucTreeViewModule.reloadSoDoToChucChucVu();
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
})(SoDoToChucTreeViewModule);

var DDLTreeViewModule = (function () {

    function init() {
        SoDoToChucTreeViewModule.loadSoDoToChuc();
        $("#treeviewDropdownBtn").on('click', function () {
            $('#treeview').toggle();
            $("#treeview").css("background-color", "#fff");
            $('#treeview').focus();
        });
        $(".itemChucDanhChaSoDoToChuc").on('click', function () {
            $("#chucDanhCha").val($(this).data("id"));
            $("#chucDanhCha").text($(this).data("chuc-danh"));
            $('#treeview').hide();
        });
        $("#ddlTreeView").on('blur', function () {
            $('#treeview').hide();
        });
    }

    return {
        init: init
    }
})();