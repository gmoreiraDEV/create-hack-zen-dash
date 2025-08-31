"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore } from "@/lib/sidebar-store";
import { Music, CheckCircle, AlertCircle } from "lucide-react";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { menuItems } from "@/constants";
import { AppSidebar } from "@/components/app-sidebar";

export default function UploadSound() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Validate MP3 files only
      const validFiles = files.filter(
        (file) => file.type === "audio/mp3" || file.name.match(/\.mp3$/i)
      );

      if (validFiles.length !== files.length) {
        alert("Please select only MP3 files");
        return;
      }

      if (validFiles.length > 2) {
        alert("Please select only 2 MP3 files at a time");
        return;
      }

      setSelectedFiles(validFiles);
      setUploadStatus("idle");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (files.length > 0) {
      // Validate MP3 files only
      const validFiles = files.filter(
        (file) => file.type === "audio/mp3" || file.name.match(/\.mp3$/i)
      );

      if (validFiles.length !== files.length) {
        alert("Please select only MP3 files");
        return;
      }

      if (validFiles.length > 2) {
        alert("Please select only 2 MP3 files at a time");
        return;
      }

      setSelectedFiles(validFiles);
      setUploadStatus("idle");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const simulateUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Simulate success/error randomly
    const success = Math.random() > 0.2; // 80% success rate
    setUploadStatus(success ? "success" : "error");
    setIsUploading(false);
  };

  const resetUpload = () => {
    setSelectedFiles([]);
    setUploadProgress(0);
    setUploadStatus("idle");
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const { isOpen } = useSidebarStore();

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
          <h1 className="text-xl font-semibold text-foreground">Upload</h1>
        </div>
        <div className="p-6 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Upload Audio File
              </CardTitle>
              <CardDescription>
                Upload exactly 2 MP3 files to the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  selectedFiles.length > 0
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedFiles.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Music className="h-12 w-12 text-green-500" />
                    </div>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-white rounded border"
                        >
                          <div className="flex items-center gap-2">
                            <Music className="h-4 w-4 text-green-500" />
                            <span className="font-medium text-green-700">
                              {file.name}
                            </span>
                          </div>
                          <span className="text-sm text-green-600">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      ))}
                      {selectedFiles.length === 1 && (
                        <p className="text-sm text-orange-600 font-medium">
                          Please select one more MP3 file (2 required)
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetUpload}
                      disabled={isUploading}
                    >
                      Choose Different Files
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Music className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Drag and drop 2 MP3 files here
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        or click to browse files
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse MP3 Files
                    </Button>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <Input
                ref={fileInputRef}
                type="file"
                accept=".mp3,audio/mp3"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Upload Progress */}
              {selectedFiles.length > 0 && (
                <div className="space-y-4">
                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Upload Progress</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  {/* Upload Status */}
                  {uploadStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">
                        File uploaded successfully!
                      </span>
                    </div>
                  )}

                  {uploadStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span className="text-red-700">
                        Upload failed. Please try again.
                      </span>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex gap-2">
                    <Button
                      onClick={simulateUpload}
                      disabled={
                        isUploading ||
                        uploadStatus === "success" ||
                        selectedFiles.length !== 2
                      }
                      className="flex-1"
                    >
                      {isUploading
                        ? "Uploading..."
                        : `Upload ${selectedFiles.length}/2 Files`}
                    </Button>
                    {uploadStatus === "success" && (
                      <Button variant="outline" onClick={resetUpload}>
                        Upload Another
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* File Format Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">
                  Upload Requirements
                </h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• Format: MP3 files only</div>
                  <div>• Quantity: Exactly 2 files required</div>
                  <div>• Max size: 50MB per file</div>
                  <div>• Quality: Any bitrate supported</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
