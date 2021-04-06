import styles from '../styles/components/DashboardPost.module.scss';

export interface Post {
  id: string;
  title: string;
  description: string;
}

interface PostProps {
  post: Post;
  deletePost(id: string): Promise<void>;
}

const DashboardPost: React.FC<PostProps> = ({ post, deletePost }) => {
  return (
    <div className={styles.dashboardPostContainer}>
      <div className={styles.dashboardPostTitle}>
        <h5>{post.title}</h5>
        <button type="button" onClick={async () => await deletePost(post.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <p>
        {post.description}
      </p>
    </div>
  )
}

export default DashboardPost;