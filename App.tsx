import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Item, ItemType, UserExperience } from './types';
import { getItems, addItem as apiAddItem, getExperiences, addExperience as apiAddExperience } from './services/apiService';
import { findMatchingItems } from './services/geminiService';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Search from './components/Search';
import ItemList from './components/ItemList';
import ItemFormModal from './components/ItemFormModal';
import Waves from './components/Waves';
import RollingGallery from './components/RollingGallery';
import UserExperiences from './components/UserExperiences';
import ShareExperience from './components/ShareExperience';
import Footer from './components/Footer';
import ShinyText from './components/ShinyText';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ItemType>(ItemType.LOST);
  const [lostItems, setLostItems] = useState<Item[]>([]);
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [experiences, setExperiences] = useState<UserExperience[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [lost, found, userExperiences] = await Promise.all([
        getItems(ItemType.LOST),
        getItems(ItemType.FOUND),
        getExperiences()
      ]);
      setLostItems(lost);
      setFoundItems(found);
      setExperiences(userExperiences);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleAddItem = async (itemData: Omit<Item, 'id' | 'timestamp'>) => {
    const newItem = await apiAddItem(itemData);
    if (newItem.type === ItemType.LOST) {
      setLostItems(prev => [newItem, ...prev]);
    } else {
      setFoundItems(prev => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleAddExperience = async (experienceData: Omit<UserExperience, 'id' | 'timestamp' | 'avatarUrl'>) => {
    const newExperience = await apiAddExperience(experienceData);
    setExperiences(prev => [newExperience, ...prev]);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    setError(null);
    const itemsToSearch = activeTab === ItemType.LOST ? foundItems : lostItems;
    try {
      const matchingIds = await findMatchingItems(query, itemsToSearch);
      setSearchResults(matchingIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown search error occurred.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const itemsToDisplay = useMemo(() => {
    const sourceItems = activeTab === ItemType.LOST ? lostItems : foundItems;
    if (searchResults === null) {
      return sourceItems;
    }
    const searchSourceItems = activeTab === ItemType.LOST ? foundItems : lostItems;
    return searchSourceItems.filter(item => searchResults.includes(item.id));
  }, [activeTab, lostItems, foundItems, searchResults]);

  const displayItemType = searchResults === null ? activeTab : (activeTab === ItemType.LOST ? ItemType.FOUND : ItemType.LOST);


  return (
    <div className="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text relative isolate flex flex-col">
      <Waves
          lineColor={theme === 'light' ? 'hsla(215, 28%, 17%, 0.07)' : 'hsla(210, 40%, 98%, 0.05)'}
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
      />
      <Header onReportItem={() => setIsModalOpen(true)} theme={theme} toggleTheme={toggleTheme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        
        {/* Hero Section */}
        <div className="pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left animate-fade-in">
              <ShinyText
                text="Return what's found,"
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text dark:text-dark-text tracking-tight"
                speed={10}
              />
              <ShinyText
                text="revive what's missing."
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-text-secondary dark:text-dark-text-secondary tracking-tight"
                speed={10}
              />
            </div>
            <div>
              <RollingGallery autoplay={true} pauseOnHover={true} />
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <Search onSearch={handleSearch} isSearching={isSearching} theme={theme} />
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-amber-50/50 dark:bg-dark-surface/20 rounded-2xl shadow-lg p-6 md:p-8 border border-amber-200/50 dark:border-slate-700/50">
          <Tabs activeTab={activeTab} onTabChange={(tab) => {
              setActiveTab(tab);
              setSearchResults(null);
              setSearchQuery('');
          }} />
          <div className="mt-8">
            <ItemList 
              items={itemsToDisplay} 
              isLoading={isLoading || isSearching} 
              error={error} 
              itemType={displayItemType}
              isSearchResult={searchResults !== null}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {/* User Experiences */}
        <div className="mt-20">
            <UserExperiences experiences={experiences} isLoading={isLoading} />
        </div>

        {/* Share Experience */}
        <div className="mt-20">
            <ShareExperience onAddExperience={handleAddExperience} />
        </div>

      </main>
      <Footer />
      <ItemFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default App;