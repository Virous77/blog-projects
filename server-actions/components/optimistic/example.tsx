"use client";

import { createData } from "./action";
import { useOptimistic, startTransition } from "react";

type TData = {
  id: number;
  like: number;
};

// dummy data you can replace with your own data from the server
const data = [
  {
    id: 1,
    like: 1,
  },
  {
    id: 2,
    like: 2,
  },
];

const Example = () => {
  return (
    <section>
      {data.map((item) => (
        <DataList key={item.id} data={item} />
      ))}
    </section>
  );
};

export default Example;

const DataList = ({ data }: { data: TData }) => {
  const [state, setState] = useOptimistic(data, (data, { like }) => {
    return { ...data, like };
  });

  const handleAction = (e: TData) => {
    try {
      setState({ like: e.like + 1 });
      createData(e);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <p>{state.like}</p>
      <button onClick={() => startTransition(() => handleAction(data))}>
        Like
      </button>
    </div>
  );
};
