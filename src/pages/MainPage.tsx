import { useState } from "react";
import { useNavigate } from "react-router-dom";

const content = {
  ru: {
    slogan: "Экономьте каждый день!",
    subtitle:
      "Покупайте у наших партнёров и возвращайте до 5% с каждой покупки.",
    cta: "Начать экономить",
    painTitle: "Вас это касается, если",
    pain: [
      "Вы переплачиваете за повседневные покупки",
      "Не получаете выгоду от своих расходов",
      "Хотите простой и прозрачный способ экономии",
    ],
    solutionTitle: "Как это работает",
    solution: [
      "Вы покупаете как обычно у наших партнёров",
      "Мы автоматически возвращаем вам кэшбэк",
      "Вы копите и используете экономию на новые покупки",
    ],
    proofTitle: "Наши результаты",
    proof: [
      "10 000+ довольных пользователей",
      "Средняя экономия — 15 000 ₸ в год",
      "Более 2 млрд ₸ уже возвращено",
    ],
    ctaFooter: "Присоединяйтесь и начните экономить сейчас",
  },
  kk: {
    slogan: "Күн сайын оңай үнемдеңіз!",
    subtitle:
      "Серіктестерімізден сатып алып, әр сатып алудан 5%-ға дейін қайтарып алыңыз.",
    cta: "Үнемдеуді бастаңыз",
    painTitle: "Бұл сізге қатысты, егер",
    pain: [
      "Күнделікті сатып алуларға көп төлеп жүрсіз",
      "Шығындарыңыздан пайда алмайсыз",
      "Жеңіл әрі ашық үнемдеу жолын іздейсіз",
    ],
    solutionTitle: "Қалай жұмыс істейді",
    solution: [
      "Серіктестерімізден әдеттегідей сатып аласыз",
      "Біз сізге автоматты түрде кэшбэк қайтарамыз",
      "Үнемдеуді жинап, келесі сатып алуларда пайдаланасыз",
    ],
    proofTitle: "Біздің нәтижелер",
    proof: [
      "10 000+ қанағаттанған қолданушы",
      "Орташа үнемдеу — жылына 15 000 ₸",
      "2 млрд ₸-дан астам қайтарылды",
    ],
    ctaFooter: "Қосылып, үнемдеуді бүгіннен бастаңыз",
  },
};

const styles = {
  page: {
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: "#335b45", // основной фон — темно-зеленый
    color: "#f5f0dc", // очень светлый бежевый — для текста
    padding: "32px 24px",
    maxWidth: "680px",
    margin: "0 auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "36px",
  },
  brand: {
    fontSize: "1.9rem",
    fontWeight: 700,
    color: "#d4af37", // горчичный — брендовый акцент
    userSelect: "none" as const,
    letterSpacing: "0.03em",
  },
  langSwitcher: {
    display: "flex",
    gap: "16px",
  },
  langBtn: (active: boolean) => ({
    backgroundColor: active ? "#d4af37" : "transparent",
    color: active ? "#335b45" : "#f5f0dc",
    border: active ? "none" : "1.5px solid #f5f0dc",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.25s ease",
    userSelect: "none" as const,
    outline: "none",
    ":hover": {
      backgroundColor: active ? "#d0aa50" : "#d4af37",
      color: "#335b45",
      border: "none",
    },
  }),
  slogan: {
    fontSize: "2.4rem",
    fontWeight: 800,
    color: "#d4af37",
    marginBottom: "14px",
    textAlign: "center" as const,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "38px",
    textAlign: "center" as const,
    color: "#f5f0dc",
    fontWeight: 400,
  },
  button: {
    backgroundColor: "#d4af37",
    color: "#335b45",
    fontWeight: 700,
    fontSize: "1.2rem",
    padding: "16px 0",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "50px",
    boxShadow: "0 4px 12px rgb(225 187 105 / 0.5)",
    transition: "background-color 0.3s ease",
    userSelect: "none" as const,
  },
  buttonHover: {
    backgroundColor: "#d0aa50",
  },
  sectionTitle: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#d4af37",
    marginBottom: "22px",
    borderBottom: "3px solid #d4af37",
    paddingBottom: "8px",
    userSelect: "none" as const,
  },
  list: {
    paddingLeft: "24px",
    marginBottom: "48px",
    fontSize: "1.1rem",
    fontWeight: 400,
    color: "#f5f0dc",
    userSelect: "none" as const,
  },
  listItem: {
    marginBottom: "14px",
    lineHeight: 1.4,
  },
  proofBox: {
    backgroundColor: "#2a4338", // темно-зеленый, чуть светлее основного
    borderRadius: "14px",
    padding: "28px 32px",
    fontWeight: 600,
    color: "#f5f0dc",
    marginBottom: "56px",
    userSelect: "none" as const,
    boxShadow: "0 4px 16px rgb(0 0 0 / 0.15)",
  },
  proofItem: {
    marginBottom: "14px",
    fontSize: "1.1rem",
  },
  footerCTA: {
    textAlign: "center" as const,
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#d4af37",
    marginBottom: "24px",
    userSelect: "none" as const,
  },
};

export default function CashbackPage() {
  const [lang] = useState<"ru" | "kk">("ru");
  const t = content[lang];
  const nav = useNavigate();

  return (
    <div style={styles.page}>
      {/* Hero */}
      <h1 style={styles.slogan}>{t.slogan}</h1>
      <p style={styles.subtitle}>{t.subtitle}</p>
      <button
        style={styles.button}
        onClick={() => nav("/login/customer")}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d0aa50")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d4af37")}
      >
        {t.cta}
      </button>

      {/* Pain Points */}
      <section>
        <h2 style={styles.sectionTitle}>{t.painTitle}</h2>
        <ul style={styles.list}>
          {t.pain.map((point, i) => (
            <li key={i} style={styles.listItem}>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Solution */}
      <section>
        <h2 style={styles.sectionTitle}>{t.solutionTitle}</h2>
        <ul style={styles.list}>
          {t.solution.map((step, i) => (
            <li key={i} style={styles.listItem}>
              {step}
            </li>
          ))}
        </ul>
      </section>

      {/* Proof */}
      <section>
        <h2 style={styles.sectionTitle}>{t.proofTitle}</h2>
        <div style={styles.proofBox}>
          {t.proof.map((item, i) => (
            <p key={i} style={styles.proofItem}>
              • {item}
            </p>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <div style={styles.footerCTA}>{t.ctaFooter}</div>
      <button
        style={styles.button}
        onClick={() => nav("/login/customer")}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d0aa50")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d4af37")}
      >
        {t.cta}
      </button>
    </div>
  );
}
