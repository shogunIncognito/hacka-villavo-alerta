import React from 'react';

export default function Ola() {
    return (
        <div className="transform rotate-180" style={{ top: '100%' }}>
            <svg
                className="w-full h-20 text-primary pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M0,160L30,176C60,192,120,224,180,213.3C240,203,300,149,360,144C420,139,480,181,540,208C600,235,660,245,720,229.3C780,213,840,171,900,160C960,149,1020,171,1080,202.7C1140,235,1200,277,1260,272C1320,267,1380,213,1410,186.7L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                />
            </svg>
        </div>
    );
};
