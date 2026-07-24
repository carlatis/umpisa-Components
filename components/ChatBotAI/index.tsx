'use client';

import type { KeyboardEvent } from 'react';
import { useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    id: string;
    title: string;
    sourceType: string;
    url?: string;
  }>;
};

type ChatResponse = {
  reply: string;
  sources?: ChatMessage['sources'];
};

const quickQuestions = ['Main skills?', 'Work experience?', 'Portfolio projects?', 'Contact details?'];

const sourceLabel: Record<string, string> = {
  resume: 'Resume',
  'cover-letter': 'Cover Letter',
  portfolio: 'Portfolio',
  social: 'Social',
  contact: 'Contact',
};

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      "Hi, I am Carl's profile chatbot. Ask me about his resume, cover letter, portfolio projects, skills, work experience, education, certifications, or contact details.",
  },
];

export function ChatBotAI() {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  async function sendMessage(prompt?: string) {
    const text = (prompt ?? input).trim();

    if (!text || isLoading) {
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: text };
    const pendingMessages = [...messages, userMessage];

    setError('');
    setInput('');
    setMessages(pendingMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: pendingMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Chat request failed.');
      }

      const data = (await response.json()) as ChatResponse;

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.reply || "I couldn't create a reply from Carl's provided sources.",
          sources: data.sources ?? [],
        },
      ]);
    } catch {
      setError(
        "The chatbot could not answer right now. Check OPENAI_API_KEY in your environment and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleTextareaKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div>
      {isOpen ? (
        <section
          className="fixed bottom-32 right-4 z-40 flex h-[min(620px,calc(100vh-10rem))] w-[calc(100vw-2rem)] max-w-[420px] flex-col rounded-lg border border-white/40 bg-white/90 shadow-[0_24px_90px_rgba(10,18,32,0.26)] backdrop-blur-xl sm:bottom-8 sm:right-36"
          aria-label="Carl profile chatbot modal"
        >
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-3">
              <img src="/images/tools/bot-icon.png" alt="" className="h-10 w-10 rounded-full object-cover shadow" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Carl AI</p>
                <h2 className="text-sm font-black text-slate-900">Profile chatbot</h2>
              </div>
            </div>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-lg font-bold text-slate-600 transition hover:border-orange-300 hover:text-orange-500"
              aria-label="Close chatbot"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[86%] rounded-lg px-3 py-2 text-sm leading-6 ${
                    message.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>

                  {message.sources?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-200 pt-2">
                      {message.sources.map((source) => (
                        <a
                          key={source.id}
                          href={source.url}
                          target={source.url ? '_blank' : undefined}
                          rel={source.url ? 'noopener noreferrer' : undefined}
                          aria-disabled={!source.url}
                          className={`rounded bg-white px-2 py-1 text-[11px] font-bold text-cyan-700 ${
                            source.url ? 'transition hover:text-cyan-900' : 'pointer-events-none'
                          }`}
                        >
                          {sourceLabel[source.sourceType] || source.sourceType}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  Searching Carl&apos;s sources...
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 grid grid-cols-2 gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="rounded-md border border-slate-200 bg-white px-2 py-2 text-xs font-bold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
                  onClick={() => void sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
            >
              <textarea
                rows={2}
                placeholder="Ask about Carl..."
                className="min-h-12 flex-1 resize-none rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-black outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleTextareaKeyDown}
              />
              <button
                type="submit"
                className="h-12 rounded-md bg-cyan-700 px-4 text-sm font-black text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </form>

            {error ? <p className="mt-2 text-xs font-semibold text-red-700">{error}</p> : null}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="group fixed bottom-6 right-6 z-50 grid h-[60px] w-[60px] place-items-center rounded-full border border-white/40 bg-[#12172b] shadow-[0_0_0_8px_rgba(47,111,115,0.08),0_18px_60px_rgba(41,52,91,0.35)] transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/25 sm:h-[75px] sm:w-[75px]"
        aria-expanded={isOpen}
        aria-label="Open Carl profile chatbot"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl transition group-hover:bg-purple-400/30" />
        <img src="/images/tools/bot-icon.png" alt="Open Carl profile chatbot" className="relative h-full w-full rounded-full object-cover" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500" />
      </button>
    </div>
  );
}
