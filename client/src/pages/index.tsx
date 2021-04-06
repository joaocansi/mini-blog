import Post from '../components/Post';
import api from '../services/api';
import styles from '../styles/pages/Home.module.scss';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <main>
        <h2>All Posts</h2>
        <div className={styles.postsContainer}>
          {posts.map(item => {
            return <Post key={item.id} post={item} />
          })}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await api.get('/posts');
  return {
    props: {
      posts: response.data
    }
  }
}
