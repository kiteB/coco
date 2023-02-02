import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { websocketInstances, participantsInstances } from "../../../../store/sessionSlice";
import { CustomButton } from "../ToolBar";
import UserListItem from "./UserListItem";


const UserListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
`

function UserList() {
  // const ws = useSelector((state) => state.session.ws);
  const websocketId = useSelector((state) => state.session.websocketId)
  const ws = websocketInstances.get(websocketId)
  // console.log("websocketId: ", websocketId)
  // console.log("get ws??", ws)
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId));

  // console.log("participantsId: ", participantsId);
  // console.log("receive participants in UserList: ", participants)

  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));
  },)

  

  return (
    <UserListDiv>
      <p>유저 권한 목록</p>
      {Object.values(participants).map((participant, index) => {
        return (
          <UserListItem participant={participant} key={index} />
        )
      })}
    </UserListDiv>
  )
}

export default UserList;