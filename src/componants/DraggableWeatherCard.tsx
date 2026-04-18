import type { DragEvent } from "react";
import type { CityWeatherItem } from "../types/CityWeatherItem";
import WeatherCard from "./WeatherCard";

type DraggableWeatherCardProps = {
  item: CityWeatherItem;
  isDragging: boolean;
  onDragStart: (cityId: number) => void;
  onDragEnd: () => void;
  onDrop: (targetCityId: number) => void;
  onDelete: (cityId: number) => void;
};

function DraggableWeatherCard({
  item,
  isDragging,
  onDragStart,
  onDragEnd,
  onDrop,
  onDelete,
}: DraggableWeatherCardProps) {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(item.city.id)}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={() => onDrop(item.city.id)}
      className={isDragging ? "cursor-grabbing opacity-70" : "cursor-grab"}
    >
      <WeatherCard
        city={item.city}
        weather={item.weather}
        isLoading={item.isLoading}
        onDelete={() => onDelete(item.city.id)}
      />
    </div>
  );
}

export default DraggableWeatherCard;
