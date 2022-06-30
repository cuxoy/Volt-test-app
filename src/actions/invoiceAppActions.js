export const invoiceAdded = (invoice) => {
  return {
    type: "INVOICE_ADDED",
    payload: invoice,
  };
};
export const invoiceDeleted = (id) => {
  return {
    type: "INVOICE_DELETED",
    payload: id,
  };
};

export const invoicesFetching = () => {
  return {
    type: "INVOICES_FETCHING",
  };
};

export const invoicesFetched = (invoices) => {
  return {
    type: "INVOICES_FETCHED",
    payload: invoices,
  };
};
