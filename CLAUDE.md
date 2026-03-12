# GutOmicsAtlas — Project Brief for Claude Code

## What We're Building

A React + Vite + Tailwind CSS frontend mockup for **GutOmicsAtlas**, a bioinformatics website for the Chen Laboratory at Weill Cornell Medicine. This is a **UI-only mockup** — no real API calls, all charts and data are static placeholders.

---

## Tech Stack

- **React + Vite**
- **Tailwind CSS** (utility-first, no component libraries)
- **React Router** for client-side navigation
- **Font**: Montserrat (import from Google Fonts)
- No backend, no API calls, no localStorage

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| Background | `#FFFFFF` | All page backgrounds |
| Text primary | `#1A1A1A` | Headings, body |
| Text secondary | `#6B7280` | Captions, labels, timestamps |
| Border | `#E5E7EB` | Cards, dividers, inputs |
| Hover bg | `#F3F4F6` | Hover state on interactive elements |
| Accent (only one) | `#1A1A1A` | Active nav underline, primary buttons |

> No red. No brand color. No gradients. No shadows of any kind (`shadow-none` everywhere).

### Typography (Montserrat)
| Role | Size | Weight | Letter Spacing |
|---|---|---|---|
| H1 | 32px | 700 | -0.5px |
| H2 | 24px | 600 | 0 |
| H3 | 18px | 600 | 0 |
| Body | 14px | 400 | 0 |
| Caption | 12px | 400 | 0 |
| Line height (body) | 1.6 | — | — |

### Spacing (4px base)
Use: `4 / 8 / 12 / 16 / 24 / 32 / 48px`

### Border Radius
| Element | Radius |
|---|---|
| Cards | 12px |
| Buttons | 8px |
| Inputs | 8px |
| Chips / Tags | 9999px |

### Shadows
**None. Zero. Do not add any box-shadow anywhere.**

### Navbar Active State
- Bottom border: `2px solid #1A1A1A`
- Font weight: `600`
- No background color change
- No shadow

---

## Project Structure

```
src/
├── main.jsx
├── App.jsx               # Router setup
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Placeholder.jsx   # Gray placeholder for missing images/charts
└── pages/
    ├── Home.jsx
    ├── Chat.jsx
    ├── ScRNA.jsx
    ├── SnATAC.jsx
    ├── SpatialMetabolomics.jsx
    ├── SpatialTranscriptomics.jsx
    ├── Help.jsx
    └── About.jsx
```

---

## Navigation

```
Home | Chat with AI | scRNA | snATAC | Spatial Metabolomics | Spatial Transcriptomics | Help | About
```

- Logo placeholder on the **left** (gray rectangle, text "GutOmicsAtlas")
- Nav links on the **right**
- Active state: 2px black underline + weight 600
- White background, `border-bottom: 1px solid #E5E7EB`
- No shadow

---

## Placeholder Component

Any missing image, chart, or visual should render as:

```
bg: #F3F4F6
border: 1px solid #E5E7EB
border-radius: 12px
text: [description of what goes here, e.g. "UMAP Chart — Fetal Epithelial"]
text color: #6B7280
text size: 12px
centered vertically and horizontally
```

---

## Page Specifications

### 1. Home Page (`/`)

**Initial state (top to bottom, all centered):**
1. H1: "Welcome to GutOmicsAtlas"
2. Caption: "Answer questions and generate images about this website, or GLKB (Genomic Literature Knowledge Base) to help you explore biomedical literature."
3. Full-width input bar with send button (placeholder: "Ask a question...")
4. 6 Suggested Question cards in a 3×2 grid

**Suggested Question cards text:**
1. "What is ACSL5?"
2. "Please tell me the role of LGR5 in intestinal stem cells."
3. "Can you show the expression of CHGA?"
4. "GLKB: What is the role of BRCA1 in breast cancer?"
5. "Please show me the differential metabolite expression of GABA in duodenum versus colon tissues."
6. "GLKB: How many articles about Alzheimer's disease are published in 2020?"

**Conversation state** (after user sends a message):
- Hide: H1, caption, suggested question cards
- Show: conversation area (user bubbles right, AI bubbles left), "Start new conversation" button (top-right), input bar fixed at bottom
- Chat bubbles: max-width 60%, border-radius 12px, body 14px, no timestamp
  - User bubble: `bg #1A1A1A`, white text
  - AI bubble: `bg #F3F4F6`, `#1A1A1A` text, left-aligned

**Start New Conversation:**
- Click → confirmation modal appears
- Confirm → clear conversation, return to initial state
- Cancel → close modal, keep conversation

---

### 2. scRNA Page (`/scrna`)

**Filters (top of page, horizontal):**
- Row 1 — Tab: `Fetal` | `Adult`
- Row 2 — Segmented control: `Epithelial` | `Enteroendocrine`
- No loading skeleton on filter change; charts swap instantly

**Dashboard (two columns, always visible):**
- Left: UMAP scatter plot placeholder
- Right: Dot plot placeholder (Marker gene expression)
- Both placeholders labeled with current filter state, e.g. "UMAP — Fetal Epithelial"

**Additional sections (Epithelial mode only, below dashboard):**

Region Comparison section:
- Section title: "Region Comparison"
- Two MA plots side by side (placeholders): left labeled "MA Plot — Small Intestine (Log2FC vs Log10 Avg Expression)", right labeled "MA Plot — Colon (Log2FC vs Log10 Avg Expression)"
- "Download DEG List (CSV)" button below both plots, black filled, 8px radius

Goblet Cells section:
- Section title: "Goblet Cells"
- Left: MA plot placeholder labeled "MA Plot — Goblet Cells (top marker genes vs other epithelial cells)"
- Right: Violin plot placeholder labeled "Violin Plot — Goblet Cell Marker Genes"
- "Download DEG List (CSV)" button below

**Query Card (full width, below all charts):**

Epithelial state (default):
- Gene input field + Email input field + Submit button
- Email field shown by default with label: "Enter your email to be notified when results are ready."
- While processing: email field shows the prompt text above

Enteroendocrine state:
- Gene input field + Submit button only (no email field)
- Results display directly without email notification

After query submitted → result chart placeholder replaces the input fields, labeled "Gene Expression Result Chart — [gene name]"

> ⚠ scRNA gene query result chart visual details: screenshots to be provided during vibe coding. Use placeholder for now.

---

### 3. snATAC Page (`/snatac`)

**Filters:**
- Row 1 — Tab: `All Cell Types` | `Epithelial`

**Dashboard (two columns, always visible):**
- Left: UMAP placeholder
- Right: Dot plot placeholder labeled "Gene Activity (Signac)"
- Colors in Coverage Plot cell type tracks should match UMAP legend colors

**Query Card:**
- Input: gene name only (validate: reject if format is `chr` + coordinates, show inline error "Please enter a gene name, e.g. EPCAM, LGR5")
- Placeholder: "Enter gene name, e.g. EPCAM, LGR5"
- Submit button

After query → Coverage plot result area with sub-placeholders:
- Main coverage plot (large, left) — labeled "Coverage Plot — [gene name] · Chromatin signal tracks per cell type, colored waveform, Y-axis: Normalized signal"
- UMAP thumbnail (top right, small) — labeled "UMAP Reference"
- Dot plot thumbnail (bottom right, small) — labeled "Dot Plot Reference"
- Genes track (below main plot) — labeled "Genes Track — Blue gene structure diagram (chromosomal position & orientation)"
- Peaks track (below genes track) — labeled "Peaks Track — Gray blocks (chromatin-open peak positions)"
- X-axis label: "Chromosomal coordinates (bp)"

> No email notification on snATAC — results display directly after query.
> ⚠ Coverage plot visual details (track colors, waveform style): screenshots to be provided during vibe coding.

---

### 4. Spatial Metabolomics Page (`/spatial-metabolomics`)

**Layout: left-right split**

Left side:
- `+` / `-` zoom buttons (vertical stack, far left)
  - Default row height: 40px
  - Each click changes row height by ±8px (min 24px, max 72px)
- Heatmap (scrollable, 3 columns: Duodenum-#1, #2, #3 × N metabolite rows)
  - Use mock data: 15–20 rows of fake metabolite names
  - Clicking a row highlights it and updates the right panel
  - Row colors simulate a gradient (use inline style or Tailwind arbitrary values)

Right side:
- **Default state**: centered prompt text "Click a metabolite on the left to view details" (`#6B7280`, 14px)
- **After click**: 
  - Metabolite name as H3 title
  - Spatial distribution image placeholder with description: "Spatial Distribution — [metabolite name] (static JPG) · Top row: Duodenum samples D1, D2, D3 / Bottom row: Colon samples C1, C2, C3. Color = metabolite signal intensity (blue=low, red=high). Color scale bar 0%–100% at bottom. 3mm scale bar bottom-left."
  - Bar chart placeholder with description: "Bar Chart — Duodenum vs Colon (static JPG) · X-axis: Duodenum vs Colon, Y-axis: Normalized Signal. Gray bar = mean, black dots = individual samples, error bars = SD."

> ⚠ Spatial distribution image and bar chart are static JPGs — placeholders only during mockup. Screenshots to be provided during vibe coding.

---

### 5. Spatial Transcriptomics Page (`/spatial-transcriptomics`)

**Overview area (top, two columns):**
- Small description: "Overview of cell type composition and marker gene expression across all spatial transcriptomics samples."
- Left: UMAP placeholder (cell types: Stem cells, TA cells, Enterocytes, Goblet cells, EECs)
- Right: Dot plot placeholder (genes: LGR5, TOP2A, APOA1, CLCA1, CHGA)

**Spatial area (below overview, two columns):**

Left column (always visible):
- Section title + description: "Spatial distribution of cell types across Duodenum and Colon tissue sections. Use as reference to identify cell type locations."
- Duodenum cell distribution map placeholder
- Colon cell distribution map placeholder

Right column:
- Section title + description: "Search a gene to visualize its expression across tissue sections. Expression intensity is shown spatially for both Duodenum and Colon."
- Autocomplete search bar (max 1 result shown in dropdown)
  - Mock gene list: ["AADAC", "APOA1", "CHGA", "CLCA1", "EPCAM", "FABP1", "LGR5", "LYZ", "MUC2", "MYC", "TOP2A"]
- Default state: prompt text "Search a gene above to view its spatial expression."
- After query: gene name as **bold italic** title + one card containing two placeholders side by side:
  - Left: "Duodenum — [gene name] spatial expression (pink gradient: deep pink=high, gray=low)"
  - Right: "Colon — [gene name] spatial expression (blue gradient: deep blue=high, gray=low)"
  - Each side has a color scale bar (0.0–2.0) labeled with gene name
  - X/Y axes labeled as tissue section spatial coordinates
- Left reference panel always visible, never affected by gene search
- Searching a new gene directly updates right panel — no "Back" button needed

> ⚠ Gene expression spatial maps are static images — placeholders only. Screenshots to be provided during vibe coding.

---

### 6. Help Page (`/help`)

- H1: "Tutorials" (centered)
- YouTube embed: `https://www.youtube-nocookie.com/embed/F1Tz5PHCGhs` — full width, 16:9 aspect ratio
- Accordion cards (collapsed by default), one per section, use exact text below:

**[1. Introduction]**
Navigation bar is on the top, including home page, scRNA page, snATAC page, Spatial Metabolomics page, Spatial Transcriptomics page, help page, and about page. You can click the corresponding link to enter the page you want to visit.

Home page: The main page of the website, which provides a brief introduction of the website and the database, and a chat box with our AI assistant.

scRNA page: The page for you to visualize the expression of a single gene in epithelial cells or enteroendocrine cells, differential gene expression in different gut regions, and top marker gene expression in goblet cells.

snATAC page: This page allows you to visualize the IGV plots of a single gene in all cell types or epithelial cells.

Spatial Metabolomics page: This page displays differential detection of metabolite levels in fetal duodenum and colon tissues and allows users to visualize metabolite distribution.

Spatial Transcriptomics page: This page displays differential distribution of genes in different regions of fetal duodenum and colon tissues (e.g. crypt versus villi).

There are also the Help page and About page to show the tutorials and basic information of this website.

**[2. scRNA]**
The page that enables you to visualize the expression of a single gene in epithelial cells or enteroendocrine cells. You can see the UMAP clustering of various cell types and the dot plot of characteristic marker genes of different cell types among epithelial cells or enteroendocrine cells. Additionally, a single gene can be entered in the query box to visualize the feature plot and violin plot of a single gene.

Region comparison page: This page shows the 3D volcano plot of the differential gene expression (DGE) analysis comparing the scRNA-seq data between the duodenum and colon tissues. Moreover, split violin plots are displayed to show the top duodenum and colon specific marker genes. You can also download the DEG list comparing duodenum and colon tissues in fetal and adult samples.

Goblet cells page: This page shows the MA plot of the top marker genes enriched in goblet cells compared to other epithelial cells. Split violin plots are displayed to show the top goblet cell marker genes. You can also download the marker list comparing goblet cells to other epithelial cell types.

**[3. snATAC]**
This page allows you to visualize the accessibility of a single gene in all cell types cells or epithelial cells. You can see the UMAP clustering of various cell types and the dot plot of accessibility of gene loci close to characteristic marker genes of different cell types among all cells types or epithelial cells. Additionally, a single gene can be entered in the query box to visualize the IGV plot of a single gene.

**[4. Spatial Metabolomics]**
This page shows the heatmap comparing the Log2(Fold Change (Duodenum/Colon)) of normalized metabolite levels of metabolites detected via MALDI imaging. You can click on individual metabolites to visualize the metabolite distribution in the fetal duodenum and colon tissues as well as quantification of the normalized metabolite levels in the fetal duodenum and colon tissues.

**[5. Spatial Transcriptomics]**
This page displays the UMAP clustering of epithelial cell types in 17 and 20 week old fetal duodenum and colon tissues as well as the dot plot of characteristic marker genes used to identify different epithelial cell types. A drop down menu is provided with 422 genes. Individual genes can be clicked to visualize the expression and distribution of these genes across duodenum and colon tissues.

---

### 7. About Page (`/about`)

**Lab introduction (two columns):**
- Left:
  - H2: "Welcome to Shuibing Chen Laboratory!"
  - Body (full text, use exactly): "The major research interest in the Chen Laboratory is to apply human pluripotent stem cell (hPSC)-derived cells/organoids to model human diseases and perform drug screens toward development of novel therapeutics. We have identified many small molecules controlling stem cell fate decision using high throughput/content chemical screens. By combining gene targeting, directed differentiation, human organoids, and humanized mouse models, we have established several unique models to systematically explore the role of genetic and/or environmental factors in disease progression. We establish proof-of-principle that "disease in a dish" models that can be adapted to high throughput/content screening platforms and to discover drug candidates for precision therapy."
  - Caption below body: "If you have any questions about this website, please don't hesitate to contact anyone of the members below!"
- Right: placeholder labeled "hPSC Research Cycle Diagram" (image to be provided during vibe coding), inside a white card with border `#E5E7EB`, fills column width

**Team member list (below, vertical):**

Alternating row backgrounds: `#FFFFFF` / `#F9FAFB`

Each row contains:
- Photo: square placeholder (64×64px), left-aligned, `bg #F3F4F6`, border-radius 8px
- Name: bold, `#1A1A1A`, 16px (PRD originally said "dark red" — overridden by our design system, use black)
- Title: `#6B7280`, 12px
- Email: `<a href="mailto:...">` link, `#1A1A1A`, underline on hover
- Bio: 14px, line-height 1.6 (use placeholder text "Bio coming soon." for all members)

| Name | Title | Email |
|---|---|---|
| J. Jeya Vandana, B.Sc. | Graduate Student | jjv4001@med.cornell.edu |
| Dongliang Leng, PhD. | Postdoc | dol4005@med.cornell.edu |
| Tiancheng Jiao | Undergraduate Student | tcjiao@umich.edu |
| Ricky Han, B.S. | Graduate Student (Bioinformatics) | rickyhan@umich.edu |
| Yuanhao Huang | Graduate Student | hyhao@umich.edu |
| Kevin Chang | Undergraduate Student | kvchang@umich.edu |

---

## Footer (all pages)

```
Copyright © Chen lab at Weill Cornell Medicine 2024 All rights reserved.
```
- Centered
- 12px
- `#6B7280`
- `border-top: 1px solid #E5E7EB`
- padding: 24px

---

---

## Pending Items (Screenshots to be Provided Later)

The following sections use placeholders now and will be replaced with real screenshots during vibe coding:

- **scRNA** — gene query result chart (feature plot / violin plot)
- **snATAC** — Coverage plot track styles and waveform colors
- **Spatial Metabolomics** — spatial distribution image (JPG) and bar chart (JPG)
- **Spatial Transcriptomics** — gene expression spatial maps (Duodenum pink gradient, Colon blue gradient)
- **About** — all team member photos + hPSC research cycle diagram

- No red or brand colors anywhere
- No box-shadow anywhere
- No animations or transitions (keep it static and clean)
- No lorem ipsum — use real content from this document
- No external UI libraries (no shadcn, no MUI, no Radix) — pure Tailwind only
- Do not connect to any API

---

## How to Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`
