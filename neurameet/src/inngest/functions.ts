import JSONL from "jsonl-parse-stringify"
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { db } from "@/database"
import { agents, meetings, user } from "@/database/Schema"
import { eq, inArray } from "drizzle-orm";
import OpenAI from "openai";


export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      console.log("Fetching transcript from:", event.data.transcriptUrl);
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      console.log("Parsing transcript...");
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      console.log("Adding speakers...");
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id))
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((user) => ({
            ...user,
          }))
        );

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
          }))
        );

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown"
            }
          }
        };

        return {
          ...item,
          user: {
            name: speaker.name,
          }
        }
      })
    });

    // Format transcript for better summarization
    const formattedTranscript = await step.run("format-transcript", async () => {
      console.log("Formatting transcript...");
      return transcriptWithSpeakers
        .map(item => `${item.user.name}: ${item.text || ''}`)
        .join('\n');
    });

    // Generate AI summary
    const summary = await step.run("generate-ai-summary", async () => {
      console.log("Starting AI summarization...");
      console.log("Transcript length:", formattedTranscript.length);
      
      // Check if API key exists
      if (!process.env.OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY not found!");
        // Fallback to simple summary
        const speakerCount = new Set(transcriptWithSpeakers.map(item => item.user.name)).size;
        const messageCount = transcriptWithSpeakers.length;
        return `Meeting summary: ${speakerCount} speakers participated with ${messageCount} total messages. (AI summarization unavailable - API key missing)`;
      }

      try {
        // Initialize OpenAI client
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });

        // Call OpenAI API directly
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an expert meeting summarizer. Provide a concise summary highlighting key discussion points, decisions made, and action items."
            },
            {
              role: "user",
              content: `Summarize the following meeting transcript:\n\n${formattedTranscript}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        });

        const aiSummary = completion.choices[0]?.message?.content || "Summary generation failed";
        console.log("AI summarization successful!");
        return aiSummary;
      } catch (error) {
        console.error("AI summarization failed:", error);
        // Fallback to simple summary
        const speakerCount = new Set(transcriptWithSpeakers.map(item => item.user.name)).size;
        const messageCount = transcriptWithSpeakers.length;
        return `Meeting summary: ${speakerCount} speakers participated with ${messageCount} total messages. (AI summarization failed: ${error instanceof Error ? error.message : 'Unknown error'})`;
      }
    });

    await step.run("save-summary", async () => {
      console.log("Saving summary to database...");
      await db
        .update(meetings)
        .set({
          summary: summary,
          status: "completed"
        })
        .where(eq(meetings.id, event.data.meetingId))
      
      console.log("Summary saved successfully!");
    });

    return { success: true, meetingId: event.data.meetingId, summary };
  },
);