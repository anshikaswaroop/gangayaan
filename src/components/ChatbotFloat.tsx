
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Satellite, Calendar, Download, FileText } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  cards?: Array<{
    title: string;
    mission?: string;
    launchDate?: string;
    products?: string[];
    downloadLink?: string;
    type?: 'mission' | 'product' | 'document';
    description?: string;
    fileType?: string;
  }>;
}

const ChatbotFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm MEERA. Ask me anything about satellite missions, data access, or documents.",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('megha-tropiques') || lowerQuery.includes('megha tropiques')) {
      return {
        text: "Here's information about Megha-Tropiques data access:",
        cards: [{
          title: "Megha-Tropiques Mission",
          mission: "Indo-French Joint Mission",
          launchDate: "October 12, 2011",
          products: ["MADRAS", "SCARAB", "SAPHIR"],
          downloadLink: "#megha-data",
          type: 'mission' as const,
          description: "Tropical weather and climate monitoring satellite"
        }]
      };
    }
    
    if (lowerQuery.includes('insat-3d') || lowerQuery.includes('insat 3d')) {
      return {
        text: "Here's detailed information about INSAT-3D:",
        cards: [{
          title: "INSAT-3D Mission",
          mission: "Meteorological Satellite",
          launchDate: "July 26, 2013",
          products: ["Imager", "Sounder", "DRT", "SaR"],
          downloadLink: "#insat3d-data",
          type: 'mission' as const,
          description: "Advanced meteorological observations and disaster warning"
        }]
      };
    }
    
    if (lowerQuery.includes('ocean') || lowerQuery.includes('oceansat')) {
      return {
        text: "Ocean data is available from multiple missions:",
        cards: [
          {
            title: "OceanSat-2 Data",
            mission: "Ocean Color Monitor",
            launchDate: "September 23, 2009",
            products: ["OCM", "ROSA", "Ku-band Scatterometer"],
            downloadLink: "#oceansat-data",
            type: 'mission' as const,
            description: "Ocean color and wind vector measurements"
          },
          {
            title: "Ocean Products Portal",
            type: 'document' as const,
            description: "Access all ocean-related datasets and products",
            fileType: "Portal Access",
            downloadLink: "#ocean-portal"
          }
        ]
      };
    }
    
    if (lowerQuery.includes('download') || lowerQuery.includes('data access')) {
      return {
        text: "Here are the main data access portals:",
        cards: [
          {
            title: "MOSDAC Data Portal",
            type: 'document' as const,
            description: "Primary portal for meteorological and oceanographic data",
            fileType: "Web Portal",
            downloadLink: "#mosdac-portal"
          },
          {
            title: "Bhuvan Geo-Platform",
            type: 'document' as const,
            description: "Geospatial data and web services",
            fileType: "Web Services",
            downloadLink: "#bhuvan-portal"
          }
        ]
      };
    }
    
    // Default response
    return {
      text: "I can help you with satellite missions, data access, and documents. Try asking about specific missions like INSAT-3D, Megha-Tropiques, or OceanSat-2!",
      cards: [{
        title: "Popular Missions",
        type: 'document' as const,
        description: "Browse our catalog of satellite missions and their data products",
        fileType: "Mission Catalog",
        downloadLink: "#missions-catalog"
      }]
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");

    // Generate bot response
    setTimeout(() => {
      const response = generateResponse(currentInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        cards: response.cards
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-isro-blue hover:bg-isro-blue/90 text-white shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open MEERA Chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] max-w-[90vw] h-[600px] max-h-[90vh] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-isro-blue text-white p-4 rounded-t-lg flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Satellite className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">MEERA</h3>
                <p className="text-sm text-white/80">ISRO Data Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Scrollable Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                    {/* Enhanced Message bubble with better spacing */}
                    <div
                      className={`rounded-2xl px-4 py-3 mb-4 ${
                        message.isUser
                          ? 'bg-isro-blue text-white ml-4'
                          : 'bg-gray-100 text-gray-800 mr-4'
                      }`}
                    >
                      <p className="leading-relaxed text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Cards with improved spacing */}
                    {message.cards && (
                      <div className="mt-3 space-y-3 mr-4">
                        {message.cards.map((card, index) => (
                          <Card key={index} className="shadow-sm border-l-4 border-l-isro-orange">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                {card.type === 'mission' ? (
                                  <Satellite className="h-4 w-4 text-isro-blue mt-0.5 flex-shrink-0" />
                                ) : (
                                  <FileText className="h-4 w-4 text-isro-blue mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm text-isro-blue mb-2">
                                    {card.title}
                                  </h4>
                                  
                                  {card.mission && (
                                    <p className="text-xs text-gray-600 mb-1">
                                      <strong>Mission:</strong> {card.mission}
                                    </p>
                                  )}
                                  
                                  {card.launchDate && (
                                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      <strong>Launch:</strong> {card.launchDate}
                                    </p>
                                  )}
                                  
                                  {card.products && (
                                    <p className="text-xs text-gray-600 mb-2">
                                      <strong>Products:</strong> {card.products.join(', ')}
                                    </p>
                                  )}
                                  
                                  {card.description && (
                                    <p className="text-xs text-gray-600 mb-2">
                                      {card.description}
                                    </p>
                                  )}
                                  
                                  {card.fileType && (
                                    <p className="text-xs text-gray-600 mb-2">
                                      <strong>Type:</strong> {card.fileType}
                                    </p>
                                  )}
                                  
                                  {card.downloadLink && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-6 px-2 border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
                                      asChild
                                    >
                                      <a href={card.downloadLink}>
                                        <Download className="h-3 w-3 mr-1" />
                                        Access
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t bg-white p-4 flex-shrink-0">
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about missions, data access, satellite documents..."
                className="flex-1 text-sm border-gray-300 focus:border-isro-blue rounded-xl px-4 py-2"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-isro-blue hover:bg-isro-blue/90 text-white px-4 rounded-xl"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotFloat;
