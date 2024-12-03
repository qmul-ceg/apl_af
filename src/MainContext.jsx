import React, { useState, createContext, useMemo, } from 'react'
import patientsData from '/src/data/patient_data.json'
import { GpSystems } from './enums/GPsystems'
import { AFibColumns } from './enums/AFibColumns'

export const MainContext = createContext()

const MainProvider = ({ children }) => {
   const [patients] = useState(patientsData) //Static because we are not setting our patient data
   const [importedData, setImportedData] = useState([])
   const [relativeRunDate, setRelativeRunDate] = useState("")
   const [isModalOpen, setIsModalOpen] =useState(false)
   const [selectedPatientData, setSelectedPatientData] =useState()
   const [selectedPatientIndex, setSelectedPatientIndex] =useState()
   // const [tableData, setTableData] = useState([])
   // console.log(isModalOpen)



   const handlePatientClick = (index) =>{
      console.log("Clicked row index:", index)

      if(data.length > 0 && data[index]){
         const selectedPatientRow = data[index] //Get the index of the the patient selected in imported Data
         setSelectedPatientData(selectedPatientRow) 
         setSelectedPatientIndex(index) //Stores index of the selected patient
         setIsModalOpen(true)  //Opens modal
         // console.log(selectedPatientRow)
         // console.log(selectedPatientData)
      }
   
   }

   const handleNextPatient = () =>{
      setSelectedPatientIndex((prevIndex) =>{
         const nextIndex = prevIndex + 1 
         const updatedIndex = nextIndex < data.length ? nextIndex : prevIndex;
         setSelectedPatientData(data[updatedIndex])
         return updatedIndex
      })
   }
   

   const handlePreviousPatient = () => {
      setSelectedPatientIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      const updatedIndex = prevIndexValue >= 0 ? prevIndexValue : prevIndex;
      setSelectedPatientData(data[updatedIndex]);  // Update selected patient data
      return updatedIndex;
      });
   };


   //FILTER STATES
   const defaultFilters ={
      selectedAnti:"none",
      selectedAges: [],
      nsaid:"",
      cvd: "",
      selectedBP: [],
      selectedChd: [],
      selectedOrbit: [],
      medReview:""
   }




   const [selectedAnti, setSelectedAnti] = useState(defaultFilters.selectedAnti)
   const [selectedAges, setSelectedAges] = useState(defaultFilters.selectedAges)
   const [nsaid, setNsaid] = useState (defaultFilters.nsaid)
   const [cvd, setCvd] = useState (defaultFilters.cvd)
   const [selectedBP, setSelectedBP] = useState(defaultFilters.selectedBP)
   const [selectedChd, setSelectedChd] = useState(defaultFilters.selectedChd) //CHA₂DS₂-VASc
   const [selectedOrbit, setSelectedOrbit] = useState (defaultFilters.selectedOrbit)
   const [medReview, setMedReview] = useState (defaultFilters.medReview)


  

   const resetFilters = ()=>{
      setSelectedAnti(defaultFilters.selectedAnti);
      setSelectedAges(defaultFilters.selectedAges);
      setNsaid(defaultFilters.nsaid);
      setCvd(defaultFilters.setCvd);
      setSelectedBP(defaultFilters.selectedBP);
      setSelectedChd(defaultFilters.selectedChd);
      setSelectedOrbit(defaultFilters.selectedOrbit);
      setMedReview(defaultFilters.medReview); 
   }


   /////FILTER SELECTIONS
   //AntiFilter
   const handleAntiFilter =(value) => {
      setSelectedAnti(value)
   }
   // console.log(selectedAnti)
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
      // console.error('Invalid blood pressure data:', bp);
      return { systolic: null, diastolic: null }; // Default values
      }
   
      const [systolic, diastolic] = bp.split("/").map(Number);

      // Check if the split results are valid numbers
      if (isNaN(systolic) || isNaN(diastolic)) {
      // console.error('Invalid blood pressure values:', bp);
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
         if(value ==="gte160-100" && (systolic >= 160 || diastolic >= 100)){
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


   //Convert Date to JS Format 
   const convertDate = (dateString) => {
      if (dateString){
         const [day, month, year] = dateString.split('-');
         const months = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };
      
         return `20${year}-${months[month]}-${day}`; 
      }
      else return ""
      
  }

   //Function to Check Against Relative run date 
   const recordedOverTwelveMonths = (recordedDate, relativeRunDate) => {
      const recorded = new Date(recordedDate); // Convert to Date object
      const cutoffDate = new Date(relativeRunDate); // Reference date
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1); // Subtract 12 months
      return recorded < cutoffDate; // Check if recorded is over 12 months ago
   }

   //Convert Relative Run Date
   const convertRelativeRunDate = (dateString) =>{
      if(dateString){
         const [day, month, year] = dateString.split('/');
         return `${year}-${month}-${day}`;
      }
      else return ""
      
   }
   // console.log(convertRelativeRunDate(relativeRunDate))
    

   //FILTER LOGIC
   const getFilteredPatients = () =>{
      return importedData.filter((patient) =>{

         //none, doac_warf, doac, warf, antiplatelets, dual
         const antiFilterControl = 
            selectedAnti === "none"||
            (selectedAnti === "doac_warf" && 
               (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") || 
                patient[AFibColumns.OnAnticoagulant].includes("YES - WARF"))) ||
            (selectedAnti === "doac" && 
               patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC")) ||
            (selectedAnti === "warf" && 
               patient[AFibColumns.OnAnticoagulant].includes("YES - WARF")) ||
            (selectedAnti === "antiplatelets" && 
               patient[AFibColumns.OnAspirinAntiplatelet] === "YES" &&
               patient[AFibColumns.OnAnticoagulant] ==="NO")  ||
            (selectedAnti === "dual" && 
                  patient[AFibColumns.OnAspirinAntiplatelet] === "YES" && 
                   (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") ||
                   patient[AFibColumns.OnAnticoagulant].includes("YES - WARF"))) ||
            (selectedAnti === "no_anticoagulant" && 
               !patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") &&
               (!patient[AFibColumns.OnAnticoagulant].includes("YES - WARF")))
               // (patient[AFibColumns.OnAnticoagulant] != "YES - WARF"))
            



         const ageFilter = 
            (selectedAges.includes("<65") && patient[AFibColumns.Age] < 65) ||
            (selectedAges.includes("65-79") && patient[AFibColumns.Age] >= 65 && patient[AFibColumns.Age] <= 79) ||
            (selectedAges.includes("80+") && patient[AFibColumns.Age] >= 80) ||
            selectedAges.length === 0;
      
         const nsaidFilter =
            nsaid === "YES" && patient[AFibColumns.OnNSAID] ==="YES" ||
            nsaid === "NO" && patient[AFibColumns.OnNSAID] === "NO" ||
            !nsaid;

         const cvdFilter =
            cvd === "YES" && patient[AFibColumns.CVD]  ==="YES" ||
            cvd === "NO" && patient[AFibColumns.CVD]  === "NO" ||
            !cvd;
         

         const { systolic, diastolic } = parseBloodPressure(patient[AFibColumns.BP] );
         const bloodPressureFilter = selectedBP.length === 0 || checkPatientBloodPressure(systolic, diastolic);
         


         const chdFilter =
            selectedChd.length === 0||
            selectedChd.includes("gte2") && patient[AFibColumns.CHADSVAScValue]  >= 2 ||
            selectedChd.includes("1") && patient[AFibColumns.CHADSVAScValue] == 1 ||
            selectedChd.includes("0") && patient[AFibColumns.CHADSVAScValue] == 0 ||
            selectedChd.includes(">12m") && recordedOverTwelveMonths(patient[AFibColumns.CHADSVAScDate], convertRelativeRunDate(relativeRunDate))||
            selectedChd.includes("not_recorded") && (!convertDate(patient[AFibColumns.CHADSVAScDate]) || convertDate(patient[AFibColumns.CHADSVAScDate]).trim() === "")
            
            
         const orbitFilter = 
            selectedOrbit.length === 0 ||
            selectedOrbit.includes("gte4") && patient[AFibColumns.ORBIT_Value] >=4 ||
            selectedOrbit.includes(">12m") && recordedOverTwelveMonths(patient[AFibColumns.ORBIT_Date], convertRelativeRunDate(relativeRunDate)) ||
            selectedOrbit.includes("not_recorded") && (!convertDate(patient[AFibColumns.ORBIT_Date]) || convertDate(patient[AFibColumns.ORBIT_Date]).trim() === "")
            
         
         const medReviewFilter = 
            !medReview ||
            (medReview === "YES" && 
               (!patient[AFibColumns.MedsReviewDate] || 
               recordedOverTwelveMonths(
                  convertDate(patient[AFibColumns.MedsReviewDate]), 
                  convertRelativeRunDate(relativeRunDate)
               ))) || 
            (medReview === "NO" && 
               patient[AFibColumns.MedsReviewDate] && 
               !recordedOverTwelveMonths(
                  convertDate(patient[AFibColumns.MedsReviewDate]), 
                  convertRelativeRunDate(relativeRunDate)
               ));
         
         return ageFilter && nsaidFilter && cvdFilter && bloodPressureFilter && chdFilter && orbitFilter && medReviewFilter && antiFilterControl
         });   
   }

   

   //TABLE DATA AND SORTING
   const [sortChdValue, setSortChdValue] = useState("asc")
   const [data, setData] = useState([])
   const [dataCount, setDataCount] = useState()
  
   // const filteredPatients = getFilteredPatients()
   const filteredPatients = React.useMemo(() => {
      return getFilteredPatients();  // Only recompute when dependencies (filters) change
   }, [importedData, selectedAnti, selectedAges, nsaid, cvd, selectedBP, selectedChd, selectedOrbit, medReview, relativeRunDate]);

   console.log(filteredPatients)
   const handleSortClick = () => {
      setSortChdValue(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
   }

   const sortedPatients = () => {
      if (sortChdValue === 'asc') {
          return [...filteredPatients].sort((a, b) => {
              const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
              const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
              return valueA - valueB; // Ascending
          });
      } else {
          return [...filteredPatients].sort((a, b) => {
              const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
              const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
              return valueB - valueA; // Descending
          });
      }
  };

   React.useEffect(() => {
      const sortedData = sortedPatients();
      setData(sortedData);
      setDataCount(sortedData.length)
   }, [ filteredPatients, sortChdValue ]);

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
      importedData, setImportedData,
      setRelativeRunDate,
      selectedAnti, handleAntiFilter,
      isModalOpen, setIsModalOpen,
      handlePatientClick,
      selectedPatientData,
      handleNextPatient,
      handlePreviousPatient,
      resetFilters,
      handleSortClick, data,
      sortChdValue, dataCount
  
   }



  return (
    <MainContext.Provider value ={ contextValue }>
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider





    // openModal, setOpenModal,
      // modalOpen

      // handleGpSystem
      // parseBloodPressure,
      // checkPatientBloodPressure

