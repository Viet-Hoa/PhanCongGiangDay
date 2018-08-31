$(function () {
    ThongKeLuuKhoModule.init();
});

var ThongKeLuuKhoModule = (function () {

    var $ddlToaAn,
        $ddlNhomAn,
        $ddlGiaiDoan;

    var duLieuDanhSachUrl = "/ThongKeGiamSat/DanhSachHoSoThongKeLuuKho";
    var duLieuBieuDoUrl = "/ThongKeGiamSat/BieuDoThongKeLuuKho";

    function init() {
        $ddlToaAn = $("#ToaAnID");
        $ddlNhomAn = $("#NhomAn");
        $ddlGiaiDoan = $("#GiaiDoan");

        loadDuLieuThongKeBieuDo();
        xemDuLieuThongKe();
        initButtonMenu();
        onDropDownListChange();
    }

    function initGroupByType() {
        if ($("#ToaAnID").val() === "") {
            $("#GroupByType").val(1);
        }
        else if ($("#NhomAn").val() === "") {
            $("#GroupByType").val(2);
        }
        else if ($("#GiaiDoan").val() === "") {
            $("#GroupByType").val(3);
        }
        else {
            $("#GroupByType").val(4);
        }
    }

    function onDropDownListChange() {
        $ddlToaAn.on("change", function () {
            if ($ddlToaAn.val() === "") {
                $ddlNhomAn.val("").prop('disabled', true);
                $ddlGiaiDoan.val("").prop('disabled', true);
            }
            else {
                $ddlNhomAn.prop('disabled', false);
                $ddlGiaiDoan.prop('disabled', true);
            }
        });
        $ddlNhomAn.on("change", function () {
            if ($ddlNhomAn.val() === "") {
                $ddlGiaiDoan.val("").prop('disabled', true);
            }
            else {
                $ddlGiaiDoan.prop('disabled', false);
            }
        });
    }

    function initButtonMenu() {

        $("#bieu-do-btn").on("click",
            function () {
                $("#loaiThongKe").val(1);
                loadDuLieuThongKeBieuDo();
            });

        $("#danh-sach-btn").on("click",
            function () {
                $("#loaiThongKe").val(2);
                loadDuLieuThongKeDanhSach();
            });
    }

    function loadDuLieuThongKeBieuDo() {
        initGroupByType();
        showLoadingOverlay("#contentThongKeLuuKho");
        $.ajax({
            type: "GET",
            url: duLieuBieuDoUrl,
            data: getFormData(),
            success: function (response) {
                $("#contentThongKeLuuKho").html(response);
                ReplacelinkId();
                hideLoadingOverlay("#contentThongKeLuuKho");
            }
        });
    }

    function loadDuLieuThongKeDanhSach() {

        showLoadingOverlay("#contentThongKeLuuKho");
        $.ajax({
            type: "GET",
            url: duLieuDanhSachUrl,
            data: {
                listHoSoVuAnId: $("#ListHoSoVuAnID").val()
            },
            success: function (response) {
                $("#contentThongKeLuuKho").html(response);
                ReplacelinkId();
                hideLoadingOverlay("#contentThongKeLuuKho");
            }
        });
    }

    function xemDuLieuThongKe() {
              
        $("#xem-btn").on("click",
            function () {
                initGroupByType();

                showLoadingOverlay("#contentThongKeLuuKho");

                $.ajax({
                    type: "GET",
                    url: duLieuBieuDoUrl,
                    data: getFormData(),
                    success: function (response) {
                        $("#contentThongKeLuuKho").html(response);
                        ReplacelinkId();
                        hideLoadingOverlay("#contentThongKeLuuKho");
                    }
                });
            });
    }

    function getFormData() {
        var loaiThongKe = $("#loaiThongKe").val();
        var group = $("#GroupByType").val();
        var tuNgay = $("#TuNgay").val();
        var denNgay = $("#DenNgay").val();
        var toaAnId = $("#ToaAnID").val();
        var nhomAn = $("#NhomAn").val();
        var giaiDoan = $("#GiaiDoan").val();

        return {
            loaiThongKe: loaiThongKe,
            group: group,
            tuNgay: tuNgay,
            denNgay: denNgay,
            toaAnId: toaAnId,
            nhomAn: nhomAn,
            giaiDoan: giaiDoan
        }
    }
    function ReplacelinkId() {
        var href = $('#export-luukho').attr('href');
        href = href.substr(0, href.search("=")+1);
        href = href + $("#ListHoSoVuAnID").val();
        $('#export-luukho').attr("href", href);
    }

    return {
        init: init
    }
})();

var HoSoThongKeLuuKhoModule = (function () {
    var $danhSachHoSoTable;

    var duLieuDanhSachTableUrl = "/ThongKeGiamSat/DanhSachHoSoThongKeLuuKhoTable";

    function init() {
        initHoSoLuuKhoDataTable();
    }

    function initHoSoLuuKhoDataTable() {
        $danhSachHoSoTable = $("#thong-ke-luu-kho-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: duLieuDanhSachTableUrl,
                data: {
                    listHoSoVuAnId: $("#ListHoSoVuAnID").val()
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#contentThongKeLuuKho");
                },
                complete: function () {
                    hideLoadingOverlay("#contentThongKeLuuKho");
                }
            },
            columns: [
                { data: "STT", className: "text-center" },
                {
                    data: "MaHoSo", render: function (data, type, row) {
                        return '<a target="_blank" href="/SauXetXu/Index/' + row.HoSoVuAnID + '" >' + data + '</a>';
                    }
                },
                { data: "TenVuAn", className: "custom-wrap"},
                { data: "SoBAQD" },
                { data: "NgayGiaiQuyet" },
                { data: "ThamPhan" },
                { data: "ThuKy" }
            ]
        });
    }

    return {
        init: init
    }
})();

