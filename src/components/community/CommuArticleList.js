import { useState, useMemo } from "react"; 
import { useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { boardPaging } from "../../api/community";
import { CommuPaging, CommuArticleListItem } from "./index"

import styled from "styled-components"
import { Grid } from "@mui/material";

function CommuArticleList() {
    const searchResult = useSelector(state => state.boardSearch)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ someArticle, setSomeArticle ] = useState([{id: 1, createdAt: "i dont know when i was born"}, {id: 2, createdAt: "i dont know when i was born"}])
    const [ isArticleListExist, setIsArticleListExist ] = useState(true)
    // 일단은 8로 고정하고 심화기능이 필요하다면 변경하는 버튼을 추가 예정
    const [ pageSize ] = useState(6)
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ maxPage, setMaxPage ] = useState(5)

    useMemo(() => {
        const enterBoard = async () => {
            await boardPaging(
                {size: pageSize, page: pageNumber},
                (data) => {return data.data},
                (err) => console.log(err)
            ).then((data) => {
                setSomeArticle(data.content)
                setMaxPage(data.totalPages)
            })
        }
        // enterBoard()
        console.log("This is search result" + searchResult)
        if (searchResult.content.empty) {
            setIsArticleListExist(false)
        } else if (searchResult.content.content[0].id === -1) {
            enterBoard()
        } else {
            setSomeArticle(searchResult.content.content)
        }
    }, [pageSize, pageNumber, searchResult])


    const onPagingClickHandler = (page) => {
        if (page.target === undefined) {
            setPageNumber(page)
        } else {
            setPageNumber(page.target.value)
            setSearchParams({page: page.target.value})
            console.log(searchParams)
        }
    }

    return (
        <CommuArticleBox>
            <Grid container height={"100%"}>
                {isArticleListExist ? <CommuArticleListItem articles={someArticle}/> : <div>해당 글 없음</div> }
            </Grid>
            <CommuPaging maxPage={maxPage} onClick={onPagingClickHandler}/>
        </CommuArticleBox>
    )
}

const CommuArticleBox = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    width: 80%;
    height: 100%;

`

export default CommuArticleList