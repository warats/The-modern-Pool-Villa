import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1 9 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 15.375c0-1.319-1.04-2.39-2.288-2.625A9.339 9.339 0 0 0 12 12a9.339 9.339 0 0 0-5.212.75c-1.248.235-2.288 1.306-2.288 2.625a1.875 1.875 0 0 0 1.875 1.875h10.5a1.875 1.875 0 0 0 1.875-1.875Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A2.25 2.25 0 0 1 14.25 9v1.5a2.25 2.25 0 0 1-4.5 0V9A2.25 2.25 0 0 1 12 6.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.375c0-1.319 1.04-2.39 2.288-2.625A9.339 9.339 0 0 1 12 12a9.339 9.339 0 0 1 5.962.75c1.248.235 2.288 1.306 2.288 2.625" />
  </svg>
);