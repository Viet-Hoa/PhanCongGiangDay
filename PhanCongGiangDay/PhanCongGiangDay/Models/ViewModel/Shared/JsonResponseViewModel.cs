using System;
using System.Collections.Generic;
using PhanCongGiangDay.Infrastructure.Extensions;

namespace Biz.TACM.Models.ViewModel.Shared
{
    public class JsonResponseViewModel
    {
        private readonly List<string> _messages;
        public bool IsSuccess { get; }
        public IEnumerable<string> Messages => _messages;
        public object Data { get; }

        public JsonResponseViewModel(bool isSuccess, IEnumerable<string> messages, object data = null)
        {
            IsSuccess = isSuccess;
            _messages = new List<string>(messages);
            Data = data;
        }

        public static JsonResponseViewModel CreateSuccess(object data = null)
        {
            return new JsonResponseViewModel(true, new[] { "Xử lý thành công!" }, data);
        }

        public static JsonResponseViewModel CreateSuccess(string message, object data = null)
        {
            return new JsonResponseViewModel(true, new[] { message }, data);
        }

        public static JsonResponseViewModel CreateFail(Exception ex, bool showStackTrace = false)
        {
            var messages = new List<string> { showStackTrace ? ex.FlattenExceptionMessage() : ex.Message };
            return new JsonResponseViewModel(false, messages);
        }

        public static JsonResponseViewModel CreateFail(string message)
        {
            var messages = new List<string> { message };
            return new JsonResponseViewModel(false, messages);
        }

        public static JsonResponseViewModel UpdateSuccess(string title, object data = null)
        {
            return new JsonResponseViewModel(true, new[] { string.Format("Cập nhật {0} thành công!", title) }, data);
        }
    }
}