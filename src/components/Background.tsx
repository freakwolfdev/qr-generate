const Background = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* Animated gradient orbs */}
      <div className="-top-40 -left-40 absolute h-80 w-80 animate-float rounded-full bg-linear-to-r from-purple-500/30 to-pink-500/30 blur-3xl" />
      <div className="-top-20 -right-40 absolute h-96 w-96 animate-float-delay rounded-full bg-linear-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
      <div className="-bottom-40 -left-20 absolute h-72 w-72 animate-float-slow rounded-full bg-linear-to-r from-indigo-500/25 to-purple-500/25 blur-3xl" />
      <div className="-bottom-20 -right-20 absolute h-64 w-64 animate-float rounded-full bg-linear-to-r from-cyan-500/30 to-teal-500/30 blur-3xl" />

      {/* Center floating elements */}
      <div className="absolute top-1/3 left-1/3 h-32 w-32 animate-float rounded-full bg-linear-to-r from-pink-400/20 to-rose-400/20 blur-2xl" />
      <div className="absolute top-2/3 right-1/3 h-24 w-24 animate-float-delay rounded-full bg-linear-to-r from-emerald-400/25 to-teal-400/25 blur-xl" />

      {/* Geometric patterns */}
      <div className="absolute top-20 left-20 h-2 w-2 animate-pulse rounded-full bg-white/40" />
      <div className="absolute top-32 right-32 h-1 w-1 animate-pulse rounded-full bg-cyan-400/60" />
      <div className="absolute bottom-32 left-32 h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400/50" />
      <div className="absolute right-20 bottom-20 h-2 w-2 animate-pulse rounded-full bg-pink-400/40" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      {/* Animated lines */}
      <div className="absolute top-1/4 left-0 h-px w-full animate-pulse bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute right-0 bottom-1/3 h-px w-full animate-pulse bg-linear-to-l from-transparent via-cyan-400/30 to-transparent" />
      <div className="absolute top-2/3 left-0 h-px w-full animate-pulse bg-linear-to-r from-transparent via-purple-400/20 to-transparent" />
    </div>
  );
};

export default Background;
