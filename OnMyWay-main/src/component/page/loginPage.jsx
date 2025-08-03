import { useState } from "react";
import { Plane } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../AtomList/OMWAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


// login with google
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function LoginPage() {
    const navigate = useNavigate();
    const [userLogin,setUserLogin] = useState({
        email:"",
        password:""
    });
    const [error , setError] = useState({});
    const [user, setUser] = useRecoilState(userAtom);

    const vaildateFrom = () => {
      const newError = {};
      if(!userLogin.email.trim()) newError.email = "Email is Required";
      if(!userLogin.password.trim()) newError.password = "Password is Required";

      setError(newError);
      return Object.keys(newError).length === 0;
    }

    const handleInputChange = (field,value) => {
      setUserLogin((prve) => ({ ...prve ,[field]:value}));
      if(error[field]) {
        setError((prve) => ({...prve , [field]: "" }));
      }
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(vaildateFrom()){
        try{
          const resBody = {
            email:userLogin.email,
            password:userLogin.password
          };
          console.log(userLogin);
          
          const res = await axios.post(
            "http://localhost:3000/api/auth/login",
            resBody
          );
          if(res.status === 201){
            const {token,user} = res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('userId',user.id);

            setUser(user);

            toast.success("Login Success!");
            navigate('/');
          }else{
            toast.error("Login Failed!");
          }
        }catch(e){
          console.log("Fix This Code", e);
          toast.error("Login Failed!");
        }
      }
    }

    const loginWithGoogle = async() => {
      try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const resbody = {
          user_name:user.displayName,
          email:user.email,
        };

        const res = await axios.post(
          "http://localhost:3000/api/auth/loginWithGoogle",
          resbody
        );
        if(res.status === 201){
          toast.success("Login Success!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.user.id);

          setUser(res.data.user);
          navigate('/');
        }else{
          toast.error("Login feilded!");
        }

        console.log("Login success", user);
        console.log("testAPI", res.data.user.id);
        
      }catch(e){
        console.log("Login feilded!");
        toast.error("Login feilded!");
      }
    }
    

    return (
      <div>
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center p-4">
          <div className="w-200 h-100 flex justify-start items-center">
            <div className="block">
              <div className="flex justify-center items-center">
                <Plane className="size-30 bg-white p-4 rounded-3xl shadow-2xs text-blue-500" />
                <h1 className="text-white text-8xl font-bold ml-5 text-shadow-2xl ">
                  OnMyWay
                </h1>
              </div>
              <div className="mt-5 border-t-4 border-white rounded-full"></div>
            </div>
          </div>
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Sign in
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Email"
                  value={userLogin.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Password"
                  value={userLogin.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
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
                Sign In
              </button>
            </form>

            <div className="flex justify-center items-center mt-2">
              <div className="block text-center">
                <h1 className="mb-2">or</h1>
                <button
                  className="size-10 bg-gray-100 flex justify-center items-center rounded-full hover:cursor-pointer hover:-translate-y-1 text-blue-500 hover:text-blue-700 duration-200 hover:bg-gray-200"
                  onClick={() => loginWithGoogle()}
                >
                  <FontAwesomeIcon icon={faGoogle} size="lg" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;