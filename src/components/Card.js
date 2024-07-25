export default function Card({ card, highlight }) {
  const { leadership, resistance, power, agility, ability } = card;

  return (
    <div className="card w-64 h-80 bg-secondary p-4 border-primary border-2 rounded-lg">
      <div className="flex w-full justify-center mb-4">
        <img src={card.image} alt={card.name} className="w-48 h-32 object-cover" />
      </div>
      <h3 className="text-lg font-semibold">{card.name}</h3>
      <h4 className="text-xs mb-2 text-wrap">{card.description}</h4>
      <p className={`text-xs ${highlight === "leadership" ? "text-contrast" : "text-text"}`}>
        Leadership: {leadership}
      </p>
      <p className={`text-xs ${highlight === "resistance" ? "text-contrast" : "text-text"}`}>
        Resistance: {resistance}
      </p>
      <p className={`text-xs ${highlight === "power" ? "text-contrast" : "text-text"}`}>
        Power: {power}
      </p>
      <p className={`text-xs ${highlight === "agility" ? "text-contrast" : "text-text"}`}>
        Agility: {agility}
      </p>
      <p className={`text-xs ${highlight === "ability" ? "text-contrast" : "text-text"}`}>
        Ability: {ability}
      </p>
    </div>
  );
}
