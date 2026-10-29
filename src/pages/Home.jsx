import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Stack,
  Grid,
  Divider,
} from "@mui/material";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { Link, useNavigate } from "react-router-dom";



function Home() {

    const navigate = useNavigate()
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
          <SchoolOutlinedIcon
            sx={{ fontSize: 32, mr: 1.5, color: "#2563eb" }}
          />

          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
            Course<span style={{ color: "#2563eb" }}>Manager</span>
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button component={Link} to={"/"} sx={{ color: "#2563eb", fontWeight: 700 }}>Home</Button>
            <Button component={Link} to={"/add-course"} sx={{ color: "#475569" }}>Add Course</Button>
            <Button component={Link} to={"/all-courses"} sx={{ color: "#475569" }}>All Courses</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: { xs: "auto", md: 540 },
            display: "flex",
            alignItems: "center",
            py: { xs: 7, md: 10 },
          }}
        >
          <Grid container spacing={6} sx={{alignItems:"center"}}>
            <Grid item ={{ xs:12, md:7}}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  bgcolor: "#dbeafe",
                  color: "#1d4ed8",
                  borderRadius: 10,
                  mb: 3,
                }}
              >
                <SchoolOutlinedIcon fontSize="small" />
                <Typography variant="body2" fontWeight={700}>
                  SIMPLE COURSE MANAGEMENT
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 38, md: 56 },
                  lineHeight: 1.15,
                  letterSpacing: -1.8,
                  fontWeight: 800,
                  color: "#172554",
                  mb: 3,
                }}
              >
                Every course.
                <br />
                <Box component="span" sx={{ color: "#2563eb" }}>
                  One place.
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  maxWidth: 510,
                  mb: 4,
                  fontSize: 17,
                }}
              >
                Create, organize, and manage your courses with a simple and
                efficient course management experience.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={()=>navigate("/add-course")}
                  sx={{
                    py: 1.5,
                    px: 3,
                    ml: 7,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "0 8px 20px #2563eb30",
                  }}
                >
                  Get Started
                </Button>
              </Stack>

              <Stack
                direction="row"
                spacing={3}
                sx={{ mt: 5, flexWrap: "wrap", rowGap: 2 }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <MenuBookOutlinedIcon sx={{ color: "#2563eb" }} />
                  <Typography variant="body2" color="#475569">
                    Easy organization
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <LayersOutlinedIcon sx={{ color: "#2563eb" }} />
                  <Typography variant="body2" color="#475569">
                    Simple management
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Paper
              elevation={0}
              sx={{
                minHeight: 400,
                p: { xs: 4, md: 5 },
                borderRadius: 5,
                bgcolor: "#eff6ff",
                border: "1px solid #dbeafe",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative background shapes */}
              <Box
                sx={{
                  position: "absolute",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  bgcolor: "#dbeafe",
                  top: -90,
                  right: -70,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  bgcolor: "#bfdbfe",
                  bottom: -70,
                  left: -50,
                }}
              />

              {/* Main illustration */}
              <Box
                sx={{
                  position: "relative",
                  width: 180,
                  height: 180,
                  borderRadius: 5,
                  bgcolor: "#ffffff",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 20px 45px #1e40af18",
                  mb: 4,
                  transform: "rotate(-4deg)",
                }}
              >
                <SchoolOutlinedIcon
                  sx={{
                    fontSize: 100,
                    color: "#2563eb",
                    transform: "rotate(4deg)",
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                fontWeight={800}
                color="#172554"
                sx={{ position: "relative", mb: 1.5 }}
              >
                Organize. Manage. Simplify.
              </Typography>

              <Typography
                color="#64748b"
                sx={{
                  position: "relative",
                  maxWidth: 320,
                  lineHeight: 1.8,
                }}
              >
                A simple and efficient way to keep all your course information
                organized in one place.
              </Typography>
            </Paper>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
