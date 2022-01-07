
import axios from 'axios';
import React,{useState} from 'react'
import {OutTable, ExcelRenderer} from 'react-excel-renderer';


function App() {

  const [excelData,setData]=useState();

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
       
          setData(resp);
      }
    });               

  }

 const ExcelDateToJSDate = (date) => {
  let converted_date = new Date(Math.round((date - 25569) * 864e5));
  converted_date = String(converted_date).slice(4, 15)
  date = converted_date.split(" ")
  let day = date[1];
  let month = date[0];
  month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
  if (month.toString().length <= 1)
      month = '0' + month
  let year = date[2];
  return String(day + '-' + month + '-' + year)
}
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const Objarr=Object.entries(excelData.rows);
    for (const i in Objarr) {
         if(i==='0')
         continue;
        const date=ExcelDateToJSDate(Objarr[i][1][2]);
        const day=date.split('-')[0];
        const newObj={
          name:Objarr[i][1][1],
          DOB:date,
          day:day,
          email:Objarr[i][1][3],
        }
        console.log(i,"th object is:",newObj);
        await axios.post("http://localhost:5000/data",newObj);
    }
    
  }

  return (
    <div>
      <form action='post' onSubmit={(e)=>handleSubmit(e)}>
      <input type="file" required onChange={(e)=>fileHandler(e)} style={{"padding":"10px"}} />
      <button onClick={(e)=>handleSubmit(e)}>Submit</button>
      </form>
       
    </div> 
    
  );
}

 export default App;

// import axios from 'axios';
// import React,{useState} from 'react'
// import {OutTable, ExcelRenderer} from 'react-excel-renderer';


// function App() {

//   const [excelData,setData]=useState();

//   const fileHandler = (event) => {
//     let fileObj = event.target.files[0];

//     ExcelRenderer(fileObj, (err, resp) => {
//       if(err){
//         console.log(err);            
//       }
//       else{
       
//           setData(resp);
//       }
//     });               

//   }
  

//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     console.log(typeof(excelData));
//     console.log(excelData.rows);
//     const Objarr=Object.entries(excelData.rows);
//     for (const i in Objarr) {
//         console.log(Objarr[i]);
//         const newObj={
//           name:Objarr[i][1][1],
//           DOB:Objarr[i][1][2],
//           email:Objarr[i][1][3],
//         }
//         if(i==='0')
//         continue;
//         console.log(i,"th object is:",newObj);
//         await axios.post("http://localhost:5000/data",newObj);
//     }
    
//   }

//   return (
//     <div>
//       <form action='post' onSubmit={(e)=>handleSubmit(e)}>
//       <input type="file" required onChange={(e)=>fileHandler(e)} style={{"padding":"10px"}} />
//       <button onClick={(e)=>handleSubmit(e)}>Submit</button>
//       </form>
       
//     </div> 
    
//   );
// }

// export default App;

