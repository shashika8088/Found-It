# Found-It

**Found-It** is a modern, single-page application (SPA) that serves as a digital bulletin board for lost and found items. Built with React and TypeScript, it features a clean, responsive, and dynamic UI, enriched with animations and AI-powered functionality. View: https://found-it-vert.vercel.app/

## Features

- **AI-Powered Item Description:** Automatically generates titles, descriptions, and categories for uploaded images using Google Gemini API.  
- **Semantic Search:** Find items intelligently with AI-powered understanding of natural language queries.  
- **WhatsApp Integration:** Users can easily contact item owners via WhatsApp directly from the app.  
- **Dark Mode:** Fully functional, persistent dark mode toggle.  
- **Animations & Interactive UI:** Draggable 3D image carousel, flowing canvas background, and smooth CSS/Framer Motion animations.  
- **Local Persistence:** Uses `localStorage` to simulate backend storage.

## Technologies

- **React 19** with functional components and hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`)  
- **TypeScript** for type safety  
- **Tailwind CSS** for utility-first styling  
- **Framer Motion** for advanced animations  
- **HTML5 Canvas** for dynamic backgrounds  
- **Google Gemini AI** for image analysis and semantic search  
- **WhatsApp API** for direct communication  
- **Bundler-less Setup** using import maps and CDN dependencies   

## Project Structure

- `components` – Reusable UI components  
- `services` – API and AI service abstractions  
- `App.tsx` – Centralized state management and main data flow  

## Setup & Usage

1. Clone the repository:  
```bash
git clone https://github.com/shashika8088/Found-It.git
```
2. Create a `.env` file in the root directory and add: GEMINI_API_KEY=your_api_key_here


