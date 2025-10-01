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
      'relative rounded-lg px-6 py-3 font-medium transition-all duration-200 disabled:cursor-not-allowed border shadow-sm hover:shadow-md active:shadow-sm disabled:opacity-50';

    const variantStyles = {
      primary:
        'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700',
      secondary:
        'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700',
      success:
        'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700',
      danger:
        'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700',
      warning:
        'bg-yellow-500 text-gray-900 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600',
      info: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600',
      light:
        'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 hover:border-gray-400',
      dark: 'bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900',
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
