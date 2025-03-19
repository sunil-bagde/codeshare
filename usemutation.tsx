import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

// Define API response type
interface CreditReportResponse {
  success: boolean;
  message?: string;
}

// Define API function with proper typing
export const fetchSaveNextCreditReport = async (
  loanOriginationId: string,
  data: any
): Promise<CreditReportResponse> => {
  const response: AxiosResponse<CreditReportResponse> = await axios.post(
    `${process.env.NX_PUBLIC_LOS_SERVICES_BASE_URL}/v1/underwriting-loan-summaries/${loanOriginationId}/saveAndNext`,
    data
  );
  return response.data; // Ensure the function returns only the response data
};

// **Use React Query's useMutation hook properly**
export const useSaveNextCreditReport = () => {
  return useMutation<CreditReportResponse, Error, { loanOriginationId: string; payload: any }>(
    ({ loanOriginationId, payload }) => fetchSaveNextCreditReport(loanOriginationId, payload)
  );
};


import { useState } from "react";
import { useSaveNextCreditReport } from "./api";

const CreditReportForm: React.FC = () => {
  const [loanId, setLoanId] = useState("");
  const [formData, setFormData] = useState({ key: "value" });

  const mutation = useSaveNextCreditReport();

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
