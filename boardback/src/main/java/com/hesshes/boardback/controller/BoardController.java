package com.hesshes.boardback.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hesshes.boardback.service.BoardService;
import com.hesshes.boardback.dto.request.board.PatchBoardRequestDto;
import com.hesshes.boardback.dto.request.board.PostBoardRequestDto;
import com.hesshes.boardback.dto.request.board.PostCommentRequestDto;

import com.hesshes.boardback.dto.response.board.GetBoardResponseDto;
import com.hesshes.boardback.dto.response.board.GetCommentListResponseDto;
import com.hesshes.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.hesshes.boardback.dto.response.board.PostBoardResponseDto;
import com.hesshes.boardback.dto.response.board.PostCommentResponseDto;
import com.hesshes.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.hesshes.boardback.dto.response.board.PatchBoardResponseDto;
import com.hesshes.boardback.dto.response.board.PutFavoriteResponseDto;
import com.hesshes.boardback.dto.response.board.DeleteBoardResponseDto;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(
            @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
            @PathVariable("boardNumber") Integer boardNumber) {

        ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(boardNumber);
        return response;

    }

    @GetMapping("/{boardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
            @PathVariable("boardNumber") Integer boardNumber) {

        ResponseEntity<? super GetCommentListResponseDto> response = boardService.getCommentList(boardNumber);
        return response;

    }

    @GetMapping("/{boardNumber}/increase-view-count")
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(
            @PathVariable("boardNumber") Integer boardNumber) {

        ResponseEntity<? super IncreaseViewCountResponseDto> response = boardService.increaseViewCount(boardNumber);
        return response;

    }

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
            @RequestBody @Valid PostBoardRequestDto requestBody,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
        return response;

    }

    @PostMapping("/{boardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDto> postComment(
            @RequestBody @Valid PostCommentRequestDto requstBody,
            @AuthenticationPrincipal String email,
            @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(requstBody, email,
                boardNumber);
        return response;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
            @PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNumber, email);
        return response;
    }

    @PatchMapping("/{boardNumber}")
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(
            @RequestBody @Valid PatchBoardRequestDto requestBody,
            @PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super PatchBoardResponseDto> response = boardService.patchBoard(requestBody, boardNumber,
                email);
        return response;
    }

    @DeleteMapping("/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
            @PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(boardNumber, email);
        return response;
    }

}
