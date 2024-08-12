import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TagInput from '../../components/review/TagInput';
import ImageUpload from '../../components/review/ImageUpload';

const ReviewForm = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleContentChange = (e) => setContent(e.target.value);
  const handleFileChange = (e) => setFiles([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    try {
      // 1. 모든 이미지 파일 업로드
      const imageKeys = await Promise.all(files.map(async (file) => {
        // Pre-signed URL 요청
        const { data: { presignedUrl, imageKey } } = await axios.get('/api/images/presigned-url');

        // S3에 파일 직접 업로드
        await axios.put(presignedUrl, file, {
          headers: { 'Content-Type': file.type }
        });

        // 이미지 메타데이터 서버에 저장
        await axios.post('/api/images', {
          imageKey: imageKey,
          originalFilename: file.name
        });

        return imageKey;
      }));

      // 2. 리뷰 작성 요청
      await axios.post('/api/reviews', {
        content,
        imageKeys
      });

      alert('리뷰가 성공적으로 등록되었습니다!');
      setContent('');
      setFiles([]);
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
      <form onSubmit={handleSubmit}>
      <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="리뷰 내용을 입력하세요"
          required
      />
        <input
            type="file"
            onChange={handleFileChange}
            multiple
        />
        <button type="submit">리뷰 작성하기</button>
      </form>
  );
};

export default ReviewForm;