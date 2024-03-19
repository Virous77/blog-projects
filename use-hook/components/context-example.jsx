"use client";

import { AppContext } from "@/contexts/app-context";
import { use, useState } from "react";

// Example one
// const ContextExample = () => {
//   const { state, setState } = use(AppContext);

//   return (
//     <div>
//       <h1>{state}</h1>
//       <button onClick={() => setState("Hello from context component!")}>
//         Change
//       </button>
//     </div>
//   );
// };

// Example two

const ContextExample = () => {
  const [active, setActive] = useState(false);

  if (active) {
    const { state, setState } = use(AppContext);
    return (
      <div>
        <h1>{state}</h1>
        <button onClick={() => setState("Hello from context component!")}>
          Change
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Click the button to activate the context</h1>
      <button onClick={() => setActive(true)}>Activate</button>
    </div>
  );
};

export default ContextExample;
