import { useState } from "react";

export default function App() {
  const [item, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id){
    setItem(items => items.map(item => item.id === id ? {...item, packed: !item.packed}: item))
  }

  function handleClearList(){
    const confirm = window.confirm('Are you sure you want to delete this file?')
    if (confirm) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <ParkingList items={item} onClearList ={handleClearList} onDeleteItem={handleDeleteItem} onToggleItem={handleToggle}/>
      <Stats items={item}/>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for you 😍 trip</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}

function ParkingList({ items, onDeleteItem, onToggleItem, onClearList}) {
  const [sortBy, setSortBy] = useState('input');

  let sortByItem;

  if(sortBy === 'input') sortByItem = items;

  if (sortBy === 'description') {
     sortByItem = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  }

  if(sortBy === 'packed' ) {
     sortByItem = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  }

  
  return (
    <div className="list">
      <ul>
        {sortByItem.map((items) => (
          <Items items={items} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} key={items.id} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort items by inputs</option>
          <option value="description">Sort items by description</option>
          <option value="packed">Sort items by packed items </option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>

    </div>
  );
}

function Items({ items, onDeleteItem,onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={items.packed}  onChange={() => onToggleItem(items.id)}/>
      <span>
        {items.quantity}
      </span>
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.description}
      </span>
      <button onClick={() => onDeleteItem(items.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
  if(!items.length) {
    return(
      <p className="stats">
        <em>
          Start adding some item to you packing list 🚀
        </em>
      </p>
    )
  } 

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;

  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
      {percentage === 100 ? "You got everthing! ready to go ✈️" :
      `💼 You have ${numItems} items on your list and you alredy parked ${numPacked} (${percentage}%)`
      }
      </em>
    </footer>
  );
}

///////////////////////////
/////Praticals

// export default function App() {
//   const date = new Date();
//   const [step,setStep] = useState(1)
//   const  [count, setCount] = useState(0)
//   date.setDate(date.getDate() + count);

//   function reduceSteps() {
//     setStep(s => s - 1);
//   }
//   function increaseSteps(){
//     setStep(s => s + 1)
//   }
//   function reduceCount(){
//     setCount(c => c - step);
//   }
//   function increaseCount(){
//     setCount(c => c + step);
//   }

//   return (
//     <div className="container">
//       <div className="btn-container">
//         <button onClick={reduceSteps}> - </button> <p>Step: {step}</p> <button onClick={increaseSteps}> + </button>
//       </div>
//       <div className="btn-container">
//         <button onClick={reduceCount}> - </button> <p>Count: {count}</p> <button onClick={increaseCount}> + </button>
//       </div>
//       <h3>{count} days from today is {date.toDateString()}</h3>
//     </div>
//   );
// }

////////////////////
//steps projects

// const messages = [
//   "Learn React ⚛️",
//   "Apply for jobs 💼",
//   "Invest your new income 🤑",
// ];

// export default function App() {
//     const [step, setStep] = useState(1);
//     const [isOpen, setIsOpen] = useState(true);

//     function handlePrevious(){
//         if (step > 1) setStep(s => s-1);// always use a callback when updating on the current state else you can update directly
//     }
//     function handleNext(){
//         if (step < 3) setStep(s => s+1);
//     }

//   return (
//     <>
//     <button className="close" onClick={() => setIsOpen(is => !is)}>
//         &times;
//     </button>
//     { isOpen && (
//         <div className="steps">
//             <div className="numbers">
//                 <div className={step >= 1 ? "active" : ""}>1</div>
//                 <div className={step >= 2 ? "active" : ""}>2</div>
//                 <div className={step >= 3 ? "active" : ""}>3</div>
//             </div>

//             <p className="message">
//                 Steps {step}: {messages[step - 1]}
//             </p>

//             <div className="buttons">
//                 <button onClick={handlePrevious} style={{ background: "#7950f2", color: "#fff" }}>
//                 Previous
//                 </button>
//                 <button onClick={handleNext} style={{ background: "#7950f2", color: "#fff" }}>Next</button>
//             </div>
//         </div>)}
//     </>
//   );
// }
