import React, {useState} from 'react'
import { Typography, Box, Grid, TextField, Button, InputLabel} from '@mui/material';
import axios from 'axios'
// import { useForm } from "react-hook-form";


import List from '../student/List';
import { warning } from '@remix-run/router';


const Home = () => {
    // state handle the data get from api
    const [student ,setStudent] = useState({
        Fname :'',
        LName :'',
        contact :'', 
        email :'',
        address :'',
        designation:''

    }
    );
    const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    const [status, setStatus] = useState();
  
    // getting data from textField

    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name] : e.target.value
        })
       
    }
    
    // function call when click on the submit button

    const onFormSubmit = async (e) => {
        e.preventDefault()
        validate(student)  
    }

    console.log(formErrors , 'formErrors')
    
    // Redirect to home page after submitting form
    if(status){
        return <Home/>
    }

    const validate = async (values) => {
        setFormErrors({})
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const re = /^[0-9\b]+$/;
        const regName = /^[A-Za-z]+[a-zA-Z]$/;

        //validate first name
        if (!values.Fname) {
          errors.Fname = "First name is required!";
        }else if (!regName.test(values.Fname)) {
            errors.Fname = "Input must not contain numbers!";
          }
        
           //validate last name
        if (!values.Lname) {
          errors.Lname = "Last name is required!";
        }else if (!regName.test(values.Lname)) {
            errors.Lname = "Input must not contain numbers!";
          }

           //validate contact
        if (!values.contact) {
          errors.contact = "Contact is required!";
          }else if (values.contact.length < 11) {
            errors.contact = "contact must be of 11 characters";
          } else if (values.contact.length > 11) {
            errors.contact = "contact cannot exceed more than 11 characters";
          }else if (!re.test(values.contact)) {
            errors.contact = "Input must be in number!";
          }

           //validate email
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }

         //validate address
        if (!values.address) {
          errors.address = "Address is required";
        } 
         //validate designation
        if (!values.designation) {
          errors.designation = "Designation is required";
        }

        if (Object.keys(errors).length === 0  ) {
            try{
                await axios.post(`http://localhost:3001/students`, student)
                setStatus(true); 
            }catch(error){
                console.log('somthing wrong')
                 }
        }
        else {
            setFormErrors(errors)
        }
        

        // if(errors.designation && errors.address && errors.email && errors.contact && errors.Lname && errors.Fname ){
        //     console.log(errors , 'error');
        // }

        
      };
    

  return (
    <Box>
         <Box sx={{textAlign:"center", backgroundColor:"primary.main"}}  p={2} mb={2}>
            <Typography variant="h3">Form</Typography>
        </Box>
        <Grid container justify="center" spacing={4}>

            <Grid item  xs={12}>
                <List /> 
            </Grid>

            {/* Add employees data */}
            <Grid item md={6} xs={12}>
            <Box sx={{textAlign:"center"}} p={2}  mb={2}>
                <Typography variant="h4">Add Employee</Typography>
            </Box>
            <form action='submit' >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <InputLabel>First Name</InputLabel>
                            <TextField sx={{textAlign:"center"}} autoComplete="Fname" 
                                name="Fname"
                                type='text'
                                variant="standard"
                                required={true}
                                fullWidth id="Fname"
                                onChange={e => onTextFieldChange(e)}
                            />
                            <Typography color='red' variant='p'>{formErrors?.Fname}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Last Name</InputLabel>
                            <TextField sx={{textAlign:"center"}} autoComplete="Lname"
                               name="Lname"
                               type='text'
                               variant="standard" 
                               required={true}
                               fullWidth 
                               id="Lname" 
                               onChange={e => onTextFieldChange(e)}
                            //    inputRef={register("Last name",{
                            //     required: "Last Name is required.",
                            //     })}
                               />
                                <Typography variant='p'color='red'>{formErrors?.Lname}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box> 
                             <InputLabel>Contact</InputLabel>
                            <TextField sx={{textAlign:"center"}} autoComplete="contact"
                                name="contact"
                                variant="standard"
                                required={true}
                                fullWidth
                                id="contact"
                                onChange={e => onTextFieldChange(e)}/>
                                 <Typography color='red' variant='p'>{formErrors?.contact}</Typography>
                        </Box>
                    </Grid>
                   
                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Email</InputLabel>
                            <TextField sx={{textAlign:"center"}}
                               autoComplete="email" name="email"
                               variant="standard" required fullWidth
                               id="email"
                               type='email'
                               onChange={e => onTextFieldChange(e)} />
                                <Typography color='red' variant='p'>{formErrors?.email}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Address</InputLabel>
                            <TextField sx={{textAlign:"center"}} 
                             autoComplete="address" name="address" 
                             variant="standard" required
                             type='text'
                             fullWidth id="address"  
                             onChange={e => onTextFieldChange(e)}/>
                              <Typography color='red' variant='p'>{formErrors?.address}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Designation</InputLabel>
                            <TextField sx={{textAlign:"center"}} 
                             autoComplete="designation" 
                             type='text'
                             name="designation" 
                             variant="standard" required fullWidth 
                             id="desigation" 
                             onChange={e => onTextFieldChange(e)}/>
                              <Typography color='red' variant='p'>{formErrors?.designation}</Typography>
                        </Box>
                    </Grid>

                </Grid>
                <Box m={3}>
                    <Button type="submit" onClick={(e)=>onFormSubmit(e)}  variant="contained" color="primary" fullWidth>Add</Button>
                </Box>
            </form>
            </Grid>
        </Grid> 
    </Box>
  )
}

export default Home