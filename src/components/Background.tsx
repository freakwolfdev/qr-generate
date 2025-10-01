const Background = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 h-32 w-32 animate-float rounded-full bg-gradient-to-r from-indigo-300/40 to-cyan-300/40 blur-xl" />
      <div className="absolute top-40 right-20 h-24 w-24 animate-float-delay rounded-full bg-gradient-to-r from-cyan-300/50 to-blue-300/50 blur-lg" />
      <div className="absolute bottom-40 left-20 h-40 w-40 animate-float-slow rounded-full bg-gradient-to-r from-purple-300/30 to-indigo-300/30 blur-2xl" />
      <div className="absolute right-20 bottom-20 h-28 w-28 animate-float rounded-full bg-gradient-to-r from-cyan-400/40 to-teal-400/40 blur-xl" />

      {/* Additional floating elements */}
      <div className="absolute top-1/2 left-1/4 h-20 w-20 animate-float rounded-full bg-gradient-to-r from-pink-300/30 to-rose-300/30 blur-lg" />
      <div className="absolute top-2/3 right-1/4 h-16 w-16 animate-float-delay rounded-full bg-gradient-to-r from-emerald-300/40 to-teal-300/40 blur-md" />

      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[length:40px_40px] bg-[radial-gradient(circle_at_2px_2px,rgba(99,102,241,0.6)_2px,transparent_0)]" />
      </div>

      {/* Additional dotted patterns for depth */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[length:60px_60px] bg-[radial-gradient(circle_at_3px_3px,rgba(6,182,212,0.4)_1px,transparent_0)]" />
      </div>

      {/* Subtle dot overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[length:80px_80px] bg-[radial-gradient(circle_at_4px_4px,rgba(139,92,246,0.3)_1px,transparent_0)]" />
      </div>

      {/* Subtle gradient lines */}
      <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
      <div className="absolute right-0 bottom-1/4 h-px w-full bg-gradient-to-l from-transparent via-cyan-300/40 to-transparent" />
      <div className="absolute top-3/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-300/30 to-transparent" />
    </div>
  );
};

export default Background;
