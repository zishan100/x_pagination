import React , { useState  , useEffect }from 'react';
import './index.css'

function App () {
  
  let  [ employees , setEmployees ] = useState([]);
  let [ updateEmployees , setUpdateEmployees ] = useState([]);
  let tableColumns = ["id","name","email","role"];
  let [ pagination ,setPagination ] = useState({
    noOfPage:0,
    pageNo:1
  })

  useEffect(()=>{
    
    fetchEmployeeData();
  
  },[]);

  const fetchEmployeeData = async()=>{
      
    try{
      const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
      
      const getData = await response.json();
      
      console.log(getData);

      if( getData && getData.length > 0 ){
        setEmployees(getData);
        
        setUpdateEmployees(getData);
        setPagination({
          noOfPage:Math.ceil(getData.length/10),
          pageNo:1
        })
           
      }

    }catch(err){
      console.log(err); 
      
    }   
  }

  const handleChangeEvent = (curr)=>{
    
    const { noOfPage } = pagination
    // console.log(curr);
    if( 1<=curr && curr<=noOfPage){
      setPagination({
        ...pagination,
        pageNo:curr
      })
    }

    // console.log(pagination);
    
  }
  
  
   
  return (
    <div className="main">
      <h2 className='heading' >Employee Data Table</h2>
      <table>
        <thead> 
          <tr>
            {
              tableColumns.map((cols,idx)=>(<th key={idx} >{cols}</th>))  
            } 

          </tr>
        </thead>  
        <tbody>
        {
           updateEmployees.slice((pagination.pageNo-1)*10,pagination.pageNo*10).map((items,idx)=>{
            const tD = Object.values(items);  
            
            return (
                <tr key={idx} >
                {
                  tD.map((items,idx)=>(<td key={idx} >{items}</td>))
                }
                </tr>
            )
              
               
           })        
        }
        </tbody>

        
    </table>
    <div className='navigateBtn' >
      <button 
        className='navBtn' 
        type='button'
        onClick={(e)=>handleChangeEvent(pagination.pageNo-1)} 
      >Previous</button>
      <p className='currPage' >{pagination.pageNo}</p>
      <button 
        className='navBtn' 
        type='button'
        onClick={(e)=>handleChangeEvent(pagination.pageNo+1)}
      >Next</button>
    </div>
    </div>
  );
  
}

export default App;
