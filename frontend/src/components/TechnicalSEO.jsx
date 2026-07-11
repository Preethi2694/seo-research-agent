function TechnicalSEO({ seo }) {
  if (!seo) return null;

  const Item = ({ label, value }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 18px",
        background: "#1f2937",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <span>{label}</span>

      <strong
        style={{
          color:
            value === "Found" || value === true
              ? "#22c55e"
              : value === "Not Found" || value === false
              ? "#ef4444"
              : "#38bdf8",
        }}
      >
        {value === "Found" || value === true
          ? "✅"
          : value === "Not Found" || value === false
          ? "❌"
          : value}
      </strong>
    </div>
  );

  return (
    <div
      style={{
        background: "#111827",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          marginBottom: "20px",
        }}
      >
        ⚙ Technical SEO
      </h2>

      <Item label="HTTPS" value={seo.technical.https} />
      <Item label="Canonical Tag" value={seo.technical.canonical} />
      <Item label="Viewport Meta" value={seo.technical.viewport} />
      <Item label="Robots Meta" value={seo.technical.robots} />
      <Item label="Open Graph" value={seo.technical.open_graph} />
      <Item label="Twitter Card" value={seo.technical.twitter_card} />
      <Item label="Favicon" value={seo.technical.favicon} />
      <Item label="Language" value={seo.technical.language} />
    </div>
  );
}

export default TechnicalSEO;