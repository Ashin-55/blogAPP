import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import axios from "axios";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chatloading from "../../skeleton/Chatloading";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

let rows;
export default function AllusersList() {
  const navigate = useNavigate()
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const adminInfo = localStorage.getItem("adminInfo");
  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };
  const fetchAllUser = async () => {
    const { data } = await axios.get("/admin/allUser",config);
    setData(data);
    setLoading(false);
  };
  React.useEffect(() => {
    !adminInfo && navigate("/admin/login")
    adminInfo && fetchAllUser();
  }, []);
  
  rows = data;
  return loading ? (
    <Container>
      <Chatloading />
    </Container>
  ) : (
    <Container style={{ minHeight: "35vw" }}>
      <h1>All users</h1>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b> Name of user</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Email id</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Phone</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Premium User</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Join Date</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component='th' scope='row'>
                {row.firstName} {row.laststName}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.email}</StyledTableCell>
              <StyledTableCell align='center'>{row.phone}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.premiumUser ? "Enable" : "NotEnable"}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {moment(row.createdAt).format("ll")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
