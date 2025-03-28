
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/utils/userUtils';

const Header = () => {
  return (
    <header className="bg-farm-green-dark text-white p-4 mb-6 rounded-md shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Shield className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">FarmGuardians</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-farm-warning" />
            <span className="text-sm">Farm Protection: Animal Intrusion & Fire Detection System</span>
          </div>
          <Link to="/profile">
            <Button variant="ghost" className="text-white hover:bg-farm-green-light p-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt={currentUser.name} />
                  <AvatarFallback className="bg-farm-green-light text-white">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{currentUser.name}</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
