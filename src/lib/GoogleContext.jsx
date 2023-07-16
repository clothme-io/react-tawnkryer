import React from 'react';

export const GoogleAdsContext = React.createContext({});

export function GoogleAdsContextProvider({ children }) {
  const [googleAdsData, setGoogleAdsData] = React.useState(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GoogleAdsContext.Provider value={{ googleAdsData, setGoogleAdsData }}>
      {children}
    </GoogleAdsContext.Provider>
  );
}
