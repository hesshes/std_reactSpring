package com.hesshes.boardback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board_list_view")
@Table(name = "board_list_view")
public class BoardListViewEntity {

    @Id
    private int boardNumber;

    private String title;
    private String content;
    private String title_image;
    private int viewCnt;
    private int favoriteCnt;
    private int commentCnt;
    private String wrtDttm;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;

}
