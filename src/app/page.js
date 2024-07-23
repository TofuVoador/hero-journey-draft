"use client";
import { useEffect, useState } from "react";
import { cards } from "../data/cards";
import Card from "../components/Card";

const positions = ["Support", "Carry", "Leader", "Frontline", "Flank"];

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export default function Home() {
  const [selectedCards, setSelectedCards] = useState({});
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck(shuffleDeck([...cards]));
  }, []);

  const [currentCard, setCurrentCard] = useState(null);

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
    const attributes = {
      Leader: "leadership",
      Frontline: "resistance",
      Carry: "damage",
      Flank: "agility",
      Support: "ability",
    };

    return positions.reduce((total, position) => {
      const card = selectedCards[position];
      if (card) {
        return total + card[attributes[position]];
      }
      return total;
    }, 0);
  };

  const attributes = {
    Leader: "leadership",
    Frontline: "resistance",
    Carry: "damage",
    Flank: "agility",
    Support: "ability",
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
        <div className="strength bg-secondary rounded-lg p-4 shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-primary">Team Strength: {calculateStrength()}</h2>
        </div>
      )}
    </div>
  );
}
