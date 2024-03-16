package com.hesshes.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hesshes.boardback.dto.request.board.PostBoardRequestDto;
import com.hesshes.boardback.dto.response.ResponseDto;
import com.hesshes.boardback.dto.response.board.GetBoardResponseDto;
import com.hesshes.boardback.dto.response.board.PostBoardResponseDto;
import com.hesshes.boardback.entity.BoardEntity;
import com.hesshes.boardback.entity.ImageEntity;
import com.hesshes.boardback.repository.BoardRepository;
import com.hesshes.boardback.repository.ImageRepository;
import com.hesshes.boardback.repository.UserRepository;
import com.hesshes.boardback.repository.resultSet.GetBoardResultSet;
import com.hesshes.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();
        try {
            resultSet = boardRepository.getBoard(boardNumber);

            if (resultSet == null)
                return GetBoardResponseDto.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

        try {

            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail)
                return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();

            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image : boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }

}
