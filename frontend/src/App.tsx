import { Component, For } from 'solid-js';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

// A small component to pick settings
const Controls = () => {
  const { setLocale, setTheme, t } = useSettings();

  return (
    <div class="flex gap-4 mb-8 p-4 bg-white/10 rounded-lg">
      {/* Language Switcher */}
      <div class="flex gap-2">
        <button onClick={() => setLocale("en")} class="px-3 py-1 bg-blue-600 rounded">EN</button>
        <button onClick={() => setLocale("ar")} class="px-3 py-1 bg-green-600 rounded">AR</button>
      </div>

      {/* Theme Switcher */}
      <div class="flex gap-2">
        <button onClick={() => setTheme("green")} class="w-6 h-6 rounded-full bg-[#779556]"></button>
        <button onClick={() => setTheme("brown")} class="w-6 h-6 rounded-full bg-[#b58863]"></button>
        <button onClick={() => setTheme("ocean")} class="w-6 h-6 rounded-full bg-[#8ca2ad]"></button>
      </div>
      
      {/* Translated Text Example */}
      <span class="text-xl font-bold ms-auto">{t("game.start")}</span>
    </div>
  );
};

// The Main Board
const Board = () => {
  // 8x8 Grid
  return (
    <div class="grid grid-cols-8 grid-rows-8 w-[600px] h-[600px] border-4 border-gray-800">
       {/* Simple loop for demo */}
       <For each={Array(64).fill(0)}>
        {(_, i) => {
          const row = Math.floor(i() / 8);
          const isDark = (row + i()) % 2 === 1;
          
          return (
            <div 
              class={`flex items-center justify-center text-black font-bold
                ${isDark ? 'bg-board-dark' : 'bg-board-light'} 
              `}
            >
              {/* Coordinates: Notice 'ms-1' (Margin Start) instead of 'ml-1' */}
              {i() === 0 && <span class="absolute top-0 start-1 text-xs text-red-600">Start</span>}
            </div>
          )
        }}
       </For>
    </div>
  )
}

const App: Component = () => {
  return (
    <SettingsProvider>
      <div class="min-h-screen bg-ui-bg text-ui-text flex flex-col items-center justify-center transition-colors duration-300">
        <Controls />
        <Board />
      </div>
    </SettingsProvider>
  );
};

export default App;