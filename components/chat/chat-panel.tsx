"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "components/ai-elements/prompt-input";
import { Shimmer } from "components/ai-elements/shimmer";
import { Suggestion } from "components/ai-elements/suggestion";
import { GenuiBookingFlow } from "components/genui/genui-booking-flow";
import { GenuiContactForm } from "components/genui/genui-contact-form";
import { GenuiSessionProvider } from "components/genui/genui-session";
import { MessageSquareIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { Fragment } from "react";

type FormTool = "showBookingForm" | "showMessageForm";

const forms: Record<FormTool, { label: string; text: string }> = {
  showBookingForm: { label: "Book a call", text: "I'd like to book a call." },
  showMessageForm: {
    label: "Send a message",
    text: "I'd like to send a message.",
  },
};

const starters = [
  "What are you working on now?",
  "Which projects show your AI work?",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function ChatPanel() {
  const { messages, sendMessage, setMessages, status, stop, error } = useChat({
    transport,
  });
  const busy = status === "submitted" || status === "streaming";

  // The pills answer instantly: the user line and the form are appended
  // locally as a completed tool call, the same shape the model produces when
  // a typed request asks for the form.
  const showForm = (tool: FormTool) =>
    setMessages((current) => [
      ...current,
      {
        id: nanoid(),
        parts: [{ text: forms[tool].text, type: "text" }],
        role: "user",
      },
      {
        id: nanoid(),
        parts: [
          {
            input: {},
            output: "The form is now shown to the visitor.",
            state: "output-available",
            toolCallId: nanoid(),
            type: `tool-${tool}`,
          },
        ],
        role: "assistant",
      } as UIMessage,
    ]);

  return (
    <GenuiSessionProvider writesEnabled>
      <div className="flex min-h-0 flex-1 flex-col">
        <Conversation className="min-h-0">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquareIcon className="size-6" />}
                title="Ask anything"
                description="The AI Assistant can help with any inquiry you may have, booking a call or sending a message."
              />
            ) : (
              messages.map((message) => {
                const text = message.parts.filter(
                  (part) => part.type === "text"
                );
                const shown = message.parts.flatMap((part) =>
                  part.type === "tool-showBookingForm" ||
                  part.type === "tool-showMessageForm"
                    ? [part]
                    : []
                );
                return (
                  <Fragment key={message.id}>
                    {text.length > 0 ? (
                      <Message from={message.role}>
                        <MessageContent>
                          {text.map((part, index) => (
                            <MessageResponse
                              isAnimating={
                                busy && message.id === messages.at(-1)?.id
                              }
                              key={`${message.id}-${index}`}
                            >
                              {part.text}
                            </MessageResponse>
                          ))}
                        </MessageContent>
                      </Message>
                    ) : null}
                    {shown.map((part) =>
                      part.type === "tool-showBookingForm" ? (
                        <GenuiBookingFlow key={part.toolCallId} />
                      ) : (
                        <GenuiContactForm key={part.toolCallId} />
                      )
                    )}
                  </Fragment>
                );
              })
            )}
            {status === "submitted" ? (
              <Shimmer className="text-sm">Thinking…</Shimmer>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-red-400" role="alert">
                {error?.message || "Something went wrong. Try again."}
              </p>
            ) : null}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <div className="grid shrink-0 gap-3 p-4">
          {messages.length === 0 ? (
            <div className="flex flex-wrap gap-2">
              {starters.map((starter) => (
                <Suggestion
                  key={starter}
                  suggestion={starter}
                  onClick={(text) => sendMessage({ text })}
                />
              ))}
              {(Object.keys(forms) as FormTool[]).map((tool) => (
                <Suggestion
                  key={tool}
                  suggestion={forms[tool].label}
                  onClick={() => showForm(tool)}
                />
              ))}
            </div>
          ) : null}
          <PromptInput
            className="[&_[data-slot=input-group]]:border-input! [&_[data-slot=input-group]]:ring-0!"
            onSubmit={({ text }) => {
              if (text.trim()) sendMessage({ text });
            }}
          >
            <PromptInputBody>
              <PromptInputTextarea placeholder="Ask about Gabo's work" />
            </PromptInputBody>
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit onStop={stop} status={status} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </GenuiSessionProvider>
  );
}
