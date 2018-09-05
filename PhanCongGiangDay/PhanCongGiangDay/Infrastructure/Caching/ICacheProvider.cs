using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;
using System.Web.Caching;

namespace PhanCongGiangDay.Infrastructure.Caching
{
    public interface ICacheProvider
    {
        bool Set(string key, object value, int? expirationIn = null);
        object Get(string key);
        T Get<T>(string key);
    }
}