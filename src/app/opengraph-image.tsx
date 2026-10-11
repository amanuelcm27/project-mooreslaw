import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.pageTitle;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at top left, rgba(245,230,66,0.24), transparent 34%), linear-gradient(180deg, #0b0d11 0%, #08090b 100%)",
          color: "#f5f5f0",
          fontFamily: "Inter, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#f5e642",
            letterSpacing: "0.34em",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              border: "1px solid rgba(245,230,66,0.35)",
              background: "rgba(23,26,32,0.9)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "absolute", inset: 16, border: "1px solid rgba(245,230,66,0.7)", borderRadius: 12 }} />
            <div style={{ position: "absolute", left: 12, right: 12, top: "50%", height: 1, background: "rgba(245,230,66,0.7)" }} />
            <div style={{ position: "absolute", top: 12, bottom: 12, left: "50%", width: 1, background: "rgba(245,230,66,0.7)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div>{siteConfig.brandName}</div>
            <div style={{ color: "#a4a8b0", fontSize: 18, letterSpacing: "0.22em" }}>{siteConfig.brandTagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 940 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.05em" }}>GPU Compute for Ethiopia</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#a4a8b0" }}>
            Help shape a potential GPU cloud for developers, researchers, startups, and AI teams.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#a4a8b0",
            fontSize: 22,
          }}
        >
          <span>Wishlist validation experiment</span>
          <span>Join the wishlist</span>
        </div>
      </div>
    ),
    size,
  );
}