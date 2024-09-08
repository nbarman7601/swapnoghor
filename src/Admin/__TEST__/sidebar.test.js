import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { act } from "react";

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual("react-router-dom"), 
    useNavigate: jest.fn()
}))

describe("Sidebar Test", ()=>{
    const mockedNavigate = jest.fn();

    beforeEach(() => {
        // Set the mocked useNavigate
        require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
    });
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear(); // Clear localStorage for fresh tests
    });
    test("Should link available in the document", async ()=>{
         await act(async ()=>{
             render(
                <MemoryRouter>
                    <Sidebar />
                </MemoryRouter>
             )
         }) 
        const empText = screen.getByText(/Employee/i);
        const group = screen.getByText(/Group/i);
        const Customer = screen.getByText(/Customer/i);
        const Loan = screen.getByText(/Loan/i);
        const Products = screen.getByText(/Products/i);
        const Settings = screen.getByText(/Settings/i);

        expect(empText).toBeInTheDocument();
        expect(group).toBeInTheDocument()
        expect(Customer).toBeInTheDocument()
        expect(Loan).toBeInTheDocument()
        expect(Products).toBeInTheDocument()
        expect(Settings).toBeInTheDocument()
    });

    test("Should redirect to particular page", ()=>{
        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        )
        const empText = screen.getByText(/Employee/i);
        fireEvent.click(empText);
        expect(empText.closest('a')).toHaveAttribute('href', '/employee');
    })
})