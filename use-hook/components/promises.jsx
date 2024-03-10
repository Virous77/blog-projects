import { fetchPost, fetchPostError } from "@/api/api";
import PromisesExample from "./promises-example";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

// Example one
const PromiseComp = () => {
  const promisePost = fetchPost(1);
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <PromisesExample promisePost={promisePost} />
      </Suspense>
    </div>
  );
};

// Example two
// const PromiseComp = () => {
//   const promisePost = fetchPostError(1);

//   return (
//     <div>
//       <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
//         <Suspense fallback={"Loading..."}>
//           <PromisesExample promisePost={promisePost} />
//         </Suspense>
//       </ErrorBoundary>
//     </div>
//   );
// };

// Example three
// const PromiseComp = () => {
//   const promisePost = new Promise((resolve, reject) => {
//     fetchPostError(1)
//       .then((res) => resolve(res))
//       .catch((error) => {
//         resolve(error.message || "Something went wrong");
//       });
//   });

//   return (
//     <div>
//       <Suspense fallback={"Loading..."}>
//         <PromisesExample promisePost={promisePost} />
//       </Suspense>
//     </div>
//   );
// };

export default PromiseComp;
