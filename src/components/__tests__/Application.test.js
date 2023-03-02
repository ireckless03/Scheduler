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
    // 1. render
    const { container } = render(<Application />);

    // 2. Wait for "Archie Cohen"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click delete button on the appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. check that the confirmation message
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. click confirm
    fireEvent.click(getByText(appointment, 'Confirm'));

    // 6. Check deleting is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait for add element to be displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check Daylistitem monday has 2 spots
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();


  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. render the application.
    const { container } = render(<Application />);

    // 2. Wait for "Archie Cohen" 
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click edit button 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the form is shown with the existing student name 
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();


    // 5. Change name to Lydia Miller-Jones, and select interviewr
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click save
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check saving is shown
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait for new name to display
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 9. check modnay has 1 spot left
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce()
    // 1. render the application.
    const { container, debug } = render(
      <Application />
    );

    // 2. Wait for "Archie Cohen" 
    await waitForElement(() => getByText(container, 'Archie Cohen'))

    // 3. Click add button 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByAltText(appointment, "Add")

    );


    fireEvent.click(queryByAltText(appointment, "Add"));

    // 4. Enter name "Lydia Miller-Jones" into input
    fireEvent.change(getByPlaceholderText(container, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });


    // 5. click on interviewer
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));

    // 6. save
    fireEvent.click(getByText(container, "Save"));

    // 7. Show saving status
    expect(getByText(container, "Saving")).toBeInTheDocument();

    // 8. check error message is displayed
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Can't create Appointment")).toBeInTheDocument();


  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. render the application.
    const { container, debug } = render(
      <Application />
    );

    // 2. Wait for "Archie Cohen" 
    await waitForElement(() => getByText(container, 'Archie Cohen'))

    // 3. Click delete button 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. wait for confirm and click
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'))

    // 5. wait for deleting msg
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 6. mock err
    await waitForElement(() => getByText(container, "Error"));
    expect(getByText(container, "Can't cancel Appointment")).toBeInTheDocument();
    // 7. check for err msg
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
  });
  });