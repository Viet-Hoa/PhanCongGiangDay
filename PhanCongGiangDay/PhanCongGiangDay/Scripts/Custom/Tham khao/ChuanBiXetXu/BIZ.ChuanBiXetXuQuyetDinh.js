var ChuanBiXetXuQuyetDinh = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId    = "#modelChuanBiXetXuQuyetDinh",
        formEdit   = "#formEditChuanBiXetXuQuyetDinh",
        contentTab = "#contentChuanBiXetXuQuyetDinh",
        modelConfirmDelete = "#modelChuanBiXetXuXoaQuyetDinh";


    var getUrl  = "/ChuanBiXetXu/GetChuanBiXetXuDanhSachQuyetDinhTheoHoSoVuAnID",
        addUrl  = "/ChuanBiXetXu/ThemChuanBiXetXuQuyetDinh",
        editUrl = "/ChuanBiXetXu/EditChuanBiXetXuQuyetDinhTheoQuyetDinhID";

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {
            var editID = $(e.relatedTarget).attr('data-edit-id');
            openFormEdit(editID);
        });

        loadThongTin();
        updateForm();
        deleteQuyetDinh();
        //changeSelectLoaiQuyetDinh();
        onQuyetDinhLoaiChange();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "ChuanBiXetXu",
                actionCheck: "ThemChuanBiXetXuQuyetDinh"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemQuyetDinh").addClass("add-disabled");
                    $(".btn-grid").addClass("edit-disabled");                   
                }
            }
        });
    }

    //function changeSelectLoaiQuyetDinh() {
    //    $(document).on("change", '#LoaiQuyetDinh', function () {
    //        var id = $(this).find('option:selected').attr('data-loaiquyetdinh');
    //        $.ajax({
    //            type: "GET",
    //            dataType: 'json',
    //            url: '/ChuanBiXetXu/GetDanhSachQuyetDinh',
    //            data: {
    //                id: id
    //            },
    //            success: function (response) {
    //                $('#TenQuyetDinh').html('');
    //                for (var i = 0; i < response.length; i++) {
    //                    $('#TenQuyetDinh').append('<option value="' + response[i].TenQuyetDinh + '">' + response[i].TenQuyetDinh + '</option>');
    //                }

    //                $('#TenQuyetDinh').removeAttr('disabled');
    //            }
    //        });
    //    });
    //}

    function onQuyetDinhLoaiChange() {
        $(document).on("change", '#QuyetDinhLoai', function () {
            var loai = $(this).val();
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: '/ChuanBiXetXu/GetDanhSachTenQuyetDinh',
                data: {
                    quyetDinhLoai: loai
                },
                success: function (response) {
                    $('#TenQuyetDinh').html('');
                    $('#TenQuyetDinh').append('<option value="">--Chọn--</option>');
                    for (var i = 0; i < response.length; i++) {
                        $('#TenQuyetDinh').append('<option value="' + response[i].Value + '">' + response[i].Text + '</option>');
                    }
                }
            });
        });
    }

    function openFormEdit(id) {
        showLoadingOverlay(modalId + " .modal-content");

        var dataUrl = addUrl,
            dataId = HoSoVuAnID;

        if (typeof id !== 'undefined') {
            dataUrl = editUrl;
            dataId = id;
        }

        $.ajax({
            type: "GET",
            url: dataUrl,
            data: {
                id: dataId
            },
            success: function (response) {
                $(modalId + " .modal-content").html(response);

                hideLoadingOverlay(modalId + " .modal-content");
            }
        });
    }

    function loadThongTin() {
        showLoadingOverlay(contentTab);
        $.ajax({
            type: "GET",
            url: getUrl,
            data: {
                id: HoSoVuAnID
            },
            success: function (response) {
                $(contentTab).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentTab);
            }
        });
    }

    function updateForm() {
        $(document).on("submit", formEdit, function () {
            var _this = this;
            //$().CKEditorSetValForTextarea("ghi-chu-quyet-dinh-cbxx");
            showLoadingOverlay(modalId + " .modal-content");

            $.ajax({
                type: "POST",
                url: addUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEdit).length === 0) {
                        $(contentTab).html(response);
                        $(modalId).modal('hide');
                        if ($(_this).find('input[name=QuyetDinhID]').val() > 0) {
                            
                            if ($(_this).find('input[name=QuyetDinhLoai]').val() == 1)
                                $.notify({ message: "Cập nhật quyết định / thông báo thành công" }, { type: "success" });
                            else $.notify({ message: "Cập nhật quyết định / thông báo thành công" }, { type: "success" });                         
                        }
                        else {
                            if ($(_this).find('input[name=QuyetDinhLoai]').val() == 1)
                                $.notify({ message: "Thêm quyết định / thông báo thành công" }, { type: "success" });
                            else $.notify({ message: "Thêm quyết định / thông báo thành công" }, { type: "success" });  
                        }
                    }
                    else {
                        $(modalId + " .modal-content").html(response);
                    }

                    hideLoadingOverlay(modalId + " .modal-content");

                }
            });

            return false;
        });
    }

    function deleteQuyetDinh() {
        $(modelConfirmDelete).on("shown.bs.modal", function (e) {
            var deleteUrl = $(e.relatedTarget).attr('data-delete-url');
            $(this).find('.delete-chuan-bi-xet-xu-quyet-dinh').attr('href', deleteUrl);
        });

        $(document).on('click', '.delete-chuan-bi-xet-xu-quyet-dinh', function () {            
            var href = $(this).attr('href');
            $.ajax({
                type: "GET",
                url: href,
                success: function (response) {
                    $(contentTab).html(response);
                    $(modelConfirmDelete).modal('hide');
                }
            });

            return false;
        });
    }

    return {
        init: init
    }
})();


$(function () {
    ChuanBiXetXuQuyetDinh.init();
});