import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import DashboardHeader from "../../components/DashboardHeader";
import requireAuthentication, { forceLogout } from "../../lib/auth";

import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import SunEditor from 'suneditor-react';

import styles from '../../styles/pages/DashboardCreate.module.scss';
import 'suneditor/dist/css/suneditor.min.css';

import schemas from '../../lib/schemas';
import api from "../../services/api";

export default function DashboardCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [content, setContent] = useState('');
  const config = {
    "mode": "classic",
    "rtl": false,
    "katex": "window.katex",
    "imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
    "videoFileInput": false,
    "tabDisable": false,
    "buttonList": [
      [
        "undo",
        "redo",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
        "table",
        "link",
        "image",
        "video",
        "imageGallery",
        "save",
      ]
    ],
  }

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {    
    e.preventDefault();
    try {
      await schemas.createPostSchema.validate({ title, description });
      await api.post('/posts', {
        title, description, content
      }, { withCredentials: true });
      console.log(content);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          forceLogout(router);
          return;
        }
        if (error.response.status === 409) {
          toast.error('Post already created, please try changing the title');
          return;
        }
        toast.error('Please try again later');
        return;
      }
      if (error instanceof ValidationError) {
        toast.error('Please check if you followed the rules of the form');
        return;
      }
    }

    toast.success('Post created sucessfully.');  
    router.push('/dashboard');
  }

  return (
    <div className={styles.dashboardCreateContainer}>
      <DashboardHeader />
      <main>
        <div className={styles.infoPage}>
          <i onClick={() => router.push('/dashboard')} className={`${styles.backLinkBtn} fas fa-arrow-left`}></i>
          <h2>Create Post</h2>
          <div></div>
        </div>
        <div className={styles.createPostForm}>
          <form onSubmit={handleSubmit}>

            <Input 
              setContent={setTitle} 
              name="title"
              rules="The title must be between 10 and 144 characters" 
              placeholder="Title"
              maxLength={144}
              value={title}
            />

            <Textarea
              setContent={setDescription} 
              name="description"
              rules="The description must be between 50 and 400 characters" 
              placeholder="Description"
              maxLength={400}
              value={description}
            />

            <SunEditor 
              name="content" 
              height="500"
              setOptions={config}
              onChange={e => setContent(e)
              }
            />
            
            <button type="submit">Create Post</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication;