import apiService from "../../axios";

const LoanService = {
  downloadLoan: async (gridState) => {
    const { status, page, pageSize, weekday, sort, search, sortKey, searchBy, from, to, interval } = gridState;

    const params = {
      status,
      page,
      limit: pageSize,
      sort,
      sortBy: sortKey,
      search,
      searchBy,
      from,
      to,
      weekday,
      interval
    };

    try {
      const response = await apiService.getWithParams('/loan/export-excel', params, 'blob');
      return response;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
};

export default LoanService;
