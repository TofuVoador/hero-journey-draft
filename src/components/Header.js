export default function Header() {
  return (
    <header className="bg-secondary border-b-2 py-2 border-primary w-full text-contrast flex justify-between fixed bottom-0 sm:bottom-auto sm:top-0">
      <h1 className="hidden sm:block text-xl px-4 font-semibold">Hero's Journey: Draft</h1>
      <nav className="flex justify-evenly w-full sm:w-1/2">
        <a className="text-xl font-semibold hover:text-primary" href="/journey">
          Journey
        </a>
        <a className="text-xl font-semibold hover:text-primary" href="/duel">
          Duel
        </a>
        <a className="text-xl font-semibold hover:text-primary" href="/explore">
          Explore
        </a>
      </nav>
    </header>
  );
}
