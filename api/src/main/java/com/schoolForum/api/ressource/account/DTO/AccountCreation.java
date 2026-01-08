package com.schoolForum.api.ressource.account.DTO;

import com.schoolForum.api.model.Image;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class AccountCreation {
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDay;
    private Image thumbnail;
    private Image profilePicture;
}
