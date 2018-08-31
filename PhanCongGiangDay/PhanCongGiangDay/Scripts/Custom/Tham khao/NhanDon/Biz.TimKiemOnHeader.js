$(function () {
    TimKiemModule.init();
});

var TimKiemModule = (function () {
    var searchForm = $("#formTimKiemOnHeader");
    var searchBox = $("#searchBoxOnHeader");

    var autoCompleteUrl = "/NhanDon/AutoComplete/";

    function init() {
        editKeyword();
        loadAutoComplete();
    }

    function editKeyword() {
        searchForm.on("submit", function () {
            searchBox.val(searchBox.val().trim());
        });
    }
    function loadAutoComplete() {
        var isEmpty = false;
        searchBox.autocomplete({
            minLength: 2,
            position: { my: "right top+3", at: "right bottom" },
            source: function (request, response) {
                isEmpty = false;
                $.ajax({
                    url: autoCompleteUrl,
                    data: { keyword: request.term },
                    type: "GET",
                    success: function (data) {
                        if (data.length == 0) {
                            isEmpty = true;
                            data = [{ empty: "Không tìm thấy hồ sơ liên quan!" }];
                        }
                        response(data);
                    }
                });
            },
            focus: function (event, ui) {
                searchBox.val(searchBox.val());
                return false;
            },
            select: function (event, ui) {
                searchBox.val(ui.item.MaHoSo);
                return false;
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                if (isEmpty) {
                    return $("<li>")
                        .append("<p class=\"m-0 justify-content-center\">" + item.empty + "</p>")
                        .appendTo(ul);
                }
                else {
                    return $("<li>")/*<pre></pre>*/
                        .append("<a href=\"" + urlCongDoanHoSo(item.HoSoVuAnID, item.CongDoanHoSo) + "\" class=\"d-flex\">"
                        + "<span class=\"btn-cong-doan-size badge badge-pill " + getColorStateAsString(item.CongDoanHoSo) + "\">"
                        + getCongDoanHoSoAsString(item.CongDoanHoSo)
                        + "</span>"
                        + "<nobr class=\"d-flex\">&nbsp;#" + item.SoHoSo + " - " + item.MaHoSo + getStringAllDuongSu(item.DuongSu) + "</nobr></a>")
                        .appendTo(ul);
                }
            };
    }

    function urlCongDoanHoSo(hoSoVuAnID, congDoan) {
        var url = "/NhanDon/ChiTietHoSo/" + hoSoVuAnID;

        switch (congDoan) {
            case 2:
                url = "/ThuLy/Index/" + hoSoVuAnID;
                break;
            case 3:
                url = "/ChuanBiXetXu/Index/" + hoSoVuAnID;
                break;
            //case 4:
            //    url = "/XetXu/Index/" + hoSoVuAnID;
            //    break;
            case 4:
                url = "/KetQuaXetXu/Index/" + hoSoVuAnID;
                break;
            case 5:
                url = "/SauXetXu/Index/" + hoSoVuAnID;
                break;
            case -1:
                url = "/SauXetXu/Index/" + hoSoVuAnID;
                break;
        }
        return url;
    };

    function getCongDoanHoSoAsString(congDoan) {
        var strCongDoan = "Nhận Đơn";

        switch (congDoan) {
            case 2:
                strCongDoan = "Thụ Lý";
                break;
            case 3:
                strCongDoan = "Chuẩn Bị Xét Xử";
                break;
            //case 4:
            //    strCongDoan = "Xét Xử";
            //    break;
            case 4:
                strCongDoan = "Kết Quả Giải Quyết";
                break;
            case 5:
                strCongDoan = "Sau Xét Xử";
                break;
            case -1:
                strCongDoan = "Lưu Kho";
                break;
        }
        return strCongDoan;
    }

    function getColorStateAsString(congDoan) {
        var colorCongDoan = "state-nhandon";

        if (congDoan == 2) {
            colorCongDoan = "state-thuly";
        }
        else if (congDoan == 3) {
            colorCongDoan = "state-chuanbixetxu";
        }
        //else if (congDoan == 4) {
        //    colorCongDoan = "state-xetxu";
        //}
        else if (congDoan == 4) {
            colorCongDoan = "state-ketquaxetxu";
        }
        else if (congDoan == 5) {
            colorCongDoan = "state-sauxetxu";
        }
        else if (congDoan == -1) {
            colorCongDoan = "state-luukho";
        }

        return colorCongDoan;
    }

    function getStringAllDuongSu(danhSachDuongSu) {
        var strAllDuongSu = "";
        for (i in danhSachDuongSu) {
            strAllDuongSu += " - " + danhSachDuongSu[i].HoVaTen;
        }
        return strAllDuongSu;
    }

    return {
        init: init
    }
})();