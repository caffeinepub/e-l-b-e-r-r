export function GameUI() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 border-2 border-white/60 rounded-full" />
      </div>

      <div className="absolute top-8 left-8 text-white font-mono">
        <h1 className="text-3xl font-bold tracking-wider text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          E.L.B.E.R.R.
        </h1>
        <p className="text-xs text-white/60 mt-1">EPISTEMIC LOGIC-BASED ENGINE</p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/40 text-sm font-mono">
        <p>Click to lock pointer • ESC to unlock</p>
      </div>
    </div>
  );
}
