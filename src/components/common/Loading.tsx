import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  );
};

export default Loading;