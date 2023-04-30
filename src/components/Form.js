
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction } from "../features/transactions/transactionsSlice";

export default function Form() {
    const dispatch = useDispatch();
    const { editing } = useSelector(state => state.transaction);
    const { isLoading, isError, error } = useSelector(
        state => state.transaction
    );
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        amount: ''
    })

    useEffect(() => {
        const { id, name, type, amount } = editing || {};
        if (id) {
            setEditMode(true);
            setFormData({
                name: name,
                type: type,
                amount: amount
            })
        }
        else {
            setEditMode(false);
            reset();
        }
    },
        [editing])

    const reset = () => {
        setFormData({
            name: '',
            type: '',
            amount: ''
        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction(formData));
        reset();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const { name, type, amount } = formData;
        dispatch(changeTransaction({
                id: editing?.id, 
                data: {
                  name: name,
                  type: type,
                  amount: amount
            }
        }));
        console.log({
            id: editing?.id, 
            data: {
              name: name,
              type: type,
              amount: amount
        }
    })
        reset();
    }
    const handleChange = (e) => {
        if (e.target.name === "amount") {
            setFormData(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }))
        }
        else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const cancelEdit = () => {
        setEditMode(false);
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label htmlFor="transaction_name">Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="My Salary"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group radio">
                    <label htmlFor="transaction_type">Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={formData.type === 'income'}
                            onChange={handleChange}
                        />
                        <label htmlFor="transaction_type">Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={formData.type === 'expense'}
                            onChange={handleChange}
                        />
                        <label htmlFor="transaction_type">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="transaction_amount">Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="300"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">{editMode ? 'Update Status' : 'Add Transaction'}</button>
                {!isLoading && isError && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {editMode && <button onClick={cancelEdit} className="btn cancel_edit">Cancel Edit</button>}
        </div>
    );
}
