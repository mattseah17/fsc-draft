import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopNav />
        <ContentContainer />
      </div>
    </div>
  );
}

export default App;
