import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainbox1: {
        width: "100%",
        height: 330,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input1: {
        width: "45%",
        height: 30,
    },
    input2: {
        width: "91%",
        height: 30,
    },
    submit1: {
        width: "50%",
        height: 50,
        marginTop: 25,
        '&:hover': {
            cursor: "pointer",
        },

    },
    itemHov: {
        '&:hover': {
            cursor: "pointer",
        },
    },

    box2: {
        border: "2px solid black",
        width: "80%",
        height: 90,
        display: "flex",
        flexDirection: "row"
    },
    box2Div: {
        border: "2px solid black",
        backgroundColor: "#646060;",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    delele1: {
        '&:hover': {
            cursor: "pointer",
        },
        border: "2px solid black",
        backgroundColor: "#646060;",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    nameele1: {
        '&:hover': {
            cursor: "pointer",
        },
        border: "2px solid black",
        backgroundColor: "#646060;",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }




}));


const Home = () => {

    const classes = useStyles();

    const initialState = { first_name: "", last_name: "", phone_no: "" };
    let [formValue, setformValue] = useState([]);
    let [displayValue, setDisplayValue] = useState([]);
    const [tempFormValue, setTempFormValue] = useState(initialState);
    const [mapKey, setMapKey] = useState(0);
    const [search, setSearch] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;
        setTempFormValue({ ...tempFormValue, [name]: value });
    };

    const handleSubmit = async () => {
        let cnt = 1;
        setformValue((prevstate) => {
            let var1 = prevstate;
            if (cnt === 1) {
                let flag = false;
                for (let key in var1) {
                    if (var1[key].first_name === tempFormValue.first_name) {
                        if (var1[key].last_name === tempFormValue.last_name) {
                            flag = true;
                            break;
                        }

                    }
                    if (var1[key].phone_no === tempFormValue.phone_no) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    var1.push(tempFormValue);
                }


                cnt--;
            }
            return var1;

        });
        setMapKey(Math.random());
        setDisplayValue(formValue);
    }


    const handleSearch = () => {
        if (search === "" || search === undefined) {
            setDisplayValue(formValue);
        }
        else {
            setDisplayValue((prevstate) => {
                let var1 = formValue.filter(
                    (info) => {
                        return (info.first_name.toLowerCase().includes(search) || info.last_name.toLowerCase().includes(search))
                    }

                );
                return var1;
            })
        }

    };

    const handleDelete = (e) => {
        let cnf = window.confirm("Are you Sure ? ");
        if (cnf) {
            const { id } = e.target;
            let cnt = 1;
            let var1;
            setDisplayValue((prevstate) => {
                if (cnt === 1) {
                    var1 = displayValue.filter(
                        (info, index) => {
                            return ((index != id));
                        }

                    );
                    cnt--;

                }
                setformValue(var1);
                return var1;

            });

        }


    };


    const com = (item1, item2) => {
        if (item1.first_name < item2.first_name) {
            return -1;
        }
        else if (item1.first_name > item2.first_name) {
            return 1;
        }
        else {
            if (item1.last_name < item2.last_name) {
                return -1;
            }
            else if (item1.last_name > item2.last_name) {
                return 1;
            }
        }
    }
    const handleSort = () => {
        displayValue.sort(com);
        setMapKey(Math.random());
    }


    return (
        <>


            <div className={classes.mainbox1}>
                <div style={{ width: "50%" }}>
                    <h3>Person's name</h3>
                    <input type="text" className={classes.input1} placeholder='First Name' name="first_name" id="" onChange={handleChange} />
                    <input type="text" className={classes.input1} placeholder='Last Name' name="last_name" id="" onChange={handleChange} />
                </div>
                <div style={{ width: "50%" }}>
                    <h3>Contact No</h3>
                    <input type="text" className={classes.input2} name="phone_no" id="" onChange={handleChange} />
                </div>
                <div className={classes.submit1} onClick={handleSubmit}>
                    <div style={{ width: "92%", height: "100%", backgroundColor: "#49d9aa", border: "2px solid black", textAlign: "center", lineHeight: 3 }} >
                        Submit
                    </div>

                </div>
            </div>

            <div style={{ width: "100%", marginTop: 50, display: "flex", justifyContent: "center" }}>
                <input placeholder='Search by Name' style={{ width: "85%", height: 30, borderRadius: "10px 0px 0px 10px" }} type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} />
                <div className={classes.itemHov} style={{ display: "flex", height: 34, width: 37, backgroundColor: "wheat" }} onClick={handleSearch}>
                    <img style={{ height: 34, width: 50, border: "1px solid black" }} src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png" alt="" />
                </div>


            </div>
            <div style={{ width: "100%", marginTop: 50, display: "flex", alignItems: "center", flexDirection: "column" }} key={mapKey}>

                <div className={classes.box2}>

                    <div className={classes.box2Div} style={{ width: "15%" }}>Sn No</div>
                    <div className={classes.nameele1} style={{ width: "35%" }} onClick={handleSort}>Name</div>
                    <div className={classes.box2Div} style={{ width: "25%" }}>Contact</div>
                    <div className={classes.box2Div} style={{ width: "25%" }}>Delete</div>

                </div>
                {
                    displayValue.map((item, index) => {

                        return (
                            <div key={index} className={classes.box2}>

                                <div className={classes.box2Div} style={{ width: "15%", backgroundColor: "#bbb8b8", }}>{index + 1}</div>
                                <div className={classes.box2Div} style={{ width: "35%", backgroundColor: "#bbb8b8", }}>{item.first_name + " " + item.last_name}</div>
                                <div className={classes.box2Div} style={{ width: "25%", backgroundColor: "#bbb8b8", }}>{item.phone_no}</div>
                                <div className={classes.delele1} style={{ width: "25%", backgroundColor: "#bbb8b8", }} id={index} onClick={handleDelete}>X</div>

                            </div>
                        )

                    })
                }

            </div>






        </>
    )
}

export default Home