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

    AnPhiModule.init();
});

var AnPhiModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentAnPhi = "#contentAnPhi",       
        selectNgayTao = "#selectNgayTaoAnPhi";

    var getAnPhiUrl = "/ThuLy/AnPhi",
        getAnPhiTheoIdUrl = "/ThuLy/ChiTietAnPhiTheoId";

    function init() {
        loadThongTinAnPhi();
        loadThongTinAnPhiTheoId();        
    }   

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ThuLy",
                actionCheck: "SuaYeuCauDuNopAnPhi"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaAnPhi").addClass("edit-disabled");
                    $("#btnThemAnPhi").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinAnPhi() {
        showLoadingOverlay(contentAnPhi);
        $.ajax({
            type: "GET",
            url: getAnPhiUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentAnPhi).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentAnPhi);               
            }
        });
    }

    function loadThongTinAnPhiTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentAnPhi);
            $.ajax({
                type: "GET",
                url: getAnPhiTheoIdUrl,
                data: {
                    hoSoVuAnId: hoSoVuAnId,
                    anPhiId: $(this).val()
                },
                success: function (response) {
                    $(contentAnPhi).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentAnPhi);
                }
            });
        });
    }    

    return {
        init: init,
        loadThongTinAnPhi: loadThongTinAnPhi
    }
})();

var AnPhiModalModule = (function (anPhiModule) {
    var $formEditPhaiDuNop,
        $formEditMienDuNop;   
        //$formEditKetQuaDuNop;
    var updateHoSoVuAnGiaTriDuNop = "#HoSoVuAn_GiaTriDuNop",
        updateHoSoVuAnHanNopAnPhi = "#HoSoVuAn_HanNopAnPhi";

    function init() {
        $formEditPhaiDuNop = $("#formEditPhaiDuNop");
        $formEditMienDuNop = $("#formEditMienDuNop");       
        //$formEditKetQuaDuNop = $("#formEditKetQuaDuNopAnPhi");
        var nopAnPhiHidden = $("#nop-an-phi-hidden").val();

        $("#modal").on("shown.bs.modal", function (e) {
            $("#tab-ket-qua-du-nop *").prop('disabled', true);
        });
        initDiaChiCoQuanThiHanhAnThu();
        $("#co-quan-thi-hanh-an-thu-ddl").change();
        initFormEditTheoNopAnPhi(nopAnPhiHidden);        
        initNopAnPhiDropdownlistForm1();
        initNopAnPhiDropdownlistForm2();
        initDateTimePicker();
        //initValidation();
        initNgayGiaoThongBaoTheoNgayRaThongBao();
        initHanNopAnPhiTheoNgayGiaoThongBao();
        selectTabPaneChange();
        
        tinhToanGiaTriNhap();
        bindFormActionsMienDuNop();
        bindFormActionsPhaiDuNop();
    }

    function initDateTimePicker() {
        $("#ngay-ra-thong-bao-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date(),
            useCurrent: false
        });
        var ngayRaThongBao = $("#ngay-ra-thong-bao-dtp").find("input").val();
        $("#ngay-giao-thong-bao-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            //minDate: moment(ngayRaThongBao, 'DD/MM/YYYY').toDate(),
            defaultDate: moment(ngayRaThongBao, 'DD/MM/YYYY').toDate(),
            useCurrent: false
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
            defaultDate: moment(),
            //maxDate: moment()
        });
        $("#ngay-nop-bien-lai-cho-toa-an-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: moment(),
            //maxDate: moment()
        });
    }

    function initNgayGiaoThongBaoTheoNgayRaThongBao() {
        $("#ngay-ra-thong-bao-dtp").on("dp.change",
            function (e) {                 
                var ngayRaThongBao = $("#ngay-ra-thong-bao-dtp").find("input").val().split("/");
                var ngayGiaoThongBao = moment(new Date(ngayRaThongBao[2], ngayRaThongBao[1] - 1, ngayRaThongBao[0])).format('DD/MM/YYYY');                            
                $("#ngay-giao-thong-bao-dtp").find("input").val(ngayGiaoThongBao);
                $("#ngay-giao-thong-bao-dtp").data("DateTimePicker").minDate(ngayGiaoThongBao);

                var ngayGiaoThongBaoUpdate = $("#ngay-giao-thong-bao-dtp").find("input").val().split("/");
                var hanNopAnPhi = moment(new Date(ngayGiaoThongBaoUpdate[2], ngayGiaoThongBaoUpdate[1] - 1, ngayGiaoThongBaoUpdate[0])).add(7, 'days').format('DD/MM/YYYY');
                $("#han-nop-an-phi-dtp").find("input").val(hanNopAnPhi);
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
                //document.getElementById('span_id').innerHTML
                $("#han-nop-an-phi-dtp").find("input").val(hanNopAnPhi);
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
        $("#nop-an-phi-ddl-form1").on("change", function () {
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
                    $("#contentPhaiDuNop").show();
                    $("#contentMienDuNop").hide();     
                    $("#nguoi-nhan-bien-lai-textarea").prop('disabled', true);
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

    function initDiaChiCoQuanThiHanhAnThu() {
        $("#co-quan-thi-hanh-an-thu-ddl").on("change", function () {
            $("#list-dia-chi-co-quan-thi-hanh-an li").each(function () {
                if ($("#co-quan-thi-hanh-an-thu-ddl").val() === $(this).children().val()) {
                    $("#dia-chi-co-quan-thi-hanh-an-thu-lbl").html("<label><u><strong>Đ/c:</u></strong> "+ $(this).text()+"</label>");
                    $("#dia-chi-co-quan-thi-hanh-an-hidden").val($(this).text());
                }
            });
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
   
    function tinhToanGiaTriNhap() {  
        //tinh gia tri tong an phi, gia tri du nop khi gia tri tranh chap thay doi
        $("#gia-tri-tranh-chap-txt").keyup(function () {
            var nhomAn = $("#nhomAn").val();
            var strCurrency = $("#gia-tri-tranh-chap-txt").val();
            var strPhanTramDuNop = $("#phan-tram-du-nop-txt").val();
            var tongAnPhi;
            var giaTriTranhChap = Number(strCurrency.replace(/[^0-9\-]+/g, ""));
            $('#gia-tri-tranh-chap-txt').val(giaTriTranhChap.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            if (nhomAn === "KT") {
                if (giaTriTranhChap <= 60000000) { tongAnPhi = 3000000; }
                else if (giaTriTranhChap > 6000000 && giaTriTranhChap <= 400000000) { tongAnPhi = giaTriTranhChap * 0.05; }
                else if (giaTriTranhChap > 400000000 && giaTriTranhChap <= 800000000) { tongAnPhi = 20000000 + (giaTriTranhChap - 400000000) * 0.04; }
                else if (giaTriTranhChap > 400000000 && giaTriTranhChap <= 2000000000) { tongAnPhi = 36000000 + (giaTriTranhChap - 800000000) * 0.03; }
                else if (giaTriTranhChap > 2000000000 && giaTriTranhChap <= 4000000000) { tongAnPhi = 72000000 + (giaTriTranhChap - 2000000000) * 0.02; }
                else if (giaTriTranhChap > 4000000000) { tongAnPhi = 112000000 + (giaTriTranhChap - 4000000000) * 0.001; }
            }
            else if (nhomAn === "LD") {
                if (giaTriTranhChap <= 10000000) {
                    tongAnPhi = 300000;
                } else if (giaTriTranhChap > 10000000 && giaTriTranhChap <= 400000000) {
                    tongAnPhi = giaTriTranhChap * 0.03;
                } else if (giaTriTranhChap > 400000000 && giaTriTranhChap <= 2000000000) {
                    tongAnPhi = 12000000 + (giaTriTranhChap - 400000000) * 0.02;
                } else if (giaTriTranhChap > 2000000000) {
                    tongAnPhi = 44000000 + (giaTriTranhChap - 2000000000) * 0.001;
                }
            }
            else {
                if (giaTriTranhChap <= 6000000) { tongAnPhi = 300000; }
                else if (giaTriTranhChap > 6000000 && giaTriTranhChap <= 400000000) { tongAnPhi = giaTriTranhChap * 0.05; }
                else if (giaTriTranhChap > 400000000 && giaTriTranhChap <= 800000000) { tongAnPhi = 20000000 + (giaTriTranhChap - 400000000) * 0.04; }
                else if (giaTriTranhChap > 400000000 && giaTriTranhChap <= 2000000000) { tongAnPhi = 36000000 + (giaTriTranhChap - 800000000) * 0.03; }
                else if (giaTriTranhChap > 2000000000 && giaTriTranhChap <= 4000000000) { tongAnPhi = 72000000 + (giaTriTranhChap - 2000000000) * 0.02; }
                else if (giaTriTranhChap > 4000000000) { tongAnPhi = 112000000 + (giaTriTranhChap - 4000000000) * 0.001; }
            }
            $("#tong-an-phi-txt").val(tongAnPhi.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            //if ($("#giaiDoanHoSo").val() == 1) {
            //    $("#tong-an-phi-txt").val($tongAnPhi.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
            //}

            var phanTramDuNop = Number(strPhanTramDuNop.replace(/,/g, ".").replace(/\s/g, ""));
            phanTramDuNop /= 100;
            var giaTriDuNop = formatThousands(tongAnPhi * phanTramDuNop);
            if (nhomAn === "KT") {
                if (giaTriDuNop <= 3000000)
                    giaTriDuNop = 3000000;
            }
            else {
                if (giaTriDuNop <= 300000)
                    giaTriDuNop = 300000;
            }
            
            $("#gia-tri-du-nop-txt").val(giaTriDuNop.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
            //alert(giaTriDuNop);
        });
        //tinh gia tri du nop khi phan tram du nop thay doi
        $("#phan-tram-du-nop-txt").keyup(function () {
            var nhomAn = $("#nhomAn").val();
            var strPhanTramDuNop = $("#phan-tram-du-nop-txt").val();
            var strTongAnPhi = $("#tong-an-phi-txt").val();
            
            var phanTramDuNop = Number(strPhanTramDuNop.replace(/,/g, ".").replace(/\s/g, ""));
            phanTramDuNop /= 100;
            var tongAnPhi = Number(strTongAnPhi.replace(/[^0-9\-]+/g, ""));
            
            var giaTriDuNop = formatThousands(tongAnPhi * phanTramDuNop);
            if (nhomAn === "KT") {
                if (giaTriDuNop <= 3000000)
                    giaTriDuNop = 3000000;
            }
            else {
                if (giaTriDuNop <= 300000)
                    giaTriDuNop = 300000;
            }

            $("#gia-tri-du-nop-txt").val(giaTriDuNop.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));        
        });
        
    }

    function formatThousands(n) {
        var r = Math.round(n / 1000);
        return r * 1000;
    };

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
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATANPHI_LEPHI_KHONGTHANHCONG}, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATANPHI_LEPHI_THANHCONG }, { type: "success" });
                                anPhiModule.loadThongTinAnPhi();
                                //cap nhat phan chi tiet ho so vu an
                                $(updateHoSoVuAnGiaTriDuNop).text("");
                                $(updateHoSoVuAnHanNopAnPhi).text("");
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
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATANPHI_LEPHI_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATANPHI_LEPHI_THANHCONG }, { type: "success" });
                                anPhiModule.loadThongTinAnPhi();
                                //cap nhat phan chi tiet ho so vu an                                
                                $(updateHoSoVuAnGiaTriDuNop).text($('#gia-tri-du-nop-txt').val() + " VND");
                                $(updateHoSoVuAnHanNopAnPhi).text($('#YeuCauDuNopViewModel_HanNopAnPhi').val());
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                } else {
                    return false;
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
            errorPlacement: function(error) {
                var htmlFor = error[0].htmlFor;

                $('span[for="' + htmlFor + '"]').each(function() {
                    $(this).append(error);
                });
            },
            success: function(error) {
                error.remove();
            }
        });
    }

    return {
        init: init
    }
})(AnPhiModule);