import React from 'react';

interface SquareProps {
    value: string | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button
            className="w-16 h-16 border border-grey-500 text-2xl font-bold flex items-center justify-center hover:bg-gray-200"
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;
