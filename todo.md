# O2 AI Demo Redesign - TODO

## Phase 1: Data Model & Visual Design
- [ ] Define Service Fee mode tree data (raw materials only, labor cost)
- [ ] Define Trading mode tree data (raw materials + 3rd party resale components)
- [ ] Plan visual differentiation (colors, node styles, labels)

## Phase 2: Light Theme
- [ ] Update index.css to light/white background theme
- [ ] Update App.tsx to light theme
- [ ] Update demoData.ts with two separate tree datasets

## Phase 3: Home Page Flow
- [ ] Tree hidden until mode is selected
- [ ] Show empty state before mode selection
- [ ] After mode selection, render the correct tree data
- [ ] Update stats bar to reflect mode-specific data

## Phase 4: Component Updates
- [ ] TeardownTree: light theme colors, mode-aware node styling
- [ ] ChatPanel: light theme colors
- [ ] Service Fee nodes: blue accent, show labor cost + material recovery
- [ ] Trading nodes: green accent, show resale value + material recovery + disposal path

## Phase 5: Test & Polish
- [ ] Verify both modes render correctly
- [ ] Check readability on light background
- [ ] Ensure smooth transitions
