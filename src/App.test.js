import { render, screen } from "@testing-library/react"
import App from "./App"

test("App should render", ()=>{
    render(<App />);
    const h3 = screen.getByText(/Login/i)
    expect(h3).toBeInTheDocument();
})