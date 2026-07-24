import { NextResponse } from 'next/server';

import { createChatCompletion } from '../../../utils/llm';
import { formatContext, isPersonalProfileQuestion, retrieveProfileContext } from '../../../utils/rag';

type IncomingMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ResponseSource = {
  id: string;
  title: string;
  sourceType: string;
  url?: string;
};

function sanitizeMessages(messages: IncomingMessage[]) {
  return messages
    .filter(
      (message) =>
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1600),
    }));
}

function getDownloadReply(question: string) {
  const normalized = question.toLowerCase();
  const wantsDownload =
    normalized.includes('download') ||
    normalized.includes('file') ||
    normalized.includes('pdf') ||
    normalized.includes('cv');

  if (!wantsDownload) {
    return null;
  }

  const wantsCoverLetter = normalized.includes('cover') || normalized.includes('letter');
  const wantsResume = normalized.includes('resume') || normalized.includes('cv');

  if (wantsCoverLetter && wantsResume) {
    return {
      reply:
        "Sure. You can download Carl's resume here: /docs/Carl_Kenneth_Atis_Resume.pdf and his cover letter here: /docs/Carl_Kenneth_Atis_Cover_Letter.pdf.",
      sources: [
        {
          id: 'resume-download',
          title: 'Resume - Download',
          sourceType: 'resume',
          url: '/docs/Carl_Kenneth_Atis_Resume.pdf',
        },
        {
          id: 'cover-letter-summary',
          title: 'Cover Letter - Download',
          sourceType: 'cover-letter',
          url: '/docs/Carl_Kenneth_Atis_Cover_Letter.pdf',
        },
      ],
    };
  }

  if (wantsCoverLetter) {
    return {
      reply:
        "Sure. You can download Carl's cover letter here: /docs/Carl_Kenneth_Atis_Cover_Letter.pdf.",
      sources: [
        {
          id: 'cover-letter-summary',
          title: 'Cover Letter - Download',
          sourceType: 'cover-letter',
          url: '/docs/Carl_Kenneth_Atis_Cover_Letter.pdf',
        },
      ],
    };
  }

  if (wantsResume) {
    return {
      reply: "Sure. You can download Carl's resume here: /docs/Carl_Kenneth_Atis_Resume.pdf.",
      sources: [
        {
          id: 'resume-download',
          title: 'Resume - Download',
          sourceType: 'resume',
          url: '/docs/Carl_Kenneth_Atis_Resume.pdf',
        },
      ],
    };
  }

  return null;
}

function uniqueResponseSources(sources: ResponseSource[]) {
  const byType = new Map<string, ResponseSource>();

  for (const source of sources) {
    const existing = byType.get(source.sourceType);

    if (!existing || (!existing.url && source.url)) {
      byType.set(source.sourceType, source);
    }
  }

  return [...byType.values()];
}

export async function POST(request: Request) {
  const body = (await request.json()) as { messages?: IncomingMessage[] };
  const messages = sanitizeMessages(Array.isArray(body.messages) ? body.messages : []);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return NextResponse.json(
      {
        error: 'A user message is required.',
      },
      { status: 400 },
    );
  }

  if (!isPersonalProfileQuestion(latestUserMessage.content)) {
    return NextResponse.json({
      reply:
        "I can only answer questions about Carl Kenneth Atis' resume, cover letter, portfolio, skills, projects, experience, education, certifications, and contact details.",
      sources: [],
    });
  }

  const downloadReply = getDownloadReply(latestUserMessage.content);

  if (downloadReply) {
    return NextResponse.json(downloadReply);
  }

  const retrieved = retrieveProfileContext(latestUserMessage.content);

  if (retrieved.length === 0) {
    return NextResponse.json({
      reply:
        "That information is not available in Carl Kenneth Atis' provided resume, cover letter, portfolio, or approved profile sources.",
      sources: [],
    });
  }

  const context = formatContext(retrieved);
  const completion = await createChatCompletion([
    {
      role: 'system',
      content: `You are Carl Kenneth Atis' personal portfolio chatbot.

      Answer only from the retrieved context supplied below. The approved source types are Carl's resume, cover letter, portfolio, LinkedIn, Facebook, and Gmail/contact details explicitly provided by Carl.

      Rules:
      - Answer only questions about Carl Kenneth D. Atis.
      - Use only the retrieved context. Do not invent facts, dates, employers, private details, links, or project claims.
      - If the answer is not in the retrieved context, say it is not available in Carl's provided sources.
      - If the user asks for something unrelated to Carl's professional profile, refuse briefly.
      - Keep answers concise, friendly, and portfolio-appropriate. Prefer one short paragraph or 3-5 bullets.
      - Do not repeat the same idea from multiple retrieved chunks. Combine overlapping context into one simple answer.
      - Do not structure the answer by source title unless the user asks for citations. Give one synthesized answer.
      - Do not restate the user's question or add headings that duplicate the source names.
      - Never create separate sections for similar chunks such as "Career Positioning" and "Strengths and Motivation". Merge them into one answer.
      - If several sources say similar things, mention the point once.
      - For cover letter questions, summarize the cover letter unless the user explicitly asks you to write or rewrite the full letter.
      - Do not output letter greetings, signatures, or placeholders such as [Company Name] unless the user asks for a full cover letter draft.
      - When useful, mention source labels such as Resume, Cover Letter, Portfolio, LinkedIn, Facebook, or Contact.

      Retrieved context:
      ${context}`,
    },
    ...messages,
  ]);

  return NextResponse.json({
    reply: completion.content || "I could not create a reply from Carl's provided sources.",
    provider: completion.provider,
    model: completion.model,
    sources: uniqueResponseSources(
      retrieved.map((source) => ({
        id: source.id,
        title: source.title,
        sourceType: source.sourceType,
        url: source.url,
      })),
    ),
  });
}
