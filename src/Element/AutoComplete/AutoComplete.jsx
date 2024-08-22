import React, { useState, useEffect, useCallback } from "react";
import './AutoComplete.css';

const AutoComplete = ({initialQuery = '', fetchSuggestions, onSelect }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSelection, setIsSelection] = useState(false);
  const debounceFetch = useCallback(
    debounce(async (newQuery) => {
      if (newQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const results = await fetchSuggestions(newQuery);
      setSuggestions(results);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 300),
    []
  );

  useEffect(() => {
    debounceFetch(query);
  }, [query, debounceFetch]);

  useEffect(() => {
    if (initialQuery) {
      debounceFetch(initialQuery);
    }
  }, [initialQuery, debounceFetch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsSelection(false);
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    setIsSelection(true);
    setShowSuggestions(false);
    onSelect(suggestion); 
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {isLoading && <div>Loading...</div>}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li key={index._id} onClick={() => handleSelect(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

// Helper debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
