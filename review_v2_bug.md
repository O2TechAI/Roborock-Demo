# Bug: Right panel not switching to analysis view

## Observation
- Left panel: Shows the AI analysis result correctly (Analysis Complete — Roborock S7)
- Right panel: Still shows "Analyzing Product..." with loading animation
- The "Generate Quotation" button appeared in the header (good!)

## Diagnosis
The right panel is stuck on the "empty" view with isProcessing=true state.
The issue is likely that the rightView state is not being set to 'analysis' correctly.
Looking at the code, the rightView is set in the runThinkingSequence callback.
The issue might be that the AnimatePresence is not properly handling the state transition.

Actually looking more carefully - the right panel shows "Analyzing Product..." which is the isProcessing=true state of the empty view. But the analysisComplete state should be true and rightView should be 'analysis'.

Wait - looking at the markdown extraction, it says "Analyzing Product..." is still showing. But the Generate Quotation button appeared, which means analysisComplete is true. So rightView should be 'analysis'.

The issue might be that AnimatePresence mode="wait" is preventing the transition. Let me check.
