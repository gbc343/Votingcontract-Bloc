import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { request, sendAlert } from "../module/util";
import DatePicker from "react-datepicker";
const Admin = () => {
    const [login, setLogin] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        // check to username and password  
        // TODO:use hashed password
        setLogin(localStorage.getItem('admin'))
        if(e.target.username.value=="admin" && e.target.password.value=="123456")
          localStorage.setItem(e.target.username.value, e.target.password.value) 
         else sendAlert('Username or Password is wrong', 'error')
    }
    const setupDeadline = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        data.append('admin', localStorage.getItem('admin'))
        var inputDateStart = new Date(startDate).getTime();
        var todaysDateStart = new Date().getTime();
        var todaysDateEnd = new Date(endDate).getTime();
        if (inputDateStart < todaysDateStart) {
            sendAlert('Start date not validate', 'error')
            return
        }
        if (todaysDateEnd <= inputDateStart) {
            sendAlert('End date not validate', 'error')
            return
        }
        setEndDate(startDate);
        setStartDate(endDate);
    }
    useEffect(() => {
        if (localStorage.getItem('admin'))
            setLogin(localStorage.getItem('admin'))
    })
    return (
        <>
            {
                (login ?
                    <div className="card mt-5">
                        <div className="card-header">
                            <h2>Set up deadline</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={setupDeadline}>
                                <div className="mb-3">
                                    <label className="form-label">Start date</label>
                                    {/* <input type="date" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} className="form-control" required /> */}
                                    <DatePicker showTimeSelect dateFormat="Pp" selected={startDate} onChange={(e) => setStartDate(e)} name="startDate" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End date</label>
                                    <DatePicker showTimeSelect dateFormat="Pp" selected={endDate} onChange={(e) => setEndDate(e)} name="endDate" className="form-control" required />
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                    </div> :
                    <div className="card mt-5">
                        <div className="card-header">
                            <h2>Login Admin</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" name="username" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" required />
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                    </div>)
            }
        </>


    );
};

export default Admin;
