import styled from "styled-components";

import { useSelector } from "react-redux";

import CompileArea from "./CompileArea";
import ChatArea from "./ChatArea";


const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: auto;
  grid-row-start: 1;
  grid-row-end: 12;
  grid-column-start: 4;
  grid-column-end: 5;
`

function SideArea(props) {
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);

  return (
    <Box>
      {isCompileButtonOn && <CompileArea />}
      <ChatArea />
    </Box>
  );
}

export default SideArea;