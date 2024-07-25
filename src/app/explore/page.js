"use client";
import { useState } from "react";
import { cards } from "@/data/cards";
import Card from "@/components/Card";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cards.filter((card) => {
      return (
        card.name.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query) ||
        Object.values(card).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(query)
        )
      );
    });

    setFilteredCards(filtered);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-text p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mt-4 md:mt-8 mb-4 text-primary text-center">
        Explore Cards
      </h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for cards..."
        className="bg-secondary text-text px-4 py-2 rounded-lg shadow-md w-full max-w-lg mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <p className="text-primary text-center">No cards found.</p>
        )}
      </div>
    </div>
  );
}
