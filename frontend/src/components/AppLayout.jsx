import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, Home } from 'lucide-react';
import ExampleDrawer from './Navigation/ExampleDrawer';
import { useNavigate, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center space-x-2"
            >
              <Menu size={20} />
              <span className="hidden sm:inline">Exemples</span>
            </Button>
            
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Accueil</span>
              </Button>
            )}
          </div>
          
          <h1 className="text-xl font-bold text-gray-800">
            Plateforme d'Apprentissage
          </h1>
          
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Drawer */}
      <ExampleDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;