$(function () {
    ChuanBiXetXuHoaGiai.init();
});

var ChuanBiXetXuHoaGiai = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#modelChuanBiXetXuHoaGiai",
        formEdit = "#formEditChuanBiXetXuHoaGiai",
        contentTab = "#contentChuanBiXetXuHoaGiai",
        selectNgayTao = "#selectNgayTaoHoaGiai";


    var getUrl = "/ChuanBiXetXu/GetChuanBiXetXuHoaGiaiTheoHoSoVuAnID",
        getTheoIDUrl = "/ChuanBiXetXu/GetChuanBiXetXuHoaGiaiTheoHoaGiaiID",
        editUrl = "/ChuanBiXetXu/EditChuanBiXetXuHoaGiai";

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {
            openFormEdit();
        });

        loadThongTin();
        loadThongTinTheoId();
        updateForm();
        //changeSelectThamPhan();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "ChuanBiXetXu",
                actionCheck: "EditChuanBiXetXuHoaGiai"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnSuaHoaGiai").addClass("edit-disabled");
                    $("#btnThemHoaGiai").addClass("add-disabled");
                }
            }
        });
    }

    function changeSelectThamPhan() {
        $(document).on("change", '#ThamPhan', function () {
            var maNV = $(this).val();
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: '/ChuanBiXetXu/GetThuKyTheoThamPhan',
                data: {
                    manv: maNV
                },
                success: function (response) {
                    $('#ThuKy').html('');
                    for (var i = 0; i < response.length; i++) {
                        $('#ThuKy').append('<option value="' + response[i].MaNV + '">' + response[i].HoVaTenNV + ' (' + response[i].MaNV + ')' + '</option>');
                    }

                    $('#ThuKy').removeAttr('disabled');
                    $('#ThuKy').next('input[name=ThuKy]').val('');
                }
            });
        });
    }

    function openFormEdit() {
        showLoadingOverlay(modalId + " .modal-content");
        $.ajax({
            type: "GET",
            url: editUrl,
            data: {
                id: HoSoVuAnID
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

    function loadThongTinTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentTab);
            $.ajax({
                type: "GET",
                url: getTheoIDUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentTab).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentTab);
                }
            });
        });
    }

    function updateForm() {
        $(document).on("submit", formEdit, function () {
            var _this = this;
            showLoadingOverlay(modalId + " .modal-content");

            $.ajax({
                type: "POST",
                url: editUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEdit).length === 0) {
                        $(contentTab).html(response);
                        $(modalId).modal('hide');

                        $.notify({ message: "Cập nhật hòa giải, công khai chứng cứ thành công" }, { type: "success" });
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

    return {
        init: init
    }
})();