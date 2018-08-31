$(function () {
    XetXuNoiDung.init();
    MoPhienHopHCPhucTham.init();
});

var XetXuNoiDung = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        xetXuGroup = 0, //1: đưa vụ án ra xét xử, 2: mở phiên họp, 0: dùng chung cả 2 trường hợp
        loaiKetQuaXetXu = $("#loaiKetQuaXetXu").val();
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#modelXetXuNoiDung",
        formEdit = "#formEditXetXuNoiDung",
        contentTab = "#contentXetXuNoiDung",
        selectNgayTao = "#selectNgayTaoXetXu";


    var getUrl = "/XetXu/GetXetXuNoiDungTheoHoSoVuAnID",
        getTheoIDUrl = "/XetXu/GetXetXuNoiDungTheoXetXuID",
        editUrl = "/XetXu/EditXetXuNoiDung";

    function init() {
        $(modalId).on("shown.bs.modal", function (e) {
            openFormEdit();            
        });

        if ($("#nhomAn").val() == "HC" && $("#giaiDoanHoSo").val() == 2) {
            xetXuGroup = 1; //1: đưa vụ án ra xét xử, 2: mở phiên họp
        }

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
                contrCheck: "XetXu",
                actionCheck: "EditXetXuNoiDung"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemNoiDungXetXu").addClass("add-disabled");
                    $("#btnSuaNoiDungXetXu").addClass("edit-disabled");
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
                id: HoSoVuAnID,
                xetXuGroup: xetXuGroup,
                loaiKetQuaXetXu: loaiKetQuaXetXu
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
                id: HoSoVuAnID,
                xetXuGroup: xetXuGroup
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

                        if($("#loaiQuanHe").val() == "Tranh chấp")
                            $.notify({ message: NotifyMessage.MESSAGE_CAPNHAT_NOIDUNGXETXU_THANHCONG }, { type: "success" });
                        else
                            $.notify({ message: NotifyMessage.MESSAGE_CAPNHAT_MOPHIENHOP_THANHCONG }, { type: "success" });
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

//thêm tab mở phiên họp - Hành chính Phúc thẩm
var MoPhienHopHCPhucTham = (function () {
    var HoSoVuAnID = $("#HoSoVuAnID").val(),
        loaiKetQuaXetXu = $("#loaiKetQuaXetXu").val(),
        xetXuGroup = 2, //1: đưa vụ án ra xét xử, 2: mở phiên họp
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalId = "#modelMoPhienHopHCPhucTham",
        formEdit = "#formEditMoPhienHopHCPhucTham",
        contentTab = "#contentMoPhienHopHCPhucTham",
        selectNgayTao = "#selectNgayTaoMoPhienHopHCPhucTham";


    var getUrl = "/XetXu/GetXetXuNoiDungTheoHoSoVuAnID",
        getTheoIDUrl = "/XetXu/GetXetXuNoiDungTheoXetXuID",
        editUrl = "/XetXu/EditXetXuNoiDung";

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
                contrCheck: "XetXu",
                actionCheck: "EditXetXuNoiDung"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemNoiDungXetXu").addClass("add-disabled");
                    $("#btnSuaNoiDungXetXu").addClass("edit-disabled");
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
                id: HoSoVuAnID,
                xetXuGroup: xetXuGroup,
                loaiKetQuaXetXu: loaiKetQuaXetXu
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
                id: HoSoVuAnID,
                xetXuGroup: xetXuGroup
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

                        $.notify({ message: NotifyMessage.MESSAGE_CAPNHAT_MOPHIENHOP_THANHCONG }, { type: "success" });
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
