import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // add this all field to the request body
    const {
      latitude,
      longitude,
      name,
      email,
      lookupSource,
      continent,
      continentCode,
      countryName,
      countryCode,
      principalSubdivision,
      principalSubdivisionCode,
      city,
      locality,
      postcode,
      plusCode,
      localityLanguageRequested,
      browserName,
      browserVersion,
      ipAddress,
      userAgent,
    } = await request.json();

    // if (!latitude || !longitude) {
    //   return NextResponse.json(
    //     { error: "Latitude and longitude are required" },
    //     { status: 400 },
    //   );
    // }
    // Create a new user record in the database
    const user = await prisma.user.create({
      data: {
        latitude,
        longitude,
        name,
        email,
        lookupSource,
        continent,
        continentCode,
        countryName,
        countryCode,
        principalSubdivision,
        principalSubdivisionCode,
        city,
        locality,
        postcode,
        plusCode,
        localityLanguageRequested,
        browserName,
        browserVersion,
        ipAddress,
        userAgent,
      },
    });

    // Revalidate the home page
    revalidatePath("/");
    revalidatePath("/users");

    // Return the new user record
    return NextResponse.json({
      createdAt: user.createdAt,
      latitude: user.latitude,
      longitude: user.longitude,
      name: user.name,
      email: user.email,
      lookupSource: user.lookupSource,
      continent: user.continent,
      continentCode: user.continentCode,
      countryName: user.countryName,
      countryCode: user.countryCode,
      principalSubdivision: user.principalSubdivision,
      principalSubdivisionCode: user.principalSubdivisionCode,
      city: user.city,
      locality: user.locality,
      postcode: user.postcode,
      plusCode: user.plusCode,
      localityLanguageRequested: user.localityLanguageRequested,
      browserName: user.browserName,
      browserVersion: user.browserVersion,
      ipAddress: user.ipAddress,
      userAgent: user.userAgent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
