import React, { useContext, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { MainContext } from '@/MainContext'
import { AFibColumns } from '@/enums/AFibColumns'
import { useReactTable } from '@tanstack/react-table'


const Data = () => {

   const { 
      getFilteredPatients, 
      setIsModalOpen, 
      handlePatientClick,
      handleSortClick,
      data, sortChdValue,
      setImportedData
      } = useContext(MainContext)

   // const filteredPatients = getFilteredPatients()
//    const [sortChdValue, setSortChdValue] = useState("asc")
  

//    // console.log(filteredPatients)
//    const handleSortClick = () => {
//       setSortChdValue (prevDirection => {
//          return (prevDirection === "asc" ? "desc" : "asc")
//       })
//    }

// useEffect(() => {
//    return () => {
//      // Clear data when the component unmounts
//      setImportedData([]);
//    };
//  }, []);

//    const sortedPatients = () => {
//       if (sortChdValue === 'asc') {
//           return [...filteredPatients].sort((a, b) => {
//               const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
//               const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
//               return valueA - valueB; // Ascending
//           });
//       } else {
//           return [...filteredPatients].sort((a, b) => {
//               const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
//               const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
//               return valueB - valueA; // Descending
//           });
//       }
//   };

//    const tableData = sortedPatients()


  return (
   <>      
       <Table className=" border border-gray-400 mb-10">
         
          <TableHeader >
             <TableRow className="font-bold text-xs bg-[#648DBC] hover:bg-bg-[#648DBC]">
                <TableHead className="border-b border-r border-gray-400 text-center font-semibold text-white">Full Name</TableHead>
                <TableHead className="border-b border-r border-gray-400  font-semibold text-white">Age</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">Gender</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">Patience Reference No.</TableHead>
                <TableHead className="border-b border-r border-gray-400 w-44 p-0">
                   <tr className="border-none">
                      <th className="w-44 p-0">
                         <div className="h-full flex flex-col justify-center">
                            <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1 font-semibold text-white">
                            CHA₂DS₂-VASc
                            </div>
                           <div className="flex w-full">
                              <span className="w-full py-2 border-r border-gray-400 cursor-pointer font-semibold text-white" onClick={handleSortClick}
                              >
                                 Value<span>{sortChdValue === "asc" ? ' ↑' : ' ↓'}</span>
                              </span>
                           
                              <span className="w-full py-2  border-gray-400 font-semibold text-white">Latest Date</span>
                           </div>
                         </div>
                      </th>
                   </tr>
                </TableHead>
                <TableHead className="border-b border-r border-gray-400 w-44 p-0">
                   <tr className="border-none">
                      <th className="w-44 p-0">
                         <div className="h-full text-center flex flex-col justify-center">
                            <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1 font-semibold text-white">
                               ORBIT
                            </div>
                         <div className="flex w-full">
                            <span className="w-full py-2 border-r border-gray-400 font-semibold text-white">Value</span>
                          
                            <span className="w-full py-2  border-gray-400 font-semibold text-white">Latest Date</span>
                         </div>
                         </div>
                      </th>
                   </tr>
                </TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">Anticoagulant issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white ">Aspirin / Antiplatelet <br />issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white ">NSAID issued excl. <br /> Aspirin(6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white ">Statin issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-semibold text-white">CVD</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-semibold text-white">HTN</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-semibold text-white">BP</TableHead>
                <TableHead className="border-b border-gray-400 font-semibold text-white ">Medication Review Latest date</TableHead>
             </TableRow>
          </TableHeader>
         
          
         <TableBody className="text-center text-xs">
             {data.map((patient, index)=> (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''} >
               {/* <Dialog>
                  <DialogTrigger asChild> */}
                     <TableCell className="font-medium  cursor-pointer text-blue-600 hover:underline"
                        onClick={()=>handlePatientClick(index)}
                     >
                        {patient[AFibColumns.FullName]}

                     </TableCell>
                 

               
               <TableCell>{patient[AFibColumns.Age]}</TableCell>
               <TableCell>{patient[AFibColumns.Gender]}</TableCell>
               <TableCell >{patient[AFibColumns.PatientReference]}</TableCell>
               <TableCell>
               <div className="flex w-full">
                  <span className="text-xs w-[50%] ">{patient[AFibColumns.CHADSVAScValue]}</span>
                  <span className=" text-xs w-full pl-6 ">{patient[AFibColumns.CHADSVAScDate]}</span>
               </div>
               </TableCell>
               
               <TableCell >
                  <div className="flex w-full">
                     <span className="text-xs w-[50%] ">{patient[AFibColumns.ORBIT_Value]}</span>
                     <span className="text-xs w-full pl-6 ">{patient[AFibColumns.ORBIT_Date]}</span>
                  </div>
               </TableCell>
               <TableCell>{patient[AFibColumns.OnAnticoagulant]}</TableCell>
               <TableCell >{patient[AFibColumns.OnAspirinAntiplatelet]}</TableCell>
               <TableCell >{patient[AFibColumns.OnNSAID]}</TableCell>
               <TableCell>{patient[AFibColumns.OnStatin]}</TableCell>
               <TableCell >{patient[AFibColumns.CVD]}</TableCell>
               <TableCell >{patient[AFibColumns.Hypertension]}</TableCell>
               <TableCell >{patient[AFibColumns.BP]}</TableCell>
               <TableCell >{patient[AFibColumns.MedsReviewDate]}</TableCell>
            </TableRow>
              )) }
         </TableBody>
      </Table>
     {/* </div> */}
    </>

   
  )
}

export default Data
