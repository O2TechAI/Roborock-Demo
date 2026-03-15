# Debug: Tree Not Rendering After Mode Selection

The issue is that the tree component IS rendering (the stats bar, mode badge, and status bar all update correctly), but the tree nodes are not visible in the viewport.

Looking at the code, the tree container uses:
- `w-max min-w-full` which means it expands to fit content
- `transform: translate(0px, 0px) scale(0.82)` with `transformOrigin: 'top center'`

The problem is likely that the tree content is very wide (5 assemblies side by side) and the `w-max` class makes the container wider than the viewport. Combined with `justify-center` and `transformOrigin: 'top center'`, the root node could be centered but the scale makes it appear smaller and potentially off-center.

Actually, looking at the earlier screenshots, the tree WAS rendering correctly in the pre-populated dark theme version. The issue now is likely the AnimatePresence mode="wait" transition. The empty state exit animation might be blocking the tree entry.

Let me try removing AnimatePresence mode="wait" and using a simpler conditional rendering.
