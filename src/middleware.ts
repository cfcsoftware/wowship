// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // --- Auth Token Check ---
  const authToken = req.cookies.get("authToken")?.value;

  // --- SaaS Token ---
  const saasAuthToken = req.cookies.get("saasAuthToken")?.value;

  // =========================
  // 🌐 PUBLIC ROUTES
  // =========================
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/landing",
    "/contact",
    "/public",
    "/terms-and-conditions",
    "/cancel-refund",
    "/eula-agreement",
    "/privacy-policy",
    "/disclaimer",
    "/terms-of-service",
    "/cookie-policy",
    "/pricing",
    "/sitemap",
    "/data_privacy",
    "/careers",
    "/faqs",
    "/data-privacy",
    "/about-us/mission",
    "/about-us/tour",
    "/features",
    "/contactus",

    // ================= DASHBOARD =================
    "/dashboard",

    // ================= ORGANIZATION =================
    "/org/companies",
    "/org/branches",
    "/org/departments",
    "/org/users",
    "/org/roles",

    // ================= SHIPMENTS =================
    "/shipments/all",
    "/shipments/create",
    "/shipments/drafts",
    "/shipments/bulk",
    "/shipments/templates",

    // ================= AIR =================
    "/air/awb",
    "/air/airlines",
    "/air/schedules",
    "/air/rates",

    // ================= SEA =================
    "/sea/bl",
    "/sea/vessels",
    "/sea/containers",
    "/sea/ports",
    "/sea/rates",

    // ================= ROAD =================
    "/road/consignment",
    "/road/fleet",
    "/road/drivers",
    "/road/routes",
    "/road/fuel",

    // ================= ORDERS =================
    "/orders/sales",
    "/orders/purchase",
    "/orders/contracts",
    "/orders/edi",

    // ================= TRACKING =================
    "/tracking/live",
    "/tracking/gps",
    "/tracking/milestones",
    "/tracking/exceptions",
    "/tracking/eta",

    // ================= WMS =================
    "/wms/warehouses",
    "/wms/inventory",
    "/wms/movements",
    "/wms/bin",
    "/wms/picking",

    // ================= DOCUMENTS =================
    "/docs/generator",
    "/docs/invoices",
    "/docs/awb-bl",
    "/docs/customs",
    "/docs/files",

    // ================= FINANCE =================
    "/finance/ar",
    "/finance/ap",
    "/finance/billing",
    "/finance/expenses",
    "/finance/pl",
    "/finance/tax",

    // ================= CRM =================
    "/crm/customers",
    "/crm/shippers",
    "/crm/consignees",
    "/crm/agents",
    "/crm/contracts",
    "/crm/quotes",

    // ================= REPORTS =================
    "/reports/shipments",
    "/reports/finance",
    "/reports/customers",
    "/reports/custom",

    // ================= AI =================
    "/ai/dashboard",
    "/ai/routing",
    "/ai/predictions",
    "/ai/pricing",
    "/ai/workflows",

    // ================= INTEGRATIONS =================
    "/integrations/api",
    "/integrations/webhooks",
    "/integrations/edi",
    "/integrations/carriers",

    // ================= HR =================
    "/hr/employees",
    "/hr/attendance",
    "/hr/shifts",
    "/hr/performance",

    // ================= SECURITY =================
    "/security/permissions",
    "/security/audit",
    "/security/login",

    // ================= SETTINGS =================
    "/settings/master",
    "/settings/workflows",
    "/settings/branding",
    "/settings/system",
  ];

  const isPublicPath = publicPaths.some((path) =>
    pathname === path || pathname.startsWith(path + "/")
  );

  // =========================
  // 🧩 SAAS ROUTES
  // =========================
  const saasPublicPaths = [
    "/saas/auth/login",
    "/saas/auth/register",
  ];

  const isSaasPath = pathname.startsWith("/saas");

  const isSaasPublicPath = saasPublicPaths.some((path) =>
    pathname === path || pathname.startsWith(path + "/")
  );

  // --- SaaS Logic ---
  if (isSaasPath) {
    if (!saasAuthToken && !isSaasPublicPath) {
      url.pathname = "/saas/auth/login";
      return NextResponse.redirect(url);
    }

    if (saasAuthToken && pathname.startsWith("/saas/auth/login")) {
      url.pathname = "/saas/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // =========================
  // 🔐 NORMAL AUTH LOGIC
  // =========================
  if (!authToken && !isPublicPath) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    authToken &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// =========================
// ⚙️ CONFIG
// =========================
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};