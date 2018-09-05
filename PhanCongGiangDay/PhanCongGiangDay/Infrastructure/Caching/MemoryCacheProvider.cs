using PhanCongGiangDay.Infrastructure.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;
using System.Web.Caching;

namespace PhanCongGiangDay.Infrastructure.Caching
{

    public class MemoryCacheProvider : ICacheProvider
    {
        protected readonly ObjectCache cache = MemoryCache.Default;

        protected readonly ITacmConfiguration Configuration;

        public MemoryCacheProvider(ITacmConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public object Get(string key)
        {
            return cache.Get(key);
        }

        public T Get<T>(string key)
        {
            return (T)cache.Get(key);
        }

        public bool Set(string key, object value, int? expirationIn = null)
        {
            expirationIn = expirationIn.HasValue ? expirationIn.Value : this.Configuration.CacheExpiration;
            cache.Set(key, value, new CacheItemPolicy() { AbsoluteExpiration = new DateTimeOffset(DateTime.Now.AddSeconds(expirationIn.Value)) });

            return true;
        }
    }
}