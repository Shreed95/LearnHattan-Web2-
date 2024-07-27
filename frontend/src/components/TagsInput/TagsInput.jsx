import React, { useState } from 'react';
import './TagsInput.css';

const TagsInput = ({ onTagsChange, placeholder, className }) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault(); // Prevent the default behavior (form submission)

      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue('');

      if (typeof onTagsChange === 'function') {
        onTagsChange(newTags);
      }
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className={`tags-input-container ${className}`}>
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="tags-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagsInput;
