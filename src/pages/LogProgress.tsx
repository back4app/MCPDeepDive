
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Timer, Upload, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Simulated challenge data
const challengesData = [
  {
    id: 1,
    title: "10K Steps Daily",
    description: "Walk at least 10,000 steps every day for a month",
    category: "Walking",
    metrics: { type: "steps", target: 10000, unit: "steps" }
  },
  {
    id: 2,
    title: "Summer Body Challenge",
    description: "Complete daily strength workouts to get ready for summer",
    category: "Strength",
    metrics: { type: "duration", target: 30, unit: "minutes" }
  },
  {
    id: 3,
    title: "Marathon Prep",
    description: "Progressive running program to prepare for a full marathon",
    category: "Running",
    metrics: { type: "distance", target: 5, unit: "km" }
  },
  {
    id: 4,
    title: "30-Day Push-Up Challenge",
    description: "Increase your push-up count from any starting point over 30 days",
    category: "Strength",
    metrics: { type: "reps", target: 50, unit: "push-ups" }
  },
  {
    id: 5,
    title: "Yoga Flow Journey",
    description: "Daily yoga sessions to improve flexibility and mindfulness",
    category: "Yoga",
    metrics: { type: "duration", target: 20, unit: "minutes" }
  },
  {
    id: 6,
    title: "Mountain Biking Explorer",
    description: "Track your mountain biking adventures and earn badges for distance milestones",
    category: "Cycling",
    metrics: { type: "distance", target: 15, unit: "km" }
  },
];

// Define the form schema
const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date for your activity.",
  }),
  value: z.coerce.number({
    required_error: "Please enter a value for your progress.",
  }).min(0.1, {
    message: "Value must be greater than 0.",
  }),
  duration: z.coerce.number().optional(),
  notes: z.string().max(500, {
    message: "Notes cannot be longer than 500 characters.",
  }).optional(),
});

const LogProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [challenge, setChallenge] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      value: undefined,
      duration: undefined,
      notes: "",
    },
  });
  
  // Fetch challenge data (simulated)
  useState(() => {
    const foundChallenge = challengesData.find(c => c.id === Number(id));
    setChallenge(foundChallenge || null);
  });

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API request with setTimeout
    setTimeout(() => {
      console.log('Progress logged:', values, imageFile);
      toast.success("Progress logged successfully!");
      setIsLoading(false);
      navigate(`/challenge/${id}`);
    }, 1500);
  };
  
  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h2>
              <p className="text-gray-600 mb-8">The challenge you're looking for doesn't exist or has been removed.</p>
              <Link to="/challenges">
                <Button>Back to Challenges</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back Link */}
          <Link to={`/challenge/${id}`} className="inline-flex items-center text-strava-orange hover:text-strava-orangeDark mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenge Details
          </Link>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                Log Progress: {challenge?.title}
              </CardTitle>
              <CardDescription>
                Record your progress for today's activity in the {challenge?.title} challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Date Selection */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Activity Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "MMMM d, yyyy")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date()
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Primary Metric */}
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{getMetricLabel(challenge.metrics.type)}</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              placeholder={`Enter ${challenge.metrics.type}`}
                              {...field}
                              className="flex-1"
                              min="0"
                              step={challenge.metrics.type === 'distance' ? "0.01" : "1"}
                            />
                            <span className="ml-2 text-gray-500">{challenge.metrics.unit}</span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          {challenge.metrics.target ? `Target: ${challenge.metrics.target} ${challenge.metrics.unit}` : ''}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Duration (optional for some challenge types) */}
                  {(challenge.metrics.type === 'distance' || challenge.metrics.type === 'reps') && (
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (optional)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                type="number"
                                placeholder="How long did it take?"
                                {...field}
                                className="flex-1"
                                min="0"
                              />
                              <span className="ml-2 text-gray-500">minutes</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {/* Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any notes about today's activity..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <FormLabel htmlFor="photo">Photo (optional)</FormLabel>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <input 
                          type="file" 
                          id="photo" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleImageChange}
                        />
                        <label htmlFor="photo" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                          {!imagePreview ? (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600 font-medium">Upload a photo of your activity</span>
                              <span className="text-xs text-gray-500">Click or drag and drop</span>
                            </>
                          ) : (
                            <div className="relative w-full">
                              <img 
                                src={imagePreview}
                                alt="Preview" 
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm" 
                                className="absolute top-2 right-2 bg-white"
                                onClick={() => {
                                  setImageFile(null);
                                  setImagePreview(null);
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate(`/challenge/${id}`)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Timer className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Log Progress
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to get the appropriate label based on the metric type
function getMetricLabel(type: string): string {
  switch (type) {
    case 'steps':
      return 'Steps Completed';
    case 'distance':
      return 'Distance Completed';
    case 'duration':
      return 'Time Completed';
    case 'reps':
      return 'Repetitions Completed';
    default:
      return 'Value';
  }
}

export default LogProgress;
