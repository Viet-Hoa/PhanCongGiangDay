$(function () {
    ChuanBiXetXu.init();
});

var ChuanBiXetXu = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val(),
        roleGiaiDoan = $("#roleGiaiDoan").val(),
        roleCongDoan = $("#roleCongDoan").val();

    var modalCongDoan = "#modelChuyenCongDoan";
    var formCongDoan = "#formChuyenCongDoan";

    function init() {
        chuyenCongDoanForm();
        initRoleNhanVien();
        initRoleChuyenCongDoan();
        chuyenCongDoanNext();
        chuyenCongDoanPrev();
        //$(document).load(initTabTitleTheoLoaiQuanHe());

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
    function changeSelectThamPhan() {
        $('#ThamPhan').on("change", function () {
            var maNV = $(this).val();

            $.ajax({
                type: "GET",
                dataType: 'json',
                url: '/ChuanBiXetXu/ResetThuKyTheoThamPhan',
                data: {
                    manv: maNV
                },
                success: function (response) {
                    $('#ThuKy').html('');
                    $("#ThuKy").append("<option value=''>--Chọn--</option>");
                    for (var i = 0; i < response.length; i++) {
                        $('#ThuKy').append('<option value="' + response[i].Value + '">' + response[i].Text + '</option>');
                    }
                    $('#ThuKy').removeAttr('disabled');
                    $('#ThuKy').next('input[name=ThuKy]').val('');
                }
            });

            $.ajax({
                type: "GET",
                dataType: 'json',
                url: '/ChuanBiXetXu/GetThuKyTheoThamPhan',
                data: {
                    manv: maNV
                },
                success: function (response) {
                    for (var i = response.length - 1; i >= 0; i--) {
                        $("#ThuKy > option").each(function () {
                            if ($(this).val() == response[i].MaNV) {
                                $(this).addClass("custom-option");
                                $(this).insertBefore("#ThuKy option:eq(1)");
                            }
                        });
                    }
                    $("#ThuKy option:eq(1)").attr('selected', 'selected');
                    $('#ThuKy').removeAttr('disabled');
                    $('#ThuKy').next('input[name=ThuKy]').val('');
                    $('#ThuKy').closest('.tab-pane').find('.DanhSachNhanhVien li').each(function () {
                        var value = $(this).find('input').val();
                        if (value !== $('#ThuKy').val()) {
                            $(this).show();
                            $(this).find('input').prop('checked', true);
                        }
                    });
                    if ($('#ThuKy').val() !== '') {

                        $(this).closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").parent().hide();
                        $(this).closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").find('input').prop('checked', false);
                    }

                    $('#ThuKy').closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").parent().hide();
                    $('#ThuKy').closest('.tab-pane').find("label:contains('" + $('#ThuKy').val() + "')").find('input').prop('checked', false);
                }
            });
        });
    }
    return {
        init: init,
        changeSelectThamPhan: changeSelectThamPhan
    }
})();