function AIRecommendations({ seo }) {
  if (!seo) return null;

  const recommendations = [];

  // SEO Score
  if (seo.seo_score < 70) {
    recommendations.push("📈 Improve your overall SEO score by fixing the issues below.");
  } else {
    recommendations.push("🚀 Great SEO foundation. Keep optimizing your content.");
  }

  // Title
  if (seo.title === "Not Found") {
    recommendations.push("❌ Add a keyword-rich title tag.");
  } else {
    recommendations.push("✅ Title tag looks good.");
  }

  // Meta
  if (seo.meta_description === "Not Found") {
    recommendations.push("❌ Add a compelling meta description (150–160 characters).");
  } else {
    recommendations.push("✅ Meta description is present.");
  }

  // H1
  if (seo.h1 === "Not Found") {
    recommendations.push("❌ Add an H1 heading using your primary keyword.");
  } else {
    recommendations.push("✅ H1 heading found.");
  }

  // H2
  if (seo.h2.length < 2) {
    recommendations.push("⚠️ Add more H2 headings to improve content structure.");
  } else {
    recommendations.push("✅ Good use of H2 headings.");
  }

  // Images
  if (seo.images.missing_alt > 0) {
    recommendations.push(`🖼️ Add ALT text to ${seo.images.missing_alt} image(s).`);
  } else {
    recommendations.push("✅ All images contain ALT text.");
  }

  // Robots
  if (seo.technical.robots === "Not Found") {
    recommendations.push("⚠️ Add a robots meta tag.");
  }

  // Canonical
  if (seo.technical.canonical === "Not Found") {
    recommendations.push("⚠️ Add a canonical URL.");
  }

  // ---------------- Keyword Analysis ----------------
  if (seo.keyword_analysis) {
    const keyword = seo.keyword_analysis;

    if (!keyword.keyword) {
      recommendations.push("⚠️ Enter a primary keyword to receive keyword SEO recommendations.");
    } else {
      recommendations.push(`🔍 Primary keyword analyzed: "${keyword.keyword}".`);

      if (!keyword.found_in_title) {
        recommendations.push(`❌ Add "${keyword.keyword}" to the page title.`);
      } else {
        recommendations.push("✅ Primary keyword is present in the title.");
      }

      if (!keyword.found_in_meta) {
        recommendations.push(`❌ Add "${keyword.keyword}" to the meta description.`);
      } else {
        recommendations.push("✅ Primary keyword is present in the meta description.");
      }

      if (!keyword.found_in_h1) {
        recommendations.push(`❌ Add "${keyword.keyword}" to the H1 heading.`);
      } else {
        recommendations.push("✅ Primary keyword is present in the H1 heading.");
      }

      if (keyword.density < 1) {
        recommendations.push(
          `⚠️ Keyword density is only ${keyword.density}%. Increase the keyword usage naturally.`
        );
      } else if (keyword.density > 3) {
        recommendations.push(
          `⚠️ Keyword density is ${keyword.density}%. Avoid keyword stuffing.`
        );
      } else {
        recommendations.push(
          `✅ Keyword density (${keyword.density}%) is within the recommended range.`
        );
      }

      if (seo.images.missing_alt > 0) {
        recommendations.push(
          `💡 Add "${keyword.keyword}" to relevant image ALT text where appropriate.`
        );
      }

      if (seo.h2.length === 0) {
        recommendations.push(
          `💡 Use "${keyword.keyword}" in at least one H2 heading.`
        );
      }
    }
  }

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
        🤖 AI Recommendations
      </h2>

      <div style={{ lineHeight: "2" }}>
        {recommendations.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#1f2937",
              marginBottom: "10px",
              padding: "14px",
              borderRadius: "8px",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIRecommendations;