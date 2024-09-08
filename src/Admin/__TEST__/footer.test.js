import { render, screen } from "@testing-library/react"
import { Footer } from "../Footer"

test("Should Footer work", ()=>{
    render(<Footer />);
    const devName = screen.getByTestId('developer');
    expect(devName).toHaveTextContent(/Nandan Kumar Barman/i)
})