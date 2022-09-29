import React from "react";
import { useState, useEffect } from "react";
import thismonth from './icons/thismonth.svg';
import unsub from './icons/unsub.svg';
import email_list from './icons/email_list.svg';


const LEAD_API = 'http://127.0.0.1:8000/api/email_list/';
const month = new Date().toLocaleString("en-US", { month: "long" })
const year = new Date().getFullYear();

export default function EmailList() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const monthCountArr = new Array(12).fill(null);
  const [new_this_month, setNewSubs] = useState(null);

  useEffect(() => {
    fetch(LEAD_API)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
        actualData.forEach(({ added_at }) => monthCountArr[new Date(added_at).getMonth()] += 1);
        setNewSubs(monthCountArr[new Date().getMonth()]); 
        console.log(`New email in ${month} : ${monthCountArr[new Date().getMonth()]}`);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const ubsubCountArr = new Array(2).fill(null);
  const [total_email, setLength] = useState(null);
  const [unsubscribed, setUnSubs] = useState(null);
  useEffect(() => {   
    
    setLength(data&&data.length);
    data&&data.forEach(({ status }) => {if(status === "Unsubscribed"){
      ubsubCountArr[1] += 1
    }});
    setUnSubs(ubsubCountArr[1]);  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  
  

  return (
    
    <main>
      <div className="container">
        <h2 className="tittle">{`${month} ${year}`}</h2>
        <div className="insights">
            <div>
                <div className='icon-wrapper'>
                  <img src={email_list} width="50" height="50" alt='icon-list'/>
                </div>
                
                <h3>Email List</h3>
                <h1 id="total-order">{total_email}</h1>
            </div>
            <div>
              <div className='icon-wrapper'>
                  <img src={thismonth} width="50" height="50" alt='icon-this-month'/>
              </div>
              <h3>New This Month</h3>
              <h1 id="ongoing-order">{new_this_month}</h1>
            </div>            
            <div>
              <div className='icon-wrapper'>
                  <img src={unsub} width="50" height="50" alt='icon-unsub'/>
              </div>
              <h3>Unsubscribed</h3>
              <h1 id="complete-order">{unsubscribed}</h1>
            </div>
        </div>
        <div className="email-list">
          <h2>Email List</h2>
            {loading && <p>Please wait...</p>}
            {/* error handler */}
            {error && (
              <p>{`There is a problem fetching the data - ${error}`}</p>

            )}
          <table>
            <thead>
              <tr>
                <th>Email ID</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead> 

            {data &&
            data.map(({email, timesince, status }) => (
              <tbody key={email}>
                <tr>
                  <td>{email}</td>
                  <td>{timesince}</td>
                  <td>{status}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>  
      </div>
    </main>
  );
 }





