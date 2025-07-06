import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const text = {
    en: {
      signUp: "SignUp",
      login: "Login", 
      logout: "Logout",
      title: "Meteorological & Oceanographic Satellite Data Archival Centre",
      subtitle: "Space Applications Centre, ISRO",
      skipToMain: "Skip to main Content"
    },
    hi: {
      signUp: "साइन अप",
      login: "लॉगिन",
      logout: "लॉगआउट", 
      title: "मौसम विज्ञान और समुद्र विज्ञान उपग्रह डेटा संग्रहण केंद्र",
      subtitle: "अंतरिक्ष अनुप्रयोग केंद्र, इसरो",
      skipToMain: "मुख्य सामग्री पर जाएं"
    }
  };

  return (
    <header className="w-full">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gov-primary text-white px-4 py-2 rounded">
        {text[language].skipToMain}
      </a>
      
      {/* Top utility bar */}
      <div className="bg-white border-b flex justify-between items-center px-4 py-1 text-sm">
        <div className="flex items-center gap-2">
          <span>{text[language].skipToMain}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">A</Button>
            <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">A</Button>
            <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">A</Button>
            <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs bg-space-navy text-white">A</Button>
            <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">A</Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="text-xs"
          >
            {language === 'en' ? 'हिन्दी' : 'English'}
          </Button>
          <div className="flex gap-2 text-xs">
            <a href="#" className="text-isro-blue hover:underline">{text[language].signUp}</a>
            <span>|</span>
            <a href="#" className="text-isro-blue hover:underline">{text[language].login}</a>
            <span>|</span>
            <a href="#" className="text-isro-blue hover:underline">{text[language].logout}</a>
          </div>
        </div>
      </div>

      {/* Main header with branding */}
      <div className="bg-white px-4 py-0 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Government of India Emblem */}
            <div className="flex items-center gap-3">
              {/* <div className="w-16 h-16 bg-gov-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">ISRO</span>
              </div> */}
              
              {/* MOSDAC Logo */}
              <div className="bg-white px-3 py-2 rounded">
              <img src="public/mosdac_small.png" alt="MOSDAC Logo" className="w-54 h-auto" />
              </div>
              </div>

            
            {/* Title and subtitle */}
           <div className="ml-4">
           <h1 className="text-mosdac font-heading font-bold text-2xl">
           {text[language].title}
           </h1>
           <p className="text-mosdac text-sm font-medium">
           {text[language].subtitle}
           </p>
           </div>

          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="bg-mosdac text-white" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto flex gap-3 px-4">
          <div className="flex">
            {['Home', 'Missions', 'Catalog', 'Galleries', 'Data Access', 'Reports', 'Atlases', 'Tools', 'Sitemap', 'Help'].map((item) => (
              <a
                key={item}
                href="https://www.mosdac.gov.in/"
                className="px-4 py-3 hover:bg-gov-accent hover:text-white transition-colors duration-200 border-r border-white/20 text-sm font-medium"
                role="menuitem"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sub-navigation tabs */}
      <div className="bg-space-navy text-white">
        <div className="max-w-6xl mx-auto flex">
          {['Satellite Images', 'RADAR', 'Weather', 'OceanSat', 'LIVE'].map((tab, index) => (
            <button
  key={tab}
  className={`px-4 py-2 text-sm font-medium border-r border-white/20 hover:bg-white/10 hover:text-white transition-colors ${
    index === 0 ? 'bg-white/20' : ''
  }`}
>
  {tab}
</button>

          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;