$(function () {
    BaoCaoThongKeModule.init();
});

var BaoCaoThongKeModule = (function () {
    var $baoCaoThongKeTable;
    var thongKeTongHop = 1, thongKeNhomAn = 2, thongKeThamPhan = 3, thongKeThuKy = 4;

    var baoCaoThongKeTableUrl = "/ThongKeGiamSat/ChiTietBaoCaoThongKeTable";
    var chiTietBaoCaoThongKeUrl = "/ThongKeGiamSat/ChiTietBaoCaoThongKe";
    

    function init() {
        xemThongTinBaoCaoThongKe();
        initButtonMenuBaoCaoThongKe();
        initThongTinBaoCaoThongKe(thongKeTongHop);
        initLocDuLieu();
        loaiquanheChange();
    }

    function initThongKeTongHopDataTable(loaiThongKe) {
        $baoCaoThongKeTable = $("#bao-cao-thong-ke-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: baoCaoThongKeTableUrl,
                data: getFormData(),
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay("#contentBaoCaoThongKe");
                },
                complete: function () {
                    hideLoadingOverlay("#contentBaoCaoThongKe");
                }
            },
            columns: [
                {
                    data: "TenToaAn", render: function (data, type, row) {
                        if (loaiThongKe == thongKeTongHop) {
                            return row.TenToaAn;
                        }
                        else if (loaiThongKe == thongKeNhomAn) {
                            return row.NhomAn;
                        }
                        else if (loaiThongKe == thongKeThamPhan) {
                            return row.ThamPhan;
                        }
                        else if (loaiThongKe == thongKeThuKy) {
                            return row.ThuKy;
                        }
                        else {
                            return row.TenToaAn;
                        }

                } },
                {
                    data: "ThuLy", className: "text-center", render: function (data, type, row) {
                        if (data == 0) {
                            return data;
                        }
                        return '<a class="custom-a-underline" data-trigger="modal" data-target="#modalHoSoThongKe" ' +
                            'data-url="/ThongKeGiamSat/DanhSachHoSoModal?danhSachId=' + row.DanhSachThuLy + '&tuNgay=' + $("#TuNgay").val() + '&denNgay=' + $("#DenNgay").val() + '&toaAnID=' + $("#ToaAnID").val() + '" >' + data + '</a>';
                    }
                },
                {
                    data: "CanGiaiQuyet", className: "text-center", render: function (data, type, row) {
                        if (data == 0) {
                            return data;
                        }
                        return '<a class="custom-a-underline" data-trigger="modal" data-target="#modalHoSoThongKe" ' +
                            'data-url="/ThongKeGiamSat/DanhSachHoSoModal?danhSachId=' + row.DanhSachCanGiaiQuyet + '&tuNgay=' + $("#TuNgay").val() + '&denNgay=' + $("#DenNgay").val() + '&toaAnID=' + $("#ToaAnID").val() + '" >' + data + '</a>';
                    }
                },
                {
                    data: "DaGiaiQuyet", className: "text-center", render: function (data, type, row) {
                        if (data == 0) {
                            return data;
                        }
                        return '<a class="custom-a-underline" data-trigger="modal" data-target="#modalHoSoThongKe" ' +
                            'data-url="/ThongKeGiamSat/DanhSachHoSoModal?danhSachId=' + row.DanhSachDaGiaiQuyet + '&tuNgay=' + $("#TuNgay").val() + '&denNgay=' + $("#DenNgay").val() + '&toaAnID=' + $("#ToaAnID").val() + '" >' + data + '</a>';
                    }
                },
                {
                    data: "ConLai", className: "text-center", render: function (data, type, row) {
                        if (data == 0) {
                            return data;
                        }
                        return '<a class="custom-a-underline" data-trigger="modal" data-target="#modalHoSoThongKe" ' +
                            'data-url="/ThongKeGiamSat/DanhSachHoSoModal?danhSachId=' + row.DanhSachConLai + '&tuNgay=' + $("#TuNgay").val() + '&denNgay=' + $("#DenNgay").val() + '&toaAnID=' + $("#ToaAnID").val()+'" >' + data + '</a>';
                    }
                },
                {
                    data: "TamDinhChi", className: "text-center", render: function (data, type, row) {
                        if (data == 0) {
                            return data;
                        }
                        return '<a class="custom-a-underline" data-trigger="modal" data-target="#modalHoSoThongKe" ' +
                            'data-url="/ThongKeGiamSat/DanhSachHoSoModal?danhSachId=' + row.DanhSachTamDinhChi + '&tuNgay=' + $("#TuNgay").val() + '&denNgay=' + $("#DenNgay").val() + '&toaAnID=' + $("#ToaAnID").val() + '" >' + data + '</a>';
                    }
                },
                {
                    data: "QuaHan", className: "text-center", render: function (data, type, row) {
                        if (data == 0) {
                            return data;
                        }
                        return '<a class="custom-a-underline" data-trigger="modal" data-target="#modalHoSoThongKe" ' +
                            'data-url="/ThongKeGiamSat/DanhSachHoSoModal?danhSachId=' + row.DanhSachQuaHan + '&tuNgay=' + $("#TuNgay").val() + '&denNgay=' + $("#DenNgay").val() + '&toaAnID=' + $("#ToaAnID").val() + '" >' + data + '</a>';
                    }
                }
            ]
        });
    }

    function getFormData() {
        var loaiThongKe = $("#loaiThongKe").val();
        var tuNgay = $("#TuNgay").val();
        var denNgay = $("#DenNgay").val();
        var toaAnId = $("#ToaAnID").val();
        var nhomAn = $("#NhomAn").val();
        var giaiDoan = $("#GiaiDoan").val();
        var loaiQuanHe = $("#LoaiQuanHe").val();
        var quanHePhapLuat = $(".qhpl-ddl").val();
        var loaiDeNghi = $("#LoaiDeNghi").val();
        var toiDanh = $("#ToiDanh").val();

        return {
            loaiThongKe: loaiThongKe,
            tuNgay: tuNgay,
            denNgay: denNgay,
            toaAnId: toaAnId,
            nhomAn: nhomAn,
            giaiDoan: giaiDoan,
            loaiQuanHe: loaiQuanHe,
            quanHePhapLuat: quanHePhapLuat,
            loaiDeNghi: loaiDeNghi,
            toiDanh: toiDanh
        }
    }

    function initThongTinBaoCaoThongKe(loaiThongKe) {
        $.ajax({
            type: "GET",
            url: chiTietBaoCaoThongKeUrl,
            data: {
                loaiThongKe: loaiThongKe
            },
            success: function (response) {
                $("#contentBaoCaoThongKe").html(response);
                initThongKeTongHopDataTable($("#loaiThongKe").val());
            }
        });
    }

    function initButtonMenuBaoCaoThongKe() {

        $("#thong-ke-tong-hop-btn").on("click",
            function () {
                initThongTinBaoCaoThongKe(thongKeTongHop);
            });

        $("#thong-ke-nhom-an-btn").on("click",
            function () {
                initThongTinBaoCaoThongKe(thongKeNhomAn);
            });

        $("#thong-ke-tham-phan-btn").on("click",
            function () {
                initThongTinBaoCaoThongKe(thongKeThamPhan);
            });

        $("#thong-ke-thu-ky-btn").on("click",
            function () {
                initThongTinBaoCaoThongKe(thongKeThuKy);
            });
    }

    function xemThongTinBaoCaoThongKe() {
        //showLoadingOverlay("#contentBaoCaoThongKe");
        
        $("#xem-btn").on("click",
            function() {
                $.ajax({
                    type: "GET",
                    url: chiTietBaoCaoThongKeUrl,
                    data: {
                        loaiThongKe: $("#loaiThongKe").val()
                    },
                    success: function (response) {
                        $("#contentBaoCaoThongKe").html(response);
                        initThongKeTongHopDataTable($("#loaiThongKe").val());
                        //hideLoadingOverlay("#contentBaoCaoThongKe");
                    }
                });
            });      
    }

    function initLocDuLieu() {
        $('.td-group').hide();
        $('.td-group').attr("disabled", true);
        $('.ldn-group').hide();
        $('.ldn-group').attr("disabled", true);
        $('.qhpl-group').hide();
        $('.qhpl-group').attr("disabled", true);
        $('.lqh-group').hide();
        $('.lqh-group').attr("disabled", true);
        $('.qhpl-ddl').hide();
        $('.qhpl-ddl').attr("disabled", true);

        $('#NhomAn').change(function () {
            $('.td-group').hide();
            $('.td-group').attr("disabled", true);
            $('.ldn-group').hide();
            $('.ldn-group').attr("disabled", true);           
            $('.lqh-group').hide();
            $('.lqh-group').attr("disabled", true);
            $('.qhpl-group').hide();
            $('.qhpl-group').attr("disabled", true);
            if ($(this).val() == "HS") {
                $('.td-group').show();
                $('.td-group').attr("disabled", false);
            }
            else if ($(this).val() == "AD") {
                $('.ldn-group').show();
                $('.ldn-group').attr("disabled", false);
            }
            else if ($(this).val() != null && $(this).val() != "") {
                $('.qhpl-group').show();
                $('.qhpl-group').attr("disabled", false);
                $('.qhpl-ddl').hide();
                $('.qhpl-ddl').attr("disabled", true);
                if ($(this).val() == "HC") {
                    $('.lqh-group').hide();
                    $('.lqh-group').attr("disabled", true);
                    $('#khieukien').show();
                    $('#qhpl-label').hide();
                    $('#KhieuKienddl').show();
                    $('#KhieuKienddl').attr("disabled", false);
                }
                else {
                    $('#khieukien').hide();
                    $('#qhpl-label').show();
                    $('.lqh-group').show();
                    $('.lqh-group').attr("disabled", false);
                    $("#LoaiQuanHe")[0].selectedIndex = 0;
                }
            }
            else {
                $('.qhpl-group').hide();
                $('.qhpl-group').attr("disabled", true);
                $('.lqh-group').hide();
                $('.lqh-group').attr("disabled", true);
            }
        });        
    }

    function loaiquanheChange() {
        $('#LoaiQuanHe').change(function () {
            $('.qhpl-ddl').hide();
            $('.qhpl-ddl').attr("disabled", true);
            var str = $('#NhomAn').val();
            if ($(this).val() == "Yêu cầu") {
                str = str + "-" + "YC";
                $("#" + str).show();
                $("#" + str).attr("disabled", false);
            }
            else if ($(this).val() == "Tranh chấp"){
                str = str + "-" + "TC";
                $("#" + str).show();
                $("#" + str).attr("disabled", false);
            }            
        });
    }

    //function exportChiTienXetXu() {

    //    $("#chi-tien-xet-xu-btn").on("click",
    //        function () {
    //            $.ajax({
    //                type: "GET",
    //                url: chiTietBaoCaoThongKeUrl,
    //                data: {
    //                    tuNgay: $("#TuNgay").val(),
    //                    denNgay: $("#DenNgay").val(),
    //                    toaAnId: $("#ToaAnID").val()
    //                },
    //                success: function (response) {
    //                    location.href = 
    //                }
    //            });
    //        });
    //}   

    function reloadBaoCaoThongKeTable() {
        $baoCaoThongKeTable.ajax.reload();
    }

    return {
        init: init
    }
})();

var DanhSachHoSoThongKeModule = (function () {
    var $danhSachHoSoTable;

    function init() {
        initDanhSachHoSoDataTable();
        timKiemHoSoThongKe();
    }

    function initDanhSachHoSoDataTable() {
        $danhSachHoSoTable = $("#ho-so-thong-ke-table").DataTable({
            searching: true,
            order: [],
            pageLength: 10,
            lengthChange: false,
            ajax: {
                url: '/ThongKeGiamSat/DanhSachHoSoBaoCaoThongKe',
                data: {
                    danhSachId: $("#danhSachID").val()
                },
                method: "GET",
                beforeSend: function () {
                    showLoadingOverlay();
                },
                complete: function () {
                    hideLoadingOverlay();
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
                            return '<a target="_blank"  href="/KetQuaXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else if (row.CongDoanHoSo == 5 || row.CongDoanHoSo == -1)
                            return '<a target="_blank" href="/SauXetXu/Index/' + row.HoSoVuAnID + '">' + data + '</a>';
                        else
                            return '<a target="_blank" href="/NhanDon/ChiTietHoSo/' + row.HoSoVuAnID + '">' + data + '</a>';
                    }
                },
                { data: "TenVuAn", className: "custom-wrap"},
                { data: "SoThuLy", className: "text-center" },
                { data: "NgayThuLy" },
                { data: "CongDoan" }
            ]
        });
    }

    function timKiemHoSoThongKe() {
        $('#tim-kiem-ho-so-thong-ke-txt').keyup(function () {
            $danhSachHoSoTable.search($(this).val()).draw();
        });
    }
    
    return {
        init: init
    }
})();
