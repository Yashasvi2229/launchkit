"use client";

import React, { useEffect, useState, useRef } from "react";
import { Prerequisites } from "./sections/Prerequisites";
import { Installation } from "./sections/Installation";
import { EnvVars } from "./sections/EnvVars";
import { Architecture } from "./sections/Architecture";
import { Database } from "./sections/Database";
import { Emails } from "./sections/Emails";
import { MexScaffold } from "./sections/MexScaffold";
import { Payments } from "./sections/Payments";
import { Storage } from "./sections/Storage";
import { Authentication } from "./sections/Authentication";
import { Blog } from "./sections/Blog";
import { Testimonials } from "./sections/Testimonials";
import { StatsCharts } from "./sections/StatsCharts";
import { SettingsProfile } from "./sections/SettingsProfile";
import { SuperadminPanel } from "./sections/SuperadminPanel";
import { BillingPortal } from "./sections/BillingPortal";
import { ApiResponses } from "./sections/ApiResponses";
import { Middleware } from "./sections/Middleware";
import { RateLimiting } from "./sections/RateLimiting";
import { SeoAnalytics } from "./sections/SeoAnalytics";
import { CrispChat } from "./sections/CrispChat";
import { Modals } from "./sections/Modals";
import { StyleGuide } from "./sections/StyleGuide";
import { ThemeToggle } from "./sections/ThemeToggle";
import { ToastNotifications } from "./sections/ToastNotifications";

const SECTIONS = [
  { id: "prerequisites", component: Prerequisites },
  { id: "installation", component: Installation },
  { id: "env-vars", component: EnvVars },
  { id: "architecture", component: Architecture },
  { id: "mex-integration", component: MexScaffold },
  { id: "authentication", component: Authentication },
  { id: "superadmin-panel", component: SuperadminPanel },
  { id: "database", component: Database },
  { id: "payments", component: Payments },
  { id: "billing-portal", component: BillingPortal },
  { id: "emails", component: Emails },
  { id: "storage", component: Storage },
  { id: "crisp-chat", component: CrispChat },
  { id: "settings-profile", component: SettingsProfile },
  { id: "stats-charts", component: StatsCharts },
  { id: "blog", component: Blog },
  { id: "testimonials", component: Testimonials },
  { id: "api-responses", component: ApiResponses },
  { id: "middleware", component: Middleware },
  { id: "rate-limiting", component: RateLimiting },
  { id: "seo-analytics", component: SeoAnalytics },
  { id: "style-guide", component: StyleGuide },
  { id: "theme-toggle", component: ThemeToggle },
  { id: "modals", component: Modals },
  { id: "toast-notifications", component: ToastNotifications },
];

export function SingleDocsPage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Update URL hash without jumping
            window.history.replaceState(null, "", `#${entry.target.id}`);
            setActiveSection(entry.target.id);
            // Dispatch custom event for sidebar
            window.dispatchEvent(new CustomEvent("sectionChange", { detail: entry.target.id }));
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.current?.observe(el);
    });

    // Initial scroll to hash
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-32 pb-32">
      {SECTIONS.map((section) => (
        <section.component key={section.id} />
      ))}
    </div>
  );
}
