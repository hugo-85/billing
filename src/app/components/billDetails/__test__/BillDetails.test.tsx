import { render, screen } from "@testing-library/react";
import BillDetails from "../BillDetails";
import { initializeDetails } from "@/app/utils/helpers";

const mockHandleChangeRow = jest.fn();
const mockHandleChangeRowNumber = jest.fn();

describe("Testing render", () => {
  beforeEach(() => {
    render(
      <BillDetails
        rows={initializeDetails([])}
        handleChangeRow={mockHandleChangeRow}
        handleChangeRowNumber={mockHandleChangeRowNumber}
      />
    );
  });

  it("Should render 4 columns", () => {
    const columns = screen.getAllByRole("columnheader");

    expect(columns.length).toBe(4);
  });

  it("Should render 10 rows", () => {
    const rows = screen.getAllByRole("row");

    //rest 1, because the header use a row
    expect(rows.length - 1).toBe(10);
  });

  it("Should render a quantity column", () => {
    const column = screen.getByRole("columnheader", { name: "quantity" });

    expect(column).toBeInTheDocument();
  });

  it("Should render a details column", () => {
    const column = screen.getByRole("columnheader", { name: "details" });

    expect(column).toBeInTheDocument();
  });

  it("Should render a price column", () => {
    const column = screen.getByRole("columnheader", { name: "price" });

    expect(column).toBeInTheDocument();
  });

  it("Should render a total column", () => {
    const column = screen.getByRole("columnheader", { name: "total" });

    expect(column).toBeInTheDocument();
  });
});

describe("Testing render with data", () => {
  beforeEach(() => {
    render(
      <BillDetails
        rows={initializeDetails([
          { id: 1, quantity: 10, details: "Red Balloons", price: 100 },
          { id: 2, quantity: 20, details: "Green Balloons", price: 100 },
        ])}
        handleChangeRow={mockHandleChangeRow}
        handleChangeRowNumber={mockHandleChangeRowNumber}
      />
    );
  });

  it("Should render only 2 rows with data", () => {
    const inputs: HTMLInputElement[] = screen.getAllByRole("textbox", {
      name: "quantity",
    });

    const inputsWithData = inputs.filter((input) => input.value !== "0");

    expect(inputsWithData.length).toBe(2);
  });
});
