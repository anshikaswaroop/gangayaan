
import { useState, useRef ,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, Languages } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  cards?: Array<{
    title: string;
    description: string;
    links?: Array<{ text: string; url: string }>;
    image?: string;
  }>;
}

interface ChatInterfaceProps {
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
}

const ChatInterface = ({ language, onLanguageChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? "Hi! I'm your ISRO Help Assistant. Ask me anything about weather, satellites, ocean data, or downloads."
        : "नमस्ते! मैं आपका ISRO सहायक हूं। मुझसे मौसम, उपग्रह, समुद्री डेटा, या डाउनलोड के बारे में कुछ भी पूछें।",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const text = {
    en: {
      placeholder: "Ask about satellite data, weather, ocean forecasts, or cyclone alerts...",
      send: "Send",
      voiceInput: "Voice input",
      quickTopics: "Quick Topics",
      insatData: "INSAT Satellite Data",
      oceanForecasts: "Ocean Forecasts",
      cityWeather: "City Weather",
      cycloneAlerts: "Cyclone Alerts",
      downloadDatasets: "Download Datasets"
    },
    hi: {
      placeholder: "उपग्रह डेटा, मौसम, समुद्री पूर्वानुमान, या चक्रवात अलर्ट के बारे में पूछें...",
      send: "भेजें",
      voiceInput: "वॉयस इनपुट",
      quickTopics: "त्वरित विषय",
      insatData: "INSAT उपग्रह डेटा",
      oceanForecasts: "समुद्री पूर्वानुमान",
      cityWeather: "शहर का मौसम",
      cycloneAlerts: "चक्रवात अलर्ट",
      downloadDatasets: "डेटासेट डाउनलोड"
    }
  };

  const quickTopics = [
    { key: 'insat', icon: '🛰️', label: text[language].insatData },
    { key: 'ocean', icon: '🌊', label: text[language].oceanForecasts },
    { key: 'weather', icon: '☁️', label: text[language].cityWeather },
    { key: 'cyclone', icon: '🌀', label: text[language].cycloneAlerts },
    { key: 'download', icon: '📥', label: text[language].downloadDatasets }
  ];

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? "Here's what I found for your query:"
          : "आपके प्रश्न के लिए यहां जानकारी है:",
        isUser: false,
        timestamp: new Date(),
        cards: [
          {
            title: language === 'en' ? "Related Information" : "संबंधित जानकारी",
            description: language === 'en' 
              ? "Access detailed satellite data and weather information through our portal"
              : "हमारे पोर्टल के माध्यम से विस्तृत उपग्रह डेटा और मौसम जानकारी प्राप्त करें",
            links: [
              { text: language === 'en' ? "Full details on MOSDAC" : "MOSDAC पर पूर्ण विवरण", url: "#" },
              { text: language === 'en' ? "Download Data" : "डेटा डाउनलोड करें", url: "#" }
            ]
          }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickTopic = (topic: string) => {
    const topicMessages = {
      insat: language === 'en' ? "Tell me about INSAT satellite data" : "INSAT उपग्रह डेटा के बारे में बताएं",
      ocean: language === 'en' ? "Show me ocean forecasts" : "समुद्री पूर्वानुमान दिखाएं",
      weather: language === 'en' ? "I need city weather information" : "मुझे शहर की मौसम जानकारी चाहिए",
      cyclone: language === 'en' ? "Show cyclone alerts" : "चक्रवात अलर्ट दिखाएं",
      download: language === 'en' ? "How to download datasets?" : "डेटासेट कैसे डाउनलोड करें?"
    };
    
    handleSendMessage(topicMessages[topic as keyof typeof topicMessages]);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleLanguage = () => {
    onLanguageChange(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Chat Container */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[calc(100vh-200px)] flex flex-col">
        {/* Chat Header */}
        <div className="bg-gov-primary text-white p-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">
              {language === 'en' ? 'ISRO Help Assistant' : 'ISRO सहायक'}
            </h2>
            <p className="text-sm text-white/80">
              {language === 'en' 
                ? 'Satellite Data & Weather Information Helper'
                : 'उपग्रह डेटा और मौसम जानकारी सहायक'
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-white hover:bg-white/20"
          >
            <Languages className="h-4 w-4 mr-2" />
            {language === 'en' ? 'हिन्दी' : 'English'}
          </Button>
        </div>

        {/* Quick Topics */}
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="text-sm font-medium text-gray-700 mb-3">{text[language].quickTopics}</h3>
          <div className="flex flex-wrap gap-2">
            {quickTopics.map((topic) => (
              <Button
                key={topic.key}
                variant="outline"
                size="sm"
                onClick={() => handleQuickTopic(topic.key)}
                className="text-xs border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
              >
                <span className="mr-1">{topic.icon}</span>
                {topic.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  {/* Message bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.isUser
                        ? 'bg-isro-blue text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  {/* Bot response cards */}
                  {message.cards && (
                    <div className="mt-3 space-y-2">
                      {message.cards.map((card, index) => (
                        <Card key={index} className="shadow-sm border-l-4 border-l-isro-orange">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-gov-primary mb-2">
                              {card.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              {card.description}
                            </p>
                            {card.links && (
                              <div className="flex flex-wrap gap-2">
                                {card.links.map((link, linkIndex) => (
                                  <Button
                                    key={linkIndex}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs border-isro-blue text-isro-blue hover:bg-isro-blue hover:text-white"
                                    asChild
                                  >
                                    <a href={link.url}>{link.text}</a>
                                  </Button>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />

        </ScrollArea>

        {/* Input Area */}
        <div className="border-t bg-white p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={text[language].placeholder}
                className="pr-12 border-gov-secondary focus:border-isro-blue"
                aria-label="Chat input"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-isro-blue hover:text-white ${
                  isListening ? 'bg-isro-orange text-white' : 'text-gray-400'
                }`}
                aria-label={text[language].voiceInput}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="bg-isro-blue hover:bg-isro-blue/90 text-white px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              {text[language].send}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
