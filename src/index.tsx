import React from "react";
import ReactDOM from "react-dom";
import { createRoot, WithPathProps } from "./packages/ComponentWithPath";
import reportWebVitals from "./reportWebVitals";

export const Root = createRoot("root");

const EchoPathMain: React.FC<WithPathProps> = ({ id, children }) => {
    const path = Root.usePath();
    return <div>
        <div>My ID : {id}</div>
        <div>My path from Root : {path}</div>
        {
            children
        }
    </div>;
};

const EchoPath = Root.withPath(EchoPathMain);

ReactDOM.render(
    <React.StrictMode>
        <EchoPath id="GrandParent">
            <EchoPath id="Parent">
                <EchoPath id="Me">
                    <EchoPath id="Child">
                        <EchoPath id="GrandChild" />
                    </EchoPath>
                </EchoPath>
            </EchoPath>
        </EchoPath>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
