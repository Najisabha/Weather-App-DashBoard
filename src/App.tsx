import Header from './componants/Header';
import { useEffect } from 'react';
import type { CityData } from './types/CityData';
import type { WatherData } from './types/WatherData';
function App() {
  useEffect(() => {
    const fetchCityData = async () => {
      const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Riyadh')
      const data: { results: CityData[] } = await response.json()
      console.log(data.results)
    }
    fetchCityData()
  }, [])


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    </div>
  )
}

export default App
