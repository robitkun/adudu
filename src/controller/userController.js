import prisma from '../config/db.js';
import validate from '../validation/validate.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {
  registerValidation,
  loginValidation,
} from '../validation/userValidation.js';
import responseHelper from '../response/responseHelper.js';
import bcrypt from 'bcrypt';
dotenv.config();

const register = async (req, res) => {
  try {
    const validateData = validate(registerValidation, req.body, res);
    console.log(validateData.value.password);
    if (!validateData) return;
    const existingEmail = await prisma.user.count({
      where: {
        email: validateData.value.email,
      },
    });
    const existingUsername = await prisma.user.count({
      where: {
        username: validateData.value.username,
      },
    });
    if (existingEmail > 0) {
      return responseHelper.sendErrorResponse(res, 'Email Already Exist!', 409);
    }
    if (existingUsername > 0) {
      return responseHelper.sendErrorResponse(
        res,
        'Username Already Exist!',
        409
      );
    }
    const hashedPassword = await bcrypt.hash(validateData.value.password, 10);
    validateData.value.password = hashedPassword;

    const newUser = await prisma.user.create({
      data: validateData.value,
      select: {
        id: true,
        username: true,
        email: true,
        avatar_url: true,
      },
    });
    responseHelper.sendSuccesResponse(res, newUser, 'Berhasil Registrasi', 201);
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(
      res,
      'Terjadi kesalahan pada server'
    );
  }
};

const login = async (req, res) => {
  try {
    const validateData = validate(loginValidation, req.body, res);
    if (!validateData) return;
    console.log(validateData);
    const user = await prisma.user.findUnique({
      where: {
        email: validateData.value.email,
      },
    });
    if (!user) {
      return responseHelper.sendErrorResponse(res, 'Email tidak ada', 401);
    }
    const validPassword = await bcrypt.compare(
      validateData.value.password,
      user.password
    );
    console.log('Password valid?', validPassword);
    if (!validPassword) {
      return responseHelper.sendErrorResponse(
        res,
        'Username atau Password salah!',
        401
      );
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
        created_at: user.created_at,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return responseHelper.sendSuccesResponse(
      res,
      { token },
      'Login berhasil',
      200
    );
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(
      res,
      'Terjadi kesalahan pada server'
    );
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        avatar_url: true,
        created_at: true,
      },
    });
    return responseHelper.sendSuccesResponse(res, users, 'succes', 200);
  } catch (err) {
    console.error(err.message);
    return responseHelper.sendServerErrorResponse(
      res,
      'Terjadi kesalahan pada server'
    );
  }
};
const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return responseHelper.sendNotFoundResponse(res, 'User Not Found!');
    }
    return responseHelper.sendSuccesResponse(res, user);
  } catch (err) {
    console.error(err.message);
    responseHelper.sendServerErrorResponse(
      res,
      'Terjadi kesalahan pada server'
    );
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar_url: true,
        created_at: true,
      },
    });
    if (!user) {
      return responseHelper.sendNotFoundResponse(res, 'User Not Found!');
    }
    return responseHelper.sendSuccesResponse(res, user, 'success', 200);
  } catch (err) {
    console.error(err.message);
    responseHelper.sendServerErrorResponse(
      res,
      'Terjadi kesalahan pada server'
    );
  }
};
export default { register, login, getAllUser, getMe, getUserById };
