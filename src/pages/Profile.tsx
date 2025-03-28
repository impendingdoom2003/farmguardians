
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Bell, ArrowLeft } from 'lucide-react';
import { UserProfile, currentUser, updateUserProfile } from '@/utils/userUtils';

import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const [user, setUser] = useState<UserProfile>(currentUser);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      notifyEmail: user.notificationPreferences.email,
      notifyPush: user.notificationPreferences.push,
      notifySms: user.notificationPreferences.sms,
    }
  });

  const onSubmit = (data: any) => {
    const updatedUser = updateUserProfile({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      notificationPreferences: {
        email: data.notifyEmail,
        push: data.notifyPush,
        sms: data.notifySms
      }
    });
    
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        <header className="bg-farm-green-dark text-white p-4 mb-6 rounded-md shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="w-8 h-8 mr-2" />
              <h1 className="text-2xl font-bold">FarmGuardians</h1>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-farm-green-light"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </div>
          </div>
        </header>
        
        <main className="space-y-6">
          <div className="flex items-center mb-6">
            <User className="mr-2 h-6 w-6" />
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                  <CardDescription>Your account information</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Last login: {user.lastLogin.toLocaleString()}
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="border-t pt-4 mt-6">
                        <div className="flex items-center mb-4">
                          <Bell className="mr-2 h-4 w-4" />
                          <h3 className="text-lg font-medium">Notification Preferences</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="notifyEmail"
                            render={({ field }) => (
                              <FormItem className="flex justify-between items-center">
                                <div>
                                  <FormLabel>Email Notifications</FormLabel>
                                  <FormDescription>Receive alerts via email</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="notifyPush"
                            render={({ field }) => (
                              <FormItem className="flex justify-between items-center">
                                <div>
                                  <FormLabel>Push Notifications</FormLabel>
                                  <FormDescription>Receive alerts on this device</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="notifySms"
                            render={({ field }) => (
                              <FormItem className="flex justify-between items-center">
                                <div>
                                  <FormLabel>SMS Notifications</FormLabel>
                                  <FormDescription>Receive alerts via text message</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
