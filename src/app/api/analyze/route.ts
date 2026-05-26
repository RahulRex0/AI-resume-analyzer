import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const resumeText = body.resumeText;
    const jobDescription = body.jobDescription;

    if (
      typeof resumeText !== "string" ||
      typeof jobDescription !== "string" ||
      !resumeText.trim() ||
      !jobDescription.trim()
    ) {
      return Response.json(
        { error: "Resume text and job description are required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an AI resume analyzer.

Compare this resume with this job description.

For "rewrittenBullets": pick 3 to 5 of the weakest or most generic bullet points from the resume and rewrite each one to be more measurable, action-driven, and aligned with the job description's language. Keep rewrites concise (one line each) and realistic — do not invent metrics or experience the candidate does not mention.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanation outside JSON.

JSON format:
{
  "matchScore": number,
  "strongMatches": string[],
  "missingKeywords": string[],
  "improvementNotes": string[],
  "rewrittenBullets": [
    { "original": string, "rewritten": string }
  ]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      return Response.json(
        { error: "AI did not return a response." },
        { status: 500 }
      );
    }

    const cleanedText = text
      .replace("```json", "")
      .replace("```", "")
      .trim();

    const result = JSON.parse(cleanedText);

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to analyze resume." },
      { status: 500 }
    );
  }
}