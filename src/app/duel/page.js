"use client";
import { useState, useEffect } from "react";
import { cards } from "@/data/cards";
import Card from "@/components/Card";
import { shuffleDeck } from "@/utils/shuffleDeck";

const positions = ["Support", "Carry", "Leader", "Frontline", "Flank"];

const attributes = {
  Leader: "leadership",
  Frontline: "resistance",
  Carry: "power",
  Flank: "agility",
  Support: "ability",
};

export default function Journey() {
  // States for Player 1
  const [player1SelectedCards, setPlayer1SelectedCards] = useState({});
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player1CurrentCard, setPlayer1CurrentCard] = useState(null);

  // States for Player 2
  const [player2SelectedCards, setPlayer2SelectedCards] = useState({});
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [player2CurrentCard, setPlayer2CurrentCard] = useState(null);

  // Results of the comparison
  const [comparisonResults, setComparisonResults] = useState([]);

  useEffect(() => {
    // Shuffle decks for both players
    setPlayer1Deck(shuffleDeck([...cards]));
    setPlayer2Deck(shuffleDeck([...cards]));
  }, []);

  useEffect(() => {
    // Update current card for Player 1
    if (
      player1Deck.length > 0 &&
      !(
        player1SelectedCards.Leader &&
        player1SelectedCards.Frontline &&
        player1SelectedCards.Carry &&
        player1SelectedCards.Flank &&
        player1SelectedCards.Support
      )
    ) {
      setPlayer1CurrentCard(player1Deck[0]);
    }
  }, [player1Deck, player1SelectedCards]);

  useEffect(() => {
    // Update current card for Player 2
    if (
      player2Deck.length > 0 &&
      !(
        player2SelectedCards.Leader &&
        player2SelectedCards.Frontline &&
        player2SelectedCards.Carry &&
        player2SelectedCards.Flank &&
        player2SelectedCards.Support
      )
    ) {
      setPlayer2CurrentCard(player2Deck[0]);
    }
  }, [player2Deck, player2SelectedCards]);

  const handlePositionClick = (position, player) => {
    const selectedCards = player === 1 ? player1SelectedCards : player2SelectedCards;
    const setSelectedCards = player === 1 ? setPlayer1SelectedCards : setPlayer2SelectedCards;
    const deck = player === 1 ? player1Deck : player2Deck;
    const setDeck = player === 1 ? setPlayer1Deck : setPlayer2Deck;
    const currentCard = player === 1 ? player1CurrentCard : player2CurrentCard;
    const setCurrentCard = player === 1 ? setPlayer1CurrentCard : setPlayer2CurrentCard;

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

  const calculateStrength = (selectedCards) => {
    return positions.reduce((total, position) => {
      const card = selectedCards[position];
      if (card) {
        return total + card[attributes[position]];
      }
      return total;
    }, 0);
  };

  const compareTeams = () => {
    const player1Strength = calculateStrength(player1SelectedCards);
    const player2Strength = calculateStrength(player2SelectedCards);

    const results = [
      {
        player: "Player 1",
        strength: player1Strength,
        cards: player1SelectedCards,
      },
      {
        player: "Player 2",
        strength: player2Strength,
        cards: player2SelectedCards,
      },
    ];

    // Sort results by strength
    results.sort((a, b) => b.strength - a.strength);

    const comparisonDetails = positions.map((position) => {
      const player1Card = player1SelectedCards[position];
      const player2Card = player2SelectedCards[position];
      const player1Value = player1Card ? player1Card[attributes[position]] : 0;
      const player2Value = player2Card ? player2Card[attributes[position]] : 0;

      let result = "Draw";
      if (player1Value > player2Value) {
        result = "Player 1 Wins";
      } else if (player1Value < player2Value) {
        result = "Player 2 Wins";
      }

      return {
        position,
        player1Value,
        player2Value,
        result,
      };
    });

    setComparisonResults({
      player1: {
        strength: player1Strength,
        cards: player1SelectedCards,
      },
      player2: {
        strength: player2Strength,
        cards: player2SelectedCards,
      },
      details: comparisonDetails,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-text p-4 md:p-8 pb-16 sm:pb-0">
      <h1 className="text-3xl md:text-4xl font-bold mt-4 sm:mt-8 mb-4 text-text text-center">
        Hero's Journey PvP
      </h1>
      {/* Player 1 Section */}
      <div className="w-full mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Player 1</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 mb-8 w-full">
          {positions.map((position, index) => (
            <div
              key={position}
              className={`position bg-secondary rounded-lg p-4 shadow-lg flex flex-col items-center ${
                index === 2 ? "order-last 2xl:order-none" : ""
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 text-primary text-center">{position}</h3>
              {player1SelectedCards[position] ? (
                <Card card={player1SelectedCards[position]} highlight={attributes[position]} />
              ) : (
                <button
                  className="bg-contrast text-background px-4 py-2 rounded-lg mt-4 hover:bg-primary"
                  onClick={() => handlePositionClick(position, 1)}
                >
                  Place Here
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mb-8">
          {player1CurrentCard ? <Card card={player1CurrentCard} /> : <></>}
        </div>
      </div>

      {/* Player 2 Section */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Player 2</h2>
        <div className="flex flex-col items-center mb-8">
          {player2CurrentCard ? <Card card={player2CurrentCard} /> : <></>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 mb-8 w-full">
          {positions.map((position, index) => (
            <div
              key={position}
              className={`position bg-secondary rounded-lg p-4 shadow-lg flex flex-col items-center ${
                index === 2 ? "order-last 2xl:order-none" : ""
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 text-primary text-center">{position}</h3>
              {player2SelectedCards[position] ? (
                <Card card={player2SelectedCards[position]} highlight={attributes[position]} />
              ) : (
                <button
                  className="bg-contrast text-background px-4 py-2 rounded-lg mt-4 hover:bg-primary"
                  onClick={() => handlePositionClick(position, 2)}
                >
                  Place Here
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compare Button */}
      {Object.keys(player1SelectedCards).length === 5 &&
        Object.keys(player2SelectedCards).length === 5 && (
          <button
            className="bg-contrast text-background px-4 py-2 rounded-lg mt-4 hover:bg-primary"
            onClick={compareTeams}
          >
            Compare Teams
          </button>
        )}

      {/* Comparison Results */}
      {comparisonResults.details && (
        <div className="comparison-results bg-secondary rounded-lg p-4 shadow-lg mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-primary text-center">Battle Results</h2>
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">
              Player 1 Strength: {comparisonResults.player1.strength}
            </p>
            <p className="text-lg font-semibold">
              Player 2 Strength: {comparisonResults.player2.strength}
            </p>
          </div>
          {comparisonResults.details.map((detail, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold text-primary text-center">{detail.position}</h3>
              <p className="text-base text-center">{detail.result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
