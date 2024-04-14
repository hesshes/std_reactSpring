package com.hesshes.boardback.dto.object;

import java.util.List;
import java.util.ArrayList;

import com.hesshes.boardback.entity.BoardListViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private int boardNumber;
    private String title;
    private String content;
    private String boardTitleImage;
    private int favoriteCnt;
    private int commentCnt;
    private int viewCnt;
    private String wrtDttm;
    private String writerNickname;
    private String writerProfileImage;

    public BoardListItem(BoardListViewEntity boardListViewEntitiy) {
        this.boardNumber = boardListViewEntitiy.getBoardNumber();
        this.title = boardListViewEntitiy.getTitle();
        this.content = boardListViewEntitiy.getContent();
        this.boardTitleImage = boardListViewEntitiy.getTitleImage();
        this.favoriteCnt = boardListViewEntitiy.getFavoriteCnt();
        this.commentCnt = boardListViewEntitiy.getCommentCnt();
        this.viewCnt = boardListViewEntitiy.getViewCnt();
        this.wrtDttm = boardListViewEntitiy.getWrtDttm();
        this.writerNickname = boardListViewEntitiy.getWriterNickname();
        this.writerProfileImage = boardListViewEntitiy.getWriterProfileImage();
    }

    public static List<BoardListItem> getList(List<BoardListViewEntity> boardListViewEntites) {

        List<BoardListItem> list = new ArrayList<>();

        for (BoardListViewEntity boardListViewEntity : boardListViewEntites) {
            BoardListItem boardListItem = new BoardListItem(boardListViewEntity);
            list.add(boardListItem);
        }

        return list;

    }
}
