import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cx } from '../lib/helper';

type TVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
  variant?: TVariant;
};

const Button = ({
  label,
  onClick,
  className,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
}: ButtonProps) => {
  const getVariantStyles = () => {
    const baseStyles =
      'relative rounded-xl px-6 py-3 font-medium transition-all duration-300 disabled:cursor-not-allowed border shadow-lg hover:shadow-xl active:shadow-lg disabled:opacity-50 transform hover:scale-105 active:scale-95';

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-indigo-600 hover:from-indigo-700 hover:to-cyan-700 hover:border-indigo-700',
      secondary:
        'bg-gradient-to-r from-gray-600 to-gray-700 text-white border-gray-600 hover:from-gray-700 hover:to-gray-800 hover:border-gray-700',
      success:
        'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-600 hover:from-emerald-700 hover:to-green-700 hover:border-emerald-700',
      danger:
        'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-600 hover:from-red-700 hover:to-rose-700 hover:border-red-700',
      warning:
        'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 border-amber-500 hover:from-amber-600 hover:to-yellow-600 hover:border-amber-600',
      info: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500 hover:from-blue-600 hover:to-cyan-600 hover:border-blue-600',
      light:
        'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400',
      dark: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-gray-800 hover:from-gray-900 hover:to-black hover:border-gray-900',
    };

    return `${baseStyles} ${variantStyles[variant] || variantStyles.primary}`;
  };

  return (
    <button
      className={cx(getVariantStyles(), className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-icon-position={iconPosition}
    >
      {icon && iconPosition === 'left' && (
        <FontAwesomeIcon icon={icon} className="mr-2" />
      )}
      <span className="relative z-10">{label}</span>
      {icon && iconPosition === 'right' && (
        <FontAwesomeIcon icon={icon} className="ml-2" />
      )}
    </button>
  );
};

export default Button;
