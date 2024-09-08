import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from "redux-thunk";
import { AddCustomer } from '../AddCustomer';
import { useNavigate, useParams } from 'react-router-dom';


jest.mock("../../../axios", ()=>({
    get: jest.fn(),
    post: jest.fn()
}))

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useParams: jest.fn()
}))
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('AddCustomer Component', () => {
    let store;

    beforeEach(() => {
        // Create the store with initial state
        store = mockStore({
            name: ""
        });

        // Mock useParams and useNavigate hooks
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: undefined });
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(jest.fn());
    });

    test('renders AddCustomer component', () => {
        const initialState = {}
        const store = mockStore(initialState)
        useParams.mockReturnValue({ id: undefined }); 
        useNavigate.mockReturnValue(jest.fn());
        render(
            <Provider store={store}>
                <AddCustomer />
            </Provider>
        );

        expect(screen.getByText('Customer Detail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Customer Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Guardian Name')).toBeInTheDocument();
    });
});
