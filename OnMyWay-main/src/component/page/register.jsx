import axios from "axios";
import { useState , useEffect } from "react";
import { toast } from "react-toastify";
import { userAtom } from "../AtomList/OMWAtom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [register , setRegister] = useState({
    user_name:'',
    email:'',
    password:'',
    confirmPassword:'',
    user_type:'',
  });
  const [error , setError] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field,value) =>{
    setRegister((prve) => ({ ...prve,[field]:value }));
    if (error[field]) {
      setError((prve) => ({ ...prve, [field]: "" }));
    }
  }

  const vaildateForm = () => {
    const newError = {}
    if(!register.user_name.trim()) newError.user_name = "Username is Required";
    if(!register.email.trim()) newError.email = "Email is Required";
    if(!register.password.trim()) newError.password = "Password is Required";
    if(!register.confirmPassword.trim()) newError.confirmPassword = "Confirm Password is Required";
    if(register.password !== register.confirmPassword) newError.confirmPassword = "Confirm Password not match";

    setError(newError);
    return Object.keys(newError).length === 0;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(vaildateForm()){
      try{
        const resBody = {
          user_name:register.user_name,
          email:register.email,
          password:register.password,
          user_type:"log",
        }
        const res = await axios.post("http://localhost:3000/api/auth/register",resBody);
        if(res.status === 201){
          navigate('/login');
          toast.success("Sign up Success!");
        }else{
          toast.error("Sign up Error!");
        }
      }catch(e){
        toast.error("Sign up Error!");
      }
    }
  }

    return (
      <div>
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Sign up
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Username"
                  value={register.user_name}
                  onChange={(e) =>
                    handleInputChange("user_name", e.target.value)
                  }
                />
                {error.user_name && (
                  <p className="mt-1 text-sm text-red-600">{error.user_name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Email"
                  value={register.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {error.email && (
                  <p className="mt-1 text-sm text-red-600">{error.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Password"
                  value={register.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                {error.password && (
                  <p className="mt-1 text-sm text-red-600">{error.password}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Confime Password"
                  value={register.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                />
                {error.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {error.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-full transition-colors hover:cursor-pointer">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Register;