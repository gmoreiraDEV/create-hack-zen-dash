"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebarStore } from "@/lib/sidebar-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import {
  Mail,
  Send,
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Circle,
  CheckCheck,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function Messages() {
  const { isOpen } = useSidebarStore();
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock conversations data
  const conversations = [
    {
      id: "1",
      name: "John Smith",
      role: "Senior Missionary",
      location: "São Paulo, Brazil",
      avatar: "/avatars/01.png",
      lastMessage: "Thanks for the training materials! Very helpful.",
      timestamp: "2 min ago",
      unread: 0,
      online: true,
      type: "direct",
    },
    {
      id: "2",
      name: "Maria Santos",
      role: "Cultural Coordinator",
      location: "Rio de Janeiro, Brazil",
      avatar: "/avatars/02.png",
      lastMessage: "The cultural workshop was amazing. When is the next one?",
      timestamp: "15 min ago",
      unread: 2,
      online: true,
      type: "direct",
    },
    {
      id: "3",
      name: "Training Team",
      role: "Group Chat",
      location: "Multiple Locations",
      avatar: "/avatars/group.png",
      lastMessage: "David: New orientation materials are ready for review",
      timestamp: "1 hour ago",
      unread: 5,
      online: false,
      type: "group",
    },
    {
      id: "4",
      name: "Ana Rodriguez",
      role: "Field Coordinator",
      location: "Bogotá, Colombia",
      avatar: "/avatars/04.png",
      lastMessage: "Can we schedule a call about the outreach program?",
      timestamp: "3 hours ago",
      unread: 1,
      online: false,
      type: "direct",
    },
    {
      id: "5",
      name: "Leadership Council",
      role: "Group Chat",
      location: "Regional Leaders",
      avatar: "/avatars/leadership.png",
      lastMessage: "Meeting scheduled for next Friday at 2 PM",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      type: "group",
    },
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: "1",
      senderId: "2",
      senderName: "John Smith",
      content:
        "Hi! I wanted to thank you for the orientation materials you sent.",
      timestamp: "10:30 AM",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      content:
        "You're welcome! I'm glad they were helpful. How is your first week going?",
      timestamp: "10:32 AM",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      senderId: "2",
      senderName: "John Smith",
      content:
        "It's been great! The team here is very welcoming. I have a few questions about the cultural guidelines though.",
      timestamp: "10:35 AM",
      status: "read",
      type: "text",
    },
    {
      id: "4",
      senderId: "me",
      senderName: "You",
      content:
        "Of course! Feel free to ask anything. That's what I'm here for.",
      timestamp: "10:36 AM",
      status: "read",
      type: "text",
    },
    {
      id: "5",
      senderId: "2",
      senderName: "John Smith",
      content: "Thanks for the training materials! Very helpful.",
      timestamp: "10:45 AM",
      status: "delivered",
      type: "text",
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Circle className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main
        className={`flex-1 overflow-auto bg-background transition-all duration-300 ${
          isOpen ? "ml-0" : "ml-0"
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b bg-card">
          <SidebarToggle />
          <h1 className="text-xl font-semibold text-foreground">Messages</h1>
        </div>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Conversations Sidebar */}
          <div className="w-80 border-r bg-card flex flex-col">
            {/* Search and New Message */}
            <div className="p-4 border-b space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Message
              </Button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {conversation.role} • {conversation.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="ml-2 bg-orange-600 text-primary-foreground">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.avatar} />
                        <AvatarFallback>
                          {selectedConv.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConv.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">{selectedConv.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedConv.online
                          ? "Online"
                          : "Last seen 2 hours ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === "me"
                            ? "bg-orange-600 text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 ${
                            message.senderId === "me"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          <span className="text-xs">{message.timestamp}</span>
                          {message.senderId === "me" &&
                            getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-card">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
