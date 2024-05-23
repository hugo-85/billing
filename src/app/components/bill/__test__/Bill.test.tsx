import { fireEvent, render, screen, within } from "@testing-library/react";
import Bill from "../Bill";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import "../../../../../testServer";
import dayjs from "dayjs";

//change it to fireEvent to try improve performance
const fillRow = ({
  index,
  quantity,
  details,
  price,
}: {
  index: number;
  quantity?: string;
  details?: string;
  price?: string;
}) => {
  const rows = screen.getAllByRole("row");

  if (quantity) {
    const inputQuantity = within(rows[index]).getByRole("textbox", {
      name: "quantity",
    });
    // await userEvent.type(inputQuantity, quantity);

    fireEvent.change(inputQuantity, { target: { value: quantity } });
  }

  if (details) {
    const inputDetails = within(rows[index]).getByRole("textbox", {
      name: "details",
    });
    // await userEvent.type(inputDetails, details);
    fireEvent.change(inputDetails, { target: { value: details } });
  }

  if (price) {
    const inputPrice = within(rows[index]).getByRole("textbox", {
      name: "price",
    });
    // await userEvent.type(inputPrice, price);
    fireEvent.change(inputPrice, { target: { value: price } });
  }
};

describe("Testing functionality", () => {
  beforeEach(() => {
    render(
      <>
        <ToastContainer />
        <Bill />
      </>
    );
  });

  it("Should value change on input delivery date", async () => {
    const input = screen.getByPlaceholderText("DD/MM/YYYY");

    await userEvent.type(input, "01/01/2024");

    expect(input).toHaveValue("01/01/2024");
  });

  it("Should value change on input hours", async () => {
    const input = screen.getByRole("textbox", { name: "hour" });

    await userEvent.type(input, "12 hr");

    expect(input).toHaveValue("12 hr");
  });

  it("Should value change on input name", async () => {
    const input = screen.getByRole("textbox", { name: "name" });

    await userEvent.type(input, "Mario");

    expect(input).toHaveValue("Mario");
  });

  it("Should change value on input phone", async () => {
    const input = screen.getByRole("textbox", { name: "phone" });

    await userEvent.type(input, "12345");

    expect(input).toHaveValue("12345");
  });

  it("Should change value on note input", async () => {
    const textarea = screen.getByRole("textbox", { name: "note" });

    await userEvent.type(textarea, "Some note");

    expect(textarea).toHaveValue("Some note");
  });

  it("Should show a error message thats need to add at least one detail", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });

    await userEvent.click(saveBtn);

    const message = screen.getByText(
      /la factura debe tener al menos un detalle con importe mayor a \$0/i
    );

    expect(message).toBeInTheDocument();
  });

  it("Should show there's uncompleted details error message", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });

    fillRow({
      index: 1,
      quantity: "10",
      details: "Red Balloons",
      price: "10",
    });

    fillRow({ index: 2, quantity: "20" });

    await userEvent.click(saveBtn);

    const toast = screen.getByText(/hay detalles sin completar/i);

    expect(toast).toBeInTheDocument();
  });

  it("Should show enter a name error message", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });

    fillRow({
      index: 1,
      quantity: "10",
      details: "Red Balloons",
      price: "10",
    });

    await userEvent.click(saveBtn);

    const toast = screen.getByText(/debe ingresar un nombre/i);

    expect(toast).toBeInTheDocument();
  });

  it("Should show enter a phone error message", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });
    const nameInput = screen.getByRole("textbox", { name: "name" });

    await userEvent.type(nameInput, "Mario");

    fillRow({
      index: 1,
      quantity: "10",
      details: "Red Balloons",
      price: "10",
    });

    await userEvent.click(saveBtn);

    const toast = screen.getByText(/debe ingresar un telefono/i);

    expect(toast).toBeInTheDocument();
  });

  it("Should show delivery date error message", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });
    const nameInput = screen.getByRole("textbox", { name: "name" });
    const phoneInput = screen.getByRole("textbox", { name: "phone" });

    await userEvent.type(nameInput, "Mario");
    await userEvent.type(phoneInput, "12345");

    fillRow({ index: 1, quantity: "10", details: "Red Balloons", price: "10" });

    await userEvent.click(saveBtn);

    const toast = screen.getByText(/debe ingresar una fecha de entrega/i);

    expect(toast).toBeInTheDocument();
  });

  it("Should render created bill message", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });
    const nameInput = screen.getByRole("textbox", { name: "name" });
    const phoneInput = screen.getByRole("textbox", { name: "phone" });
    const deliveryInput = screen.getByPlaceholderText("DD/MM/YYYY");

    const deliveryDate = dayjs().add(1, "day").format("DD/MM/YYYY");
    await userEvent.type(deliveryInput, deliveryDate);

    await userEvent.type(nameInput, "Mario");
    await userEvent.type(phoneInput, "123456");

    fillRow({
      index: 1,
      quantity: "10",
      details: "Red Balloons",
      price: "1000",
    });

    await userEvent.click(saveBtn);

    const toast = await screen.findByText(/factura creada/i);

    expect(toast).toBeInTheDocument();
  });
});

describe("Testing update a bill", () => {
  beforeEach(() => {
    render(
      <>
        <ToastContainer />
        <Bill
          billData={{
            id: 1,
            amount: "300000",
            createdAt: "2024-05-08T03:00:00.000Z",
            delivery_date: "2024-05-19T03:00:00.000Z",
            hour: "18 hs",
            name: "Yoshi",
            note: "Leave at the party",
            phone: "29112731212",
            sign: "100000",
            state: "ARCHIVADO",
            details: [
              {
                detail: "Red Balloons",
                id: 106,
                id_bill: 41,
                price: "4000",
                quantity: 100,
              },
            ],
          }}
        />
      </>
    );
  });

  it("Should render updated bill message", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar/i });
    const nameInput = screen.getByRole("textbox", { name: "name" });

    await userEvent.type(nameInput, "Mario");

    await userEvent.click(saveBtn);

    const toast = await screen.findByText(/factura actualizada/i);
  });
});
