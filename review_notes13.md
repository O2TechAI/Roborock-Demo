# Review Notes 13 - Fundamental Issue

The root node is STILL not visible. I can see the Electronics Assembly and its children,
plus the Power System branch starting on the right. But no root node.

The fundamental issue is that the webdev_check_status screenshot is captured AFTER the 
auto-expand kicks in (600ms for electronics). At that point, the tree is already very wide
and the root node is above the visible area.

The root node should be at the very top of the tree. But the tree is rendered with 
transformOrigin: 'top center', and the scale transform shrinks everything toward the top center.
The root IS at the top, but the expanded assemblies push the tree content down and wide.

Actually, I think the root node might be hidden behind the stats bar. The stats bar is at the 
top of the diagram area, and the tree starts with pt-6 (24px padding). At 65% scale, the root
node might be very close to the top and partially hidden.

Let me try a completely different approach: Don't auto-expand any assemblies. Just show the 
root + 5 assembly nodes. This will be a compact tree that fits nicely. The user can click
to expand individual branches.

This is actually better for a demo - it shows the structure clearly and the user can 
interactively explore.
