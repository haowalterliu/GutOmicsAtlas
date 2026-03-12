import { useState } from 'react'
import Placeholder from '../components/Placeholder'

function ChartLabel({ title }) {
  return <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide mb-1.5">{title}</p>
}

export default function ScRNA() {
  const [mainTab, setMainTab] = useState('scRNA')
  const [cellType, setCellType] = useState('Epithelial')
  const [ageTab, setAgeTab] = useState('Fetal')
  const [gene, setGene] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submittedGene, setSubmittedGene] = useState('')
  const [error, setError] = useState('')

  const isScRNA = mainTab === 'scRNA'
  const isEpithelial = cellType === 'Epithelial'
  const cellOptions = isScRNA ? ['Epithelial', 'Enteroendocrine'] : ['All Cell Types', 'Epithelial']

  const resetQuery = () => {
    setSubmitted(false)
    setGene('')
    setEmail('')
    setSubmittedGene('')
    setError('')
  }

  const handleMainTab = (tab) => {
    setMainTab(tab)
    setCellType(tab === 'scRNA' ? 'Epithelial' : 'All Cell Types')
    setAgeTab('Fetal')
    resetQuery()
  }

  const handleCellType = (type) => {
    setCellType(type)
    resetQuery()
  }

  const handleAge = (age) => {
    setAgeTab(age)
    resetQuery()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = gene.trim()
    if (!trimmed) return
    if (!isScRNA && /^chr/i.test(trimmed)) {
      setError('Please enter a gene name, e.g. EPCAM, LGR5')
      return
    }
    setError('')
    setSubmittedGene(trimmed)
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-10 py-12">

      {/* Layer 1: scRNA | snATAC — left-aligned underline tabs */}
      <div className="flex border-b border-[#E5E7EB] mb-0">
        {['scRNA', 'snATAC'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleMainTab(tab)}
            className={`px-6 py-3 text-[15px] -mb-px border-b-2 ${
              mainTab === tab
                ? 'border-[#de3341] text-[#de3341] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Layer 2: Independent big buttons — gray background strip */}
      <div className="-mx-10 px-10 py-4 bg-[#F3F4F6] mb-6 flex gap-3">
        {cellOptions.map((type) => (
          <button
            key={type}
            onClick={() => handleCellType(type)}
            className={`rounded-xl border px-8 py-3 text-[14px] font-medium ${
              cellType === type
                ? 'border-[#de3341] bg-[#fef2f2] text-[#de3341] font-semibold'
                : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1A1A1A]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Layer 3: Fetal/Adult segmented pill */}
      {isScRNA && (
        <div className="mb-8">
          <div className="inline-flex rounded-full bg-[#F3F4F6] p-1">
            {['Fetal', 'Adult'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleAge(tab)}
                className={`rounded-full px-5 py-2 text-[13px] font-medium ${
                  ageTab === tab
                    ? 'bg-white border border-[#E5E7EB] text-[#1A1A1A]'
                    : 'text-[#6B7280] hover:text-[#1A1A1A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main dashboard: left (UMAP + Dot Plot stacked) | right (Result Chart) */}
      {isScRNA ? (
        <div className="mb-12 grid grid-cols-[2fr_3fr] gap-8 items-start">
          {/* Left: stacked smaller charts */}
          <div className="flex flex-col gap-6">
            <div>
              <ChartLabel title="UMAP Plot" />
              <Placeholder text={`UMAP — ${ageTab} ${cellType}`} height="240px" />
            </div>
            <div>
              <ChartLabel title="Dot Plot — Marker Gene Expression" />
              <Placeholder text={`Dot Plot — Marker Gene Expression · ${ageTab} ${cellType}`} height="240px" />
            </div>
          </div>

          {/* Right: Result Chart with inline search in header */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide">Result Chart</p>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={gene}
                  onChange={(e) => { setGene(e.target.value); setError('') }}
                  placeholder="Enter gene name..."
                  className="h-7 w-48 rounded-md border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none placeholder:text-[#9CA3AF] focus:border-[#de3341]"
                />
                <button
                  type="submit"
                  className="h-7 rounded-md bg-[#de3341] px-3 text-[12px] font-semibold text-white hover:bg-[#c42d39]"
                >
                  Search
                </button>
              </form>
            </div>
            {error && <p className="mb-1 text-[11px] text-[#de3341]">{error}</p>}

            {!submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6]"
                style={{ height: '504px' }}
              >
                {isEpithelial ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-80 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] outline-none placeholder:text-[#9CA3AF] focus:border-[#de3341]"
                    />
                    <p className="text-[13px] text-[#9CA3AF]">
                      Enter your email to be notified when results are ready.
                    </p>
                  </>
                ) : (
                  <p className="text-[14px] text-[#6B7280]">
                    Search a gene above to view the result chart.
                  </p>
                )}
              </div>
            ) : (
              <Placeholder
                text={`Gene Expression Result Chart — ${submittedGene}`}
                height="504px"
              />
            )}
          </div>
        </div>
      ) : (
        /* snATAC dashboard — same 2-col layout as scRNA */
        <div className="mb-12 grid grid-cols-[2fr_3fr] gap-8 items-start">
          {/* Left: stacked smaller charts */}
          <div className="flex flex-col gap-6">
            <div>
              <ChartLabel title="UMAP Plot" />
              <Placeholder text={`UMAP — ${cellType}`} height="240px" />
            </div>
            <div>
              <ChartLabel title="Dot Plot — Gene Activity (Signac)" />
              <Placeholder text={`Dot Plot — Gene Activity (Signac) · ${cellType}`} height="240px" />
            </div>
          </div>

          {/* Right: Result Chart with inline search in header */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide">Result Chart</p>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={gene}
                  onChange={(e) => { setGene(e.target.value); setError('') }}
                  placeholder="Enter gene name, e.g. EPCAM, LGR5"
                  className="h-7 w-52 rounded-md border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none placeholder:text-[#9CA3AF] focus:border-[#de3341]"
                />
                <button
                  type="submit"
                  className="h-7 rounded-md bg-[#de3341] px-3 text-[12px] font-semibold text-white hover:bg-[#c42d39]"
                >
                  Search
                </button>
              </form>
            </div>
            {error && <p className="mb-1 text-[11px] text-[#de3341]">{error}</p>}

            {!submitted ? (
              <div
                className="flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F3F4F6]"
                style={{ minHeight: '504px' }}
              >
                <p className="text-[14px] text-[#6B7280]">Search a gene above to view the result chart.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] p-4">
                <div className="grid grid-cols-[1fr_180px] gap-4">
                  <div className="flex flex-col gap-3">
                    <ChartLabel title="Coverage Plot" />
                    <Placeholder
                      text={`Coverage Plot — ${submittedGene} · Chromatin signal tracks per cell type, colored waveform, Y-axis: Normalized signal`}
                      height="300px"
                    />
                    <ChartLabel title="Genes Track" />
                    <Placeholder
                      text="Genes Track — Blue gene structure diagram (chromosomal position & orientation)"
                      height="50px"
                    />
                    <ChartLabel title="Peaks Track" />
                    <Placeholder
                      text="Peaks Track — Gray blocks (chromatin-open peak positions)"
                      height="50px"
                    />
                    <p className="text-center text-[12px] text-[#9CA3AF]">Chromosomal coordinates (bp)</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <ChartLabel title="UMAP Reference" />
                    <Placeholder text="UMAP Reference" height="145px" />
                    <ChartLabel title="Dot Plot Reference" />
                    <Placeholder text="Dot Plot Reference" height="145px" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* scRNA Epithelial-only sections */}
      {isScRNA && isEpithelial && (
        <>
          {/* Region Comparison */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[24px] font-bold tracking-tight text-[#0f0f0f]">Region comparison</h2>
              <button className="shrink-0 rounded-lg border border-[#1A1A1A] px-4 py-1.5 text-[12px] font-medium text-[#1A1A1A] hover:bg-[#F3F4F6]">
                Download DEG List (CSV)
              </button>
            </div>
            <p className="mb-6 max-w-[65ch] text-[14px] text-[#6B7280]">
              Differential gene expression between duodenum and colon tissues.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <ChartLabel title="MA Plot — Small Intestine" />
                <Placeholder text="MA Plot — Small Intestine (Log2FC vs Log10 Avg Expression)" height="300px" />
              </div>
              <div>
                <ChartLabel title="MA Plot — Colon" />
                <Placeholder text="MA Plot — Colon (Log2FC vs Log10 Avg Expression)" height="300px" />
              </div>
            </div>
          </section>

          {/* Goblet Cells */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[24px] font-bold tracking-tight text-[#0f0f0f]">Goblet cells</h2>
              <button className="shrink-0 rounded-lg border border-[#1A1A1A] px-4 py-1.5 text-[12px] font-medium text-[#1A1A1A] hover:bg-[#F3F4F6]">
                Download DEG List (CSV)
              </button>
            </div>
            <p className="mb-6 max-w-[65ch] text-[14px] text-[#6B7280]">
              Top marker genes enriched in goblet cells compared to other epithelial cells.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <ChartLabel title="MA Plot — Goblet Cells" />
                <Placeholder text="MA Plot — Goblet Cells (top marker genes vs other epithelial cells)" height="300px" />
              </div>
              <div>
                <ChartLabel title="Violin Plot — Goblet Cell Marker Genes" />
                <Placeholder text="Violin Plot — Goblet Cell Marker Genes" height="300px" />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
