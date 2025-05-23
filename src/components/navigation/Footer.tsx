
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-strava-orange" />
              <span className="font-bold text-lg">Fitness Challenge Hub</span>
            </div>
            <p className="text-gray-600 text-sm">
              Create, join and track fitness challenges. Compete with friends and earn badges.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-strava-orange transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-strava-orange transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-strava-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/challenges" className="text-gray-600 hover:text-strava-orange text-sm">Challenges</Link></li>
              <li><Link to="/leaderboards" className="text-gray-600 hover:text-strava-orange text-sm">Leaderboards</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-strava-orange text-sm">Community</Link></li>
              <li><Link to="/badges" className="text-gray-600 hover:text-strava-orange text-sm">Badges</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-strava-orange text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-strava-orange text-sm">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-strava-orange text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-strava-orange text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-600 hover:text-strava-orange text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-strava-orange text-sm">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-strava-orange text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 Fitness Challenge Hub. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <select 
              className="bg-gray-100 rounded-md text-sm py-1 px-3 border border-gray-200"
              defaultValue="english"
            >
              <option value="english">English</option>
              <option value="spanish">Español</option>
              <option value="french">Français</option>
              <option value="german">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
