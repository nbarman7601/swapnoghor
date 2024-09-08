// src/__TEST__/AddCustomer.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddCustomer } from '../AddCustomer';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../../axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ErrorPopup } from '../../common/ErrorPopup/ErrorPopup';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../../../axios', () => ({
    get: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockStore = configureStore([thunk]);
const store = mockStore({});

describe('AddCustomer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with default state', () => {
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

  test('renders form with data when in EDIT mode', async () => {
    useParams.mockReturnValue({ id: '123' });
    useNavigate.mockReturnValue(jest.fn());
    apiService.get.mockResolvedValueOnce({
      customer: {
        name: 'John Doe',
        guardian: 'Jane Doe',
        age: '30',
        group: { _id: 'group1', name: 'Group 1' },
        phone: '1234567890',
        address: '123 Main St',
        identityProof: 'Adhaar',
        identityNo: 'A1234567'
      }
    });

    render(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    });
  });

  test('validates required fields', async () => {
    useParams.mockReturnValue({ id: undefined });
    useNavigate.mockReturnValue(jest.fn());

    render(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add Customer'));

    await waitFor(() => {
      expect(screen.getByText('Customer name is required')).toBeInTheDocument();
      expect(screen.getByText('Guardian is required')).toBeInTheDocument();
      expect(screen.getByText('Age is required')).toBeInTheDocument();
      expect(screen.getByText('Phone is required')).toBeInTheDocument();
      expect(screen.getByText('Group is required')).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('ID No is required')).toBeInTheDocument();
    });
  });

  test('handles form submission successfully', async () => {
    useParams.mockReturnValue({ id: undefined });
    useNavigate.mockReturnValue(jest.fn());
    apiService.post.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Customer Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Guardian Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '30' } });
    fireEvent.change(screen.getByPlaceholderText('(+91) 99978...'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Group'), { target: { value: 'Group 1' } });
    fireEvent.change(screen.getByPlaceholderText('ID No'), { target: { value: 'A1234567' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Main St' } });

    fireEvent.click(screen.getByText('Add Customer'));

    await waitFor(() => {
      expect(apiService.post).toHaveBeenCalledWith('/customer/create', expect.objectContaining({
        name: 'John Doe',
        guardian: 'Jane Doe',
        age: '30',
        phone: '1234567890',
        group: expect.any(String),
        address: '123 Main St',
        identityProof: 'Adhaar',
        identityNo: 'A1234567'
      }));
    });
  });

  test('displays error popup on API error', async () => {
    useParams.mockReturnValue({ id: undefined });
    useNavigate.mockReturnValue(jest.fn());
    apiService.post.mockRejectedValueOnce({ data: { error: 'Failed to add customer' } });

    render(
      <Provider store={store}>
        <AddCustomer />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Customer Name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Add Customer'));

    await waitFor(() => {
      expect(screen.getByText('Failed to add customer')).toBeInTheDocument();
    });
  });
});
