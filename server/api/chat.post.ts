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

export type ChatHandlerResponse = {
    reply: string;
    sources?: ResponseSource[];
    provider?: string;
    model?: string;
};

export default async function chatHandler(_body?: { messages?: IncomingMessage[] }): Promise<ChatHandlerResponse> {
    return {
        reply: 'The Next.js chat endpoint is available at app/api/chat/route.ts.',
        sources: [],
    };
}