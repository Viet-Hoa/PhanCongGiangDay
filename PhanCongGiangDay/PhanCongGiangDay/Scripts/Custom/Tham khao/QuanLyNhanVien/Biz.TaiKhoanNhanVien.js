$(function () {
    TaiKhoanNhanVienModule.init();
});

var TaiKhoanNhanVienModule = (function () {
    //var hoSoVuAnId = $("#HoSoVuAnID").val();

    var contentPartialView = "#contentChiTietNhanVien";    
    var check = true;
    function init() {
        changeClass();
        loadThongTinNhanVien();
        loadCapNhatHinhDaiDien();
        loadDoiMatKhau();
    }

    function changeClass() {
        $('.list-group a').click(function () {
            
            if (check) {
                $("#thong-tin-nhan-vien-btn").removeClass('custom-a-active');
                check = false;
            }
            $('.list-group > .custom-a').removeClass('custom-a-active');
            $(this).addClass('custom-a-active');
        });
    }

    function loadThongTinNhanVien() {
        $("#thong-tin-nhan-vien-btn").on("click",
            function () {
                //showLoadingOverlay(contentPartialView);
                $(contentPartialView).load('/TaiKhoanNhanVien/ChiTietThongTinNhanVien');
                //hideLoadingOverlay(contentPartialView);
            });
    }

    function loadDoiMatKhau() {
        $("#doi-mat-khau-btn").on("click",
            function () {
                //showLoadingOverlay(contentPartialView);
                $(contentPartialView).load('/TaiKhoanNhanVien/DoiMatKhau');
                //hideLoadingOverlay(contentPartialView);
            });
    }

    function loadCapNhatHinhDaiDien() {
        $("#cap-nhat-hinh-dai-dien-btn").on("click",
            function () {
                //showLoadingOverlay(contentPartialView);
                $(contentPartialView).load('/TaiKhoanNhanVien/CapNhatHinhDaiDien');
                //hideLoadingOverlay(contentPartialView);
            });
    }

    return {
        init: init,
        loadThongTinNhanVien: loadThongTinNhanVien
    }
})();

var EditThongTinNhanVienModule = (function (taiKhoanNhanVienModule) {
    var $formEditThongTinNhanVien;
    

    function init() {
        $formEditThongTinNhanVien = $("#formCapNhatThongTinNhanVien");
        initDateTimePicker();        
        updateForm();
    }
    function initDateTimePicker() {
        $("#ngay-sinh-dtp").datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: null,
            maxDate: new Date(),
            useCurrent: false
        });       
    }
    $(function () {
        $.validator.methods.date = function (value, element) {
            return this.optional(element) || moment(value, "DD/MM/YYYY", true).isValid();
        }
    });


    function updateForm() {
        $("#luu-thong-tin-tai-khoan-btn").on("click",
            function () {
                if ($formEditThongTinNhanVien.valid()) {
                    //showLoadingOverlay();
                    $.ajax({
                        type: "POST",
                        url: $formEditThongTinNhanVien.prop("action"),
                        data: $formEditThongTinNhanVien.serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATTHONGTINTAIKHOAN_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_CAPNHATTHONGTINTAIKHOAN_THANHCONG }, { type: "success" });                                
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            //window.location.reload();
                            $("#contentChiTietNhanVien").load('/TaiKhoanNhanVien/ChiTietThongTinNhanVien');
                            //hideLoadingOverlay();
                        }
                    });
                }
            });
    }
    

    return {
        init: init
    }
})(TaiKhoanNhanVienModule);