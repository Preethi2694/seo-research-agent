import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function getSEOGrade(score) {
  if (score >= 90)
    return {
      grade: "Excellent",
      color: [34, 197, 94],
    };

  if (score >= 70)
    return {
      grade: "Good",
      color: [234, 179, 8],
    };

  if (score >= 50)
    return {
      grade: "Needs Improvement",
      color: [249, 115, 22],
    };

  return {
    grade: "Poor",
    color: [239, 68, 68],
  };
}

function ExportPDF(result) {
  const seo = result.seo;

  if (!seo) {
    alert("No SEO report available.");
    return;
  }

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  const now = new Date();

  const reportDate = now.toLocaleDateString();

  const reportTime = now.toLocaleTimeString();

  const grade = getSEOGrade(seo.seo_score);

  // ============================================
  // COVER
  // ============================================

  doc.setFillColor(15, 23, 42);
  doc.rect(
    0,
    0,
    pageWidth,
    297,
    "F"
  );

  doc.setFontSize(24);

  doc.setTextColor(56, 189, 248);

  doc.text(
    "SEO RESEARCH REPORT",
    pageWidth / 2,
    30,
    {
      align: "center",
    }
  );

  doc.setFontSize(12);

  doc.setTextColor(255, 255, 255);

  doc.text(
    `Business : ${result.business}`,
    20,
    55
  );

  doc.text(
    `Website : ${result.website}`,
    20,
    65
  );

  doc.text(
    `Location : ${result.location}`,
    20,
    75
  );

  doc.text(
    `Generated On : ${reportDate}`,
    20,
    90
  );

  doc.text(
    `Generated At : ${reportTime}`,
    20,
    100
  );

  doc.setFontSize(28);

  doc.setTextColor(56, 189, 248);

  doc.text(
    `${seo.seo_score}/100`,
    pageWidth / 2,
    145,
    {
      align: "center",
    }
  );

  doc.setFontSize(14);

  doc.setTextColor(...grade.color);

  doc.text(
    grade.grade,
    pageWidth / 2,
    160,
    {
      align: "center",
    }
  );

  // ============================================
  // EXECUTIVE SUMMARY
  // ============================================

  doc.setFontSize(18);

  doc.setTextColor(56, 189, 248);

  doc.text(
    "Executive Summary",
    20,
    185
  );

  doc.setFontSize(11);

  doc.setTextColor(255, 255, 255);

  let summary = [];

  if (seo.seo_score >= 90) {
    summary.push(
      "Your website has excellent SEO."
    );
  } else if (seo.seo_score >= 70) {
    summary.push(
      "Your website has a solid SEO foundation with room for improvement."
    );
  } else if (seo.seo_score >= 50) {
    summary.push(
      "Your website requires optimization in several SEO areas."
    );
  } else {
    summary.push(
      "Your website needs significant SEO improvements."
    );
  }

  if (seo.h1 === "Not Found")
    summary.push(
      "Missing H1 heading."
    );

  if (seo.images.missing_alt > 0)
    summary.push(
      `${seo.images.missing_alt} image(s) missing ALT text.`
    );

  if (seo.technical.robots === "Not Found")
    summary.push(
      "Robots meta tag missing."
    );

  if (seo.keyword_analysis.keyword)
    summary.push(
      `Primary keyword analyzed: ${seo.keyword_analysis.keyword}`
    );

  let y = 198;

  summary.forEach((item) => {
    doc.text(
      "• " + item,
      24,
      y
    );

    y += 8;
  });

  doc.addPage();
    // ============================================
  // SEO DETAILS
  // ============================================

  doc.setFontSize(20);
  doc.setTextColor(56, 189, 248);
  doc.text("SEO Details", 14, 20);

  autoTable(doc, {
    startY: 28,
    theme: "grid",
    head: [["SEO Item", "Value"]],
    body: [
      ["Title", seo.title],
      ["Meta Description", seo.meta_description],
      ["H1 Heading", seo.h1],
      [
        "H2 Headings",
        seo.h2.length > 0
          ? seo.h2.join(", ")
          : "Not Found",
      ],
    ],
    headStyles: {
      fillColor: [56, 189, 248],
    },
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
  });

  // ============================================
  // IMAGE AUDIT
  // ============================================

  doc.setFontSize(18);
  doc.setTextColor(56, 189, 248);

  doc.text(
    "Image Audit",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    theme: "striped",
    head: [["Item", "Value"]],
    body: [
      ["Total Images", seo.images.total],
      ["Images with ALT", seo.images.with_alt],
      ["Missing ALT", seo.images.missing_alt],
    ],
    headStyles: {
      fillColor: [34, 197, 94],
    },
    styles: {
      fontSize: 10,
    },
  });

  // ============================================
  // LINK AUDIT
  // ============================================

  doc.setFontSize(18);
  doc.setTextColor(56, 189, 248);

  doc.text(
    "Link Audit",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    theme: "striped",
    head: [["Item", "Value"]],
    body: [
      ["Total Links", seo.links.total],
      ["Internal Links", seo.links.internal],
      ["External Links", seo.links.external],
    ],
    headStyles: {
      fillColor: [249, 115, 22],
    },
    styles: {
      fontSize: 10,
    },
  });

    // ============================================
  // TECHNICAL SEO
  // ============================================

  doc.setFontSize(18);
  doc.setTextColor(56, 189, 248);

  doc.text(
    "Technical SEO",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    theme: "grid",
    head: [["Technical Check", "Status"]],
    body: [
      ["HTTPS", seo.technical.https ? "Yes" : "No"],
      ["Canonical Tag", seo.technical.canonical],
      ["Viewport Meta", seo.technical.viewport],
      ["Robots Meta", seo.technical.robots],
      ["Open Graph", seo.technical.open_graph],
      ["Twitter Card", seo.technical.twitter_card],
      ["Favicon", seo.technical.favicon],
      ["Language", seo.technical.language],
    ],
    headStyles: {
      fillColor: [99, 102, 241],
    },
    styles: {
      fontSize: 10,
    },
  });

  // ============================================
  // KEYWORD ANALYSIS
  // ============================================

  doc.setFontSize(18);
  doc.setTextColor(56, 189, 248);

  doc.text(
    "Keyword Analysis",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    theme: "grid",
    head: [["Keyword Metric", "Value"]],
    body: [
      ["Primary Keyword", seo.keyword_analysis.keyword || "-"],
      [
        "Found in Title",
        seo.keyword_analysis.found_in_title ? "Yes" : "No",
      ],
      [
        "Found in Meta",
        seo.keyword_analysis.found_in_meta ? "Yes" : "No",
      ],
      [
        "Found in H1",
        seo.keyword_analysis.found_in_h1 ? "Yes" : "No",
      ],
      ["Keyword Count", seo.keyword_analysis.count],
      ["Keyword Density", seo.keyword_analysis.density + "%"],
    ],
    headStyles: {
      fillColor: [168, 85, 247],
    },
    styles: {
      fontSize: 10,
    },
  });

  // ============================================
  // AI RECOMMENDATIONS
  // ============================================

  let recommendations = [];

  if (seo.seo_score < 70)
    recommendations.push("Improve your overall SEO score.");
  else
    recommendations.push("Great SEO foundation. Continue optimizing.");

  if (seo.title === "Not Found")
    recommendations.push("Add a keyword-rich title tag.");

  if (seo.meta_description === "Not Found")
    recommendations.push("Add a compelling meta description.");

  if (seo.h1 === "Not Found")
    recommendations.push("Add an H1 heading.");

  if (seo.images.missing_alt > 0)
    recommendations.push(
      `Add ALT text to ${seo.images.missing_alt} image(s).`
    );

  if (seo.technical.robots === "Not Found")
    recommendations.push("Add a robots meta tag.");

  if (seo.technical.canonical === "Not Found")
    recommendations.push("Add a canonical tag.");

  if (seo.keyword_analysis.keyword) {
    if (!seo.keyword_analysis.found_in_title)
      recommendations.push(
        `Include "${seo.keyword_analysis.keyword}" in the page title.`
      );

    if (!seo.keyword_analysis.found_in_meta)
      recommendations.push(
        `Include "${seo.keyword_analysis.keyword}" in the meta description.`
      );

    if (!seo.keyword_analysis.found_in_h1)
      recommendations.push(
        `Include "${seo.keyword_analysis.keyword}" in the H1 heading.`
      );

    if (seo.keyword_analysis.density < 1)
      recommendations.push(
        "Increase keyword usage naturally throughout the content."
      );

    if (seo.keyword_analysis.density > 3)
      recommendations.push(
        "Reduce keyword usage to avoid keyword stuffing."
      );
  }

  doc.addPage();

  doc.setFontSize(20);
  doc.setTextColor(56, 189, 248);
  doc.text("AI Recommendations", 14, 20);

  autoTable(doc, {
    startY: 30,
    theme: "plain",
    head: [["Recommendation"]],
    body: recommendations.map((r) => [r]),
    headStyles: {
      fillColor: [56, 189, 248],
    },
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
  });

    // ============================================
  // PAGE NUMBERS
  // ============================================

  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      `Generated by SEO Research AI Dashboard`,
      14,
      290
    );

    doc.text(
      `Page ${i} of ${totalPages}`,
      180,
      290
    );
  }

  // ============================================
  // SAVE PDF
  // ============================================

  doc.save("SEO-Research-Report.pdf");
}

export default ExportPDF;