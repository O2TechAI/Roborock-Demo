# O2 AI Demo V2 — Full Requirements

## User Flow (from screenshots + description)

### Initial State
- Left panel: Empty chat with "Start a new conversation" + example queries (Roborock S7, iPhone 15 Pro, MacBook Pro)
- **Mode selector at TOP of chat panel** (Service Fee / Trading toggle) — always visible, can switch anytime
- Right panel: Empty state "Waiting for product identification"

### Step 1: User clicks "Roborock S7" example query
- Chat starts processing with AI thinking animation
- AI gradually shows analysis steps (thinking bubbles)

### Step 2: AI processes and shows teardown
- Right panel: Tree diagram appears gradually after analysis
- The teardown structure is the SAME for both modes (same physical components)
- But the FINANCIAL analysis differs

### Step 3: Right panel has TWO tabs: "Flow Diagram" and "Parts Revenue"
- Flow Diagram = tree teardown diagram
- Parts Revenue = financial table (different per mode!)

### Step 4: "Generate Quotation" button
- Shows a processing/progress bar page
- Then shows the full quotation with tabs

## Two Modes — Key Differences

### SERVICE FEE MODE
- O2 charges the client a service fee for processing
- Revenue = Service Fee from client + Raw Material Recovery
- Teardown tree: same components, but status shows DESTROY (brand/IP), RAW MATERIAL, NON-RECYCLABLE
- NO sellable parts (everything goes to material recovery or destruction)
- Financial tabs: Raw Materials, Cost Breakdown, Service Fee, Deal Summary
- Deal Summary: Service Fee revenue + Material recovery revenue - Costs = Profit

### TRADING MODE  
- O2 buys the e-waste from client (client gets cash upfront)
- Revenue = Sellable Parts (3rd party resale) + Raw Material Recovery
- Teardown tree: same components, but status shows THIRD-PARTY/TRADABLE, RAW MATERIAL, DESTROY, NON-RECYCLABLE
- HAS sellable parts (motors, switches, sensors sold to 3rd parties)
- Financial tabs: Sellable Parts, Raw Materials, Total Recovery, Cost Breakdown, Deal Summary
- Deal Summary: Parts revenue + Material recovery - Costs - Buyout price = Profit

## Script Data (from pasted_content.txt)
This is the TRADING mode data. For Service Fee mode:
- All "THIRD-PARTY / TRADABLE" items become "RAW MATERIAL" (copper/steel recovery)
- No sellable parts revenue
- Instead: service fee charged to client
- Labor cost is the main cost (same $25/hr)

## Teardown Tree Structure (both modes share this)
1. Top Assembly
   - Top cover (ABS/PC) — DESTROY brand
   - LiDAR turret housing (PC/PMMA) — RAW MATERIAL
   - LiDAR Module
     - LiDAR control PCB — DESTROY brand
     - LiDAR Rotation Motor — TRADABLE $1.20 (Trading) / RAW MATERIAL (Service)
2. Upper Sensor System
   - Bumper Micro Switch — TRADABLE $0.40 / RAW MATERIAL
   - Cliff/Obstacle Sensor Board — TRADABLE $0.60 / RAW MATERIAL
   - Sensor Mounting Bracket — RAW MATERIAL
3. Bottom Assembly
   - Bottom chassis (Glass-filled ABS) — RAW MATERIAL
   - Metal brackets & weights — RAW MATERIAL
4. Power System
   - Battery Cells (18650 Li-ion) — RAW MATERIAL Hazmat
   - BMS Control Board — DESTROY brand
   - Battery Wiring Harness — TRADABLE $0.50 / RAW MATERIAL
   - Battery Enclosure — RAW MATERIAL
5. Drive & Motion System
   - Wheel Drive Motors x2 — TRADABLE $3.00 / RAW MATERIAL
   - Wheel Gearbox — TRADABLE $0.80 / RAW MATERIAL
   - Main Brush Motor — TRADABLE $1.20 / RAW MATERIAL
   - Drive Shaft — RAW MATERIAL
   - Side Brush Motor — TRADABLE $0.80 / RAW MATERIAL
   - Side Brush Housing — RAW MATERIAL
6. Cleaning & Suction System
   - Suction Fan Motor — TRADABLE $1.50 / RAW MATERIAL
   - Roller Shaft — RAW MATERIAL
   - Rubber Brush Strip — NON-RECYCLABLE
   - Brush Frame — RAW MATERIAL
   - Dust Bin — RAW MATERIAL
   - HEPA Filter — NON-RECYCLABLE
7. Control & Electronics
   - Main control board — DESTROY brand
   - Internal wiring — TRADABLE $0.60 / RAW MATERIAL
