import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TagInput from '../../components/review/TagInput';
import ImageUpload from '../../components/review/ImageUpload';

const ReviewContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LocationInput = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 4px;
  }

  span {
    font-size: 14px;
    color: #666;
  }
`;

const ContentTextarea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
`;

const TagContainer = styled.div`
  margin-bottom: 15px;
`;

const TagInputStyled = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
`;

const TagDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: #e0e0e0;
  color: #333;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
  font-size: 12px;
`;

const ImageUploadStyled = styled(ImageUpload)`
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;
`;

const ReviewCreatePage = () => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(['깔끔한', '친절한']);
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, tags, images }),
            });

            if (response.ok) {
                console.log('리뷰가 성공적으로 작성되었습니다.');
            } else {
                console.error('리뷰 작성 실패');
            }
        } catch (error) {
            console.error('리뷰 작성 중 오류 발생:', error);
        }
    };

    return (
        <ReviewContainer>
            <Title>리뷰작성</Title>
            <Form onSubmit={handleSubmit}>
                <LocationInput>
                    <img src="path_to_location_image.jpg" alt="Location" />
                    <span>캠핑장 이름</span>
                </LocationInput>
                <ContentTextarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력해주세요"
                    required
                />
                <TagContainer>
                    <TagInputStyled
                        type="text"
                        placeholder="#으로 태그를 추가해보세요"
                    />
                    <TagDisplay>
                        {tags.map((tag, index) => (
                            <Tag key={index}>#{tag}</Tag>
                        ))}
                    </TagDisplay>
                </TagContainer>
                <ImageUpload images={images} setImages={setImages} />
                <SubmitButton type="submit">리뷰 작성하기</SubmitButton>
            </Form>
        </ReviewContainer>
    );
};

export default ReviewCreatePage;