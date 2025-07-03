
import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import ChatbotFloat from "@/components/ChatbotFloat";
import QuickFilters from "@/components/QuickFilters";
import KnowledgeCards from "@/components/KnowledgeCards";
import FileViewer from "@/components/FileViewer";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Scroll to the knowledge cards section
    setTimeout(() => {
      const element = document.getElementById('knowledge-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-200 flex flex-col">
      <Header />
      
      
      <main 
        id="main-content"
        className="flex-1"
        role="main"
        aria-label="MOSDAC ChatBot Interface"
      >
        {/* Original Chat Interface */}
        <ChatInterface language={language} onLanguageChange={setLanguage} />
        
        {/* Quick Filter Buttons */}
        <QuickFilters onCategorySelect={handleCategorySelect} />
        
        {/* Knowledge Cards Section */}
        <div id="knowledge-section">
          <KnowledgeCards category={selectedCategory} />
        </div>
        
        {/* File Viewer Section */}
        <FileViewer />
      </main>
      
      {/* Floating MEERA Chatbot */}
      <ChatbotFloat />
    </div>
  );
};

export default Index;
