import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../Header"
import { MemoryRouter, useNavigate } from "react-router-dom";


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Keep other functionalities like Link
    useNavigate: jest.fn(),
}));
jest.mock('../Sidebar', () => () => <div>Mocked Sidebar</div>);

describe("Header Component", ()=>{
    const mockedNavigate = jest.fn();
    beforeEach(()=>{
        require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
    })

    afterEach(()=>{
        jest.clearAllMocks();
        localStorage.clear(); 
    })

    test('should render Sidebar and Profile link', () => {
        render(
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        );
    
        // Test Sidebar rendering
        expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();
    
        // Test Profile link rendering
        const profileLink = screen.getByText('Profile');
        expect(profileLink).toBeInTheDocument();
        expect(profileLink.closest('a')).toHaveAttribute('href', '/profile');
      });

      test('should call handleLogout and navigate to the home page on logout', () => {
        localStorage.setItem('token', 'testToken');
        render(
            <MemoryRouter>
              <Header />
            </MemoryRouter>
        );
        const logoutBtn = screen.getByTestId("logoutBTn");
        expect(logoutBtn).toBeInTheDocument();

        fireEvent.click(logoutBtn);
        expect(localStorage.getItem('token')).toBe(null);
        expect(mockedNavigate).toHaveBeenCalledWith('/');
      });
})