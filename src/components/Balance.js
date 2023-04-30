import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithcommas";

export default function Balance() {
    const  {transactions} = useSelector(state=> state.transaction);
    const calculation=(transactions)=>{
     let incomeResult = 0;
        transactions.forEach(
            transaction=>{
                const {type, amount} =transaction;
                if(type === "income"){
                    incomeResult += amount;
                }else{
                    incomeResult -= amount;
                }
            }
            
        )
        return incomeResult;
    }

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                <span>{transactions?.length > 0 ? numberWithCommas(calculation(transactions)) : 0}</span>
            </h3>
        </div>
    );
}
