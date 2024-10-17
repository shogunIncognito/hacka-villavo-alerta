export default function Spinner() {
    return (
        <div className="w-10 h-10 mx-auto my-24 grid grid-cols-3 grid-rows-3 gap-0">
            <div className="w-full h-full bg-white animate-scale-delay1"></div>
            <div className="w-full h-full bg-white animate-scale-delay2"></div>
            <div className="w-full h-full bg-white animate-scale-delay3"></div>
            <div className="w-full h-full bg-white animate-scale-delay4"></div>
            <div className="w-full h-full bg-white animate-scale-delay5"></div>
            <div className="w-full h-full bg-white animate-scale-delay6"></div>
            <div className="w-full h-full bg-white animate-scale-delay7"></div>
            <div className="w-full h-full bg-white animate-scale-delay8"></div>
            <div className="w-full h-full bg-white animate-scale-delay9"></div>

            <style jsx>{`
                @keyframes scale {
                    0%, 70%, 100% {
                        transform: scale3D(1, 1, 1);
                    }
                    35% {
                        transform: scale3D(0, 0, 1);
                    }
                }

                .animate-scale-delay1 { animation: scale 1.3s infinite ease-in-out 0.2s; }
                .animate-scale-delay2 { animation: scale 1.3s infinite ease-in-out 0.3s; }
                .animate-scale-delay3 { animation: scale 1.3s infinite ease-in-out 0.4s; }
                .animate-scale-delay4 { animation: scale 1.3s infinite ease-in-out 0.1s; }
                .animate-scale-delay5 { animation: scale 1.3s infinite ease-in-out 0.2s; }
                .animate-scale-delay6 { animation: scale 1.3s infinite ease-in-out 0.3s; }
                .animate-scale-delay7 { animation: scale 1.3s infinite ease-in-out 0s; }
                .animate-scale-delay8 { animation: scale 1.3s infinite ease-in-out 0.1s; }
                .animate-scale-delay9 { animation: scale 1.3s infinite ease-in-out 0.2s; }
            `}</style>
        </div>
    );
}
