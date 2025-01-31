import React, { useState } from "react";
import { verifyOtpReq } from "./fetchApi";
import { useSnackbar } from 'notistack';

const OtpVerification = ({ email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await verifyOtpReq({ email, otp });
      if (response.success) {
        enqueueSnackbar('Email verified successfully!', { variant: 'success' });
        onVerificationSuccess();
      } else {
        setError(response.error);
        enqueueSnackbar(response.error, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl text-center">Verify OTP</h2>
      <p className="text-center text-gray-600">
        Please enter the OTP sent to {email}
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="px-4 py-2 border focus:outline-none"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleVerify}
        disabled={loading}
        className="px-4 py-2 text-white cursor-pointer font-medium relative"
        style={{ background: "#303031" }}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
            Verifying...
          </div>
        ) : (
          "Verify OTP"
        )}
      </button>
    </div>
  );
};

export default OtpVerification;
