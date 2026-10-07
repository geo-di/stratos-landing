/**
 * Perforated postage stamp with the Lesvos silhouette. The caller positions
 * the outer box (it may be absolute); only the paper layer is perforated, so
 * the artwork on it stays whole. Perforation lives in index.css (.stamp-paper).
 */
const Stamp = ({ className = "" }: { className?: string }) => (
  <div className={`w-[86px] h-[104px] drop-shadow-sm ${className}`} aria-hidden="true">
    <div className="relative h-full w-full p-[9px]">
      <div className="stamp-paper absolute inset-0 bg-background" />
      <div className="relative h-full w-full border border-primary/40 bg-card flex flex-col items-center justify-center gap-1.5">
        <img src="/lesvos-logo-optionb.svg" alt="" className="w-[56px] h-auto" />
        <span className="font-display font-black text-[13px] tracking-[0.12em] text-primary leading-none">
          ΛΕΣΒΟΣ
        </span>
      </div>
    </div>
  </div>
);

export default Stamp;
