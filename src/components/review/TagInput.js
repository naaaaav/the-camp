import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && input) {
            e.preventDefault();
            setTags([...tags, input]);
            setInput('');
        }
    };

    return (
        <div className="tag-input">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="태그를 추가하세요"
            />
            <div className="tags">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default TagInput;