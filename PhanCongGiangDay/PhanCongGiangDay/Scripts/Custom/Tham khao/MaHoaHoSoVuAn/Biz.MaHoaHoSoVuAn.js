$(function () {
    MaHoaHoSoVuAn.init();
});

var MaHoaHoSoVuAn = (function () {
    var $formEncrypt;

    function init() {
        $formEncrypt = $("#formEncrypt");
        initDuongSuDataTable();
        initUploadFile();
        encrypted();
    }

    function initDuongSuDataTable() {
        $("#ma-hoa-ho-so-table").DataTable({
            searching: false,
            order: [],
            pageLength: 25,
            lengthChange: false,
            ajax: {
                url: "/MaHoaHoSoVuAn/BangDanhSachDuongSu",
                method: "GET"
            },
            columns: [
                { data: "STT" },
                { data: "TuCachThamGiaToTung" },
                { data: "HoVaTen" },
                { data: "NoiDKHKTT" }
            ]
        });
    }

    function initUploadFile() {
        $('#file_upload').change(function (e) {
            var files = e.target.files;
            if (files.length > 0) {
                if (window.FormData !== undefined) {
                    var data = new FormData();
                    for (var x = 0; x < files.length; x++) {
                        data.append("file" + x, files[x]);
                    }
                    $.ajax({
                        type: "POST",
                        dateType: "json",
                        url: '/MaHoaHoSoVuAn/UploadFile',
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            if (result.IsSuccess) {
                                $('#fileName').val(result.Data.fileName);
                                $('#folderPath').val(result.Data.folderPath);
                                $('#file_upload').parent().next('.error').remove();
                            }
                            else {
                                if ($('#file_upload').parent().next('.error').length == 0) {
                                    $('#file_upload').parent().after('<div class="col-12 error has-error">' + result.msg + '</div>');
                                }
                            }
                        }
                    });
                } else {
                    $.notify({ message: "Trình duyệt không hỗ trợ HTML5 để tải lên tập tin!" }, { type: "danger" });
                }
            }
        });
    }

    function encrypted() {
        $("#btnEncrypt").on("click",
            function () {
                //if ($formEncrypt.valid()) {
                    showLoadingOverlay();
                    $.ajax({
                        type: $formEncrypt.prop("method"),
                        url: $formEncrypt.prop("action"),
                        data: $($formEncrypt).serialize(),
                        success: function (response) {
                            if (!response.IsSuccess) {
                                $.notify({ message: response.Messages }, { type: "danger" });
                            } else {
                                $("#downloadContainer").html(
                                    '<a class="btn btn-primary mr-3" href="/MaHoaHoSoVuAn/DownloadFile?filePath=' + response.Data.outputFileName + '">Tải DOC</a>'
                                    + '<a class="btn btn-primary" href="/MaHoaHoSoVuAn/DownloadFile?filePath=' + response.Data.pdfOutputFileName + '">Tải PDF</a>'
                                );
                            }
                        },
                        complete: function () {
                            $('#modal').modal("hide");
                            hideLoadingOverlay();
                        }
                    });
                //}
            });
    }

    return {
        init: init
    }
})();