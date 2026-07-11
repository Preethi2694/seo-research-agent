function ImageAudit({ seo }) {
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
        🖼 Image Audit
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Total Images */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#d1d5db" }}>Total Images</h3>

          <h1
            style={{
              color: "#ffffff",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "10px 0 0",
            }}
          >
            {seo.images.total}
          </h1>
        </div>

        {/* Images with ALT */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#d1d5db" }}>Images with ALT</h3>

          <h1
            style={{
              color: "#22c55e",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "10px 0 0",
            }}
          >
            {seo.images.with_alt}
          </h1>
        </div>

        {/* Missing ALT */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#d1d5db" }}>Missing ALT</h3>

          <h1
            style={{
              color: "#ef4444",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "10px 0 0",
            }}
          >
            {seo.images.missing_alt}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ImageAudit;