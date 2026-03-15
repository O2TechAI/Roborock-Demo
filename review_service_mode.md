# Service Fee Mode Review

The mode selection is working. The stats bar appeared at the top with correct Service Fee data (500 units, 1850 kg, 17 components, 91.8% recovery, $5,000 labor, $11,350 material value). The "Service Fee Mode" badge appeared in the header. The Generate Quotation button turned blue/active. The chat panel shows the confirmation message.

However, the tree diagram is NOT appearing. The right panel still shows the EmptyState component ("Select a Processing Mode"). This is likely an AnimatePresence issue where the exit animation of the empty state is blocking the entry of the tree. Need to debug the conditional rendering logic.

The issue is that AnimatePresence mode="wait" requires the exiting component to finish before the entering one starts. The empty state might not be properly exiting. Need to check the key-based switching logic.
