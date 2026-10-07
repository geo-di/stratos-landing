import { useOpenStatus } from "@/hooks/useOpenStatus";

/**
 * Round postmark whose "date" is today: it carries the live open/closed
 * status. Until the clock has been read after mount it shows a neutral ring,
 * so the prerendered HTML matches hydration and nothing shifts.
 */
const LivePostmark = ({ className = "" }: { className?: string }) => {
  const { status } = useOpenStatus();
  const [state, until] = status?.label.split(" · ") ?? [];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`h-[112px] w-[112px] shrink-0 rounded-full border-2 flex items-center justify-center -rotate-[12deg] transition-colors duration-300 [transition-timing-function:ease] ${
        status?.isOpen ? "border-emerald-700/70 text-emerald-800" : "border-ultramarine/60 text-ultramarine/80"
      } ${className}`}
    >
      <div className="h-[94px] w-[94px] rounded-full border border-current flex flex-col items-center justify-center text-center font-display font-bold leading-none px-2">
        <span className="text-[11px] tracking-[0.16em]">Anaxos</span>
        <span
          className={`text-[17px] tracking-[0.02em] my-1.5 transition-opacity duration-300 [transition-timing-function:ease] ${
            status ? "opacity-100" : "opacity-0"
          }`}
        >
          {state ?? "Open"}
        </span>
        {/* "opens tomorrow 8:00" is the longest label; it wraps to two lines inside the ring */}
        <span className="text-[10px] tracking-[0.08em] normal-case leading-[1.15] max-w-[78px]">
          {until ?? " "}
        </span>
      </div>
    </div>
  );
};

export default LivePostmark;
