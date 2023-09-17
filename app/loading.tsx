import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-slate-100/50 flex items-center justify-center touch-none">
      <Cog6ToothIcon className="w-12 h-12 text-slate-600 animate-spin" />
    </div>
  );
}
