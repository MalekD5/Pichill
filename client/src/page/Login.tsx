import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import validator from 'validator';
import { FieldValues } from 'react-hook-form/dist/types';
import {
  browserLocalPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Input, Label, InputGroup, Checkbox, Button } from '../components';
import { setCredentials } from '../redux/features/auth/authSlice';
import { constructErr } from '../utils/Utils';
import { auth } from '../firebase';

const schema = z.object({
  email: z.string().trim().min(1).refine(validator.isEmail, {
    message: 'please enter a valid email',
  }),
  password: z.string().min(1),
  remember: z.boolean().default(false),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    clearErrors('apiCall');
    const { email, password, remember } = data;
    if (remember) {
      auth.setPersistence(browserLocalPersistence);
    } else {
      auth.setPersistence(inMemoryPersistence);
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setCredentials({
          email: user.email,
          username: user.displayName,
        }),
      );
      reset();
      navigate('/welcome');
    } catch (err: any) {
      if (!err?.originalStatus) {
        setError('apiCall', constructErr('No Server Response'));
      } else if (err.originalStatus === 400) {
        setError('apiCall', constructErr('Missing Username or Password'));
      } else if (err.originalStatus === 401) {
        setError('apiCall', constructErr('Incorrect email or password'));
      } else {
        setError('apiCall', constructErr('Network error'));
      }
    }
  };

  return (
    <>
      <h1 className='text-center text-3xl mt-10 font-bold'>Login</h1>
      {errors.apiCall?.message}
      {errors.email?.message}
      {errors.password?.message}
      <div className='w-[70%] md:w-1/3 mx-auto mt-[5rem] md:mt-10'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label label='email' htmlFor='email' required>
              Email
            </Label>
            <Input
              name='email'
              register={register}
              type='email'
              placeholder='email@email.com'
              required
            />
          </InputGroup>
          <InputGroup>
            <Label label='password' htmlFor='password' required />
            <Input
              name='password'
              type='password'
              placeholder='password'
              register={register}
              required
            />
          </InputGroup>
          <InputGroup flex>
            <div className='flex items-center h-5'>
              <Checkbox name='remember' register={register} />
            </div>
            <Label
              label='Trust this device?'
              htmlFor='remember'
              block={false}
            />
          </InputGroup>
          <div>
            <Button submit>Login</Button>
            <Link
              className='ml-3 text-blue-500 text-sm underline hover:pointer'
              to='/reset'
            >
              reset password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
