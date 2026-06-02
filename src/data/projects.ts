export type Category =
  | "education"
  | "health"
  | "medical"
  | "mosques"
  | "water"
  | "orphans"
  | "environment"
  | "solar";

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "education", label: "التعليم", icon: "📚" },
  { id: "health", label: "الصحة", icon: "🏥" },
  { id: "medical", label: "عمليات جراحية", icon: "🩺" },
  { id: "mosques", label: "المساجد", icon: "🕌" },
  { id: "water", label: "حفر الآبار", icon: "💧" },
  { id: "orphans", label: "الأيتام", icon: "🤲" },
  { id: "environment", label: "البيئة", icon: "🌱" },
  { id: "solar", label: "الطاقة الشمسية", icon: "☀️" },
];

// المنصة تغطي الجزائر وولاياتها فقط
export const WILAYAS: string[] = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار",
  "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو",
  "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة",
  "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران",
  "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت",
  "الوادي", "خنشلة", "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة",
  "عين تموشنت", "غرداية", "غليزان",
];

export interface Project {
  id: string;
  title: string;
  category: Category;
  /** اسم الجمعية التي نشرت المشروع */
  organization: string;
  shortDescription: string;
  story: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  location: string;
  verified: boolean;
  shariaCompliant: boolean;
  transparencyScore: number;
  gallery: string[];
  timeline: { date: string; title: string; description: string; done: boolean }[];
  updates: { date: string; title: string; content: string }[];
  impact: { label: string; value: string }[];
}

const img = (id: number, q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1600&q=80`;

export const projects: Project[] = [
  {
    id: "wells-ghardaia",
    organization: "جمعية البر الخيرية",
    title: "حفر 30 بئراً في غرداية",
    category: "water",
    shortDescription: "توفير مياه نظيفة لأكثر من 15,000 نسمة في القرى النائية بولاية غرداية.",
    story:
      "تعاني قرى واسعة بولاية غرداية من شح المياه النظيفة. يهدف المشروع إلى حفر 30 بئراً جوفياً مجهزاً بمضخات شمسية ونظام تنقية، يخدم أكثر من 15,000 شخص ويصبح وقفاً مستداماً تتولى صيانته الجمعيات المحلية.",
    image: img(1, "photo-1538300342682-cf57afb97285"),
    raised: 842300,
    goal: 1200000,
    donors: 3421,
    daysLeft: 21,
    location: "غرداية - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 96,
    gallery: [
      img(11, "photo-1538300342682-cf57afb97285"),
      img(12, "photo-1469571486292-0ba58a3f068b"),
      img(13, "photo-1500382017468-9049fed747ef"),
      img(14, "photo-1488521787991-ed7bbaae773c"),
    ],
    timeline: [
      { date: "يناير 2026", title: "المسح الميداني", description: "تحديد مواقع الحفر بدقة", done: true },
      { date: "مارس 2026", title: "بدء الحفر", description: "الدفعة الأولى - 15 بئراً", done: true },
      { date: "يونيو 2026", title: "تركيب الأنظمة الشمسية", description: "مضخات وتنقية مستدامة", done: false },
      { date: "سبتمبر 2026", title: "الافتتاح والتسليم", description: "تشغيل وقفي كامل", done: false },
    ],
    updates: [
      { date: "منذ يومين", title: "اكتمال البئر رقم 14", content: "بدأ ضخ المياه في قرية جديدة تخدم 400 عائلة." },
      { date: "منذ أسبوع", title: "وصول المعدات", content: "تم استلام 10 مضخة شمسية جديدة من المورد المعتمد." },
    ],
    impact: [
      { label: "مستفيد مباشر", value: "15,000+" },
      { label: "بئر مكتمل", value: "14 / 30" },
      { label: "قرى مخدومة", value: "18" },
    ],
  },
  {
    id: "school-biskra",
    organization: "مؤسسة نماء للتنمية",
    title: "مدرسة وقفية في بسكرة",
    category: "education",
    shortDescription: "بناء وتشغيل مدرسة متكاملة لـ 600 طالب وطالبة من الأيتام والمحتاجين.",
    story:
      "مدرسة نموذجية وقفية تضم 18 فصلاً ومختبرات ومكتبة، تخدم 600 طالب من الأيتام والأسر المتعففة بولاية بسكرة. ريع الوقف المرافق يضمن استمرارية التشغيل لعقود.",
    image: img(2, "photo-1497486751825-1233686d5d80"),
    raised: 1567000,
    goal: 2000000,
    donors: 5840,
    daysLeft: 45,
    location: "بسكرة - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 92,
    gallery: [
      img(21, "photo-1497486751825-1233686d5d80"),
      img(22, "photo-1503676260728-1c00da094a0b"),
      img(23, "photo-1580582932707-520aed937b7b"),
      img(24, "photo-1509062522246-3755977927d7"),
    ],
    timeline: [
      { date: "أكتوبر 2025", title: "شراء الأرض", description: "تم تسجيلها كوقف", done: true },
      { date: "فبراير 2026", title: "بدء البناء", description: "الهيكل والأساسات", done: true },
      { date: "أغسطس 2026", title: "التجهيز", description: "أثاث ومختبرات", done: false },
      { date: "سبتمبر 2026", title: "افتتاح العام الدراسي", description: "استقبال أول دفعة", done: false },
    ],
    updates: [
      { date: "منذ 3 أيام", title: "اكتمال الطابق الثاني", content: "بدأ العمل في الطوابق العليا." },
    ],
    impact: [
      { label: "طالب مستفيد", value: "600" },
      { label: "فصول دراسية", value: "18" },
      { label: "سنوات وقف", value: "دائم" },
    ],
  },
  {
    id: "mosque-constantine",
    organization: "جمعية إحياء التراث",
    title: "إعمار مسجد تاريخي في قسنطينة",
    category: "mosques",
    shortDescription: "ترميم وإعمار مسجد تاريخي يخدم 1,200 مصلٍّ مع مكتبة قرآنية.",
    story:
      "ترميم مسجد تاريخي بمدينة قسنطينة يعود للقرن السابع عشر، مع إضافة مرافق تعليمية ومكتبة قرآنية، ليكون منارة دائمة للعلم والعبادة.",
    image: img(3, "photo-1542816417-0983c9c9ad53"),
    raised: 312000,
    goal: 500000,
    donors: 1820,
    daysLeft: 60,
    location: "قسنطينة - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 90,
    gallery: [
      img(31, "photo-1542816417-0983c9c9ad53"),
      img(32, "photo-1564769625392-651b2c1a9ce9"),
      img(33, "photo-1591604129939-f1efa4d9f7fa"),
    ],
    timeline: [
      { date: "ديسمبر 2025", title: "الدراسة الأثرية", description: "مع وزارة الثقافة الجزائرية", done: true },
      { date: "أبريل 2026", title: "بدء الترميم", description: "القبة والمآذن", done: false },
    ],
    updates: [],
    impact: [
      { label: "مصلٍّ يومياً", value: "1,200" },
      { label: "طلاب التحفيظ", value: "150" },
      { label: "قيمة تراثية", value: "400+ سنة" },
    ],
  },
  {
    id: "solar-oran",
    organization: "جمعية الإغاثة الطبية",
    title: "محطة طاقة شمسية لمستشفى وهران",
    category: "solar",
    shortDescription: "تزويد مستشفى وهران الجامعي بالطاقة المتجددة لضمان استمرار الخدمات.",
    story:
      "تركيب نظام طاقة شمسية بقدرة 350 كيلوواط لمستشفى وهران الجامعي، يضمن استمرار العمليات الجراحية والحضانات على مدار الساعة بتكلفة أقل وأمان أكبر.",
    image: img(4, "photo-1509391366360-2e959784a276"),
    raised: 478000,
    goal: 750000,
    donors: 2940,
    daysLeft: 14,
    location: "وهران - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 98,
    gallery: [
      img(41, "photo-1509391366360-2e959784a276"),
      img(42, "photo-1466611653911-95081537e5b7"),
      img(43, "photo-1497435334941-8c899ee9e8e9"),
    ],
    timeline: [
      { date: "يناير 2026", title: "التصميم الهندسي", description: "مكتمل", done: true },
      { date: "مارس 2026", title: "وصول الألواح", description: "900 لوحاً", done: true },
      { date: "مايو 2026", title: "التشغيل التجريبي", description: "اختبار النظام", done: false },
    ],
    updates: [
      { date: "أمس", title: "تركيب 60% من الألواح", content: "تقدم متسارع في الموقع." },
    ],
    impact: [
      { label: "مريض شهرياً", value: "6,000" },
      { label: "كيلوواط نظيف", value: "350" },
      { label: "توفير سنوي", value: "6,500,000 دج" },
    ],
  },
  {
    id: "orphans-ghardaia",
    organization: "جمعية كافل لرعاية الأيتام",
    title: "كفالة 100 يتيم في الأغواط",
    category: "orphans",
    shortDescription: "كفالة شهرية شاملة (تعليم، صحة، سكن) لـ 100 يتيم في ولاية الأغواط لمدة 5 سنوات.",
    story:
      "برنامج كفالة متكامل لـ 100 يتيم بولاية الأغواط يشمل التعليم والصحة والإقامة في بيوت كريمة، مع متابعة نفسية واجتماعية متخصصة.",
    image: img(5, "photo-1488521787991-ed7bbaae773c"),
    raised: 920000,
    goal: 1500000,
    donors: 7210,
    daysLeft: 30,
    location: "الأغواط - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 94,
    gallery: [
      img(51, "photo-1488521787991-ed7bbaae773c"),
      img(52, "photo-1503454537195-1dcabb73ffb9"),
    ],
    timeline: [
      { date: "مستمر", title: "كفالات شهرية", description: "100 طفل تحت الرعاية", done: true },
    ],
    updates: [],
    impact: [
      { label: "طفل مكفول", value: "100" },
      { label: "بيت رعاية", value: "8" },
      { label: "خريجي البرنامج", value: "45" },
    ],
  },
  {
    id: "clinic-tamanrasset",
    organization: "جمعية الشفاء الإنسانية",
    title: "عيادة وقفية في تمنراست",
    category: "health",
    shortDescription: "بناء عيادة متكاملة تخدم 20,000 نسمة بخدمات صحية مجانية بولاية تمنراست.",
    story:
      "عيادة طبية وقفية مجهزة بأقسام أطفال ونساء وطوارئ بولاية تمنراست، تقدم خدماتها مجاناً وتمولها أوقاف تجارية مرافقة.",
    image: img(6, "photo-1576091160399-112ba8d25d1d"),
    raised: 198000,
    goal: 600000,
    donors: 1340,
    daysLeft: 75,
    location: "تمنراست - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 88,
    gallery: [img(61, "photo-1576091160399-112ba8d25d1d"), img(62, "photo-1519494026892-80bbd2d6fd0d")],
    timeline: [{ date: "فبراير 2026", title: "تخصيص الأرض", description: "هبة من الولاية", done: true }],
    updates: [],
    impact: [
      { label: "مستفيد سنوياً", value: "20,000" },
      { label: "أقسام طبية", value: "6" },
      { label: "كوادر طبية", value: "25" },
    ],
  },
  {
    id: "surgery-amel",
    organization: "جمعية أمل للرعاية الصحية",
    title: "عملية جراحية مكلفة لزراعة القلب للطفلة أمل",
    category: "medical",
    shortDescription:
      "تغطية تكاليف عملية جراحية دقيقة ومكلفة لزراعة صمام قلبي للطفلة أمل (6 سنوات) في الجزائر.",
    story:
      "تعاني الطفلة أمل من عيب خلقي حاد في القلب يستوجب عملية جراحية عاجلة ومكلفة لزراعة صمام قلبي في مركز متخصص بالجزائر. تشمل التكلفة العملية والإقامة والمتابعة الطبية لمدة ستة أشهر. كل تبرع يقرّبنا من إنقاذ حياتها بإذن الله.",
    image: img(7, "photo-1581595219315-a187dd40c322"),
    raised: 3_400_000,
    goal: 9_500_000,
    donors: 1872,
    daysLeft: 18,
    location: "وهران - الجزائر",
    verified: true,
    shariaCompliant: true,
    transparencyScore: 97,
    gallery: [
      img(71, "photo-1581595219315-a187dd40c322"),
      img(72, "photo-1551601651-2a8555f1a136"),
      img(73, "photo-1538108149393-fbbd81895907"),
    ],
    timeline: [
      { date: "ديسمبر 2025", title: "التشخيص الطبي", description: "تقارير من مستشفى وهران الجامعي", done: true },
      { date: "يناير 2026", title: "قبول المركز الطبي", description: "تحديد موعد العملية في الجزائر", done: true },
      { date: "مارس 2026", title: "إجراء العملية", description: "زراعة الصمام القلبي", done: false },
      { date: "سبتمبر 2026", title: "المتابعة والتعافي", description: "متابعة طبية لمدة 6 أشهر", done: false },
    ],
    updates: [
      { date: "منذ 3 أيام", title: "اكتمال الفحوصات النهائية", content: "جاهزية الطفلة للعملية بعد استقرار حالتها." },
    ],
    impact: [
      { label: "حياة تُنقذ", value: "1" },
      { label: "نسبة نجاح العملية", value: "92%" },
      { label: "أشهر متابعة", value: "6" },
    ],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);

export const stats = {
  totalRaised: 12_840_000,
  projectsFunded: 184,
  donors: 47_200,
  countries: 32,
};

export const testimonials = [
  {
    name: "د. أحمد المنصوري",
    role: "خبير مالية إسلامية",
    text: "منصة الوقف الرقمي أعادت تعريف الوقف للجيل الحالي. الشفافية والامتثال الشرعي على أعلى مستوى.",
    avatar: "AM",
  },
  {
    name: "نورة الزهراني",
    role: "متبرعة",
    text: "أتابع أثر تبرعاتي لحظياً وأرى صور المشاريع تنمو. تجربة لم أعشها من قبل.",
    avatar: "NZ",
  },
  {
    name: "م. خالد العتيبي",
    role: "مدير جمعية خيرية",
    text: "أدوات المنصة جعلت إدارة مشاريعنا الوقفية أسهل بعشرة أضعاف. تقارير احترافية ومتبرعون متفاعلون.",
    avatar: "KO",
  },
];

export const faqs = [
  {
    q: "هل المنصة متوافقة مع الشريعة الإسلامية؟",
    a: "نعم، جميع المشاريع تخضع لرقابة هيئة شرعية مستقلة، وتحصل على شهادة توافق شرعي قبل العرض.",
  },
  {
    q: "كيف أضمن وصول تبرعي للمستفيدين؟",
    a: "نوفر تتبعاً لحظياً لكل تبرع، مع تقارير دورية وصور وفيديوهات من الميدان، ولوحة شفافية مالية مفتوحة.",
  },
  {
    q: "ما هي رسوم المنصة؟",
    a: "نخصم 0% من تبرعك للمشروع. تشغيلنا يمول عبر أوقاف مستقلة وتبرعات منفصلة اختيارية لدعم المنصة.",
  },
  {
    q: "هل أستطيع إنشاء وقفي الخاص؟",
    a: "نعم، نوفر خدمة (وقفي) لإنشاء وقف باسمك أو باسم من تحب بمراحل توثيق شرعية وقانونية كاملة.",
  },
  {
    q: "ما وسائل الدفع المتاحة؟",
    a: "ندعم البطاقات البنكية المحلية (CIB، الذهبية) إضافة إلى Visa وMastercard ومحافظ رقمية.",
  },
];
