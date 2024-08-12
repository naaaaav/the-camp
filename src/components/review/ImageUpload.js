import React from 'react';
import { getPresignedUrl, uploadFileToS3 } from '../../utils/s3UploadUtils';

const ImageUpload = ({ images, setImages }) => {
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        for (const file of files) {
            try {
                // 프리사인드 URL 가져오기
                const presignedUrl = await getPresignedUrl(file.name);

                // S3에 파일 업로드
                const s3Url = await uploadFileToS3(file, presignedUrl);

                // 업로드된 이미지 URL을 상태에 추가
                setImages(prevImages => [...prevImages, s3Url]);
            } catch (error) {
                console.error('Error uploading file:', error);
                // 여기에 에러 처리 로직 추가 (예: 사용자에게 알림)
            }
        }
    };

    return (
        <div className="image-upload">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
            />
            <div className="preview">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Preview ${index}`} style={{width: '100px', height: '100px', objectFit: 'cover', margin: '5px'}} />
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;