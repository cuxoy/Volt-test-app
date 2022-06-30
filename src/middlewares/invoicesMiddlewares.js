import {
  invoicesFetching,
  invoicesFetched,
  invoiceAdded,
  invoiceDeleted,
} from "../actions/invoiceAppActions";

export const fetchInvoices = () => async (next) => {
  next(invoicesFetching());
  const response = await fetch("http://localhost:3001/invoices");
  const data = await response.json();
  next(invoicesFetched(data));
};

export const deleteInvoice = (id) => async (next) => {
  const response = await fetch(`http://localhost:3001/invoices/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  next(invoiceDeleted(id));
};

export const addInvoice =
  (id, customer, price, descount, products) => async (next) => {
    const newInvoice = { id, customer, price, descount, products };
    const response = await fetch(`http://localhost:3001/invoices`, {
      method: "POST",
      body: JSON.stringify(newInvoice),
      headers: { "Content-Type": "application/json" },
    });
    next(invoiceAdded(newInvoice));
  };
