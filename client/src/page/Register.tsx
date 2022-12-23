import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import validator from 'validator';
import { FieldValues } from 'react-hook-form/dist/types';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Input, Label, InputGroup, Button } from '../components';
import { constructErr } from '../utils/Utils';
import { auth } from '../firebase';

const schema = z
  .object({
    username: z.string().min(4).refine(validator.isAlphanumeric),
    email: z.string().trim().refine(validator.isEmail, {
      message: 'please enter a valid email',
    }),
    password: z.string().min(8).refine(validator.isStrongPassword, {
      message: 'the password must be strong',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: error,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const submit = async (data: FieldValues) => {
    const { email, password, username } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        ({ user }) => {
          updateProfile(user, {
            displayName: username,
          });
          return user;
        },
      );
      navigate('/login');
    } catch (err: any) {
      if (err.status === 409) {
        setError('apiCall', constructErr(err.message));
      } else if (err.status === 500) {
        setError('apiCall', constructErr('internal server error'));
      }
    }
  };
  return (
    <>
      <h1 className='text-center text-white font-bold text-3xl'>Register</h1>
      <div className='w-[70%] md:w-1/3 mx-auto mt-[5rem] md:mt-10'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
          <InputGroup>
            <Label label='username' htmlFor='username' />
            <Input
              type='text'
              placeholder='username'
              name='username'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <Label label='email' htmlFor='email' />
            <Input
              type='email'
              placeholder='email@email.com'
              name='email'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <Label label='password' htmlFor='password' />
            <Input
              type='password'
              placeholder='password'
              name='password'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <Label label='confirm password' htmlFor='confirmPassword' />
            <Input
              type='password'
              placeholder='confirm password'
              name='confirmPassword'
              register={register}
            />
          </InputGroup>
          <div>
            <Button submit>Register</Button>
            <Link
              className='ml-3 text-blue-500 text-sm underline hover:pointer'
              to='/login'
            >
              already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
