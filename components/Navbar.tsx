'use client';

import Link from 'next/link';
import { Trophy, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Check session on mount and whenever pathname changes
    const checkSession = () => {
      const userId = localStorage.getItem('userId');
      const userToken = localStorage.getItem('userToken');
      
      if (userId && userToken) {
        setIsLoggedIn(true);
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch (e) {
            console.error('Error parsing currentUser:', e);
          }
        }
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    checkSession();
  }, [pathname]); // Re-check when pathname changes

  const handleLogout = () => {
    // Keep saved credentials for auto-fill
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const savedName = localStorage.getItem('savedName');
    
    // Clear session
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    
    // Restore saved credentials
    if (savedEmail) localStorage.setItem('savedEmail', savedEmail);
    if (savedPassword) localStorage.setItem('savedPassword', savedPassword);
    if (savedName) localStorage.setItem('savedName', savedName);
    
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowProfileMenu(false);
    router.push('/login');
  };
  
  const isActive = (path: string) => pathname === path;
  
  return (
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-xl shadow-md group-hover:shadow-lg transition transform group-hover:scale-110">
                <Trophy className="w-6 h-6 text-white animate-bounce" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Beli Trophy
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                href="/" 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'text-orange-600' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Home
                {isActive('/') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></span>
                )}
              </Link>
              
              <Link 
                href="/produk" 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/produk') 
                    ? 'text-orange-600' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Produk
                {isActive('/produk') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></span>
                )}
              </Link>
              
              <Link 
                href="/more-info" 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/more-info') 
                    ? 'text-orange-600' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                More Info
                {isActive('/more-info') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></span>
                )}
              </Link>
            </nav>

            {/* Login / Profile */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-orange-50 hover:bg-orange-100 rounded-lg transition border border-orange-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push('/profile');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-3 transition"
                    >
                      <Settings className="w-4 h-4" />
                      Pengaturan Profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center gap-1 pb-3">
            <Link 
              href="/" 
              className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/') 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            
            <Link 
              href="/produk" 
              className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/produk') 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600'
              }`}
            >
              Produk
            </Link>
            
            <Link 
              href="/more-info" 
              className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/more-info') 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600'
              }`}
            >
              Info
            </Link>
          </nav>
        </div>
      </header>
  );
}
