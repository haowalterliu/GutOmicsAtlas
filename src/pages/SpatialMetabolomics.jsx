import { useState } from 'react'
import Placeholder from '../components/Placeholder'

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

export default function SpatialMetabolomics() {
  const [rowHeight, setRowHeight] = useState(40)
  const [selected, setSelected] = useState(null)

  const zoomIn = () => setRowHeight((h) => Math.min(72, h + 8))
  const zoomOut = () => setRowHeight((h) => Math.max(24, h - 8))

  return (
    <div className="mx-auto flex max-w-[1400px] gap-10 px-10 py-12" style={{ minHeight: 'calc(100dvh - 130px)' }}>
      {/* Left side: zoom + heatmap */}
      <div className="flex flex-1 gap-3">
        {/* Zoom buttons */}
        <div className="flex flex-col gap-2 pt-10">
          <button
            onClick={zoomIn}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[16px] font-medium text-[#0f0f0f] hover:bg-[#F5F5F5]"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[16px] font-medium text-[#0f0f0f] hover:bg-[#F5F5F5]"
          >
            −
          </button>
        </div>

        {/* Heatmap */}
        <div className="flex-1 overflow-auto rounded-2xl bg-[#F5F5F5]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 bg-[#F5F5F5] px-4 py-3 text-left text-[12px] font-semibold text-[#9CA3AF]">
                  Metabolite
                </th>
                {['Duodenum-#1', 'Duodenum-#2', 'Duodenum-#3'].map((col) => (
                  <th
                    key={col}
                    className="sticky top-0 bg-[#F5F5F5] px-4 py-3 text-center text-[12px] font-semibold text-[#9CA3AF]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metabolites.map((name, rowIdx) => (
                <tr
                  key={name}
                  onClick={() => setSelected(name)}
                  className={`cursor-pointer ${
                    selected === name
                      ? 'ring-2 ring-[#de3341] ring-inset'
                      : 'hover:opacity-80'
                  }`}
                  style={{ height: `${rowHeight}px` }}
                >
                  <td className="px-4 text-[13px] font-medium text-[#0f0f0f]">
                    {name}
                  </td>
                  {[0, 1, 2].map((colIdx) => (
                    <td
                      key={colIdx}
                      className="px-1"
                      style={{ backgroundColor: getColor(rowIdx, colIdx) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right side: details */}
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
