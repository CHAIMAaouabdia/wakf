import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, fontFamily } from "./theme";

/* ---------- Background ---------- */
export const Bg: React.FC<{
  variant?: "pattern" | "mosque" | "glow" | "plain";
  zoom?: boolean;
}> = ({ variant = "plain", zoom = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = zoom
    ? interpolate(frame, [0, durationInFrames], [1.08, 1.18])
    : 1.1;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navyDeep }}>
      {variant !== "plain" && (
        <AbsoluteFill style={{ transform: `scale(${scale})` }}>
          <Img
            src={staticFile(`images/${variant}.jpg`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: variant === "pattern" ? 0.32 : variant === "mosque" ? 0.5 : 0.55,
            }}
          />
        </AbsoluteFill>
      )}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 50% 18%, rgba(31,138,99,0.22), transparent 55%), linear-gradient(180deg, rgba(10,17,36,0.55), rgba(10,17,36,0.92))",
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- Reveal wrapper ---------- */
export const Reveal: React.FC<{
  delay?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 40, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
  });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [y, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ---------- Scene shell with fade in/out ---------- */
export const Scene: React.FC<{
  children: React.ReactNode;
  pad?: number;
}> = ({ children, pad = 120 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 16, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill
      style={{
        opacity: op,
        fontFamily,
        direction: "rtl",
        padding: pad,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: COLORS.cream,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ---------- Chip / Question bubble ---------- */
export const Chip: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color = COLORS.gold }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 30px",
      borderRadius: 999,
      border: `1.5px solid ${color}55`,
      background: `${color}18`,
      color,
      fontSize: 34,
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);

export const GoldRule: React.FC<{ delay?: number; w?: number }> = ({
  delay = 0,
  w = 220,
}) => {
  const frame = useCurrentFrame();
  const width = interpolate(frame - delay, [0, 24], [0, w], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width,
        height: 4,
        margin: "0 auto",
        borderRadius: 4,
        background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
      }}
    />
  );
};
