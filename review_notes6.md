# Key Finding - Diagram Not Rendering

The right panel shows stats bar but the diagram area below is completely empty/dark.
The markdown extraction mentions "Waiting for Product Identification" which is the empty state.

This means showDiagram is true (stats bar shows) but the AnimatePresence is still showing 
the empty state OR the diagram is rendering but invisible.

The issue: The AnimatePresence mode="wait" means the exit animation of the empty state must 
complete before the diagram enters. But the empty state has no exit animation defined 
(only initial and animate, no exit). Actually it does have exit={{ opacity: 0 }}.

Wait - I see the issue now! The markdown extraction shows BOTH "Waiting for Product Identification"
AND the stats bar. This means BOTH the empty state and the stats bar are visible simultaneously.

But that shouldn't happen because:
- Stats bar only shows when showDiagram is true
- Empty state only shows when showDiagram is false

Unless the AnimatePresence exit animation is keeping the empty state visible while showDiagram is true.

The fix: Remove AnimatePresence mode="wait" and just use a simple conditional rendering.
Or ensure the exit animation is fast.

Actually, the real issue might be simpler: the TeardownTree component returns null when data is null,
but data is roborockTeardownData which is always defined. So the tree should render.

Let me just simplify the approach - remove the zoom/pan transform and use a simpler overflow-auto layout.
