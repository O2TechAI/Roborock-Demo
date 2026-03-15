# Tree Not Rendering Issue

The stats bar is showing correctly with "Service Fee Mode" badge and all 6 stats. But the diagram area below the stats bar is completely empty - no tree nodes visible. The empty state text is also gone, so the AnimatePresence transition did work. The tree component is being rendered but the nodes are not visible.

This is the same issue as before - the tree is rendering but the nodes are positioned outside the viewport. The tree container has a scale of 0.72 and position offset. Need to check if the tree is rendering below the visible area or if there's a CSS issue with the light theme.

Looking at the screenshot more carefully, the right panel below the stats bar is completely white/empty with just the dot grid pattern. The tree IS being rendered but is not visible. This could be because the tree's initial position/scale puts it off-screen.
