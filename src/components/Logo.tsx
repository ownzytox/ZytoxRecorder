import React from 'react';

export const ZytoxLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="16" fill="#171717" stroke="#2F2F2F" strokeWidth="4" />
      <path
        d="M25 30H75L35 70H75"
        stroke="#9E7FFF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="72" cy="30" r="5" fill="#38BDF8" />
      <circle cx="28" cy="70" r="5" fill="#F472B6" />
    </svg>
  );
};
