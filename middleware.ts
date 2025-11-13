import { clerkMiddleware } from "@clerk/nextjs/server";
import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

import { fallbackLng, languages } from "./i18n/settings";

acceptLanguage.languages(languages);

const cookieName = "i18next";
const allowedDomains = ["localhost:3000", "qurrent.se", "vercel.app"];
const allowedSubDomains = ["localhost:3000", "app"];
const assignedSubDomain = "installer";

export const defaultMiddleware = (req: NextRequest) => {
  const { nextUrl, cookies, headers } = req;
  const { pathname } = nextUrl;

  if (!pathname.startsWith("/api")) {
    let lng;
    const hostname = headers.get("host") ?? "";
    const isAllowedDomain = allowedDomains.some((domain) =>
      hostname.includes(domain)
    );
    const subDomain = hostname.split(".")[0];

    if (cookies.has(cookieName))
      lng = acceptLanguage.get(cookies.get(cookieName)?.value);
    if (!lng) lng = acceptLanguage.get(headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    // console.log('LNG xxx ', pathname, languages);

    // Redirect if lng in path is not supported

    if (
      !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
      !pathname.startsWith("/_next")
    ) {
      return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
    }

    if (isAllowedDomain) {
      if (subDomain === assignedSubDomain) {
        let pathName = "";
        const paths = pathname.substring(1).split("/");

        if (paths.length === 1 && paths[0] !== "installer") {
          pathName = `/${paths[0]}/installer`;
        } else if (paths.length > 1 && paths[1] !== "installer") {
          pathName = `/${[
            ...paths.slice(0, 1),
            "installer",
            ...paths.slice(1),
          ].join("/")}`;
        }

        return NextResponse.rewrite(
          new URL(`${pathName}${nextUrl.search}`, req.url)
        );
      } else if (
        subDomain !== assignedSubDomain &&
        languages.some((loc) => pathname === `/${loc}`)
      ) {
        return NextResponse.redirect(
          new URL(`${pathname}/portfolio${nextUrl.search}`, req.url)
        );
      }
    }

    if (headers.has("referer")) {
      const refererUrl = new URL(headers.get("referer") ?? "");
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }

    return NextResponse.next();
  }
};

export default clerkMiddleware(async (auth, req) => {
  defaultMiddleware(req);

  const publicRoutes = [
    "/:lng/sign-in(.*)",
    "/:lng/sign-up(.*)",
    "/:lng/forgot-password",
    "/:lng",
    "/:lng/:code((?!portfolio)\\w+)",
    "/:lng/installer(.*)",
    "/api/trpc/installerForm(.*)",
  ];

  const isPublicRoute = publicRoutes.some((path) => {
    if (path.includes("(") && path.includes(")")) {
      const regex = new RegExp(
        path.replace("(", "").replace(")", "").replace(".*", "")
      );
      return regex.test(req.nextUrl.pathname);
    }
    return req.nextUrl.pathname.startsWith(path);
  });

  const { nextUrl, headers } = req;
  const { pathname } = nextUrl;
  const referer = headers.get("referer");
  const hostname = headers.get("host") ?? "";
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname.includes(domain)
  );
  const subDomain = hostname.split(".")[0];

  if (!auth().userId && !isPublicRoute) {
    console.log("oooo 1", encodeURIComponent(nextUrl.href));
    const signInUrl = new URL("/sign-in", nextUrl.href); // Construct the sign-in URL

    // signInUrl.searchParams.set('returnBackUrl', encodeURIComponent(nextUrl.href)); // Add the returnBackUrl
    return NextResponse.redirect(signInUrl); // Redirect
  }

  if (
    !auth().orgId &&
    pathname.includes("/portfolio") &&
    (referer?.includes("/sign-in") || referer?.includes("/sign-up"))
  ) {
    console.log("oooo 2");
    return NextResponse.redirect(new URL("/market-data", nextUrl));
  }

  if (
    languages.some((loc) => pathname === `/${loc}`) &&
    isAllowedDomain &&
    allowedSubDomains.some((domain) => subDomain.includes(domain))
  ) {
    return NextResponse.redirect(
      new URL(auth().orgId ? "/portfolio" : "/market-data", nextUrl.href)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/:lng", "/(api|trpc)(.*)"],
};
