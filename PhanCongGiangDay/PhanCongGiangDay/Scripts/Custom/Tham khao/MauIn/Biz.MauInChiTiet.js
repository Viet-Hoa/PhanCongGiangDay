$(function () {
    MauInModule.init();
});

var MauInModule = (function () {
    var hoSoVuAnId = $("#HoSoVuAnID").val();
    var hoSoVuAnIdSauXetXu = $("#hoSoVuAnID").val();

    function init() {
        loadThongTinMauInSo24();
        loadThongTinMauInSo29();
        loadThongTinMauInSo30();
        loadThongTinMauInSo47();
        loadThongTinMauInSo47PT();
        loadThongTinMauInSo61();
        loadThongTinMauInSo65();
        loadThongTinMauInQuyetDinhPCTPThuLy();
        loadThongTinMauInQuyetDinhPCTPGiaiQuyetDon();
        loadThongTinMauInQuyetDinhPCHT_HS();
        loadThongTinMauInQuyetDinhGiaHanCBXX();
        loadThongTinMauInQuyetDinhTamHoanPhienToa();
        loadThongTinMauInQuyetDinhTamGiam();
        loadThongTinMauInQuyetDinhPCTK_HS();
        loadThongTinMauInQuyetDinhDinhChi();
        loadThongTinMauInLenhTrichXuat();
        loadThongTinMauInBienBanGiaoNhan(); 
        loadThongTinMauInGiayTrieuTap();
        loadThongTinMauInBiaHoSo();
        loadThongTinMauInBiaHoSoNhanDon();
        loadThongTinMauInGXNKhangCao();
        loadThongTinMauInBienBanKhangCao();
        loadThongTinMauInThongBaoKhangCao();

        loadThongTinMauInSo24FileDoc();
        loadThongTinMauInPCTP_ST_FileDoc();
        loadThongTinMauInPCTP_GiaiQuyetDon_FileDoc();
        loadThongTinMauIn29_FileDoc();
        loadThongTinMauIn30_FileDoc();
        loadThongTinMauIn47_FileDoc();
        loadThongTinMauInGTT_FileDoc();
        loadThongTinMauInGTTBC_FileDoc();
        loadThongTinMauInGXNKC_FileDoc();
        loadThongTinMauIn61_FileDoc();
        loadThongTinMauIn65_FileDoc();
        loadThongTinMauIn47PT_FileDoc();
        loadThongTinMauInBiaHSNhanDon_FileDoc();
        loadThongTinMauInBiaHS_FileDoc();
        loadThongTinMauInPCHT_FileDoc();
        loadThongTinMauInPCTK_FileDoc();
        loadThongTinMauInQDDinhChi_FileDoc();
        loadThongTinMauInQDTamDinhChi_FileDoc();

        reloadDanhSachMauInTheoNhomAn();
        reloadDanhSachMauInTheoGiaiDoan();
    }

    function reloadDanhSachMauInTheoNhomAn() {
        $("#dsNhomAn").on("change", function () {
            $.ajax({
                type: "GET",
                url: "/MauIn/DanhSachMauInTheoGiaiDoanVaNhomAn",
                data: {
                    giaiDoan: $("#dsGiaiDoan").val(),
                    nhomAn: $("#dsNhomAn").val()
                },
                success: function (data) {
                    $("#danhSachMauIn").html(data);
                }
            });
        });
    }
    function reloadDanhSachMauInTheoGiaiDoan() {
        $("#dsGiaiDoan").on("change", function () {
            $.ajax({
                type: "GET",
                url: "/MauIn/DanhSachMauInTheoGiaiDoanVaNhomAn",
                data: {
                    giaiDoan: $("#dsGiaiDoan").val(),
                    nhomAn: $("#dsNhomAn").val()
                },
                success: function (data) {
                    $("#danhSachMauIn").html(data);
                }
            });
        });
    }

    function loadThongTinMauInSo24() {
        $("#mau-in-so-24-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo24",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {                            
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo29() {
        $("#mau-in-so-29-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo29",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        
                        if (response.success) {
                            
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo30() {
        $("#mau-in-so-30-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo30",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo47() {
        $("#mau-in-so-47-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo47",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo47PT() {
        $("#mau-in-so-47PT-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo47PT",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo61() {
        $("#mau-in-so-61-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo61",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo65() {
        $("#mau-in-so-65-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInSo65",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhPCTPThuLy() {
        $("#mau-in-quyet-dinh-pctp-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhPhanCongThamPhanThuLy",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhPCTPGiaiQuyetDon() {
        $("#mau-in-QDPCTP-giai-quyet-don").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhPhanCongThamPhanGiaiQuyetDon",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInGiayTrieuTap() {
        $(".mau-in-giay-trieu-tap-btn").on("click",
            function () {
                var loai = $(this).data("loai");
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInGiayTrieuTap",
                    data: {
                        hoSoVuAnId: hoSoVuAnId,loai:loai
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInBiaHoSo() {
        var id;
        if (hoSoVuAnId === null || hoSoVuAnId == undefined) { id = hoSoVuAnIdSauXetXu; } else { id = hoSoVuAnId; }
        $("#mau-in-bia-ho-so-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBiaHoSo",
                    data: {
                        hoSoVuAnId: id
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInBiaHoSoNhanDon() {
        $("#mau-in-bia-ho-so-nhan-don-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBiaHoSoNhanDon",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInGXNKhangCao() {
        $("#gxn-da-nhan-don-khang-cao-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInGXNDaNhanKhangCao",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInBienBanKhangCao() {
        $("#bien-ban-khang-cao-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBienBanKhangCao",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhPCHT_HS() {
        $("#mau-in-quyet-dinh-pcht-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhPhanCongHoiTham",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhPCTK_HS() {
        $("#mau-in-quyet-dinh-pctk-btn").on("click",
            
            function () {
                showLoadingOverlay();
                
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhPhanCongThuKy",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhGiaHanCBXX() {
        $("#mau-in-quyet-dinh-gia-han-btn").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhGiaHanCBXX",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhTamHoanPhienToa() {
        $(".mau-in-quyet-dinh-tam-hoan-btn").on("click",
            function () {
                showLoadingOverlay();
                var loai = $(this).data("loai");
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhTamHoanPhienToa",
                    data: {
                        hoSoVuAnId: hoSoVuAnId,loai:loai
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInLenhTrichXuat() {
        $("#mau-in-lenh-trich-xuat-btn").on("click",
            function () {
                showLoadingOverlay();
                
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInLenhTrichXuat",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInBienBanGiaoNhan() {
        $("#mau-in-bien-ban-giao-nhan-btn").on("click",
            function () {
                showLoadingOverlay();

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBienBanGiaoNhan",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhTamGiam() {
        $(".mau-in-quyet-dinh-tam-giam-btn").on("click",
            function () {
                showLoadingOverlay();
                var mauinSo = $(this).data("mauinso");
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhTamGiam",
                    data: {
                        hoSoVuAnId: hoSoVuAnId, congDoan: $('#roleCongDoan').val(), mauInSo: mauinSo
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInThongBaoKhangCao() {
        $("#thong-bao-khang-cao-btn").on("click",
            function () {
                showLoadingOverlay();
                
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBienBanKhangCao",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQuyetDinhDinhChi() {
        $(".quyet-dinh-dinh-chi-btn").on("click",
            function () {
                showLoadingOverlay();
                var loai = $(this).data("loai");
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhDinhChi",
                    data: {
                        hoSoVuAnId: hoSoVuAnId, loai: loai
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath;
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInSo24FileDoc() {
        $("#btnMauIn24FileDoc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn24FileDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInPCTP_ST_FileDoc() {
        $("#btnMauInPCTP_ST_FileDoc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhPCTPDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInPCTP_GiaiQuyetDon_FileDoc() {
        $("#mau-in-QDPCTP-giai-quyet-don_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQuyetDinhPCTPGiaiQuyetDonDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauIn29_FileDoc() {
        $("#mau-in-so-29-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn29Doc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauIn30_FileDoc() {
        $("#mau-in-so-30-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn30Doc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauIn47_FileDoc() {
        $("#mau-in-so-47-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn47Doc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInGTT_FileDoc() {
        $("#mau-in-giay-trieu-tap-btn-Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInGTTDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInGTTBC_FileDoc() {
        $("#mau-in-giay-trieu-tap-bicao-btn-Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInGTTBiCaoDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInGXNKC_FileDoc() {
        $("#gxn-da-nhan-don-khang-cao-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInGXNKCDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauIn61_FileDoc() {
        $("#mau-in-so-61-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn61Doc",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauIn65_FileDoc() {
        $("#mau-in-so-65-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn65Doc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauIn47PT_FileDoc() {
        $("#mau-in-so-47PT-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauIn47PTDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInBiaHSNhanDon_FileDoc() {
        $("#mau-in-bia-ho-so-nhan-don-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBiaHoSoNhanDonDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInBiaHS_FileDoc() {
        $("#mau-in-bia-ho-so-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInBiaHoSoDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnIdSauXetXu
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInPCHT_FileDoc() {
        $("#mau-in-quyet-dinh-pcht-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQDPhanCongHT",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInPCTK_FileDoc() {
        $("#mau-in-quyet-dinh-pctk-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQDPhanCongTK",
                    data: {
                        hoSoVuAnId: hoSoVuAnId
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQDDinhChi_FileDoc() {
        $("#quyet-dinh-dinh-chi-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQDDinhChiDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId, loai: "dinhchi"
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    function loadThongTinMauInQDTamDinhChi_FileDoc() {
        $("#quyet-dinh-tam-dinh-chi-btn_Doc").on("click",
            function () {
                showLoadingOverlay();
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: "GET",
                    url: "/MauIn/MauInQDDinhChiDoc",
                    data: {
                        hoSoVuAnId: hoSoVuAnId, loai: "tamdinhchi"
                    },
                    success: function (response) {
                        if (response.success) {
                            var str = response.filePath[0];
                            var i = str.search("FileManagement");
                            str = str.substring(i, str.Count);
                            str = str.split("\\").join("/");
                            window.open(document.location.origin + "/" + str);
                        }
                        else {
                            $.notify({ message: "Mẫu in thiếu dữ liệu, vui lòng kiểm tra lại!" }, { type: "danger" });
                        }
                    },
                    async: false, //use this to bypass browser's popup blocker (maybe)
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            });
    }

    return {
        init: init
    };
})();