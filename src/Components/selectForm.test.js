import React from "react";
import {render, queryByAttribute, fireEvent, getByDisplayValue, getByText, getAllByTitle} from "@testing-library/react";
import AddForm from "./selectForm";
import SelectForm from "./selectForm";

describe("Select sensor form", () => {

    test("submit button in the document", () => {
        const { getByText } = render(<SelectForm />);
        const submit = getByText("Show occupancy");
        expect(submit).toBeInTheDocument();
        fireEvent.submit(submit);
        expect(submit).not.toBeInTheDocument();
    })

    test("form labels in the document", () => {
        const { getByText } = render(<SelectForm />);
        const sensorLabel = getByText("Select a sensor");
        const timeLabel = getByText("Select the date and time");
        expect(sensorLabel).toBeInTheDocument();
        expect(timeLabel).toBeInTheDocument();
    });

    test("form inputs in the document", () => {
        const { getByTitle } = render(<SelectForm />);
        const sensorInput = getByTitle("sensor");
        const datetimeInput = getByTitle("datetime");
        expect(sensorInput).toBeInTheDocument();
        expect(datetimeInput).toBeInTheDocument();
    });

    test("updates on change", () => {
        const { getByTitle } = render(<SelectForm />);
        const sensorInput = getByTitle("sensor");
        expect(sensorInput.value).toBe("abc");
        fireEvent.change(sensorInput, {target: {value: "def"}});
        expect(sensorInput.value).toBe("def");
        const datetimeInput = getByTitle("datetime");
        expect(datetimeInput.value).toBe("");
        fireEvent.change(datetimeInput, {target: {value: "2021-05-08 10:10:10"}});
        expect(datetimeInput.value).toBe("2021-05-08T10:10:10.000");
    });
})