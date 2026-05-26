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
  const[isLoading, setIsLoading]=useState(false);
  const[error,setError]=useState("");


  async function handleAnalyze() {
    setError("");
    setResult(null);
    if(!resumeText.trim() || !jobDescription.trim() )
    {
      setError("please paste both fields");
      return;
    }
    try {
      setIsLoading(true);
  
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
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong.");
      }
  
      const data = await response.json();
      setResult(data);
  
      console.log("AI result:", data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to analyze resume. Please try again.");
      }
    }
    finally {
      setIsLoading(false);
    }
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
            <button onClick={handleAnalyze} className={styles.button} disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
      </div>
      {result&&(
        <div className={styles.result}>
          <div className={styles.matchScore}>
            <div className={styles.mark}>{result.matchScore}/100</div>
            <div className={styles.matchDescription}>
              <div>Match score</div>
              <div style={{fontFamily: 'arial,san-serif', color: 'rgb(182, 181, 181)' }}>Based on alignment between your resume and the job description.</div>
            </div>

          </div>
          <div className={styles.bottom}>
              <div className={`${styles.cards} ${styles.matchCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>✓</span>
                  <span className={styles.cardTitle}>Strong Matches</span>
                </div>
                    <ul>
                      {result.strongMatches.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
              </div>
              <div className={`${styles.cards} ${styles.missingCard}`}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>!</span>
                    <span className={styles.cardTitle}>Missing Keywords</span>
                  </div>
                  <ul>
                    {result.missingKeywords.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
              </div>
              <div className={`${styles.cards} ${styles.notesCard}`}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>★</span>
                    <span className={styles.cardTitle}>Improvement Notes</span>
                  </div>
                  <ul>
                    {result.improvementNotes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
      )}

    </main>
  )

}
