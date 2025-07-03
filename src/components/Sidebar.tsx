import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  language: 'en' | 'hi';
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ language, isOpen, onClose }: SidebarProps) => {
  const text = {
    en: {
      quickTopics: "Quick Topics",
      documentUpload: "Document Upload",
      dataAssistant: "Data Access Assistant",
      uploadPdf: "Upload PDF",
      uploadDescription: "Upload documents to ask specific queries",
      assistantDescription: "Get help downloading datasets step-by-step"
    },
    hi: {
      quickTopics: "त्वरित विषय",
      documentUpload: "दस्तावेज़ अपलोड",
      dataAssistant: "डेटा एक्सेस सहायक",
      uploadPdf: "PDF अपलोड करें",
      uploadDescription: "विशिष्ट प्रश्न पूछने के लिए दस्तावेज़ अपलोड करें",
      assistantDescription: "डेटासेट डाउनलोड करने में चरणबद्ध सहायता प्राप्त करें"
    }
  };

  const quickTopics = [
    {
      title: language === 'en' ? 'INSAT Series' : 'INSAT श्रृंखला',
      description: language === 'en' 
        ? 'Indian National Satellite System data and products'
        : 'भारतीय राष्ट्रीय उपग्रह प्रणाली डेटा और उत्पाद',
      icon: '🛰️'
    },
    {
      title: language === 'en' ? 'OceanSat' : 'ओशनसैट',
      description: language === 'en' 
        ? 'Ocean observation and monitoring data'
        : 'समुद्री अवलोकन और निगरानी डेटा',
      icon: '🌊'
    },
    {
      title: language === 'en' ? 'Rainfall Data' : 'वर्षा डेटा',
      description: language === 'en' 
        ? 'Precipitation measurements and forecasts'
        : 'वर्षा माप और पूर्वानुमान',
      icon: '🌧️'
    },
    {
      title: language === 'en' ? 'Cyclone Tracking' : 'चक्रवात ट्रैकिंग',
      description: language === 'en' 
        ? 'Tropical cyclone monitoring and analysis'
        : 'उष्णकटिबंधीय चक्रवात निगरानी और विश्लेषण',
      icon: '🌀'
    },
    {
      title: language === 'en' ? 'Download FAQs' : 'डाउनलोड FAQ',
      description: language === 'en' 
        ? 'Common questions about data access and downloads'
        : 'डेटा पहुंच और डाउनलोड के बारे में सामान्य प्रश्न',
      icon: '❓'
    }
  ];

  const handleTopicClick = (topic: string) => {
    // This would integrate with the chat system
    console.log('Topic clicked:', topic);
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      console.log('PDF uploaded:', file.name);
      // Handle PDF upload logic here
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gov-secondary transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-gov-secondary p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gov-primary">
                {text[language].quickTopics}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden text-gov-primary hover:bg-gov-primary hover:text-white"
                aria-label="Close sidebar"
              >
                ✕
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Quick Topics */}
              <div className="space-y-3">
                {quickTopics.map((topic, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-transparent hover:border-l-isro-orange"
                    onClick={() => handleTopicClick(topic.title)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xl" role="img" aria-label="Topic icon">
                          {topic.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-medium text-gov-primary text-sm mb-1">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Document Upload Section */}
              <Card className="border-2 border-dashed border-gov-secondary">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gov-primary mb-3 flex items-center gap-2">
                    📄 {text[language].documentUpload}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {text[language].uploadDescription}
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload PDF file"
                    />
                    <Button 
                      variant="outline" 
                      className="w-full border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
                    >
                      {text[language].uploadPdf}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Access Assistant */}
              <Card className="bg-gradient-to-br from-isro-blue/10 to-isro-orange/10 border-isro-blue">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gov-primary mb-3 flex items-center gap-2">
                    🚀 {text[language].dataAssistant}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {text[language].assistantDescription}
                  </p>
                  <Button 
                    className="w-full bg-isro-blue hover:bg-isro-blue/90 text-white"
                    onClick={() => {
                      handleTopicClick('Data Access Guide');
                    }}
                  >
                    {language === 'en' ? 'Start Assistant' : 'सहायक शुरू करें'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;