import { BetaAnalyticsDataClient } from "@google-analytics/data";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROPERTY_ID = "432225413";

let analyticsClient;
try {
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    analyticsClient = new BetaAnalyticsDataClient({ credentials });
  } else {
    const keyFilePath = path.resolve(__dirname, "../../suelapp-837b5-firebase-adminsdk-oqol2-b30dadf279.json");
    if (existsSync(keyFilePath)) {
      analyticsClient = new BetaAnalyticsDataClient({ keyFilename: keyFilePath });
    }
  }
} catch (error) {
  console.error("Error initializing Analytics client:", error.message);
}

async function runReport(config) {
  if (!analyticsClient) throw new Error("Analytics client not initialized");
  const [response] = await analyticsClient.runReport({
    property: `properties/${PROPERTY_ID}`,
    ...config,
  });
  return response;
}

export const getAnalyticsOverview = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 28;
    const dateRange = { startDate: `${days}daysAgo`, endDate: "today" };

    const [usersReport, deviceReport, sourceReport, countryReport] = await Promise.all([
      runReport({
        dateRanges: [dateRange],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
        ],
      }),

      runReport({
        dateRanges: [dateRange],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
      }),

      runReport({
        dateRanges: [dateRange],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),

      runReport({
        dateRanges: [dateRange],
        dimensions: [{ name: "city" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 10,
      }),
    ]);

    const totals = {
      activeUsers: Number(usersReport.rows?.[0]?.metricValues?.[0]?.value || 0),
      sessions: Number(usersReport.rows?.[0]?.metricValues?.[1]?.value || 0),
      pageViews: Number(usersReport.rows?.[0]?.metricValues?.[2]?.value || 0),
      avgSessionDuration: Number(usersReport.rows?.[0]?.metricValues?.[3]?.value || 0),
    };

    const devices = (deviceReport.rows || []).map((row) => ({
      device: row.dimensionValues[0].value,
      users: Number(row.metricValues[0].value),
    }));

    const sources = (sourceReport.rows || []).map((row) => ({
      source: row.dimensionValues[0].value,
      sessions: Number(row.metricValues[0].value),
    }));

    const cities = (countryReport.rows || []).map((row) => ({
      city: row.dimensionValues[0].value,
      users: Number(row.metricValues[0].value),
    }));

    res.json({ totals, devices, sources, cities, days });
  } catch (error) {
    console.error("GA4 error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAnalyticsTimeline = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 28;

    const response = await runReport({
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
      ],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    const timeline = (response.rows || []).map((row) => {
      const raw = row.dimensionValues[0].value;
      const dateStr = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
      return {
        date: dateStr,
        users: Number(row.metricValues[0].value),
        sessions: Number(row.metricValues[1].value),
      };
    });

    res.json(timeline);
  } catch (error) {
    console.error("GA4 timeline error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
