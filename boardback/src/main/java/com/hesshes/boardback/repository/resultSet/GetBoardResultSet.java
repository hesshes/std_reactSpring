package com.hesshes.boardback.repository.resultSet;

public interface GetBoardResultSet {

    Integer getBoardNumber();

    String getTitle();

    String getContent();

    String getWrtDttm();

    String getWriterEmail();

    String getWriterNickname();

    String getWriterProfileImage();

}
