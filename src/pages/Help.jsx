import { useState } from 'react'

const sections = [
  {
    title: '1. Introduction',
    content: `Navigation bar is on the top, including home page, scRNA page, snATAC page, Spatial Metabolomics page, Spatial Transcriptomics page, help page, and about page. You can click the corresponding link to enter the page you want to visit.

Home page: The main page of the website, which provides a brief introduction of the website and the database, and a chat box with our AI assistant.

scRNA page: The page for you to visualize the expression of a single gene in epithelial cells or enteroendocrine cells, differential gene expression in different gut regions, and top marker gene expression in goblet cells.

snATAC page: This page allows you to visualize the IGV plots of a single gene in all cell types or epithelial cells.

Spatial Metabolomics page: This page displays differential detection of metabolite levels in fetal duodenum and colon tissues and allows users to visualize metabolite distribution.

Spatial Transcriptomics page: This page displays differential distribution of genes in different regions of fetal duodenum and colon tissues (e.g. crypt versus villi).

There are also the Help page and About page to show the tutorials and basic information of this website.`,
  },
  {
    title: '2. scRNA',
    content: `The page that enables you to visualize the expression of a single gene in epithelial cells or enteroendocrine cells. You can see the UMAP clustering of various cell types and the dot plot of characteristic marker genes of different cell types among epithelial cells or enteroendocrine cells. Additionally, a single gene can be entered in the query box to visualize the feature plot and violin plot of a single gene.

Region comparison page: This page shows the 3D volcano plot of the differential gene expression (DGE) analysis comparing the scRNA-seq data between the duodenum and colon tissues. Moreover, split violin plots are displayed to show the top duodenum and colon specific marker genes. You can also download the DEG list comparing duodenum and colon tissues in fetal and adult samples.

Goblet cells page: This page shows the MA plot of the top marker genes enriched in goblet cells compared to other epithelial cells. Split violin plots are displayed to show the top goblet cell marker genes. You can also download the marker list comparing goblet cells to other epithelial cell types.`,
  },
  {
    title: '3. snATAC',
    content: `This page allows you to visualize the accessibility of a single gene in all cell types cells or epithelial cells. You can see the UMAP clustering of various cell types and the dot plot of accessibility of gene loci close to characteristic marker genes of different cell types among all cells types or epithelial cells. Additionally, a single gene can be entered in the query box to visualize the IGV plot of a single gene.`,
  },
  {
    title: '4. Spatial Metabolomics',
    content: `This page shows the heatmap comparing the Log2(Fold Change (Duodenum/Colon)) of normalized metabolite levels of metabolites detected via MALDI imaging. You can click on individual metabolites to visualize the metabolite distribution in the fetal duodenum and colon tissues as well as quantification of the normalized metabolite levels in the fetal duodenum and colon tissues.`,
  },
  {
    title: '5. Spatial Transcriptomics',
    content: `This page displays the UMAP clustering of epithelial cell types in 17 and 20 week old fetal duodenum and colon tissues as well as the dot plot of characteristic marker genes used to identify different epithelial cell types. A drop down menu is provided with 422 genes. Individual genes can be clicked to visualize the expression and distribution of these genes across duodenum and colon tissues.`,
  },
]

export default function Help() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <div className="mx-auto max-w-4xl px-10 py-10">
      <h1 className="mb-10 text-center text-[42px] font-bold tracking-[-1px] text-[#1A1A1A]">
        Tutorials
      </h1>

      {/* YouTube embed */}
      <div className="relative mb-10 w-full overflow-hidden rounded-[20px]" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src="https://www.youtube-nocookie.com/embed/F1Tz5PHCGhs"
          title="Tutorial Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {sections.map((section, idx) => (
          <div key={idx} className="overflow-hidden rounded-[16px] bg-[#F5F5F5]">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="text-[16px] font-semibold text-[#1A1A1A]">{section.title}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[14px] font-medium text-[#6B7280]">
                {openIdx === idx ? '−' : '+'}
              </span>
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-6">
                <p className="whitespace-pre-line text-[14px] leading-[1.7] text-[#6B7280]">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
