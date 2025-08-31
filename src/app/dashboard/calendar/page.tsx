"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/lib/sidebar-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import {
  Calendar as CalendarIcon,
  Plus,
  MapPin,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
  Bell,
  Video,
} from "lucide-react";
import { useState } from "react";
import { eventCategories, events } from "@/constants";

export default function Calendar() {
  const { isOpen } = useSidebarStore();
  const [selectedView, setSelectedView] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getEventTypeIcon = (type: string) => {
    return type === "virtual" ? (
      <Video className="h-4 w-4" />
    ) : (
      <MapPin className="h-4 w-4" />
    );
  };

  const getCategoryColor = (category: string) => {
    const cat = eventCategories.find((c) => c.id === category);
    return cat ? cat.color : "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const filteredEvents = events.filter((event) => {
    if (selectedCategory === "all") return true;
    return event.category === selectedCategory;
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
            Event Calendar
          </h1>
        </div>

        <div className="p-6 bg-background min-h-screen">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              <Button
                variant={selectedView === "month" ? "default" : "outline"}
                onClick={() => setSelectedView("month")}
              >
                Month
              </Button>
              <Button
                variant={selectedView === "week" ? "default" : "outline"}
                onClick={() => setSelectedView("week")}
              >
                Week
              </Button>
              <Button
                variant={selectedView === "day" ? "default" : "outline"}
                onClick={() => setSelectedView("day")}
              >
                Day
              </Button>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Event
              </Button>
            </div>
          </div>

          {/* Event Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {eventCategories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      September 2024
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Today
                      </Button>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Simple Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-2 text-center text-sm font-medium text-muted-foreground"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const dayNumber = i - 5; // Adjust for month start
                      const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
                      const hasEvent =
                        isCurrentMonth &&
                        [5, 8, 12, 15, 18, 20].includes(dayNumber);

                      return (
                        <div
                          key={i}
                          className={`p-2 h-20 border rounded-lg ${
                            isCurrentMonth
                              ? "bg-background hover:bg-muted cursor-pointer"
                              : "bg-muted/30 text-muted-foreground"
                          } ${hasEvent ? "border-primary" : "border-border"}`}
                        >
                          {isCurrentMonth && (
                            <>
                              <div className="text-sm font-medium">
                                {dayNumber}
                              </div>
                              {hasEvent && (
                                <div className="mt-1">
                                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">
                            {event.title}
                          </h4>
                          <Badge
                            className={`${getCategoryColor(
                              event.category
                            )} text-white`}
                          >
                            {event.category}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time} ({event.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            {getEventTypeIcon(event.type)}
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Events</span>
                      <span className="font-semibold">{events.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-semibold">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Attendees</span>
                      <span className="font-semibold">470</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Virtual Events</span>
                      <span className="font-semibold">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* All Events List */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                        <Badge
                          className={`${getCategoryColor(
                            event.category
                          )} text-white`}
                        >
                          {event.category}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getEventTypeIcon(event.type)}
                          <span className="text-muted-foreground">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Organized by {event.organizer}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
