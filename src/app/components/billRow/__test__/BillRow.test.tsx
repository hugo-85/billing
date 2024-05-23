import { render, screen } from "@testing-library/react";
import BillRow from "../BillRow";
import { Table, TableBody } from "@mui/material";
import userEvent from "@testing-library/user-event";

const mockHandleChangeRow = jest.fn();
const mockHandleChangeRowNumber = jest.fn();

describe("Testing render an empty row", () => {
  beforeEach(() => {
    render(
      <Table>
        <TableBody>
          <BillRow
            index={0}
            row={{
              id: null,
              quantity: 0,
              details: "",
              price: 0,
            }}
            handleChangeRow={mockHandleChangeRow}
            handleChangeRowNumber={mockHandleChangeRowNumber}
          />
        </TableBody>
      </Table>
    );
  });

  it("Should render 4 columns", () => {
    const columns = screen.getAllByRole("rowheader");

    expect(columns.length).toBe(4);
  });

  it("Should render a quantity input", () => {
    const input = screen.getByRole("textbox", { name: "quantity" });

    expect(input).toBeInTheDocument();
  });

  it("Should render a detail input", () => {
    const input = screen.getByRole("textbox", { name: "details" });

    expect(input).toBeInTheDocument();
  });

  it("Should render price input", () => {
    const input = screen.getByRole("textbox", { name: "price" });

    expect(input).toBeInTheDocument();
  });

  it("Should render a disabled total input", () => {
    const input = screen.getByRole("textbox", { name: "total" });

    expect(input).toHaveAttribute("disabled");
  });
});

describe("Testing a row with data", () => {
  beforeEach(() => {
    render(
      <Table>
        <TableBody>
          <BillRow
            index={0}
            row={{
              id: 1,
              quantity: 100,
              details: "Red Balloons",
              price: 10,
            }}
            handleChangeRow={mockHandleChangeRow}
            handleChangeRowNumber={mockHandleChangeRowNumber}
          />
        </TableBody>
      </Table>
    );
  });

  it("Should have 100 as quantity input value", () => {
    const input = screen.getByRole("textbox", { name: "quantity" });

    expect(input).toHaveValue("100");
  });

  it("Should have 'Red Balloons' as details input value", () => {
    const input = screen.getByRole("textbox", { name: "details" });

    expect(input).toHaveValue("Red Balloons");
  });

  it("Should have '$ 10' as input price value", () => {
    const input = screen.getByRole("textbox", { name: "price" });

    expect(input).toHaveValue("$ 10");
  });
});

describe("Testing functionality", () => {
  beforeEach(() => {
    render(
      <Table>
        <TableBody>
          <BillRow
            index={0}
            row={{
              id: null,
              quantity: 0,
              details: "",
              price: 0,
            }}
            handleChangeRow={mockHandleChangeRow}
            handleChangeRowNumber={mockHandleChangeRowNumber}
          />
        </TableBody>
      </Table>
    );
  });

  it("Should call handleChangeRow on details change", async () => {
    const input = screen.getByRole("textbox", { name: "details" });
    await userEvent.type(input, "Reb Balloons");

    expect(mockHandleChangeRow).toHaveBeenCalled();
  });

  it("Should call handleChangeRowNumber on quantity change", async () => {
    const input = screen.getByRole("textbox", { name: "quantity" });

    await userEvent.type(input, "10");

    expect(mockHandleChangeRowNumber).toHaveBeenCalled();
  });

  it("Should call handleChangeRowNumber on price change", async () => {
    const input = screen.getByRole("textbox", { name: "price" });

    await userEvent.type(input, "10");

    expect(mockHandleChangeRowNumber).toHaveBeenCalled();
  });
});
