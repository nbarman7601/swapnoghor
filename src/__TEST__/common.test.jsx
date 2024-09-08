import { isAuthenticated } from "../auth";

describe("Test Auth.js", () => {
    afterEach(() => {
        // Clear all mocks after each test
        localStorage.clear();
        jest.clearAllMocks();
    })
    test("Test IsAuthenticated Auth without token", () => {
        expect(isAuthenticated()).toEqual(false);
    })

    test("Test IsAuthenticated Auth ", () => {
        localStorage.setItem("access_token", "12345")
        expect(isAuthenticated()).toEqual(true);
    })
})
