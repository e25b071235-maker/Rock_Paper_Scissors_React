import { useState } from "react";

function App() {
  const [round, setRound] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [computerChoice, setComputerChoice] = useState("");
  const [winner, setWinner] = useState("");

  const [history, setHistory] = useState([]);

  const gameStart = (playerChoice) => {
    const choices = ["Rock", "Paper", "Scissors"];
    const random = choices[Math.floor(Math.random() * 3)];
    let resultMessage = "";

    setComputerChoice(random);

    if (random === playerChoice) {
      resultMessage = "Tie";
    } else if (
      (random === "Rock" && playerChoice === "Paper") ||
      (random === "Paper" && playerChoice === "Scissors") ||
      (random === "Scissors" && playerChoice === "Rock")
    ) {
      resultMessage = "Player Won";
      setPlayerScore((prev) => prev + 1);
    } else {
      resultMessage = "Computer Won";
      setComputerScore((prev) => prev + 1);
    }

    setWinner(resultMessage === "Tie" ? "It is a Tie" : resultMessage + "!");

    setHistory((prev) => [
      {
        roundNum: round,
        player: playerChoice,
        computer: random,
        result: resultMessage,
      },
      ...prev,
    ]);

    setRound((prev) => prev + 1);

    setTimeout(() => {
      setWinner("");
      setComputerChoice("");
    }, 100);
  };

  const handleReset = () => {
    setRound(1);
    setPlayerScore(0);
    setComputerScore(0);
    setWinner("");
    setComputerChoice("");
    setHistory([]); // Clear history on reset
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Round: {round}</h1>
      <h2>
        Player: {playerScore} | Computer: {computerScore}
      </h2>

      <div style={{ height: "100px", margin: "20px" }}>
        {computerChoice && (
          <p>
            Computer chose: <strong>{computerChoice}</strong>
          </p>
        )}
        {winner && <h3 style={{ color: "blue" }}>{winner}</h3>}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <button disabled={!!winner} onClick={() => gameStart("Rock")}>
          Rock
        </button>
        <button disabled={!!winner} onClick={() => gameStart("Paper")}>
          Paper
        </button>
        <button disabled={!!winner} onClick={() => gameStart("Scissors")}>
          Scissors
        </button>
        <button onClick={handleReset} style={{ marginLeft: "20px" }}>
          Reset Game
        </button>
      </div>

      <hr style={{ width: "50%", margin: "20px auto" }} />

      <h3>Match History</h3>
      <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
        {history.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No rounds played yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {history.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <strong>Round {item.roundNum}:</strong> {item.player} vs{" "}
                  {item.computer}
                </span>
                <span
                  style={{
                    color:
                      item.result === "Player Won"
                        ? "green"
                        : item.result === "Computer Won"
                          ? "red"
                          : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {item.result}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

