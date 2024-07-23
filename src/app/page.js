"use client";
import { useState, useEffect } from "react";
import { cards } from "../data/cards";
import { enemyTeams } from "../data/enemyTeams";
import Card from "../components/Card";
import { shuffleDeck } from "../utils/shuffleDeck";

const positions = ["Support", "Carry", "Leader", "Frontline", "Flank"];

const attributes = {
  Leader: "leadership",
  Frontline: "resistance",
  Carry: "damage",
  Flank: "agility",
  Support: "ability",
};

export default function Home() {
  const [selectedCards, setSelectedCards] = useState({});
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [gameOver, setGameOver] = useState(false); // Flag to indicate game over

  useEffect(() => {
    setDeck(shuffleDeck([...cards]));
  }, []);

  useEffect(() => {
    if (deck.length > 0) {
      setCurrentCard(deck[0]);
    }
  }, [deck]);

  const handlePositionClick = (position) => {
    if (!selectedCards[position]) {
      setSelectedCards({ ...selectedCards, [position]: currentCard });
      const newDeck = deck.filter((card) => card.id !== currentCard.id);
      setDeck(newDeck);
      setCurrentCard(newDeck[0]);
    }
  };

  const calculateStrength = () => {
    return positions.reduce((total, position) => {
      const card = selectedCards[position];
      if (card) {
        return total + card[attributes[position]];
      }
      return total;
    }, 0);
  };

  const getRandomTeams = () => {
    const finalBoss = enemyTeams.find((team) => team.name === "Final boss");
    const teamsWithoutBoss = enemyTeams.filter((team) => team.name !== "Final boss");

    const shuffled = shuffleDeck(teamsWithoutBoss);
    const selectedTeams = shuffled.slice(0, 4);

    return [...selectedTeams, finalBoss];
  };

  const compareTeams = () => {
    const teamsToCompare = getRandomTeams();
    const results = teamsToCompare.map((enemyTeam, index) => {
      let totalScore = 0;
      const detailedComparison = positions.map((position) => {
        const playerCard = selectedCards[position];
        const enemyCard = enemyTeam[position];
        const attribute = attributes[position];
        if (playerCard && enemyCard) {
          const playerValue = playerCard[attribute] || 0;
          const enemyValue = enemyCard[attribute] || 0;
          let result = "Draw";
          if (playerValue > enemyValue) {
            totalScore += 1;
            result = "Win";
          } else if (playerValue < enemyValue) {
            result = "Lose";
          }
          return {
            position,
            attribute,
            enemyCardName: enemyCard.name,
            enemyValue,
            result,
          };
        }
        return {
          position,
          attribute: "",
          enemyCardName: "",
          enemyValue: 0,
          result: "N/A",
        };
      });

      // Determine description based on position
      let chapterDescription;
      if (index === 0) {
        chapterDescription = enemyTeam.descriptionFirst;
      } else if (index === teamsToCompare.length - 1) {
        chapterDescription = enemyTeam.descriptionSemifinal;
      } else {
        chapterDescription = enemyTeam.descriptionOther;
      }

      return {
        teamName: enemyTeam.name,
        score: totalScore,
        power: enemyTeam.power,
        chapterDescription, // Add the selected description here
        detailedComparison,
      };
    });

    // Sort results by power
    results.sort((a, b) => a.power - b.power);

    // Start comparison sequence
    setComparisonResults([]);
    startComparisonSequence(results);
  };

  const startComparisonSequence = (results) => {
    let index = 0;

    const showNextComparison = () => {
      if (index >= results.length || gameOver) return;

      const result = results[index];
      const chapterNumber = index + 1; // Chapter number starts from 1
      const chapterDescription = result.chapterDescription || "No description available."; // Use team description

      setComparisonResults((prevResults) => [
        ...prevResults,
        { ...result, chapterNumber, chapterDescription },
      ]);

      if (result.score < 0) {
        setGameOver(true);
        return;
      }

      index += 1;
      setTimeout(showNextComparison, 3000); // 3 seconds delay between comparisons
    };

    showNextComparison();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-text">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-primary">Hero's Journey Party</h1>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {positions.map((position, index) => (
          <div
            key={position}
            className={`position bg-secondary rounded-lg p-4 shadow-lg flex flex-col items-center ${
              index === 0
                ? "col-start-1"
                : index === 1
                ? "col-start-2"
                : index === 2
                ? "col-start-3"
                : index === 3
                ? "col-start-4"
                : "col-start-5"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2 text-primary">{position}</h2>
            {selectedCards[position] ? (
              <Card card={selectedCards[position]} highlight={attributes[position]} />
            ) : (
              <button
                className="bg-contrast text-background px-4 py-2 rounded-lg mt-4 hover:bg-primary"
                onClick={() => handlePositionClick(position)}
              >
                Place Here
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        {currentCard && <Card card={currentCard} />}
      </div>
      {Object.keys(selectedCards).length === 5 && (
        <>
          <div className="strength bg-secondary rounded-lg p-4 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-primary">
              Team Strength: {calculateStrength()}
            </h2>
          </div>
          <button
            className="bg-contrast text-background px-4 py-2 rounded-lg mt-4 hover:bg-primary"
            onClick={compareTeams}
          >
            Compare with Enemy Teams
          </button>
          {comparisonResults.length > 0 && (
            <div className="comparison-results bg-secondary rounded-lg p-4 shadow-lg mt-8">
              <h2 className="text-2xl font-bold text-primary">Your team's Journey:</h2>
              {comparisonResults.map(
                (result, index) =>
                  result &&
                  result.teamName && (
                    <div key={index} className="mt-4">
                      <h3 className="text-xl font-bold text-primary">
                        Chapter {result.chapterNumber}: {result.teamName} - {result.power} power
                      </h3>
                      <p className="text-base text-primary">{result.chapterDescription}</p>
                      <div className="grid grid-cols-5 gap-4 mt-2">
                        {result.detailedComparison.map((comparison) => (
                          <div
                            key={comparison.position}
                            className={`bg-secondary p-4 rounded-lg shadow-md flex flex-col items-center`}
                          >
                            <h4 className="text-lg font-semibold text-primary">
                              {comparison.position}
                            </h4>
                            <p
                              className={`text-base ${
                                comparison.result === "Win"
                                  ? "text-green-500"
                                  : comparison.result === "Lose"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {comparison.attribute} - Enemy Card: {comparison.enemyCardName}{" "}
                              (Value: {comparison.enemyValue}) ({comparison.result})
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
