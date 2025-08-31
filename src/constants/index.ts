import { Missionary } from "@/types/dashboard";
import {
  BarChart3,
  FileText,
  Calendar,
  Mail,
  Settings,
  FlagIcon,
  BookOpen,
  Globe,
  Headphones,
  Users,
  Star,
} from "lucide-react";

export const menuItems = [
  {
    title: "Missionaries",
    url: "/dashboard/missionaries",
    icon: FlagIcon,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: Mail,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export const mockMissionaries: Missionary[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@mission.org",
    phone: "+1 (555) 123-4567",
    location: "São Paulo, Brazil",
    status: "active",
    joinDate: "2024-01-15",
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@mission.org",
    phone: "+55 11 98765-4321",
    location: "Rio de Janeiro, Brazil",
    status: "active",
    joinDate: "2024-02-20",
    avatar: "/avatars/02.png",
  },
  {
    id: "3",
    name: "David Johnson",
    email: "david.johnson@mission.org",
    phone: "+1 (555) 987-6543",
    location: "Lima, Peru",
    status: "on-leave",
    joinDate: "2023-11-10",
    avatar: "/avatars/03.png",
  },
  {
    id: "4",
    name: "Ana Rodriguez",
    email: "ana.rodriguez@mission.org",
    phone: "+51 987 654 321",
    location: "Bogotá, Colombia",
    status: "active",
    joinDate: "2024-03-05",
    avatar: "/avatars/04.png",
  },
];

export const metrics = {
  totalMissionaries: 2350,
  activeMissions: 145,
  countriesReached: 67,
  monthlyGrowth: 12.5,
  conversionRate: 8.7,
  totalDonations: 125000,
  avgMissionDuration: 18,
  successRate: 94.2,
};

export const monthlyData = [
  { month: "Jan", missionaries: 2100, missions: 120, donations: 98000 },
  { month: "Feb", missionaries: 2180, missions: 128, donations: 105000 },
  { month: "Mar", missionaries: 2250, missions: 135, donations: 112000 },
  { month: "Apr", missionaries: 2300, missions: 140, donations: 118000 },
  { month: "May", missionaries: 2350, missions: 145, donations: 125000 },
];

export const topCountries = [
  { country: "Brazil", missionaries: 450, percentage: 19.1 },
  { country: "Peru", missionaries: 380, percentage: 16.2 },
  { country: "Colombia", missionaries: 320, percentage: 13.6 },
  { country: "Ecuador", missionaries: 280, percentage: 11.9 },
  { country: "Bolivia", missionaries: 250, percentage: 10.6 },
];

export const documentCategories = [
  { id: "all", name: "All Documents", count: 24, icon: FileText },
  { id: "orientation", name: "Orientation", count: 8, icon: BookOpen },
  { id: "cultural", name: "Cultural Training", count: 6, icon: Globe },
  { id: "language", name: "Language Learning", count: 5, icon: Headphones },
  { id: "leadership", name: "Leadership", count: 3, icon: Users },
  { id: "safety", name: "Safety Protocols", count: 2, icon: Star },
];

export const trainingDocuments = [
  {
    id: "1",
    title: "Missionary Orientation Handbook",
    description:
      "Complete guide for new missionaries covering basics, expectations, and initial training requirements.",
    category: "orientation",
    type: "PDF",
    size: "2.4 MB",
    downloads: 1250,
    rating: 4.8,
    lastUpdated: "2024-08-15",
    author: "Training Department",
    tags: ["handbook", "basics", "new-missionary"],
  },
  {
    id: "2",
    title: "Cultural Sensitivity Training",
    description:
      "Understanding local customs, traditions, and cultural nuances for effective ministry.",
    category: "cultural",
    type: "Video",
    size: "145 MB",
    downloads: 890,
    rating: 4.9,
    lastUpdated: "2024-08-10",
    author: "Dr. Maria Santos",
    tags: ["culture", "sensitivity", "local-customs"],
  },
  {
    id: "3",
    title: "Portuguese Language Basics",
    description:
      "Essential Portuguese phrases and grammar for missionaries in Brazil.",
    category: "language",
    type: "Audio",
    size: "89 MB",
    downloads: 756,
    rating: 4.7,
    lastUpdated: "2024-08-05",
    author: "Language Institute",
    tags: ["portuguese", "language", "brazil"],
  },
  {
    id: "4",
    title: "Leadership in Ministry",
    description:
      "Developing leadership skills and managing missionary teams effectively.",
    category: "leadership",
    type: "PDF",
    size: "1.8 MB",
    downloads: 432,
    rating: 4.6,
    lastUpdated: "2024-07-28",
    author: "Rev. John Smith",
    tags: ["leadership", "management", "teams"],
  },
  {
    id: "5",
    title: "Safety and Security Protocols",
    description:
      "Essential safety guidelines and emergency procedures for missionaries in the field.",
    category: "safety",
    type: "PDF",
    size: "3.2 MB",
    downloads: 1100,
    rating: 4.9,
    lastUpdated: "2024-08-20",
    author: "Security Team",
    tags: ["safety", "security", "emergency"],
  },
  {
    id: "6",
    title: "Cross-Cultural Communication",
    description:
      "Effective communication strategies across different cultures and languages.",
    category: "cultural",
    type: "Video",
    size: "210 MB",
    downloads: 678,
    rating: 4.8,
    lastUpdated: "2024-08-12",
    author: "Communication Experts",
    tags: ["communication", "cross-cultural", "strategies"],
  },
];

export const eventCategories = [
  { id: "all", name: "All Events", color: "bg-gray-500" },
  { id: "training", name: "Training", color: "bg-blue-500" },
  { id: "mission", name: "Mission", color: "bg-green-500" },
  { id: "conference", name: "Conference", color: "bg-purple-500" },
  { id: "outreach", name: "Outreach", color: "bg-orange-500" },
  { id: "prayer", name: "Prayer", color: "bg-pink-500" },
];

export const events = [
  {
    id: "1",
    title: "New Missionary Orientation",
    description:
      "Welcome and orientation session for new missionaries joining our mission.",
    date: "2024-09-05",
    time: "09:00",
    duration: "4 hours",
    location: "Training Center, São Paulo",
    category: "training",
    attendees: 25,
    type: "in-person",
    organizer: "Training Department",
  },
  {
    id: "2",
    title: "Monthly Prayer Meeting",
    description:
      "Community prayer session for all missionaries and supporters.",
    date: "2024-09-08",
    time: "19:00",
    duration: "2 hours",
    location: "Main Chapel",
    category: "prayer",
    attendees: 150,
    type: "in-person",
    organizer: "Pastor John Smith",
  },
  {
    id: "3",
    title: "Cultural Sensitivity Workshop",
    description:
      "Interactive workshop on understanding local customs and traditions.",
    date: "2024-09-12",
    time: "14:00",
    duration: "3 hours",
    location: "Virtual Meeting Room",
    category: "training",
    attendees: 45,
    type: "virtual",
    organizer: "Dr. Maria Santos",
  },
  {
    id: "4",
    title: "Community Outreach - Favela Visit",
    description:
      "Organized visit to local communities for outreach and support activities.",
    date: "2024-09-15",
    time: "08:00",
    duration: "6 hours",
    location: "Cidade Tiradentes, São Paulo",
    category: "outreach",
    attendees: 30,
    type: "in-person",
    organizer: "Outreach Team",
  },
  {
    id: "5",
    title: "Leadership Conference 2024",
    description: "Annual conference for missionary leaders and coordinators.",
    date: "2024-09-20",
    time: "09:00",
    duration: "2 days",
    location: "Conference Center, Rio de Janeiro",
    category: "conference",
    attendees: 200,
    type: "in-person",
    organizer: "Leadership Committee",
  },
  {
    id: "6",
    title: "Portuguese Language Class",
    description:
      "Weekly Portuguese language learning session for international missionaries.",
    date: "2024-09-18",
    time: "16:00",
    duration: "2 hours",
    location: "Language Center",
    category: "training",
    attendees: 20,
    type: "in-person",
    organizer: "Language Institute",
  },
];
