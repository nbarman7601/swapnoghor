import {
    FETCH_DASHBOARD_COUNT_REQUEST,
    SET_DASHBOARD_COUNT,
    SET_DASHBOARD_ERROR
} from "../actions/dashboard.action";

const initialState = {
    loading: false,
    count: {
        "outOfStock": 2,
        "disbusedLoan": {
            "today": 0,
            "thisWeek": 0,
            "thisMonth": 0
        },
        "uniqueCustomersCount": 0,
        "totalLoanAmount": [
            {
                "_id": null,
                "totalAmount": 0
            }
        ],
        "totalOutstanding": [
            {
                "_id": null,
                "totalAmount": 0
            }
        ],
        "totalOverdueAmount": [
            {
                "_id": null,
                "totalAmount": 0
            }
        ]
    },
    error: null
}

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_COUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_DASHBOARD_COUNT:
            return {
                ...state,
                loading: false,
                count: action.payload
            }
        case SET_DASHBOARD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}