import { useState, useEffect } from "react";

const useFetch = (url) => {
  const abortContent = new AbortController();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url, { signal: abortContent.signal })
        .then((res) => {
          if (res.ok === false) throw Error("Could not fetch Data");
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setData(false);
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 500);
    return () => abortContent.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
