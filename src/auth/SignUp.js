import React, { useState, useEffect  } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";

function SignUp() {

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(""); // 錯誤訊息
    const [inputError, setInputError] = useState(false); // 錯誤狀態
    const [emailError, setEmailError] = useState(""); // email 錯誤訊息
    const [emailInputError, setEmailInputError] = useState(false); // email 錯誤狀態

    const [isFormValid, setIsFormValid] = useState(true); // 用來控制按鈕是否可以點擊

    

    // 驗證密碼是否匹配
    useEffect(() => {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setInputError(true);
        setIsFormValid(false); // 禁用 Sign Up 按鈕
      } else {
        setError("");
        setInputError(false);
        setIsFormValid(true); // 啟用 Sign Up 按鈕
      }
      setEmailError("");
      setEmailInputError(false);
      // 檢查表單中是否有空值
      const isAllFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
      setIsFormValid(isAllFieldsFilled && formData.password === formData.confirmPassword); // 密碼匹配且所有欄位都有填寫

    }, [formData]); // 當 formData 改變時觸發

  
    // 處理輸入變更
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // 處理表單提交
    const handleSubmit = async (e) => {
      e.preventDefault(); // 阻止頁面刷新
      setError(""); // 清空錯誤訊息
      setEmailInputError("");
  
      try {
        const data = await AuthService.register(formData);
    
        setSuccessMessage(
          "Registration successful! You are going to be redirected to the login page."
        );
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } catch (error) {
        setError("Registration failed. Please try again later.");
        setEmailInputError(true);
      }
    };

  return (
    <div className="container py-3">
      <br />
      <br />
      <br />
      <div className="row my-4">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>
              {successMessage && (
                <div className="alert alert-success text-center">
                  {successMessage}
                </div>
              )}
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    required
                    pattern="^[A-Za-z\u4e00-\u9fa5]+$" 
                    />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    required
                    pattern="^[A-Za-z\u4e00-\u9fa5]+$" 
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${emailInputError ? "is-invalid" : ""}`} // 錯誤時新增紅色邊框
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </div>
                {emailError && <div className="text-danger">{emailError}</div>} {/* 顯示錯誤訊息 */}
              
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${inputError ? "is-invalid" : ""}`} // 錯誤時新增紅色邊框
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${inputError ? "is-invalid" : ""}`} // 錯誤時新增紅色邊框
                    name="confirmPassword"
                    value={formData.confirmPassword || ""}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                {error && <div className="text-danger">{error}</div>} {/* 顯示錯誤訊息 */}
                <div className="col-md-12 mt-4">
                  <button type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={!isFormValid}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <hr className="text-muted" />
              <div className="text-center">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-decoration-none fw-medium link-secondary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default SignUp;