package com.hesshes.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hesshes.boardback.dto.response.search.GetPopularListResponseDto;

public interface SearchService {

    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
}
