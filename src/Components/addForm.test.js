import React from "react";
import {render, queryByAttribute, fireEvent, getByDisplayValue, getByTitle} from "@testing-library/react";
import AddForm from "./addForm";


describe("Add sensor form", () => {

    test("submit button in the document", () => {
        const { getByText } = render(<AddForm />);
        const submit = getByText("Add request");
        expect(submit).toBeInTheDocument();
        fireEvent.submit(submit);
        expect(submit).not.toBeInTheDocument();
    })

    test("form labels in the document", () => {
        const { getByText } = render(<AddForm />);
        const sensorLabel = getByText("Sensor");
        const timeLabel = getByText("Date and time");
        const inLabel = getByText("Number of people going in");
        const outLabel = getByText("Number of people going out");
        expect(sensorLabel).toBeInTheDocument();
        expect(timeLabel).toBeInTheDocument();
        expect(inLabel).toBeInTheDocument();
        expect(outLabel).toBeInTheDocument();
    });

    test("form inputs in the document", () => {
        const { getByTitle } = render(<AddForm />);
        const sensorInput = getByTitle("sensor");
        const datetimeInput = getByTitle("datetime");
        const inInput = getByTitle("inInput");
        const outInput = getByTitle("outInput");
        expect(sensorInput).toBeInTheDocument();
        expect(datetimeInput).toBeInTheDocument();
        expect(inInput).toBeInTheDocument();
        expect(outInput).toBeInTheDocument();
    });

    test("updates on change", () => {
        const { getByTitle } = render(<AddForm />);
        const sensorInput = getByTitle("sensor");
        expect(sensorInput.value).toBe("abc");
        fireEvent.change(sensorInput, {target: {value: "def"}});
        expect(sensorInput.value).toBe("def");
        const datetimeInput = getByTitle("datetime");
        expect(datetimeInput.value).toBe("");
        fireEvent.change(datetimeInput, {target: {value: "2021-05-08 10:10:10"}});
        expect(datetimeInput.value).toBe("2021-05-08T10:10:10.000");
        const inInput = getByTitle("inInput");
        expect(inInput.value).toBe("");
        fireEvent.change(inInput, {target: {value: "5"}});
        expect(inInput.value).toBe("5");
        const outInput = getByTitle("outInput");
        expect(outInput.value).toBe("");
        fireEvent.change(outInput, {target: {value: "2"}});
        expect(outInput.value).toBe("2");
    });

})