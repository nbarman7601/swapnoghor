import { render, screen } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import { MainNavigation } from "../MainNavigation"

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn()
}))

describe("Test MainNavigation", ()=>{

    test("Test main navigation", ()=>{
        render(
            <MainNavigation />
        )
        const textName = screen.getByText(/Nandan/i);
        expect(textName).toBeInTheDocument();
    })
    
})