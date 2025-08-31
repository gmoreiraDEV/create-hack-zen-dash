"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSidebarStore } from "@/lib/sidebar-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { FlagIcon, Plus, MapPin, Calendar, Phone, Mail } from "lucide-react";
import { Missionary } from "@/types/dashboard";
import { mockMissionaries } from "@/constants";

export default function Missionaries() {
  const { isOpen } = useSidebarStore();
  const [missionaries, setMissionaries] =
    useState<Missionary[]>(mockMissionaries);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMissionary, setNewMissionary] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "active" as "active" | "inactive" | "on-leave",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddMissionary = () => {
    if (!newMissionary.name || !newMissionary.email) return;

    const missionary: Missionary = {
      id: Date.now().toString(),
      ...newMissionary,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setMissionaries([...missionaries, missionary]);
    setNewMissionary({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "active",
    });
    setIsAddDialogOpen(false);
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
          <h1 className="text-xl font-semibold text-foreground">
            Missionaries
          </h1>
        </div>

        <div className="p-6 bg-background min-h-screen">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Missionaries
                </CardTitle>
                <FlagIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{missionaries.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active worldwide
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {missionaries.filter((m) => m.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently serving
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {missionaries.filter((m) => m.status === "on-leave").length}
                </div>
                <p className="text-xs text-muted-foreground">Temporary leave</p>
              </CardContent>
            </Card>
          </div>

          {/* Missionaries List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Missionaries Directory</CardTitle>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Missionary
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Missionary</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new missionary.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newMissionary.name}
                          onChange={(e) =>
                            setNewMissionary({
                              ...newMissionary,
                              name: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newMissionary.email}
                          onChange={(e) =>
                            setNewMissionary({
                              ...newMissionary,
                              email: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={newMissionary.phone}
                          onChange={(e) =>
                            setNewMissionary({
                              ...newMissionary,
                              phone: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={newMissionary.location}
                          onChange={(e) =>
                            setNewMissionary({
                              ...newMissionary,
                              location: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Select
                          value={newMissionary.status}
                          onValueChange={(
                            value: "active" | "inactive" | "on-leave"
                          ) =>
                            setNewMissionary({
                              ...newMissionary,
                              status: value,
                            })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="on-leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={handleAddMissionary}
                        disabled={!newMissionary.name || !newMissionary.email}
                      >
                        Add Missionary
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missionaries.map((missionary) => (
                  <div
                    key={missionary.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={missionary.avatar}
                        alt={missionary.name}
                      />
                      <AvatarFallback>
                        {missionary.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{missionary.name}</h3>
                        <Badge className={getStatusColor(missionary.status)}>
                          {missionary.status.replace("-", " ")}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {missionary.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {missionary.phone}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {missionary.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined{" "}
                          {new Date(missionary.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
