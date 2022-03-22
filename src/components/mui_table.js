import * as React from "react";
// import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSalatByDate } from "../api/graph";

const waqts = ["Fajr", "Juhr", "Asr", "Magrib", "Isha"];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

let rows = [];

export default function CustomPaginationActionsTable() {
  const { salatByDate, dates } = useSalatByDate();
  rows = useSalatByDate;
  let missed = {};
  let completed_waqts = {};
  let total_completed_days = {};
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
        style={{ border: "1px solid rgb(186 187 187)" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={2}
              rowSpan={2}
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                borderRight: "1px solid rgb(186 187 187)",
                textAlign: "center",
              }}
            >
              الحمد لله
            </StyledTableCell>
            <StyledTableCell
              colSpan={salatByDate?.user_code_list?.length + 2}
              align="center"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Completed Days
            </StyledTableCell>
          </TableRow>

          <TableRow>
            {salatByDate?.user_code_list?.map((code) => {
              return (
                <StyledTableCell
                  align="center"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {code}
                </StyledTableCell>
              );
            })}
          </TableRow>

          <TableRow>
            <StyledTableCell
              rowSpan={2}
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                textAlign: "center",
                borderRight: "1px solid rgb(186 187 187)",
              }}
            >
              Date
            </StyledTableCell>
            <StyledTableCell
              rowSpan={2}
              className="align-center"
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                borderRight: "1px solid rgb(186 187 187)",
              }}
            >
              Waqt
            </StyledTableCell>
            <StyledTableCell
              align="center"
              colSpan={salatByDate?.user_code_list?.length}
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Code Number
            </StyledTableCell>
          </TableRow>
          <TableRow>
            {salatByDate?.user_code_list?.map((code) => {
              return <StyledTableCell>{code}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody style={{ borderBottom: "3px solid" }}>
          {dates?.length &&
            dates.map((date) => {
              const data_by_date = salatByDate?.salat_data[date];
              // console.log(data);
              // console.log(missed);
              // console.log(completed_days);
              console.log(completed_waqts, "------------");

              return (
                <TableRow>
                  <StyledTableCell
                    className="border border-gray-900 "
                    align="center"
                    style={{ borderBottom: "3px solid", fontWeight: "bold" }}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    <br></br>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ width: "20px", padding: "0", fontWeight: "bold" }}
                  >
                    {waqts.map((waqt) => {
                      return (
                        <div
                          className={`h-10 border border-gray-900 p-2 text-center`}
                        >
                          {waqt}
                        </div>
                      );
                    })}
                  </StyledTableCell>

                  {salatByDate?.user_code_list.map((code) => {
                    const user_data = data_by_date.find(
                      (data) => data.user_code === code
                    );

                    return (
                      <StyledTableCell
                        className=""
                        style={{ width: "20px", padding: "0" }}
                      >
                        {user_data ? (
                          <div>
                            {waqts.map((waqt, index) => {
                              // console.log(
                              //   user_data.performed_salat_list[index],
                              //   "--------",
                              //   waqt,
                              //   user_data.user_code,
                              //   index
                              // );
                              // console.log(missed);
                              // console.log(completed_days);
                              if (!user_data.performed_salat_list[index]) {
                                missed[code] = true;
                                completed_waqts[code] = 0;
                                // console.log(
                                //   "!user_data.performed_salat_list[index]",
                                //   !user_data.performed_salat_list[index],
                                //   waqt,
                                //   missed
                                //   // salatByDate.salat_data
                                // );
                              } else {
                                console.log(user_data.date);
                                if (!completed_waqts[code] > 0) {
                                  completed_waqts[code] = 1;
                                  // console.log("in if...", completed_waqts);
                                } else {
                                  completed_waqts[code] += 1;
                                  // console.log("in else...", completed_waqts);
                                }
                              }
                              // completed_waqts[code];
                              return (
                                <div
                                  className={` h-10 border border-gray-900 ${
                                    user_data.performed_salat_list[index]
                                      ? !missed[code] &&
                                        new Date(
                                          user_data.date
                                        ).toDateString() <=
                                          new Date().toDateString()
                                        ? "bg-green-500"
                                        : "bg-green-200"
                                      : "bg-white-500"
                                  }`}
                                ></div>
                              );
                            })}
                          </div>
                        ) : (
                          <div>
                            {waqts.map((waqt, index) => {
                              missed[code] = true;
                              completed_waqts[code] = 0;
                              return (
                                <div className="bg-white-100 h-10 border border-gray-900"></div>
                              );
                            })}
                          </div>
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}

          {/* {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.calories}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.fat}
              </TableCell>
            </TableRow>
          ))} */}

          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
