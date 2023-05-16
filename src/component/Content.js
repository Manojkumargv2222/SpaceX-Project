import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Content({ value }) {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getData = () => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then(async (response) => {
        const jsonData = await response.json();
        if (value === "All Launches") {
          setUser(jsonData);
        } else if (value === "UpComming Launches") {
          const result = jsonData.filter((ele) => ele.upcoming === true);
          setUser(result);
        } else if (value === "Success Launches") {
          const result = jsonData.filter((ele) => ele.launch_success === true);
          setUser(result);
        } else if (value === "failed Launches") {
          const result = jsonData.filter(
            (ele) => ele.launch_success === false && ele.upcoming === false
          );
          setUser(result);
        }
        setOpen(false);
        console.log("jsonData", jsonData);
      })
      .catch(() => {
        console.log("No Data Found");
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box mt="10px">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>No:</StyledTableCell>
              <StyledTableCell>Launched (UTC)</StyledTableCell>
              <StyledTableCell>Mission</StyledTableCell>
              <StyledTableCell>Orbit</StyledTableCell>
              <StyledTableCell>Launch Status</StyledTableCell>
              <StyledTableCell>Rocket</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {user
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.flight_number}
                  </StyledTableCell>
                  <StyledTableCell>
                    {new Date(row.launch_date_utc).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </StyledTableCell>
                  <StyledTableCell>{row.launch_site.site_name}</StyledTableCell>
                  <StyledTableCell>
                    {row.rocket.second_stage.payloads[0].orbit}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.launch_success ? (
                      <Button
                        color="success"
                        size="small"
                        sx={{ fontSize: "10px" }}
                        variant="contained"
                      >
                        Success
                      </Button>
                    ) : row.upcoming ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        sx={{ fontSize: "10px" }}
                      >
                        UpComming
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ fontSize: "10px" }}
                      >
                        Failed
                      </Button>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{row.rocket.rocket_name}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default Content;
