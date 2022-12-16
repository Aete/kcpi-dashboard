import styled from "styled-components";
import Home from "./components/pages/Home";
import { BlueGray50, Background } from "./utils/colors";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${Background};
`;

function App() {
  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
}

export default App;
