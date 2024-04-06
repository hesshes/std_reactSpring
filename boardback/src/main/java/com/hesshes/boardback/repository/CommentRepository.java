package com.hesshes.boardback.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hesshes.boardback.entity.CommentEntity;
import com.hesshes.boardback.repository.resultSet.GetCommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query(value = "SELECT " +
            "       U.nickname as nickname, " +
            "       U.profile_image AS profileImage, " +
            "       C.wrt_dttm AS wrtDttm, " +
            "       C.content as content " +
            "FROM comment AS C " +
            "INNER JOIN user AS U " +
            "ON C.user_email = U.email " +
            "WHERE C.board_number = ?1 " +
            "ORDER BY wrtDttm DESC", nativeQuery = true)
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);

}
