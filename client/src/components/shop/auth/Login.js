import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { useSnackbar } from 'notistack';
const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
       enqueueSnackbar('Login Completed Successfully..!', { variant: 'success' })
        window.location.href = "/";

      }    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#1a1a1a'
        }}>Login</h1>
  
        {layoutData.loginSignupError && (
          <div style={{
            backgroundColor: '#FEE2E2',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            color: '#DC2626'
          }}>
            You need to login for checkout. Haven't account? Create new one.
          </div>
        )}
  
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Username or email address
              <span style={{ color: '#DC2626', marginLeft: '4px' }}>*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, email: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.email}
              type="text"
              style={{
                padding: '12px',
                border: data.error ? '2px solid #DC2626' : '2px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            {data.error && <div style={{ color: '#DC2626', fontSize: '12px' }}>{data.error}</div>}
          </div>
  
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Password
              <span style={{ color: '#DC2626', marginLeft: '4px' }}>*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type="password"
              style={{
                padding: '12px',
                border: data.error ? '2px solid #DC2626' : '2px solid #E5E7EB',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
  
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
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
              fontSize: '14px',
              ':hover': {
                textDecoration: 'underline'
              }
            }}>
              Lost your password?
            </a>
          </div>
  
          <button
            onClick={(e) => {
              e.preventDefault();
              formSubmit();
            }}
            style={{
              backgroundColor: '#303031',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              ':hover': {
                backgroundColor: '#404041'
              }
            }}
          >
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
  
};

export default Login;
