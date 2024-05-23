import { render, screen } from "@testing-library/react";
import BillHeader from "../BillHeader";
import dayjs from "dayjs";
import { weekdays } from "@/app/utils/helpers";
import userEvent from "@testing-library/user-event";

const mockHandleChange = jest.fn();
const mockUpdateValues = jest.fn();

describe("Testing render", () => {
  beforeEach(() => {
    render(
      <BillHeader
        deliveryDate={null}
        billDate={dayjs()}
        hour={""}
        newId={null}
        handleChange={mockHandleChange}
        updateValues={mockUpdateValues}
      />
    );
  });

  it("Should render a banner", () => {
    const img = screen.getByAltText("bill-logo");

    expect(img).toBeInTheDocument();
  });

  it("should render a client text header", () => {
    const text = screen.getByText(/datos del cliente/i);

    expect(text).toBeInTheDocument();
  });

  it("Should render a todays label", () => {
    const label = screen.getByText(/fecha hoy:/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render todays date", () => {
    const today = dayjs().format("DD/MM/YYYY");

    const label = screen.getByText(today);

    expect(label).toBeInTheDocument();
  });

  it("Should render a hrs label", () => {
    const label = screen.getByText(/hora:/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render delivery text", () => {
    const label = screen.getByText(/la entrega sera el dia:/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render a left days", () => {
    const label = screen.getByText(/para retirar su pedido/i);

    expect(label).toBeInTheDocument();
  });

  it("Should render an empty delivery date input", () => {
    const input = screen.getByPlaceholderText("DD/MM/YYYY");

    expect(input).toHaveValue("");
  });

  it("Should render an empty hrs input", () => {
    const input = screen.getByRole("textbox", { name: "hour" });

    expect(input).toHaveValue("");
  });
});

describe("Testing render a bill", () => {
  beforeEach(() => {
    render(
      <BillHeader
        deliveryDate={dayjs().add(1, "day")}
        billDate={dayjs()}
        hour={"13 hr"}
        newId={99}
        handleChange={mockHandleChange}
        updateValues={mockUpdateValues}
      />
    );
  });

  it("Should render 99 in the id number", () => {
    const label = screen.getByText(
      (content, element) => content === "99" && element?.tagName == "SPAN"
    );

    expect(label).toBeInTheDocument();
  });

  it("Should render '13 hr' in the hours field", () => {
    const input = screen.getByRole("textbox", { name: "hour" });

    expect(input).toHaveValue("13 hr");
  });

  it("Should render the next day in the delivery day", () => {
    const weekDay = dayjs().get("day");
    const deliveryWeekDay = weekdays[weekDay === 6 ? 0 : weekDay + 1];

    const text = screen.getByText(`La entrega sera el dia: ${deliveryWeekDay}`);

    expect(text).toBeInTheDocument();
  });

  it("Should render 1 day left to pick up the order", () => {
    const text = screen.getByText(/restan: 1 dias para retirar su pedido/i);

    expect(text).toBeInTheDocument();
  });

  it("Should call updateValues when the date changes", async () => {
    const input = screen.getByPlaceholderText("DD/MM/YYYY");

    await userEvent.type(input, "01/01/2024");

    expect(mockUpdateValues).toHaveBeenCalled();
  });

  it("Should call handleChange when the hour change", async () => {
    const input = screen.getByRole("textbox", { name: "hour" });

    await userEvent.type(input, "12 hr");

    expect(mockHandleChange).toHaveBeenCalled();
  });
});
