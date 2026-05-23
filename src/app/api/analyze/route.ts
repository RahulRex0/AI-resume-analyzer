export async function POST(request: Request) {
    const body = await request.json();
  
    console.log("Received from frontend:", body);
  
    return Response.json({
      matchScore: 75,
      strongMatches: ["React", "Next.js", "TypeScript"],
      missingKeywords: ["Prisma", "PostgreSQL"],
      improvementNotes: [
        "Add more measurable achievements.",
        "Mention the tech stack clearly.",
      ],
    });
  }