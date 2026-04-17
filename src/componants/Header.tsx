function Header() {
    return (
        <header className=" p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div  className="text-2xl bg-blue-200 rounded-full p-2">🌦️</div>
                <div className="">
                    <h1 className="text-2xl font-bold">Weather App</h1>
                    <h3 className="text-lg text-gray-500">Real-time Weather Updates every 15 seconds</h3>
                </div>
            </div>
            <div className=" text-sm bg-gray-500 font-bold rounded-full p-2">  Live <span className="text-red-500">🔴</span></div>
        </header>
    )
}

export default Header;