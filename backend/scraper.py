import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse


def analyze_website(url, keyword):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)

        soup = BeautifulSoup(response.text, "html.parser")

        # ---------------- BASIC SEO ----------------
        title = (
            soup.title.string.strip()
            if soup.title and soup.title.string
            else "Not Found"
        )

        meta = soup.find("meta", attrs={"name": "description"})
        meta_description = (
            meta.get("content", "Not Found") if meta else "Not Found"
        )

        h1 = soup.find("h1")
        h1_text = h1.get_text(strip=True) if h1 else "Not Found"

        h2_tags = [h.get_text(strip=True) for h in soup.find_all("h2")]

        # ---------------- IMAGES ----------------
        images = soup.find_all("img")
        total_images = len(images)
        with_alt = sum(1 for img in images if img.get("alt", "").strip())
        missing_alt = total_images - with_alt

        # ---------------- LINKS ----------------
        links = soup.find_all("a", href=True)
        total_links = len(links)

        internal_links = 0
        external_links = 0

        domain = urlparse(url).netloc

        for a in links:
            href = a["href"]

            if href.startswith("/") or domain in href:
                internal_links += 1
            elif href.startswith("http"):
                external_links += 1

        # ---------------- TECHNICAL SEO ----------------
        canonical = soup.find("link", rel="canonical")
        viewport = soup.find("meta", attrs={"name": "viewport"})
        robots = soup.find("meta", attrs={"name": "robots"})
        og = soup.find("meta", property="og:title")
        twitter = soup.find("meta", attrs={"name": "twitter:card"})
        favicon = soup.find(
            "link",
            rel=lambda x: x and "icon" in x.lower()
        )

        html = soup.find("html")
        language = html.get("lang", "Not Found") if html else "Not Found"

        # ---------------- KEYWORD ANALYSIS ----------------
        page_text = soup.get_text(" ", strip=True).lower()

        keyword = (keyword or "").strip().lower()

        keyword_count = page_text.count(keyword) if keyword else 0

        total_words = len(page_text.split())

        keyword_density = (
            round((keyword_count / total_words) * 100, 2)
            if total_words > 0 and keyword
            else 0
        )

        keyword_analysis = {
            "keyword": keyword,
            "found_in_title": keyword in title.lower() if title != "Not Found" else False,
            "found_in_meta": keyword in meta_description.lower() if meta_description != "Not Found" else False,
            "found_in_h1": keyword in h1_text.lower() if h1_text != "Not Found" else False,
            "count": keyword_count,
            "density": keyword_density,
        }

        # ---------------- SEO SCORE ----------------
        score = 100

        if title == "Not Found":
            score -= 15

        if meta_description == "Not Found":
            score -= 15

        if h1_text == "Not Found":
            score -= 10

        if len(h2_tags) == 0:
            score -= 10

        if missing_alt > 0:
            score -= 10

        if canonical is None:
            score -= 5

        if viewport is None:
            score -= 5

        if robots is None:
            score -= 5

        if og is None:
            score -= 5

        if twitter is None:
            score -= 5

        score = max(score, 0)

        # ---------------- RESPONSE ----------------
        return {
            "title": title,
            "meta_description": meta_description,
            "h1": h1_text,
            "h2": h2_tags,
            "seo_score": score,
            "images": {
                "total": total_images,
                "with_alt": with_alt,
                "missing_alt": missing_alt,
            },
            "links": {
                "total": total_links,
                "internal": internal_links,
                "external": external_links,
            },
            "technical": {
                "https": url.startswith("https"),
                "canonical": "Found" if canonical else "Not Found",
                "viewport": "Found" if viewport else "Not Found",
                "robots": "Found" if robots else "Not Found",
                "open_graph": "Found" if og else "Not Found",
                "twitter_card": "Found" if twitter else "Not Found",
                "favicon": "Found" if favicon else "Not Found",
                "language": language,
            },
            "keyword_analysis": keyword_analysis,
        }

    except requests.RequestException as e:
        return {"error": str(e)}

    except Exception as e:
        return {"error": str(e)}