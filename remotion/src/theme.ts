import { loadFont } from "@remotion/google-fonts/Cairo";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["arabic", "latin"],
});

export const COLORS = {
  navy: "#0e1830",
  navyDeep: "#0a1124",
  emerald: "#1f8a63",
  emeraldGlow: "#37c08b",
  gold: "#e0b450",
  goldSoft: "#f0d28a",
  cream: "#f6f8f4",
  muted: "#9fb0c9",
  white: "#ffffff",
};

export const FPS = 30;
