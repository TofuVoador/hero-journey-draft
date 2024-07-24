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
  Carry: "power",
  Flank: "agility",
  Support: "ability",
};

export default function Home() {
  const [selectedCards, setSelectedCards] = useState({});
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);

  useEffect(() => {
    setDeck(shuffleDeck([...cards]));
  }, []);

  useEffect(() => {
    if (
      deck.length > 0 &&
      !(
        selectedCards.Leader &&
        selectedCards.Frontline &&
        selectedCards.Carry &&
        selectedCards.Flank &&
        selectedCards.Support
      )
    ) {
      setCurrentCard(deck[0]);
    }
  }, [deck]);

  const handlePositionClick = (position) => {
    if (!selectedCards[position]) {
      const newSelectedCards = { ...selectedCards, [position]: currentCard };
      setSelectedCards(newSelectedCards);
      const newDeck = deck.filter((card) => card.id !== currentCard.id);
      setDeck(newDeck);
      if (
        newSelectedCards.Leader &&
        newSelectedCards.Frontline &&
        newSelectedCards.Carry &&
        newSelectedCards.Flank &&
        newSelectedCards.Support
      ) {
        setCurrentCard(null);
      } else {
        setCurrentCard(newDeck[0]);
      }
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
    const finalBoss = {
      name: "The Final Void Demon",
      last: {
        description: "The Void Demon got into it's final form. Save the world!",
        Leader: 97,
        Frontline: 97,
        Carry: 97,
        Flank: 97,
        Support: 97,
      },
    };

    const shuffled = shuffleDeck(enemyTeams);
    const selectedTeams = shuffled.slice(0, 4);

    return [...selectedTeams, finalBoss];
  };

  const compareTeams = () => {
    const teamsToCompare = getRandomTeams();
    const results = teamsToCompare.map((enemyTeam, index) => {
      let currentTeam = null;
      if (index === 0) {
        currentTeam = enemyTeam.first;
      } else if (index === 1) {
        currentTeam = enemyTeam.second;
      } else if (index === 2) {
        currentTeam = enemyTeam.third;
      } else if (index === 3) {
        currentTeam = enemyTeam.fourth;
      } else {
        currentTeam = enemyTeam.last;
      }

      let totalScore = 0;
      const detailedComparison = positions.map((position) => {
        const playerCard = selectedCards[position];
        const enemyCard = currentTeam[position];
        const attribute = attributes[position];
        if (playerCard && enemyCard) {
          const playerValue = playerCard[attribute] || 0;
          const enemyValue = enemyCard || 0;
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

      let chapterDescription = currentTeam.description;

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
      let gameOver = false;
      if (index >= results.length || gameOver) return;

      const result = results[index];
      const chapterNumber = index + 1; // Chapter number starts from 1
      const chapterDescription = result.chapterDescription || "No description available."; // Use team description

      setComparisonResults((prevResults) => [
        ...prevResults,
        { ...result, chapterNumber, chapterDescription },
      ]);

      if (result.score < 3) {
        gameOver = true;
        return;
      }

      index += 1;
      setTimeout(showNextComparison, 1000); // 3 seconds delay between comparisons
    };

    showNextComparison();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-text p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mt-4 md:mt-8 mb-4 text-primary text-center">
        Hero's Journey Party
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8 w-full">
        {positions.map((position, index) => (
          <div
            key={position}
            className="position bg-secondary rounded-lg p-4 shadow-lg flex flex-col items-center"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-primary text-center">
              {position}
            </h2>
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
      <div className="flex flex-wrap justify-center w-full">
        {currentCard ? <Card card={currentCard} /> : <></>}
      </div>
      {Object.keys(selectedCards).length === 5 && (
        <>
          <div className="strength bg-secondary rounded-lg p-4 shadow-lg mt-8 w-full max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold text-primary text-center">
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
            <div className="comparison-results bg-secondary rounded-lg p-4 shadow-lg mt-8 w-full">
              <h2 className="text-xl md:text-2xl font-bold text-primary text-center">
                Your team's Journey:
              </h2>
              {comparisonResults.map(
                (result, index) =>
                  result &&
                  result.teamName && (
                    <div key={index} className="mt-4">
                      <h3 className="text-lg md:text-xl font-bold text-primary text-center">
                        Chapter {result.chapterNumber}: {result.teamName}
                      </h3>
                      <p className="text-base text-primary text-center">
                        {result.chapterDescription}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                        {result.detailedComparison.map((comparison) => (
                          <div
                            key={comparison.position}
                            className="bg-secondary border-primary border-2 p-4 rounded-lg flex flex-col items-center"
                          >
                            <h4 className="text-lg font-semibold text-primary text-center">
                              {comparison.position}
                            </h4>
                            <p
                              className={`text-base text-center ${
                                comparison.result === "Win"
                                  ? "text-green-500"
                                  : comparison.result === "Lose"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {comparison.enemyValue} {comparison.attribute} ({comparison.result})
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
