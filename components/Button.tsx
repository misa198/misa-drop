import classnames from 'classnames';
import { FC } from 'react';

type Variants = 'primary' | 'info' | 'error' | 'success' | 'warning';

interface ButtonProps {
  variant?: Variants;
  className?: string;
  onClick?: () => any;
}

const Button: FC<ButtonProps> = ({ children, className, variant, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classnames(`px-4 py-2 rounded font-medium ${className}`, {
        'bg-blue-500': variant === 'primary',
        'bg-gray-200 text-black': variant === 'info',
        'bg-red-500': variant === 'error',
        'bg-green-500': variant === 'success',
        'bg-yellow-500': variant === 'warning',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
