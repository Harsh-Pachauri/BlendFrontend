import { Play } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white">
        <Play className="w-4 h-4 fill-current" />
      </div>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-primary-600">BLEND</span>
      </span>
    </div>
  );
};

export default Logo;