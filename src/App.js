import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  addIncome,
  addTrans,
  editTrans,
  editVals,
  reset,
} from "./expense/expenseSlice";
import { useEffect, useState } from "react";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transaction, setTransactions] = useState([]);

  const count = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state.expenses);

  useEffect(() => {
    setBalance(count.balance);
    setIncome(count.income);
    setExpense(count.expense);
    setTransactions(count.transactions);
  }, [count]);

  const handleClick = (trans, id) => {
    // before removing transaction obj from store, edit all other values
    dispatch(editVals(trans));

    // removing the selected card to be deleted and updating in our store
    const currTrans = wallet.transactions.filter(
      (transact) => transact.id !== id
    );
    dispatch(editTrans(currTrans));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target.desc.value;

    const temp = Number(e.target.task.value);

    const mag = {
      id: new Date().getTime() + "" + new Date().getDate(),
      note: text,
      trans: e.target.task.value,
    };

    if (temp === 0) {
      alert("Enter a Valid Transaction");
    } else if (temp > 0) {
      dispatch(addIncome(Number(e.target.task.value)));
      dispatch(addTrans(mag));
    } else if (temp < 0) {
      dispatch(addExpense(Number(e.target.task.value)));
      dispatch(addTrans(mag));
    }

    e.target.reset();
  };

  return (
    <div className="w-full py-16 border flex justify-center items-center ">
      <div className="w-[350px] h-[85%]  flex flex-col">
        <div className="w-full h-[70px]  flex flex-col items-start justify-center">
          <p className="text-2xl ">Expense Tracker</p>
        </div>

        <div className="h-[90px] w-full flex flex-col justify-evenly mb-1">
          <p className="font-semibold">YOUR WALLET BALANCE</p>

          <p>
            <span
              className={` ${
                balance === 0 ? "text-black" : ""
              } font-semibold  text-3xl ${
                balance > 0
                  ? "text-green-500"
                  : balance < 0
                  ? "text-red-500"
                  : balance === 0
                  ? "text-black"
                  : ""
              }`}
            >
              ${balance}
            </span>
          </p>
        </div>

        <div className="w-full h-[100px]  p-2  flex justify-center items-center shadow-xl border bg-white">
          <div className="w-1/2 h-[55px] flex flex-col items-center justify-center border-r-2 border-gray-500">
            <p className=" text-md font-normal">INCOME</p>
            <p className="p-2 text-2xl text-green-500">$ {income}</p>
          </div>

          <div className="w-1/2 h-[55px] flex flex-col items-center justify-center">
            <p className="font-normal text-md"> EXPENSE </p>
            <p className="p-2 text-2xl text-red-500">$ {expense}</p>
          </div>
        </div>

        <div className="w-full h-[70px] border-gray-300 border-b flex flex-col-reverse py-2">
          <p className="text-xl pb-1">History</p>
        </div>

        <div className="w-[350px] flex flex-col ">
          {transaction.map((tran) => (
            <div className="w-full flex flex-col ">
              <div
                className={`relative bg-white group shadow-lg h-[40px] w-[350px] p-2 mt-2  border-r-[6px] ${
                  tran.trans < 0 ? "border-red-500" : "border-green-500"
                } `}
              >
                <div
                  onClick={() => handleClick(tran.trans, tran.id)}
                  className=" absolute md:left-[-20px] left-[0px] flex justify-center  md:hidden md:group-hover:flex md:group-hover:justify-center
                   text-white w-[20px] h-[30px] md:h-[27px] bg-red-500 cursor-pointer"
                >
                  x
                </div>

                <div className="flex">
                  <div className="w-1/2 h-[40px] flex items-center justify-center pl-2 ">
                    {tran.note ? (
                      // we don't want more
                      <div className=" h-full ">
                        {String(tran.note).substring(0, 20)}
                      </div>
                    ) : (
                      <div className=" h-full">{tran.id}</div>
                    )}
                  </div>
                  <div className="w-1/2 h-[40px]  pl-2 flex  justify-center">
                    <p
                      className={`font-normal  ${
                        tran.trans < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ${tran.trans}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          className="mt-2 flex flex-col justify-evenly h-[300px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full h-[50px] border-gray-300 border-b flex flex-col-reverse">
            <p className="text-xl pb-1">Add New Transaction</p>
          </div>

          <div className="w-full h-[80px] flex flex-col justify-evenly">
            <p>Description</p>
            <input
              name="desc"
              placeholder="Enter Text..."
              type="text"
              className="h-[40px] p-1 pl-2 border"
            />
          </div>

          <div className="mt-2 w-full h-[100px]  flex flex-col justify-evenly">
            <p>
              Amount <br /> <span>(negative -expenses, positive -income)</span>
            </p>

            <input
              name="task"
              placeholder="Enter amount"
              type="number"
              className="h-[40px] p-1 pl-2 border"
            />
          </div>

          <button className="w-full h-[35px] bg-[#9C88FF] ">
            <p className="text-white">Enter Transaction</p>
          </button>
        </form>

        <div className="w-full flex justify-center items-center">
          <button
            className="w-[80px] h-[35px] bg-red-500 mt-3"
            onClick={(e) => {
              e.preventDefault();
              dispatch(reset());
            }}
          >
            <p className="text-white">Reset</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
