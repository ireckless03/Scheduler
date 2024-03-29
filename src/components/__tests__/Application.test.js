import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, getAllByTestId, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";


afterEach(cleanup);


describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));


    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce()

    const { container, debug } = render(
      <Application />
    );

    await waitForElement(() => getByText(container, 'Archie Cohen'))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByAltText(appointment, "Add")

    );
    fireEvent.click(queryByAltText(appointment, "Add"));


    fireEvent.change(getByPlaceholderText(container, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));
    fireEvent.click(getByText(container, "Save"));
    expect(getByText(container, "Saving")).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Can't create Appointment")).toBeInTheDocument();


  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(
      <Application />
    );

    await waitForElement(() => getByText(container, 'Archie Cohen'))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));


    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'))

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();


    await waitForElement(() => getByText(container, "Error"));
    expect(getByText(container, "Can't cancel Appointment")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });
});