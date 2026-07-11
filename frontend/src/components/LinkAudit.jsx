function LinkAudit({ seo }) {
  if (!seo) return null;

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
          textAlign: "center",
        }}
      >
        🔗 Link Audit
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Total Links */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#d1d5db" }}>Total Links</h3>

          <h1
            style={{
              color: "#38bdf8",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "10px 0 0",
            }}
          >
            {seo.links.total}
          </h1>
        </div>

        {/* Internal Links */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#d1d5db" }}>Internal Links</h3>

          <h1
            style={{
              color: "#22c55e",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "10px 0 0",
            }}
          >
            {seo.links.internal}
          </h1>
        </div>

        {/* External Links */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#d1d5db" }}>External Links</h3>

          <h1
            style={{
              color: "#f59e0b",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "10px 0 0",
            }}
          >
            {seo.links.external}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default LinkAudit;