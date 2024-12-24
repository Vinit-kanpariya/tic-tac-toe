import React, { useState } from 'react';
import Square from './Square';

const Board: React.FC = () => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index: number) => {
        if (squares[index] || calculateWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const winner = calculateWinner(squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next Player: ${isXNext ? 'X' : 'O'}`;

    return (
        <div className="text-center">
            <div className="mb-4 text-lg font-semibold">{status}</div>
            <div className="grid grid-cols-3 gap-1">
                {squares.map((square, index) => (
                    <Square
                        key={index}
                        value={square}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Board;
