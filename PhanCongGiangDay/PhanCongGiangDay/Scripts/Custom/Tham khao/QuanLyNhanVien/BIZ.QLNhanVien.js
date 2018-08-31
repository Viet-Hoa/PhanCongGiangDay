$(function () {
    NhanVienTheoToaAnModule.init();
});


var NhanVienTheoToaAnModule = (function () {
    var danhSachNhanVienUrl = "/QuanLyNhanVien/Danhsachnhanvientheotoaan";
    var toaAnId = $("#toaAn-ddl").val();

    var modalNhanVien = "#modalThemNhanVien";

    function init() {
        $(modalNhanVien).on("shown.bs.modal", function (e) {
            openFormEditNhanVien();
        });
        loadNhanVien();
        onToaAnDropdowlistChange();
    }

    function openFormEditNhanVien() {
        showLoadingOverlay(modalNhanVien + " .modal-content");
        $.ajax({
            type: "GET",
            url: "/QuanLyNhanVien/ThemNhanVien",
            data: {
                toaAnId: toaAnId
            },
            success: function (response) {
                $(modalNhanVien + " .modal-content").html(response);

                hideLoadingOverlay(modalNhanVien + " .modal-content");
            }
        });
    }

    function loadNhanVien() {
        initNhanVienDataTable();
    }

    function initNhanVienDataTable() {
        $('#toaAn-ddl').change(function () {
            showLoadingOverlay();
            $.ajax({
                type: "GET",
                url: danhSachNhanVienUrl,
                data: {
                    id: $("#toaAn-ddl").val(),
                },
                success: function (data) {
                    $("#nhanviencontent").html(data);
                    hideLoadingOverlay();
                }
            });
        });
    }
    function reloadNhanVienTable() {
        $.ajax({
            type: "GET",
            url: danhSachNhanVienUrl,
            data: {
                id: $("#toaAn-ddl").val(),
            },
            success: function (data) {
                $("#nhanviencontent").html(data);
            }
        });

    }

    function searchReload() {
        $.ajax({
            type: "GET",
            url: "/QuanLyNhanVien/DanhSachNhanVienTheoKeyword",
            data: {
                keyword: $("#keywordNhanVien").val(),
                toaAnId: $("#toaAn-ddl").val()
            },
            success: function (data) {
                $("#nhanviencontent").html(data);

            }
        });
    }

    function onToaAnDropdowlistChange() {
        $("#toaAn-ddl").on("change", function () {
            toaAnId = $("#toaAn-ddl").val();
        });
    }

    function getToaAnId() {
        return toaAnId;
    }

    return {
        init: init,
        reloadNhanVienTable: reloadNhanVienTable,
        searchReload: searchReload,
        getToaAnId: getToaAnId
    }
})();

var XoaNhanVienModule = (function (nhanVienTheoToaAnModule) {
    var xoaConfirmUrl = "/QuanLyNhanVien/XoaNhanVienConfirmed";
    var nhanVienID;
    var $formXoaNhanVien;

    function init() {
        $formXoaNhanVien = $("#formXoaNhanVien");
        bindFormActions();
    }

    function bindFormActions() {
        $("#NhanVien-del-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formXoaNhanVien.prop("method"),
                    url: $formXoaNhanVien.prop("action"),
                    data: $($formXoaNhanVien).serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: NotifyMessage.MESSAGE_XOANHANVIEN_KHONGTHANHCONG}, { type: "danger" });
                        } else {
                            $.notify({ message: NotifyMessage.MESSAGE_XOANHANVIEN_THANHCONG }, { type: "success" });
                            NhanVienTheoToaAnModule.reloadNhanVienTable();                            
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
})(NhanVienTheoToaAnModule);

var SuaNhanVienModel = (function (nhanvienmodel) {
    var $formSuaNhanVien;
    function init() {
        $formSuaNhanVien = $("#formcapnhapnhanvien");
        bindFormActions();
        initDateTimePicker();
    }
    function initDateTimePicker() {
        $("#ngay-thang-nam-sinh-sua").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: null
            
        });
    }
    function bindFormActions() {
        $("#btn_sua_nhan_vien").on("click",
            function () {
                if ($formSuaNhanVien.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formSuaNhanVien.prop("method"),
                        url: $formSuaNhanVien.prop("action"),
                        data: $($formSuaNhanVien).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                                //$.notify({ message: NotifyMessage.MESSAGE_SUANHANVIEN_KHONGTHANHCONG  }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_SUANHANVIEN_THANHCONG }, { type: "success" });
                                if ($("#keywordNhanVien").val()) {
                                    NhanVienTheoToaAnModule.searchReload();
                                }
                                else {
                                    NhanVienTheoToaAnModule.reloadNhanVienTable();
                                }  
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            $('#login_partial').load("/Home/ChangeLoginPartial");
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
})(NhanVienTheoToaAnModule);

var ThemNhanVien = (function (nhanVienTheoToaAnModule) {
    var $formThemNhanVien;
    var toaAnId = $("#toaAn-ddl").val();   

    function init() {
        $formThemNhanVien = $("#formThemNhanVien");
        initDateTimePicker();      
        bindFormActions();    
    }
    

    function initDateTimePicker() {
        $("#ngay-sinh-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            maxDate: new Date(),
            useCurrent: false,
            defaultDate: null
        });
    }
    function bindFormActions() {
        $("#btn_them_nhan_vien").on("click",
            function () {
                if ($formThemNhanVien.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: "/QuanLyNhanVien/ThemNhanVien",
                        data: $formThemNhanVien.serialize() + "&ToaAnID=" + $("#toaAn-ddl").val(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $("#modalThemNhanVien" + " .modal-content").html(response);
                                hideLoadingOverlay();
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_THEMNHANVIEN_THANHCONG }, { type: "success" });
                                nhanVienTheoToaAnModule.reloadNhanVienTable();
                                $('#modalThemNhanVien').modal("hide");
                                hideLoadingOverlay();
                            }
                        }
                    });
                }
                return false;
            });
    }
    return {
        init: init
    }
})(NhanVienTheoToaAnModule);

var DoiToaAnModule = (function () {

    var ddlToaAnQLNV = $("#toaAn-ddl");
    function init() {
        todo();
    }
    function todo() {
        ddlToaAnQLNV.on("change", function () {
            alert("dá");
            alert($("#toaAn-ddl").val());
        });
    }
    return {
        init: init
    }
})();

function selectTabPaneChange() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if (target === "#tab-thong-tin") {
            $("#tab-thong-tin *").prop('disabled', false);
            $("#tab-thong-tin *").prop('disabled', true);
        }
        else if (target === "#tab-chuc-nang") {
            $("#tab-chuc-nang *").prop('disabled', false);
            $("#tab-chuc-nang *").prop('disabled', true);
        }
    });
}

var ImportNhanVienModule=(function (nhanVienTheoToaAnModule) {
    function init() {
        $import_form = $("#import-form");
        prepareUpload();
        bindFormActions();
    }
    var formData = new FormData();
    function prepareUpload() {
        $("#excel").change(function (e) {
            formData.append('file_imp', e.target.files[0]);
            formData.append('toaAnID', $("#toaAn-ddl").val());
        }).change();
    }

    function bindFormActions() {
        $("#bnt-import").on("click",
            function () {
                if ($import_form.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $import_form.prop("method"),
                        url: $import_form.prop("action"),
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_THEMNHANVIEN_TUFILE_THANHCONG }, { type: "success" });
                                nhanVienTheoToaAnModule.reloadNhanVienTable();
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    }, 'json');
                }
                formData = new FormData();
                return false;
            });
    }



    return {
        init: init
    }

})(NhanVienTheoToaAnModule);

var ToaAnNhanVienModule = (function (nhanVienTheoToaAnModule) {
    function init() {
        $NVTAform = $("#formNhanVienToaAn");
        changeradiobtn();
        saveToaAnNhanVien();
    }
    function changeradiobtn() {
        $("input[name='tructhuoc']").click(function () {
            $("#nvToaAnid").val(this.value);
            var str = $(this).attr('id');
            var i = str.search("_");
            str = str.substring(i + 1, str.Count);
            $('#cb-' + str).prop('checked', true);
        });
    }
    function saveToaAnNhanVien() {
        $("#NVToaAn-btn").on("click",
            function () {
                if ($NVTAform.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $NVTAform.prop("method"),
                        url: $NVTAform.prop("action"),
                        data: $NVTAform.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_SUADOITRUYCAP_TOAAN_THANHCONG }, { type: "success" });
                                if ($("#keywordNhanVien").val()) {
                                    NhanVienTheoToaAnModule.searchReload();
                                }
                                else {
                                    NhanVienTheoToaAnModule.reloadNhanVienTable();
                                } 
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
        init:init
    }

})(NhanVienTheoToaAnModule);

var CheckAllModule = (function (nhanVienTheoToaAnModule) {
    function init() {
        checkbox_all();
    }

    function checkbox_all() {
        $('.checkboxAll').click(function () {

            $("input:checkbox").prop('checked', $(this).prop("checked"));

        });
    }
    return {
        init: init
    }
})(NhanVienTheoToaAnModule);

var CheckRadioModule = (function (nhanVienTheoToaAnModule) {
    function init() {
        checkradio();
    }

    function checkradio() {
        $(".radio-btn").click(function () {            
            var str=$(this).attr('id');
            var i = str.search("-");
            str = str.substring(i + 1, str.Count);
            $('#chucNang-' + str).prop('checked', true);
        });
    }
    return {
        init: init
    }
})(NhanVienTheoToaAnModule);

var ChucnangNhanVienModule = (function (nhanVienTheoToaAnModule) {
    function init() {
        $formChucNang = $("#formCapNhatChucNang");
        bindFormActions();
    }

    function bindFormActions() {
        $("#btnCapNhatChucNang").on("click",
            function () {
                if ($formChucNang.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formChucNang.prop("method"),
                        url: $formChucNang.prop("action"),
                        data: $formChucNang.serialize() ,
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $("#modal" + " .modal-content").html(response);
                                hideLoadingOverlay();
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATCHUCNANG_NHANVIEN_THANHCONG }, { type: "success" });
                                $('#modal').modal("hide");
                                hideLoadingOverlay();
                            }
                        }
                    });
                }
                return false;
            });
    }
    return {
        init: init
    }
})(NhanVienTheoToaAnModule);

var SoDoToChucQLNVTreeViewModule = (function () {
    var ddlToaAnQLNV = $("#toaAn-ddl");

    var soDoToChucQLNVUrl = "/QuanLyNhanVien/SoDoToChucQuanLyNhanVien";
    var soDoToChucQLNVUrl_2 = "/QuanLyNhanVien/SoDoToChucQuanLyNhanVienChucVu";
    var nhanVienTheoChucDanhURL = "/QuanLyNhanVien/DanhSachNhanVienTheoChucDanh";

    function loadSoDoToChucQLNV() {
        initDdlToaAnQLNV();
        reloadSoDoToChucQLNV();
    }

    function loadSoDoToChucQLNVChucVu() {
        initDdlToaAnQLNV2();
        reloadSoDoToChucQLNVChucVu();
    }

    function initDdlToaAnQLNV() {
        ddlToaAnQLNV.on("change", function () {
            reloadSoDoToChucQLNV();
        });
    }

    function initDdlToaAnQLNV2() {
        ddlToaAnQLNV.on("change", function () {
            reloadSoDoToChucQLNVChucVu();
        });
    }

    function reloadSoDoToChucQLNV() {
        $.ajax({
            type: "GET",
            url: soDoToChucQLNVUrl,
            data: {
                toaAnId: ddlToaAnQLNV.val()
            },
            success: function (data) {
                $("#soDoToChucTreeViewQLNV").html(data);
                initSoDoToChucTreeViewQLNV();
            }
        });
    }

    function reloadSoDoToChucQLNVChucVu() {
        $.ajax({
            type: "GET",
            url: soDoToChucQLNVUrl_2,
            data: {
                toaAnId: ddlToaAnQLNV.val()
            },
            success: function (data) {
                $("#soDoToChucTreeViewQLNVChucVu").html(data);
                initSoDoToChucTreeViewForChucVuQLNV();
            }
        });
    }

    function initSoDoToChucTreeViewQLNV() {
        $('.tree').treegrid({
            expanderExpandedClass: 'fa fa-angle-down btn-treeview',
            expanderCollapsedClass: 'fa fa-angle-right btn-treeview'
        });

        $(".expand-all").on("click", function () {
            $('.tree').treegrid('expandAll');
        });

        $(".collapse-all").on("click", function () {
            $('.tree').treegrid('collapseAll');
        });

        $(".chucDanhQLNV").on("click", function () {
            var chucDanh = $(this).data("chucdanh");
            var loai = $(this).data("loai");
            if ($(this).data("selected")) {
                $(this).css("color", "rgb(2, 117, 216)");
                $(this).data("selected", false);
                $.ajax({
                    type: "GET",
                    url: nhanVienTheoChucDanhURL,
                    data: {
                        toaAnId: ddlToaAnQLNV.val()
                    },
                    success: function (data) {
                        $("#nhanviencontent").html(data);
                    }
                });
            }
            else {
                $('.chucDanhQLNV').each(function () {
                    $(this).css("color", "rgb(2, 117, 216)");
                    $(this).data("selected", false);
                });
                $(this).css("color", "crimson");
                $(this).data("selected", true);
                $.ajax({
                    type: "GET",
                    url: nhanVienTheoChucDanhURL,
                    data: {
                        toaAnId: ddlToaAnQLNV.val(),
                        chucDanh: chucDanh,
                        loai: loai
                    },
                    success: function (data) {
                        $("#nhanviencontent").html(data);
                    }
                });
            }
        });
    }

    function initSoDoToChucTreeViewForChucVuQLNV() {
        $('.tree').treegrid({
            expanderExpandedClass: 'fa fa-angle-down btn-treeview',
            expanderCollapsedClass: 'fa fa-angle-right btn-treeview'
        });

        $(".expand-all").on("click", function () {
            $('.tree').treegrid('expandAll');
        });

        $(".collapse-all").on("click", function () {
            $('.tree').treegrid('collapseAll');
        });

        $(".chucVuQLNV").on("click", function () {
            var chucDanh = $(this).data("chucdanh");
            var loai = $(this).data("loai");
            if ($(this).data("selected")) {
                $(this).css("color", "rgb(2, 117, 216)");
                $(this).data("selected", false);
                $.ajax({
                    type: "GET",
                    url: nhanVienTheoChucDanhURL,
                    data: {
                        toaAnId: ddlToaAnQLNV.val()
                    },
                    success: function (data) {
                        $("#nhanviencontent").html(data);
                    }
                });
            }
            else {
                $('.chucVuQLNV').each(function () {
                    $(this).css("color", "rgb(2, 117, 216)");
                    $(this).data("selected", false);
                });
                $(this).css("color", "crimson");
                $(this).data("selected", true);
                $.ajax({
                    type: "GET",
                    url: nhanVienTheoChucDanhURL,
                    data: {
                        toaAnId: ddlToaAnQLNV.val(),
                        chucDanh: chucDanh,
                        loai: loai
                    },
                    success: function (data) {
                        $("#nhanviencontent").html(data);
                    }
                });
            }
        });
    }

    return {
        loadSoDoToChucQLNV: loadSoDoToChucQLNV,
        loadSoDoToChucQLNVChucVu: loadSoDoToChucQLNVChucVu,
        reloadSoDoToChucQLNV: reloadSoDoToChucQLNV,
        reloadSoDoToChucQLNVChucVu: reloadSoDoToChucQLNVChucVu
    }
})();

var ThuKyNhanVienModule = (function (nhanVienTheoToaAnModule) {
    function init() {
        $formThuKy = $("#formThuKyTheoThamPhan");
        anhienNV();
        checkHalf();
        bindFormAction();
    }

    function anhienNV() {
        $('#loaiNV').change(function () {
            if ($(this).val() == 2) {
                $('#tk').hide();
                $('#ttv').show();
            }
            else {
                $('#tk').show();
                $('#ttv').hide();
            }
        });
    }
    function checkHalf() {
        $('#checkboxAlltk').change(function () {
            $(".cb-manv-tk").prop('checked', $(this).prop("checked"));
        });

        $('#checkboxAllttv').change(function () {
            $(".cb-manv-ttv").prop('checked', $(this).prop("checked"));
        });
    }

    function bindFormAction() {
        $("#btnCapNhatThuKy").on("click",
            function () {
                if ($formThuKy.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formThuKy.prop("method"),
                        url: $formThuKy.prop("action"),
                        data: $formThuKy.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $.notify({ message: response.Messages }, { type: "success" });
                            }
                        },
                        complete: function () {
                            $('#modalthuky').modal("hide");
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
})(NhanVienTheoToaAnModule);

var UploadImageModule = (function (nhanVienTheoToaAnModule) {
    function InitUploadDocuments() {
        var maxFileSize = $('#maxFileSize').val();
        var maxFiles = $('#maxFiles').val();
        var uploadMultiple = maxFiles > 1;
        var acceptedFiles = $('#acceptedFiles').val();

        Dropzone.options.dropzoneForm = {
            autoProcessQueue: false,
            maxFilesize: maxFileSize,
            maxFiles: maxFiles,
            uploadMultiple: uploadMultiple,
            parallelUploads: maxFiles,
            acceptedFiles: acceptedFiles,
            init: function () {
                var myDropzone = this;
                $('#uploadDocument').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    myDropzone.processQueue();
                });
                myDropzone.on("addedfile", function (file) {
                    // Prevent BITRUNG files
                    if (myDropzone.files.length) {
                        var _i, _len;
                        for (_i = 0, _len = myDropzone.files.length; _i < _len - 1; _i++) // -1 to exclude current file
                        {
                            if (myDropzone.files[_i].name === file.name && myDropzone.files[_i].size === file.size && myDropzone.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString()) {
                                myDropzone.removeFile(file);
                            }
                        }
                    }

                    // Add button remove to remove document what you don't want anymore
                    var removeButton = Dropzone.createElement('<div class="dz-remove" style="text-alagin:center; margin-top: 5px" data-dz-remove><button class="btn btn-danger" ><i class="fa fa-trash"></i></button></div>');

                    removeButton.addEventListener('click', function () {
                        myDropzone.removeFile(file);
                    });

                    file.previewElement.appendChild(removeButton);

                });
                myDropzone.on("maxfilesexceeded", function (file) {
                    myDropzone.removeFile(file);
                });
            },
            success: function (file, response) {
                if (!response.IsSuccess) {
                    $.notify({ message: "Cập nhật hình đại diện không thành công" }, { type: "danger" });
                } else {
                    $.notify({ message: "Cập nhật hình đại diện thành công" }, { type: "success" });
                    if ($("#keywordNhanVien").val()) {
                        NhanVienTheoToaAnModule.searchReload();
                    }
                    else {
                        NhanVienTheoToaAnModule.reloadNhanVienTable();
                    }
                }
            },
            complete: function () {
                $('#modal').modal("hide");
                $('#login_partial').load("/Home/ChangeLoginPartial");
                hideLoadingOverlay();
                
            }
        };

        Dropzone.discover();
    }
    return {
        InitUploadDocuments: InitUploadDocuments
    }
})((NhanVienTheoToaAnModule));
