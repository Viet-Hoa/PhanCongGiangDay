$(function () {
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });

    $(document).ajaxComplete(function (event, xhr) {
        if (xhr.status === 308) {
            window.location.href = "/Account/Login";
        }
        else if (xhr.status === 309) {
            window.location.href = "/Account/UnAuthorize";
        }
    });

    $("a.toggle-status").on("click",
        function () {
            $(this).toggleClass("toggled");
            if ($(this).hasClass("toggled")) {
                $(this).find("i.material-icons").text("keyboard_arrow_up");
                $(".vertical-nav").slideUp("fast");
            } else {
                $(this).find("i.material-icons").text("keyboard_arrow_down");
                $(".vertical-nav").slideDown("fast");
            }
        });

    $.LoadingOverlaySetup({
        image: "/Content/Images/loading.gif",
        maxSize: "20px",
        minSize: "20px"
    });

    $.notifyDefaults({
        offset: {
            y: 70
        },
        placement: {
            from: "top",
            align: "center"
        },
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        delay: 3000
    });

    //$().CKEditorGetVal(element_id)
    jQuery.fn.CKEditorGetVal = function (element_id) {
        return CKEDITOR.instances[element_id].getData();
    }

    //$().CKEditorSetValForTextarea(element_id)
    jQuery.fn.CKEditorSetValForTextarea = function (element_id) {
        $('#' + element_id).val(CKEDITOR.instances[element_id].getData());
    }

    initDatatableLanguage();
    initBootstrapDialog();
});

function showLoadingOverlay(selector) {
    if (selector) {
        $(selector).LoadingOverlay("show");
    } else {
        $.LoadingOverlay("show");
    }
}

function hideLoadingOverlay(selector) {
    if (selector) {
        $(selector).LoadingOverlay("hide");
    } else {
        $.LoadingOverlay("hide");
    }
}

function initDatatableLanguage() {
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "sProcessing": "Đang xử lý...",
            "sLengthMenu": "Xem _MENU_ mục",
            "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
            "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
            "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
            "sInfoFiltered": "(được lọc từ _MAX_ mục)",
            "sInfoPostFix": "",
            "sSearch": "Tìm:",
            "sUrl": "",
            "emptyTable": "Hiện tại chưa có dữ liệu.",
            "oPaginate": {
                "sFirst": "Đầu",
                "sPrevious": "Trước",
                "sNext": "Tiếp",
                "sLast": "Cuối"
            }
        }
    });
}

function initBootstrapDialog() {
    $("body").on("click", '[data-trigger="modal"][data-url]', function () {
        var self = $(this);
        var modalUrl = self.data("url");
        var modalTarget = $(self.data("target"));

        showLoadingOverlay();
        modalTarget.find(".modal-content").load(modalUrl, "", function (response, status) {
            if (status === "success") {
                hideLoadingOverlay();
                modalTarget.modal();
                modalTarget.show();
            }
        });
        modalTarget.on("hidden", function () {
            modalTarget.html("");
        });
    });

    $(".modal").on("shown.bs.modal", function () {
        // Enable modal validation
        $.validator.unobtrusive.parse($(".modal"));
    });
    $(".modal").on("hide.bs.modal", function () {
        // Destroy tinymce's instance when dialog has been closed
        //tinymce.remove();
    });
}

//$.tinymceDefaults = {
//    skin_url: "/Scripts/tinymce/skins/lightgray",
//    menubar: false,
//    toolbar_items_size: "small",
//    toolbar1: "bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | removeformat | undo redo"
//}

$('.disabled').click(function(e) {
    e.preventDefault();
});

/* Functions in charge of the pop-ups (Warning, success, error,...) formatting */
function showRelevantPopUp(popup) {
    if (popup && popup.status && popup.message) {
        switch (popup.status) {
        case "success":
            return showSuccess(popup.message);
        case "error":
            return showError(popup.message);
        case "warning":
            return showWarning(popup.message);
        }
    }

    return null;
}

function showError(message) {
    $('.popup').remove();
    var div =
        '<div id="error" style="display:none;" class="popup alert-danger alert">' +
            '<a class="close" data-dismiss="alert" href="#">&times;</a>' +
            '<h4 class="alert-heading">Warning!</h4>' +
            '<div id="error-content">' + message + '</div>' +
            '</div>';
    $('body').append(div);
    $('#error').show('shake');
    //setTimeout(function () { $('.popup').remove(); }, 10000);
}

function showSuccess(message) {
    $('.popup').remove();
    var div =
        '<div id="success" style="display:none;" class="popup alert-success alert">' +
            '<a class="close" data-dismiss="alert" href="#">&times;</a>' +
            '<div id="error-content">' + message + '</div>' +
            '</div>';
    $('body').append(div);
    $('#success').show();
    setTimeout(function () {
        $('.popup').hide('fast');
        $('.popup').remove();
    }, 10000);
}

function showWarning(message) {
    $('.popup').remove();
    var div =
        '<div id="alert-danger" style="display:none;" class="popup alert">' +
            '<a class="close" data-dismiss="alert" href="#">&times;</a>' +
            '<div id="alert-danger-content">' + message + '</div>' +
            '</div>';
    $('body').append(div);
    $('#alert-danger').show();
    //setTimeout(function () {
    //    $('.popup').hide('fast');
    //    $('.popup').remove();
    //}, 10000);
}

function removeSpaceSpecialChar(str) {
    var temp = str.toLowerCase().replace(/\W+/gm, '');
    return temp;
}

function showControlByClass(selector) {
    $(selector).each(function () {
        $(this).show();
        $(this).find("*").prop('disabled', false);
    });
}

function hideControlByClass(selector) {
    $(selector).each(function () {
        $(this).hide();
        $(this).find("*").prop('disabled', true);
    });
}