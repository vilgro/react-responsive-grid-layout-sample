import * as React from "react";

import "./GridItem.css";

interface IGridItemProps {
    children: any;
}

interface IIGridItemState {
    width: number;
    height: number;
}

export class GridItem extends React.Component<IGridItemProps, IIGridItemState> {
    private elementRef: React.RefObject<HTMLDivElement>;

    constructor(props: IGridItemProps) {
        super(props);

        this.state = {
            height: 0,
            width: 0,
        };

        this.elementRef = React.createRef<HTMLDivElement>();

        this.getViewport = this.getViewport.bind(this);
    }

    public componentDidMount() {
        this.setState(this.getViewport()); // We  have to force re-render to get proper element size
    }

    public componentDidUpdate() {
        const viewport: IIGridItemState = this.getViewport();

        if (this.state.width !== viewport.width
            || this.state.height !== viewport.height
        ) {
            this.setState(viewport);
        }
    }

    public render() {
        return <div className="gridItem" ref={this.elementRef}>
            {React.cloneElement(
                this.props.children,
                { width: this.state.width, height: this.state.height },
            )}
        </div>
    }

    private getViewport(): IIGridItemState {
        const element: HTMLDivElement = this.elementRef && this.elementRef.current as HTMLDivElement;

        if (!element) {
            return {
                height: 0,
                width: 0,
            }
        }

        const height: number = element.offsetHeight;
        const width: number = element.offsetWidth;

        return {
            height,
            width,
        }
    }
}