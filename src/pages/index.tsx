import { Feed } from "@/components/Feed";
import { Layout } from "@/components/Layout";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Feed />
    </Layout>
  );
};

export default Home;
