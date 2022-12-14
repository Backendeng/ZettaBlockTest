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
  saveData,
  getDatabySort
} from '../redux/slices/zetta_reducer';
// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function PageSix() {
  const dispatch = useDispatch();
  const {
    allData,
    dataByID,
    isLoading,
    paginationData,
    sortstatus
  } = useSelector((state) => state.zetta);

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [nameCreate, setNameCreate] = useState('');
  const [descriptionCreate, setDescriptionCreate] = useState('');
  const [typeCreate, setTypeCreate] = useState('');
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('');
  const [perPage, setPerPage] = useState(5);
  const count = Math.ceil(allData.length / perPage);
  const _DATA = usePagination(allData, perPage, '', sort, order);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleClickOpen = (id) => {
    dispatch(getDatabyID(id));
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCreate(false);
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

  /// Create
  const handleCreateNameChange = (event) => {
    setNameCreate(event.target.value);
  };

  const handleCreateTypeChange = (event) => {
    setTypeCreate(event.target.value);
  };

  const handleCreateDescriptionChange = (event) => {
    setDescriptionCreate(event.target.value);
  };

  const handleDelete = () => {
    dispatch(deleteDatabyID(dataByID.id));
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(
      saveData(
        nameCreate,
        typeCreate,
        descriptionCreate,
        _DATA.selectPage,
        _DATA.limitPage
      )
    );
    setOpen(false);
    setOpenCreate(false);
  };

  const handleSort = (sort1) => {
    setSort(sort1);
    dispatch(getDatabySort(sort1, order, _DATA.selectPage, _DATA.limitPage));
  };

  useEffect(() => {
    if (order === 'asc') setOrder('desc');
    else setOrder('asc');
  }, [sortstatus]);

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
    <Page title="Step Six | ZettaBlock">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h3" component="h1" paragraph>
            Step Six
          </Typography>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Create Table" />
            <CardContent>
              <Scrollbar>
                <MButton
                  variant="outlined"
                  color="success"
                  onClick={handleCreateOpen}
                >
                  Create Row
                </MButton>
                <TableContainer sx={{ minWidth: 800, mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={() => handleSort('name')}>
                          name
                        </TableCell>
                        <TableCell
                          onClick={() => handleSort('type')}
                          align="center"
                        >
                          type
                        </TableCell>
                        <TableCell
                          onClick={() => handleSort('description')}
                          align="center"
                        >
                          description
                        </TableCell>
                        <TableCell
                          onClick={() => handleSort('createdAt')}
                          align="center"
                        >
                          createdAt
                        </TableCell>
                        <TableCell
                          onClick={() => handleSort('updatedAt')}
                          align="center"
                        >
                          updatedAt
                        </TableCell>
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
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openCreate} onClose={handleClose}>
            <DialogTitle>{dataByID.name} Create Row</DialogTitle>
            <DialogContent>
              <DialogContentText color="error">
                Save API is not working
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Please enter name"
                name="name"
                value={nameCreate}
                onChange={handleCreateNameChange}
              />
              <TextField
                autoFocus
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Please enter type"
                name="type"
                value={typeCreate}
                onChange={handleCreateTypeChange}
              />
              <TextField
                autoFocus
                rows={4}
                fullWidth
                multiline
                margin="dense"
                label="Please enter description"
                variant="outlined"
                name="description"
                value={descriptionCreate}
                onChange={handleCreateDescriptionChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </Page>
  );
}

const options = [5, 10, 15, 20];
