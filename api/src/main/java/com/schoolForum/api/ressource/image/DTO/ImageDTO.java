package com.schoolForum.api.ressource.image.DTO;

import com.schoolForum.api.model.Account;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ImageDTO {
    private String path;
    private String description;
}
