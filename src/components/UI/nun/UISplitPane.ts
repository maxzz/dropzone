import SplitPane from 'react-split-pane';
import './UISplitPane.css';

const UISplitPane = SplitPane;

export default UISplitPane;

// Usage:
// <main className="flex-1 relative flex min-w-0 min-h-0 ring-1 ring-primary-500 rounded overflow-hidden">
// <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
//     {/* <UISplitPane split="vertical" defaultSize="50%"> */}
//     {/* minSize={382} */}
//     <Panel1_FilesList />
//     <Panel2_Right />
//     {/* </UISplitPane> */}
// </SimpleSplitPane>
// </main>
