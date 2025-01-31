import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';
import OtpVerification from './OtpVerification';


const Signup = (props) => {
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );
  const { enqueueSnackbar } = useSnackbar();
  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.requireOTP) {
        setShowOtpVerification(true);
        enqueueSnackbar('OTP sent to your email!', { variant: 'success' });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        })
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' })
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div style={{
        maxWidth: '480px',
        margin: '40px auto',
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '32px',
          color: '#1a1a1a'
        }}>Create Account</h1>
  
        {showOtpVerification ? (
          <OtpVerification
            email={data.email}
            onVerificationSuccess={() => {
              setShowOtpVerification(false);
              setData({
                success: "Account created successfully",
                name: "",
                email: "",
                password: "",
                cPassword: "",
                loading: false,
                error: false,
              });
            }}
          />
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.success && (
              <div style={{
                padding: '12px',
                backgroundColor: '#DEF7EC',
                color: '#03543F',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                {data.success}
              </div>
            )}
  
            {['name', 'email', 'password', 'cPassword'].map((field) => (
              <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  textTransform: field === 'cPassword' ? 'none' : 'capitalize'
                }}>
                  {field === 'cPassword' ? 'Confirm Password' : field}
                  <span style={{ color: '#DC2626', marginLeft: '4px' }}>*</span>
                </label>
                <input
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  value={data[field]}
                  onChange={(e) => setData({
                    ...data,
                    success: false,
                    error: {},
                    [field]: e.target.value,
                  })}
                  style={{
                    padding: '12px 16px',
                    border: data.error[field] ? '2px solid #DC2626' : '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    ':focus': {
                      borderColor: '#3B82F6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  }}
                />
                {data.error[field] && (
                  <div style={{ color: '#DC2626', fontSize: '12px' }}>{data.error[field]}</div>
                )}
              </div>
            ))}
  
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#374151'
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#303031'
                  }}
                />
                Remember me
              </label>
              
              <a href="/" style={{
                color: '#6B7280',
                textDecoration: 'none',
                fontSize: '14px'
              }}>
                Lost your password?
              </a>
            </div>
  
            <button
              onClick={(e) => {
                e.preventDefault();
                !data.loading && formSubmit();
              }}
              style={{
                backgroundColor: '#303031',
                color: 'white',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: data.loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {data.loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #ffffff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}/>
                  Sending OTP...
                </>
              ) : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </Fragment>
  );
  
};

export default Signup;
