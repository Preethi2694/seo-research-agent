function KeywordAnalysis({ seo }) {
  const keyword = seo.keyword_analysis;

  if (!keyword) return null;

  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🔍 Keyword Analysis
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <tbody>
          <tr>
            <td><b>Primary Keyword</b></td>
            <td>{keyword.keyword || "Not Provided"}</td>
          </tr>

          <tr>
            <td><b>Found in Title</b></td>
            <td>{keyword.found_in_title ? "✅ Yes" : "❌ No"}</td>
          </tr>

          <tr>
            <td><b>Found in Meta Description</b></td>
            <td>{keyword.found_in_meta ? "✅ Yes" : "❌ No"}</td>
          </tr>

          <tr>
            <td><b>Found in H1</b></td>
            <td>{keyword.found_in_h1 ? "✅ Yes" : "❌ No"}</td>
          </tr>

          <tr>
            <td><b>Occurrences</b></td>
            <td>{keyword.count}</td>
          </tr>

          <tr>
            <td><b>Keyword Density</b></td>
            <td>{keyword.density}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default KeywordAnalysis;