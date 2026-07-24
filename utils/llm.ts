import OpenAI from "openai";

type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

type LlmProvider = "openai" | "groq";

let openaiClient: OpenAI | null = null;
let groqClient: OpenAI | null = null;

function getRuntimeConfigValue(name: string) {
    const runtimeConfigGetter = (globalThis as typeof globalThis & {
        useRuntimeConfig?: () => Record<string, unknown>;
    }).useRuntimeConfig;

    if (typeof runtimeConfigGetter === 'function') {
        const runtimeConfig = runtimeConfigGetter();
        const runtimeValue = runtimeConfig?.[name];

        if (typeof runtimeValue === 'string' && runtimeValue.trim().length > 0) {
            return runtimeValue;
        }
    }

    return process.env[name] || process.env[name.toUpperCase()] || '';
}

function getProvider(): LlmProvider {
    const provider = String(getRuntimeConfigValue('llmProvider') || 'openai').toLowerCase();

    if (provider === 'groq') {
        return 'groq';
    }

    return 'openai';
}

function getOpenAIClient() {
    const apiKey = getRuntimeConfigValue('openaiApiKey');

    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is missing.');
    }

    if (!openaiClient) {
        openaiClient = new OpenAI({
            apiKey,
        });
    }

    return openaiClient;
}

function getGroqClient() {
    const apiKey = getRuntimeConfigValue('groqApiKey');

    if (!apiKey) {
        throw new Error('GROQ_API_KEY is missing.');
    }

    if (!groqClient) {
        groqClient = new OpenAI({
            apiKey,
            baseURL: 'https://api.groq.com/openai/v1',
        });
    }

    return groqClient;
}

function getModel(provider: LlmProvider) {
    if (provider === 'groq') {
        return getRuntimeConfigValue('groqModel') || 'llama-3.1-8b-instant';
    }

    return getRuntimeConfigValue('openaiModel') || 'gpt-4o-mini';
}

export async function createChatCompletion(messages: ChatMessage[]) {
    const provider = getProvider();
    const client = provider === "groq" ? getGroqClient() : getOpenAIClient();
    const model = getModel(provider);

    const completion = await client.chat.completions.create({
        model,
        temperature: 0.25,
        messages
    });

    return {
        provider,
        model,
        content: completion.choices[0]?.message?.content || ""
    };
}