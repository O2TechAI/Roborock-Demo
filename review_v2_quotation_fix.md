# QuotationGenerator Fix Analysis

The component logic looks correct:
1. Steps advance with timers
2. When currentStep reaches the last step, isComplete is set to true after 600ms
3. AnimatePresence mode="wait" wraps the loading/complete states

The issue is likely AnimatePresence mode="wait" again - same issue we had before.
Need to replace with simple conditional rendering.

Also the quotation data looks good - different for Service vs Trading mode.
