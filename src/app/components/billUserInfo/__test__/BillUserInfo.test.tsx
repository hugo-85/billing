import { render, screen } from "@testing-library/react";
import BillUserInfo from "../BillUserInfo";
import userEvent from "@testing-library/user-event";

const mockHandleChange = jest.fn();

beforeEach(() => {
  render(
    <BillUserInfo name="Mario" phone="123456" handleChange={mockHandleChange} />
  );
});

describe("Testing Render", () => {
  it("Should render a label Nombre", () => {
    const element = screen.getByText("Nombre:");

    expect(element).toBeInTheDocument();
  });

  it("Should render al label Telefono", () => {
    const element = screen.getByText("Telefono:");

    expect(element).toBeInTheDocument();
  });

  it("Should render a label Direccion", () => {
    const element = screen.getByText("Direccion:");

    expect(element).toBeInTheDocument();
  });

  it("Should render a name input", () => {
    const element = screen.getByLabelText("Nombre:");

    expect(element).toBeInTheDocument();
  });

  it("Should render a phone input", () => {
    const element = screen.getByLabelText("Telefono:");

    expect(element).toBeInTheDocument();
  });

  it("Should render a address input", () => {
    const element = screen.getByLabelText("Direccion:");

    expect(element).toBeInTheDocument();
  });
});

describe("Testing functionality", () => {
  it("Should has 'Mario' as value in name input", () => {
    const input = screen.getByLabelText("Nombre:");

    expect(input).toHaveValue("Mario");
  });

  it("Should has '123456' as value in phone input", () => {
    const input = screen.getByLabelText("Telefono:");

    expect(input).toHaveValue("123456");
  });

  it("Should call handleChange when write down in name input", async () => {
    const input = screen.getByLabelText("Nombre:");

    // fireEvent.change(input, { target: { value: "Yoshi" } });

    await userEvent.type(input, "Yoshi");

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("Should call handleChange when write down in phone input", async () => {
    const input = screen.getByLabelText("Telefono:");

    await userEvent.type(input, "12345");

    expect(mockHandleChange).toHaveBeenCalled();
  });
});
