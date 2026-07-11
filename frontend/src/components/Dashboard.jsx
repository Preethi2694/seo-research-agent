import { useState } from "react";
import ScoreCards from "./ScoreCards";
import SeoDetails from "./SeoDetails";
import ImageAudit from "./ImageAudit";
import LinkAudit from "./LinkAudit";
import TechnicalSEO from "./TechnicalSEO";
import KeywordAnalysis from "./KeywordAnalysis";
import AIRecommendations from "./AIRecommendations";
import ExportPDF from "./ExportPDF";

function Dashboard() {
  const [website, setWebsite] = useState("");
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website,
          business,
          location,
          keyword,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Could not connect to backend.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        fontFamily: "Arial",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#38bdf8",
          marginBottom: "10px",
        }}
      >
        SEO Research Agent
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "30px",
          fontSize: "18px",
       }}
      >
      AI-Powered Website SEO Analyzer
      </p>

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#111827",
          padding: "25px",
          borderRadius: "12px",
        }}
      >
        <input
          placeholder="Website URL"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Business Name"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />
        
        <input
        placeholder="Primary Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={inputStyle}
        />


        <button
          onClick={handleAnalyze}
          style={buttonStyle}
        >
          Analyze SEO
        </button>
      </div>

      {result && (
  <div
    style={{
      maxWidth: "1200px",
      margin: "40px auto",
    }}
  >
    <h2
      style={{
        color: "#38bdf8",
        marginBottom: "20px",
      }}
    >
      📊 SEO Report
    </h2>

    <ScoreCards seo={result.seo} />
    <SeoDetails result={result} />
    <ImageAudit seo={result.seo} />
    <LinkAudit seo={result.seo} />
    <TechnicalSEO seo={result.seo} />
    <KeywordAnalysis seo={result.seo} />
    <AIRecommendations seo={result.seo} />
    <div
  style={{
    textAlign: "center",
    marginTop: "30px",
  }}
>
  <button
    onClick={() =>
      ExportPDF({
        seo: result.seo,
        business,
        location,
        website,
      })
    }
    style={{
      padding: "15px 35px",
      background: "#22c55e",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    }}
  >
    📄 Export PDF Report
  </button>
</div>
  </div>
)}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  background: "#1f2937",
  color: "white",
  border: "1px solid #374151",
  borderRadius: "6px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#38bdf8",
  color: "black",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Dashboard;