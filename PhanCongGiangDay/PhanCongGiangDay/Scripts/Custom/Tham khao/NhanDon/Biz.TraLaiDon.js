$(function () {
    TraLaiDon.init();
});

var TraLaiDon = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#popupEditTraLaiDon",
        formEdit = "#formEditTraLaiDon",
        contentTab = "#contentTraLaiDon",
        selectNgayTao = "#selectNgayTaoTraLaiDon",
        updateHoSoVuAn = "#HoSoVuAn_NgayTraDon";

    var getUrl = "/NhanDon/GetTraLaiDonTheoHoSoVuAnID",
        getTheoIDUrl = "/NhanDon/GetTraLaiDonTheoTraLaiDonID",
        editUrl = "/NhanDon/EditTraLaiDon";

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
                actionCheck: "EditTraLaiDon"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaTraLaiDon").addClass("edit-disabled");
                    $("#btnThemTraLaiDon").addClass("add-disabled");
                }
            }
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
                        //cap nhat phan chi tiet ho so vu an
                        $(updateHoSoVuAn).text($('#NgayTraDon').val());

                        $.notify({ message: "Cập nhật trả lại đơn thành công" }, { type: "success" });
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

var EditTraLaiDon = (function () {
    var idTextarea = 'GhiChu';

    function init() {
        $(".datepicker").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            maxDate: moment()
        });
        //initEditor();
        CKEDITOR.replace(idTextarea);
    }

    //function initEditor() {
    //    var defaults = $.tinymceDefaults;
    //    var lyDoChuyenDonSettings = $.extend({},
    //        {
    //            selector: "#GhiChu",
    //            height: 110,
    //            setup: function (ed) {
    //                ed.on("change",
    //                    function () {
    //                        tinymce.triggerSave();
    //                        $("#" + ed.id).valid();
    //                    });
    //            }
    //        },
    //        defaults);
    //    tinymce.init(lyDoChuyenDonSettings);
    //}

    return {
        init: init
    }
})();