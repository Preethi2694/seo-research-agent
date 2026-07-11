function SeoDetails({ result }) {
  if (!result) return null;

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
        📋 SEO Details
      </h2>

      <p>
        <strong>Business:</strong> {result.business}
      </p>

      <p>
        <strong>Location:</strong> {result.location}
      </p>

      <p>
        <strong>Title:</strong> {result.seo.title}
      </p>

      <p>
        <strong>Meta Description:</strong>{" "}
        {result.seo.meta_description}
      </p>

      <p>
        <strong>H1:</strong> {result.seo.h1}
      </p>

      <div style={{ marginTop: "20px" }}>
        <strong>H2 Tags</strong>

        <div
          style={{
            marginTop: "10px",
          }}
        >
          {result.seo.h2.length > 0 ? (
            result.seo.h2.map((item, index) => (
              <div key={index}>✅ {item}</div>
            ))
          ) : (
            <div>❌ No H2 tags found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeoDetails;