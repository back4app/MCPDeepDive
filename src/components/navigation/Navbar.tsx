
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, User, Search, Menu, X, Bell, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './MobileMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // This would come from a global state or context
  const isMobile = useIsMobile();
  const isLoggedIn = false; // Replace with actual auth state

  return (
    <nav className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="w-7 h-7 text-strava-orange" />
            <span className="font-bold text-lg hidden sm:inline-block">Fitness Challenge Hub</span>
          </Link>
        </div>

        {!isMobile && (
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/challenges" className="text-gray-700 hover:text-strava-orange transition-colors">
              Challenges
            </Link>
            <Link to="/group-challenges" className="text-gray-700 hover:text-strava-orange transition-colors">
              Group Challenges
            </Link>
            <Link to="/leaderboards" className="text-gray-700 hover:text-strava-orange transition-colors">
              Leaderboards
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-strava-orange transition-colors flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  Community
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/friends" className="w-full cursor-pointer">Friends</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 w-40 lg:w-60 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-strava-orange/20"
              />
            </div>
          )}

          <Link to="/notifications" className="relative">
            <Bell className="h-6 w-6 text-gray-700 hover:text-strava-orange transition-colors" />
            {unreadNotifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
              >
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </Badge>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Avatar className="h-8 w-8 border-2 border-gray-200">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-strava-blue text-white">JD</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm" className="strava-button">Sign up</Button>
              </Link>
            </div>
          )}

          <button 
            className="block md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 
              <X className="h-6 w-6 text-gray-700" /> : 
              <Menu className="h-6 w-6 text-gray-700" />
            }
          </button>
        </div>
      </div>

      {isOpen && isMobile && <MobileMenu isLoggedIn={isLoggedIn} onClose={() => setIsOpen(false)} />}
    </nav>
  );
}
