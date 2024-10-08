import { fireEvent, render, screen } from "@testing-library/react"
import { InstallmentListPopUP } from "../InstallmentList"
import '@testing-library/jest-dom';
jest.mock("../../../common/CurrencyFormatter", () => ({ amount }) => <span>{amount}</span>);
jest.mock('../../../common/DateFormatter', () => ({ date }) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return <span>{formattedDate}</span>;
});
describe("Test Calender function", () => {
        const mockInstallments = [
        {
            _id:"12345",
            installment_date: '15',
            loanId: {
                customer: {
                    name: 'John Doe',
                    guardian: 'Jane Doe',
                    group: {
                        name: 'Group A',
                        lo: {
                            firstName: 'Officer',
                            lastName: 'One'
                        }
                    },
                    phone: '1234567890'
                }
            },
            installmentAmt: 500,
            actualAmt: 400,
            collectedBy: { firstName: 'Collector', lastName: 'One' },
            paymnentAt: '2023-09-01',
            status: 'active'
        }
    ];
    const mockCurrentMonth = 9;
    const mockCurrentYear = 2023;
    const mockOnClose = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers();
    });
    
    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    test("Installment List should be open", async () => {
        render(<InstallmentListPopUP
            installments={mockInstallments}
            currentMonth={mockCurrentMonth}
            currentYear={mockCurrentYear}
            onClose={mockOnClose}
        />);
        const todayDateElement = screen.getByTestId('today_date');
        expect(todayDateElement).toBeInTheDocument();
        expect(todayDateElement).toHaveTextContent('15/9/2023');
    })

    it('renders the grid with correct data', () => {
        render(
            <InstallmentListPopUP
                installments={mockInstallments}
                currentMonth={mockCurrentMonth}
                currentYear={mockCurrentYear}
                onClose={mockOnClose}
            />
        );

        // Check the data in the grid columns
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('Group A')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('Officer One')).toBeInTheDocument();
        expect(screen.getByText('500')).toBeInTheDocument(); // Amount using CurrencyFormatter mock
        expect(screen.getByText('400')).toBeInTheDocument(); // Collected amount using CurrencyFormatter mock
        expect(screen.getByText('1/9/2023')).toBeInTheDocument(); // DateFormatter mock
        expect(screen.getByText('Collector One')).toBeInTheDocument();
    });

    it('handles print button click', () => {
        window.print = jest.fn();
        const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => ({
            document: {
                write: jest.fn(),
                close: jest.fn(),
                focus: jest.fn()
            },
            print: jest.fn()
        }));

        render(
            <InstallmentListPopUP
                installments={mockInstallments}
                currentMonth={mockCurrentMonth}
                currentYear={mockCurrentYear}
                onClose={mockOnClose}
            />
        );

        const printButton = screen.getByTestId('print-button');
        fireEvent.click(printButton);

        expect(mockOpen).toHaveBeenCalled();
    });

    it('handles close button click', () => {
        render(
            <InstallmentListPopUP
                installments={mockInstallments}
                currentMonth={mockCurrentMonth}
                currentYear={mockCurrentYear}
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });
})