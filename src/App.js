import "./styles.css";
import React, { useState, useEffect } from "react";
export default function App() {
  const [value, setValue] = useState("");
  const [fetchedContent, setFetchedContent] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);

  const checkIsValid = (string) => {
    return !string.match(/[|\\/~^:,;?!&%$@*+ (){}.\n]/);
  };

  useEffect(() => {
    fetchContent();
  }, [fetchedContent]);

  const fetchContent = () => {
    fetch("https://raw.githubusercontent.com/invictustech/test/main/README.md")
      .then((response) => response.text())
      .then((result) => setFetchedContent(result));
  };

  const handlerSubmit = () => {
    if (fetchedContent) {
      const wordCounts = {};
      const words = fetchedContent.split(/\b/);
      for (let i = 0; i < words.length; i++)
        wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
      const x = Object.keys(wordCounts);

      const validString = x.filter((item) => {
        return checkIsValid(item);
      });
      const convertedObject = validString.map((value) => {
        return { word: value.replace("_", ""), count: wordCounts[value] };
      });
      const items = convertedObject.sort((a, b) => b.count - a.count);
      setFilteredWords(items.slice(0, value));
    } else {
      fetchContent();
    }
  };
  return (
    <div className="invictus">
      <div className="content">
        <div className="text">
          <span>Enter a number</span>
        </div>
        <div>
          <input
            className="entry"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="button" onClick={handlerSubmit}>
            Submit
          </button>

          <br />
        </div>
      </div>
      <div className="Answer">
        {filteredWords.map((item) => {
          return (
            <span key={item.word}>
              {item.word}: {item.count}
              <br />
            </span>
          );
        })}
      </div>
    </div>
  );
}
