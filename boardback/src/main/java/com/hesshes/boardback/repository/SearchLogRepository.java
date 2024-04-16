package com.hesshes.boardback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hesshes.boardback.entity.SearchLogEntity;
import com.hesshes.boardback.repository.resultSet.GetPopularListResultSet;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {

    @Query(value = "SELECT search_word AS searchWord, count(search_Word) AS count " +
            "FROM search_log " +
            "WHERE relation IS FALSE " +
            "GROUP BY search_word " +
            "ORDER BY count DESC " +
            "LIMIT 15 ", nativeQuery = true)
    List<GetPopularListResultSet> getPopularList();

}
