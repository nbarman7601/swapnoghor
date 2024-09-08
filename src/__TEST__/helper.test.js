import { debounce } from "../helper";

describe("Helper js test", ()=>{
    jest.useFakeTimers(); // Use fake timers in Jest

    test('should debounce function calls and only call after the delay', () => {
        const func = jest.fn(); 
        const debouncedFunc = debounce(func, 1000);
        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        // Fast forward time, but not past the delay yet
        jest.advanceTimersByTime(500);
        
        // Expect that the function hasn't been called yet
        expect(func).not.toBeCalled();

        // Fast forward time past the delay
        jest.advanceTimersByTime(500);

        // Now the function should be called once, even though it was called multiple times
        expect(func).toBeCalledTimes(1);
    });

    test('should pass the correct arguments to the debounced function', () => {
        const func = jest.fn();
        const debouncedFunc = debounce(func, 1000);

        debouncedFunc('arg1', 'arg2');

        jest.advanceTimersByTime(1000); // Advance timers to trigger the debounced call

        // Expect that the original function was called with the right arguments
        expect(func).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should reset the timer if called again before delay', () => {
        const func = jest.fn();
        const debouncedFunc = debounce(func, 1000);

        debouncedFunc();

        // Move time forward by 900ms
        jest.advanceTimersByTime(900);

        // Call the debounced function again before the delay completes
        debouncedFunc();

        // Move time forward by 900ms again
        jest.advanceTimersByTime(900);

        // Function still should not have been called yet
        expect(func).not.toBeCalled();

        // Move forward by the remaining time (100ms), now the function should be called
        jest.advanceTimersByTime(100);

        expect(func).toBeCalledTimes(1);
    });
}) 