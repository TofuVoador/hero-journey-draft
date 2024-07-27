export default function Card({ card, highlight }) {
  const { leadership, combat, power, agility, skills } = card;

  return (
    <div
      className={`card ${
        highlight == null ? "h-80 w-60" : "h-64 w-48 lg:w-60 lg:h-80"
      } bg-secondary p-4 border-primary border-2 rounded-lg`}
    >
      <h3 className="text-lg font-semibold">{card.name}</h3>
      <h4 className="text-xs mb-4 text-wrap">{card.title}</h4>
      <div className="flex w-full justify-center mb-4">
        <img src={card.image} alt={card.name} className="w-32 h-32 rounded-lg object-cover" />
      </div>
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
          highlight === "combat"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Combat: {combat}
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
          highlight === "skills"
            ? "text-contrast"
            : highlight == null
            ? "text-text"
            : "hidden lg:flex"
        }`}
      >
        Skills: {skills}
      </p>
    </div>
  );
}
