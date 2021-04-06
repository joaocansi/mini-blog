import { GetServerSidePropsContext } from "next";

import nextCookies from 'next-cookies';
import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import api from "../services/api";
import redirect from "./redirect";

const prohibitedRoutesWhenAuthenticated = [
  '/login',
  '/register'
]

export default async function requireAuthentication(ctx: GetServerSidePropsContext) {
  const cookies = nextCookies(ctx);
  const { resolvedUrl } = ctx;

  if (cookies.user_token && cookies.user_info) {

    if (prohibitedRoutesWhenAuthenticated.includes(resolvedUrl)) {
      redirect(ctx, '/dashboard');
      return {
        props: {
          user: cookies.user_info
        }
      }
    }
    return {
      props: {
        user: cookies.user_info
      }
    }

  }

  if (!prohibitedRoutesWhenAuthenticated.includes(resolvedUrl)) {
    redirect(ctx, '/');
    return {
      props: {}
    }
  }
  return {
    props: {}
  }
}

export async function forceLogout(router: NextRouter) {
  try {
    await api.delete('/sessions', { withCredentials: true });
  } catch (error) {
    toast.error('Internal server error');
    return;
  }
  router.push('/login');
  toast.error('Session expired, please sign in again.');
}

export async function signOut(router: NextRouter) {
  try {
    await api.delete('/sessions', { withCredentials: true });
  } catch (error) {
    toast.error('Internal server error');
    return;
  }
  router.push('/');
  toast.error('Signed out sucessfully.');
}