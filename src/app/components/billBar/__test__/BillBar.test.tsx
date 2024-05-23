import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BillBar from "../BillBar";
import dayjs from "dayjs";

const mockUpdateValues = jest.fn();
const mockSave = jest.fn();
const mockClearData = jest.fn();

describe("Testing render", () => {
  beforeEach(() => {
    render(
      <BillBar
        id={null}
        newId={null}
        billDate={dayjs()}
        values={{
          amount: 0,
          deliveryDate: null,
          hour: "",
          name: "",
          note: "",
          phone: "",
          state: "ARCHIVADO",
        }}
        sign={0}
        rows={[]}
        updateValues={mockUpdateValues}
        save={mockSave}
        clearData={mockClearData}
      />
    );
  });

  it("Should render a state select", () => {
    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
  });

  it("Should render a save button", () => {
    const button = screen.getByRole("button", { name: /guardar/i });

    expect(button).toBeInTheDocument();
  });

  it("Should call save function when button is clicked", async () => {
    const button = screen.getByRole("button", { name: /guardar/i });

    await userEvent.click(button);

    expect(mockSave).toHaveBeenCalled();
  });

  it("Should have a value selected on the state select", () => {
    const selectInput = document.querySelector("input[name='state']");
    expect(selectInput).toHaveValue("ARCHIVADO");
  });

  it("Should call updateValues when select an option", async () => {
    const select = screen.getByRole("combobox");

    await userEvent.click(select);

    const list = screen.getByRole("listbox");

    const options = within(list).getAllByRole("option");

    await userEvent.click(options[1]);

    expect(mockUpdateValues).toHaveBeenCalled();
  });
});

describe("Testing render a new bill", () => {
  beforeEach(() => {
    render(
      <BillBar
        id={null}
        newId={null}
        billDate={dayjs()}
        values={{
          amount: 0,
          deliveryDate: null,
          hour: "",
          name: "",
          note: "",
          phone: "",
          state: "ARCHIVADO",
        }}
        sign={0}
        rows={[]}
        updateValues={mockUpdateValues}
        save={mockSave}
        clearData={mockClearData}
      />
    );
  });

  it("Should render a clean button", () => {
    const button = screen.getByRole("button", { name: /limpiar/i });

    expect(button).toBeInTheDocument();
  });

  it("Should not render a download button", () => {
    const button = screen.queryByRole("button", { name: /descargar/i });

    expect(button).toBe(null);
  });

  it("Should call clean function when button is clicked", async () => {
    const button = screen.getByRole("button", { name: /limpiar/i });

    await userEvent.click(button);

    expect(mockClearData).toHaveBeenCalled();
  });
});

describe("Testing render a bill", () => {
  beforeEach(() => {
    render(
      <BillBar
        id={1}
        newId={1}
        billDate={dayjs()}
        values={{
          id: 1,
          amount: 0,
          deliveryDate: null,
          hour: "12 hs",
          name: "Mario",
          note: "some note",
          phone: "1412435",
          state: "ARCHIVADO",
        }}
        sign={0}
        rows={[]}
        updateValues={mockUpdateValues}
        save={mockSave}
        clearData={mockClearData}
      />
    );
  });

  it("Should render a download button", () => {
    const button = screen.getByRole("button", { name: /descargar/i });

    expect(button).toBeInTheDocument();
  });

  it("Should not render a clean button", () => {
    const button = screen.queryByRole("button", { name: /limpiar/i });

    expect(button).toBe(null);
  });
});
