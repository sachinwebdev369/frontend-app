import React, { useEffect, useState } from "react";

const KeywordsInput = ({ setTags }) => {
  const [text, setText] = useState("");
  const [keywordList, setKeywordList] = useState([]);

  const handleKeyDown = (e) => { // handler for after key press
    const key = e.key;
    if (key === " ") {
      setKeywordList((prev) => [...prev, text]);
      setText("");
      return;
    }
    if (key === "Backspace" && text.length === 0 && keywordList.length > 0) {
      let keywords = [...keywordList];
      keywords.pop();
      setKeywordList(keywords);
      return;
    }
  };

  useEffect(() => { // updating tags
    setTags(keywordList);
  }, [keywordList]);

  return (
    <div className="bg-slate-50 border border-neutral-200 mt-2 outline-none  p-2 md:p-2.5 rounded-lg flex items-center justify-start gap-3 flex-wrap">
      {keywordList.map((keyword, i) => (<span key={i} className="bg-blue-500 text-white px-2 rounded-lg py-0.5"> {keyword}</span>))}
      <input type="text" placeholder="key..." className=" min-w-[100px] flex-1  outline-none bg-transparent" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  )};

export default KeywordsInput;
