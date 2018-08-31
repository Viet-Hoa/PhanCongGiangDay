var s;
$(function(){
NhomAnNhanVienModule.init()
});

var NhomAnNhanVienModule = (function () {
    var nhomAnUrl = "/PhanCongNhanVien/ToaAnChangeNhomAn";
    var nhanVienUrl ="/PhanCongNhanVien/ToaAnChangeNhanVien";
    function init() {
        
        loadNhomAn();
        loadNhanVien_all();
        
    }
    
    function loadNhomAn() {
        $('#toaAn-ddl').change( function () {
            $.ajax({
                type: "GET",
                url: nhomAnUrl,
                data: {
                    ToaAnID:$("#toaAn-ddl").val(),
                },
                success: function (data) {
                    $("#dsNhomAn").html(data);
                }
            });
        }).change();
    }

    function loadNhanVien_all() {
        $('#toaAn-ddl').change( function () {
            $.ajax({
                type: "GET",
                url: nhanVienUrl,
                data: {
                    ToaAnID:$("#toaAn-ddl").val(),
                },
                success: function (data) {
                    $("#dsNhanVien").html(data);
                    initView();
                }
            });
        }).change();
    }

    function initView() {
        $('#dsNhanVien input[type=checkbox]').attr('disabled', 'true');
    }

    function reloadNhomAn(){
        $.ajax({
                type: "GET",
                url: nhomAnUrl,
                data: {
                    ToaAnID:$("#toaAn-ddl").val(),
                },
                success: function (data) {
                    $("#dsNhomAn").html(data);
                    setstyle();
                }
            });
        
    }
    function setstyle(){
        $(s).css("background","#88AFEC");
        $(s).attr("id","selected");
    }
    return {
        init: init,
        reloadNhomAn:reloadNhomAn
    }
})();

var ChucDanhddlModule = (function(nhomAnNhanVienModule){
    function init(){
    loadChucDanh();
    }
    function loadChucDanh() {
        $('#toaAn-ddl').change( function () {
        $.ajax({
            url: "/PhanCongNhanVien/ToaAnChangeChucDanh",
            type: "POST",
            dataType: "json",
            data: { toaAnID: $("#toaAn-ddl").val() },
            success: function (data) {
                $("#chucDanh-ddl").empty();
                $("#chucDanh-ddl").prop('disabled', false);
                $("#chucDanh-ddl").append("<option value=''>--Chọn chức danh--</option>");
                $.each(data, function (index, value) {
                    $("#chucDanh-ddl").append("<option value='" + value.Value + "'>" + value.Text + "</option>");
                });
            }
        });
        }).change();
    }
    return {
        init: init
    }
})(NhomAnNhanVienModule);

var SelectrowModule=(function(nhomAnNhanVienModule){

    function init(){
    select_row();
    }

    function select_row() {
        $(document).ready(function () {
            $(".slr").on("click", function () {
                $('#dsNhanVien input[type=checkbox]').attr('disabled', 'false');
                $(this).css("background","#88AFEC").siblings().removeAttr("style");
                $(this).attr("id","selected").siblings().removeAttr("id");
                var ID = $(this).closest('tr').find(".hdid").val();
                s = "#id_" + ID;
                $('#chucDanh-ddl').val('');
                $.ajax({
                    type: "GET",
                    url: "PhanCongNhanVien/NhomAnChanged",
                    data: {
                        NhomAnID:ID, ToaAnID:$("#toaAn-ddl").val()
                    },
                    success: function (data) {
                        $("#dsNhanVien").html(data);
                    }
                });
            });
        });
        
    }

    return{
    init: init
    }


})(NhomAnNhanVienModule);

var CheckAllModule=(function(nhomAnNhanVienModule){
    function init(){
       checkbox_all();
    }

    function checkbox_all(){
        $('#allNV').click(function () {
               
        $("input:checkbox").prop('checked', $(this).prop("checked"));

        });    
    }
    return{
    init: init
    }
})(NhomAnNhanVienModule);

var ChucDanhChangeModule=(function(nhomAnNhanVienModule){
    function init(){
        loadnv();
    }
    function loadnv(){
        $("#chucDanh-ddl").change(function(){
            if ($("#selected .hdid").val() == null)
                $.notify({ message: "Chọn nhóm án trước khi chọn chức danh." }, { type: "danger" });
            else {
                $.ajax({
                    type: "GET",
                    url: "PhanCongNhanVien/ChucDanhChanged",
                    data: {
                        NhomAnID: $("#selected .hdid").val(), ToaAnID: $("#toaAn-ddl").val(), SoDoToChucID: $("#chucDanh-ddl").val()
                    },
                    success: function (data) {
                        $("#dsNhanVien").html(data);
                    }
                });
            }
        });
    }
    return{
    init: init
    }

})(NhomAnNhanVienModule);

var SaveChangeModule=(function(nhomAnNhanVienModule){


    function init(){      
        $formPhanCong = $("#formPhanCong");
        bindFormActions();
    }

    function bindFormActions(){
        $("#PhanCong-save").click(function(){
            showLoadingOverlay();
                $.ajax({
                    type: $formPhanCong.prop("method"),
                    url: $formPhanCong.prop("action"),
                    data: $($formPhanCong).serialize(),
                    success: function (response) {
                        if (!response.IsSuccess) {
                            $.notify({ message: "Lưu thay đổi phân công nhân viên vào nhóm án không thành công." }, { type: "danger" });
                        } else {
                            $.notify({ message: "Lưu thay đổi phân công nhân viên vào nhóm án thành công." }, { type: "success" });
                            reloadResult();
                            NhomAnNhanVienModule.reloadNhomAn();

                        }
                    },
                    complete: function () {
                        hideLoadingOverlay();
                    }
                });
            return false;
        });
    }

    function reloadResult(){
        $.ajax({
                    type: "GET",
                    url: "PhanCongNhanVien/ChucDanhChanged",
                    data: {
                        NhomAnID:$("#selected .hdid").val(), ToaAnID:$("#toaAn-ddl").val(), SoDoToChucID:$("#chucDanh-ddl").val()
                    },
                    success: function (data) {
                        $("#dsNhanVien").html(data);
                    }
                });
    }

    return{
    init: init
    }
})(NhomAnNhanVienModule);