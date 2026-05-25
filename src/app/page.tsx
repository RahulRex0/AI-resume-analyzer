"use client"

import { useState } from "react"
import styles from "@/app/page.module.css"

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
    <main className={styles.main}>
      <div className={styles.text}>
        <div className={styles.first}>AI-Powered Resume Insights</div>
        <div className={styles.heading}>AI Resume Analyzer</div>
        <div className={styles.textarea}>Paste your resume and the job description below to instantly see how well you match — plus actionable feedback to land the interview.</div>
      </div>
      <div className={styles.boxArea}>
        <div className={styles.box}>
          <div className={styles.inputGroup}>
                <label htmlFor="resume" className={styles.label}>📄 Resume Text</label>
                <textarea 
                  id="resume" 
                  className={styles.textareaBox}
                  value={resumeText} 
                  onChange={(event)=>setResumeText(event.target.value)}
                  placeholder="Paste your resume text here..."
                ></textarea>
          </div>

          <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.label}>💼 Job Description</label>
              <textarea 
                id="description" 
                className={styles.textareaBox}
                value={jobDescription} 
                onChange={(event)=>setJobDescription(event.target.value)} 
                placeholder="Paste your job description here..."
              ></textarea>
          </div>
        </div>
          <div className={styles.buttonbox}>
            <button onClick={handleAnalyze} className={styles.button}>Analyze Resume</button>
          </div>
      </div>
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
