package com.hesshes.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hesshes.boardback.dto.request.board.PatchBoardRequestDto;
import com.hesshes.boardback.dto.request.board.PostBoardRequestDto;
import com.hesshes.boardback.dto.request.board.PostCommentRequestDto;

import com.hesshes.boardback.dto.response.board.PostBoardResponseDto;
import com.hesshes.boardback.dto.response.board.PostCommentResponseDto;

import com.hesshes.boardback.dto.response.board.GetBoardResponseDto;
import com.hesshes.boardback.dto.response.board.GetCommentListResponseDto;
import com.hesshes.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.hesshes.boardback.dto.response.board.GetLatestBoardListResponseDto;

import com.hesshes.boardback.dto.response.board.PatchBoardResponseDto;
import com.hesshes.boardback.dto.response.board.PutFavoriteResponseDto;
import com.hesshes.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.hesshes.boardback.dto.response.board.DeleteBoardResponseDto;

public interface BoardService {

    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);

    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);

    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);

    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);

    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, String email,
            Integer boardNumber);

    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber,
            String email);

    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);

    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

}
