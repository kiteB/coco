import { useState, useMemo } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"

import { CommentForm, Comments, CommuArticleDetailContent } from "./index"
import { boardDetail, articleDelete } from "../../api/community"

import styled from "styled-components"
import { Button, Typography } from "@mui/material"

function CommuArticleDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    // 지금 등록돼있는 모든 게시글을 날리고 새로운 더미 데이터 생성이 필요함
    const pk = location.state.id
    const [article, setArticle ] = useState({
        id: "",
        content: [{content:[""], index: -1},],
        code: [{content: [""], index: -1},],
        comments: {
            empty: true
        }
    })
    
    // article 정보를 가져옴
    useMemo(() => {
        const getArticlelDetail = async () => {
            await boardDetail(
            pk,
            (data) => {return data.data},
            (error) => console.log(error)
        ).then((data) => {
            setArticle(data)
            // console.log(data)
        })
    }
    getArticlelDetail()
    }, [pk])

    async function onClickDeleteHandler(params) {
        await articleDelete(
            pk,
            (data) => {
                console.log(data)
                navigate("/community")
            },
            (err) => console.log(err)
            )
    }

    return (
        <>
            <TitleSection>
                <h2>{article.title}</h2>
                {/* <h2>static Title</h2> */}
                <div>
                    <Link to={`/community/update/${pk}`} state={article} style={{textDecoration: "none"}} article={article}>
                        <Button variant="contained">수정</Button>
                    </Link>
                    <Button onClick={onClickDeleteHandler} variant="contained">삭제</Button>
                </div>
            </TitleSection>
            <hr/>
            <ArticleSection>
                <CommuArticleDetailContent content={article} />
            </ArticleSection>
            <hr/>
            <CommentSectiom>
                {window.localStorage.getItem("userId") !== null ? <CommentForm board_id={pk}/> : <Typography textAlign={"center"}>로그인 하시면 댓글을 쓸 수 있어요</Typography>}
                {article.comments.empty ? <Typography textAlign={"center"}>아직 댓글이 없어요!</Typography> : <Comments comments={article.comments}/> }
            </CommentSectiom>
        </>
    )
}

const TitleSection = styled.section`
    width: 100%;

    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`

const ArticleSection = styled.section`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: space-around;
`

// const ContentSection = styled.section`
//     width: 45%;
//     height: 500px;

// `
// const CodeSection = styled.section`
//     width: 45%;
//     height: 500px;
// `

const CommentSectiom = styled.section`
    width: 100%;
    margin-top: 15px;

`



export default CommuArticleDetail