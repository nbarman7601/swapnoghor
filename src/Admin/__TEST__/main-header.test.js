import { render, screen } from "@testing-library/react"
import { MainHeader } from "../MainHeader"

describe("MainHeader.js", ()=>{
    test("should return content", ()=>{
        render(
            <MainHeader>
                <button data-testid="helloBtn">Hello</button>
                <span>Hello</span>
            </MainHeader>
        )

        const helloBtn = screen.getByTestId("helloBtn");
        expect(helloBtn).toBeInTheDocument();
    })
})