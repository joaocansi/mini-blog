import api from "../../services/api";
import styles from '../../styles/pages/Post.module.scss';

import 'suneditor/dist/css/suneditor.min.css';
import { useRouter } from "next/router";

export default function Post({ post }) {
  const router = useRouter();

  return (
    <div className={styles.postContainer}>
      <header className={styles.postHeader}>
        <div>
          <i onClick={() => router.push('/')} className="fas fa-arrow-left"></i>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className={`${styles.postContent} sun-editor-editable`}
      >
      </div>
    </div>
  )  
}

export async function getStaticPaths() {
  const res = await api.get('/posts');
  const posts = res.data;

  const paths = posts.map((post) => ({
    params: {id: post.id}
  }));

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await api.get(`/posts/${params.id}`);
  const post = await res.data;

  return { props: { post } }
}