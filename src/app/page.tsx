"use client"

import { useState } from "react"

export default function Home(){

  type AnalysisResult={
    matchScore:number;
    strongMatches:string[];
    missingKeywords:string[];
    improvementNotes: string[];
  };

  const [resumeText,setResumeText]=useState("");
  const [jobDescription,setJobDescription]=useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleAnalyze() {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });
  
    const data = await response.json();
    setResult(data);
  
    console.log("AI result:", data);
  }

  return(
    <main>
      <div>AI Resume Analyzer</div>
      <label htmlFor="resume">Resume text</label>
      <textarea id="resume" value={resumeText} onChange={(event)=>setResumeText(event.target.value)}placeholder="paste your resume text here..."></textarea>
      <label htmlFor="description">Job Description</label>
      <textarea id="description" value={jobDescription} onChange={(event)=>setJobDescription(event.target.value)} placeholder="paste your job description here..."></textarea>

      <button onClick={handleAnalyze}>Analyze Resume</button>

      {result&&(
        <div>
          <div>Analysis Result</div>
          <div>Match score:{result.matchScore}</div>
          <div>Strong Matches</div>
          <ul>
            {result.strongMatches.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div>Missing Keyword</div>
          <ul>
            {result.missingKeywords.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div>Improvement Notes</div>
          <ul>
            {result.improvementNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

    </main>
  )

}