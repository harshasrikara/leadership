import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import axios from "axios";

export default function AddOfficerRoleCard({ officerArray, roleList }) {
  const router = useRouter();
  // contains the list of all names only that is used to populate the search bar auto-fill
  const [officerNames, setOfficerNames] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // api status
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const AddRole = async () => {
    setLoading(true);
    const result = await axios.post(router.basePath + "/api/admin/addOfficerRole", {
      name: name,
      role: role,
    });

    setLoading(false);
    if (result.data.message === "success") {
      setSuccess(true);
    }
  };

  // Sorts the array in ascending order by first name
  useEffect(() => {
    setOfficerNames(officerArray.map(({ id, name }, index) => name));
  }, []);

  return (
    <Grid item md={12} lg={6} align="center">
      <Card raised style={{ width: 300, minWidth: 600, margin: 8 }}>
        <CardContent>
          <Typography variant="h3" component="div">
            Add Role to Officer
          </Typography>

          <Autocomplete
            disablePortal
            style={{ marginLeft: 90, marginRight: 90, marginTop: 24 }}
            id="combo-box"
            options={officerNames}
            renderInput={(params) => <TextField {...params} label="Search" />}
            onInputChange={(event, newValue) => {
              setName(newValue);
            }}
          />
          <Autocomplete
            disablePortal
            style={{ marginLeft: 90, marginRight: 90, marginTop: 24 }}
            id="combo-box"
            options={roleList}
            renderInput={(params) => <TextField {...params} label="Role" />}
            onInputChange={(event, newValue) => {
              setRole(newValue);
            }}
          />
          
        </CardContent>

        <CardActions>
          <Button color="inherit" size="small" onClick={() => AddRole()}>
            Submit
          </Button>
          { loading ? <LoopIcon /> : <div></div> }
          { success ? <CheckIcon /> : <div></div> }
        </CardActions>
      </Card>
    </Grid>
  );
}
