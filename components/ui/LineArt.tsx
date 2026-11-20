/**
 * Decorations drawn in code instead of images (the same approach as the sibling landing pages).
 * Each viewBox matches the size the decoration has in the 1920px design, so the boxes keep their proportions.
 * The colours come from the theme variables.
 */
type ArtProps = { className?: string };

/** One palm frond: a curved rib with narrow leaflets on both sides */
const Frond = ({ d, leaflets, side = 1 }: { d: string; leaflets: [number, number, number][]; side?: 1 | -1 }) => (
  <g>
    <path d={d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {leaflets.map(([x, y, angle]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${angle})`}>
        <path d={`M0 0C10 ${-6 * side} 34 ${-9 * side} 58 ${-4 * side}C36 ${2 * side} 14 ${3 * side} 0 0Z`} fill="currentColor" />
      </g>
    ))}
  </g>
);

/** Hero, top-left corner: the soft shadow of palm fronds falling on the page */
export const PalmShadowArt = ({ className }: ArtProps) => (
  <svg aria-hidden="true" viewBox="0 0 420 230" className={className}>
    <g filter="url(#palm-blur)">
      <Frond
        d="M-10 -10C60 30 120 80 175 160"
        leaflets={[
          [10, 2, 70], [30, 14, 72], [52, 28, 76], [74, 44, 80], [96, 62, 84], [118, 82, 88], [140, 104, 92],
          [16, 6, -20], [38, 18, -18], [60, 32, -14], [82, 48, -10], [104, 66, -6], [126, 86, -2],
        ]}
      />
      <Frond
        d="M120 -20C170 10 230 30 300 40"
        leaflets={[
          [140, -8, 110], [165, 4, 112], [190, 14, 114], [215, 22, 116], [240, 30, 118], [265, 35, 120],
          [150, -4, 20], [176, 8, 22], [202, 18, 24], [228, 26, 26], [254, 32, 28],
        ]}
        side={-1}
      />
    </g>
    <defs>
      <filter id="palm-blur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
  </svg>
);

/** One palm tree: a leaning trunk with a crown of drooping fronds */
const Palm = ({ x, y, height, lean }: { x: number; y: number; height: number; lean: number }) => {
  const topX = x + lean;
  const topY = y - height;
  const fronds = [
    [-62, 6], [-48, -18], [-20, -30], [14, -30], [44, -16], [60, 8],
  ];
  return (
    <g>
      <path d={`M${x - 5} ${y}C${x - 2 + lean * 0.2} ${y - height * 0.45} ${topX - 6} ${topY + height * 0.2} ${topX - 3} ${topY}L${topX + 3} ${topY}C${topX} ${topY + height * 0.25} ${x + 4 + lean * 0.2} ${y - height * 0.45} ${x + 5} ${y}Z`} />
      {fronds.map(([dx, dy]) => (
        <path
          key={`${dx}-${dy}`}
          d={`M${topX} ${topY}Q${topX + dx * 0.5} ${topY + dy - 14} ${topX + dx} ${topY + dy + 18}Q${topX + dx * 0.55} ${topY + dy - 2} ${topX} ${topY + 4}Z`}
        />
      ))}
    </g>
  );
};

/** FAQ, under the intro text: two palm trees above soft sand waves */
export const PalmBeachArt = ({ className }: ArtProps) => (
  <svg aria-hidden="true" viewBox="0 0 450 150" className={className} fill="currentColor">
    <Palm x={84} y={132} height={102} lean={-12} />
    <Palm x={150} y={130} height={64} lean={12} />
    <path d="M0 140C70 126 140 128 200 112C260 96 330 84 410 104C350 92 280 102 220 122C160 140 80 146 0 146Z" />
    <path d="M150 140C220 124 300 104 380 108C410 110 430 116 446 124C410 114 360 114 300 126C250 136 200 142 150 140Z" opacity="0.8" />
  </svg>
);
