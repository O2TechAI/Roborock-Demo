# Final Polish Plan

## Current State Assessment
All components are working:
- ChatPanel: dark sidebar, mode toggle at top, example queries, AI thinking animation
- TeardownTree: interactive tree with zoom/drag, mode-aware status badges
- PartsRevenue: tabbed financial tables (different tabs per mode)
- QuotationGenerator: progress bar animation + final quotation card
- Home: orchestrates the full flow

## Issues from the pasted script comparison

### 1. Service Fee Deal Summary is WRONG
The pasted script says:
- Revenue from Service Fee: $20,000
- Revenue from Robots (recovered assets): $6,750
- Total Cost: ($13,000)
- Total Profit: $13,750

But our demoData says:
- Revenue from Service Fee: $20,000
- Revenue from Recovered Materials: $1,450 (WRONG - should be $6,750)
- Total Cost: ($10,000) + Other Costs ($3,000) = ($13,000) (OK)
- Total Profit: $8,450 (WRONG - should be $13,750)

FIX: In service fee mode, the company ALSO recovers sellable parts + raw materials = $10.60 + $2.90 = $13.50/unit
Wait - re-reading: "Revenue from Robots" = $6,750 = total recoverable value (parts + materials)
So service fee mode: service fee revenue ($20k) + robot recovery revenue ($6,750) - total cost ($13,000) = $13,750

### 2. QuotationGenerator financial numbers need updating
- Service: totalRevenue should be 20000 + 6750 = 26750, totalCost = 13000, profit = 13750
- Trading: needs different numbers

### 3. The PartsRevenue "Service Fee" tab shows cost breakdown differently
Need to verify all numbers match the script exactly.

## Key fixes needed:
1. Fix serviceFeeDealSummary in demoData.ts
2. Fix QuotationGenerator numbers
3. Verify all financial data matches the pasted script
4. Test the complete flow
