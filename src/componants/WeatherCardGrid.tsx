import type { CityWeatherItem } from "../types/CityWeatherItem";
import DraggableWeatherCard from "./DraggableWeatherCard";

type WeatherCardGridProps = {
  items: CityWeatherItem[];
  draggedCityId: number | null;
  onDragStart: (cityId: number) => void;
  onDragEnd: () => void;
  onDrop: (targetCityId: number) => void;
  onDelete: (cityId: number) => void;
};

function WeatherCardGrid({
  items,
  draggedCityId,
  onDragStart,
  onDragEnd,
  onDrop,
  onDelete,
}: WeatherCardGridProps) {
  return (
    <div className="mx-auto mt-5 grid w-full max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <DraggableWeatherCard
          key={item.city.id}
          item={item}
          isDragging={draggedCityId === item.city.id}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default WeatherCardGrid;
