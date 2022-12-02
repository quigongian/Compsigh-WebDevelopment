import React, { useEffect, useState } from "react";
import bottomWave from "../../image_content/bottomWave.svg";
import midWave from "../../image_content/midWave.svg";
import secondWave from "../../image_content/secondWave.svg";
import CalendarTracker from "./CalendarTracker";
import "./check-in.css";
import { TextField, MenuItem } from "@mui/material";
import { createCheckIn, getPaginatedCheckIns } from "../../services/requests";
import { CheckIn as CheckInType, CheckInStatus } from "../../services/models";
import { HttpStatusCode } from "../../services/http-client";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const month = months[new Date().getMonth()];
const day = new Date().getDate();
const year = new Date().getFullYear();

export const CheckIn = () => {
    const defaultCheckIn: CheckInType = {
        checkInId: 0,
        answer2: "No data available",
        answer3: "No data available",
        answer4: "No data available",
        comments: "No data available",
        checkInStatus: CheckInStatus.NEUTRAL,
        createdAt: "No data available",
    };
    const [checkIns, setCheckIns] = useState<CheckInType[]>([]);
    const [checkIn, setCheckIn] = useState<CheckInType>(defaultCheckIn);
    const [stale, setStale] = useState<boolean>(false);

    useEffect(() => {
        getPaginatedCheckIns()
            .then((response) => {
                if (response.status === HttpStatusCode.Ok) {
                    setCheckIns(response.data);
                } else {
                    console.log("Error", response.statusText);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [stale]);

    const onPickDateHandler = (pickedDate: Date) => {
        pickedDate.setHours(0, 0, 0, 0);
        console.log("PickedDate at 0,0,0,0", pickedDate);
        const matchingCheckIn = checkIns.find(
            (c) =>
                new Date(c.createdAt).setHours(0, 0, 0, 0) ===
                pickedDate.getTime()
        );
        setCheckIn(matchingCheckIn || defaultCheckIn);
    };

    const onCreateCheckInHandler = () => {
        setStale((st) => !st);
    };

    return (
        <>
            <div className="checkin-container">
                <div className="checkin-header" style={{ marginBottom: "0" }}>
                    <h2
                        style={{
                            marginLeft: "20%",
                            color: "#FFFFFF",
                            lineHeight: "0%",
                            marginTop: "3%",
                            fontSize: "45px",
                            fontWeight: "600",
                        }}
                    >
                        Hey [name], how was your day?
                    </h2>
                    <p
                        style={{
                            marginLeft: "20%",
                            fontWeight: "lighter",
                            color: "#FFFFFF",
                            lineHeight: "35px",
                            fontSize: "25px",
                        }}
                    >
                        {month} {day}, {year}
                    </p>
                </div>
                <Questions onCreate={onCreateCheckInHandler} />
                <CalendarTracker onPickDate={onPickDateHandler} />
                <Previous checkIn={checkIn} />

                <img
                    className="wave one"
                    src={bottomWave}
                    alt=""
                    width={"100%"}
                />
                <img className="wave two" src={midWave} alt="" width={"100%"} />
                <img
                    className="wave three"
                    src={secondWave}
                    alt=""
                    width={"100%"}
                />
            </div>
        </>
    );
};

// ---------------------------------------------- Questions Container ----------------------------------------------
const Questions = (props: { onCreate: () => void }) => {
    const q1Ref = React.useRef<HTMLInputElement>(null);
    const q2Ref = React.useRef<HTMLInputElement>(null);
    const q3Ref = React.useRef<HTMLInputElement>(null);
    const q4Ref = React.useRef<HTMLInputElement>(null);
    const q5Ref = React.useRef<HTMLInputElement>(null);

    const submitHandler = () => {
        const q1 = q1Ref.current?.value;
        const q2 = q2Ref.current?.value;
        const q3 = q3Ref.current?.value;
        const q4 = q4Ref.current?.value;
        const q5 = q5Ref.current?.value;
        if (q1 && q2 && q3 && q4 && q5) {
            let status: CheckInStatus;
            switch (q1) {
                case "Great":
                    status = CheckInStatus.GOOD;
                    break;
                case "Alright":
                    status = CheckInStatus.NEUTRAL;
                    break;
                case "Terrible":
                    status = CheckInStatus.BAD;
                    break;
                default:
                    console.log("Invalid status");
                    status = CheckInStatus.NEUTRAL;
            }
            createCheckIn({
                answer2: q2,
                answer3: q3,
                answer4: q4,
                comments: q5,
                checkInStatus: status,
            })
                .then((response) => {
                    if (response.status === HttpStatusCode.Created) {
                        console.log("Check in created");
                        props.onCreate();
                    } else {
                        console.log("Error", response.statusText);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <div className="questions-container">
                <div className="questions">
                    <Question1 ref={q1Ref} />
                    <Question2 ref={q2Ref} />
                    <Question3 ref={q3Ref} />
                    <Question4 ref={q4Ref} />
                    <Question5 ref={q5Ref} />
                    <div className="button-container">
                        <button className="button" onClick={submitHandler}>
                            {" "}
                            Submit{" "}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const Question1 = React.forwardRef((_, ref) => {
    return (
        <>
            <p style={{ marginBottom: "0" }}>
                How productive would you say you were today?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 30,
                    },
                }}
                id="standard_basic"
                select
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                inputRef={ref}
            >
                <MenuItem value="Great">Great</MenuItem>
                <MenuItem value="Alright">Alright</MenuItem>
                <MenuItem value="Terrible">Terrible</MenuItem>
            </TextField>
        </>
    );
});

const Question2 = React.forwardRef((_, ref) => {
    return (
        <>
            <p style={{ marginBottom: "0" }}>
                Have you completed all your tasks?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 30,
                    },
                }}
                id="standard_basic"
                select
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                inputRef={ref}
            >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="Somewhat">Somewhat</MenuItem>
                <MenuItem value="No">No, not at all</MenuItem>
            </TextField>
        </>
    );
});

const Question3 = React.forwardRef((_, ref) => {
    return (
        <>
            <p style={{ marginBottom: "0" }}>
                Are you making any progress towards your goals?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 30,
                    },
                }}
                id="standard_basic"
                select
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                inputRef={ref}
            >
                <MenuItem value="Yes">Yes, today I have</MenuItem>
                <MenuItem value="No">
                    No, I have not been making progress
                </MenuItem>
            </TextField>
        </>
    );
});

const Question4 = React.forwardRef((_, ref) => {
    return (
        <>
            <p style={{ marginBottom: "0" }}>
                Do you foresee any problems in progress?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 30,
                    },
                }}
                id="standard_basic"
                select
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                inputRef={ref}
            >
                <MenuItem value="Yes">Definitely</MenuItem>
                <MenuItem value="No">Possibly</MenuItem>
                <MenuItem value="No">No</MenuItem>
            </TextField>
        </>
    );
});

const Question5 = React.forwardRef((_, ref) => {
    return (
        <>
            <p style={{ marginBottom: "0" }}>If so, what are those problems?</p>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={3.2}
                inputProps={{ maxLength: 250 }}
                className="textfield"
                inputRef={ref}
            />
        </>
    );
});

// ---------------------------------------------- Calendar Container ----------------------------------------------
// const Calendar = () => {
//   return <div className="calendar">
//     <Calendar />
//   </div>;
// };

// ---------------------------------------------- Previous Container ----------------------------------------------
const Previous = (props: { checkIn: CheckInType }) => {
    return (
        <div className="previous">
            <p
                style={{
                    marginLeft: "73%",
                    marginTop: "0%",
                    fontWeight: "lighter",
                    color: "#FFFFFF",
                    lineHeight: "10px",
                    fontSize: "13px",
                }}
            >
                {month} {day}, {year}
            </p>
            <Previous1 value={props.checkIn.checkInStatus} />
            <Previous2 value={props.checkIn.answer2} />
            <Previous3 value={props.checkIn.answer3} />
            <Previous4 value={props.checkIn.answer4} />
            <Previous5 value={props.checkIn.comments} />
        </div>
    );
};

const Previous1 = (props: { value: string }) => {
    return (
        <>
            <p className="previous-questions" style={{ marginBottom: "0" }}>
                How productive would you say you were today?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 20,
                    },
                }}
                disabled
                id="outlined-disabled"
                defaultValue=" " //Value from Calendar
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                value={props.value}
            />
        </>
    );
};

const Previous2 = (props: { value: string }) => {
    return (
        <>
            <p className="previous-questions" style={{ marginBottom: "0" }}>
                Have you completed all your tasks?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 20,
                    },
                }}
                disabled
                id="outlined-disabled"
                defaultValue=" " //Value from Calendar
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                value={props.value}
            />
        </>
    );
};

const Previous3 = (props: { value: string }) => {
    return (
        <>
            <p className="previous-questions" style={{ marginBottom: "0" }}>
                Are you making any progress towards your goals?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 20,
                    },
                }}
                disabled
                id="outlined-disabled"
                defaultValue=" " //Value from Calendar
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                value={props.value}
            />
        </>
    );
};

const Previous4 = (props: { value: string }) => {
    return (
        <>
            <p className="previous-questions" style={{ marginBottom: "0" }}>
                Do you forsee any problems in progress?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 20,
                    },
                }}
                disabled
                id="outlined-disabled"
                defaultValue=" " //Value from Calendar
                size="small"
                InputLabelProps={{ shrink: false }}
                className="textfield"
                value={props.value}
            />
        </>
    );
};

const Previous5 = (props: { value: string | undefined }) => {
    return (
        <>
            <p className="previous-questions" style={{ marginBottom: "0" }}>
                If so, what are those problems?
            </p>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 50,
                    },
                }}
                id="outlined-multiline-disabled"
                multiline
                rows={4}
                InputLabelProps={{ shrink: false }}
                className="textfield"
                value={props.value}
            />
        </>
    );
};
