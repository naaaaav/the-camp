export async function getPresignedUrl(fileName) {
    const response = await fetch('/api/presigned-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
    });
    const data = await response.json();
    return data.presignedUrl;
}

export async function uploadFileToS3(file, presignedUrl) {
    const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });

    if (response.ok) {
        // presigned URL에서 실제 S3 URL 추출
        const s3Url = presignedUrl.split('?')[0];
        return s3Url;
    } else {
        throw new Error('File upload failed');
    }
}