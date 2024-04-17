import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  const [result, setResult] = useState(0);
  const fetchSum = async (a : number, b : number) => {
    const response = await
      axios.get(`${API_BASE}/a5/add/${a}/${b}`);
    setResult(response.data);
  };
  const fetchSubtraction = async (a : number, b : number) => {
    const response = await axios.get(
      `${API_BASE}/a5/subtract/${a}/${b}`);
    setResult(response.data);
  };
  const fetchMultiplication = async (a : number, b : number) => {
    const response = await axios.get(
      `${API_BASE}/a5/multiply/${a}/${b}`);
    setResult(response.data);
  };
  const fetchDivision = async (a : number, b : number) => {
    const response = await axios.get(
      `${API_BASE}/a5/divide/${a}/${b}`);
    setResult(response.data);
  };
  useEffect(() => { fetchSum(a, b) }, []);
  useEffect(() => { fetchSubtraction(a, b) }, []);
  useEffect(() => { fetchMultiplication(a, b) }, []);
  useEffect(() => { fetchDivision(a, b) }, []);

  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Calculator</h4>
      <input className="form-control mb-2" type="number" value={a}
        onChange={(e) => setA(Number(e.target.value))}/>
      <input className="form-control mb-2" type="number" value={b}
        onChange={(e) => setB(Number(e.target.value))} />
      <input className="form-control mb-2" value={result} type="number" readOnly />
      <h3>Fetch Result</h3>
      <button  className="btn btn-primary me-2" onClick={() => fetchSum(a, b)} >
        Fetch Sum of {a} + {b}
      </button>
      <button className="btn btn-danger me-2" onClick={() => fetchSubtraction(a, b)} >
        Fetch Substraction of {a} - {b}
      </button>
      <button className="btn btn-danger me-2" onClick={() => fetchMultiplication(a, b)} >
        Fetch Multiplication of {a} * {b}
      </button>
      <button className="btn btn-danger" onClick={() => fetchDivision(a, b)} >
        Fetch Division of {a} / {b}
      </button>
  
      <h3>Path Parameters</h3>
      <a className="btn btn-primary me-2" href={`${API_BASE}/a5/add/${a}/${b}`}>
        Add {a} + {b}
      </a>
      <a className="btn btn-danger me-2" href={`${API_BASE}/a5/subtract/${a}/${b}`}>
        Substract {a} - {b}
      </a>
      <a className="btn btn-danger me-2" href={`${API_BASE}/a5/multiply/${a}/${b}`}>
        Multiply {a} * {b}
      </a>
      <a className="btn btn-danger" href={`${API_BASE}/a5/divide/${a}/${b}`}>
        Divide {a} / {b}
      </a>


      <h3>Query Parameters</h3>
      <a className="btn btn-primary me-2"
        href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}>
        Add {a} + {b}
      </a>
      <a className="btn btn-danger me-2"
        href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
        Substract {a} - {b}
      </a>
      <a className="btn btn-danger me-2"
        href={`${API_BASE}/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
        Multiply {a} * {b}
      </a>
      <a className="btn btn-danger"
        href={`${API_BASE}/a5/calculator?operation=divide&a=${a}&b=${b}`}>
        Divide {a} / {b}
      </a>

    </div>
  );
}
export default EncodingParametersInURLs;