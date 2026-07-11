from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scraper import analyze_website

app = FastAPI()

# Allow React frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data sent from the frontend
class SEORequest(BaseModel):
    website: str
    business: str
    location: str
    keyword: str

# Test endpoint
@app.get("/")
def home():
    return {
        "message": "SEO Research Agent Backend is Running 🚀"
    }

# Analyze endpoint
@app.post("/analyze")
def analyze(data: SEORequest):

    print("Website received:", data.website)

    seo_data = analyze_website(data.website, data.keyword)

    return {
        "business": data.business,
        "location": data.location,
        "seo": seo_data
    }