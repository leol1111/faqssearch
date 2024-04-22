"use client";

import { useState, useEffect, useRef  } from "react";
import axios from "axios";
import ResultItem from "./SearchResults";



export default function SearchInput() {
  const [query, setQuery] = useState(""); 
 
  const [responseData, setResponseData] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLUListElement>(null);


  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
        try {
        const response = await axios.post('/faqssearch/api', { query }) 
    
        const resultItems: ResultItem[] = response.data.results.map((item: any) => ({
          id: item.id,
          question: item.document.structData.question,
          url: item.document.structData.url,
          answer: item.document.structData.answer
      }));
        setResults(resultItems)
        setDropdownOpen(true); 
      } catch (error) {
        console.log('eror', error);
        setError(error);
   
   
  };}
  const handleSelectItem = (item: any) => { // Explicitly define item as string
     // Set the query based on the selected item
    setDropdownOpen(false); 
  };
  
 
  function highlightSearchTerm(text: string, searchTerm: string): string {
    let highlightedText = text;
    const regex = /[\w_]/g;
    const characters = searchTerm.split(" ");
    const regexes = characters.map(char => new RegExp(`\\b(${char})\\b`, 'gi'));
    characters.forEach((char, index) => {
      highlightedText = highlightedText.replace(regexes[index], '<span style="background-color: #e1fae3;">$1</span>');
    });
  return highlightedText;

}
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <div className="mb-6 w-[600px] max-h-[40px] relative">
          <input
            onChange={(e) => setQuery(e.target.value)}
            
            id="email"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#307A55] focus:border-[#307A55] block w-full h-[40px] px-[8px] outline-none"
            placeholder="Search..."
            required
          />
         
           {dropdownOpen && results &&( // Show dropdown only if it's open and response data is available
            
            <ul ref={ref} className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg shadow-md py-2 w-full">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 "
                  onClick={() => handleSelectItem(item)}
                >
                 
                  <div className="text-[18px] font-semibold opacity-95" dangerouslySetInnerHTML={{__html: highlightSearchTerm(item.question, query)}} />
                  <div className="line-clamp-2 " dangerouslySetInnerHTML={{__html: highlightSearchTerm(item.answer, query)}} />
                  
                </li>
              ))}
            </ul>

            
            )}
        </div>

        <button
          type="submit"
          className="text-white bg-[#307A55] hover:bg-[#49b67f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-h-[40px] px-5 py-2.5 text-center"
        >
          Search
        </button>
      </form>
    </div>
    
    </>
  );
}
