import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import App from "./App";

describe("Full app navigation", () => {

    test("Navbar links", () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
        )

        expect(screen.getByText("Meeting room occupancy")).toBeInTheDocument();

        const leftClick = { button: 0 }

        userEvent.click(screen.getByTestId("simulation"), leftClick);
        expect(screen.getByText("Simulate a new sensor request")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("occupancy"), leftClick);
        expect(screen.getByText("Meeting room occupancy")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("occupancy"), leftClick);
        expect(screen.getByText("Meeting room occupancy")).toBeInTheDocument();
    });

})