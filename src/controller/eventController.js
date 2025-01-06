import { uploadFile } from '../../prisma/utils/uploadFile.js';
import responseHelper from '../response/responseHelper.js';
import prisma from '../config/db.js';
import { deleteFile } from '../../prisma/utils/uploadFile.js';
const createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location } = req.body;
    const file = req.file;
    if (!file) {
      return responseHelper.sendErrorResponse(res, 'Gambar harus diisi!');
    }
    let imageUrl = null;
    if (file) {
      imageUrl = await uploadFile(file);
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        event_date: new Date(event_date),
        location,
        image_url: imageUrl.url,
      },
    });
    return responseHelper.sendSuccesResponse(res, event, 'Berhasil');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editEvent = async (req, res) => {
  try {
    const { title, description, event_date, location } = req.body;
    const { id } = req.params;
    const file = req.file;

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return responseHelper.sendNotFoundResponse(res, 'Event tidak ada!');
    }
    if (file) {
      if (existingEvent.image_url) {
        const oldFile = existingEvent.image_url.split('/').pop();
        await deleteFile(oldFile);

        const uploadResult = await uploadFile(file);
        const newImageUrl = uploadResult.url;

        const updateEvent = await prisma.event.update({
          where: { id },
          data: {
            title,
            description,
            event_date: new Date(event_date),
            image_url: newImageUrl,
            location,
          },
        });
        return responseHelper.sendSuccesResponse(
          res,
          updateEvent,
          'Berhasil memperbarui event!'
        );
      }
    }
  } catch (error) {
    console.error(error.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error!');
  }
};
const getAllEvent = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        event_date: true,
        image_url: true,
        created_at: true,
      },
    });
    return responseHelper.sendSuccesResponse(res, events, 'success');
  } catch (error) {
    console.error(error);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error!');
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return responseHelper.sendNotFoundResponse(res, 'Event Not Found!');
    }
    const image_url = event.image_url.split('/').pop();
    await deleteFile(image_url);
    const eventDelete = await prisma.event.delete({
      where: { id },
    });
    return responseHelper.sendSuccesResponse(
      res,
      eventDelete,
      'Berhasil Menghapus Event'
    );
  } catch (error) {
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error!');
  }
};
const getDetailEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      return responseHelper.sendNotFoundResponse(res, 'Event Not Found!');
    }
    return responseHelper.sendSuccesResponse(res, event, 'success');
  } catch (error) {
    console.error(error.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error');
  }
};
export default {
  createEvent,
  editEvent,
  getAllEvent,
  deleteEvent,
  getDetailEvent,
};
