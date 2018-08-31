$(function () {
    ThongTinThuLyModule.init();
});

var ThongTinThuLyModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var contentThongTinThuLy = "#contentThongTinThuLy",       
        selectNgayTao = "#selectNgayTaoThongTinThuLy";

    var getThongTinThuLyUrl = "/ThuLy/ThongTinThuLy",
        getThongTinThuLyTheoIdUrl = "/ThuLy/ChiTietThongTinThuLyTheoId";

    function init() {
        loadThongTinThuLy();
        loadThongTinThuLyTheoId();
    }   

    function initRoleNhanVien() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "ThuLy",
                actionCheck: "EditThongTinThuLy"
            },
            success: function (response) {
                if (response.role == -1 || roleGiaiDoan == -1 || roleCongDoan == -1) {
                    $("#btnSuaThongTinThuLy").addClass("edit-disabled");
                    $("#btnThemThongTinThuLy").addClass("add-disabled");
                }
            }
        });
    }

    function loadThongTinThuLy() {
        showLoadingOverlay(contentThongTinThuLy);
        $.ajax({
            type: "GET",
            url: getThongTinThuLyUrl,
            data: {
                hoSoVuAnId: hoSoVuAnId
            },
            success: function (response) {
                $(contentThongTinThuLy).html(response);
                initRoleNhanVien();

                hideLoadingOverlay(contentThongTinThuLy);
            }
        });
    }

    function loadThongTinThuLyTheoId() {
        $(document).on("change", selectNgayTao, function () {
            showLoadingOverlay(contentThongTinThuLy);
            $.ajax({
                type: "GET",
                url: getThongTinThuLyTheoIdUrl,
                data: {
                    id: $(this).val(),
                    hoSoVuAnId: hoSoVuAnId
                },
                success: function (response) {
                    $(contentThongTinThuLy).html(response);
                    initRoleNhanVien();

                    hideLoadingOverlay(contentThongTinThuLy);
                }
            });
        });
    }
    
    return {
        init: init,
        loadThongTinThuLy: loadThongTinThuLy
    }
})();

var EditThongTinThuLyModule = (function (thongTinThuLyModule) {
    var $formEditThongTinThuLy;
    var $quanHePhapLuat;
    var nhomAn;
    var giaiDoan;
    var $KhieuKien;

    var updateHoSoVuAn_LoaiQuanHe = "#HoSoVuAn_LoaiQuanHe";
    var updateHoSoVuAn_QuanHePhapLuat = "#HoSoVuAn_QuanHePhapLuat";

    var idEditorNoiDungYeuCau = 'noi-dung-yeu-cau-textarea';
    var idEditorTaiLieuChungTuKemTheo = 'tai-lieu-chung-tu-textarea';
    var idEditorNoiDungKhangCao = 'noi-dung-khang-cao-textarea';
    var idEditorGhiChu = 'ghi-chu-thongtinthuly-textarea';

    function init() {
        $formEditThongTinThuLy = $("#formEditThongTinThuLy");
        $quanHePhapLuat = $("#QuanHePhapLuat");
        $quanHePhapLuatdll = $("#QuanHePhapLuatDDL-tl");
        nhomAn = $("#nhomAn").val();
        giaiDoan = $("#giaiDoanHoSo").val();
        $KhieuKien = $('#khieukienddl');
        initKhieuKien();
        onKhieuKienPLChange();
        initDateTimePicker();
        initEditorTheoNhomAn();
        initThoiHanGiaiQuyetTheoThuTucThuLy(nhomAn);
        onThoiHanGiaiQuyetTuNgayChange(nhomAn);
        onThoiHanGiaiQuyetChange(nhomAn);
        onKhieuKienChange(nhomAn);
        initQuanHePhapLuat();
        onQuanHePhapLuatChange();
        bindFormActionsTheoNhomAn(nhomAn);
        initValidationTheoNhomAn();
        onLoaiQuanHeChange();
        onNgayThuLyChange();
        if (nhomAn != "HC") {
            $("#LoaiQuanHe").change();
        }       
    }

    function initQuanHePhapLuat() {
        var isKhac = true;
        var $quanHePhapLuatHidden = $("#QuanHePhapLuatHidden");
        var $quanHePhapLuatTextbox = $("#QuanHePhapLuatTextbox");
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");

        $("#QuanHePhapLuatDDL option").each(function () {
            if ($(this).val() == $quanHePhapLuatHidden.val() & $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $quanHePhapLuatHidden.parent().find('.option-hidden').show();
            $quanHePhapLuatTextbox.attr("disabled", false).val($quanHePhapLuatHidden.val());
            $quanHePhapLuatdll.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $quanHePhapLuatHidden.parent().find('.option-hidden').hide();
            $quanHePhapLuatTextbox.attr("disabled", true).val("");
            $quanHePhapLuatdll.attr("name", "QuanHePhapLuat");
        }
    }

    function onQuanHePhapLuatChange() {
        //var $quanHePhapLuat = $("#QuanHePhapLuatDDL");
        $quanHePhapLuatdll.on("change",
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#QuanHePhapLuatTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#QuanHePhapLuatTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "QuanHePhapLuat").removeClass("mb-3");
                }
            });
    }

    function initKhieuKien() {
        var isKhac = true;
        var $KhieuKienHidden = $("#KhieuKienHidden");
        var $KhieuKienTextbox = $("#KhieuKienTextbox");


        $("#khieukienddl option").each(function () {
            if ($(this).val() == $KhieuKienHidden.val() && $(this).val() != "Khác") {
                isKhac = false;
                return;
            }
        });

        if (isKhac) {
            $KhieuKienHidden.parent().find('.option-hidden').show();
            $KhieuKienTextbox.attr("disabled", false).val($KhieuKienHidden.val());
            $KhieuKien.attr("name", "").addClass("mb-3").val("Khác");
        }
        else {
            $KhieuKienHidden.parent().find('.option-hidden').hide();
            $KhieuKienTextbox.attr("disabled", true).val("");
            $KhieuKien.attr("name", "QuanHePhapLuat");
        }
    }

    function onKhieuKienPLChange() {
        //var $KhieuKien = $("#KhieuKienDDL");
        $KhieuKien.change(
            function () {
                if (this.value === "Khác") {
                    $(this).parent().find('.option-hidden').show();
                    $("#KhieuKienTextbox").attr("disabled", false);
                    $(this).attr("name", "").addClass("mb-3");
                }
                else {
                    $(this).parent().find('.option-hidden').hide();
                    $("#KhieuKienTextbox").attr("disabled", true).val("");
                    $(this).attr("name", "QuanHePhapLuat").removeClass("mb-3");
                }
            });
    }


    function initDateTimePicker() {        
        $("#ngay-thu-ly-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
           // minDate: moment().subtract(1, 'days')
        });
        $("#thoi-han-giai-quyet-tu-ngay-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
        });
        $("#thoi-han-giai-quyet-den-ngay-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: new Date()
        });       
    }   

    function initEditorTheoNhomAn() {
        if (nhomAn != 'AD') {
            if (giaiDoan == 2) {
                CKEDITOR.replace(idEditorNoiDungKhangCao);
                CKEDITOR.replace(idEditorTaiLieuChungTuKemTheo);
            } else {
                if (nhomAn == 'HS') {
                    CKEDITOR.replace(idEditorGhiChu);
                }
                else {
                    CKEDITOR.replace(idEditorNoiDungYeuCau);
                    CKEDITOR.replace(idEditorTaiLieuChungTuKemTheo);
                }               
            }                       
        }       
    }

    function onThoiHanGiaiQuyetTuNgayChange(nhomAn) {       
        $("#thoi-han-giai-quyet-tu-ngay-dtp").on("dp.change",
            function () {
                initThoiHanGiaiQuyet(nhomAn, $("#ThuLyTheoThuTuc").val());
            });
    }

    function initThoiHanGiaiQuyetTheoThuTucThuLy(nhomAn) {

        $("#ThuLyTheoThuTuc").on("change",
            function () {
                initThoiHanGiaiQuyet(nhomAn, this.value);               
            });               
    }

    function onKhieuKienChange(nhomAn) {
        if (nhomAn == "HC") {
            $("#QuanHePhapLuat").on("change",
                function () {
                    initThoiHanGiaiQuyet(nhomAn, $("#ThuLyTheoThuTuc").val());
                });
        }      
    }

    function onThoiHanGiaiQuyetChange(nhomAn) {
        $("#ThoiHanGiaiQuyet").on("change",
            function () {
                initThoiHanGiaiQuyet(nhomAn);
            });       
    }

    function initThoiHanGiaiQuyet(nhomAn, thuLyTheoThuTuc) {
        var selectedDenNgay;
        var thoiHanGiaiQuyetTuNgay = $("#thoi-han-giai-quyet-tu-ngay-dtp").find("input").val().split("/");
        if (nhomAn === "HC") {
            if (thuLyTheoThuTuc === "Rút gọn") {
                selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(1, 'month').format('DD/MM/YYYY');
                $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
            }
            else if (thuLyTheoThuTuc === "Thông thường") {
                if (giaiDoan == 2) {
                    selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(2, 'month').format('DD/MM/YYYY');
                    $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                } else {
                    selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(4, 'month').format('DD/MM/YYYY');
                    $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                }
                if ($("#QuanHePhapLuat").val() === "Quyết định giải quyết khiếu nại về quyết định xử lý vụ việc cạnh tranh") {
                    selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(2, 'month').format('DD/MM/YYYY');
                    $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);                
                }
            }
            else if (thuLyTheoThuTuc === "Giải quyết khiếu kiện danh sách cử tri") {
                if (giaiDoan == 2) {
                    selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(15, 'days').format('DD/MM/YYYY');
                    $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                } else {
                    selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(2, 'days').format('DD/MM/YYYY');
                    $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                }               
            }
        }
        else if (nhomAn == "HS") {
            var thoiHanGiaiQuyet = Number($("#ThoiHanGiaiQuyet").val() - 1);
            selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(thoiHanGiaiQuyet, 'days').format('DD/MM/YYYY');
            $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
        }
        else {
            if ($("#LoaiQuanHe").val() == "Yêu cầu") {
                selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(1, 'month').format('DD/MM/YYYY');
                $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
            }
            else {
                if (thuLyTheoThuTuc === "Rút gọn") {
                    selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(1, 'month').format('DD/MM/YYYY');
                    $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                }
                else {
                    if (giaiDoan == 2) {
                        selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(2, 'month').format('DD/MM/YYYY');
                        $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                    } else {
                        selectedDenNgay = moment(new Date(thoiHanGiaiQuyetTuNgay[2], thoiHanGiaiQuyetTuNgay[1] - 1, thoiHanGiaiQuyetTuNgay[0])).add(4, 'month').format('DD/MM/YYYY');
                        $("#thoi-han-giai-quyet-den-ngay-dtp").find("input").val(selectedDenNgay);
                    }
                }
            }            
        }
    }

    function onNgayThuLyChange() {
        $("#ngay-thu-ly-dtp").on("dp.change",
            function () {
                var ngayThuLy = $("#ngay-thu-ly-dtp").find("input").val().split("/");
                var selectedTuNgay = moment(new Date(ngayThuLy[2], ngayThuLy[1] - 1, ngayThuLy[0])).format('DD/MM/YYYY');
                $("#thoi-han-giai-quyet-tu-ngay-dtp").find("input").val(selectedTuNgay);
            });
    }

    function onLoaiQuanHeChange(){
        $("#LoaiQuanHe").on("change", function () {
            initThoiHanGiaiQuyet(nhomAn);
            if (this.value === "Tranh chấp") {  
                $("#thuly-theo-thu-tuc-group").show();
                $("#ThuLyTheoThuTuc").rules("add", {
                    required: true,
                    messages: {
                        required: ViewText.LABEL_THULY_THUTUC + " " + ValidationMessages.VALIDATION_KHONGDETRONG
                    }
                });

                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-tranh-chap li").each(function () {                   
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");        
                });
            }
            else {
                $("#thuly-theo-thu-tuc-group").hide();
                $("#ThuLyTheoThuTuc").rules("remove");

                $quanHePhapLuat.html("");
                $quanHePhapLuat.append("<option value>--Chọn--</option>");
                $("#list-qhpl-yeu-cau li").each(function () {
                    $quanHePhapLuat.append("<option value=\"" + $(this).children().val() + "\">" + $(this).children().val() + "</option>");
                });
            }
        });
    }

    function bindFormActionsTheoNhomAn(nhomAn) {
        if (nhomAn == 'AD') {
            bindFormActionsADBPXLHC();
        } else {
            bindFormActions();
        }
    }

    function bindFormActions() {
        $("#luu-thong-tin-thu-ly-btn").on("click",
            function () {
                //tinymce.triggerSave();
                if (giaiDoan == 2) {
                    $().CKEditorSetValForTextarea(idEditorNoiDungKhangCao);
                    $().CKEditorSetValForTextarea(idEditorTaiLieuChungTuKemTheo);
                } else {
                    if (nhomAn == "HS") {
                        $().CKEditorSetValForTextarea(idEditorGhiChu);
                    }
                    else {
                        $().CKEditorSetValForTextarea(idEditorNoiDungYeuCau);
                        $().CKEditorSetValForTextarea(idEditorTaiLieuChungTuKemTheo);
                    }
                }

                $.ajax({
                    type: 'GET',
                    url: "/ThuLy/CheckSoThuLy",
                    data: {
                        SoThuLyLienTuc: $("#SoThuLyLienTuc").val(),
                        HoSoVuAnID: $("#HoSoVuAnID").val(),
                        SoThuLy: $("#SoThuLy").val(),
                        NgayThuLy: $("#NgayThuLy").val()
                    },
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $formEditThongTinThuLy.valid();
                            $('#SoThuLy').addClass("error");
                            $('span[for="SoThuLy"]').html(response.Messages[0]);
                        } else {
                            $('#SoThuLy').removeClass("error");
                            $('span[for="SoThuLy"]').html("");

                            if ($formEditThongTinThuLy.valid()) {
                                showLoadingOverlay();
                                $.ajax({
                                    type: $formEditThongTinThuLy.prop("method"),
                                    url: $formEditThongTinThuLy.prop("action"),
                                    data: $formEditThongTinThuLy.serialize(),
                                    success: function (response) {
                                        if (!response.IsSuccess) {
                                            $.notify({ message: response.Messages }, { type: "danger" });
                                        } else {
                                            $.notify({ message: NotifyMessage.MESSAGE_THULY_THANHCONG }, { type: "success" });
                                            thongTinThuLyModule.loadThongTinThuLy();
                                            //cap nhat phan chi tiet ho so vu an
                                            $(updateHoSoVuAn_LoaiQuanHe).text($('#LoaiQuanHe').val());
                                            $(updateHoSoVuAn_QuanHePhapLuat).text($('#QuanHePhapLuat').val());
                                            $("#thuTuc").val($("#ThuLyTheoThuTuc").val());
                                            initTabPhanCongThamPhanTheoLoaiQuanHe($('#LoaiQuanHe').val());
                                        }
                                    },
                                    complete: function () {
                                        $('#modalLarge').modal("hide");
                                        hideLoadingOverlay();
                                    }
                                });
                            }
                        }
                    }
                });
            });
    }

    //nhom an ap dung BPXLHC
    function bindFormActionsADBPXLHC() {
        $("#luu-thong-tin-thu-ly-btn").on("click",
            function () {
                $.ajax({
                    type: 'GET',
                    url: "/ThuLy/CheckSoThuLy",
                    data: {
                        SoThuLyLienTuc: $("#SoThuLyLienTuc").val(),
                        HoSoVuAnID: $("#HoSoVuAnID").val(),
                        SoThuLy: $("#SoThuLy").val(),
                        NgayThuLy: $("#NgayThuLy").val()
                    },
                    success: function(response) {
                        if (!response.IsSuccess) {
                            $formEditThongTinThuLy.valid();
                            $('#SoThuLy').addClass("error");
                            $('span[for="SoThuLy"]').html(response.Messages[0]);
                        } else {
                            $('#SoThuLy').removeClass("error");
                            $('span[for="SoThuLy"]').html("");
                            if ($formEditThongTinThuLy.valid()) {
                                showLoadingOverlay();
                                $.ajax({
                                    type: $formEditThongTinThuLy.prop("method"),
                                    url: $formEditThongTinThuLy.prop("action"),
                                    data: $formEditThongTinThuLy.serialize(),
                                    success: function(response) {
                                        if (!response.IsSuccess) {
                                            $.notify({ message: response.Messages }, { type: "danger" });
                                        } else {
                                            $.notify({ message: NotifyMessage.MESSAGE_THULY_THANHCONG },
                                                { type: "success" });
                                            thongTinThuLyModule.loadThongTinThuLy();
                                        }
                                    },
                                    complete: function() {
                                        $('#modal').modal("hide");
                                        hideLoadingOverlay();
                                    }
                                });
                            }
                        }
                    }
                });
            });
    }

    function initTabPhanCongThamPhanTheoLoaiQuanHe(loaiQuanHe) {
        if (loaiQuanHe === "Yêu cầu") {
            $("#hoi-tham-nhan-dan-li").attr('style', 'display: none !important');
            $("#hoi-tham-nhan-dan-2-li").attr('style', 'display: none !important');
            $('[href="#tabHoiThamNhanDan"]').closest('li').hide();
        } else {
            $("#hoi-tham-nhan-dan-li").show();
            $("#hoi-tham-nhan-dan-2-li").show();
            $('[href="#tabHoiThamNhanDan"]').closest('li').show();
        }
    }

    function initValidationTheoNhomAn() {
        if (nhomAn == 'AD') {
            initValidationADBPXLHC();
        } else {
            initValidation();
        }
    }

    function initValidation() {
        $formEditThongTinThuLy.validate({
            ignore: '',
            rules: {
                "SoThuLy": {
                    required: true
                },
                "TruongHopThuLy": {
                    required: true
                },
                //"ThuLyTheoThuTuc": {
                //    required: true
                //},
                "NgayThuLy": {
                    required: true
                },
                "LoaiQuanHe": {
                    required: true
                },
                "QuanHePhapLuat": {
                    required: true
                },
                "ThoiHanGiaiQuyetDenNgay": {
                    required: true
                },
                "NoiDungYeuCau": {
                    required: true
                },
                "NoiDungKhangCao": {
                    required: true
                }
            },
            messages:
            {
                "SoThuLy": {
                    required: ValidationMessages.VALIDATION_SOTHULY_KHONGTRONG
                },
                "TruongHopThuLy": {
                    required: ValidationMessages.VALIDATION_TRUONGHOPTHULY_KHONGTRONG
                },
                //"ThuLyTheoThuTuc": {
                //    required: ValidationMessages.VALIDATION_THULYTHUTUC_KHONGTRONG
                //},
                "NgayThuLy": {
                    required: ValidationMessages.VALIDATION_NGAYTHULY_KHONGTRONG
                },
                "LoaiQuanHe": {
                    required: ValidationMessages.VALIDATION_LOAIQUANHE_KHONGTRONG
                },
                "QuanHePhapLuat": {
                    required: ValidationMessages.VALIDATION_QUANHEPHAPLUAT_KHONGTRONG
                },
                "ThoiHanGiaiQuyetDenNgay": {
                    required: ValidationMessages.VALIDATION_THOIGIANGIAIQUYET_KHONGTRONG
                },
                "NoiDungYeuCau": {
                    required: ValidationMessages.VALIDATION_NOIDUNGGIAIQUYET_KHONGTRONG
                },
                "NoiDungKhangCao": {
                    required: "Nội dung kháng cáo không được để trống."
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


    function initValidationADBPXLHC() {
        $formEditThongTinThuLy.validate({
            ignore: '',
            rules: {
                "SoThuLy": {
                    required: true
                },
                "NgayThuLy": {
                    required: true
                },
                "QuyetDinh": {
                    required: true
                }
            },
            messages:
                {
                    "SoThuLy": {
                        required: ValidationMessages.VALIDATION_SOTHULY_KHONGTRONG
                    },
                    "NgayThuLy": {
                        required: ValidationMessages.VALIDATION_NGAYTHULY_KHONGTRONG
                    },
                    "QuyetDinh": {
                        required: "Quyết định bị khiếu nại/kiến nghị/kháng nghị không được để trống."
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
})(ThongTinThuLyModule);