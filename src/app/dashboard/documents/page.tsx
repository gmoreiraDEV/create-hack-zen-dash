"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/lib/sidebar-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import {
  FileText,
  Download,
  Upload,
  Search,
  Video,
  Headphones,
  Users,
  Star,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { documentCategories, trainingDocuments } from "@/constants";

export default function Documents() {
  const { isOpen } = useSidebarStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Audio":
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-800";
      case "Video":
        return "bg-blue-100 text-blue-800";
      case "Audio":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDocuments = trainingDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-xl font-semibold text-foreground">
            Training Documents
          </h1>
        </div>

        <div className="p-6 bg-background min-h-screen">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, tags, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {documentCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id
                      ? "ring-2 ring-orange-600 bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.count} documents
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <Card
                key={document.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(document.type)}
                      <Badge className={getTypeColor(document.type)}>
                        {document.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {document.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {document.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {document.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {document.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>By {document.author}</span>
                      <span>{document.size}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {document.downloads} downloads
                      </div>
                      <span>Updated {document.lastUpdated}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">24</div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Download className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">5.1K</div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">1.2K</div>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
