$(function () {
    GiamSatModule.init();
});

var GiamSatModule = (function () {
    var $formLocDuLieu;
    var $groupByType;
    var $ddlToaAn,
        $ddlNhomAn,
        $ddlGiaiDoan;
    var $hoSoVuAnGiamSatTable;
    var danhSachHoSoVuAnGiamSatUrl = "/ThongKeGiamSat/DanhSachHoSoVuAnGiamSat";
    var listHoSoVuAnID;

    function init() {
        $formLocDuLieu = $("#formLocDuLieuGiamSat");
        $groupByType = $("#GroupByType");
        $ddlToaAn = $("#ddlToaAn");
        $ddlNhomAn = $("#ddlNhomAn");
        $ddlGiaiDoan = $("#ddlGiaiDoan");
        onDropDownListChange();
        initLocDuLieu();
        $("#btnBieuDoGiamSat").click();
    }

    function loadDanhSachHoSoVuAnGiamSat(listHoSoVuAnID) {
        $hoSoVuAnGiamSatTable = $("#ho-so-vu-an-giam-sat-table").DataTable({
            searching: false,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: danhSachHoSoVuAnGiamSatUrl,
                data: function () {
                    return {
                        listHoSoVuAnID: listHoSoVuAnID
                    }
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#ho-so-vu-an-giam-sat-container");
                },
                complete: function () {
                    hideLoadingOverlay("#ho-so-vu-an-giam-sat-container");
                }
            },
            columns: [
                { data: "SoHoSo", className: "text-center" },
                {
                    data: "MaHoSo", render: function (data, type, row) {
                        return '<a href="/NhanDon/ChiTietHoSo/' + row.HoSoVuAnID + '" >' + data + '</a>';
                    }
                },
                { data: "DuongSu", className: "custom-wrap" },
                { data: "ToaAn" },
                { data: "NhomAn", className: "custom-wrap" },
                { data: "GiaiDoan" },
                { data: "CongDoanHoSo" }
            ]
        });
    }

    function reloadGiamSatTable() {
        $hoSoVuAnGiamSatTable.ajax.reload();
    }

    function initGroupByType() {
        if ($ddlToaAn.val() === "") {
            $groupByType.val(1);
        }
        else if ($ddlNhomAn.val() === "") {
            $groupByType.val(2);
        }
        else if ($ddlGiaiDoan.val() === "") {
            $groupByType.val(3);
        }
        else {
            $groupByType.val(4);
        }
    }

    function onDropDownListChange() {
        $ddlToaAn.on("change", function () {
            if ($ddlToaAn.val() === "") {
                $ddlNhomAn.val("");
                $ddlNhomAn.prop('disabled', true);
                $ddlGiaiDoan.val("");
                $ddlGiaiDoan.prop('disabled', true);
            }
            else {
                $ddlNhomAn.prop('disabled', false);
                $ddlGiaiDoan.prop('disabled', true);
            }
        });
        $ddlNhomAn.on("change", function () {
            if ($ddlNhomAn.val() === "") {
                $ddlGiaiDoan.val("");
                $ddlGiaiDoan.prop('disabled', true);
            }
            else {
                $ddlGiaiDoan.prop('disabled', false);
            }
        });
    }

    function initLocDuLieu() {
        $("#xem-btn").on("click",
            function () {
                if ($formLocDuLieu.valid()) {
                    showLoadingOverlay("#contentGiamSatThucHien");

                    initGroupByType();

                    $.ajax({
                        type: $formLocDuLieu.prop("method"),
                        url: $formLocDuLieu.prop("action"),
                        data: $($formLocDuLieu).serialize(),
                        success: function (response) {
                            $("#contentGiamSatThucHien").html(response);
                            listHoSoVuAnID = $("#ListHoSoVuAnID").val();
                        },
                        complete: function () {
                            hideLoadingOverlay("#contentGiamSatThucHien");
                        }
                    });
                }
                return false;
            });

        $("#btnBieuDoGiamSat").on("click",
            function () {
                if ($formLocDuLieu.valid()) {
                    showLoadingOverlay("#contentGiamSatThucHien");

                    initGroupByType();

                    $.ajax({
                        type: $formLocDuLieu.prop("method"),
                        url: $formLocDuLieu.prop("action"),
                        data: $($formLocDuLieu).serialize(),
                        success: function (response) {
                            $("#contentGiamSatThucHien").html(response);
                            listHoSoVuAnID = $("#ListHoSoVuAnID").val();
                        },
                        complete: function () {
                            hideLoadingOverlay("#contentGiamSatThucHien");
                        }
                    });
                }
                return false;
            });

        $("#btnDanhSachGiamSat").on("click",
            function () {
                $.ajax({
                    url: "/ThongKeGiamSat/HoSoVuAnGiamSatTable",
                    success: function (response) {
                        $("#contentGiamSatThucHien").html(response);
                        loadDanhSachHoSoVuAnGiamSat(listHoSoVuAnID);
                    }
                });
            });
    }

    return {
        init: init
    }
})();