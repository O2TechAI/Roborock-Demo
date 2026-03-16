# O2 AI Demo - TODO

## Phase 1-5: UI Redesign (Completed)
- [x] Define Service Fee mode tree data (raw materials only, labor cost)
- [x] Define Trading mode tree data (raw materials + 3rd party resale components)
- [x] Plan visual differentiation (colors, node styles, labels)
- [x] Update index.css to light/white background theme
- [x] Update App.tsx to light theme
- [x] Update demoData.ts with two separate tree datasets
- [x] Tree hidden until mode is selected
- [x] Show empty state before mode selection
- [x] After mode selection, render the correct tree data
- [x] Update stats bar to reflect mode-specific data
- [x] TeardownTree: light theme colors, mode-aware node styling
- [x] ChatPanel: light theme colors
- [x] Service Fee nodes: blue accent, show labor cost + material recovery
- [x] Trading nodes: green accent, show resale value + material recovery + disposal path
- [x] Verify both modes render correctly
- [x] Check readability on light background
- [x] Ensure smooth transitions

## Phase 6: Full-Stack Upgrade
- [x] Upgrade to full-stack with LLM API support
- [x] Resolve file conflicts from full-stack upgrade

## Phase 7: Enhanced Roborock S7 Teardown Data
- [x] Add more components to each of the 7 main assemblies
- [x] Create deeper hierarchical sub-components (3-4 levels deep)
- [x] Add realistic material quantities, weights, and values
- [x] Update financial tables to match enhanced data

## Phase 8: AI Integration
- [x] Create backend tRPC procedure for AI-powered product teardown analysis
- [x] Design JSON schema for structured AI responses (teardown tree + financials)
- [x] Implement AI system prompt for e-waste analysis expertise
- [x] Connect frontend to real AI API (replace mock thinking animation)
- [x] Support dynamic tree generation from AI responses
- [x] Support any product input (iPhone, server, etc.) via AI analysis

## Phase 9: Testing & Polish
- [x] Write vitest tests for AI analysis endpoint (7 tests passing)
- [x] Test full flow end-to-end
- [x] Save checkpoint

## Phase 10: Horizontal Tree Layout + Deeper Teardown
- [x] Deepen Roborock S7 teardown tree with more sub-component tiers (4-5 levels)
- [x] Add realistic material breakdowns at leaf level (e.g., motor coil → copper windings, magnets, bearings)
- [x] Ensure all disposal classifications are realistic (tradable, raw-material, hazmat, destroy-brand)
- [x] Rebuild TeardownTree component as horizontal left-to-right layout (Option B)
- [x] Add expand/collapse with child count badges
- [x] Add status badges (TRADABLE / RAW MAT / HAZMAT / DESTROY) on right edge
- [x] Update sellable parts table with revised pricing from deeper components
- [x] Update raw material recovery table with revised weights and values
- [x] Update cost breakdown and deal summaries accordingly
- [x] Update AI prompt for deeper tree generation (3-4 levels for AI-analyzed products)
- [x] Run tests and save checkpoint (7 tests passing)
