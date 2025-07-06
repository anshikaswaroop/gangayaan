
import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";


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
        <div className="mb-10"> {/* 👈 you can change mb-8 to mb-10 or mb-12 for more space */}
       <ChatInterface language={language} onLanguageChange={setLanguage} />
       </div> 

      
        
       <Footer />
      </main>
      
    </div>
  );
};

export default Index;
