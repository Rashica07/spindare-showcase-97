import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kristian Gjergji — Full-Stack Developer & App Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #080b14 0%, #0d1220 60%, #080b14 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow top-left */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,188,255,0.12) 0%, transparent 65%)",
            top: -180,
            left: -100,
          }}
        />
        {/* Glow bottom-right */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(140,80,255,0.10) 0%, transparent 65%)",
            bottom: -140,
            right: -60,
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 80px",
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 36,
              background: "rgba(0,188,255,0.08)",
              border: "1px solid rgba(0,188,255,0.25)",
              borderRadius: 50,
              padding: "10px 22px",
              width: "fit-content",
            }}
          >
            <div
              style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }}
            />
            <span style={{ color: "#94a3b8", fontSize: 18, fontWeight: 600, letterSpacing: 0.5 }}>
              Available for work · kiqa-dev.it
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.05,
              letterSpacing: -2,
              marginBottom: 14,
            }}
          >
            Kristian Gjergji
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#00bcff",
              marginBottom: 48,
              letterSpacing: 0.3,
            }}
          >
            Full-Stack & Mobile Developer · rashica07
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { value: "40K+", label: "Lines of code" },
              { value: "300+", label: "Components" },
              { value: "2",    label: "Live products" },
              { value: "14",   label: "Years old" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "18px 28px",
                }}
              >
                <span style={{ fontSize: 34, fontWeight: 800, color: "#00bcff" }}>{value}</span>
                <span style={{ fontSize: 15, color: "#475569", marginTop: 4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-right: domain + projects */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "64px 80px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "#334155",
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Building
            </span>
            <span style={{ fontSize: 20, color: "#475569", fontWeight: 700 }}>Spindare</span>
            <span style={{ fontSize: 20, color: "#475569", fontWeight: 700 }}>TravelMe</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
