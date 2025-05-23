
import { Link } from "react-router-dom";
import { Activity, Award, Users, BarChart2, LogIn, UserPlus, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isLoggedIn: boolean;
  onClose: () => void;
}

export function MobileMenu({ isLoggedIn, onClose }: MobileMenuProps) {
  const unreadNotifications = 3; // This would come from a global state or context
  
  return (
    <div className="fixed inset-0 top-16 bg-white z-40 animate-fade-in">
      <div className="container px-4 py-6 flex flex-col h-full">
        <div className="space-y-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search challenges, users..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm"
            />
          </div>
          
          <div className="space-y-1">
            <Link 
              to="/challenges" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Activity className="mr-3 h-5 w-5 text-strava-orange" />
              <span>Challenges</span>
            </Link>
            
            <Link 
              to="/group-challenges" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Users className="mr-3 h-5 w-5 text-strava-blue" />
              <span>Group Challenges</span>
            </Link>
            
            <Link 
              to="/leaderboards" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <BarChart2 className="mr-3 h-5 w-5 text-strava-blue" />
              <span>Leaderboards</span>
            </Link>
            
            <Link 
              to="/notifications" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Bell className="mr-3 h-5 w-5 text-strava-gray" />
              <span>Notifications</span>
              {unreadNotifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="ml-2 px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
                >
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </Badge>
              )}
            </Link>
            
            <Separator />
            
            <Link 
              to="/friends" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Users className="mr-3 h-5 w-5 text-strava-gray" />
              <span>Friends</span>
            </Link>
            
            <Link 
              to="/profile" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <User className="mr-3 h-5 w-5 text-strava-gray" />
              <span>Profile</span>
            </Link>
            
            {isLoggedIn && (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Activity className="mr-3 h-5 w-5 text-strava-gray" />
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  to="/achievements" 
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Award className="mr-3 h-5 w-5 text-strava-gray" />
                  <span>Achievements</span>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {!isLoggedIn && (
          <div className="mt-auto space-y-3 py-4">
            <Link to="/login" onClick={onClose} className="w-full">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log in</span>
              </Button>
            </Link>
            
            <Link to="/signup" onClick={onClose} className="w-full">
              <Button className="w-full strava-button flex items-center justify-center">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign up</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
