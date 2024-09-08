import { render, screen } from "@testing-library/react"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { MainNavigation } from "../MainNavigation"

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn()
}))

describe("Test MainNavigation", ()=>{

    test("Test main navigation", ()=>{
        render(
            <BrowserRouter basename="/">
                <MainNavigation />
            </BrowserRouter>
        )
        const textName = screen.getByTestId('appName');
        expect(textName).toBeInTheDocument();
    })
    
})