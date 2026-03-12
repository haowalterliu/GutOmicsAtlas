import { useState, useRef, useEffect } from 'react'
import Placeholder from '../components/Placeholder'

const geneList = ['AADAC', 'APOA1', 'CHGA', 'CLCA1', 'EPCAM', 'FABP1', 'LGR5', 'LYZ', 'MUC2', 'MYC', 'TOP2A']

export default function SpatialTranscriptomics() {
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
    <div className="mx-auto max-w-[1400px] px-10 py-12">
      {/* Overview */}
      <p className="mb-6 max-w-[65ch] text-[15px] text-[#6B7280]">
        Overview of cell type composition and marker gene expression across all spatial transcriptomics samples.
      </p>
      <div className="mb-14 grid grid-cols-2 gap-6">
        <Placeholder
          text="UMAP — Cell Types (Stem cells, TA cells, Enterocytes, Goblet cells, EECs)"
          height="360px"
        />
        <Placeholder
          text="Dot Plot — Marker Genes (LGR5, TOP2A, APOA1, CLCA1, CHGA)"
          height="360px"
        />
      </div>

      {/* Spatial area */}
      <div className="grid grid-cols-2 gap-10">
        {/* Left column: reference maps */}
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

        {/* Right column: gene search */}
        <div>
          <h2 className="mb-2 text-[24px] font-bold tracking-tight text-[#0f0f0f]">Gene expression</h2>
          <p className="mb-6 max-w-[65ch] text-[14px] leading-relaxed text-[#6B7280]">
            Search a gene to visualize its expression across tissue sections. Expression intensity is shown spatially for both Duodenum and Colon.
          </p>

          {/* Autocomplete search */}
          <div ref={wrapperRef} className="relative mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowDropdown(true)
              }}
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
                  >
                    {gene}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {!selectedGene ? (
            <p className="text-center text-[15px] text-[#9CA3AF]">
              Search a gene above to view its spatial expression.
            </p>
          ) : (
            <div>
              <h3 className="mb-4 text-[18px] font-bold italic text-[#0f0f0f]">
                {selectedGene}
              </h3>
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
