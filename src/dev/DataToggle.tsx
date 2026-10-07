/**
 * DEV-ONLY "Demo data / Worst case" switch from the break-ui skill. Shown
 * only under `vite dev` and only when a `?data=` fixture is active. Plain
 * chrome on purpose — it isn't part of the design under test. Switching
 * reloads, because Google data is fetched once per page and cached.
 */
const OPTIONS = [
  { value: "demo", label: "Demo" },
  { value: "worst", label: "Worst case" },
  { value: "one", label: "One" },
  { value: "empty", label: "Empty" },
];

const DataToggle = () => {
  const current = new URLSearchParams(window.location.search).get("data");
  if (!current) return null;

  const choose = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("data", value);
    window.location.href = url.toString();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Fixture data"
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2147483647,
        display: "flex",
        gap: 2,
        padding: 3,
        borderRadius: 8,
        background: "#e5e5e5",
        font: "12px/1 system-ui, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,.15)",
      }}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={current === o.value}
          onClick={() => choose(o.value)}
          style={{
            border: 0,
            borderRadius: 6,
            padding: "7px 10px",
            cursor: "pointer",
            background: current === o.value ? "#fff" : "transparent",
            color: "#111",
            boxShadow: current === o.value ? "0 1px 2px rgba(0,0,0,.15)" : "none",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

export default DataToggle;
