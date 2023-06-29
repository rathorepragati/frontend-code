import React, { useState } from "react";
import axios from "axios";
import "./Table.css";

export default function Main() {
    const [name, setName] = useState("");
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");

    const [email, setEmail] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");
    const [status, setStatus] = useState(true);
    const [data, setData] = useState([]);

    console.log("name:" + name, name1, name2);
    console.log("email:" + email, email1, email2);
    console.log("data:", data[0]);


    const getData = async () => {
        axios
            .get("http://localhost:8000/api/users")
            .then((res) => {
                console.log("Backend response", res.data);
                console.log("data:", data);
                setName(res.data.data[0].name);
                setName1(res.data.data[1].name);
                setName2(res.data.data[2].name);

                setEmail(res.data.data[0].email);
                setEmail1(res.data.data[1].email);
                setEmail2(res.data.data[2].email);

                setData(res.data.data);
                setStatus(false);

            })
            .catch((err) => {
                console.log("Backend Error", err);
            })
    }
    return (
        <div>
            <h1> Welcome to
                {name == "" ?
                    "All Students"
                    : (
                        <table>
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th colSpan={2} align="center">Action</th>
                            </tr>

                            {data.map((item, i) => {
                                return (

                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td><button className="up">Update</button></td>
                                        <td><button className="del">Delete</button></td>
                                    </tr>
                                );
                            })}
                            
                            {/* <tr>
                        <td>2</td>
                        <td>{name1}</td>
                        <td>{email1}</td>
                        <td><button className="up">Update</button></td>
                         <td><button className="del">Delete</button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{name2}</td>
                        <td>{email2}</td>
                        <td><button className="up">Update</button></td>
                         <td><button  className="del">Delete</button></td>
                    </tr> */}
                        </table>

                    )}
            </h1>
            {status ? (
                <button onClick={getData}>Get Data</button>
            ) :
                <button onClick={getData} style={{ cursor: "not-allowed" }} disabled>
                    Get Data
                </button>
            }
        </div>
    );
}
