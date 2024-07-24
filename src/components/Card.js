export default function Card({ card, highlight }) {
  const { leadership, resistance, power, agility, ability } = card;

  return (
    <div className="card bg-secondary p-4 border-primary border-2 rounded-lg">
      <h3 className="text-xl font-semibold text-primary">{card.name}</h3>
      <h4 className="text-sm text-primary mb-2 text-wrap">{card.description}</h4>
      <p className={`text-base ${highlight === "leadership" ? "text-contrast" : "text-text"}`}>
        Leadership: {leadership}
      </p>
      <p className={`text-base ${highlight === "resistance" ? "text-contrast" : "text-text"}`}>
        Resistance: {resistance}
      </p>
      <p className={`text-base ${highlight === "power" ? "text-contrast" : "text-text"}`}>
        power: {power}
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
