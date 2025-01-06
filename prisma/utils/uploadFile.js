import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from './uploadS3AWS.js';
import dotenv from 'dotenv';
dotenv.config();
export const uploadFile = async (file) => {
  try {
    const sanitizedFileName = file.originalname
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_.-]/g, '');
    const fileKey = `${Date.now()}_${sanitizedFileName}`;
    const command = new PutObjectCommand({
      Bucket: 'bemf',
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    const data = await s3Client.send(command);
    const url = `https://meeryxppcscedcaunysz.supabase.co/storage/v1/object/public/bemf/${fileKey}`;
    return { data, url };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileKey) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET,
      Key: fileKey,
    });

    await s3Client.send(command);
    console.log('File berhasil dihapus:', fileKey);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
