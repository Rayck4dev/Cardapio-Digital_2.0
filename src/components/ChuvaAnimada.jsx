import { useEffect, useState } from "react";

export default function ChuvaAnimada({
  emoji = "❄️",       
  quantidade = 15,        
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < quantidade; i++) {
      arr.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`, 
        size: `${Math.random() * 1.5 + 1}em`
      });
    }
    setItems(arr);
  }, [quantidade]);

  return (
    <div className="chuva-container">
      {items.map((item) => (
        <div
          key={item.id}
          className="chuva-item"
          style={{
            left: item.left,
            animationDelay: item.delay,
            fontSize: item.size,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
