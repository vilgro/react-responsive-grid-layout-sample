import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Breakpoints,
    Layout,
    Layouts,
    Responsive,
} from 'react-grid-layout';

import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";

import { GridItem } from "../GridItem/GridItem";

interface IResponsiveGridProps {
    layouts: Layouts;
    cols: { [P in Breakpoints]: number };
    children?: any;
}

interface IResponsiveGridState {
    layouts: Layouts;
    width: number;
}

export default class ResponsiveGrid extends React.Component<IResponsiveGridProps, IResponsiveGridState> {
    constructor(props: IResponsiveGridProps) {
        super(props);

        this.state = {
            layouts: props.layouts,
            width: 1280,
        };

        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    public componentDidMount() {
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    public render() {
        return (
            <Responsive
                className="layout"
                cols={this.props.cols}
                layouts={this.state.layouts}
                onLayoutChange={this.onLayoutChange}
                width={this.state.width}
            >
                {this.getGridItems()}
            </Responsive >
        )
    }

    private onWindowResize() {
        const node: HTMLElement = ReactDOM.findDOMNode(this as any) as HTMLElement;

        if (!(node instanceof HTMLElement)) {
            return;
        }

        const width: number = node.offsetWidth;

        if (width === this.state.width) {
            return;
        }

        this.setState({ width });
    }


    private onLayoutChange(_: any, layouts: {}) {
        this.setState({
            ...this.state,
            layouts,
        });
    }

    private getGridItems() {
        if (!this.props.children
            || !this.state
            || !this.state.layouts
            || !this.state.layouts.md
        ) {
            return null;
        }

        const layouts: Layout[] = this.state.layouts.md || [];

        return React.Children.map(this.props.children, (child: React.ReactNode, index: number) => {
            const layout = layouts[index];

            return <div key={layout.i}>
                <GridItem>{child}</GridItem>
            </div>
        });
    }
}