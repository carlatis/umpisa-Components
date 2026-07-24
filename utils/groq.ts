import Groq from 'groq-sdk';

let client: Groq | null = null;

function getEnvValue(name: string) {
    const candidates = [
        name,
        name.replace(/([a-z])([A-Z])/g, '$1_$2'),
        name.toUpperCase(),
        name.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase(),
    ];

    for (const candidate of candidates) {
        const value = process.env[candidate];
        if (typeof value === 'string' && value.trim().length > 0) {
            return value;
        }
    }

    return '';
}

export function getGroqClient() {
    const apiKey = getEnvValue('GROQ_API_KEY');

    if (!apiKey) {
        throw new Error('GROQ_API_KEY is missing.');
    }

    if (!client) {
        client = new Groq({
            apiKey,
        });
    }

    return client;
}

export function getGroqModel() {
    return getEnvValue('GROQ_MODEL') || 'llama-3.1-8b-instant';
}