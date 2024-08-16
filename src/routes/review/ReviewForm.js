import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import apiFetch from '../../utils/api';


const ReviewForm = () => {
  const { campsiteId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loginName, setLoginName] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [campsiteName, setCampsiteName] = useState('');
  const [imageData, setImageData] = useState([]);


  const reviewOnChange = (e) => {
    setContent(e.target.value);
  }

  const fileOnChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  }



  //파일 업로드 후 객체 url 반환
  const uploadImages = async () => {
    if (files.length === 0) return [];
    const presignedUrlsResponse = await apiFetch(`/images/presigned-urls?count=${files.length}`, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('Authorization')
      }
    });
    const presignedUrls = await presignedUrlsResponse.json();
    return await Promise.all(files.map(async (file, index) => {
      const response = await fetch(presignedUrls[index], {
        method: 'PUT',
        body: file,
        headers: {'Content-Type': file.type}
      });
      if (response.ok) {
        return presignedUrls[index].split('?')[0];
      }
      throw new Error(`Failed to upload image ${index + 1}`);
    }));
  }

  const saveImageUrls = async (imageUrls, reviewId) => {
    try {
      const response = await apiFetch('/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        },
        body: JSON.stringify({ imageUrls, reviewId})
      });

      if (!response.ok) {
        throw new Error('Failed to save image URLs');
      }

      const savedImages = await response.json();

      return savedImages.map(img => ({ id: img.id, url: img.url,  review_id: reviewId  }));
    } catch (error) {
      console.error('Error saving image URLs:', error);
      throw error;
    }
  };


  const reviewOnClick = async () => {
    try {
      //presigned-url로 업로드 후 객체 url 반환
      const uploadedImageUrls = await uploadImages();


      const response = await apiFetch(`/reviews/${campsiteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        },
        body: JSON.stringify({
          content
          //imageIds: imageData.map(img => img.id)
        }),
      });

      if (response.ok) {
        const reviewData = await response.json();
        const reviewId = reviewData.id; // 서버에서 반환한 리뷰 ID

        // 이미지 URL을 서버에 저장하고 이미지 데이터를 받아옵니다.
        const imageData = await saveImageUrls(uploadedImageUrls, reviewId);

        alert('리뷰 작성에 성공했습니다.');
        navigate(`/detail/${campsiteId}`);
      } else {
        alert('리뷰 작성에 실패했습니다.');
      }
    } catch(error) {
      console.error(error);
      alert('리뷰 작성 중 오류가 발생했습니다.');
    }
  }


  const LoadLoginUser = async () => {
    const response = await apiFetch(`/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem("Authorization")
      }
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setLoginName(json.fullName);
    }
  }

  const LoadCampsiteInfo = async () => {
    const response = await apiFetch(`/campsite/${campsiteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem("Authorization")
      }
    });
    const json = await response.json();
    if (response.ok) {
      setCampsiteName(json.name);
    }
  }

  useEffect(() => {
    return () => {
      previews.forEach(URL.revokeObjectURL);
    };
  }, [previews]);

  useEffect(() => {
    LoadLoginUser();
    LoadCampsiteInfo();
  }, [])

  return (
      <div className="review-form-container">

        <h1>리뷰 작성</h1>
        <h2>캠핑장: {campsiteName}</h2>
        {/*<h3>작성자: {loginName}</h3>*/}
        <textarea
            name='content'
            value={content}
            onChange={reviewOnChange}
            placeholder="리뷰를 작성해주세요..."
            className="review-textarea"
        />
        <div className="file-input-container">
          <label htmlFor="file-input" className="file-input-label">
            사진 추가하기
          </label>
          <input
              id="file-input"
              type="file"
              multiple
              onChange={fileOnChange}
              className="file-input"
          />
        </div>
        <div className="preview-container">
          {previews.map((preview, index) => (
              <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
              />
          ))}
        </div>

        <div className="button-container">
          <Link to={`/detail/${campsiteId}`} className="back-button">
            &larr; 뒤로 가기
          </Link>
          <button onClick={reviewOnClick} className="submit-button">작성하기</button>
        </div>
      </div>
  )
}

export default ReviewForm;