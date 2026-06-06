import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { COLORS } from "./theme";
import { Bg, Reveal, Scene, Chip, GoldRule } from "./components";

const big = (s: number): React.CSSProperties => ({
  fontSize: s,
  fontWeight: 900,
  lineHeight: 1.15,
});

/* 1. HOOK */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Bg variant="mosque" />
      <Scene>
        <Reveal delay={4}>
          <Chip color={COLORS.gold}>وقفٌ يحيا من جديد</Chip>
        </Reveal>
        <Reveal delay={16} style={{ marginTop: 40 }}>
          <div style={{ ...big(96), color: COLORS.white }}>
            تبرّعاتٌ كثيرة..
          </div>
        </Reveal>
        <Reveal delay={34} style={{ marginTop: 10 }}>
          <div style={{ ...big(96), color: COLORS.goldSoft, opacity: glow }}>
            وأثرٌ لا يُرى؟
          </div>
        </Reveal>
        <Reveal delay={54} style={{ marginTop: 38 }}>
          <div style={{ fontSize: 38, color: COLORS.muted, maxWidth: 1100 }}>
            في زمنٍ رقمي، يستحقّ العطاء شفافيةً كاملة وأثرًا واضحًا.
          </div>
        </Reveal>
      </Scene>
    </AbsoluteFill>
  );
};

/* 2. PROBLEM QUESTION */
export const ProblemQ: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="glow" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.emeraldGlow}>؟ السؤال</Chip>
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 44 }}>
        <div style={{ ...big(78), color: COLORS.white, maxWidth: 1300 }}>
          كيف نُعيد إحياء سُنّة الوقف
        </div>
      </Reveal>
      <Reveal delay={32}>
        <div style={{ ...big(78), color: COLORS.goldSoft }}>في زمنٍ رقمي؟</div>
      </Reveal>
      <Reveal delay={50} style={{ marginTop: 44 }}>
        <GoldRule delay={56} />
      </Reveal>
      <Reveal delay={64} style={{ marginTop: 34 }}>
        <div style={{ fontSize: 36, color: COLORS.muted, maxWidth: 1150 }}>
          الجواب: منصّةٌ تجمع بين نُبل العطاء ودقّة الإدارة الرقمية.
        </div>
      </Reveal>
    </Scene>
  </AbsoluteFill>
);

/* 3. TITLE */
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 90 } });
  return (
    <AbsoluteFill>
      <Bg variant="pattern" />
      <Scene>
        <div
          style={{
            transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`,
            opacity: s,
            width: 180,
            height: 180,
            borderRadius: 40,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            border: `2px solid ${COLORS.gold}55`,
          }}
        >
          <Img src={staticFile("images/logo.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Reveal delay={22} style={{ marginTop: 36 }}>
          <div style={{ ...big(92), color: COLORS.white }}>منصّة الوقف الرقمي</div>
        </Reveal>
        <Reveal delay={36} style={{ marginTop: 8 }}>
          <div style={{ fontSize: 30, color: COLORS.muted, letterSpacing: 2 }}>
            DIGITAL WAQF PLATFORM
          </div>
        </Reveal>
        <Reveal delay={50} style={{ marginTop: 40 }}>
          <GoldRule delay={56} />
        </Reveal>
        <Reveal delay={64} style={{ marginTop: 30 }}>
          <div style={{ fontSize: 40, color: COLORS.goldSoft, fontWeight: 700 }}>
            حيث يلتقي طموح الإدارة بنُبل العطاء
          </div>
        </Reveal>
      </Scene>
    </AbsoluteFill>
  );
};

/* generic step / card grids */
const StepCard: React.FC<{
  n: string;
  title: string;
  desc: string;
  delay: number;
}> = ({ n, title, desc, delay }) => (
  <Reveal delay={delay} y={50}>
    <div
      style={{
        width: 300,
        padding: "34px 26px",
        borderRadius: 26,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "none",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 900,
          color: COLORS.navyDeep,
          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldSoft})`,
        }}
      >
        {n}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ fontSize: 24, color: COLORS.muted, lineHeight: 1.5 }}>{desc}</div>
    </div>
  </Reveal>
);

/* 4. QA — DONATE */
export const QADonate: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="glow" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.emeraldGlow}>كيف أتبرّع؟</Chip>
      </Reveal>
      <Reveal delay={14} style={{ marginTop: 24 }}>
        <div style={{ ...big(60), color: COLORS.white }}>أربع خطوات.. وينتهي عطاؤك</div>
      </Reveal>
      <div style={{ display: "flex", gap: 26, marginTop: 50, direction: "rtl" }}>
        <StepCard n="١" title="المبلغ" desc="اختر مشروعك وحدّد قيمة التبرّع" delay={30} />
        <StepCard n="٢" title="الدفع" desc="CIB · الذهبية · بريدي موب" delay={42} />
        <StepCard n="٣" title="التأكيد" desc="مراجعة آمنة وتأكيد فوري" delay={54} />
        <StepCard n="٤" title="الإيصال" desc="إيصال رقمي يصلك مباشرة" delay={66} />
      </div>
    </Scene>
  </AbsoluteFill>
);

/* 5. QA — TRANSPARENCY */
export const QATransparency: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="pattern" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.emeraldGlow}>هل أثق بوجهة أموالي؟</Chip>
      </Reveal>
      <Reveal delay={16} style={{ marginTop: 30 }}>
        <div style={{ ...big(66), color: COLORS.white, maxWidth: 1250 }}>
          نعم.. كلّ دينار له مسارٌ واضح
        </div>
      </Reveal>
      <Reveal delay={32} style={{ marginTop: 26 }}>
        <div style={{ fontSize: 36, color: COLORS.muted, maxWidth: 1150 }}>
          لوحات تحكّم حيّة تعرض نسبة الإنجاز، المبالغ المُحصّلة، وحالة كل مشروع لحظةً بلحظة.
        </div>
      </Reveal>
      <div style={{ display: "flex", gap: 40, marginTop: 50 }}>
        {[
          { k: "١٠٠٪", v: "شفافية" },
          { k: "آني", v: "تتبّع مباشر" },
          { k: "شرعي", v: "امتثال كامل" },
        ].map((it, i) => (
          <Reveal key={it.v} delay={46 + i * 10}>
            <div style={{ textAlign: "center" }}>
              <div style={{ ...big(58), color: COLORS.goldSoft }}>{it.k}</div>
              <div style={{ fontSize: 28, color: COLORS.muted }}>{it.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Scene>
  </AbsoluteFill>
);

/* 6. FEATURES */
const Badge: React.FC<{ glyph: string; size?: number }> = ({ glyph, size = 64 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.5,
      fontWeight: 900,
      color: COLORS.navyDeep,
      background: `linear-gradient(135deg, ${COLORS.emeraldGlow}, ${COLORS.gold})`,
    }}
  >
    {glyph}
  </div>
);

const FeatCard: React.FC<{ glyph: string; title: string; desc: string; delay: number }> = ({
  glyph,
  title,
  desc,
  delay,
}) => (
  <Reveal delay={delay} y={50}>
    <div
      style={{
        width: 360,
        padding: "32px 28px",
        borderRadius: 26,
        textAlign: "right",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Badge glyph={glyph} />
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.white, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 24, color: COLORS.muted, lineHeight: 1.5 }}>{desc}</div>
    </div>
  </Reveal>
);

export const FeaturesScene: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="glow" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.gold}>منظومة متكاملة</Chip>
      </Reveal>
      <Reveal delay={14} style={{ marginTop: 22 }}>
        <div style={{ ...big(60), color: COLORS.white }}>كل ما تحتاجه للعطاء.. في مكان واحد</div>
      </Reveal>
      <div style={{ display: "flex", gap: 26, marginTop: 46 }}>
        <FeatCard glyph="◆" title="مشاريع وقفية" desc="استكشف وادعم مشاريع خيرية موثّقة" delay={30} />
        <FeatCard glyph="✦" title="تمويل جماعي" desc="تكاتفٌ جماعي لتحقيق الأثر الأكبر" delay={42} />
        <FeatCard glyph="●" title="امتثال شرعي" desc="ضوابط شرعية في كل مرحلة" delay={54} />
      </div>
      <div style={{ display: "flex", gap: 26, marginTop: 26 }}>
        <FeatCard glyph="◈" title="تقارير حيّة" desc="متابعة دقيقة لكل تبرّع ومشروع" delay={62} />
        <FeatCard glyph="▲" title="إشعارات فورية" desc="تنبيهات لكل تحديث في رحلتك" delay={72} />
      </div>
    </Scene>
  </AbsoluteFill>
);

/* 7. WILAYAS & PAYMENTS */
export const WilayasPayments: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.round(interpolate(frame, [20, 70], [0, 48], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <AbsoluteFill>
      <Bg variant="pattern" />
      <Scene>
        <Reveal delay={2}>
          <Chip color={COLORS.gold}>صُنع في الجزائر 🇩🇿</Chip>
        </Reveal>
        <Reveal delay={14} style={{ marginTop: 30 }}>
          <div style={{ ...big(150), color: COLORS.goldSoft }}>{count}</div>
        </Reveal>
        <Reveal delay={20}>
          <div style={{ fontSize: 40, color: COLORS.white, fontWeight: 700 }}>
            ولاية مغطّاة عبر الوطن
          </div>
        </Reveal>
        <Reveal delay={48} style={{ marginTop: 44 }}>
          <div style={{ fontSize: 32, color: COLORS.muted, marginBottom: 22 }}>
            طرق دفع جزائرية موثوقة
          </div>
        </Reveal>
        <div style={{ display: "flex", gap: 24 }}>
          {["CIB", "بطاقة الذهبية", "بريدي موب"].map((p, i) => (
            <Reveal key={p} delay={56 + i * 10}>
              <div
                style={{
                  padding: "20px 44px",
                  borderRadius: 18,
                  fontSize: 34,
                  fontWeight: 700,
                  color: COLORS.navyDeep,
                  background: `linear-gradient(135deg, ${COLORS.emeraldGlow}, ${COLORS.gold})`,
                }}
              >
                {p}
              </div>
            </Reveal>
          ))}
        </div>
      </Scene>
    </AbsoluteFill>
  );
};

/* 8. DASHBOARDS */
const DashCard: React.FC<{ role: string; title: string; points: string[]; delay: number; color: string }> = ({
  role,
  title,
  points,
  delay,
  color,
}) => (
  <Reveal delay={delay} y={60}>
    <div
      style={{
        width: 380,
        padding: 34,
        borderRadius: 28,
        textAlign: "right",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${color}55`,
      }}
    >
      <div style={{ fontSize: 24, color, fontWeight: 700, marginBottom: 6 }}>{role}</div>
      <div style={{ fontSize: 34, fontWeight: 900, color: COLORS.white, marginBottom: 18 }}>
        {title}
      </div>
      {points.map((p) => (
        <div key={p} style={{ fontSize: 25, color: COLORS.muted, marginBottom: 10 }}>
          ◆ {p}
        </div>
      ))}
    </div>
  </Reveal>
);

export const Dashboards: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="glow" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.emeraldGlow}>لوحات التحكّم</Chip>
      </Reveal>
      <Reveal delay={14} style={{ marginTop: 20 }}>
        <div style={{ ...big(58), color: COLORS.white }}>ثلاث لوحات.. شفافيةٌ كاملة</div>
      </Reveal>
      <div style={{ display: "flex", gap: 28, marginTop: 48 }}>
        <DashCard
          role="الإدارة"
          title="لوحة الإشراف"
          points={["اعتماد المشاريع", "مراقبة التبرّعات", "إدارة الحسابات"]}
          delay={30}
          color={COLORS.gold}
        />
        <DashCard
          role="الجمعيات"
          title="لوحة المنظّمات"
          points={["نشر المشاريع", "متابعة التحصيل", "تقارير الأثر"]}
          delay={44}
          color={COLORS.emeraldGlow}
        />
        <DashCard
          role="المتبرّع"
          title="لوحة العطاء"
          points={["سجلّ التبرّعات", "تتبّع الأثر", "إيصالات رقمية"]}
          delay={58}
          color={COLORS.goldSoft}
        />
      </div>
    </Scene>
  </AbsoluteFill>
);

/* 9. UX */
export const UXScene: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="mosque" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.gold}>تجربة استخدام</Chip>
      </Reveal>
      <Reveal delay={16} style={{ marginTop: 30 }}>
        <div style={{ ...big(72), color: COLORS.white, maxWidth: 1250 }}>
          واجهةٌ عربية أنيقة.. وسلاسةٌ في كل خطوة
        </div>
      </Reveal>
      <div style={{ display: "flex", gap: 56, marginTop: 56 }}>
        {[
          { k: "📱", v: "متجاوب كليًّا" },
          { k: "✨", v: "تصميم عصري" },
          { k: "⚡", v: "سرعة وأمان" },
          { k: "🌙", v: "وضع ليلي" },
        ].map((it, i) => (
          <Reveal key={it.v} delay={34 + i * 10}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>{it.k}</div>
              <div style={{ fontSize: 30, color: COLORS.goldSoft, fontWeight: 700 }}>{it.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Scene>
  </AbsoluteFill>
);

/* 10. INNOVATION */
export const Innovation: React.FC = () => (
  <AbsoluteFill>
    <Bg variant="pattern" />
    <Scene>
      <Reveal delay={2}>
        <Chip color={COLORS.emeraldGlow}>مشروع مبتكر</Chip>
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 36 }}>
        <div style={{ ...big(80), color: COLORS.white, maxWidth: 1300 }}>
          الوقف.. بروحٍ رقمية جديدة
        </div>
      </Reveal>
      <Reveal delay={36} style={{ marginTop: 30 }}>
        <div style={{ fontSize: 36, color: COLORS.muted, maxWidth: 1150 }}>
          نُحوّل سُنّةً عظيمة إلى تجربةٍ رقمية شفّافة، تجمع المتبرّع والجمعية والإدارة في منظومة واحدة.
        </div>
      </Reveal>
    </Scene>
  </AbsoluteFill>
);

/* 11. OUTRO */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill>
      <Bg variant="mosque" />
      <Scene>
        <div
          style={{
            transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
            opacity: s,
            width: 150,
            height: 150,
            borderRadius: 36,
            overflow: "hidden",
            border: `2px solid ${COLORS.gold}66`,
          }}
        >
          <Img src={staticFile("images/logo.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Reveal delay={22} style={{ marginTop: 30 }}>
          <div style={{ ...big(86), color: COLORS.white }}>منصّة الوقف الرقمي</div>
        </Reveal>
        <Reveal delay={36} style={{ marginTop: 16 }}>
          <div style={{ fontSize: 42, color: COLORS.goldSoft, fontWeight: 700 }}>
            أحْيِ سُنّة الوقف في زمنٍ رقمي
          </div>
        </Reveal>
        <Reveal delay={52} style={{ marginTop: 40 }}>
          <div
            style={{
              padding: "18px 50px",
              borderRadius: 999,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.navyDeep,
              background: `linear-gradient(135deg, ${COLORS.emeraldGlow}, ${COLORS.gold})`,
            }}
          >
            wakf.lovable.app
          </div>
        </Reveal>
      </Scene>
    </AbsoluteFill>
  );
};
