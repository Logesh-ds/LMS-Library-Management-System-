import classicBooks from "@/assets/classic-books.png";
import modernBooks from "@/assets/modern-books.png";
import openBook from "@/assets/open-book.png";
import digitalBook from "@/assets/digital-book.png";

export const FloatingBooks = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Classic Books - Top Left */}
      <div 
        className="absolute top-20 left-16 w-24 h-32 opacity-20 animate-pulse"
        style={{ 
          animationDelay: "0s",
          animationDuration: "4s"
        }}
      >
        <img 
          src={classicBooks} 
          alt="Classic Books" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      {/* Modern Books - Top Right */}
      <div 
        className="absolute top-32 right-20 w-20 h-28 opacity-15 animate-bounce"
        style={{ 
          animationDelay: "1s",
          animationDuration: "6s"
        }}
      >
        <img 
          src={modernBooks} 
          alt="Modern Books" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      {/* Open Book - Bottom Left */}
      <div 
        className="absolute bottom-24 left-12 w-28 h-20 opacity-25 animate-pulse"
        style={{ 
          animationDelay: "2s",
          animationDuration: "5s"
        }}
      >
        <img 
          src={openBook} 
          alt="Open Book" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      {/* Digital Book - Bottom Right */}
      <div 
        className="absolute bottom-32 right-16 w-16 h-20 opacity-20 animate-pulse"
        style={{ 
          animationDelay: "3s",
          animationDuration: "7s"
        }}
      >
        <img 
          src={digitalBook} 
          alt="Digital Book" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      {/* Additional floating books for larger screens */}
      <div 
        className="absolute top-1/2 left-8 w-14 h-18 opacity-10 animate-bounce hidden lg:block"
        style={{ 
          animationDelay: "4s",
          animationDuration: "8s"
        }}
      >
        <img 
          src={classicBooks} 
          alt="Classic Books" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      <div 
        className="absolute top-3/4 right-8 w-18 h-22 opacity-15 animate-pulse hidden lg:block"
        style={{ 
          animationDelay: "5s",
          animationDuration: "6s"
        }}
      >
        <img 
          src={modernBooks} 
          alt="Modern Books" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>
    </div>
  );
};