import Image from "next/image"; // Assuming you're using Next.js

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-text text-center">
          WELCOME TO...
        </h1>
        <img src="/images/hjd_logo.png" alt="Heroes' Journey Logo" className="max-w-80" />
        <h1 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-text text-center">
          Write your story!
        </h1>
      </div>
    </div>
  );
}
