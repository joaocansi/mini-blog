import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import { useRouter } from 'next/router';

import Link from 'next/link';
import styles from '../styles/pages/AuthPages.module.scss';
import api from '../services/api';

import schemas from '../lib/schemas';
import requireAuthentication from '../lib/auth';
import { GetServerSideProps } from 'next';
import Input from '../components/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      await schemas.loginSchema.validate({ email, password });
      await api.post('/sessions', { email, password }, { withCredentials: true });

      toast.success("You're now logged.");
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof ValidationError) {
        toast.error('E-mail or password is incorrect.');
        return;
      }
      if (err.response) {
        const { status } = err.response;
        if (status === 401) {
          toast.error('E-mail or password is incorrect.');
          return;
        }
        toast.error('Please try again later.');
        return;
      }
      toast.error('Please try again later.');
      return;
    }
  }

  return (
    <div id={styles.authContainer}>
      <nav>
        <ul>
          <li className={styles.active}>
            <Link href="/login">Sign In</Link>
          </li>
          <li>
            <Link href="/register">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleLogin}>
        <Input
          setContent={setEmail}
          name="email"
          rules="example@gmail.com" 
          defaultValue={email} 
          type="text" 
          placeholder="E-mail address"
        />
        <Input
          name="password"
          rules="Password must be between 5 and 16 characters and cannot contain special characters"
          setContent={setPassword}
          defaultValue={password} 
          type="password" 
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = requireAuthentication;