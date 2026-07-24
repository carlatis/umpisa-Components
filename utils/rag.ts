import { profileSources, type ProfileSource } from "../server/data/profile-sources";

export type RetrievalResult = ProfileSource & {
    score: number;
};

const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "can",
    "do",
    "does",
    "for",
    "from",
    "has",
    "have",
    "he",
    "his",
    "how",
    "i",
    "in",
    "is",
    "it",
    "me",
    "of",
    "on",
    "or",
    "tell",
    "the",
    "this",
    "to",
    "what",
    "when",
    "where",
    "with",
    "you",
    "your"
]);

const personalKeywords = [
    "carl",
    "atis",
    "resume",
    "portfolio",
    "cover",
    "cv",
    "download",
    "letter",
    "skill",
    "skills",
    "experience",
    "work",
    "project",
    "projects",
    "education",
    "certification",
    "certifications",
    "email",
    "gmail",
    "linkedin",
    "facebook",
    "contact",
    "php",
    "laravel",
    "javascript",
    "typescript",
    "vue",
    "nuxt",
    "next",
    "tailwind",
    "aws",
    "mquest",
    "summit",
    "unison",
    "adtech",
    "analytics",
    "cms"
];

export function tokenize(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9+#.]+/g, " ")
        .split(" ")
        .map((word) => word.trim())
        .filter((word) => word.length > 1 && !stopWords.has(word));
}

export function isPersonalProfileQuestion(question: string) {
    const normalized = question.toLowerCase();
    return personalKeywords.some((keyword) => normalized.includes(keyword));
}

export function retrieveProfileContext(question: string, limit = 4): RetrievalResult[] {
    const questionTokens = tokenize(question);
    const uniqueTokens = new Set(questionTokens);

    if (uniqueTokens.size === 0) {
        return [];
    }

    const scoredSources = profileSources
        .map((source) => {
            const haystack = `${source.title} ${source.sourceType} ${source.content}`.toLowerCase();
            const score = [...uniqueTokens].reduce((total, token) => {
                const exactBoost = haystack.includes(token) ? 2 : 0;
                const titleBoost = source.title.toLowerCase().includes(token) ? 2 : 0;
                return total + exactBoost + titleBoost;
            }, 0);

            return { ...source, score };
        })
        .filter((source) => source.score > 0)
        .sort((a, b) => b.score - a.score);

    const selected: RetrievalResult[] = [];
    const selectedIds = new Set<string>();

    for (const source of scoredSources) {
        if (selected.length >= limit) {
            break;
        }

        const duplicateCoverLetter =
            source.sourceType === "cover-letter" &&
            selected.some((item) => item.sourceType === "cover-letter");

        if (!selectedIds.has(source.id) && !duplicateCoverLetter) {
            selected.push(source);
            selectedIds.add(source.id);
        }
    }

    return selected;
}

export function formatContext(results: RetrievalResult[]) {
    return results
        .map(
            (result, index) =>
                `[${index + 1}] ${result.title} (${result.sourceType})\n${result.content}`
        )
        .join("\n\n");
}