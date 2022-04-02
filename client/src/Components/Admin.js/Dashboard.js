import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Table,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import axios from "axios";
import Chatloading from "../../skeleton/Chatloading";
import GraphSkell from "../../skeleton/GraphSkell";
import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  cardHover: {
    cursor: "pointer",
    "&:hover": {
      background: "#d8e4ed",
    },
  },
});

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
const Dashboard = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [activeAuthor, setActiveAuthor] = useState([]);
  const [count, setCount] = useState({});

  const adminInfo = localStorage.getItem("adminInfo");

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };
  const activeUser = async () => {
    const data3 = await axios.get("/admin/activeAuthor", config);
    setActiveAuthor(data3.data.message);
  };
  const fetchData = async () => {
    const data1 = await axios.get("/admin/recentPost", config);
    const data2 = await axios.get("/admin/newUsers", config);
    const data4 = await axios.get("/admin/premiumCount", config);
    setRows(data1.data.post);
    setNewUsers(data2.data.message);
    setCount(data4.data);
    setLoading(false);
  };
  useEffect(() => {
    !adminInfo && navigate("/admin/login");
    adminInfo && activeUser();
  }, []);
  useEffect(() => {
    adminInfo && fetchData();
  }, [activeAuthor]);
  return (
    <Container sx={{ paddingBottom: "4%" }}>
      {Loading ? (
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12} align='center'>
            <GraphSkell />
          </Grid>
          <Grid item sm={6} md={12}>
            <Chatloading />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={6} md={6} lg={6}>
            premium user graph
          </Grid>
          <Grid item sm={6} md={6} lg={6} align='center'>
            <Card
              sx={{
                maxWidth: "50%",
                paddingTop: "10%",
                border: 1,
                borderColor: "primary",
                borderRadius: "5%",
              }}
              className={classes.cardHover}
            >
              <CardContent>
                <Typography
                  align='center'
                  variant='h4'
                  sx={{ paddingBottom: "6%", paddingTop: "1%" }}
                >
                  Most Active Author
                </Typography>
                {activeAuthor.length && (
                  <>
                    <Typography align='center'>
                      <b> Name:</b>
                      {activeAuthor[0].authorData[0].firstName}{" "}
                      {activeAuthor[0].authorData[0].lastName}
                    </Typography>
                    <Typography align='center'>
                      <b> Email:</b>
                      {activeAuthor[0].authorData[0].email}
                    </Typography>
                    <Typography align='center'>
                      <b> Mobile:</b>
                      {activeAuthor[0].authorData[0].phone}
                    </Typography>
                    <Typography align='center'>
                      <b>Total Post:</b>
                      {activeAuthor[0].count}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6} md={12}>
            <Typography align='center' variant='h5' sx={{ marginTop: "3%" }}>
              New Users
            </Typography>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align='center'>
                    <b>Name </b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b>Email</b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b> Premium User</b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b>Join Date</b>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {newUsers.map((newUser) => (
                  <StyledTableRow
                    key={newUser._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component='th' scope='row'>
                      {newUser.firstName} {newUser.lastName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {newUser.email}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {newUser.premiumUser ? "premium user" : "normal user"}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {moment(newUser.createdAt).format("ll")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item sm={6} md={12}>
            <Typography align='center' variant='h5' sx={{ marginTop: "3%" }}>
              Recent Post
            </Typography>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align='center'>
                    <b>Title of the Post</b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b>Author Name</b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b> Email ID</b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b>Place</b>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <b>Date</b>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component='th' scope='row'>
                      {row.postTitle}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.authorId.firstName} {row.authorId.lastName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.authorId.email}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.place}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {moment(row.createdAt).format("ll")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
