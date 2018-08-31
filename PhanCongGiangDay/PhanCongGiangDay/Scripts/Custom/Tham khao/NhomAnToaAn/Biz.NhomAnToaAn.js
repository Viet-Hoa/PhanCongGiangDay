$(function(){
NhomAnToaAnModule.init()
});

var NhomAnToaAnModule = (function () {
    var nhomAnUrl = "/NhomAnToaAn/NhomAnTheoToaAn";
    

    function init() {
        
        loadNhomAn();
    }
    
    function loadNhomAn() {
        $('#toaAn-ddl').change( function () {
            $.ajax({
                type: "GET",
                url: nhomAnUrl,
                data: {
                    id:$("#toaAn-ddl").val(),
                },
                success: function (data) {
                    $("#checkboxlist").html(data);
                }
            });
        }).change();
    }
    function reloadNhomAn(){
        $.ajax({
                type: "GET",
                url: nhomAnUrl,
                data: {
                    id:$("#toaAn-ddl").val(),
                },
                success: function (data) {
                    $("#checkboxlist").html(data);
                }
            });
    }


    return {
        init: init,
        reloadNhomAn:reloadNhomAn
    }
})();
var ThayDoiNhomAnModule=(function(nhomAnToaAnModule){

    function init() {
        $formNhomAn = $("#formNhomAn");
        bindFormActions();
    }

    function bindFormActions() {
        $("#NhomAn-save").click(function () {
                showLoadingOverlay();
                $.ajax({
                    type: $formNhomAn.prop("method"),
                    url: $formNhomAn.prop("action"),
                    data: $($formNhomAn).serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: "Lưu thay đổi nhóm án không thành công" }, { type: "danger" });
                        } else {
                            $.notify({ message: "Lưu thay đổi nhóm án thành công" }, { type: "success" });
                            NhomAnToaAnModule.reloadNhomAn();
                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            return false;
            });
    }



    return {
        init: init
    }
})(NhomAnToaAnModule);