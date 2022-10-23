import { PermPhoneMsg } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getPaginationData,
  getPaginationDataBySearch
} from '../redux/slices/zetta_reducer';

function usePagination(allData, PER_PAGE, search) {
  const dispatch = useDispatch();
  const [selectPage, setSelectPage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(allData.length / PER_PAGE);

  function currentData() {
    const begin = (currentPage - 1) * PER_PAGE;
    const end = begin + PER_PAGE;
    console.log('sdf');
    return dispatch(getPaginationData(begin, end));
    // return allData.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    let limit = PER_PAGE;
    if (page < maxPage) {
      limit = PER_PAGE;
    } else {
      limit = allData.length - (page - 1) * PER_PAGE;
    }
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    setLimitPage(PER_PAGE);
    setSelectPage(page);

    if (search === '') return dispatch(getPaginationData(page, limit));
    return dispatch(getPaginationDataBySearch(page, limit, search));
  }

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    maxPage,
    selectPage,
    limitPage
  };
}

export default usePagination;
