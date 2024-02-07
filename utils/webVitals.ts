import { Metric } from "web-vitals";
import { onCLS, onFID, onLCP } from "web-vitals/attribution";

const sendToGoogleAnalytics = ({ name, delta, id }: Metric) => {
  if (window.gtag) {
    window.gtag("event", name, {
      event_category: "Web Vitals",
      event_action: name,
      event_value: Math.round(name === "CLS" ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }
};

export const setupWebVitals = (): void => {
  onCLS(sendToGoogleAnalytics);
  onFID(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
};
