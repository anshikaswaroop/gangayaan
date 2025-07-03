import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Search } from "lucide-react";

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

interface ChatBotProps {
  language: 'en' | 'hi';
  onToggleSidebar: () => void;
}

const ChatBot = ({ language, onToggleSidebar }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? "Hello! I'm MOSDAC Assistant. How can I help you explore satellite data and Earth observation products today?"
        : "नमस्ते! मैं MOSDAC सहायक हूं। आज मैं उपग्रह डेटा और पृथ्वी अवलोकन उत्पादों का पता लगाने में आपकी कैसे सहायता कर सकता हूं?",
      isUser: false,
      timestamp: new Date(),
      cards: [
        {
          title: language === 'en' ? "Popular Datasets" : "लोकप्रिय डेटासेट",
          description: language === 'en' 
            ? "Explore our most accessed satellite data collections"
            : "हमारे सबसे अधिक एक्सेस किए गए उपग्रह डेटा संग्रह का अन्वेषण करें",
          links: [
            { text: "INSAT-3D Data", url: "#" },
            { text: "OceanSat-2 Products", url: "#" },
            { text: "Rainfall Data", url: "#" }
          ]
        },
        {
          title: language === 'en' ? "Quick Access" : "त्वरित पहुंच",
          description: language === 'en' 
            ? "Fast access to common queries and downloads"
            : "सामान्य प्रश्नों और डाउनलोड तक तेज़ पहुंच",
          links: [
            { text: "Download FAQ", url: "#" },
            { text: "Data Formats", url: "#" },
            { text: "User Guide", url: "#" }
          ]
        }
      ]
    }
  ]);
  
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const text = {
    en: {
      placeholder: "Ask about satellite data, weather information, or download help...",
      send: "Send",
      voiceInput: "Voice input",
      thinking: "MOSDAC Assistant is thinking...",
      errorMessage: "Sorry, I encountered an error. Please try again.",
      microphoneAccess: "Enable microphone access to use voice input"
    },
    hi: {
      placeholder: "उपग्रह डेटा, मौसम की जानकारी, या डाउनलोड सहायता के बारे में पूछें...",
      send: "भेजें",
      voiceInput: "वॉयस इनपुट",
      thinking: "MOSDAC सहायक सोच रहा है...",
      errorMessage: "क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुन: प्रयास करें।",
      microphoneAccess: "वॉयस इनपुट का उपयोग करने के लिए माइक्रोफ़ोन एक्सेस सक्षम करें"
    }
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
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? "I understand you're looking for information about satellite data. Here are some relevant resources:"
          : "मैं समझता हूं कि आप उपग्रह डेटा के बारे में जानकारी खोज रहे हैं। यहां कुछ प्रासंगिक संसाधन हैं:",
        isUser: false,
        timestamp: new Date(),
        cards: [
          {
            title: language === 'en' ? "Related Documentation" : "संबंधित दस्तावेज़ीकरण",
            description: language === 'en' 
              ? "Technical guides and user manuals for satellite data access"
              : "उपग्रह डेटा पहुंच के लिए तकनीकी गाइड और उपयोगकर्ता मैनुअल",
            links: [
              { text: "Data Access Guide", url: "#" },
              { text: "API Documentation", url: "#" }
            ]
          }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(text[language].microphoneAccess);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };
    recognition.start();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="bg-gov-header text-white p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-white hover:bg-white/20 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-semibold text-lg">
            {language === 'en' ? 'MOSDAC Assistant' : 'MOSDAC सहायक'}
          </h2>
          <p className="text-sm text-white/80">
            {language === 'en' 
              ? 'Satellite Data & Weather Information Helper'
              : 'उपग्रह डेटा और मौसम जानकारी सहायक'
            }
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                {/* Message bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.isUser
                      ? 'bg-chat-user text-white ml-4'
                      : 'bg-chat-bot text-foreground mr-4'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                {/* Bot response cards */}
                {message.cards && (
                  <div className="grid gap-3 mt-3 mr-4">
                    {message.cards.map((card, index) => (
                      <Card key={index} className="shadow-sm border-l-4 border-l-isro-orange">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gov-primary mb-2">
                            {card.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
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
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
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
                  isListening ? 'bg-gov-accent text-white' : 'text-muted-foreground'
                }`}
                aria-label={text[language].voiceInput}
              >
                <div className="h-4 w-4 rounded-full bg-current" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-isro-blue hover:bg-isro-blue/90 text-white px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              {text[language].send}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;