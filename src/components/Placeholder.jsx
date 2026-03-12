export default function Placeholder({ text, height = '300px', className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#F5F5F5] px-6 ${className}`}
      style={{ minHeight: height }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0f0f0f 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      <p className="relative max-w-md text-center text-[12px] leading-relaxed text-[#9CA3AF]">{text}</p>
    </div>
  )
}
