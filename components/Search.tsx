import React, { useState, FormEvent } from 'react';
import Spinner from './Spinner';

interface SearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  theme: 'light' | 'dark';
}

const Search: React.FC<SearchProps> = ({ onSearch, isSearching, theme }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSearching && query) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center justify-center">
      <div id="poda" className="relative flex items-center justify-center group w-full">
        {/* Glow Effects */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[70px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,var(--grad-color-1)_5%,#000_38%,#000_50%,var(--grad-color-2)_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),var(--grad-color-3),rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,var(--grad-color-4),rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[63px] rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,var(--grad-color-5),rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,var(--grad-color-6),rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[59px] rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#1c191c,var(--grad-color-1)_5%,#1c191c_14%,#1c191c_50%,var(--grad-color-2)_60%,#1c191c_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]">
        </div>

        {/* Main Input area */}
        <div id="main" className="relative group w-full">
            <input 
                placeholder="Describe an item to find its match..." 
                type="text" 
                name="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isSearching}
                className="bg-surface dark:bg-[#010201] border-none w-full h-[56px] rounded-lg text-text dark:text-white px-[59px] text-lg focus:outline-none placeholder:text-text-muted dark:placeholder-gray-400" 
            />
            <div id="glow-mask" className="pointer-events-none w-[30px] h-[20px] absolute bg-[var(--glow-color-1)] top-[10px] left-[5px] blur-2xl opacity-80 transition-all duration-2000 group-hover:opacity-0"></div>
            
            <button
                type="submit"
                disabled={isSearching || !query}
                className="absolute h-[42px] w-[40px] overflow-hidden top-[7px] right-[7px] rounded-lg group disabled:cursor-not-allowed disabled:opacity-70"
                aria-label="Search"
            >
                <div className="
                  before:absolute before:content-[''] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-90
                  before:bg-[conic-gradient(rgba(0,0,0,0),#3d3a4f,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_50%,#3d3a4f,rgba(0,0,0,0)_100%)]
                  before:brightness-135 before:animate-spin-slow">
                </div>
                <div id="filter-icon" className="absolute top-0 right-0 flex items-center justify-center z-[2] max-h-10 max-w-[38px] h-full w-full [isolation:isolate] overflow-hidden rounded-lg bg-gradient-to-b from-[#161329] via-black to-[#1d1b4b] border border-transparent">
                  {isSearching ? <Spinner small /> : (
                    <svg preserveAspectRatio="none" height="27" width="27" viewBox="4.8 4.56 14.832 15.408" fill="none">
                      <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#d6d6e6" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  )}
                </div>
            </button>
            <div id="search-icon" className="absolute left-5 top-[15px] pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" height="24" fill="none" className="feather feather-search">
                <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                <line stroke="url(#searchl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
                <defs>
                   <linearGradient gradientTransform="rotate(50)" id="search">
                    <stop stopColor={theme === 'dark' ? 'hsl(217, 91%, 80%)' : '#fef3c7'} offset="0%"></stop>
                    <stop stopColor={theme === 'dark' ? 'hsl(217, 91%, 70%)' : '#fde68a'} offset="50%"></stop>
                  </linearGradient>
                  <linearGradient id="searchl">
                    <stop stopColor={theme === 'dark' ? 'hsl(217, 91%, 70%)' : '#fde68a'} offset="0%"></stop>
                    <stop stopColor={theme === 'dark' ? 'hsl(217, 91%, 55%)' : '#fcd34d'} offset="50%"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
        </div>
      </div>
    </form>
  );
};

export default Search;