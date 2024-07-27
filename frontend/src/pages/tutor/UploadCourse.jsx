import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const UploadCourse = () => {
  const [videos, setVideos] = useState([{ title: '', link: '' }]);

  const handleAddVideo = () => {
    setVideos([...videos, { title: '', link: '' }]);
  };

  const handleVideoTitleChange = (index, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index].title = value;
    setVideos(updatedVideos);
  };

  const handleVideoLinkChange = (index, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index].link = value;
    setVideos(updatedVideos);
  };

  return (
    <div className='flex justify-center'>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Upload your course</CardTitle>
          <CardDescription>Fill in the information below to upload your course.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="course-name">Course Name</Label>
            <Input className="w-full max-w-sm" id="course-name" placeholder="Course Name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course-tagline">Course Tagline</Label>
            <Input className="w-full max-w-sm" id="course-tagline" placeholder="Course Tagline" />
          </div>
          <div className="grid gap-2">
            <Label>Course Image</Label>
            <div className="flex items-center gap-4">
              <div className="grid gap-2">
                <Input placeholder="Enter Lighthouse Image Url"></Input>
                <p className="text-xs text-gray-500">Recommended image size is 1080x720 pixels.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course-description">Course Description</Label>
            <Textarea className="w-full max-w-sm" id="course-description" placeholder="Course Description" />
          </div>
          <div className="grid gap-2">
            <Label>Course Category</Label>
            <Select className="min-w-[200px]" defaultValue="web-dev" id="course-category">
              <Input className="w-full max-w-sm" placeholder='Enter category' />
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-base font-medium">Course Videos</Label>
            {videos.map((video, index) => (
              <div key={index} className="space-y-2">
                <div className="grid gap-2">
                  <Label htmlFor={`video-title-${index + 1}`}>Video Title {index + 1}</Label>
                  <Input
                    id={`video-title-${index + 1}`}
                    placeholder="Introduction to the Course"
                    value={video.title}
                    onChange={(e) => handleVideoTitleChange(index, e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`video-link-${index + 1}`}>Video Link {index + 1}</Label>
                  <Input
                    id={`video-link-${index + 1}`}
                    placeholder="Video Link from Lighthouse"
                    type="url"
                    value={video.link}
                    onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={handleAddVideo}>
              Add Video
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadCourse;
