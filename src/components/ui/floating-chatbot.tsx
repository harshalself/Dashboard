import { useState, useRef, useEffect } from "react";
import { MessageCircle, ChevronDown, Send } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FloatingChatbotProps {
  // No props needed - component handles state internally
}

export function FloatingChatbot(props?: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you with any questions about the admin panel. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot response
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (
      lowerMessage.includes("theme") ||
      lowerMessage.includes("color")
    ) {
      return "You can change the theme using the floating theme button on your screen! Just click on it to see all available color themes.";
    } else if (
      lowerMessage.includes("dashboard") ||
      lowerMessage.includes("panel")
    ) {
      return "The admin panel provides access to various features including user management, analytics, activity monitoring, and settings. What specific area would you like to know more about?";
    } else if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support")
    ) {
      return "I'm here to help! You can ask me about any features of the admin panel, navigation, or general questions. What would you like to know?";
    } else if (
      lowerMessage.includes("user") ||
      lowerMessage.includes("account")
    ) {
      return "You can manage users through the Users section in the dashboard. This includes viewing all users, inviting new users, managing permissions, and more.";
    } else if (
      lowerMessage.includes("analytics") ||
      lowerMessage.includes("data")
    ) {
      return "The Analytics section provides insights and data visualization for your admin panel. You can view various metrics and reports there.";
    } else {
      return "That's an interesting question! While I'm a simple demo chatbot, in a real implementation I would be connected to advanced AI services to provide more comprehensive assistance. Is there anything specific about the admin panel I can help with?";
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isOpen) {
    return (
      <>
        {/* Chatbot Interface - positioned above the button */}
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="h-[32rem] shadow-xl flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <CardTitle className="text-base">Chat Assistant</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 h-full">
                <div className="space-y-3 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 opacity-70`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground p-2 rounded-lg text-sm">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                            <div
                              className="w-2 h-2 bg-current rounded-full animate-pulse"
                              style={{ animationDelay: "0.2s" }}></div>
                            <div
                              className="w-2 h-2 bg-current rounded-full animate-pulse"
                              style={{ animationDelay: "0.4s" }}></div>
                          </div>
                          <span className="ml-2">Typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isTyping}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Button - stays fixed in position */}
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={() => setIsOpen(false)}>
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        </Button>
      </>
    );
  }

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      onClick={() => setIsOpen(true)}>
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
    </Button>
  );
}
