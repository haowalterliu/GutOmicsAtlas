import { useState } from 'react'
import Placeholder from '../components/Placeholder'

export default function SnATAC() {
  const [filterTab, setFilterTab] = useState('All Cell Types')
  const [gene, setGene] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submittedGene, setSubmittedGene] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = gene.trim()
    if (!trimmed) return
    if (/^chr/i.test(trimmed)) {
      setError('Please enter a gene name, e.g. EPCAM, LGR5')
      return
    }
    setError('')
    setSubmittedGene(trimmed)
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-10 py-12">
      {/* Filter */}
      <div className="mb-10 flex gap-2">
        {['All Cell Types', 'Epithelial'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilterTab(tab)
              setSubmitted(false)
              setGene('')
              setError('')
            }}
            className={`rounded-lg px-5 py-2.5 text-[14px] font-medium ${
              filterTab === tab
                ? 'bg-[#de3341] text-white'
                : 'border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#0f0f0f]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      <div className="mb-12 grid grid-cols-2 gap-6">
        <Placeholder text={`UMAP — ${filterTab}`} height="360px" />
        <Placeholder text={`Dot Plot — Gene Activity (Signac) · ${filterTab}`} height="360px" />
      </div>

      {/* Query Card */}
      <section className="rounded-2xl bg-[#F5F5F5] p-8">
        <h3 className="mb-4 text-[16px] font-semibold text-[#0f0f0f]">Gene query</h3>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-3">
              <input
                type="text"
                value={gene}
                onChange={(e) => {
                  setGene(e.target.value)
                  setError('')
                }}
                placeholder="Enter gene name, e.g. EPCAM, LGR5"
                className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-5 py-3 text-[14px] outline-none placeholder:text-[#9CA3AF] focus:border-[#de3341]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#de3341] px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#c42d39]"
              >
                Submit
              </button>
            </div>
            {error && <p className="ml-2 text-[13px] text-red-500">{error}</p>}
          </form>
        ) : (
          <div>
            {/* Coverage plot result area */}
            <div className="grid grid-cols-[1fr_300px] gap-4">
              {/* Left: main coverage plot */}
              <div className="flex flex-col gap-4">
                <Placeholder
                  text={`Coverage Plot — ${submittedGene} · Chromatin signal tracks per cell type, colored waveform, Y-axis: Normalized signal`}
                  height="360px"
                />
                <Placeholder
                  text="Genes Track — Blue gene structure diagram (chromosomal position & orientation)"
                  height="60px"
                />
                <Placeholder
                  text="Peaks Track — Gray blocks (chromatin-open peak positions)"
                  height="60px"
                />
                <p className="text-center text-[13px] text-[#9CA3AF]">Chromosomal coordinates (bp)</p>
              </div>
              {/* Right: thumbnails */}
              <div className="flex flex-col gap-4">
                <Placeholder text="UMAP Reference" height="175px" />
                <Placeholder text="Dot Plot Reference" height="175px" />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
