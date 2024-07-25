export default function Card({ card, highlight }) {
  const { leadership, resistance, power, agility, ability } = card;

  return (
    <div
      className={`card ${
        highlight == null ? "h-80 w-60" : "h-64 w-48 lg:w-60 lg:h-80"
      } bg-secondary p-4 border-primary border-2 rounded-lg`}
    >
      <div className="flex w-full justify-center mb-4">
        <img
          src={card.image}
          alt={card.name}
          className="w-32 h-32 lg:w-48 rounded-lg object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold">{card.name}</h3>
      <h4 className="text-xs mb-2 text-wrap">{card.description}</h4>
      <p
        className={`text-xs ${
          highlight === "leadership"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Leadership: {leadership}
      </p>
      <p
        className={`text-xs ${
          highlight === "resistance"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Resistance: {resistance}
      </p>
      <p
        className={`text-xs ${
          highlight === "power"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Power: {power}
      </p>
      <p
        className={`text-xs ${
          highlight === "agility"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Agility: {agility}
      </p>
      <p
        className={`text-xs ${
          highlight === "ability"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Ability: {ability}
      </p>
    </div>
  );
}
