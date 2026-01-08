package com.schoolForum.api.ressource.account.DTO;

import com.schoolForum.api.model.Image;
import com.schoolForum.api.model.Language;
import com.schoolForum.api.ressource.image.DTO.ImageDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class AccountUpdate {
    private String firstName;
    private String lastName;
    private String biography;
    private String email;
    private LocalDate birthDay;
    private List <Language> languages;
    private ImageDTO profilePicture;
    private ImageDTO thumbnail;
}
