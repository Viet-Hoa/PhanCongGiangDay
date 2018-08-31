$(function () {
    HuyHoSoModule.init();
});

var HuyHoSoModule = (function () {
    var $HuyHoSoTable;
        
    var HuyHoSoUrl = "/HuyHoSo/DanhSachHuyHoSo";
        
    var hoSoVuAnId = $('#HoSoVuAnID').val();

    function init() {
        loadHuyHoSo();
    }

    function loadHuyHoSo() {
        initHuyHoSoDataTable();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVienAction",
            data: {
                contrCheck: "HuyHoSo",
                actionCheck: "ThemHuyHoSo"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#hoso-search").addClass("add-disabled");
                }
            }
        });
    }
    
    function initHuyHoSoDataTable() {        
        $HuyHoSoTable = $("#huy-ho-so-table").DataTable({
            searching: false,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: HuyHoSoUrl,
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
                { data: "SoHoSo" },
                { data: "MaHoSo" },
                { data: "TenVuAn" },
                { data: "ToaAn" },
                { data: "NgayHuyHoSo" },
                { data: "GiaiDoan" },
                {
                    data: "HoSoVuAnID", orderable: false, width: 50, className: "text-center", render: function (data) {
                        return '<button class="btn btn-sm btn-outline-success btn-custom-size" data-trigger="modal" data-target="#modelChiTiet" data-url="/HuyHoSo/ChiTietHuyHoSo?hoSoVuAnID=' + data + '"><i class="fa fa-bars"></i></button>' + ' ' +
                            '<button class="btn btn-sm btn-outline-primary btn-custom-size btn-grid" data-trigger="modal" data-target="#modal" data-url="/HuyHoSo/SuaHuyHoSo?hoSoVuAnID=' + data + '"><i class="fa fa-pencil-square-o"></i></button>'
                            
                    }
                }
            ]
        });
        $('#huy-ho-so-table_filter').hide();
        
    }
       

   
    function reloadHuyHoSoTable() {
        $HuyHoSoTable.ajax.reload();

    }

    return {
        init: init,
        reloadHuyHoSoTable: reloadHuyHoSoTable,
        
    }
})();

var ThemHuyHoSoModule = (function (huyHoSoModule) {
    var $formThemHuyHoSo;
    var idTextEditor = 'ly-do-HuyHoSo';
    function init() {
        TimHoSo();
        $formThemHuyHoSo = $("#formThemHuyHoSo");
        initValidation();
    }

    function TimHoSo() {
        $('#hoso-search').keyup(_.debounce(function () {
            if ($(this).val() != null && $(this).val() != "" && $(this).val() != undefined) {
                $.ajax({
                    type: "GET",
                    url: "/HuyHoSo/TimHoSo",
                    data: {
                        MaHoSo: $('#hoso-search').val()
                    },
                    success: function (response) {
                        $("#ho-so-tim-duoc").html(response);
                        $("#ho-so-tim-duoc").show();
                        CKEDITOR.replace(idTextEditor);
                    }
                });
            }
            else {
                $("#ho-so-tim-duoc").hide();
            }
        },500));
    }

    function bindFormActions() {
        $("#Luu-HuyHoSo-btn").click(function ()
        {                
            $formThemHuyHoSo = $("#formThemHuyHoSo");
            $().CKEditorSetValForTextarea(idTextEditor);
            /*if ($("#" + idTextEditor).val() == "") {
                hideLoadingOverlay();
                $('#modelXacNhan').modal("hide");
                $('#valid-lydohuy').show();
            }
            else*/
                if ($formThemHuyHoSo.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formThemHuyHoSo.prop("method"),
                        url: $formThemHuyHoSo.prop("action"),
                        data: $formThemHuyHoSo.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $('#hoso-search').val("");
                                $formThemHuyHoSo[0].reset();
                                $('#ho-so-tim-duoc').hide();
                                huyHoSoModule.reloadHuyHoSoTable();
                                $.notify({ message: response.Messages }, {type: "success"});
                                
                            }
                        },
                        complete: function () {
                            hideLoadingOverlay();
                            $('#modelXacNhan').modal("hide");
                        }
                    });
                }
                return false;
            });
    }

    function initValidation() {
        $formThemHuyHoSo.validate({
            ignore: '',
            rules: {
                "LyDoHuy": {
                    required: true
                }
            },
            messages:
                {
                    "LyDoHuy": {
                        required: ViewText.LABEL_LYDOHUY + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    }
                },
            errorPlacement: function (error) {
                var htmlFor = error[0].htmlFor;

                $('span[for="' + htmlFor + '"]').each(function () {
                    $(this).append(error);
                });
            },
            success: function (error) {
                error.remove();
            }
        });
    }

    return {
        init: init,
        bindFormActions: bindFormActions
    }
})(HuyHoSoModule);

var SuaHuyHoSoModule = (function (huyHoSoModule) {
    var idTextEditor = 'ly-do-HuyHoSo-update';
    function init() {
        $formSuaHuyHoSo = $("#formSuaHuyHoSo");
        CKEDITOR.replace(idTextEditor);
        initValidation();
        bindFormActions();
    }

    function bindFormActions() {
        $("#Sua-HuyHoSo-btn").click(function () {
            $().CKEditorSetValForTextarea(idTextEditor);
            
            if ($formSuaHuyHoSo.valid()) {
                showLoadingOverlay();
                $.ajax({
                    type: $formSuaHuyHoSo.prop("method"),
                    url: $formSuaHuyHoSo.prop("action"),
                    data: $formSuaHuyHoSo.serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: response.Messages }, { type: "danger" });
                        } else {                            
                            $.notify({ message: response.Messages }, { type: "success" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                        $('#modal').modal("hide");
                    }
                });
            }
            return false;
        });
    }

    function initValidation() {
        $formSuaHuyHoSo.validate({
            ignore: '',
            rules: {
                "LyDoHuy": {
                    required: true
                }
            },
            messages:
                {
                    "LyDoHuy": {
                        required: ViewText.LABEL_LYDOHUY + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    }
                },
            errorPlacement: function (error) {
                var htmlFor = error[0].htmlFor;

                $('span[for="' + htmlFor + '"]').each(function () {
                    $(this).append(error);
                });
            },
            success: function (error) {
                error.remove();
            }
        });
    }

    return {
        init: init
    }
})(HuyHoSoModule);

