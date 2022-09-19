import React from 'react'
import {Typography, Box, Grid, TextField, Button} from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditComponant = () => {

  
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [student ,setStudent] = useState({
    stuname :'',  
    email :''
}
);

 

    useEffect(()=>{
      async function getStudent(){
          try{
              const student = await axios.get(`http://localhost:3001/students/${id}`)
              // console.log(student.data)
              setStudent(student.data)
          }catch(error){
              console.log('somthing wrong')
          }
      }    

      getStudent(id);
    }, [])

    
    function onTextFieldChange(e){
      setStudent({
          ...student,
          [e.target.name] : e.target.value
      })
      // console.log(student);
  }

    async function onFormSubmit(e){
      e.preventDefault()
      try{
          await axios.put(`http://localhost:3001/students/${id}`, student)
          navigate('/')
      }catch(error){
          console.log('somthing wrong')
      }
  }

    
  function handleClick(){
    navigate('/');
}


  return (
    <>
    <Box textAlign="center" p={2}  mb={2}>
     <Typography variant="h2" backgroundColor='primary.main'>Form</Typography>
    </Box>
  
    <Grid container justify="center" spacing={4}>
     <Grid item md={6} xs={12}>
      <Box textAlign="center" p={4} mb={2}>
       <Typography variant="h3" backgroundColor="secondary.main">Edit Employee</Typography>
      </Box>
      <form>
       <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
         <TextField  autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
         <TextField autoComplete="Fname" name="Fname" variant="outlined" required fullWidth id="Fname" label="FName" onChange={e=>onTextFieldChange(e)} value={student.Fname}/>
        </Grid>
        <Grid item xs={12} sm={6}>
         <TextField autoComplete="Lname" name="Lname" variant="outlined" required fullWidth id="Lname" label="LName" onChange={e=>onTextFieldChange(e)} value={student.Lname}/>
        </Grid>
        <Grid item xs={12} sm={6}>
         <TextField autoComplete="contact" name="contact" variant="outlined" required fullWidth id="contact" label="Contact" onChange={e=>onTextFieldChange(e)} value={student.contact}/>
        </Grid>
        <Grid item xs={12}>
         <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address"  onChange={e=>onTextFieldChange(e)} value={student.email} />
        </Grid>
        <Grid item xs={12}>
         <TextField autoComplete="address" name="address" variant="outlined" required fullWidth id="adress" label="Address"  onChange={e=>onTextFieldChange(e)} value={student.address} />
        </Grid>
        <Grid item xs={12}>
         <TextField autoComplete="designation" name="designation" variant="outlined" required fullWidth id="Designation" label="Designation"  onChange={e=>onTextFieldChange(e)} value={student.designation} />
        </Grid>
       </Grid>
       <Box m={3}>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={e=> onFormSubmit(e)} > Update </Button>
       </Box>
      </form>
      <Box m={3} textAlign="center">
       <Button variant="contained" color="primary"  onClick={handleClick}>Back to Home</Button>
      </Box>
     </Grid>
    </Grid>
   </>
  )
}

export default EditComponant