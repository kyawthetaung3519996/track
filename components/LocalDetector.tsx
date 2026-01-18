"use client";
import { getBrowserInfo, getIPAddress, getUserDetails } from "@/lib/helper";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export type ReverseGeocodeData = {
  name: string | null | undefined;
  email: string | null | undefined;
  latitude: number | null | undefined;
  longitude: number | null | undefined;
  lookupSource: string | null | undefined;
  continent: string | null | undefined;
  continentCode: string | null | undefined;
  countryName: string | null | undefined;
  countryCode: string | null | undefined;
  principalSubdivision: string | null | undefined;
  principalSubdivisionCode: string | null | undefined;
  city: string | null | undefined;
  locality: string | null | undefined;
  postcode: string | null | undefined;
  plusCode: string | null | undefined;
  localityLanguageRequested: string | null | undefined;
  userAgent: string | null | undefined;
  browserName: string | null | undefined;
  browserVersion: string | null | undefined;
  ipAddress: string | null | undefined;
};

let hasDetected = false;

export function LocaleDetector() {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  async function saveUserDetails(details: ReverseGeocodeData) {
    startTransition(async () => {
      try {
        await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
        router.refresh();
        console.log("User details saved successfully");
      } catch (error) {
        console.error("Error saving user details:", error);
      }
    });
  }

  useEffect(() => {
    if (hasDetected) return;

    getUserDetails()
      .then((details) => {
        console.log("Getting user details", details);
        if (details) {
          saveUserDetails(details);
        }
      })
      .catch((error) => console.error("Error in locale detection:", error))
      .finally(() => (hasDetected = true));
  }, [params.lang, router]);

  return null;
}
