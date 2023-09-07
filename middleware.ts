import { NextRequest, NextResponse } from "next/server";
import { locales } from "nextra/locales";

// Type for paths
type Paths = {
  [key: string]: string | undefined;
};

export async function middleware(req: NextRequest) {
  const paths: Paths = {
    "/discord": process.env.NEXT_PUBLIC_DISCORD_URL,
    "/moddb": process.env.NEXT_PUBLIC_MODDB_URL,
    "/sources": process.env.NEXT_PUBLIC_SOURCE_CODE_URL,
    "/boosty": process.env.NEXT_PUBLIC_BOOSTY_URL,
  };

  const { pathname } = req.nextUrl;

  // Check if the path exists in the paths object and it's not undefined
  if (pathname in paths && paths[pathname]) {
    // If it does, redirect to the corresponding URL
    return NextResponse.redirect(paths[pathname]!);
  }

  // If no redirect, proceed with localization
  return locales(req);
}
