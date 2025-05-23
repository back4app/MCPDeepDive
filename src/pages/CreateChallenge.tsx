import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Image, Upload, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Validation schema for the challenge form
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(50, {
    message: "Title must not exceed 50 characters."
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  difficulty: z.string({
    required_error: "Please select a difficulty level.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  }),
  privacyType: z.enum(["public", "private"], {
    required_error: "Please select a privacy setting.",
  }),
});

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "",
      duration: "",
      privacyType: "public",
    },
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a challenge object
    const newChallenge = {
      id: Date.now(), // temporary ID for demo
      title: values.title,
      description: values.description,
      category: values.category,
      difficulty: values.difficulty,
      duration: values.duration,
      image: imagePreview || "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", // Use default if no image uploaded
      privacyType: values.privacyType,
      participants: 0,
      featured: false,
      createdAt: new Date().toISOString(),
    };

    // In a real app, this would save to a database
    console.log("New challenge:", newChallenge);
    
    // Show success message
    toast.success("Challenge created successfully!");
    
    // Redirect to challenges page
    setTimeout(() => {
      navigate("/challenges");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link to="/challenges" className="inline-flex items-center text-strava-orange hover:text-strava-orangeDark mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create a Challenge</h1>
            <p className="text-gray-600 mt-2">Set up a new challenge for the community or just your friends.</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {/* Challenge Basic Info */}
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Challenge Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 30-Day Running Challenge" {...field} />
                            </FormControl>
                            <FormDescription>
                              A catchy name for your challenge.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your challenge in detail" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Explain what participants will be doing and what goals they should aim for.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div>
                    {/* Challenge Cover Image */}
                    <div className="mb-6">
                      <FormLabel className="block mb-2">Challenge Cover Image</FormLabel>
                      <div className={`border-2 border-dashed rounded-lg ${imagePreview ? 'border-gray-300' : 'border-gray-400'} bg-gray-50 p-4 text-center`}>
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="mx-auto h-48 object-cover rounded-md" 
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={() => {
                                setImagePreview(null);
                                setImageFile(null);
                              }}
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div className="py-10">
                            <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 mb-2">Upload a cover image for your challenge</p>
                            <p className="text-xs text-gray-400 mb-4">PNG, JPG or GIF up to 5MB</p>
                            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                            <input 
                              id="image-upload" 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageUpload}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Challenge Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Running">Running</SelectItem>
                            <SelectItem value="Walking">Walking</SelectItem>
                            <SelectItem value="Cycling">Cycling</SelectItem>
                            <SelectItem value="Strength">Strength</SelectItem>
                            <SelectItem value="Yoga">Yoga</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="7 days">7 days</SelectItem>
                            <SelectItem value="14 days">14 days</SelectItem>
                            <SelectItem value="21 days">21 days</SelectItem>
                            <SelectItem value="30 days">30 days</SelectItem>
                            <SelectItem value="60 days">60 days</SelectItem>
                            <SelectItem value="90 days">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Privacy Settings */}
                <FormField
                  control={form.control}
                  name="privacyType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Privacy</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center">
                              <Unlock className="h-4 w-4 mr-2 text-gray-500" />
                              Public - Anyone can join this challenge
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center">
                              <Lock className="h-4 w-4 mr-2 text-gray-500" />
                              Private - Only people with the invite link can join
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Submission Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/challenges')}>
                    Cancel
                  </Button>
                  <Button type="submit" className="strava-button">
                    Create Challenge
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateChallenge;
