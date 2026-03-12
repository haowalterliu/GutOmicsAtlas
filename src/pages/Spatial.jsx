import { useState, useRef, useEffect } from 'react'
import Placeholder from '../components/Placeholder'

/* ─── Spatial Metabolomics content ─── */

const metabolites = [
  'Glutamate', 'GABA', 'Taurine', 'Glycine', 'Aspartate',
  'Alanine', 'Serine', 'Proline', 'Valine', 'Leucine',
  'Isoleucine', 'Phenylalanine', 'Tyrosine', 'Tryptophan',
  'Histidine', 'Lysine', 'Arginine', 'Methionine',
]

const getColor = (row, col) => {
  const seed = (row * 3 + col) * 37 % 100
  if (seed < 25) return '#2563EB'
  if (seed < 50) return '#60A5FA'
  if (seed < 75) return '#FBBF24'
  return '#EF4444'
}

function MetabolomicsTab() {
  const [rowHeight, setRowHeight] = useState(40)
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex gap-10" style={{ minHeight: 'calc(100dvh - 220px)' }}>
      {/* Left: zoom + heatmap */}
      <div className="flex flex-1 gap-3">
        <div className="flex flex-col gap-2 pt-10">
          <button
            onClick={() => setRowHeight((h) => Math.min(72, h + 8))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[16px] font-medium text-[#0f0f0f] hover:bg-[#F5F5F5]"
          >+</button>
          <button
            onClick={() => setRowHeight((h) => Math.max(24, h - 8))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[16px] font-medium text-[#0f0f0f] hover:bg-[#F5F5F5]"
          >−</button>
        </div>
        <div className="flex-1 overflow-auto rounded-2xl bg-[#F5F5F5]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 bg-[#F5F5F5] px-4 py-3 text-left text-[12px] font-semibold text-[#9CA3AF]">Metabolite</th>
                {['Duodenum-#1', 'Duodenum-#2', 'Duodenum-#3'].map((col) => (
                  <th key={col} className="sticky top-0 bg-[#F5F5F5] px-4 py-3 text-center text-[12px] font-semibold text-[#9CA3AF]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metabolites.map((name, rowIdx) => (
                <tr
                  key={name}
                  onClick={() => setSelected(name)}
                  className={`cursor-pointer ${selected === name ? 'ring-2 ring-[#de3341] ring-inset' : 'hover:opacity-80'}`}
                  style={{ height: `${rowHeight}px` }}
                >
                  <td className="px-4 text-[13px] font-medium text-[#0f0f0f]">{name}</td>
                  {[0, 1, 2].map((colIdx) => (
                    <td key={colIdx} className="px-1" style={{ backgroundColor: getColor(rowIdx, colIdx) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: details */}
      <div className="flex flex-1 flex-col">
        {!selected ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-[15px] text-[#9CA3AF]">Click a metabolite on the left to view details</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h3 className="text-[22px] font-bold tracking-tight text-[#0f0f0f]">{selected}</h3>
            <Placeholder
              text={`Spatial Distribution — ${selected} (static JPG) · Top row: Duodenum samples D1, D2, D3 / Bottom row: Colon samples C1, C2, C3. Color = metabolite signal intensity (blue=low, red=high). Color scale bar 0%–100% at bottom. 3mm scale bar bottom-left.`}
              height="300px"
            />
            <Placeholder
              text={`Bar Chart — Duodenum vs Colon (static JPG) · X-axis: Duodenum vs Colon, Y-axis: Normalized Signal. Gray bar = mean, black dots = individual samples, error bars = SD.`}
              height="250px"
            />
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Spatial Transcriptomics content ─── */

const geneList = ['AADAC', 'APOA1', 'CHGA', 'CLCA1', 'EPCAM', 'FABP1', 'LGR5', 'LYZ', 'MUC2', 'MYC', 'TOP2A']

function TranscriptomicsTab() {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedGene, setSelectedGene] = useState(null)
  const wrapperRef = useRef(null)

  const filtered = search.trim()
    ? geneList.filter((g) => g.toLowerCase().startsWith(search.toLowerCase())).slice(0, 1)
    : []

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectGene = (gene) => {
    setSelectedGene(gene)
    setSearch(gene)
    setShowDropdown(false)
  }

  return (
    <div>
      {/* Overview */}
      <p className="mb-6 max-w-[65ch] text-[15px] text-[#6B7280]">
        Overview of cell type composition and marker gene expression across all spatial transcriptomics samples.
      </p>
      <div className="mb-14 grid grid-cols-2 gap-6">
        <Placeholder text="UMAP — Cell Types (Stem cells, TA cells, Enterocytes, Goblet cells, EECs)" height="360px" />
        <Placeholder text="Dot Plot — Marker Genes (LGR5, TOP2A, APOA1, CLCA1, CHGA)" height="360px" />
      </div>

      {/* Spatial area */}
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h2 className="mb-2 text-[24px] font-bold tracking-tight text-[#0f0f0f]">Cell type distribution</h2>
          <p className="mb-6 max-w-[65ch] text-[14px] leading-relaxed text-[#6B7280]">
            Spatial distribution of cell types across Duodenum and Colon tissue sections. Use as reference to identify cell type locations.
          </p>
          <div className="flex flex-col gap-5">
            <Placeholder text="Duodenum — Cell Distribution Map" height="280px" />
            <Placeholder text="Colon — Cell Distribution Map" height="280px" />
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-[24px] font-bold tracking-tight text-[#0f0f0f]">Gene expression</h2>
          <p className="mb-6 max-w-[65ch] text-[14px] leading-relaxed text-[#6B7280]">
            Search a gene to visualize its expression across tissue sections. Expression intensity is shown spatially for both Duodenum and Colon.
          </p>
          <div ref={wrapperRef} className="relative mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search gene..."
              className="w-full rounded-xl border border-[#E5E7EB] bg-white px-5 py-3 text-[14px] outline-none placeholder:text-[#9CA3AF] focus:border-[#de3341]"
            />
            {showDropdown && filtered.length > 0 && (
              <div className="absolute top-full z-10 mt-2 w-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
                {filtered.map((gene) => (
                  <button
                    key={gene}
                    onClick={() => selectGene(gene)}
                    className="w-full px-5 py-3 text-left text-[14px] text-[#0f0f0f] hover:bg-[#F5F5F5]"
                  >{gene}</button>
                ))}
              </div>
            )}
          </div>
          {!selectedGene ? (
            <p className="text-center text-[15px] text-[#9CA3AF]">Search a gene above to view its spatial expression.</p>
          ) : (
            <div>
              <h3 className="mb-4 text-[18px] font-bold italic text-[#0f0f0f]">{selectedGene}</h3>
              <div className="rounded-2xl bg-[#F5F5F5] p-5">
                <div className="grid grid-cols-2 gap-4">
                  <Placeholder
                    text={`Duodenum — ${selectedGene} spatial expression (pink gradient: deep pink=high, gray=low)`}
                    height="250px"
                  />
                  <Placeholder
                    text={`Colon — ${selectedGene} spatial expression (blue gradient: deep blue=high, gray=low)`}
                    height="250px"
                  />
                </div>
                <div className="mt-4 flex justify-between text-[12px] text-[#9CA3AF]">
                  <span>Color scale: 0.0 — 2.0 ({selectedGene})</span>
                  <span>X/Y: tissue section spatial coordinates</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Spatial page ─── */

export default function Spatial() {
  const [spatialTab, setSpatialTab] = useState('Spatial Metabolomics')

  return (
    <div className="mx-auto max-w-[1400px] px-10 py-12">
      {/* Layer 1: tab bar */}
      <div className="flex border-b border-[#E5E7EB] mb-8">
        {['Spatial Metabolomics', 'Spatial Transcriptomics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSpatialTab(tab)}
            className={`px-6 py-3 text-[15px] -mb-px border-b-2 ${
              spatialTab === tab
                ? 'border-[#de3341] text-[#de3341] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {spatialTab === 'Spatial Metabolomics' ? <MetabolomicsTab /> : <TranscriptomicsTab />}
    </div>
  )
}
