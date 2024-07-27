import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Profile.css';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from '../components/Sidebar';
import FileBase from 'react-file-base64';

const Profile = () => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user")).user;
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState([]);

  const handleFileChange = (e) => {
    // Functionality to handle file change
    const selectedFile = e.target.files[0];
    setPhoto(URL.createObjectURL(selectedFile));
  };

  const handleInterestsChange = (e) => {
    const interestsString = e.target.value;
    const interestsArray = interestsString.split(",").map((interest) => interest.trim());
    setInterests(interestsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/dashboard/user/saveInfo', {
        id: id,
        photo: photo,
        description: description,
        interests: interests
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        alert('Data added successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error adding/updating user data:', error.message);
    }
  };

  return (
    <>
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-xl mx-auto my-4 shadow-xl rounded-xl  mt-20">
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
            <CardDescription>Update your profile information below.</CardDescription>
          </CardHeader>
          <CardHeader>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 p-4 rounded-md">
                <Label className="m-0" htmlFor="file">
                  <div className="flex items-center justify-center cursor-pointer">
                    <div>
                      {photo && <img src={photo} alt="Preview" className=" w-full rounded-full" />}
                    </div>
                    {photo ? null : <FileBase
                      type='file'
                      multiple={false}
                      onDone={({ base64 }) => setPhoto(base64)}
                    />}
                  </div>
                </Label>
              </div>
              <div className="grid gap-0.5">
                <input accept=".jpg, .png, .jpeg" className="hidden" id="file" type="file" onChange={handleFileChange} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea className="min-h-[100px]" id="description" placeholder="Something  about yourself" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Skills</Label>
              <Textarea
                className="min-h-[100px]"
                id="interests"
                placeholder="React,Java,Python"
                value={interests.join(", ")} // Convert array back to string
                onChange={handleInterestsChange}
              />
            </div>
            {/* <div className="space-y-2">
              <Label>Links</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="https://twitter.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
              </div>
            </div> */}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Card>
      </form>

    </>
  );
};

export default Profile;
