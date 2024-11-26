import React, { useState, createContext, } from 'react'
import patientsData from '/src/data/patient_data.json'
import { GpSystems } from './enums/GPsystems'

export const MainContext = createContext()

const MainProvider = ({ children }) => {
   const [patients] = useState(patientsData) //Static because we are not setting our patient data
   const [gpSystem, setGpSystem] = useState(GpSystems.NotSelected)
   const [importedData, setImportedData] = useState([])
   console.log(importedData)



   

   // const setImportedData = (data) =>{
   //    setImportedData(data)
   // }






   //FILTER STATES
   const [selectedAges, setSelectedAges] = useState([])
   const [nsaid, setNsaid] = useState ("")
   const [cvd, setCvd] = useState ("")
   const [selectedBP, setSelectedBP] = useState([])
   const [selectedChd, setSelectedChd] = useState([]) //CHA₂DS₂-VASc
   const [selectedOrbit, setSelectedOrbit] = useState ([])
   const [medReview, setMedReview] = useState ("")




   /////FILTER SELECTIONS
   
   //Age Filters
   const handleAgeSelection = (age) =>{
      if (selectedAges.includes(age)){
         setSelectedAges(selectedAges.filter((item) => item !== age))
      }
      else {
         setSelectedAges([...selectedAges, age] )
      } 
   }

   //NSAID Filter Logic
   const handleNSAID = (value) => {
      setNsaid((prev) => (prev === value ? "" : value)); // Toggle value off
   };

    //CVD Filter Logic
    const handleCVD = (value) => {
      setCvd((prev) => (prev === value ? "" : value)); // Toggle value off
   };

   //BP Filters
   const handleBP = (bp) =>{
      if(selectedBP.includes(bp)){
         setSelectedBP(selectedBP.filter((item) => item !== bp ))
      }
      else{
         setSelectedBP([...selectedBP, bp])
      }
   }

   


   const parseBloodPressure = (bp) => {
      if (!bp || typeof bp !== 'string') {
      // If the input is invalid or not a string, return default values
      console.error('Invalid blood pressure data:', bp);
      return { systolic: null, diastolic: null }; // Default values
      }
   
      const [systolic, diastolic] = bp.split("/").map(Number);

      // Check if the split results are valid numbers
      if (isNaN(systolic) || isNaN(diastolic)) {
      console.error('Invalid blood pressure values:', bp);
      return { systolic: null, diastolic: null }; // Default values
      }
   
      return { systolic, diastolic };
   };

   const checkPatientBloodPressure = (systolic, diastolic) => {
      for (let value of selectedBP){
         if(value === "lt130-80" && systolic < 130 && diastolic < 80) {
            return true
         }
         if(value === "lt140-90" && systolic < 140 && diastolic < 90 ){
            return true
         }
         if(value === "140/90-159/90" && (systolic >= 140 && systolic <= 159 || diastolic >= 90)){
            return true
         }
         if(value="gte160-100" && (systolic >= 160 || diastolic >= 100)){
            return true
         }
      }
      return false
   }

   //CHA₂DS₂-VASc Filters

   const handleChd = (value) => {
      if(selectedChd.includes(value)){
         setSelectedChd(selectedChd.filter((item) => item !== value))
      }
      else{
         setSelectedChd ([...selectedChd, value])
      }
   }

   const handleOrbit = (value => {
      if(selectedOrbit.includes(value)){
         setSelectedOrbit(selectedOrbit.filter((item) => item !== value))
      }
      else{
         setSelectedOrbit([...selectedOrbit, value])
      }
   })


   //MedReview
   const handleMedReview = (value) => {
      setMedReview((prev) => (prev === value ? "" : value)); // Toggle value off
   };

   //Check Against Relative run date 

   const recordedOverTwelveMonths = (recordedDate, relativeRunDate) => {
      const recorded = new Date(recordedDate); // Convert to Date object
      const cutoffDate = new Date(relativeRunDate); // Reference date
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1); // Subtract 12 months
      return recorded < cutoffDate; // Check if recorded is over 12 months ago
   }

   

   //FILTER LOGIC
   const getFilteredPatients = () =>{
      return importedData.filter((patient) =>{
         const ageFilter = 
            selectedAges.includes("<65") && patient.age < 65 ||
            selectedAges.includes("65-79") && patient.age >= 65 && patient.age <= 79 ||
            selectedAges.includes("80+") && patient.age >= 80 ||
            selectedAges.length === 0;
      
         const nsaidFilter =
            nsaid === "Yes" && patient.nsaidIssued ==="Yes" ||
            nsaid === "No" && patient.nsaidIssued === "No" ||
            !nsaid;

         const cvdFilter =
            cvd === "Yes" && patient.cvd ==="Yes" ||
            cvd === "No" && patient.cvd === "No" ||
            !cvd;
         
         const { systolic, diastolic } = parseBloodPressure(patient.bp);
         const bloodPressureFilter = selectedBP.length === 0 || checkPatientBloodPressure(systolic, diastolic);
         


         const chdFilter =
            selectedChd.length === 0||
            selectedChd.includes("gte2") && patient.cha2ds2Vasc.value >= 2 ||
            selectedChd.includes("1") && patient.cha2ds2Vasc.value == 1 ||
            selectedChd.includes("0") && patient.cha2ds2Vasc.value == 0 ||
            selectedChd.includes(">12m") && recordedOverTwelveMonths(patient.cha2ds2Vasc.latestDate, "2024-12-05")||
            selectedChd.includes("not_recorded") && (!patient.cha2ds2Vasc.latestDate || patient.cha2ds2Vasc.latestDate.trim() === "")
            
            
         const orbitFilter = 
            selectedOrbit.length === 0 ||
            selectedOrbit.includes("gte4") && patient.orbit.value >=4 ||
            selectedOrbit.includes(">12m") && recordedOverTwelveMonths(patient.orbit.latestDate, "2024-12-05") ||
            selectedOrbit.includes("not_recorded") && (!patient.orbit.latestDate || patient.orbit.latestDate.trim() === "")
            
         
         const medReviewFilter = 
            medReview === "Yes" ? 
            recordedOverTwelveMonths(patient.medReviewDate, "2024-12-05" ) : true

            
         return ageFilter && nsaidFilter && cvdFilter && bloodPressureFilter && chdFilter && orbitFilter && medReviewFilter
         });   
   }

   //MAINCONTEXT VALUES
   //Values will be passed down to children of MainContext

   const contextValue ={
      patients, getFilteredPatients, 
      selectedAges, handleAgeSelection,
      nsaid, handleNSAID,
      cvd, handleCVD,
      selectedBP, handleBP,
      selectedChd,handleChd,
      selectedOrbit, handleOrbit,
      medReview, handleMedReview,
      importedData, setImportedData
      // handleGpSystem
      // parseBloodPressure,
      // checkPatientBloodPressure
   }



  return (
    <MainContext.Provider value ={ contextValue }>
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider







