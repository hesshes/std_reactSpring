package com.hesshes.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hesshes.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
}