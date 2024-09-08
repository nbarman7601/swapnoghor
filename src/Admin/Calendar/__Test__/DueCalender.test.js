import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import apiService from "../../../axios";
import Calendar from "../DueCalendar";
import { act } from "react";

jest.mock('../../../axios', () => ({
    get: jest.fn(),
}));

jest.mock('../InstallmentList', () => ({
    InstallmentListPopUP: jest.fn(() => null),
}));

describe("Calendar Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders calendar with correct initial data', async () => {
        // Mock API response
        apiService.get.mockResolvedValueOnce({
            data: [
                {
                    installment_date: '2024-09-01',
                    installmentAmt: 1000,
                    actualAmt: 1000,
                    status: 'paid'
                },
                // Add more mock data if needed
            ]
        });
        render(<Calendar />);

        // Wait for API call to complete and component to re-render
        await waitFor(() => expect(apiService.get).toHaveBeenCalled());

        // Check if calendar header displays current month and year
        expect(screen.getByText(new RegExp(new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear(), 'i'))).toBeInTheDocument();
        // Check if buttons are rendered
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    test('handles month navigation', async () => {
        apiService.get.mockResolvedValue({
            data: [
            ]
        });

        render(<Calendar />);
        const initialMonth = screen.getByText(new RegExp(new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear(), 'i'));
        fireEvent.click(screen.getByText('Next'));
      //  await waitFor(() => expect(apiService.get).toHaveBeenCalled());
        expect(apiService.get).toHaveBeenCalledWith(
            `loan/installment-with-datebound`,
            expect.objectContaining({
                params: expect.objectContaining({
                    from: `${new Date().getFullYear()}-${(new Date().getMonth()).toString().padStart(2, '0')}-01`,
                    to: `${new Date().getFullYear()}-${(new Date().getMonth()).toString().padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`
                })
            })
        );
        expect(screen.getByText(new RegExp(new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear(), 'i'))).toBeInTheDocument();
    });
})