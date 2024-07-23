export default function Card({ card, highlight }) {
  const { leadership, resistance, damage, agility, ability } = card;

  return (
    <div className="card bg-secondary p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary mb-2">{card.name}</h3>
      <p className={`text-base ${highlight === "leadership" ? "text-contrast" : "text-text"}`}>
        Leadership: {leadership}
      </p>
      <p className={`text-base ${highlight === "resistance" ? "text-contrast" : "text-text"}`}>
        Resistance: {resistance}
      </p>
      <p className={`text-base ${highlight === "damage" ? "text-contrast" : "text-text"}`}>
        Damage: {damage}
      </p>
      <p className={`text-base ${highlight === "agility" ? "text-contrast" : "text-text"}`}>
        Agility: {agility}
      </p>
      <p className={`text-base ${highlight === "ability" ? "text-contrast" : "text-text"}`}>
        Ability: {ability}
      </p>
    </div>
  );
}
