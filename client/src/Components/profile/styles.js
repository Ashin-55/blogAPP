import { makeStyles } from "@material-ui/styles";
export const useStyle = makeStyles(() => ({
  profile: {
    borderRadius: "70%",
    height: "25vh",
  },
  proImageContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  mainRoot: {
    marginTop: 20,
    marginBottom: "10%",
    padding: "1% 10% 10% 10%",
    boxShadow: "-9px 14px 47px -2px rgba(84,80,84,0.77)",
    borderRadius: 20,
    border: 4,
  },
  logo: {
    display: "flex",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
  },
  logoSubText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 39,
    display: "flex",
    justifyContent: "center",
  },
}));
