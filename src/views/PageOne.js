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
  TableContainer
} from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { LoadingButton } from '@material-ui/lab';
// components
import { MButton } from '../components/@material-extend';
import Block from '../components/Block';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { getAllDatas } from '../redux/slices/zetta_reducer';
// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const BASIC_TABLE = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function PageOne() {
  const dispatch = useDispatch();
  const { allData } = useSelector((state) => state.zetta);

  useEffect(() => {
    dispatch(getAllDatas());
  }, []);

  return (
    <Page title="Step One | ZettaBlock">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
          Step One
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Show All Data" />
          <CardContent>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, mt: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>name</TableCell>
                      <TableCell align="center">type</TableCell>
                      <TableCell align="center">description</TableCell>
                      <TableCell align="center">createdAt</TableCell>
                      <TableCell align="center">updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
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
      </Container>
    </Page>
  );
}
