$(function () {
    ThongKeAnHuySuaModule.init();
});

var ThongKeAnHuySuaModule = (function () {

    var $ddlToaAn,
        $ddlThamPhan;

    var duLieuDanhSachUrl = "/ThongKeGiamSat/DanhSachHoSoThongKeAnHuySua";
    var duLieuBieuDoUrl = "/ThongKeGiamSat/BieuDoThongKeAnHuySua";
    var xemDuLieuUrl = "/ThongKeGiamSat/XemThongKeAnHuySua";

    function init() {
        $ddlToaAn = $("#ToaAnID");
        $ddlThamPhan = $("#ThamPhan");

        loadDuLieuThongKeBieuDo();
        xemDuLieuThongKe();
        initButtonMenu();
        onToaAnDropDownListChange();
        $ddlToaAn.change();
    }

    function onToaAnDropDownListChange() {
        $ddlToaAn.on("change", function () {
            if ($(this).val() === "") {
                $ddlThamPhan.val("").prop('disabled', true);
            }
            else {
                $ddlThamPhan.prop('disabled', false);

                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    url: '/ThongKeGiamSat/DanhSachThamPhanTheoToaAn',
                    data: {
                        toaAnId: $(this).val()
                    },
                    success: function (response) {
                        $ddlThamPhan.html('');
                        $ddlThamPhan.append('<option value="">--Chọn--</option>');
                        for (var i = 0; i < response.length; i++) {
                            $ddlThamPhan.append('<option value="' + response[i].Value + '">' + response[i].Text + '</option>');
                        }
                    }
                });
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

        showLoadingOverlay("#contentThongKeAnHuySua");
        $.ajax({
            type: "GET",
            url: duLieuBieuDoUrl,
            data: getFormData(),
            success: function (response) {
                $("#contentThongKeAnHuySua").html(response);
                hideLoadingOverlay("#contentThongKeAnHuySua");
            }
        });
    }

    function loadDuLieuThongKeDanhSach() {

        showLoadingOverlay("#contentThongKeAnHuySua");
        $.ajax({
            type: "GET",
            url: duLieuDanhSachUrl,
            data: getListHoSoID(),
            success: function (response) {
                $("#contentThongKeAnHuySua").html(response);
                hideLoadingOverlay("#contentThongKeAnHuySua");
            }
        });
    }

    function xemDuLieuThongKe() {

        $("#xem-btn").on("click",
            function () {
                showLoadingOverlay("#contentThongKeAnHuySua");
                $.ajax({
                    type: "GET",
                    url: duLieuBieuDoUrl,
                    data: getFormData(),
                    success: function (response) {
                        $("#contentThongKeAnHuySua").html(response);
                        hideLoadingOverlay("#contentThongKeAnHuySua");
                    }
                });
            });
    }

    function getFormData() {
        var loaiThongKe = $("#loaiThongKe").val();
        var tuNgay = $("#TuNgay").val();
        var denNgay = $("#DenNgay").val();
        var toaAnId = $("#ToaAnID").val();
        var thamPhan = $("#ThamPhan").val();

        return {
            loaiThongKe: loaiThongKe,
            tuNgay: tuNgay,
            denNgay: denNgay,
            toaAnId: toaAnId,
            thamPhan: thamPhan
        }
    }

    function getListHoSoID() {
        var listHoSoHuyId = $("#ListHoSoHuyID").val();
        var listHoSoSuaId = $("#ListHoSoSuaID").val();

        return{
            listHoSoHuyId: listHoSoHuyId,
            listHoSoSuaId: listHoSoSuaId
        }
    }

    return {
        init: init,
        getFormData: getFormData,
        getListHoSoID: getListHoSoID
    }
})();

var ThongKeHuySuaDanhSachModule = (function (thongKeAnHuySuaModule) {
    var $danhSachHoSoTable;

    var duLieuDanhSachTableUrl = "/ThongKeGiamSat/DanhSachHoSoThongKeAnHuySuaTable";

    function init() {
        initHoSoHuySuaDataTable();
    }

    function initHoSoHuySuaDataTable() {
        $danhSachHoSoTable = $("#danh-sach-thong-ke-huy-sua-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: duLieuDanhSachTableUrl,
                data: thongKeAnHuySuaModule.getListHoSoID(),
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#contentThongKeAnHuySua");
                },
                complete: function () {
                    hideLoadingOverlay("#contentThongKeAnHuySua");
                }
            },
            columns: [
                { data: "STT", className: "text-center" },
                {
                    data: "MaHoSo", render: function (data, type, row) {
                        if (row.CongDoanHoSo == 1)
                            return '<a target="_blank" href="/NhanDon/ChiTietHoSo/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 2)
                            return '<a target="_blank" href="/ThuLy/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 3)
                            return '<a target="_blank" href="/ChuanBiXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 4)
                            return '<a target="_blank" href="/KetQuaXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 5 || row.CongDoanHoSo == -1)
                            return '<a target="_blank" href="/SauXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';

                        return '<a target="_blank" href="/NhanDon/ChiTietHoSo/' + row.HoSoVuAnID + '">' + data + '</a>';
                    } 
                },
                { data: "TenVuAn" },
                { data: "ThamPhanST" },
                {
                    data: "So_BAQD_ST", render: function (data, type, row) {
                        if (row.File_BAQD_ST != null)
                            return '<a href="/Uploads/' + row.File_BAQD_ST + '">' + data + '</a>';
                        if (data == null)
                            return '';
                        return data;
                    }, width: 80
                },
                { data: "ThamPhanPT" },
                {
                    data: "So_BAQD_PT", render: function (data, type, row) {
                        if (row.File_BAQD_PT != null)
                            return '<a href="/Uploads/' + row.File_BAQD_PT + '"download>' + data + '</a>';
                        if (data == null)
                            return '';
                        return data;
                    }, width: 80
                },
                { data: "HoatDong" }
            ]
        });
    }

    return {
        init: init
    }
})(ThongKeAnHuySuaModule);

var ThongKeHuySuaBieuDoModule = (function (thongKeAnHuySuaModule) {
    var $danhSachHoSoTable;

    var duLieuBieuDoTableUrl = "/ThongKeGiamSat/BieuDoThongKeAnHuySuaTable";

    function init() {
        initBieuDoAnHuySuaDataTable();
    }

    function initBieuDoAnHuySuaDataTable() {
        $danhSachHoSoTable = $("#bieu-do-an-huy-sua-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: duLieuBieuDoTableUrl,
                data: thongKeAnHuySuaModule.getFormData(),
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#contentThongKeAnHuySua");
                },
                complete: function (response) {
                    hideLoadingOverlay("#contentThongKeAnHuySua");
                    $("#listData").val(response.ListData);
                }
            },
            columns: [
                { data: "NhomAn"},
                { data: "SoAnHuy", className: "text-center" },
                { data: "SoAnSua", className: "text-center" },
                { data: "TongHuySua", className: "text-center" }
            ]
        });
    }

    return {
        init: init
    }
})(ThongKeAnHuySuaModule);