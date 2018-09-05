using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace PhanCongGiangDay.Infrastructure.Configuration
{
    public interface ITacmConfiguration
    {
        int CacheExpiration { get; }
    }

    public class TacmConfiguration : ITacmConfiguration
    {
        public int CacheExpiration => int.Parse(ConfigurationManager.AppSettings["cache:expiration"]);
    }
}