import React, {useState} from 'react'
import { Typography, Box, Grid, TextField, Button} from '@mui/material';
// import { deepPurple, green } from '@mui/material/colors';
import axios from 'axios'

import List from '../student/List';


const Home = () => {

    const [student ,setStudent] = useState({
        stuname :'',  
        email :''
    }
    );
    const [status, setStatus] = useState();

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
            await axios.post(`http://localhost:3001/students`, student)
            setStatus(true); 
        }catch(error){
            console.log('somthing wrong')
        }
    }

    if(status){
        return <Home/>
    }

  return (
    <Box>
         <Box textAlign="center" sx={{backgroundColor:"primary.main"}} p={2} mb={2}>
            <Typography variant="h3">Form</Typography>
        </Box>
        <Grid container justify="center" spacing={4}>

            <Grid item md={12} xs={12}>
                <List />
            </Grid>

            {/* Add employees data */}
            <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2}  mb={2}>
                <Typography variant="h4">Add Employee</Typography>
            </Box>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField textAlign="center" autoComplete="Fname" name="Fname" variant="outlined" required fullWidth id="Fname" label="FName" onChange={e => onTextFieldChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField textAlign="center" autoComplete="Lname" name="stuname" variant="outlined" required fullWidth id="Lname" label="LName" onChange={e => onTextFieldChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField textAlign="center" autoComplete="contact" name="contact" variant="outlined" required fullWidth id="contact" label="Contact" onChange={e => onTextFieldChange(e)}
                        />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField textAlign="center" autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email"  onChange={e => onTextFieldChange(e)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField textAlign="center" autoComplete="address" name="address" variant="outlined" required fullWidth id="address" label="Address" onChange={e => onTextFieldChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField textAlign="center" autoComplete="designation" name="designation" variant="outlined" required fullWidth id="desigation" label="Designation" onChange={e => onTextFieldChange(e)}
                        />
                    </Grid>

                </Grid>
                <Box m={3}>
                    <Button type="submit" onClick={e => onFormSubmit(e)} variant="contained" color="primary" fullWidth>Add</Button>
                </Box>
            </form>
            </Grid>
        </Grid> 
    </Box>
  )
}

export default Home