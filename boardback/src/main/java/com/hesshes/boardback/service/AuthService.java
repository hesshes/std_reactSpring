package com.hesshes.boardback.service;

import org.springframework.http.ResponseEntity;

import com.hesshes.boardback.dto.request.auth.SignInRequestDto;
import com.hesshes.boardback.dto.request.auth.SignUpRequestDto;
import com.hesshes.boardback.dto.response.auth.SignInResponseDto;
import com.hesshes.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
