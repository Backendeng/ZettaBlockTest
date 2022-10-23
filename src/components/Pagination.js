import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPaginationData } from '../redux/slices/zetta_reducer';

function usePagination(allData, PER_PAGE) {
  const dispatch = useDispatch();
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
      limit = allData.length - page * (PER_PAGE - 1);
    }
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    console.log(page);
    console.log(PER_PAGE);
    return dispatch(getPaginationData(page, limit));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;