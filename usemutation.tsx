import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// Initialize QueryClient
const queryClient = new QueryClient();

// API Function using Axios
const createPost = async (data: { title: string; body: string; userId: number }) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", data);
  return response.data;
};

// Custom Hook to Handle Mutation
const useCreatePost = () => {
  return useMutation(createPost);
};

// Form Component with Mutation
const CreatePost: React.FC = () => {
  const mutation = useCreatePost();

  const handleSubmit = () => {
    mutation.mutate({ title: "New Post", body: "This is the content", userId: 1 });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Submitting..." : "Submit"}
      </button>
      {mutation.isError && <p style={{ color: "red" }}>Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && <p style={{ color: "green" }}>Success! Post ID: {mutation.data.id}</p>}
    </div>
  );
};

// Dynamic Component Loader
const components: Record<string, React.FC> = {
  create: CreatePost,
};

const DynamicComponent: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const Component = components[page as keyof typeof components] || (() => <h2>Page Not Found</h2>);
  return <Component />;
};

// Main App Component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/:page" element={<DynamicComponent />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


import { useMutation } from "@tanstack/react-query";
import { fetchSaveNextCreditReport } from "./api"; // Import your API function
import { useState } from "react";

const CreditReportForm: React.FC = () => {
  const [loanId, setLoanId] = useState("");
  const [formData, setFormData] = useState({ key: "value" });

  // Using React Query mutation
  const mutation = useMutation((data: { loanOriginationId: string; payload: any }) =>
    fetchSaveNextCreditReport(data.loanOriginationId, data.payload)
  );

  const handleSubmit = () => {
    mutation.mutate({ loanOriginationId: loanId, payload: formData });
  };

  return (
    <div>
      <h2>Save & Next Credit Report</h2>
      <input
        type="text"
        placeholder="Loan Origination ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Saving..." : "Save & Next"}
      </button>
      {mutation.isError && <p style={{ color: "red" }}>Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && <p style={{ color: "green" }}>Success!</p>}
    </div>
  );
};

export default CreditReportForm;

