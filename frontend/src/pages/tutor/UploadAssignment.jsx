import React from 'react'
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const UploadAssignment = () => {

  const [assignments, setAssignments] = useState([{ id: 1, course: '', title: '', description: '', deadline: '' }]);

  const handleAddAssignment = () => {
    const newAssignment = { id: assignments.length + 1, course: '', title: '', description: '', deadline: '' };
    setAssignments([...assignments, newAssignment]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === id) {
        return { ...assignment, [field]: value };
      }
      return assignment;
    });
    setAssignments(updatedAssignments);
  };

  const handleSubmit = () => {

  };

  return (
    <div className='flex justify-center'>
      <div className="grid w-full max-w-3xl gap-6 mt-8 mb-8">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-gray-500 grid gap-0.5 leading-6 dark:text-gray-400">
            Add the assignments for your students to complete. Click the "Add More Assignments" Button to add more
            assignments.
          </p>
        </div>
        <div className="assignment-container grid gap-6">
          <div className="grid gap-1.5">
            <Label >Course</Label>
            <Input
              type="text"
              placeholder="Course name"
            />
          </div>
          {assignments.map(assignment => (
            <div key={assignment.id} className="assignment-fields grid gap-2">
              <div className="grid gap-1.5">
                <Label htmlFor={`title-${assignment.id}`}>Assignment Title</Label>
                <Input
                  type="text"
                  id={`title-${assignment.id}`}
                  placeholder="Assignment title"
                  value={assignment.title}
                  onChange={(e) => handleInputChange(assignment.id, 'title', e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`description-${assignment.id}`}>Description</Label>
                <Textarea
                  id={`description-${assignment.id}`}
                  placeholder="Assignment description"
                  value={assignment.description}
                  onChange={(e) => handleInputChange(assignment.id, 'description', e.target.value)}
                ></Textarea>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`deadline-${assignment.id}`}>Deadline</Label>
                <Input
                  type="datetime-local"
                  id={`deadline-${assignment.id}`}
                  value={assignment.deadline}
                  onChange={(e) => handleInputChange(assignment.id, 'deadline', e.target.value)}
                />
              </div>
              <hr />
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Button className="add-assignment-btn" onClick={handleAddAssignment}>Add More Assignments</Button>
          </div>
        </div>
        <div className="flex w-full items-end">
          <Button className="ml-auto" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}



export default UploadAssignment