const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });

    // Native Interaction to Next Paint (INP) observer
    if (
      typeof window !== 'undefined' &&
      'PerformanceObserver' in window &&
      PerformanceObserver.supportedEntryTypes &&
      PerformanceObserver.supportedEntryTypes.includes('event')
    ) {
      try {
        let maxInteraction = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.interactionId && entry.duration > maxInteraction) {
              maxInteraction = entry.duration;
              onPerfEntry({
                name: 'INP',
                value: maxInteraction,
                delta: maxInteraction,
                id: `inp-${Date.now()}`,
                rating: maxInteraction <= 200 ? 'good' : maxInteraction <= 500 ? 'needs-improvement' : 'poor',
                entries: [entry],
              });
            }
          }
        });
        observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });
      } catch (e) {
        // PerformanceObserver option unsupported in legacy browser
      }
    }
  }
};

export default reportWebVitals;
