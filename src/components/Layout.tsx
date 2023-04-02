import React from "react";
import { api } from "@/utils/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import { CreatePost } from "./CreatePost";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
        <div className="flex border-b border-slate-400 p-4">
          {!isSignedIn && <SignInButton />}
          {isSignedIn && <CreatePost />}
        </div>
        {children}
      </div>
    </main>
  );
};
