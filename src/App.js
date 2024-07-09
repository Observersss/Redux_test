import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCashAction, getCashAction } from './store/cashReducer';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asycnAction/customers';

function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash);
    const customers = useSelector(state => state.customers.customers);

    const addCash = (cash) => {
        dispatch(addCashAction(cash));
    };

    const getCash = (cash) => {
        dispatch(getCashAction(cash));
    };

    const addCustomers = (name) => {
        const customer = {
            name,
            id: Date.now(),
        };
        dispatch(addCustomerAction(customer));
    };

    const removeCustomers = (customer) => {
        dispatch(removeCustomerAction(customer.id));
    };

    return (
        <div className="App">
            <div className="content">
                <div>
                    <h1 style={{ textAlign: 'center' }}>{cash}</h1>
                    <div className='content__button'>
                        <button onClick={() => addCash(Number(prompt()))}>Add cash</button>
                        <button onClick={() => getCash(Number(prompt()))}>Get cash</button>
                        <button onClick={() => addCustomers(prompt())}>Add customers</button>
                        <button onClick={() => removeCustomers(prompt())}>Remove customers</button>
                        <button onClick={() => dispatch(fetchCustomers())}>Get all users from db</button>
                    </div>
                </div>
                <div>
                    {customers.length > 0 ? (
                        <div>
                            {customers.map(el => (
                                <div
                                    key={el.id}
                                    onClick={() => removeCustomers(el)}
                                    style={{ margin: 10, border: "1px solid teal", padding: 10, borderRadius: 10 }}
                                >
                                    {el.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ marginTop: 20, fontSize: '2rem' }}>Sorry customers not found</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
