import * as React from "react";

interface IItemProps {
    width?: number;
    height?: number;
}

export class Item extends React.Component<IItemProps, {}> {
    public render() {
        return <span>width: {this.props.width}, height: {this.props.height}</span>;
    }
}