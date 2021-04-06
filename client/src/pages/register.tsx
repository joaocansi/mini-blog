import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import { useRouter } from 'next/router';

import Link from 'next/link';
import styles from '../styles/pages/AuthPages.module.scss';

import schemas from '../lib/schemas';
import api from '../services/api';
import { GetServerSideProps } from 'next';
import requireAuthentication from '../lib/auth';
import Input from '../components/Input';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      await schemas.registerSchema.validate({ name, email, password });
      await api.post('/users', { name, email, password }, { withCredentials: true });

      toast.success("Account created sucessfully.");
      router.push('/login');
    } catch (err) {
      if (err instanceof ValidationError) {
        toast.error("E-mail must have the e-mail patterns and password must be between 5 and 16 characters and cannot include special characters");
        return;
      }
      if (err.response) {
        const { status } = err.response;
        if (status === 401) {
          toast.error('You cannot create a new account. This system only supports one account.');
          return;
        }
        if (status === 409) {
          toast.error('User already created');
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
          <li>
            <Link href="/login">Sign In</Link>
          </li>
          <li className={styles.active}>
            <Link href="/register">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleRegister}>
        <Input
          name="name"
          setContent={setName}
          rules="You can put your name" 
          defaultValue={name}
          type="text" 
          placeholder="Username"
        />
        <Input
          name="email"
          setContent={setEmail}
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = requireAuthentication;