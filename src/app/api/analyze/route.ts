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

Return ONLY valid JSON.
Do not include markdown.
Do not include explanation outside JSON.

JSON format:
{
  "matchScore": number,
  "strongMatches": string[],
  "missingKeywords": string[],
  "improvementNotes": string[]
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