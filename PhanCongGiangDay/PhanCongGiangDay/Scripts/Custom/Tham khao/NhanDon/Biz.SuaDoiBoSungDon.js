$(function () {
    SuaDoiBoSungDon.init();
});

var SuaDoiBoSungDon = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#popupEditSuaDoiBoSungDon",
        formEdit = "#formEditSuaDoiBoSungDon",
        contentTab = "#contentSuaDoiBoSungDon",
        selectNgayTao = "#selectNgayTaoSuaDoiBoSungDon";

    var getSuaDoiBoSungDonUrl = "/NhanDon/GetSuaDoiBoSungDonTheoHoSoVuAnID",
        getSuaDoiBoSungDonTheoIDUrl = "/NhanDon/GetSuaDoiBoSungDonTheoSuaDoiBoSungDonID",
        editSuaDoiBoSungDonUrl = "/NhanDon/EditSuaDoiBoSungDon";

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {           
            openFormEdit();
        });

        loadThongTin();
        loadThongTinTheoId();
        updateForm();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: HoSoVuAnID,
                contrCheck: "NhanDon",
                actionCheck: "EditSuaDoiBoSungDon"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaSuaDoiBoSung").addClass("edit-disabled");
                    $("#btnThemSuaDoiBoSung").addClass("add-disabled");
                }
            }
        });
    }

    function openFormEdit() {
        showLoadingOverlay(modalId + " .modal-content");
        $.ajax({
            type: "GET",
            url: editSuaDoiBoSungDonUrl,
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
            url: getSuaDoiBoSungDonUrl,
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
                url: getSuaDoiBoSungDonTheoIDUrl,
                data: {
                    id: $(this).val()
                },
                success: function (response) {
                    $(contentTab).html(response);

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
                url: editSuaDoiBoSungDonUrl,
                data: $(_this).serialize(),
                success: function (response) {
                    var $wrapperResponse = $("<div>").append(response);

                    if ($wrapperResponse.find(formEdit).length === 0) {
                        $(contentTab).html(response);                        
                        $(modalId).modal('hide');
                        $.notify({ message: "Cập nhật sửa đổi / bổ sung đơn thành công" }, { type: "success" });
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

var EditSuaDoiBoSungDon = (function () {
    var idTextarea = 'NoiDungYeuCau';

    function init() {
        $("#NgayYeuCau").parent().datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            maxDate: moment()
        });

        $("#NgayYeuCau").parent().on("dp.change", function (e) {
            $("#ThoiHanSuaDoi").parent().data("DateTimePicker").minDate(e.date);
        });

        $("#ThoiHanSuaDoi").parent().datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            //minDate: moment($("#NgayYeuCau").val(), 'DD/MM/YYYY').toDate()
        });

        //var settings = $.extend({
        //    selector: ".tinymce-editor",
        //    height: 170,
        //}, $.tinymceDefaults);

        //tinymce.remove();
        //tinymce.init(settings);
        CKEDITOR.replace(idTextarea);
    }

    return {
        init: init
    }
})();