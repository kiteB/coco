import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
// import { createSession } from '../../store/sessionListSlice';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../api/session';


function CreateSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCreateSession(event) {
    event.preventDefault();
    const sessionData = new FormData(event.currentTarget);
    const payload = {
      // host_id, host_rating, max 추가로 전달
      hostId: sessionData.get("hostId"),
      title: sessionData.get("title"),
      content: sessionData.get("content"),
      hostRating: 10,
      mode: sessionData.get("mode"),
      max: sessionData.get("max")
    }
    // 백엔드의 "/room" URI로 POST 요청 보내는 함수로 변경
    // dispatch(createSession(payload));
    await createSession(
      payload,
      (data) => {
        console.log(data)
        navigate(`/room/${sessionData.get("hostId")}`);
      },
      (err) => console.log(err)
    )
  }
  
  
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        세션 생성
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleCreateSession}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="hostId"
              label="HOST ID"
              name="hostId"
              autoComplete="hostId"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="세션 제목"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="content"
              label="세션 설명"
              id="content"
              multiline
              rows={6}
              autoComplete="content"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="mode">모드</FormLabel>
            <RadioGroup name="mode" row>
              <FormControlLabel value="study" control={<Radio />} label="study" />
              <FormControlLabel value="relay" control={<Radio />} label="relay" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="max"
              label="최대 참여자 수"
              name="max"
              type="number"
              autoComplete="max"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          생성
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {navigate("/room");}}
        >
          취소
        </Button>
      </Box>
    </Container>
  )
}

export default CreateSession;
