"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListTree, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const CATEGORIES = [
  {
    "title": "1. Start Here",
    "items": [
      {
        "id": "prerequisites",
        "label": "Prerequisites"
      },
      {
        "id": "installation",
        "label": "Local Setup"
      },
      {
        "id": "env-vars",
        "label": "Environment Variables"
      },
      {
        "id": "architecture",
        "label": "Project Architecture"
      }
    ]
  },
  {
    "title": "2. AI Workflow & Context",
    "items": [
      {
        "id": "mex-integration",
        "label": "AI Context Scaffold (Mex)"
      }
    ]
  },
  {
    "title": "3. Access & Identity",
    "items": [
      {
        "id": "authentication",
        "label": "Authentication & Access Control"
      },
      {
        "id": "superadmin-panel",
        "label": "Superadmin"
      }
    ]
  },
  {
    "title": "4. Data & Billing",
    "items": [
      {
        "id": "database",
        "label": "Database & RLS"
      },
      {
        "id": "payments",
        "label": "Payments & Webhooks"
      },
      {
        "id": "billing-portal",
        "label": "Billing & Subscriptions"
      }
    ]
  },
  {
    "title": "5. Communication & Storage",
    "items": [
      {
        "id": "emails",
        "label": "Email Delivery"
      },
      {
        "id": "storage",
        "label": "Storage Layer"
      },
      {
        "id": "crisp-chat",
        "label": "Crisp Chat Widget"
      }
    ]
  },
  {
    "title": "6. Product Features",
    "items": [
      {
        "id": "settings-profile",
        "label": "Settings & Profiles"
      },
      {
        "id": "stats-charts",
        "label": "Metrics Dashboard"
      },
      {
        "id": "blog",
        "label": "Blog System"
      },
      {
        "id": "testimonials",
        "label": "Testimonials"
      }
    ]
  },
  {
    "title": "7. Platform Operations & Frontend UX",
    "items": [
      {
        "id": "api-responses",
        "label": "API Response Standard"
      },
      {
        "id": "middleware",
        "label": "Edge Middleware & Proxy"
      },
      {
        "id": "rate-limiting",
        "label": "Rate Limiting"
      },
      {
        "id": "seo-analytics",
        "label": "SEO & Analytics"
      },
      {
        "id": "style-guide",
        "label": "Component Style Guide"
      },
      {
        "id": "theme-toggle",
        "label": "Theme System"
      },
      {
        "id": "modals",
        "label": "Modals & Dialogs"
      },
      {
        "id": "toast-notifications",
        "label": "Toast Notifications"
      }
    ]
  }
];


export function DocsSidebar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Initial section from hash
    if (window.location.hash) {
      setActiveSection(window.location.hash.substring(1));
    }

    const handleSectionChange = (e: any) => {
      setActiveSection(e.detail);
    };

    window.addEventListener("sectionChange", handleSectionChange);
    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
      setIsMobileOpen(false);
    }
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn("w-full", isMobile ? "h-full px-6 pt-6 pb-12" : "pt-8 pr-6 pb-20") }>
      {isMobile && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <h3 className="text-[16px] font-semibold text-white tracking-wide">Documentation</h3>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="text-zinc-400 hover:text-white transition-colors p-2 bg-zinc-900 rounded-full"
            aria-label="Close documentation sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="space-y-8">
        {CATEGORIES.map((category) => (
          <div key={category.title}>
            <div className="text-[13px] font-semibold tracking-wide text-zinc-100 mb-2 uppercase">
              {category.title}
            </div>
            <div className="flex flex-col border-l border-white/[0.08] ml-2">
              {category.items.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`text-[14px] px-4 py-1.5 transition-all duration-200 ${
                      isActive
                        ? "text-emerald-400 font-medium bg-emerald-500/[0.04] border-l border-emerald-500 -ml-[1px]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <aside className="w-64 flex-shrink-0 border-r border-white/10 hidden lg:block select-none overflow-y-auto h-[calc(100vh-4rem)] no-scrollbar sticky top-16">
        <SidebarContent />
      </aside>

      <button
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/25 flex items-center justify-center border border-blue-400/70"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open documentation sidebar"
      >
        <ListTree className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 w-[85vw] sm:w-[350px] bg-[#050505] border-l border-zinc-800 shadow-2xl z-[120] overflow-y-auto"
            >
              <SidebarContent isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
