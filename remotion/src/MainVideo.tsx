import React from "react";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { COLORS } from "./theme";
import {
  Hook,
  ProblemQ,
  TitleScene,
  QADonate,
  QATransparency,
  FeaturesScene,
  WilayasPayments,
  Dashboards,
  UXScene,
  Innovation,
  Outro,
} from "./scenes";

const SCENES: { c: React.FC; d: number }[] = [
  { c: Hook, d: 300 },
  { c: ProblemQ, d: 330 },
  { c: TitleScene, d: 300 },
  { c: QADonate, d: 360 },
  { c: QATransparency, d: 360 },
  { c: FeaturesScene, d: 420 },
  { c: WilayasPayments, d: 360 },
  { c: Dashboards, d: 420 },
  { c: UXScene, d: 330 },
  { c: Innovation, d: 300 },
  { c: Outro, d: 300 },
];

const TRANS = 15;

export const TOTAL =
  SCENES.reduce((a, s) => a + s.d, 0) - TRANS * (SCENES.length - 1);

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navyDeep }}>
      <TransitionSeries>
        {SCENES.map((s, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={s.d}>
              <s.c />
            </TransitionSeries.Sequence>
            {i < SCENES.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANS })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
