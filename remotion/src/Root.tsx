import React from "react";
import { Composition } from "remotion";
import { MainVideo, TOTAL } from "./MainVideo";
import { FPS } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
