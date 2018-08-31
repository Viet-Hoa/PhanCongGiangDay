$(function () {
    $.validator.addMethod("hanNopAnPhiGreaterThan",
        function (value, element, params) {
            if (!isNaN(value))
                return true;
            var d = new Date();
            var paramValue = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            var newValue = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
            //var paramValue = $(params).val().replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");

            if (!/Invalid|NaN/.test(new Date(newValue))) {
                return new Date(newValue) >= new Date(paramValue);
            }

            return Number(newValue) >= Number(paramValue);
        }, "Hạn nộp án phí/ lệ phí phải lớn hơn ngày hiện tại.");

    $.validator.addMethod("ngayNopAnPhiNotGreaterThan",
        function (value, element, params) {
            if (!isNaN(value))
                return true;
            var d = new Date();
            var paramValue = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            var newValue = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");

            if (!/Invalid|NaN/.test(new Date(newValue))) {
                return new Date(newValue) <= new Date(paramValue);
            }

            return Number(newValue) <= Number(paramValue);
        }, "Ngày nộp tạm ứng án phí/ lệ phí không được lớn hơn ngày hiện tại.");

    $.validator.addMethod("ngayNopBienLaiNotGreaterThan",
        function (value, element, params) {
            if (!isNaN(value))
                return true;
            var d = new Date();
            var paramValue = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            var newValue = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");

            if (!/Invalid|NaN/.test(new Date(newValue))) {
                return new Date(newValue) <= new Date(paramValue);
            }

            return Number(newValue) <= Number(paramValue);
        }, "Ngày nộp biên lai cho tòa án không được lớn hơn ngày hiện tại.");  

    TamUngAnPhiModule.initTamUngAnPhi();
});

var TamUngAnPhiModule = (function () {

    var hoSoVuAnId = $("#hoSoVuAnID").val();
    var roleGiaiDoan = $("#roleGiaiDoan").val();
    var roleCongDoan = $("#roleCongDoan").val();

    var selectNgayTao = "#selectNgayTaoTamUngAnPhi";

    var getThongTinTamUngAnPhiUrl = "/SauXetXu/TamUngAnPhi",
        getThongTinTamUngAnPhiTheoIdUrl = "/SauXetXu/ChiTietTamUngAnPhiTheoId";

    function initTamUngAnPhi() {
        loadThongTinTamUngAnPhi();
        loadThongTinTamUngAnPhiTheoId();
    }

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "SauXetXu",
                actionCheck: "SuaYeuCauDuNopTamUngAnPhi"
            },
            success: function (response) {
                if (response.role == -1 || roleCongDoan == -1 || roleGiaiDoan == -1) {
                    $("#btnThemTamUngAnPhi").addClass("add-disabled");
                    $("#btnSuaTamUngAnPhi").addClass("edit-disabled");
                }
            }
        });
    }

    function loadThongTinTamUngAnPhi() {
        showLoadingOverlay("#tam-ung-an-phi-le-phi-container");
        $.ajax({
            type: "GET",
            url: getThongTinTamUngAnPhiUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $("#tam-ung-an-phi-le-phi-container").html(response);
                initRoleNhanVien();

                hideLoadingOverlay("#tam-ung-an-phi-le-phi-container");
            }
        });
    }

    function loadThongTinTamUngAnPhiTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay("#tam-ung-an-phi-le-phi-container");
            $.ajax({
                type: "GET",
                url: getThongTinTamUngAnPhiTheoIdUrl,
                data: {
                    hoSoVuAnId: hoSoVuAnId,
                    anPhiId: $(this).val()
                },
                success: function (response) {
                    $("#tam-ung-an-phi-le-phi-container").html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay("#tam-ung-an-phi-le-phi-container");
                }
            });
        });
    }

    return {
        initTamUngAnPhi: initTamUngAnPhi,
        loadThongTinTamUngAnPhi: loadThongTinTamUngAnPhi
    }
})();

var TamUngAnPhiModalModule = (function (tamUngAnPhiModule) {
    var $formEditMienDuNop,
        $formEditPhaiDuNop,
        $formEditKetQuaDuNop;

    function init() {
        $formEditMienDuNop = $("#formEditMienDuNop");
        $formEditPhaiDuNop = $("#formEditPhaiDuNop");
        $formEditKetQuaDuNop = $("#formEditKetQuaDuNopAnPhi");
        var nopAnPhiHidden = $("#nop-an-phi-hidden").val();

        $("#modal").on("shown.bs.modal", function (e) {
            $("#tab-ket-qua-du-nop *").prop('disabled', true);
        });
        initFormEditTheoNopAnPhi(nopAnPhiHidden);
        initNopAnPhiDropdownlistForm1();
        initNopAnPhiDropdownlistForm2();
        initDateTimePicker();
        //initValidation();
        initHanNopAnPhiTheoNgayGiaoThongBao();
        selectTabPaneChange();
        //setTamUngAnPhiDefault();
        initDiaChiCoQuanThiHanhAnThu();               
        bindFormActionsMienDuNop();
        bindFormActionsPhaiDuNop();
    }


    function initDateTimePicker() {
        $("#ngay-ra-thong-bao-dtp1").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
        });
        var ngayRaThongBao = $("#ngay-ra-thong-bao-dtp1").find("input").val();
        $("#ngay-giao-thong-bao-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            //minDate: moment(ngayRaThongBao, 'DD/MM/YYYY').toDate(),
            defaultDate: moment(ngayRaThongBao, 'DD/MM/YYYY').toDate()
        });
        var date = 7;
        if ($('#loaiQuanHe').val() == "Yêu cầu" && $('#nhomAn').val() != "HS" && $('#nhomAn').val() != "HC" && $('#nhomAn').val() != "AD") {
            date = 5;
        }
        $("#han-nop-an-phi-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment().add(date, 'days'),
            useCurrent: false
        });
        
        $("#ngay-nop-an-phi-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment()
        });
        $("#ngay-nop-bien-lai-cho-toa-an-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment()
        });
    }

    function initHanNopAnPhiTheoNgayGiaoThongBao() {

        var hanNopAnPhi;
        $("#ngay-giao-thong-bao-dtp").on("dp.change",
            function (e) {
                var ngayGiaoThongBao = $("#ngay-giao-thong-bao-dtp").find("input").val().split("/");
                hanNopAnPhi = moment(new Date(ngayGiaoThongBao[2], ngayGiaoThongBao[1] - 1, ngayGiaoThongBao[0])).add(7, 'days').format('DD/MM/YYYY');
                if ($('#loaiQuanHe').val() == "Yêu cầu" && $('#nhomAn').val() != "HS" && $('#nhomAn').val() != "HC" && $('#nhomAn').val() != "AD") {
                    hanNopAnPhi = moment(new Date(ngayGiaoThongBao[2], ngayGiaoThongBao[1] - 1, ngayGiaoThongBao[0])).add(5, 'days').format('DD/MM/YYYY');
                }
                $("#han-nop-an-phi-dtp").find("input").val(hanNopAnPhi);
            });
    }

    function initDiaChiCoQuanThiHanhAnThu() {
       $("#co-quan-thi-hanh-an-thu-ddl").on("change", function () {
            $("#list-dia-chi-co-quan-thi-hanh-an li").each(function () {
                if ($("#co-quan-thi-hanh-an-thu-ddl").val() === $(this).children().val()) {
                    $("#dia-chi-co-quan-thi-hanh-an-thu-lbl").html("<label><u><strong>Đ/c:</u></strong> " + $(this).text() + "</label>");
                    $("#dia-chi-co-quan-thi-hanh-an-hidden").val($(this).text());
                }
            });
        });
    }

    //init form edit theo loại nộp án phí khi lần đầu load Edit form
    function initFormEditTheoNopAnPhi(typeNopAnPhi) {
        if (typeNopAnPhi === "Phải dự nộp") {
            $("#contentPhaiDuNop *").prop('disabled', false);
            $("#contentMienDuNop *").prop('disabled', true);
            $("#nop-an-phi-ddl-form2").val("Phải dự nộp");
            $("#contentMienDuNop").hide();
            $("#contentPhaiDuNop").show();
            $("#tab-ket-qua-du-nop *").prop('disabled', true);
            $("#nguoi-nhan-bien-lai-textarea").prop('disabled', true);
            $("#co-quan-thi-hanh-an-thu-ddl").change();
        }
        else {
            $("#contentMienDuNop *").prop('disabled', false);
            $("#contentPhaiDuNop *").prop('disabled', true);
            $("#contentPhaiDuNop").hide();
            $("#contentMienDuNop").show();
        }
    }

    //select change value dropdownlist edit form 1
    function initNopAnPhiDropdownlistForm1() {
        var $ddlNopAnPhiForm1 = $("#nop-an-phi-ddl-form1");
        $ddlNopAnPhiForm1.on("change", function () {
            initFormEditTheoNopAnPhi(this.value);
        });
    }

    //select change value dropdownlist edit form 2
    function initNopAnPhiDropdownlistForm2() {
        $("#nop-an-phi-ddl-form2").on("change",
            function () {
                if (this.value === "Phải dự nộp") {
                    $("#contentPhaiDuNop *").prop('disabled', false);
                    $("#contentMienDuNop *").prop('disabled', true);
                    $("#nguoi-nhan-bien-lai-textarea").prop('disabled', true);
                    $("#contentPhaiDuNop").show();
                    $("#contentMienDuNop").hide();
                }
                else {
                    $("#contentMienDuNop *").prop('disabled', false);
                    $("#contentPhaiDuNop *").prop('disabled', true);
                    $("#nop-an-phi-ddl-form1").val(this.value);
                    $("#contentMienDuNop").show();
                    $("#contentPhaiDuNop").hide();
                }
            });
    }

    //thay doi tabpane yeu cau du nop va ket qua du nop
    function selectTabPaneChange() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href"); // activated tab
            if (target === "#tab-yeu-cau-du-nop") {
                $("#tab-yeu-cau-du-nop *").prop('disabled', false);
                $("#tab-ket-qua-du-nop *").prop('disabled', true);
            }
            else if (target === "#tab-ket-qua-du-nop") {
                $("#tab-ket-qua-du-nop *").prop('disabled', false);
                //$("#tab-yeu-cau-du-nop *").prop('disabled', true);
                $("#nguoi-nhan-bien-lai-textarea").prop('disabled', true);
            }
        });
    }

    function bindFormActionsMienDuNop() {
        $("#mien-du-nop-btn").on("click",
            function () {
                if ($formEditMienDuNop.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formEditMienDuNop.prop("method"),
                        url: $formEditMienDuNop.prop("action"),
                        data: $formEditMienDuNop.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: "Cập nhật thông tin nộp tạm ứng án phí/ lệ phí không thành công." }, { type: "danger" });
                            } else {
                                $.notify({ message: "Cập nhật thông tin nộp tạm ứng án phí/ lệ phí thành công." }, { type: "success" });
                                tamUngAnPhiModule.loadThongTinTamUngAnPhi();
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

    function bindFormActionsPhaiDuNop() {
        $("#phai-du-nop-btn").on("click",
            function () {
                if ($formEditPhaiDuNop.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formEditPhaiDuNop.prop("method"),
                        url: $formEditPhaiDuNop.prop("action"),
                        data: $formEditPhaiDuNop.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: "Cập nhật thông tin nộp tạm ứng án phí/ lệ phí không thành công." }, { type: "danger" });
                            } else {
                                $.notify({ message: "Cập nhật thông tin nộp tạm ứng án phí/ lệ phí thành công." }, { type: "success" });
                                tamUngAnPhiModule.loadThongTinTamUngAnPhi();
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

    function initValidation() {
        $formEditPhaiDuNop.validate({
            ignore: '',
            rules: {
                "YeuCauDuNopViewModel.HanNopAnPhi": {
                    hanNopAnPhiGreaterThan: ""
                },
                "KetQuaNopViewModel.NgayNopAnPhi": {
                    ngayNopAnPhiNotGreaterThan: ""
                },
                "KetQuaNopViewModel.NgayNopBienLaiChoToaAn": {
                    ngayNopBienLaiNotGreaterThan: ""
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
})(TamUngAnPhiModule);