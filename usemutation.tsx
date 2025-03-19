import axios from "axios";

// Define API response type
interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Function to make POST request using Axios
export const createPost = async (data: { title: string; body: string; userId: number }): Promise<PostResponse> => {
  const response = await axios.post<PostResponse>("https://jsonplaceholder.typicode.com/posts", data);
  return response.data; // Return only the data, not the entire response
};


import { useMutation } from "@tanstack/react-query";
import { createPost } from "./api"; // Import API function

// Custom hook to handle API mutation
export const useCreatePost = () => {
  return useMutation<
    PostResponse, // Response type
    Error, // Error type
    { title: string; body: string; userId: number } // Variables type
  >(createPost);
};
import { useState } from "react";
import { useCreatePost } from "./mutation"; // Import useMutation hook

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const mutation = useCreatePost();

  const handleSubmit = () => {
    mutation.mutate({ title, body, userId: 1 });
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Submitting..." : "Submit"}
      </button>
      {mutation.isError && <p style={{ color: "red" }}>Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && <p style={{ color: "green" }}>Success! Post ID: {mutation.data?.id}</p>}
    </div>
  );
};

export default CreatePostForm;
