import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import ProductApi from "./api/ProductApi";
import UserApi from "./api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {

    const [token, setToken] = useState(false);

    const refreshToken = async () => { 
        const res = await axios.get("/user/refreshToken");
        setToken(res.data.accesstoken)
    }

    useEffect( () => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin) refreshToken()
    }, [])

    const state = {
        token: [token, setToken],
        productApi: ProductApi(),
        userApi: UserApi(token),
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}