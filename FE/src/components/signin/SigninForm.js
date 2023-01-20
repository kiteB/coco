// 테스트를 위해 모든 validation을 email에 연결해둠
// 차후에 처리가 필요함
// 이메일 더블체크와 이메일 여부 판단만 코드가 구현되어 있음
// 입력 여부를 판단하는 함수도 추가 필요

// custom hook에 대한 이해가 필요함
// input을 핸들링 하는 과정에서 4개나 되는 똑같은 함수들이 돌아감 이를 해결하고 싶은 마음이 굴뚝 같으나 일단 기능 구현을 해봄


import { useState } from 'react'
import { Grid, Box, Container, Button, TextField } from '@mui/material'

function SigninForm() {
    const [inputID, setInputID ] = useState()
    const [inputPassword, setInputPassword] = useState()
    const [inputCheckPassword, setInputChcekPassword] = useState()
    const [inputEmail, setInputEmail] = useState()
    
    const [isIdValid, setIsIdValid] = useState({isVaild: false})
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState({isVaild: false})

    // const [passwordValidation, setPasswordValidation] = useState(false)

    // 유효성 검사
    const emailValidation = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    function idValidation() {
        const idForm = /^[a-z0-9]{4,16}$/
        const idErrorMessage = {
            null: "필수 입력입니다.",   
            form: "ID는 4글자부터 16글자 까지입니다.",
        }
        if (inputID === undefined || inputID === '') {
            return {isVaild: true, message: idErrorMessage.null}
        } else if (!idForm.test(inputID)) {
            return {isVaild: true, message: idErrorMessage.form}
        } else {
            return {isValid: false}
        }
    }
    function passwordValidation() {
        const passwordForm = /^[a-z0-9]{4,12}$/
        const passwordErrorMessage = {
            null: "필수 입력입니다.",
            form: "비밀번호가 취약합니다.",
            same: "비밀번호가 일치하지 않습니다.",
        }
        if (inputPassword === undefined || inputPassword === '') {
            return {isVaild: true, message: passwordErrorMessage.null}
        } else if (inputPassword !== inputCheckPassword) {
            return {isVaild: true, message: passwordErrorMessage.same}
        } else if (!passwordForm.test(inputPassword)) {
            return {isVaild: true, message: passwordErrorMessage.form}
        }
        else {
            return {isValid: false}
        }
    }

    // case를 이용한 typing
    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'outlined-id':
                setInputID(e.target.value)
                break
            case 'outlined-password':
                setInputPassword(e.target.value)
                break
            case 'outlined-password-check':
                setInputChcekPassword(e.target.value)
                break
            case 'outlined-email':
                setInputEmail(e.target.value)
                break
            default:
                // nothing
        }
    }

    // 임시 유저정보
    const test_user_info = {
        user_id: inputID, 
        password: inputPassword,
        name: 'test',
        email_id: inputEmail,
    }
    // URL 주소를 절대주소로 입력해주세요
    async function axios_test() {
        const response = await fetch('', {
            method: 'POST',
            body: test_user_info,
            headers: {
                
            }
        })
        const data = await response.json()
        console.log('들어옴', data)
        // return에 따라 출력될 오류 메시지
        // ID, nickname, E-mail 중복
    } 

    // 제출
    const onClickHandler = (e) => {
        setIsEmailValid(!(emailValidation.test(inputEmail)))
        setIsPasswordValid(passwordValidation())
        setIsIdValid(idValidation())

        if (!(isEmailValid.isVaild) && !(isPasswordValid.isVaild)){axios_test()}
    }




    return (
        <Container fixed>
            <h2>회원 가입</h2><hr/>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isIdValid.isVaild} helperText={isIdValid.isVaild ? isIdValid.message : ""}id="outlined-id" label="ID"  fullWidth/>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isPasswordValid.isVaild} helperText={isPasswordValid.isVaild ? isPasswordValid.message : ""}id="outlined-password" type="password" label="Password" fullWidth/>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isPasswordValid.isVaild} helperText={isPasswordValid.isVaild ? isPasswordValid.message : ""} id="outlined-password-check" type="password" label="Password Check" fullWidth/>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} error={isEmailValid} helperText={isEmailValid ? "유효한 이메일을 입력해주십시오." : ""} id="outlined-email" label="E-Mail" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={onClickHandler} variant="contained" className="submit" fullWidth style={{height:"3rem"}}> <b>회원가입</b></Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}



export default SigninForm