import React from 'react';

export default function Button({
  submit,
  onClick,
  children,
  className,
}: {
  submit?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      className={`text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 ${className}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  submit: false,
  onClick: () => {},
  className: '',
};
