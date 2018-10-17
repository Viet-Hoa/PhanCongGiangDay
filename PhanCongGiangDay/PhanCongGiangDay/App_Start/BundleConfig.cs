using System.Web;
using System.Web.Optimization;

namespace PhanCongGiangDay
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*",
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.cookie.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/jquery.stickytabs.js",
                        "~/Scripts/tether.min.js",
                        "~/Scripts/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                "~/Scripts/jquery.dataTables.min.js",
                "~/Scripts/dataTables.bootstrap4.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/loadingOverlay").Include(
                "~/Scripts/loadingoverlay.min.js",
                "~/Scripts/loadingoverlay_progress.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/boxSlider").Include(
                "~/Scripts/box-slider-all.jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                "~/Scripts/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datetimepicker").Include(
                "~/Scripts/bootstrap-datetimepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/notify").Include(
                "~/Scripts/bootstrap-notify.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-grid.css",
                      "~/Content/bootstrap-reboot.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/dataTables.bootstrap4.min.css",
                      "~/Content/bootstrap-datetimepicker.min.css",
                      "~/Content/animate.css",
                      "~/Content/site.css",
                      "~/Content/custom.css",
                      "~/Content/jquery.treegrid.css",
                      "~/Content/jquery-ui.css",
                      "~/Content/dropzone-basic.css",
                      "~/Content/dropzone.css"));

            bundles.Add(new ScriptBundle("~/bundles/biz").Include(
                "~/Scripts/BIZ.Application.js",
                "~/Scripts/BIZ.UploadDocuments.js",
                "~/Scripts/dropzone.js"));

            bundles.Add(new ScriptBundle("~/bundles/treeview").Include(
                "~/Scripts/jquery.treegrid.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqplot")
                .Include("~/Scripts/jquery.jqplot/jquery.jqplot.{version}.js")
                .Include("~/Scripts/jquery.jqplot/excanvas.js")
                .Include("~/Scripts/jquery.jqplot/plugins/*.js"));


            bundles.Add(new ScriptBundle("~/bundles/underscore").Include(
               "~/Scripts/underscore-min.js"));

            bundles.Add(new ScriptBundle("~/bundles/donvi").Include(
               "~/Scripts/Custom/DonVi/DonVi.js"));
            bundles.Add(new ScriptBundle("~/bundles/namhoc").Include(
               "~/Scripts/Custom/NamHoc/NamHoc.js"));
            bundles.Add(new ScriptBundle("~/bundles/khoa").Include(
               "~/Scripts/Custom/Khoa/Khoa.js"));
            bundles.Add(new ScriptBundle("~/bundles/pcnl").Include(
              "~/Scripts/Custom/PhanCongNhomLop/PhanCongNhomLop.js"));
        }
    }
}
