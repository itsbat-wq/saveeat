import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";

// ============================================================
// SaveEat - Root Layout
// ============================================================

export const metadata: Metadata = {
  title: {
    default: "SaveEat - Penyelamat Makanan, Penyelamat Dompet",
    template: "%s | SaveEat",
  },
  description:
    "Platform Mystery Bag yang menghubungkan kafe & bakery dengan mahasiswa. Hemat hingga 70%, kurangi food waste, dukung SDGs.",
  keywords: [
    "mystery bag",
    "food waste",
    "makanan murah",
    "mahasiswa",
    "kafe",
    "bakery",
    "hemat",
    "SDG",
    "zero food waste",
    "saveeat",
  ],
  authors: [{ name: "SaveEat Team" }],
  creator: "SaveEat",
  publisher: "SaveEat",
  metadataBase: new URL("https://saveeat.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://saveeat.id",
    siteName: "SaveEat",
    title: "SaveEat - Penyelamat Makanan, Penyelamat Dompet",
    description:
      "Beli Mystery Bag dari kafe terdekat dengan diskon hingga 70%. Makan enak, hemat uang kos, dan selamatkan bumi!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaveEat - Mystery Bag Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaveEat - Penyelamat Makanan, Penyelamat Dompet",
    description:
      "Beli Mystery Bag dari kafe terdekat dengan diskon hingga 70%. Makan enak, hemat uang kos, dan selamatkan bumi!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Google Fonts - Space Grotesk + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-slate-50 text-slate-900 font-body antialiased"
        suppressHydrationWarning
      >
        {/* Background ambient gradient fixed */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* Top-left green ambient */}
          <div
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
              transform: "translate(-30%, -30%)",
            }}
          />
          {/* Top-right blue ambient */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          {/* Bottom-right green ambient */}
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
              transform: "translate(20%, 20%)",
            }}
          />
        </div>

        {/* Main App with Providers */}
        <AuthProvider>
          <Navbar />
          <div className="relative z-10">{children}</div>
        </AuthProvider>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(255, 255, 255, 0.95)",
              color: "#334155",
              border: "1px solid rgba(16, 185, 129, 0.15)",
              borderRadius: "12px",
              backdropFilter: "blur(16px)",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
              padding: "12px 16px",
              fontWeight: "500"
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
              style: {
                border: "1px solid rgba(239, 68, 68, 0.2)",
              },
            },
            loading: {
              iconTheme: {
                primary: "#f97316",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
