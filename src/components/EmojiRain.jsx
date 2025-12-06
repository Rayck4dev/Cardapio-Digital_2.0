import { useEffect, useState } from "react";

const emojis = ["💛", "🍮", "🍫", "🍓"];

export default function EmojiRain() {
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji = {
        id: Date.now(),
        symbol: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * window.innerWidth,
      };

      setEmojiList((prev) => [...prev, newEmoji]);

      setTimeout(() => {
        setEmojiList((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, 5000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
    >
      {emojiList.map((emoji) => (
        <div
          key={emoji.id}
          className="emoji-caindo"
          style={{ left: `${emoji.left}px` }}
        >
          {emoji.symbol}
        </div>
      ))}
    </div>
  );
}
