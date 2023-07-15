"use client"

import React from "react"

export const GoogleAdsContext = React.createContext({})

export const GoogleAdsContextProvider = ({ children }) => {
  const [googleAdsData, setGoogleAdsData] = React.useState(null)

  return (
    <GoogleAdsContext.Provider value={{ googleAdsData, setGoogleAdsData}}>
      {children}
    </GoogleAdsContext.Provider>
  )
}
