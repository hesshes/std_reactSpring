package com.hesshes.boardback.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.hesshes.boardback.dto.request.board.PostBoardRequestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;
    private String title;
    private String content;
    private String wrtDttm;
    private int favoriteCnt;
    private int commentCnt;
    private int viewCnt;
    private String writerEmail;

    public BoardEntity(PostBoardRequestDto dto, String email) {
        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String wrtDttm = simpleDateFormat.format(now);

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.wrtDttm = wrtDttm;
        this.favoriteCnt = 0;
        this.commentCnt = 0;
        this.viewCnt = 0;
        this.writerEmail = email;

    }

    public void increaseViewCount() {
        this.viewCnt++;
    }

    public void increateFavoriteCount() {
        this.favoriteCnt++;
    }

    public void increateCommentCount() {
        this.commentCnt++;
    }

    public void decreaseFavoriteCount() {
        this.favoriteCnt--;
    }

    public void decreaseCommentCount() {
        this.commentCnt--;
    }
}
