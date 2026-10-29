
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Box,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Divider,
} from "@mui/material";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Link } from "react-router-dom";
import {
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../services/AllAPI";
import { toast } from "react-toastify";

const AllCourses = () => {
  const [courseDatas, setCourseDatas] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch all courses
  useEffect(() => {
    getCourseDatas();
  }, []);

  const getCourseDatas = async () => {
    try {
      const apiResponse = await getAllCourse();

      if (apiResponse?.status === 200) {
        setCourseDatas(
          Array.isArray(apiResponse.data) ? apiResponse.data : []
        );
      } else {
        toast.error("Failed to get course data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to get course data");
    }
  };

  // Delete a course
  const onDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      const apiResponse = await deleteCourse(id);

      if (
        apiResponse?.status === 200 ||
        apiResponse?.status === 204
      ) {
        setCourseDatas((previous) =>
          previous.filter(
            (course) => String(course.id) !== String(id)
          )
        );

        toast.success("Course deleted successfully");
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting");
    }
  };

  // Open the edit modal with the selected course details
  const onEditClick = (courseData) => {
    setSelectedCourse({
      ...courseData,
      courseName: courseData.courseName ?? "",
      description: courseData.description ?? "",
      category: courseData.category ?? "",
      instructor: courseData.instructor ?? "",
      duration: courseData.duration ?? "",
      level: courseData.level ?? "",
    });

    setEditOpen(true);
  };

  // Close the modal
  const onCloseModal = () => {
    setEditOpen(false);
    setSelectedCourse(null);
  };

  // Update a field in the selected course
  const onFieldChange = (field, value) => {
    setSelectedCourse((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Save the updated course
  const onUpdateCourse = async () => {
    if (!selectedCourse) return;

    if (
      !selectedCourse.courseName.trim() ||
      !selectedCourse.category ||
      !selectedCourse.instructor.trim() ||
      selectedCourse.duration === "" ||
      Number(selectedCourse.duration) <= 0 ||
      !selectedCourse.level
    ) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      const updatedData = {
        ...selectedCourse,
        duration: Number(selectedCourse.duration),
      };

      const apiResponse = await updateCourse(
        selectedCourse.id,
        updatedData
      );

      if (
        apiResponse?.status === 200 ||
        apiResponse?.status === 204
      ) {
        setCourseDatas((previous) =>
          previous.map((course) =>
            String(course.id) === String(selectedCourse.id)
              ? { ...course, ...updatedData }
              : course
          )
        );

        toast.success("Course updated successfully");
        onCloseModal();
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating");
    }
  };

  // Search by course name, category, or instructor
  const filteredCourses = courseDatas.filter((course) => {
    const search = searchVal.toLowerCase().trim();

    return (
      (course.courseName ?? "").toLowerCase().includes(search) ||
      (course.category ?? "").toLowerCase().includes(search) ||
      (course.instructor ?? "").toLowerCase().includes(search)
    );
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Navigation bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#172554",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            py: 1,
          }}
        >
          <SchoolOutlinedIcon
            sx={{ fontSize: 32, mr: 1.5, color: "#2563eb" }}
          />

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ flexGrow: 1 }}
          >
            Course<span style={{ color: "#2563eb" }}>Manager</span>
          </Typography>

          <Button component={Link} to="/" sx={{ color: "#475569" }}>
            Home
          </Button>

          <Button
            component={Link}
            to="/add-course"
            sx={{ color: "#475569" }}
          >
            Add Course
          </Button>

          <Button
            component={Link}
            to="/all-courses"
            sx={{ color: "#2563eb", fontWeight: 700 }}
          >
            All Courses
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Page heading */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            mb: 4,
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              color="#172554"
              sx={{ letterSpacing: -0.7 }}
            >
              All Courses
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              View and manage all your course records.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/add-course"
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.3,
              textTransform: "none",
              fontWeight: 700,
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
          >
            Add New Course
          </Button>
        </Stack>

        {/* Total courses */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2.5,
            mb: 3,
            border: "1px solid #e2e8f0",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              display: "grid",
              placeItems: "center",
              bgcolor: "#dbeafe",
              color: "#2563eb",
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            <MenuBookOutlinedIcon />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Courses
            </Typography>

            <Typography variant="h5" fontWeight={800} color="#172554">
              {courseDatas.length.toString().padStart(2, "0")}
            </Typography>
          </Box>
        </Paper>

        {/* Courses table */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e2e8f0",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 2.5 }}>
            <TextField
              placeholder="Search by course name, category or instructor..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                maxWidth: 480,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#ffffff",
                },
              }}
            />
          </Box>

          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 850 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  {[
                    "ID",
                    "COURSE",
                    "CATEGORY",
                    "INSTRUCTOR",
                    "DURATION",
                    "LEVEL",
                    "ACTIONS",
                  ].map((heading) => (
                    <TableCell
                      key={heading}
                      align="center"
                      sx={{
                        fontWeight: 700,
                        color: "#475569",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((courseData) => (
                    <TableRow
                      key={courseData.id}
                      hover
                      sx={{
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      {/* ID */}
                      <TableCell align="center">
                        {courseData.id}
                      </TableCell>

                      {/* Course name */}
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              display: "grid",
                              placeItems: "center",
                              bgcolor: "#eff6ff",
                              color: "#2563eb",
                              flexShrink: 0,
                            }}
                          >
                            <MenuBookOutlinedIcon fontSize="small" />
                          </Box>

                          <Typography
                            fontWeight={700}
                            color="#1e293b"
                          >
                            {courseData.courseName || "—"}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* Category */}
                      <TableCell align="center">
                        {courseData.category || "—"}
                      </TableCell>

                      {/* Instructor */}
                      <TableCell align="center">
                        {courseData.instructor || "—"}
                      </TableCell>

                      {/* Duration */}
                      <TableCell align="center">
                        {courseData.duration
                          ? `${courseData.duration} hours`
                          : "—"}
                      </TableCell>

                      {/* Difficulty level */}
                      <TableCell align="center">
                        {courseData.level ? (
                          <Chip
                            label={courseData.level}
                            size="small"
                            sx={{
                              bgcolor: "#eff6ff",
                              color: "#1d4ed8",
                              fontWeight: 600,
                              borderRadius: 1.5,
                            }}
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>

                      {/* Edit and delete */}
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={0.5}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => onEditClick(courseData)}
                            size="small"
                            aria-label="Edit course"
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            onClick={() => onDeleteClick(courseData.id)}
                            color="error"
                            size="small"
                            aria-label="Delete course"
                          >
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      sx={{ py: 5, color: "text.secondary" }}
                    >
                      {searchVal
                        ? "No courses match your search."
                        : "No courses available. Add your first course!"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider />
        </Paper>
      </Container>

      {/* Functional Edit Course Modal */}
      <Dialog
        open={editOpen}
        onClose={onCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="#172554"
            >
              Edit Course
            </Typography>

            <IconButton
              aria-label="Close dialog"
              onClick={onCloseModal}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Update the course information below.
          </Typography>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Course Name"
              fullWidth
              required
              value={selectedCourse?.courseName ?? ""}
              onChange={(e) =>
                onFieldChange("courseName", e.target.value)
              }
            />

            <TextField
              label="Category"
              select
              fullWidth
              required
              value={selectedCourse?.category ?? ""}
              onChange={(e) =>
                onFieldChange("category", e.target.value)
              }
            >
              <MenuItem value="Web Development">
                Web Development
              </MenuItem>
              <MenuItem value="Programming">Programming</MenuItem>
              <MenuItem value="AI">Artificial Intelligence</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Database">Database</MenuItem>
            </TextField>

            <TextField
              label="Instructor Name"
              fullWidth
              required
              value={selectedCourse?.instructor ?? ""}
              onChange={(e) =>
                onFieldChange("instructor", e.target.value)
              }
            />

            <TextField
              label="Duration (hours)"
              type="number"
              fullWidth
              required
              slotProps={{
                htmlInput: { min: 1 },
              }}
              value={selectedCourse?.duration ?? ""}
              onChange={(e) =>
                onFieldChange("duration", e.target.value)
              }
            />

            <TextField
              label="Difficulty Level"
              select
              fullWidth
              required
              value={selectedCourse?.level ?? ""}
              onChange={(e) =>
                onFieldChange("level", e.target.value)
              }
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>

            
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button color="inherit" onClick={onCloseModal}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={onUpdateCourse}
            disabled={!selectedCourse}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllCourses;
