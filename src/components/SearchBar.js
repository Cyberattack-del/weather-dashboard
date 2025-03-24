import { useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ onSearch }) {
    const [input, setInput] = useState("");

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Enter city..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => onSearch(input)}>Search</button>
        </div>
    );
}