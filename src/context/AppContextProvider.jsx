import React, { useState, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [sectionSelected, setSectionSelected] = useState("1");
  const [enterpriseInfo, setEnterpriseInfo] = useState(null);
  const isUserSignIn = useAuth();

  useEffect(() => {
    if(isUserSignIn) {
      ValidateUserHasSuccessLogin();
    }
  }, [isUserSignIn]);

  const SaveEnterpriseValues = (userEnterpriseInfo) => {
    const userEnterprise = JSON.stringify(userEnterpriseInfo);
    localStorage.setItem("user", userEnterprise);
    setEnterpriseInfo(userEnterpriseInfo);
  };

  const ValidateUserHasSuccessLogin = () => {

    if(!enterpriseInfo) {
      GetLocalStorageEnterpriseInfo()
    }    

  };

  const GetLocalStorageEnterpriseInfo = () => {
    const localSaved = localStorage.getItem("user");
    if (localSaved) {
      setEnterpriseInfo(JSON.parse(localSaved));
    } 
    else {
      return null;
    } 
  };

  return (
    <AppContext.Provider
      value={{
        sectionSelected,
        setSectionSelected,
        isUserSignIn,
        enterpriseInfo,
        SaveEnterpriseValues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
