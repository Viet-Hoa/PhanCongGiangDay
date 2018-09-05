using System;
using System.Text;

namespace PhanCongGiangDay.Infrastructure.Extensions
{
    public static class ExceptionExtensions
    {
        public static string FlattenExceptionMessage(this Exception exception)
        {
            var message = new StringBuilder();

            while (exception != null)
            {
                message.AppendLine(exception.Message);
                message.AppendLine($"{exception.StackTrace}");
                message.AppendLine();

                exception = exception.InnerException;
            }

            return message.ToString();
        }
    }
}