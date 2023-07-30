import { NextResponse } from 'next/server'
import { locales } from "nextra/locales"

export async function middleware(req) {
  const paths = {
    "/discord": process.env.NEXT_PUBLIC_DISCORD_URL,
    "/moddb": process.env.NEXT_PUBLIC_MODDB_URL,
    "/sources": process.env.NEXT_PUBLIC_SOURCE_CODE_URL,
    "/boosty": process.env.NEXT_PUBLIC_BOOSTY_URL,
  }

  if (req.nextUrl.pathname in paths) {
    return NextResponse.redirect(paths[req.nextUrl.pathname])
  }

  // Если нет редиректа, продолжайте с локализацией
  return locales(req)
}
