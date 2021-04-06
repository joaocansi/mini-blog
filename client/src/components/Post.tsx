import Link from 'next/link';
import styles from '../styles/components/Post.module.scss';

export interface Post {
  id: string;
  title: string;
  description: string;
}

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitle}>
        <h5>{post.title}</h5>
      </div>
      <p>
        {post.description} [...]
      </p>
      <div className={styles.postReadMore}>
        <Link href={`/post/${post.id}`}>
          Read more
        </Link>
      </div>
    </div>
  )
}

export default Post;