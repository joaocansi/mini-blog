import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().min(5).max(320).email().required(),
  password: Yup.string().min(5).max(16).required()
});

const registerSchema = Yup.object().shape({
  name: Yup.string().min(5).max(255).required(),
  email: Yup.string().min(5).max(320).email().required(),
  password: Yup.string().min(5).max(16).required()
});

const createPostSchema = Yup.object().shape({
  title: Yup.string().min(10).max(144).required(),
  description: Yup.string().min(50).max(400).required()
})

export default {
  loginSchema,
  registerSchema,
  createPostSchema
}