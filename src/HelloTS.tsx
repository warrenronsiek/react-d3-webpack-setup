import * as React from "react";

interface HelloProps {}

export default class HelloTS extends React.Component<HelloProps, {}> {
    render() {
        return (<h1>Hello TS!</h1>);
    }
}