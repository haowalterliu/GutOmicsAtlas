import { useState } from 'react'

const suggestedQuestions = [
  'What is ACSL5?',
  'Please tell me the role of LGR5 in intestinal stem cells.',
  'Can you show the expression of CHGA?',
  'GLKB: What is the role of BRCA1 in breast cancer?',
  'Please show me the differential metabolite expression of GABA in duodenum versus colon tissues.',
  'GLKB: How many articles about Alzheimer\'s disease are published in 2020?',
]

const mockResponses = {
  default: 'Thank you for your question. This is a mockup response from the GutOmicsAtlas AI assistant. In the production version, this would provide detailed information based on our genomic databases and GLKB knowledge base.',
}

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showModal, setShowModal] = useState(false)

  const inConversation = messages.length > 0

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: trimmed },
      { role: 'ai', content: mockResponses.default },
    ])
    setInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const resetConversation = () => {
    setMessages([])
    setInput('')
    setShowModal(false)
  }

  if (!inConversation) {
    return (
      <div className="mx-auto max-w-[1400px] px-10">
        <div className="grid min-h-[calc(100dvh-130px)] grid-cols-[1.2fr_1fr] items-center gap-16 py-16">
          {/* Left: text + input */}
          <div>
            <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[#de3341]">
              Genomic exploration platform
            </p>
            <h1 className="mb-5 text-[48px] font-bold leading-[1.1] tracking-[-1.5px] text-[#0f0f0f]" style={{ textWrap: 'balance' }}>
              Welcome to GutOmicsAtlas
            </h1>
            <p className="mb-1 max-w-[50ch] text-[16px] leading-relaxed text-[#6B7280]">
              Answer questions and generate images about this website.
            </p>
            <p className="mb-10 max-w-[50ch] text-[16px] leading-relaxed text-[#6B7280]">
              Ask question to GLKB (Genomic Literature Knowledge Base) to help you explore biomedical literature.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-transparent py-2 text-[15px] text-[#0f0f0f] outline-none placeholder:text-[#9CA3AF]"
              />
              <button
                type="submit"
                className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#de3341] text-white hover:bg-[#c42d39]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right: suggested questions in 2-col */}
          <div className="grid grid-cols-2 gap-3">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="cursor-pointer rounded-2xl border border-[#E5E7EB] bg-white px-5 py-5 text-left text-[14px] leading-snug text-[#0f0f0f] hover:border-[#de3341]/30 hover:bg-[#de3341]/[0.02]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100dvh-65px)] flex-col">
      {/* Header with new conversation button */}
      <div className="flex justify-end border-b border-[#E5E7EB] px-10 py-3">
        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-2 text-[14px] font-medium text-[#0f0f0f] hover:bg-[#F5F5F5]"
        >
          Start new conversation
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[60%] rounded-2xl px-5 py-3 text-[14px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#de3341] text-white'
                    : 'bg-[#F5F5F5] text-[#0f0f0f]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input bar fixed at bottom */}
      <div className="border-t border-[#E5E7EB] px-10 py-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-center rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent py-2 text-[15px] text-[#0f0f0f] outline-none placeholder:text-[#9CA3AF]"
          />
          <button
            type="submit"
            className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#de3341] text-white hover:bg-[#c42d39]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8">
            <h3 className="mb-2 text-[18px] font-semibold text-[#0f0f0f]">
              Start new conversation?
            </h3>
            <p className="mb-6 text-[14px] leading-relaxed text-[#6B7280]">
              This will clear the current conversation.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#0f0f0f] hover:bg-[#F5F5F5]"
              >
                Cancel
              </button>
              <button
                onClick={resetConversation}
                className="rounded-xl bg-[#de3341] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#c42d39]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
