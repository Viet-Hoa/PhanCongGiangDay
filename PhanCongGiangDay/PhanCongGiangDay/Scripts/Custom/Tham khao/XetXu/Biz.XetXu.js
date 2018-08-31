$(function () {
    XetXu.init();
});

var XetXu = (function () {

    var modalCongDoan = "#modelChuyenCongDoan";
    var formCongDoan = "#formChuyenCongDoan";

    function init() {
        chuyenCongDoanForm();
    }

    function chuyenCongDoanForm() {
        $("#chuyen-cong-doan-btn").on("click", function () {
            showLoadingOverlay(modalCongDoan + " .modal-content");

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: $(formCongDoan).prop("action"),
                data: $(formCongDoan).serialize(),
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            });

            return false;
        });
    }

    return {
        init: init
    }
})();