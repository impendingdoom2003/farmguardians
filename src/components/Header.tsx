
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-farm-green-dark text-white p-4 mb-6 rounded-md shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Shield className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">FarmGuardians</h1>
        </div>
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-farm-warning" />
          <span className="text-sm">Farm Protection: Animal Intrusion & Fire Detection System</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
