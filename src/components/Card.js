import React from "react";

const Card = ({ card, highlight }) => {
  return (
    <div className="card bg-secondary rounded-lg shadow-lg border-2 border-primary p-4 m-2 text-text">
      <h3 className="text-xl font-bold mb-2 text-primary">{card.name}</h3>
      <p className={highlight === "leadership" ? "text-contrast" : ""}>
        Leadership: {card.leadership}
      </p>
      <p className={highlight === "resistance" ? "text-contrast" : ""}>
        Resistance: {card.resistance}
      </p>
      <p className={highlight === "damage" ? "text-contrast" : ""}>Damage: {card.damage}</p>
      <p className={highlight === "agility" ? "text-contrast" : ""}>Agility: {card.agility}</p>
      <p className={highlight === "ability" ? "text-contrast" : ""}>Ability: {card.ability}</p>
    </div>
  );
};

export default Card;
