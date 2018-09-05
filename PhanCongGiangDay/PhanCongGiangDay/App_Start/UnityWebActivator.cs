
using System.Linq;
using System.Web.Mvc;
using PhanCongGiangDay;
using Microsoft.Practices.Unity.Mvc;
using PhanCongGiangDay.App_Start;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(UnityWebActivator), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(UnityWebActivator), "Shutdown")]

namespace PhanCongGiangDay.App_Start
{
    public class UnityWebActivator
    {
        /// <summary>Integrates Unity when the application starts.</summary>
        public static void Start()
        {
            var container = UnityConfig.GetConfiguredContainer();

            FilterProviders.Providers.Remove(FilterProviders.Providers.OfType<FilterAttributeFilterProvider>().First());
            FilterProviders.Providers.Add(new UnityFilterAttributeFilterProvider(container));
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

        }

        /// <summary>Disposes the Unity container when the application is shut down.</summary>
        public static void Shutdown()
        {
            var container = UnityConfig.GetConfiguredContainer();
            container.Dispose();
        }
    }
}