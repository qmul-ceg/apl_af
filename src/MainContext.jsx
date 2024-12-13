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







//MODAL PATIENT CLICK
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
      selectedAnti:null,
      selectedAges: [],
      nsaid:"",
      cvd: null,
      selectedBP: [],
      selectedChdValue: [],
      selectedOrbit: [],
      medReview:"",
      selectedVulnerabilities: []
   }

   const [selectedAnti, setSelectedAnti] = useState(defaultFilters.selectedAnti)
   const [selectedAges, setSelectedAges] = useState(defaultFilters.selectedAges)
   const [nsaid, setNsaid] = useState (defaultFilters.nsaid)
   const [cvd, setCvd] = useState (defaultFilters.cvd)
   const [selectedBP, setSelectedBP] = useState(defaultFilters.selectedBP)
   const [selectedChdValue, setSelectedChdValue] = useState(defaultFilters.selectedChdValue) //CHA₂DS₂-VASc
   const [selectedOrbit, setSelectedOrbit] = useState (defaultFilters.selectedOrbit)
   const [medReview, setMedReview] = useState (defaultFilters.medReview)
   const [selectedVulnerabilities, setSelectedVulnerabilities] = useState (defaultFilters.selectedVulnerabilities)  //Vulnerabilities


   //FILTER BREADCRUMBS






   const resetFilters = ()=>{
      setSelectedAnti(defaultFilters.selectedAnti);
      setSelectedAges(defaultFilters.selectedAges);
      setNsaid(defaultFilters.nsaid);
      setCvd(defaultFilters.setCvd);
      setSelectedBP(defaultFilters.selectedBP);
      setSelectedOrbit(defaultFilters.selectedOrbit);
      setMedReview(defaultFilters.medReview);
      setSelectedVulnerabilities(defaultFilters.selectedVulnerabilities);
   }

   /////FILTER SELECTIONS
   //AntiFilter
   const handleAntiFilter =(value, label) => {
      if (selectedAnti && selectedAnti.value === value) {
         setSelectedAnti(null);
      } else {
         setSelectedAnti({ value, label });
      }
   }
   // console.log(selectedAnti)
   //Age Filters
   const handleAgeSelection = (value, label) =>{
      setSelectedAges((prev) => {
         const exists = selectedAges.some(object => object.value === value)

         if(exists){
            return prev.filter(object => object.value !== value);
         }
         else {
            return [...prev, {value, label}]
         }
         
      })
      
   }

   //NSAID Filter Logic
   const handleNSAID = (value) => {
      setNsaid((prev) => (prev === value ? "" : value)); // Toggle value off
   };

    //CVD Filter Logic
    const handleCVD = (value, label) => {
      if (cvd && cvd.value === value) {
         setCvd(null);
      } else {
         setCvd({ value, label });
      }
   };

   //BP Filters
   const handleBP = (value, label)=>{
      setSelectedBP((prev) => {
         const exists = selectedBP.some(object => object.value === value)

         if(exists){
            return prev.filter(object => object.value !== value);
         }
         else {
            return [...prev, {value, label}]
         }
         
      })
   }
   
   const removeBP = (value) => {
      setSelectedBP((prev) => (
         prev.filter(object => object.value !== value)
      ))

   }

   const removeOrbitDisplay = (value) => {
      setSelectedOrbit((prev) => (
         prev.filter(object => object.value !== value)
      ))
   }

   const removeAgeDisplay = (value) => {
      setSelectedAges((prev) => (
         prev.filter(object => object.value !== value)
      ))
   }

   const removeCvdDisplay = (value) => {
      setCvd(null);
   }
   

   //BLOOD PRESSURE FILTER
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
      for (let object of selectedBP){
         if(object.value === "lt130-80" && systolic < 130 && diastolic < 80) {
            return true
         }
         if(object.value === "lt140-90" && systolic < 140 && diastolic < 90 ){
            return true
         }
         if(object.value === "140/90-159/90" && (systolic >= 140 && systolic <= 159 || diastolic >= 90)){
            return true
         }
         if(object.value ==="gte160-100" && (systolic >= 160 || diastolic >= 100)){
            return true
         }
      }
      return false
   }

   //CHA₂DS₂-VASc Filters
   const [selectedChdDate, setSelectedChdDate] = useState(null)
   const handleChdValue = (value, label) => {
      setSelectedChdValue((prev) => {
         const exists = prev.some(object => object.value === value)
         if(exists){
            return prev.filter((object) => object.value != value)
         }else{
            return [...prev, {value, label}]
         }
      })
   }

   const handleChdDate = (value, label) => {
      if (selectedChdDate && selectedChdDate.value === value) {
         setSelectedChdDate(null);
      } else {
         setSelectedChdDate({ value, label });
      }
   }

   const removeChdValue = (value) =>{
      setSelectedChdValue((prev) => (
         prev.filter(object => object.value !== value)
      ))
   }

   const removeChdDate = () =>{
      setSelectedChdDate(null);
   }

// console.log(selectedChdDate)
// console.log(selectedChdValue)

// console.log(selectedChdValue.some(item => item.value === "gte2"));
// console.log(selectedChdDate)



   const handleOrbit = (value, label) => {
      setSelectedOrbit((prev) => {
         const exists = prev.some(object => object.value === value);

         if(exists){
            return prev.filter((object) => object.value !== value)
         }else {
            return [...prev, {value, label}]
         }
      });
   }


   //MedReview
   const handleMedReview = (value) => {
      setMedReview((prev) => (prev === value ? "" : value)); // Toggle value off
   };

   //Vulnerabilities
   const handleVulnerabilitesFilter = (value, label) => {
      setSelectedVulnerabilities((prev) => {
         const exists = prev.some((item) => item.value === value)

         if (exists){
            return prev.filter((item) => item.value !== value)
           
         }else {
            return [...prev, {value, label}]
         };
      })
   }    

   //CONERT DATE TO JS FORMAT
   const convertDate = (dateString) => {
      if (dateString){
         const [day, month, year] = dateString.split('-');
         const months = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };
      
         return `20${year}-${months[month]}-${day}`; 
      }
      else return ""
      
  }

   //CHECK RELATIVE RUN DATE 
   const recordedOverTwelveMonths = (recordedDate, relativeRunDate) => {
      const recorded = new Date(recordedDate); // Convert to Date object
      const cutoffDate = new Date(relativeRunDate); // Reference date
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1); // Subtract 12 months
      return recorded < cutoffDate; // Check if recorded is over 12 months ago
   }

   //CONVERT RELATIVE RUN DATE 
   const convertRelativeRunDate = (dateString) =>{
      if(dateString){
         const [day, month, year] = dateString.split('/');
         return `${year}-${month}-${day}`;
      }
      else return ""
      
   }
 
    

   //FILTER LOGIC
   const getFilteredPatients = () =>{
      return importedData.filter((patient) =>{

         //none, doac_warf, doac, warf, antiplatelets, dual
         const doacWarf = selectedAnti && selectedAnti.value === "doac_warf";
         const doac = selectedAnti && selectedAnti.value === "doac";
         const warfarin = selectedAnti && selectedAnti.value === "warf";
         const antiplatelets = selectedAnti && selectedAnti.value === "antiplatelets";
         const none = selectedAnti && selectedAnti.value === "no_anticoagulant";
         const dualTherapy = selectedAnti && selectedAnti.value === "dual";


         const antiFilterControl = 
            selectedAnti === null||
            (doacWarf && 
               (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") || 
                patient[AFibColumns.OnAnticoagulant].includes("YES - WARF"))) ||
            (doac && 
               patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC")) ||
            (warfarin && 
               patient[AFibColumns.OnAnticoagulant].includes("YES - WARF")) ||
            (antiplatelets && 
               patient[AFibColumns.OnAspirinAntiplatelet] === "YES" &&
               patient[AFibColumns.OnAnticoagulant] ==="NO")  ||
            (dualTherapy && 
                  patient[AFibColumns.OnAspirinAntiplatelet] === "YES" && 
                   (patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") ||
                   patient[AFibColumns.OnAnticoagulant].includes("YES - WARF"))) ||
            (none && 
               !patient[AFibColumns.OnAnticoagulant].includes("YES - DOAC") &&
               (!patient[AFibColumns.OnAnticoagulant].includes("YES - WARF")))
               // (patient[AFibColumns.OnAnticoagulant] != "YES - WARF"))
            



         const ageFilter = 
            (selectedAges.some(item => item.value === "<65") && patient[AFibColumns.Age] < 65) ||
            (selectedAges.some(item => item.value === "65-79") && patient[AFibColumns.Age] >= 65 && patient[AFibColumns.Age] <= 79) ||
            (selectedAges.some(item => item.value === "80+") && patient[AFibColumns.Age] >= 80) ||
            selectedAges.length === 0;
      
         const nsaidFilter =
            nsaid === "YES" && patient[AFibColumns.OnNSAID] ==="YES" ||
            nsaid === "NO" && patient[AFibColumns.OnNSAID] === "NO" ||
            !nsaid;

         const cvdFilter =
            (cvd && cvd.value === "Yes" && patient[AFibColumns.CVD]  ==="YES") ||
            (cvd && cvd.value === "No" && patient[AFibColumns.CVD]  === "NO") ||
            !cvd;
         

         const { systolic, diastolic } = parseBloodPressure(patient[AFibColumns.BP] );
         const bloodPressureFilter = selectedBP.length === 0 || checkPatientBloodPressure(systolic, diastolic);
         
         
         
         
         
         // CHADVASC FILTER
         //Value variables
         const gteTwo = selectedChdValue.some(item => item.value === "gte2" && patient[AFibColumns.CHADSVAScValue] >= 2);
         const equalToOne = selectedChdValue.some(item => item.value === "1" && patient[AFibColumns.CHADSVAScValue]  == 1)
         const equalToZero = selectedChdValue.some(item => item.value === "0" && patient[AFibColumns.CHADSVAScValue]  === '0')
         //Date Variables
         const overTwelveMonths = (selectedChdDate && selectedChdDate.value === ">12m" && recordedOverTwelveMonths(patient[AFibColumns.CHADSVAScDate], convertRelativeRunDate(relativeRunDate)));    
         const notRecorded = (selectedChdDate && selectedChdDate.value === "not_recorded" && (!convertDate(patient[AFibColumns.CHADSVAScDate]) || convertDate(patient[AFibColumns.CHADSVAScDate]).trim() === ""));
         const lessThanTwelveMonths = (selectedChdDate && selectedChdDate.value === "<12m" && 
            !recordedOverTwelveMonths(patient[AFibColumns.CHADSVAScDate], convertRelativeRunDate(relativeRunDate)) && 
            convertDate(patient[AFibColumns.CHADSVAScDate]) && 
            convertDate(patient[AFibColumns.CHADSVAScDate]).trim() !== "");

         const chdFilter =
            //Ony value selection no date selection 
            selectedChdValue.length === 0 && selectedChdDate === null ||
            //One CHADVASC value selection
            (gteTwo && selectedChdDate === null) ||
            (equalToOne && selectedChdDate === null) ||
            (equalToZero && selectedChdDate === null) ||
   
            //Only dates selection
            (selectedChdValue.length === 0 && overTwelveMonths) ||
            (selectedChdValue.length === 0 && notRecorded) ||
            (selectedChdValue.length === 0 && lessThanTwelveMonths) ||

            //CHDVASC Value and Date combinations
            (gteTwo && overTwelveMonths) ||     
            (gteTwo && notRecorded) ||      
            (gteTwo && lessThanTwelveMonths) ||
           
            (equalToOne && overTwelveMonths) ||   
            (equalToOne && notRecorded) ||           
            (equalToOne && lessThanTwelveMonths) ||
           
            (equalToZero && overTwelveMonths) ||   
            (equalToZero && notRecorded) ||           
            (equalToZero && lessThanTwelveMonths); 
           
                
            
         const orbitFilter = 
            selectedOrbit.length === 0 ||
            selectedOrbit.some(object => object.value === "gte4") && patient[AFibColumns.ORBIT_Value] >=4 ||
            selectedOrbit.some(object => object.value === ">12m") && recordedOverTwelveMonths(patient[AFibColumns.ORBIT_Date], convertRelativeRunDate(relativeRunDate)) ||
            selectedOrbit.some(object => object.value === "not_recorded") && (!convertDate(patient[AFibColumns.ORBIT_Date]) || convertDate(patient[AFibColumns.ORBIT_Date]).trim() === "")
            
         
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

         const vulnerabFilter = 
            selectedVulnerabilities.length === 0 ||
            (selectedVulnerabilities.some(item => item.value === "smi") && patient[AFibColumns.SMI_Concept].trim() !== "") ||
            (selectedVulnerabilities.some(item => item.value === "learning_disability") && patient[AFibColumns.LD_Concept].trim() !== "") ||
            (selectedVulnerabilities.some(item => item.value === "dementia") && patient[AFibColumns.DementiaConcept].trim() !== "") ||
            (selectedVulnerabilities.some(item => item.value === "housebound") && patient[AFibColumns.HouseboundConcept].trim() !== "");
            // selectedVulnerabilities.includes("smi") && patient[AFibColumns.SMI_Concept].trim() !== "" ||
            // selectedVulnerabilities.includes("learning_disability") && patient[AFibColumns.LD_Concept].trim() !== "" ||
            // selectedVulnerabilities.includes("dementia") && patient[AFibColumns.DementiaConcept].trim() !== "" ||
            // selectedVulnerabilities.includes("housebound") && patient[AFibColumns.HouseboundConcept].trim() !== ""         
   
               
         return ageFilter && nsaidFilter && cvdFilter && bloodPressureFilter && chdFilter && orbitFilter && medReviewFilter && antiFilterControl && vulnerabFilter
         });   
   }

   

   //TABLE DATA AND SORTING
   const [sortChdValue, setSortChdValue] = useState("desc")
   const [data, setData] = useState([])
   const [dataCount, setDataCount] = useState()
  
   // const filteredPatients = getFilteredPatients()
   const filteredPatients = React.useMemo(() => {
      return getFilteredPatients();  // Only recompute when dependencies (filters) change
   }, [importedData, selectedAnti, selectedAges, nsaid, cvd, selectedBP, selectedChdValue, selectedChdDate, selectedOrbit, medReview, relativeRunDate, selectedVulnerabilities]);

   // console.log(filteredPatients)
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
      selectedAges, handleAgeSelection, removeAgeDisplay,
      nsaid, handleNSAID,
      cvd, handleCVD, removeCvdDisplay,
      selectedBP, handleBP, removeBP,
      // selectedChd,handleChd,
      selectedOrbit, handleOrbit, removeOrbitDisplay,
      medReview, handleMedReview, setMedReview,
      importedData, setImportedData,
      relativeRunDate, setRelativeRunDate,
      selectedAnti, handleAntiFilter,
      setSelectedVulnerabilities, selectedVulnerabilities, handleVulnerabilitesFilter,
      isModalOpen, setIsModalOpen,
      handlePatientClick,
      selectedPatientData,
      handleNextPatient,
      handlePreviousPatient,
      resetFilters,
      handleSortClick, data,
      sortChdValue, dataCount,
      relativeRunDate,
      handleChdValue,  selectedChdValue, removeChdValue,
      handleChdDate,selectedChdDate, removeChdDate
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

// handleVulnerabilities,