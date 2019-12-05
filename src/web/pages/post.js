/*
 * @Description: s
 * @Author: ekibun
 * @Date: 2019-12-05 19:26:22
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 19:26:44
 */
import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';

const Page = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
};

export default Page;