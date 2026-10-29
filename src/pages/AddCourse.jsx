
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  MenuItem,
  Stack,
  Box,
  Breadcrumbs,
  Divider,
  duration,
} from "@mui/material";
import { useState } from "react";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCourse } from "../services/AllAPI";


const AddCourse=()=> {
    const navigate = useNavigate()
    const[courseData,setCourseData]=useState({
        courseName:"",
        timing:"",
        category:"",
        instructor:"",
        duration:"",
        level:""
    })

    const onFinishButtonClick = async()=>{
        try {
            if(
                courseData.courseName==""||
                courseData.timing==""||
                courseData.category==""||
                courseData.instructor==""||
                courseData.duration==""||
                courseData.level==""

            ) {
                toast.error("Please fill the form")
            }else{
                let apiResponse = await addCourse(courseData)
                console.log(apiResponse)
                if(apiResponse.status==201){
                    toast.success("Successfully added course")
                    navigate("/all-courses")
                }else{
                    toast.error("Something went wrong while adding ")
                }
            }
        } catch (error) {
           console.log(error) 
           toast.error("Something went wrong while adding")
        }
    }




  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#172554",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", py: 1 }}>
          <SchoolOutlinedIcon sx={{ fontSize: 32, mr: 1.5, color: "#2563eb" }} />

          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
            Course<span style={{ color: "#2563eb" }}>Manager</span>
          </Typography>

          <Button component={Link} to={"/"} sx={{ color: "#475569" }}>Home</Button>
          <Button component={Link} to={"/add-course"} sx={{ color: "#2563eb", fontWeight: 700 }}>
            Add Course
          </Button>
          <Button component={Link} to={"/all-courses"} sx={{ color: "#475569" }}>All Courses</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={Link} to={"/"} underline="hover" color="inherit">
            Home
          </Link>
          <Typography color="primary.main" fontWeight={600}>
            Add Course
          </Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            color="#172554"
            sx={{ letterSpacing: -0.7 }}
          >
            Create a new course
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Fill in the course information to add it to your library.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e2e8f0",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 2.5, md: 4 } }}>
            <Stack direction="row" spacing={2} sx={{ mb: 3 , alignItems:"center" }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#dbeafe",
                  color: "#2563eb",
                  borderRadius: 2,
                }}
              >
                <AddCircleIcon fontSize="large" />
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={750} color="#172554">
                  Course Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Basic details about your course
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              <TextField
                label="Course Name"
                id="coursename"
                placeholder="e.g. Full Stack Web Development"
                value={courseData.courseName}
                onChange={(e)=>setCourseData({...courseData,courseName:e.target.value})}
                fullWidth
                required
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Timing"
                  select
                  defaultValue=""
                  value={courseData.timing}
                  onChange={(e)=>setCourseData({...courseData,timing:e.target.value})}
                  fullWidth
                   required
                >
                  <MenuItem value="9 A.M - 11 A.M">9 A.M - 11 A.M</MenuItem>
                  <MenuItem value="11 A.M - 1 P.M">11 A.M - 1 P.M</MenuItem>
                  <MenuItem value="2 P.M - 4 P.M">
                    2 P.M - 4 P.M
                  </MenuItem>
                </TextField>
                </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Category"
                  select
                  defaultValue=""
                  value={courseData.category}
                  onChange={(e)=>setCourseData({...courseData,category:e.target.value})}
                  fullWidth
                   required
                >
                  <MenuItem value="Web Development">Web Development</MenuItem>
                  <MenuItem value="Programming">Programming</MenuItem>
                  <MenuItem value="Artificial Intelligence">
                    Artificial Intelligence
                  </MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Database">Database</MenuItem>
                </TextField>

                <TextField
                  label="Instructor Name"
                  placeholder="Enter instructor name"
                  value={courseData.instructor}
                  onChange={(e)=>setCourseData({...courseData,instructor:e.target.value})}
                  fullWidth
               required
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Duration (hours)"
                  type="number"
                  placeholder="e.g. 20"
                  value={courseData.duration}
                  onChange={(e)=>setCourseData({...courseData,duration:e.target.value})}
                  fullWidth
                   required
                />

                <TextField
                  label="Difficulty Level"
                  select
                  defaultValue=""
                  value={courseData.level}
                  onChange={(e)=>setCourseData({...courseData,level:e.target.value})}
                  fullWidth
                   required
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
           
            
            spacing={2}
            sx={{ p: 3, bgcolor: "#fbfdff" , justifyContent:"space-between",alignItems:{ xs:"stretch", sm: "center"} }}
          >
            <Button
              variant="text"
              color="inherit"
              startIcon={<ArrowBackRoundedIcon />}
            >
              Cancel
            </Button>

            <Button onClick={onFinishButtonClick}
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Save Course
            </Button>
          </Stack>
        </Paper>

        <Typography
          variant="body2"
          color="text.secondary"
          
          sx={{ mt: 3,textAlign:"center" }}
        >
          Fields marked with * are required.
        </Typography>
      </Container>
    </Box>
  );
}

export default AddCourse;
