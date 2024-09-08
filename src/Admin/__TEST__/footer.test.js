import { render, screen } from "@testing-library/react"
import { Footer } from "../Footer"
import { act } from "react"

describe("Footer Component Test", ()=>{
    test("Footer should render", ()=>{
        render(<Footer/>);
        const label = screen.getByTestId('developer');
        expect(label).toBeInTheDocument();
    })
})