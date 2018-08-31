$(function () {
    SauXetXuModule.init();
});

var SauXetXuModule = (function () {
    var hoSoVuAnId = $("#hoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalCongDoan = "#modelChuyenCongDoan";
    var formCongDoan = "#formChuyenCongDoan";

    function init() {
        chuyenCongDoanForm();
        chuyenCongDoanNext();
        chuyenCongDoanPrev();
        initRoleNhanVien();
        initRoleChuyenCongDoan();
    }

    function initRoleNhanVien() {
        if (roleCongDoan == -1 || roleGiaiDoan == -1) {
            $("#btnChuyenCongDoan, #btnChuyenCongDoanNext, #btnChuyenCongDoanPrev").addClass("edit-disabled");
        }
    }

    function initRoleChuyenCongDoan() {
        $.ajax({
            type: "GET",
            url: "/Biz/KiemTraQuyenNhanVien",
            data: {
                hoSoVuAnId: hoSoVuAnId,
                contrCheck: "NhanDon",
                actionCheck: "ChuyenCongDoan"
            },
            success: function (response) {
                if (response.role == -1) {
                    $("#btnChuyenCongDoan, #btnChuyenCongDoanNext, #btnChuyenCongDoanPrev").addClass("edit-disabled");
                }
            }
        });
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

    function chuyenCongDoanNext() {
        $("#btnChuyenCongDoanNext").on("click", function () {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/NhanDon/ChuyenCongDoanNext",
                data: {
                    HoSoVuAnID: hoSoVuAnId
                },
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.replace(response.urlCongDoan);
                    }
                }
            });

            return false;
        });
    }

    function chuyenCongDoanPrev() {
        $("#btnChuyenCongDoanPrev").on("click", function () {

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/NhanDon/ChuyenCongDoanPrev",
                data: {
                    HoSoVuAnID: hoSoVuAnId
                },
                success: function (response) {
                    if (response.status == 'success') {
                        window.location.replace(response.urlCongDoan);
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