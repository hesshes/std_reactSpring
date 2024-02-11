-- Active: 1707527606712@@127.0.0.1@3306@board
        
CREATE TABLE board
(
  border_number INT         NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
  title         TEXT        NOT NULL COMMENT '게시물 제목',
  content       TEXT        NOT NULL COMMENT '게시물 내용',
  wrt_dttm      DATETIME    NOT NULL COMMENT '게시물 작성 날짜',
  favorite_cnt  INT         NOT NULL DEFAULT 0 COMMENT '게시물 좋아요 수',
  comment_cnt   INT         NOT NULL DEFAULT 0 COMMENT '게시믈 댓글 수',
  view_cnt      INT         NOT NULL DEFAULT 0 COMMENT '게시물 조회 수',
  writer_email  VARCHAR(50) NOT NULL COMMENT '게시물 작성자 이메일',
  PRIMARY KEY (border_number)
) COMMENT '게시물 정보';

CREATE TABLE comment
(
  comment_number INT         NOT NULL COMMENT '댓글 번호',
  content        TEXT        NOT NULL COMMENT '댓글 내용',
  wrt_dttm       DATETIME    NOT NULL COMMENT '작성일시',
  user_email     VARCHAR(50) NOT NULL COMMENT '사용자 이메일',
  border_number  INT         NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (comment_number)
) COMMENT '댓글 정보';

CREATE TABLE favorite
(
  user_email    VARCHAR(50) NOT NULL COMMENT '사용자 이메일',
  border_number INT         NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (user_email, border_number)
) COMMENT '좋아요 정보';

CREATE TABLE image
(
  border_number INT  NOT NULL COMMENT '게시물 번호',
  image_url     TEXT NOT NULL COMMENT '게시물 이미지 URL'
) COMMENT '게시물 이미지 정보';

CREATE TABLE search_log
(
  seq           INT     NOT NULL AUTO_INCREMENT COMMENT '순번',
  search_word   TEXT    NOT NULL COMMENT '검색어',
  relation_word TEXT    NULL     COMMENT '관련 검색어',
  relation      BOOLEAN NOT NULL COMMENT '관련 검색어 여부',
  PRIMARY KEY (seq)
) COMMENT '검색 기록 테이블';

CREATE TABLE user
(
  email          VARCHAR(50)  NOT NULL COMMENT '사용자 이메일',
  password       VARCHAR(100) NOT NULL COMMENT '사용자 비밀번호',
  nickname       VARCHAR(20)  NOT NULL UNIQUE COMMENT '사용자 닉네임',
  tel_number     VARCHAR(15)  NOT NULL UNIQUE COMMENT '사용자 휴대전화번호',
  address        TEXT         NULL     COMMENT '사용자 주소',
  address_detail TEXT         NULL     COMMENT '사용자 상세 주소',
  profile_image  TEXT         NULL     COMMENT '사용자 프로필 사진 URL',
  PRIMARY KEY (email)
) COMMENT '사용자 정보';

ALTER TABLE image
  ADD CONSTRAINT FK_board_TO_image
    FOREIGN KEY (border_number)
    REFERENCES board (border_number);

ALTER TABLE board
  ADD CONSTRAINT FK_user_TO_board
    FOREIGN KEY (writer_email)
    REFERENCES user (email);

ALTER TABLE favorite
  ADD CONSTRAINT FK_user_TO_favorite
    FOREIGN KEY (user_email)
    REFERENCES user (email);

ALTER TABLE favorite
  ADD CONSTRAINT FK_board_TO_favorite
    FOREIGN KEY (border_number)
    REFERENCES board (border_number);

ALTER TABLE comment
  ADD CONSTRAINT FK_user_TO_comment
    FOREIGN KEY (user_email)
    REFERENCES user (email);

ALTER TABLE comment
  ADD CONSTRAINT FK_board_TO_comment
    FOREIGN KEY (border_number)
    REFERENCES board (border_number);
