import prisma from '../config/db.js';
import validate from '../validation/validate.js';
import responseHelper from '../response/responseHelper.js';
import {
  createForumValidation,
  editForumValidation,
} from '../validation/forumValidation.js';

const createForum = async (req, res) => {
  try {
    const { id } = req.user;
    const validateData = validate(createForumValidation, req.body, res);
    if (!validateData) return;
    const forum = await prisma.forum.create({
      data: {
        author_id: id,
        ...validateData.value,
      },
    });
    return responseHelper.sendSuccesResponse(res, forum, 'success', 200);
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error');
  }
};
const getAllForum = async (req, res) => {
  try {
    const forums = await prisma.forum.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author_id: true,
        created_at: true,
      },
    });
    return responseHelper.sendSuccesResponse(res, forums, 'success');
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error');
  }
};
const getForumById = async (req, res) => {
  try {
    const { id } = req.params;
    const forum = await prisma.forum.findUnique({
      where: {
        id,
      },
    });
    if (!forum) {
      return responseHelper.sendNotFoundResponse(res, 'Forum Not Found');
    }
    return responseHelper.sendSuccesResponse(res, forum, 'success');
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error');
  }
};
const deleteForum = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const forum = await prisma.forum.findUnique({
      where: {
        id,
      },
    });
    if (!forum) {
      return responseHelper.sendNotFoundResponse(res, 'Forum Not Found!');
    }
    if (forum.author_id !== userId) {
      return responseHelper.sendErrorResponse(
        res,
        'Not authorized to delete this forum',
        403
      );
    }
    await prisma.forum.delete({
      where: {
        id,
      },
    });
    return responseHelper.sendSuccesResponse(res, forum, 'Berhasil menghapus');
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error!');
  }
};
const editForum = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const validatedData = validate(editForumValidation, req.body, res);
    console.log(validatedData);
    const forum = await prisma.forum.findUnique({
      where: {
        id,
      },
    });
    if (!forum) {
      return responseHelper.sendNotFoundResponse(res, 'Forum Not Found');
    }
    if (forum.author_id !== userId) {
      return responseHelper.sendErrorResponse(
        res,
        'Not authorized to delete this forum',
        403
      );
    }
    const newForum = await prisma.forum.update({
      where: { id },
      data: validatedData.value,
    });
    return responseHelper.sendSuccesResponse(
      res,
      newForum,
      'Berhasil mengedit forum'
    );
  } catch (err) {
    console.error(err.message);
    responseHelper.sendServerErrorResponse(res, 'Invalid server error');
  }
};
export default {
  createForum,
  getAllForum,
  getForumById,
  deleteForum,
  editForum,
};
