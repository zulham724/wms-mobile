import { HomepageInterface } from "@models/homepage";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomepageInterface = {
  locationName: "RSUP Fatmawati",
  user: null,
  name: "Jodi Badr",
  languagePreference: "EN",
  wasteRecap: {
    dateRange: {
      start: "2025-06-01",
      end: "2025-06-10",
    },
    summary: [
      {
        type: "Hazardous Waste",
        weight: 1250.75,
        unit: "kg",
        transactionCount: 15,
      },
      {
        type: "Medical Waste",
        weight: 3400.5,
        unit: "kg",
        transactionCount: 32,
      },
      {
        type: "Domestic Waste",
        weight: 5670.25,
        unit: "kg",
        transactionCount: 58,
      },
    ],
  },
  transactions: null,
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 3,
    totalPages: 1,
  },
  data: [
    {
      id: "TXN-2025-06-09-001",
      transactionDate: "2025-06-09",
      tags: ["Hazardous", "Chemical", "Pyrolysis", "Process"],
      weight: {
        value: 320.5,
        unit: "kg",
      },
      wasteActionEnd: "2025-06-11T15:00:00Z",
    },
    {
      id: "TXN-2025-06-09-002",
      transactionDate: "2025-06-09",
      tags: ["Medical Waste", "Infectious", "Cold Storage", "Stored"],
      weight: {
        value: 550,
        unit: "kg",
      },
      wasteActionEnd: "2025-06-12T09:00:00Z",
    },
    {
      id: "TXN-2025-06-08-045",
      transactionDate: "2025-06-08",
      tags: ["Hazardous", "Unsegregated", "Landfill", "Disposed"],
      weight: {
        value: 415.2,
        unit: "kg",
      },
      wasteActionEnd: "2025-06-10T18:30:00Z",
    },
  ],
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
});

export const {} = homepageSlice.actions;
export default homepageSlice.reducer;
