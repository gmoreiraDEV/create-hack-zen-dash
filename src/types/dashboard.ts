export interface Missionary {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
  avatar?: string;
}
