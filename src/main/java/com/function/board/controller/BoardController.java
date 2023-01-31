package com.function.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.dto.common.PagingDto;
import com.function.board.service.BoardService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	private final BoardRepository boardRepository;

	@ApiOperation(value = "게시글 생성")
	@PostMapping()
	public ResponseEntity<Object> save(@RequestBody BoardSaveRequestDto requestDto) {
		boardService.save(requestDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "게시글 목록 조회")
	@GetMapping()
	public ResponseEntity<List<BoardListResponseDto>> boardList() {
		return ResponseEntity.ok(boardService.findAll());
	}

	@ApiOperation(value = "게시글 목록 페이징")
	@GetMapping("/list")
	public ResponseEntity<Page<PagingDto>> paging(Pageable pageable) {
		Page<Board> boardList = boardRepository.findAll(pageable);
		return ResponseEntity.ok(boardList.map(PagingDto::new));
	}

	@ApiOperation(value = "{board_id}로 게시글 조회")
	@GetMapping("/{id}")
	public ResponseEntity<BoardResponseDto> findById(@PathVariable("id") Long id) {
		boardService.updateView(id);
		return ResponseEntity.ok(boardService.findById(id));
	}

	@ApiOperation(value = "제목(title)에 {keyword}가 포함된 게시글 검색")
	@GetMapping("/search")
	public ResponseEntity<Page<PagingDto>> searchTitle(String keyword, Pageable pageable) {
		Page<Board> searchList = boardService.searchByTitle(keyword, pageable);
		return ResponseEntity.ok(searchList.map(PagingDto::new));
	}

	@ApiOperation(value = "게시글 수정")
	@PutMapping("/{id}")
	public ResponseEntity<Long> update(@PathVariable("id") Long id, @RequestBody BoardUpdateRequestDto requestDto) {
		return ResponseEntity.ok(boardService.update(id, requestDto));
	}

	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Long id) {
		boardService.delete(id);
	}

}
