import React, { useState } from 'react';

// Type definitions for the board state
type Player = 'X' | 'O' | null;
type Board = Player[];

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null)); // 3x3 board
  const [isXNext, setIsXNext] = useState<boolean>(true); // To track whose turn it is
  const [winner, setWinner] = useState<Player>(null); // To track the winner
  const [player1, setplayer1] = useState<string>(''); // Player X name
  const [player2, setplayer2] = useState<string>(''); // Player O name
  const [gameStarted, setGameStarted] = useState<boolean>(false); // To track if game has started
  const [gameTied, setGameTied] = useState<boolean>(false); // To track if the game is tied
  const [player1Wins, setplayer1Wins] = useState<number>(0); // Player X win count
  const [player2Wins, setplayer2Wins] = useState<number>(0); // Player O win count

  // Check for winner
  const calculateWinner = (board: Board): Player => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' as winner
      }
    }
    return null; // No winner
  };

  // Handle cell click
  const handleClick = (index: number) => {
    if (board[index] || winner || gameTied) return; // Prevent clicking after the game is over
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === 'X') {
        setplayer1Wins(player1Wins + 1);
      } else {
        setplayer2Wins(player2Wins + 1);
      }
      setTimeout(() => {
        alert(`Congratulations! ${gameWinner === 'X' ? player1 : player2} wins!`);
        askForNextGame();
      }, 200);
    } else if (newBoard.every(cell => cell !== null)) {
      setGameTied(true);
      setTimeout(() => {
        alert("it's a tie!");
        askForNextGame();
      }, 200);
    }
  };

  // Prompt for next game after a winner or tie is found
  const askForNextGame = () => {
    const userChoice = window.confirm('Do you want to play another game?');
    if (userChoice) {
      resetBoard(); // Continue with the new game
    } else {
      handleRestartFromStart(); // Reset everything, including scores
    }
  };

  // Reset the game board
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setGameTied(false);
    setIsXNext(true);
  };
  
  // Handle restarting the game from the beginning (name input)
  const handleRestartFromStart = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setGameTied(false);
    setIsXNext(true);
    setplayer1(''); // Reset Player X's name
    setplayer2(''); // Reset Player O's name
    setGameStarted(false); // Go back to name input screen

    // Reset win counts for both players when the user does not want to continue
    setplayer1Wins(0); // Reset Player X win count
    setplayer2Wins(0); // Reset Player O win count
  };

  // Start the game after entering names
  const handleStartGame = () => {
    // Check if both player names are empty or only contain spaces
    if (player1.valueOf() ==='' || player2.valueOf() === '') {
      alert("Please enter player's names.");
      return; // Prevent starting the game if names are empty
    }
    setGameStarted(true); // Only start the game if both names are valid
  };

  // Render the board
  const renderSquare = (index: number) => {
    return (
      <button
        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-2 border-black text-3xl font-bold"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-lime-100 flex flex-col items-center justify-center p-4">
      {/* Title centered at the top */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-purple-900 text-center w-full absolute top-8">
        Tic-Tac-Toe
      </h1>

      {/* Name Input Fields */}
      {!gameStarted && (
        <div className="mb-4 text-center">
          <div className="mb-2">
            <label className="text-lg mr-2">Player 1's Name:</label>
            <input
              id='input1'
              type="text"
              placeholder="Enter name"
              onChange={(e) => setplayer1(e.target.value)}
              className="p-2 border-2 border-purple-700 bg-purple-50 rounded text-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg mr-2">Player 2's Name:</label>
            <input
              id='input2'
              type="text"
              placeholder="Enter name"
              onChange={(e) => setplayer2(e.target.value)}
              className="p-2 border-2 border-purple-700 bg-purple-50 rounded text-lg"
              required
            />
          </div>
          <button
            onClick={handleStartGame}
            className="pr-3 pl-3 pt-1 pb-1 bg-purple-700 text-white rounded hover:text-purple-700 hover:bg-purple-100 border-2 border-purple-700 text-lg"
          >
            Start
          </button>
        </div>
      )}

      {/* Display the winner or tie */}
      {(winner || gameTied) && (
        <div className="text-2xl text-green-600 mb-4">
          <strong>{winner ? (winner === 'X' ? player1 : player2) : "It's a tie!"}</strong>
        </div>
      )}

     {gameStarted && !winner && !gameTied && (
        <div className="text-xl text-center text-purple-700 hover:text-purple-500 mb-4 mt-5">
          <strong>
            {isXNext ? player1 : player2}'s turn ({isXNext ? 'X' : 'O'})
          </strong>
        </div>
      )}


      {/* Game Board */}
      {gameStarted && (
        <div>
          <div className="grid grid-cols-3 gap-2 mb-4 w-full max-w-[450px] sm:max-w-[500px] md:max-w-[550px] bg-gray-100">
            {[...Array(9)].map((_, index) => renderSquare(index))}
          </div>

          {/* Restart Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleRestartFromStart}
              className="pl-3 pr-3 pt-1 pb-1 text-white bg-purple-700 rounded hover:text-purple-700 hover:bg-purple-100 border-2 border-purple-700 text-lg"
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* Player Statistics */}
      <div className="mt-6 text-center">
        <p className="pb-1 text-xl">Scoreboard</p>
        <p className="text-md"> {player1}: {player1Wins} Wins</p>
        <p className="text-md"> {player2}: {player2Wins} Wins</p>
      </div>
    </div>
  );
};

export default App;
