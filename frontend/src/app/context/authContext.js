import React, { useReducer,useState,useContext,useEffect, createContext} from "react";
import jwtDecode from "jwt-decode";

const initialStata = {
    user: null
}


if(localStorage.getItem("token")){
    const decodedUser =  jwtDecode(localStorage.getItem("token"));

    if(decodedUser.exp * 1000 < Date.now()){
        localStorage.removeItem("token")
        initialStata.user = null;
    }else{
         initialStata.user = decodedUser.user;
         console.log("z authContext")
         console.log(initialStata.user);
    }

}

//TO DO useReducer
export const AuthContext = createContext();

export const AuthProvider = ({ children } ) => {
const [user, setUser] = useState(initialStata.user);
 //const navigate = useNavigate();
const login = (loginUser)=>{
   
    localStorage.setItem("token", loginUser.token);
    const decodedUser =  jwtDecode(localStorage.getItem("token"));
    console.log("decoded user:" + decodedUser,user);
    setUser(decodedUser.user);//setUser(loginUser);
    //navigate("/homepage");
};
const logout = ()=>{
    localStorage.removeItem("token");
    setUser(null);
};

return(
<AuthContext.Provider value={{ user, login, logout}}>
{children}
</AuthContext.Provider>);
};
//export {AuthContext};
export  const useAuthValue = () => {
    return  useContext(AuthContext);
   };