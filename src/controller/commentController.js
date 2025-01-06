import prisma from '../config/db.js';
import validate from '../validation/validate.js';
import responseHelper from '../response/responseHelper.js';
import { createCommentValidation } from '../validation/commentValidation.js';
const createComment = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const validateData = validate(createCommentValidation, req.body, res);
    console.log(validateData);
    if (!validateData) return;
    const newComment = await prisma.comment.create({
      data: {
        ...validateData.value,
        author_id: userId,
        parent_id: validateData.value.parent_id || null,
      },
    });
    return responseHelper.sendSuccesResponse(
      res,
      newComment,
      'Berhasil menambahkan komentar'
    );
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error');
  }
};
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!comment) {
      return responseHelper.sendNotFoundResponse(res, 'Comment tidak ada');
    }
    const result = await prisma.comment.delete({
      where: { id },
    });
    return responseHelper.sendSuccesResponse(
      res,
      result,
      'Berhasil menghapus comment',
      200
    );
  } catch (err) {
    return responseHelper.sendServerErrorResponse(res, 'Invalid server error!');
  }
};
export default { createComment, deleteComment };
