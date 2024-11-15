import React, { useState } from "react";
import hogs from "./porker_data";
import Nav from "./Nav";
import HogList from "./HogList";
import AddHogForm from "./AddHogForm";
import 'semantic-ui-css/semantic.min.css';


function App() {
    const [hogData, setHogData] = useState(hogs);
    const [showGreased, setShowGreased] = useState(false);
    const [sortType, setSortType] = useState(null);

    // Filter greased hogs
    const filteredHogs = showGreased
        ? hogData.filter((hog) => hog.greased)
        : hogData;

    // Sort hogs
    const sortedHogs = [...filteredHogs].sort((a, b) => {
        if (sortType === "name") return a.name.localeCompare(b.name);
        if (sortType === "weight") return a.weight - b.weight;
        return 0;
    });

    // Add new hog
    const addHog = (newHog) => {
        setHogData([...hogData, newHog]);
    };

    return (
        <div className="ui container">
            <Nav />
            <div>
                <button onClick={() => setShowGreased(!showGreased)}>
                    {showGreased ? "Show All Hogs" : "Show Greased Hogs"}
                </button>
                <button onClick={() => setSortType("name")}>Sort by Name</button>
                <button onClick={() => setSortType("weight")}>Sort by Weight</button>
            </div>
            <AddHogForm addHog={addHog} />
            <HogList hogs={sortedHogs} />
        </div>
    );
}

export default App;
