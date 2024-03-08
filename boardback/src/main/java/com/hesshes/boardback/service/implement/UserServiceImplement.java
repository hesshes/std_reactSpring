package com.hesshes.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hesshes.boardback.dto.response.ResponseDto;
import com.hesshes.boardback.dto.response.user.GetSignInUserResponseDto;
import com.hesshes.boardback.entity.UserEntity;
import com.hesshes.boardback.repository.UserRepository;
import com.hesshes.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null)
                return GetSignInUserResponseDto.notExistUser();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);
    }

}
