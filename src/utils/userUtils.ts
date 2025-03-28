
import { toast } from "@/components/ui/use-toast";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "viewer";
  avatar?: string;
  lastLogin: Date;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  phoneNumber?: string;
};

// Mock user data (would be replaced with actual authentication in a real app)
export const currentUser: UserProfile = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@farmguardians.com",
  role: "admin",
  lastLogin: new Date(),
  notificationPreferences: {
    email: true,
    push: true,
    sms: false,
  },
  phoneNumber: "+1 (555) 123-4567",
};

export const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {
  // In a real application, this would make an API call to update the user profile
  Object.assign(currentUser, updatedProfile);
  
  toast({
    title: "Profile Updated",
    description: "Your profile has been successfully updated.",
  });
  
  return currentUser;
};
