type Props = { x: number; y: number; w: number; h: number; variant: number };

export default function ObstacleBlock({ x, y, w, h, variant }: Props) {
  const styles = getVariantStyle(variant);

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        width: w,
        height: h,
        background: styles.background,
        borderRadius: styles.borderRadius,
        opacity: 0.9,
        border: styles.border,
        boxShadow: styles.boxShadow,
      }}
    />
  );
}

function getVariantStyle(variant: number) {
  switch (variant) {
    case 0:
      // red block
      return {
        background: 'linear-gradient(135deg, #d44 0%, #a33 100%)',
        borderRadius: 8,
        border: '2px solid #822',
        boxShadow: '0 4px 8px rgba(221, 68, 68, 0.4)',
      };
    case 1:
      // dark purple sharp block
      return {
        background: 'linear-gradient(135deg, #8b3a8b 0%, #5c1a5c 100%)',
        borderRadius: 4,
        border: '2px solid #3d0d3d',
        boxShadow: '0 4px 8px rgba(139, 58, 139, 0.5)',
      };
    case 2:
      // orange block
      return {
        background: 'linear-gradient(135deg, #ff6b35 0%, #d44915 100%)',
        borderRadius: 12,
        border: '2px solid #a33510',
        boxShadow: '0 4px 8px rgba(255, 107, 53, 0.4)',
      };
    case 3:
      // dark metallic
      return {
        background: 'linear-gradient(135deg, #555 0%, #333 100%)',
        borderRadius: 6,
        border: '2px solid #222',
        boxShadow: '0 4px 8px rgba(85, 85, 85, 0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
      };
    default:
      return {
        background: '#d44',
        borderRadius: 8,
        border: 'none',
        boxShadow: 'none',
      };
  }
}