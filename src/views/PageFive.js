// material
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Pagination
} from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { LoadingButton } from '@material-ui/lab';
// components
import { MButton } from '../components/@material-extend';
import Block from '../components/Block';
import LoadingScreen from '../components/LoadingScreen';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import usePagination from '../components/Pagination';
import ControllableStates from '../components/ControllableStates';

import {
  getAllDatas,
  getDatabyID,
  deleteDatabyID,
  getPaginationData,
  getDatabySort
} from '../redux/slices/zetta_reducer';
// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function PageFive() {
  const dispatch = useDispatch();
  const { allData, dataByID, isLoading, paginationData } = useSelector(
    (state) => state.zetta
  );

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('asc');
  const [perPage, setPerPage] = useState(5);
  const count = Math.ceil(allData.length / perPage);
  const _DATA = usePagination(allData, perPage);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleClickOpen = (id) => {
    dispatch(getDatabyID(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDelete = () => {
    dispatch(deleteDatabyID(dataByID.id));
    setOpen(false);
  };

  const handleSort = (sort) => {
    console.log(_DATA.selectPage);
    console.log(_DATA.limitPage);
    dispatch(getDatabySort(sort, order, _DATA.selectPage, _DATA.limitPage));
    if (order === 'asc') setOrder('desc');
    else setOrder('asc');
  };

  useEffect(() => {
    dispatch(getAllDatas());
    dispatch(getPaginationData(1, perPage));
  }, []);

  useEffect(() => {
    setName(dataByID.name);
    setType(dataByID.type);
    setDescription(dataByID.description);
  }, [dataByID]);

  return (
    <Page title="Step Five | ZettaBlock">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h3" component="h1" paragraph>
            Step Five
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardHeader title="Sort and Order" />
            <CardContent>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800, mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={handleSort}>name</TableCell>
                        <TableCell align="center">type</TableCell>
                        <TableCell align="center">description</TableCell>
                        <TableCell align="center">createdAt</TableCell>
                        <TableCell align="center">updatedAt</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginationData.map((row) => (
                        <TableRow
                          key={row.name}
                          onClick={() => handleClickOpen(row.id)}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">
                            {row.description}
                          </TableCell>
                          <TableCell align="center">{row.createdAt}</TableCell>
                          <TableCell align="center">{row.updatedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </CardContent>
          </Card>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dataByID.name} Info</DialogTitle>
            <DialogContent>
              <DialogContentText>No update api was provided.</DialogContentText>
              <TextField
                autoFocus
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label=""
                name="name"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                autoFocus
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label=""
                name="type"
                value={type}
                onChange={handleTypeChange}
              />
              <TextField
                autoFocus
                rows={4}
                fullWidth
                multiline
                margin="dense"
                label=""
                variant="outlined"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
              <Button onClick={handleClose} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Block title="Base">
                <Button variant="outlined" color="inherit">
                  Default
                </Button>
                <Button variant="outlined">Primary</Button>
                <Button variant="outlined" disabled>
                  Disabled
                </Button>
                <Button variant="outlined">Link</Button>
              </Block>
            </Grid>

            <Grid item xs={12} md={6}>
              <Block title="Adding Colors">
                <MButton variant="outlined" color="inherit">
                  Default
                </MButton>
                <MButton variant="outlined">Primary</MButton>
                <MButton variant="outlined" color="info">
                  Info
                </MButton>
                <MButton variant="outlined" color="success">
                  Success
                </MButton>
                <MButton variant="outlined" color="warning">
                  Warning
                </MButton>
                <MButton variant="outlined" color="error">
                  Error
                </MButton>
              </Block>
            </Grid>

            <Grid item xs={12} md={6}>
              <Block title="With Icon & Loading">
                <MButton
                  variant="outlined"
                  color="error"
                  startIcon={<AlarmIcon />}
                >
                  Icon Left
                </MButton>
                <MButton
                  variant="outlined"
                  color="error"
                  endIcon={<AlarmIcon />}
                >
                  Icon Right
                </MButton>
                <LoadingButton
                  pending
                  variant="outlined"
                  pendingPosition="start"
                  startIcon={<AlarmIcon />}
                >
                  Save
                </LoadingButton>
                <LoadingButton
                  pending
                  variant="outlined"
                  pendingPosition="end"
                  endIcon={<AlarmIcon />}
                >
                  Save
                </LoadingButton>
              </Block>
            </Grid>

            <Grid item xs={12} md={6}>
              <Block title="Size">
                <MButton variant="outlined" color="info" size="small">
                  Small
                </MButton>
                <MButton variant="outlined" color="info">
                  Medium
                </MButton>
                <MButton variant="outlined" color="info" size="large">
                  Large
                </MButton>
              </Block>
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}

const options = [5, 10, 15, 20];
