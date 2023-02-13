import styled from "styled-components"
// import { useDispatch } from "react-redux";
import { Paper, InputBase, IconButton, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Link } from "react-router-dom";

function SessionListSideBar(props) {

    const onClickHandler = (e) => {
        e.preventDefault()
        console.log("clicked")
    }

    return (
        <Sidebar>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder=""
                />

            </Paper>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder=""
                />

            </Paper>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder=""
                />
            </Paper>
            <IconButton onClick={onClickHandler} type="button" sx={{ p: '10px', color: '#FCA311' }} aria-label="search">
                <Search />
            </IconButton>
            {/*  */}
            <Link to={"/room/create"} style={{textDecoration: "none"}}>
                <Button variant="contained" className="submit" fullWidth style={{height:"2.5rem", backgroundColor: "#FCA311"}}> <b>세션 만들기</b></Button>
            </Link>
        </Sidebar>
    )
}

const Sidebar = styled.div`
    width: 15%;
    
    background-color: #14213D;
    color: white;
    
    border-radius: 10px;
    padding: 10px;
    margin: 0 10px 0 20px;
`

export default SessionListSideBar;