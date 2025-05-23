
import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Medal, Trophy, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample leaderboard data
const leaderboardData = [
  { rank: 1, name: "Emma Johnson", points: 1250, challenges: 12, achievements: 8 },
  { rank: 2, name: "Michael Chen", points: 1120, challenges: 10, achievements: 7 },
  { rank: 3, name: "Sophia Rodriguez", points: 980, challenges: 9, achievements: 6 },
  { rank: 4, name: "James Wilson", points: 830, challenges: 8, achievements: 5 },
  { rank: 5, name: "Olivia Brown", points: 790, challenges: 7, achievements: 4 },
  { rank: 6, name: "Noah Davis", points: 720, challenges: 7, achievements: 3 },
  { rank: 7, name: "Ava Martinez", points: 680, challenges: 6, achievements: 3 },
  { rank: 8, name: "William Taylor", points: 640, challenges: 6, achievements: 2 },
  { rank: 9, name: "Isabella Thomas", points: 590, challenges: 5, achievements: 2 },
  { rank: 10, name: "Benjamin Moore", points: 550, challenges: 5, achievements: 1 },
];

const Leaderboards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
  const [selectedChallenge, setSelectedChallenge] = useState('all-challenges');

  // Filter leaderboard data based on search query
  const filteredData = leaderboardData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboards</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              See how you stack up against other athletes. Complete challenges to earn points and climb the rankings!
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                <Trophy className="h-5 w-5 text-strava-orange" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-strava-orangeLight">Emma Johnson</div>
                <p className="text-xs text-gray-500">1,250 total points</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Challenges</CardTitle>
                <Medal className="h-5 w-5 text-strava-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-strava-blueLight">Emma Johnson</div>
                <p className="text-xs text-gray-500">12 completed challenges</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Achievements</CardTitle>
                <Award className="h-5 w-5 text-strava-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-strava-blueLight">Emma Johnson</div>
                <p className="text-xs text-gray-500">8 achievements unlocked</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-challenges">All Challenges</SelectItem>
                  <SelectItem value="5k-run">5K Run Challenge</SelectItem>
                  <SelectItem value="10k-ride">10K Bike Ride</SelectItem>
                  <SelectItem value="steps-challenge">Steps Challenge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full md:w-[300px]" 
              />
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableCaption>Current rankings based on challenge points.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Challenges</TableHead>
                  <TableHead className="text-right">Achievements</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((user) => (
                  <TableRow key={user.rank} className={user.rank <= 3 ? "bg-gray-50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {user.rank === 1 ? (
                          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                        ) : user.rank === 2 ? (
                          <Medal className="h-5 w-5 text-gray-400 mr-2" />
                        ) : user.rank === 3 ? (
                          <Medal className="h-5 w-5 text-amber-700 mr-2" />
                        ) : (
                          <span className="w-5 mr-2 text-center">{user.rank}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-right font-semibold">{user.points.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{user.challenges}</TableCell>
                    <TableCell className="text-right">{user.achievements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboards;
