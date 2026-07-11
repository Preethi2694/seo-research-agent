function card(title, value, color) {
  return (
    <div
      style={{
        flex: "1",
        minWidth: "180px",
        background: "#1f2937",
        borderRadius: "12px",
        padding: "20px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 5px 15px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ScoreCards({ seo }) {
  if (!seo) return null;

  const technicalPassed = Object.values(seo.technical).filter(
    (value) => value === true || value === "Found"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "30px",
      }}
    >
      {card("SEO Score", `${seo.seo_score}/100`, "#38bdf8")}

      {card("Images", seo.images.total, "#22c55e")}

      {card("Links", seo.links.total, "#f59e0b")}

      {card("Technical", `${technicalPassed}/7`, "#ec4899")}
    </div>
  );
}

export default ScoreCards;