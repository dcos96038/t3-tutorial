import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./LoadingSpinner";
import Image from "next/image";

export const CreatePost: React.FC = () => {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInputValue("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post, please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="Type something!"
        className="grow bg-transparent outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (inputValue !== "") {
              mutate({ content: inputValue });
            }
          }
        }}
      />
      {inputValue !== "" && !isPosting && (
        <button
          disabled={isPosting}
          type="button"
          onClick={() => mutate({ content: inputValue })}
        >
          Send
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};
