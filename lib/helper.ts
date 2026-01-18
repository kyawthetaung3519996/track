import { ReverseGeocodeData } from "@/components/LocalDetector";

export async function getUserDetails(): Promise<ReverseGeocodeData> {
  const ipAddress = await getIPAddress();
  const userAgent = navigator.userAgent;
  const browserInfo = getBrowserInfo();

  let locationData: ReverseGeocodeData = {
    name: null,
    email: null,
    latitude: null,
    longitude: null,
    lookupSource: null,
    continent: null,
    continentCode: null,
    countryName: null,
    countryCode: null,
    principalSubdivision: null,
    principalSubdivisionCode: null,
    city: null,
    locality: null,
    postcode: null,
    plusCode: null,
    localityLanguageRequested: null,
    userAgent: null,
    browserName: null,
    browserVersion: null,
    ipAddress: null,
  };

  if ("geolocation" in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      const data = await response.json();

      locationData = {
        ...locationData, // keep defaults
        ...data, // API fields
        latitude,
        longitude,
      };
    } catch {
      console.warn("Geolocation denied or failed, using null location.");
    }
  }

  return {
    ...locationData,
    name: "user" + Date.now(),
    email: "user" + Date.now() + "@example.com",
    userAgent,
    browserName: browserInfo.name,
    browserVersion: browserInfo.version,
    ipAddress,
  };
}

export async function getIPAddress(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error getting IP address:", error);
    return "unknown";
  }
}

export function getBrowserInfo(): { name: string; version: string } {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  // Detect browser name and version
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Edg") > -1) {
    browserName = "Edge";
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
    const match = userAgent.match(/(?:Opera|OPR)\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
    const match = userAgent.match(/rv:(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  }

  return { name: browserName, version: browserVersion };
}
