
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  isFocused: boolean;
  onFocusChange: (focused: boolean) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  isFocused,
  onFocusChange,
  ...props
}) => {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1 transition-colors group-focus-within:text-purple-400">
        {label}
      </label>
      <div className={`relative transition-all duration-500 ${isFocused ? 'scale-[1.01]' : ''}`}>
        <div className={`absolute inset-0 rounded-xl transition-opacity duration-500 blur-md ${isFocused ? 'bg-purple-500/10 opacity-100' : 'opacity-0'}`} />
        <div className="relative">
          <input
            {...props}
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
            className={`w-full bg-zinc-900/40 backdrop-blur-md border rounded-xl py-4 pl-12 pr-4 outline-none transition-all duration-300 text-sm font-medium placeholder:text-zinc-700
              ${isFocused ? 'border-purple-500/50 text-white shadow-[0_0_25px_rgba(168,85,247,0.05)]' : 'border-white/5 hover:border-white/10 text-zinc-300'}
            `}
          />
          <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 z-10 pointer-events-none ${isFocused ? 'text-purple-400 scale-110' : 'text-zinc-400'}`} />
        </div>
      </div>
    </div>
  );
};

export default Input;
