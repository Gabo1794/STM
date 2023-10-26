import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [sectionSelected, setSectionSelected] = useState("1");
  const [enterpriseInfo, setEnterpriseInfo] = useState(null);

  const SaveEnterpriseValues = (userEnterpriseInfo) => {
    const userEnterprise = JSON.stringify(userEnterpriseInfo);
    localStorage.setItem("user", userEnterprise);
    setEnterpriseInfo(userEnterpriseInfo);
  };

  const ValudateUserHasSuccessLogin = () => {
    if(enterpriseInfo) {
      return true;
    }

    const localSaved = localStorage.getItem("user");
    if(localSaved) {
      setEnterpriseInfo(JSON.parse(localSaved))
      return true;
    }
    

  }

  return (
    <AppContext.Provider
      value={{
        sectionSelected,
        setSectionSelected,
        enterpriseInfo,
        SaveEnterpriseValues,
        ValudateUserHasSuccessLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
