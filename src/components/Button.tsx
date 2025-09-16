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
  return (
    <button
      className={cx('btn', variant && `btn-${variant}`, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} />}
      {label}
      {icon && iconPosition === 'right' && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};

export default Button;
