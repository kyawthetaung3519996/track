import Image from "next/image";

const images = ["g1.jpg", "g2.jpg", "g3.jpg", "g4.jpg", "g5.jpg", "g6.jpg"];

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <div className="grid grid-cols-3 grid-rows-2 h-full">
        {images.map((img) => (
          <div key={img} className="relative h-full">
            <Image
              src={`/images/${img}`}
              alt={img}
              fill
              priority
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
