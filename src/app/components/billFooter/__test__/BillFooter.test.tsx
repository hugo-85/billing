import { render, screen } from "@testing-library/react";
import BillFooter from "../BillFooter";
import userEvent from "@testing-library/user-event";

const mockHandleChange = jest.fn();
const mockHandleChangeSign = jest.fn();

describe("Testing render", () => {
  beforeEach(() => {
    render(
      <BillFooter
        note={""}
        sign={0}
        subTotal={0}
        total={0}
        handleChange={mockHandleChange}
        handleChangeSign={mockHandleChangeSign}
      />
    );
  });

  it("Should render NOTAS label", () => {
    const label = screen.getByText(/notas/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render Sub. Total label", () => {
    const label = screen.getByText(/sub. total:/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render Seña label", () => {
    const label = screen.getByText(/seña/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render Saldo restante", () => {
    const label = screen.getByText(/saldo restante:/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render a note input", () => {
    const textarea = screen.getByRole("textbox", { name: "note" });

    expect(textarea).toBeInTheDocument();
  });

  it("Should render a sub total input", () => {
    const input = screen.getByRole("textbox", { name: "sub-total" });

    expect(input).toBeInTheDocument();
  });

  it("Should render a sign input", () => {
    const input = screen.getByRole("textbox", { name: "sign" });

    expect(input).toBeInTheDocument();
  });

  it("Should render a rest input", () => {
    const input = screen.getByRole("textbox", { name: "rest" });

    expect(input).toBeInTheDocument();
  });
});

describe("Testing render with data", () => {
  beforeEach(() => {
    render(
      <BillFooter
        note={"Some note"}
        sign={10}
        subTotal={100}
        total={90}
        handleChange={mockHandleChange}
        handleChangeSign={mockHandleChangeSign}
      />
    );
  });

  it("Should have 'Some note' as note input value", () => {
    const textarea = screen.getByRole("textbox", { name: "note" });

    expect(textarea).toHaveValue("Some note");
  });

  it("Should have '$ 100' in sub total input", () => {
    const input = screen.getByRole("textbox", { name: "sub-total" });

    expect(input).toHaveValue("$ 100");
  });

  it("Should have '$ 10' in sign input", () => {
    const input = screen.getByRole("textbox", { name: "sign" });

    expect(input).toHaveValue("$ 10");
  });

  it("Should have '$ 90' in rest input", () => {
    const input = screen.getByRole("textbox", { name: "rest" });

    expect(input).toHaveValue("$ 90");
  });
});

describe("Test functionality", () => {
  beforeEach(() => {
    render(
      <BillFooter
        note={""}
        sign={0}
        subTotal={0}
        total={0}
        handleChange={mockHandleChange}
        handleChangeSign={mockHandleChangeSign}
      />
    );
  });

  it("Should call handleChange", async () => {
    const textarea = screen.getByRole("textbox", { name: "note" });

    await userEvent.type(textarea, "Some note");

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("Should call handleChangeSign", async () => {
    const input = screen.getByRole("textbox", { name: "sign" });

    await userEvent.type(input, "10");

    expect(mockHandleChangeSign).toHaveBeenCalled();
  });
});
