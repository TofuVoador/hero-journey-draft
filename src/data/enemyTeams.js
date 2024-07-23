// data/enemyTeams.js

export const enemyTeams = [
  {
    name: "Enemy Team 1",
    power: 80,
    descriptionFirst:
      "The first enemy team stands before you, eager to prove their strength. This is where your journey begins.",
    descriptionSemifinal:
      "You've made it to the semifinals. This team will test your resolve before the ultimate showdown.",
    descriptionOther:
      "This team has been a worthy opponent. Their power is not to be underestimated.",
    Leader: { name: "Name 1", leadership: 80 },
    Frontline: { name: "Name 2", resistance: 85 },
    Carry: { name: "Name 3", damage: 80 },
    Flank: { name: "Name 4", agility: 70 },
    Support: { name: "Name 5", ability: 75 },
  },
  {
    name: "Enemy Team 2",
    power: 85,
    descriptionFirst:
      "Your first challenge awaits. This team is known for their agility and quick attacks. Brace yourself.",
    descriptionSemifinal:
      "As you approach the semifinals, this team's fierce combat style will push you to your limits.",
    descriptionOther:
      "A formidable team with strong frontline defenses. Your skills will be truly tested.",
    Leader: { name: "Name 6", leadership: 85 },
    Frontline: { name: "Name 7", resistance: 90 },
    Carry: { name: "Name 8", damage: 85 },
    Flank: { name: "Name 9", agility: 65 },
    Support: { name: "Name 10", ability: 70 },
  },
  // Add more teams as needed...
  {
    name: "Final boss",
    power: 90,
    descriptionFirst:
      "The final boss stands ready, an overwhelming challenge that will determine the outcome of your journey.",
    descriptionSemifinal:
      "You've reached the final battle. This boss has exceptional stats and will test everything you've learned.",
    descriptionOther:
      "A final showdown with the ultimate boss. Their power is unmatched, and this will be your greatest test.",
    Leader: { name: "Final boss's leadership", leadership: 90 },
    Frontline: { name: "Final boss's resistance", resistance: 95 },
    Carry: { name: "Final boss's damage", damage: 90 },
    Flank: { name: "Final boss's agility", agility: 90 },
    Support: { name: "Final boss's ability", ability: 95 },
  },
];
