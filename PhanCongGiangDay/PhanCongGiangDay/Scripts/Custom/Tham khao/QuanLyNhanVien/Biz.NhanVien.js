var TaoNhanVienmodel = (function () {
    var $formThemNhanVien;
    function init() {
        $formThemNhanVien = $("#formThemNhanVien");
        initDateTimePicker();
        bindFormActions();
    }
    function initDateTimePicker() {
        $("#ngay-thang-nam").datetimepicker({
            format: 'DD/MM/YYYY',
            maxDate: new Date()
        });
    }
    function bindFormActions() {
        $("#them-nhan-vien-btn").on("click",
            function () {
                if ($formThemNhanVien.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formThemNhanVien.prop("method"),
                        url: $formThemNhanVien.prop("action"),
                        data: $formThemNhanVien.serialize() + "&ToaAnID=" + $("#toaAn-ddl").val(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: NotifyMessage.THONGBAO_THEMNHANVIEN_KHONGTHANHCONG }, { type: "danger" });
                            } else {
                                $.notify({ message: NotifyMessage.MESSAGE_SUANHANVIEN_THANHCONG }, { type: "success" });

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
        init: init
    }
})();
