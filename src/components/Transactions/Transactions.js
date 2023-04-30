import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import Loader from "../../ui/loader/Loader";
import { useEffect } from "react";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";

export default function Transactions() {
    const { transactions, isLoading, isError, error } = useSelector(state => state.transaction) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])

    //let decide what to render
    let content = '';
    if (isLoading) content = <Loader />;
    if (!isLoading && isError) content = <p style={{ color: 'red' }}>{error}</p>;
    if (!isLoading && !isError && transactions?.length === 0) content = <span>No Transaction Found!</span>;
    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions?.map(
            
            transaction => 
              {
              console.log(transactions);

                return(<Transaction key={transaction.id} transaction={transaction} />)}
        )
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
