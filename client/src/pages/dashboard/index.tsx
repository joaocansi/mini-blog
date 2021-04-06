import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { forceLogout } from '../../lib/auth';

import DashboardHeader from "../../components/DashboardHeader";
import DashboardPost from "../../components/DashboardPost";
import requireAuthentication from "../../lib/auth";
import api from "../../services/api";

import styles from '../../styles/pages/Dashboard.module.scss';
import { useRouter } from "next/router";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    api.get('/posts').then(response => {
      setPosts(response.data);            
    })  
  }, []);

  async function handleDeletePost(id: string) {
    try {
      await api.delete(`/posts/${id}`, {
        withCredentials: true
      });
      const newPosts = posts.filter(item => item.id !== id);
      setPosts(newPosts);

      toast.success('Post deleted sucessfully.');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        forceLogout(router);
        return;
      }
      toast.error('Please try again later.');
      return;
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader />
      <main>
        <div className={styles.dashboardPosts}>
          {posts.map(item => {
            return <DashboardPost key={item.id} deletePost={handleDeletePost} post={item} />
          })}
        </div>
      </main>
      <div onClick={() => router.push('/dashboard/create')} className={styles.createBtn}>
        <i className="fas fa-plus"></i>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = requireAuthentication;