import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { useDispatch } from "react-redux";
import { activeEdit, removeTransaction } from "../../features/transactions/transactionsSlice";

export default function Transaction({ transaction }) {
    const {id, name, type, amount } = transaction || {};
    const dispatch = useDispatch();
    const handleEdit=()=>{
        dispatch(activeEdit(transaction))
    }

    const handleDelete=()=>{
        dispatch(removeTransaction(id))
    }
    return (
        <li className={type === "income" ? 'transaction income' : 'transaction expense'}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link">
                    <img alt="Edit" onClick={handleEdit} className="icon" src={editImage} />
                </button>
                <button onClick={handleDelete} className="link">
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
