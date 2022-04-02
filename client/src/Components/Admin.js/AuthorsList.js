import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import axios from "axios";
import { Container,Button } from "@mui/material";
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
export default function PreUsers() {
  const navigate = useNavigate();
  const adminInfo = localStorage.getItem("adminInfo");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  const fetchAllUser = async () => {
    const { data } = await axios.get("/admin/allAuthors", config);
    setData(data);
    setLoading(false);
  };

  const viewButtonHandler = (id)=>{
    navigate(`/admin/authorPost/${id}`)
  }
  React.useEffect(() => {
    console.log(adminInfo)
    // !adminInfo && navigate("/admin/login");
    adminInfo && fetchAllUser();
  }, []);
  rows = data;
  return loading ? (
    <Container>
      <Chatloading />
    </Container>
  ) : (
    <Container style={{ minHeight: "35vw" }}>
      <h1>All Author </h1>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b> Name of Authorr</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Email id</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Phone</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Total Post</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Action</b>
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
                {row.authorData[0].firstName} {row.authorData[0].lastName}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.authorData[0].email}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.authorData[0].phone}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.count}</StyledTableCell>
              <StyledTableCell align='center'><Button onClick={()=>{viewButtonHandler(row.authorData[0]._id)}}>View</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
